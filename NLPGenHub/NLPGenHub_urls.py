from django.urls import path
from .NLPGenHub_views import rag_intelliqa, intent_classify, rasa, booking_confirmation, \
                                        atlas, lambda_proxy, aura, aura_agent

urlpatterns = [
    path('IntelliQA/', rag_intelliqa, name='rag_intelliqa'),
    path('intent_classify/', intent_classify, name='intent-classify-api'),
    path('rasa_cinemora/', rasa, name='rasa-chatbot'),
    path('booking_confirmation/',booking_confirmation, name='booking_confirmation'),
    path('atlas/',atlas, name='atlas'),
    path('atlas_agent/',lambda_proxy,name='atlas_agent'),   
    path('aura/',aura, name='aura'),
<<<<<<< HEAD
<<<<<<< HEAD
    path('aura_agent/<str:session_id>/',aura_agent,name='aura_agent')
=======
    path('aura_agent/',aura_agent,name='aura_agent')
<<<<<<< HEAD
=======
    path('taskpilot/',taskpilot, name='taskpilot'),
    path('agent/',lambda_proxy,name='agent'),   
    path('aura/',aura, name='aura')
>>>>>>> 57a0f659 (feat(AURA): add UI to AURA project)
>>>>>>> afeb74f4 (chore(aura): resolve rebase conflicts)
=======
>>>>>>> 7624b4b6 (chore(aura): resolve rebase conflicts)
=======
    path('aura_agent/<str:session_id>/',aura_agent,name='aura_agent')
>>>>>>> c9a42532 (chore(aura): resolve rebase conflicts)
]