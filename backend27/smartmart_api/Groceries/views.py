from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import GroceryProduct
from .serializers import GrocerySerializer


@api_view(['GET', 'POST'])
def grocery_products(request):

    if request.method == 'GET':

        products = GroceryProduct.objects.all()

        serializer = GrocerySerializer(
            products,
            many=True,
            context={'request': request}
        )

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = GrocerySerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        print(serializer.errors)

        return Response(serializer.errors)


@api_view(['DELETE'])
def delete_product(request, id):

    product = GroceryProduct.objects.get(id=id)

    product.delete()

    return Response("Product Deleted")