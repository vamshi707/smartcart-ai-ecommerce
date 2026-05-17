from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import HardwareSpec
from .serializers import HardwareSerializer


@api_view(['GET', 'POST'])

def hardware_products(request):

    if request.method == 'GET':

        products = HardwareSpec.objects.all()

        serializer = HardwareSerializer(products, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = HardwareSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)


@api_view(['DELETE'])

def delete_hardware(request, id):

    product = HardwareSpec.objects.get(id=id)

    product.delete()

    return Response("Hardware Deleted")