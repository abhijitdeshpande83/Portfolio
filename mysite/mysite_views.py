import os
from django.shortcuts import render, redirect
from django.http import HttpResponse, FileResponse, Http404
from .models import Certification, Tool, Experience, ProfileAsset, Project
from django.urls import reverse_lazy
from django.core.mail import send_mail
from django.conf import settings
from django.views.generic.edit import FormView
from .forms import ContactForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.template.loader import render_to_string

# Create your views here.

def index(request):
    profile_data = ProfileAsset.objects.all().first()
    return render(request, 'index.html',{'profile_data': profile_data})


def admin_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # Authenticate and log the user in
            user = form.get_user()
            login(request, user)
            return redirect('/admin/')  # Redirect to admin page
    else:
        form = AuthenticationForm()

    return render(request, 'login.html', {'form': form})

def project(request):
    list_of_projects = Project.objects.all().order_by('project_number')

    grouped_projects = {}
    for project in list_of_projects:
        if project.project_category not in grouped_projects:
            grouped_projects[project.project_category] = []
        grouped_projects[project.project_category].append(project)
    
    return render(request, 'projects.html', {'grouped_projects':grouped_projects})

def contact_me(request):
    return render(request, 'contact_me.html')

def skills(request):
    certificates = Certification.objects.all()
    tools = Tool.objects.all()
    params = {'certificates': certificates, 'tools':tools}
    return render(request, 'skills.html', params)

def thankyou(request):
    if not request.session.get('form_submitted', False):
        return redirect('contact_me')
    del request.session['form_submitted'] 
    return render(request, 'thankyou.html')

class ContactFormView(FormView):
    template_name = 'contact_me.html'
    form_class = ContactForm
    success_url = reverse_lazy('thankyou')

    def form_valid(self, form):
        if form.is_valid():
            form.save()
            # Send an email
            # Get the user's email
            user_email = form.cleaned_data['email']
            user_first_name = form.cleaned_data['first_name']
            user_last_name = form.cleaned_data['last_name']
            full_name = f"{user_first_name} {user_last_name}"

            html_content = render_to_string('contact_confirmation.html', {
                'first_name': user_first_name,
                'user_email': user_email,
                'full_name': full_name,
                'user_contact': form.cleaned_data['contact_number'],
                'user_message': form.cleaned_data['message']
                }
            )

            # Prepare email content
            plain_message = (
            f"Hi {user_first_name}, thanks for reaching out. "
            "I've received your message and will get back to you soon.\n\n- Abhijit Deshpande"
            )
            subject = f"Thanks for reaching out, {user_first_name}!"
            
            send_mail(
                subject,
                plain_message,
                settings.EMAIL_HOST_USER,  # Your email
                [user_email],  # Recipient email
                fail_silently=False,
                html_message=html_content  # This parameter allows HTML content
            )

            self.request.session['form_submitted'] = True

            return super().form_valid(form)
        else:
            # Print or log form errors
            print(form.errors)
            return self.form_invalid(form)
        
def experience(request):
    experiences = Experience.objects.all().order_by('experience_rank')
    params = {'experience':experiences}
    return render(request, 'experience.html', params)

def download_cv(request):
    resume = ProfileAsset.objects.all().first()
    if resume is None or not resume.resume_file:
        raise Http404("Resume file not found.")

    file_path = resume.resume_file.path
    file_name = resume.resume_file.name
    _, file_extension = os.path.splitext(file_name) 
    return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=f"Abhijit_Deshpande_Resume{file_extension}")
   



 