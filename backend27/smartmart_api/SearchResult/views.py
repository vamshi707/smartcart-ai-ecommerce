from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response

from Groceries.models import GroceryProduct
from fashion.models import FashionProduct
from electrical.models import HardwareSpec


@api_view(["GET"])
def search_products(request):
    query = request.GET.get("query", "")

    results = []

    grocery_items = GroceryProduct.objects.filter(
        Q(name__icontains=query)
    )

    fashion_items = FashionProduct.objects.filter(
        Q(name__icontains=query) |
        Q(brand__icontains=query) |
        Q(description__icontains=query) |
        Q(gender__icontains=query)
    )

    electrical_items = HardwareSpec.objects.filter(
        Q(name__icontains=query) |
        Q(category__icontains=query) |
        Q(brand__icontains=query) |
        Q(description__icontains=query) |
        Q(material__icontains=query)
    )

    # GROCERY
    for item in grocery_items:
        results.append({
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "image": item.image,
            "category": "Groceries",
        })

    # FASHION
    for item in fashion_items:
        results.append({
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "image": item.image,
            "category": "Fashion",
        })

    # ELECTRONICS
    for item in electrical_items:
        results.append({
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "image": item.image,
            "category": item.category,
        })

    return Response(results)