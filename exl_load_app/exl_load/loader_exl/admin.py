from django.contrib import admin
from  .models import Document
# Register your models here.


class DocumentAdmin(admin.ModelAdmin):
    readonly_fields = ('created',)
    fields = ('name', 'created')

admin.site.register(Document, DocumentAdmin)