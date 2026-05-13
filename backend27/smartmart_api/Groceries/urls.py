from django.urls import path

from .views import grocery_products, delete_product

urlpatterns = [

    path('grocery/', grocery_products),

    path('grocery/delete/<int:id>/', delete_product),

]