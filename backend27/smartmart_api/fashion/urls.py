from django.urls import path
from .views import fashion_products,delete_product

urlpatterns = [
    path('fashion/', fashion_products),
    path('fashion/delete/<int:id>/', delete_product),
]

