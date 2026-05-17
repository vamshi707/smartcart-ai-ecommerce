from django.urls import path

from .views import hardware_products, delete_hardware

urlpatterns = [

    path('hardware/', hardware_products),

    path('hardware/delete/<int:id>/', delete_hardware),

]