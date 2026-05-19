from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import HardwareSpec
from .serializers import HardwareSerializer
from .detect import detect_hardware_ai
from PIL import Image
import base64
from io import BytesIO
# GET PRODUCTS + ADD PRODUCTS
@api_view(['GET', 'POST'])
def hardware_products(request):
    # GET PRODUCTS
    if request.method == 'GET':
        products = HardwareSpec.objects.all()
        serializer = HardwareSerializer(
            products,
            many=True
        )
        return Response(serializer.data)
    # ADD PRODUCT
    elif request.method == 'POST':
        serializer = HardwareSerializer(
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
# DELETE PRODUCT
@api_view(['DELETE'])
def delete_hardware(request, id):
    product = HardwareSpec.objects.get(id=id)
    product.delete()
    return Response({
        "message": "Hardware Deleted"
    })
# AI HARDWARE DETECTION
@api_view(['POST'])
def detect_hardware(request):
    # GET IMAGE + CATEGORY FROM FRONTEND
    image_data = request.data.get("image")
    selected_category = request.data.get("category")
    # SPLIT BASE64 IMAGE
    format, imgstr = image_data.split(';base64,')
    # CONVERT IMAGE
    image_file = BytesIO(
        base64.b64decode(imgstr)
    )
    image = Image.open(image_file)
    # FIX PNG / JPEG ISSUE
    image = image.convert("RGB")
    # SAVE TEMP IMAGE
    image_path = "temp_detect_image.jpg"
    image.save(image_path)
    # RUN AI
    ai_result = detect_hardware_ai(
        image_path
    )
    detected_category = ai_result["category"]
    confidence = ai_result["confidence"]
    length_mm = ai_result["length_mm"]
    diameter_mm = ai_result["diameter_mm"]
    # FIND MATCHING PRODUCTS
    matched_products = HardwareSpec.objects.filter(
        category__icontains=selected_category
    )
    serializer = HardwareSerializer(
        matched_products,
        many=True
    )
    # RETURN RESULT
    return Response({
       "category": selected_category,
        "confidence": confidence,
        "length_mm": length_mm,
        "diameter_mm": diameter_mm,
        "products": serializer.data
    })