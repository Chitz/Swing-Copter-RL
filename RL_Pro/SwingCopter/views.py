from django.shortcuts import render

file1 = open("data.txt","a")

# Create your views here.
from .forms import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
def contact(request):

    form = ContactForm(request.POST or None)
    context = {
    "form" : form,

    }

    return render(request,"index.html",context)

def play_count_by_month(request):
    # print(list(Node_Data.objects.all().values('name','group')))
    # print(list(Node_Relations.objects.all().values('destination_node','source_node')))
    data = ""
    jsondata= {
        "succ" : "True"
    }
    # print (dict(request.POST))

    
    for key in dict(request.POST):
        print (key)
        data = key
        file1 = open("data.txt","a")
        file1.write(data)
        file1.write("\n")
        file1.close()
    return JsonResponse(jsondata, safe=False)


