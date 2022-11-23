from django.forms import model_to_dict
from django.shortcuts import HttpResponse, redirect, render
from manager.models import Password_Table, User
import json
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from manager.tokens import generate_token
from django.core.mail import EmailMessage
from password_manager import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout


# Create your views here.

def base(request):
  if request.user.is_authenticated:
    print("u")
    return redirect(dashboard)
  else:
    print("r")
    return redirect(generator)


def home(request):
  print("Home")
  if request.user.is_authenticated:
    print("u")
    return redirect(dashboard)
  else:
    print("r")
    return redirect(generator)


def generator(request):
  return render(request, "generator.html")


def dashboard(request):
  if request.user.is_authenticated:
    print("i")
    table = Password_Table.objects.filter(link=request.user)
    passwords = []
    for index, tr in enumerate(table):
      d = {}
      d["index"] = "copy-" + str(index)
      d["name"] = tr.name
      d["password"] = tr.password
      passwords.append(d)
    print(passwords)
    data = {}
    data["passwords"] = passwords
    data["dashboard"] = "active"
    data["title"] = "Dashboard | Password Manager"
    return render(request, "dashboard.html", data)
  else:
    return redirect(generator)


def signup(request):
  if request.method == "POST":
    name = request.POST["name"]
    email = request.POST["email"]
    password = request.POST["password"]
    response = {}
    if User.objects.filter(email=email).exists():
      response["ok"] = False
      response["error"] = "Email already registered"
      return HttpResponse(json.dumps(response), content_type='application/json')
    else:
      user = User.objects.create_user(
        email=email, password=password, name=name)
      user.is_active = False
      response["ok"] = True
      email_subject = "Confirm your Email Password Manager"
      message = render_to_string("message.html", {
        "name": user.name,
        "domain": get_current_site(request).domain,
        "uid": urlsafe_base64_encode(force_bytes(user.pk)),
        "token": generate_token.make_token(user)
      })
      email_obj = EmailMessage(email_subject, message,
                               settings.EMAIL_HOST_USER, [user.email])
      email_obj.content_subtype = "html"
      email_obj.fail_silently = True
      email_obj.send()
      user.save()
      return HttpResponse(json.dumps(response), content_type='application/json')


def activate(request, uidb64, token):
  try:
    uid = force_str(urlsafe_base64_decode(uidb64))
    user = User.objects.get(pk=uid)
  except (TypeError, ValueError, OverflowError, User.DoesNotExist):
    user = None
  if user is not None and generate_token.check_token(user, token):
    user.is_active = True
    user.save()
    login(request, user)
    return HttpResponse('<script>alert("Your Account has been activated and logged in!!");window.location.href = "/home"</script>')
  else:
    return HttpResponse('<script>alert("Error occurred while activating");window.location.href = "/home"</script>')


def login_user(request):
  if request.method == "POST":
    print("GOTsdfb")
    email = request.POST["email"]
    password = request.POST["password"]
    print(email, password)
    user = authenticate(email=email, password=password)
    response = {}
    if user is not None:
      response["ok"] = True
      print("in if")
      login(request, user)
      return HttpResponse(json.dumps(response), content_type='application/json')
    else:
      print("in else")
      response['ok'] = False
      response["error"] = "Invalid username or password"
      return HttpResponse(json.dumps(response), content_type='application/json')


def save(request):
  if request.method == 'POST':
    name = request.POST["name"]
    password = request.POST["password"]
    response = {}
    if Password_Table.objects.filter(name=name).exists():
      response['ok'] = False
      response["error"] = "Name already exists"
      return HttpResponse(json.dumps(response), content_type='application/json')
    else:
      response['ok'] = True
      data = Password_Table(name=name, password=password, link=request.user)
      data.save()
      return HttpResponse(json.dumps(response), content_type='application/json')

def logout_user(request):
  logout(request)
  return HttpResponse('<script>alert("Successfully logged out");window.location.href = "/home"</script>')


def about(request):
  data = {}
  data["about"] = "active"
  data["title"] = "About | Password Manager"
  return render(request, "about.html", data)
