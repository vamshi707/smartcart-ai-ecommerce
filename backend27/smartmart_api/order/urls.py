from django.urls import path
from .views import place_order, my_orders,cancel_product

urlpatterns = [
    path("place-order/", place_order),
    path("my-orders/", my_orders),
    path(
    "cancel-product/<int:id>/",
    cancel_product
                    ),
]