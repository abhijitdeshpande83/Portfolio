from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.template.loader import get_template
from rag_pipeline import load_data, vectorstore, ask_question
from django.views.decorators.csrf import csrf_exempt
from .forms import UploadFileForm
from .models import QueryData
import hashlib
import os
import json
import requests

def get_file_hash(file_obj):
    sha256 = hashlib.sha256()
    for chunk in file_obj.chunks():
        sha256.update(chunk)

    return sha256.hexdigest()

def creat_session_id(request):
    if not request.session.session_key:
        request.session.create()
        request.session['file_count'] = 0
    session_id = request.session.session_key 
    return session_id

def process_file(request):

    session_id = creat_session_id(request)

    if request.method=='POST':
        file = request.FILES.get('file')                      #Upload file 

    file_hash = get_file_hash(file)
            
    if QueryData.objects.filter(file_hash=file_hash).exists():
        duplicate_file = QueryData.objects.get(file_hash=file_hash)    #fetching model instance QueryData
        return JsonResponse({
            "status": "duplicate",
            "message": f"Duplicate file detected, file named {os.path.basename(duplicate_file.query_file.name)} already present in the system."})

    if (request.session['file_count']) > 4:
        return JsonResponse({"status": "limit", 
                             "message": "Upload limit of 5 files reached for this session."}
                             )
    
    form_data = QueryData.objects.create(query_file=file, file_hash=file_hash)
    form_data.save()
    file_name = os.path.basename(form_data.query_file.name)
    file_path = 'media/NLP_data/' + file_name
        
    request.session['file_count'] += 1
    
    raw_text = load_data(file_path, session_id, file_name)
    vectorstore_db = vectorstore(persist_directory='media/NLP_data/chroma_db',documents=raw_text)

    return JsonResponse({"status": "success", "message": "File uploaded and processed successfully."})


def rag_pipeline(request):

    session_id = creat_session_id(request)

    data = json.loads(request.body)
    query = data.get("user_input")

    if not os.path.exists('media/NLP_data/chroma_db') or request.session['file_count']<1:
        return JsonResponse({
                "status": "not_ready",
                "message": "No knowledge base found. Please upload a file first."
                })
    vectorstore_db = vectorstore(persist_directory='media/NLP_data/chroma_db')
    response = ask_question(query,vectorstore_db,session_id)
    
    return JsonResponse({"status": "success", "message": response})

def intelliqa(request):
    return render(request, "intelliqa.html")
            
def intent_classify(request):

    INTENT_API_URL = 'https://25hvdlk3p0.execute-api.us-east-1.amazonaws.com/prod/intent_classify'
    TEXT_GEN_API_URL = 'https://gj9hjn4x39.execute-api.us-east-1.amazonaws.com/prod/text-generation'

    if request.method=='POST':
        prompt = request.POST.get('prompt')
        payload = {"input": prompt}
        headers = {"Content-Type": "application/json"}
        confidence_score = {
            "very high": {"color": "lightgreen"},
            "high": {"color":"greenyellow"},
            "medium": {"color": "orange"},
            "low": {"color": "#ff9191"}
            }
        exclude_labels = set(['location','insurance','account','food','fun',
                              'qa','status','cancel','order','alarm'])
        try:
            response = requests.post(INTENT_API_URL,json=payload,headers=headers)
            response_data = response.json()
            if 'body' in response_data:
                response_data = json.loads(response_data['body'])

            domain = response_data.get('label')[0] if response_data.get('label') else "unknown"
            input_data = {"input": f"[Domain {domain}] User: {prompt}"}
            print(input_data)
            
            if domain not in exclude_labels:
                text_generation = requests.post(TEXT_GEN_API_URL, json=input_data, headers=headers).json()
            
            else:
                text_generation = f"That's a great question, but I'm not yet trained to handle \
                                    topics like '{domain}'.\
                                     I'm constantly learning, feel free to ask something else!"

            if response_data["score"] > 0.7:
                context = {"response": response_data, "color_pattern": confidence_score["very high"], "text": text_generation}
            elif response_data["score"] <=0.7 and response_data["score"] >= 0.6:
                context = {"response": response_data, "color_pattern": confidence_score["high"], "text": text_generation}
            elif response_data["score"] <0.6 and response_data["score"] >= 0.4:
                context = {"response": response_data, "color_pattern": confidence_score["medium"], "text": text_generation}
            else:
                context = {"response": response_data, "color_pattern": confidence_score["low"], "text": text_generation}
            return render(request, "supportiq.html", context)
        
        except requests.exceptions.HTTPError as e:
            return render(request, "supportiq.html", {"error":f"API Error: {str(e)}"})
        
        except Exception as e:
            return render(request, "supportiq.html", {"error": f"Unexcepted Error: {str(e)}"})

    return render(request, "supportiq.html")

# Rasa project
def rasa(request):

    return render(request, "rasa_ui.html")

# ATLAS project
def atlas(request):

    return render(request, "atlas.html")

def aura(request):

    request.session.flush()
    request.session.create()
    session_id=request.session.session_key[:5]

    return render(request, "aura.html",{"session":session_id})

@csrf_exempt
def aura_agent(request, session_id):

    if request.method=="POST":
        url = "https://5cnkh8o84j.execute-api.us-east-1.amazonaws.com/prod/"
        data=json.loads(request.body)
        payload = {
            "user_input": data.get("user_input"),
            "session_id": session_id
        }
        print(session_id)
        response = requests.post(
            url,
            json=payload
        ) 

        return JsonResponse(response.json(), safe=False)

def lambda_proxy(request):

    if request.method=="POST":
        data=json.loads(request.body)

        res = requests.post(
            "https://xu3j3bme1e.execute-api.us-east-1.amazonaws.com/prod/",
            json=data
        )

        return JsonResponse(res.json(), safe=False)

@csrf_exempt
def booking_confirmation(request):
    if request.method=="POST":
        html_template = get_template("booking_confirmation.html")
        html_content = html_template.template.source
        return HttpResponse(html_content, content_type="text/html; charset=utf-8")
    return HttpResponse("Invalid method", status=405)