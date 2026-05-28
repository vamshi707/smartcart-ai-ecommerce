from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer

@api_view(["POST"])
def place_order(request):
    data = request.data

    order = Order.objects.create(
        email=data["email"],
        full_name=data["fullName"],
        phone=data["phone"],
        address=data["address"],
        total_amount=data["totalAmount"],
        payment_method=data["paymentMethod"],
    )

    for item in data["items"]:
        OrderItem.objects.create(
            order=order,
            product_name=item["name"],
            product_image=item["image"],
            price=item["price"],
            quantity=item["quantity"],
            category=item.get("category", "")
        )

    return Response({"message": "Order placed successfully"})


@api_view(["GET"])
def my_orders(request):
    email = request.GET.get("email")

    orders = Order.objects.filter(email=email).order_by("-created_at")
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)
# Create your views here.
