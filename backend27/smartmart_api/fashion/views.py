from rest_framework.decorators import api_view

from rest_framework.response import Response

from .models import FashionProduct

from .serializers import FashionSerializer


@api_view(['GET', 'POST'])

def fashion_products(request):

    if request.method == 'GET':

        products = FashionProduct.objects.all()

        serializer = FashionSerializer(products, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = FashionSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)
@api_view(['DELETE'])

def delete_product(request, id):

    product = FashionProduct.objects.get(id=id)

    product.delete()

    return Response("Product Deleted")