from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Document
from django.http import JsonResponse
import pandas as pd

def main(request):
    return render(request, 'index.html')


def get_documents(request):
    c = list(Document.objects.values('id', 'name', 'created').order_by('-created'))
    return JsonResponse(c, safe=False)


@csrf_exempt
def loading(request):
    insert = Document(name=request.FILES['file'], data=request.FILES['file'].read())
    insert.save()
    return HttpResponse(200)


def show_doc(request, id):
    if id:
        doc = Document.objects.get(id=id)
        data = pd.read_excel(doc.data)
        data = data.fillna('-')
        d = data.to_html()
        return HttpResponse(d)
