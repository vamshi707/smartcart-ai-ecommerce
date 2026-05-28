from django.urls import path
from .views import place_order, my_orders

urlpatterns = [
    path("place-order/", place_order),
    path("my-orders/", my_orders),
]