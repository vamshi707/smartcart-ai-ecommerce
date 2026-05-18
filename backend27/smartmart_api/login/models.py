from django.db import models

class LoginDetail(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6, null=True, blank=True)

    def __str__(self):
        return self.email