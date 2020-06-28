from django.db import models
from picklefield.fields import PickledObjectField


class Document(models.Model):
    name = models.CharField(max_length=300)
    data = PickledObjectField()
    created = models.DateTimeField(auto_now=True)
