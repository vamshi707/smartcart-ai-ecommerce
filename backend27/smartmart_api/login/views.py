import random

from django.core.mail import send_mail
from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


otp_storage = {}


@api_view(['POST'])
def send_otp(request):

    email = request.data.get('email')

    if not email:
        return Response(
            {'message': 'Email required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    otp = str(random.randint(1000, 9999))

    otp_storage[email] = otp

    # send email
    send_mail(
        'Your OTP',
        f'Your OTP is {otp}',
        'pujithachallagundla@gmail.com',
        [email],
        fail_silently=False,
    )

    # check existing user
    user_exists = User.objects.filter(email=email).exists()

    return Response({
        'message': 'OTP sent',
        'existing_user': user_exists
    })


@api_view(['POST'])
def register_user(request):

    name = request.data.get('name')
    email = request.data.get('email')
    otp = request.data.get('otp')

    # check otp
    saved_otp = otp_storage.get(email)

    if saved_otp != otp:
        return Response(
            {'message': 'Invalid OTP'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # already exists
    if User.objects.filter(email=email).exists():
        return Response(
            {'message': 'User already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # create user
    User.objects.create_user(
        username=name,
        email=email,
        password='defaultpassword123'
    )

    return Response({
        'message': 'Registration successful'
    })


@api_view(['POST'])
def verify_login_otp(request):

    email = request.data.get('email')
    otp = request.data.get('otp')

    saved_otp = otp_storage.get(email)

    if saved_otp != otp:
        return Response(
            {'message': 'Invalid OTP'},
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response({
        'message': 'Login successful'
    })