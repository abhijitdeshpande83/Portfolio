from django.urls import path
from .NLPGenHub_views import rag_intelliqa, intent_classify, rasa, booking_confirmation, \
<<<<<<< HEAD
                                        atlas, lambda_proxy, aura, aura_agent
=======
                                        taskpilot, lambda_proxy, aura
>>>>>>> 57a0f659 (feat(AURA): add UI to AURA project)

urlpatterns = [
    path('IntelliQA/', rag_intelliqa, name='rag_intelliqa'),
    path('intent_classify/', intent_classify, name='intent-classify-api'),
    path('rasa_cinemora/', rasa, name='rasa-chatbot'),
    path('booking_confirmation/',booking_confirmation, name='booking_confirmation'),
<<<<<<< HEAD
    path('atlas/',atlas, name='atlas'),
    path('atlas_agent/',lambda_proxy,name='atlas_agent'),   
    path('aura/',aura, name='aura'),
    path('aura_agent/',aura_agent,name='aura_agent')
=======
    path('taskpilot/',taskpilot, name='taskpilot'),
    path('agent/',lambda_proxy,name='agent'),   
    path('aura/',aura, name='aura')
>>>>>>> 57a0f659 (feat(AURA): add UI to AURA project)
]