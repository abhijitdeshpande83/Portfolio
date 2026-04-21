from django.urls import path
from .NLPGenHub_views import rag_intelliqa, intent_classify, rasa, booking_confirmation, \
                                        taskpilot, lambda_proxy, aura, aura_agent

urlpatterns = [
    path('IntelliQA/', rag_intelliqa, name='rag_intelliqa'),
    path('intent_classify/', intent_classify, name='intent-classify-api'),
    path('rasa_cinemora/', rasa, name='rasa-chatbot'),
    path('booking_confirmation/',booking_confirmation, name='booking_confirmation'),
    path('taskpilot/',taskpilot, name='taskpilot'),
    path('agent/',lambda_proxy,name='agent'),   
    path('aura/',aura, name='aura'),
    path('aura_agent/',aura_agent,name='aura_agent')
]