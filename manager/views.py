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
from manager.secure import encrypt, decrypt


# Create your views here.

def base(request):
  return redirect(home)


def home(request, random=None):
  if request.user.is_authenticated:
    return redirect(dashboard)
  else:
    return redirect(generator)


def generator(request):
  data = {}
  data["generator"] = "active"
  data["title"] = "Generator | Password Manager"
  return render(request, "generator.html", data)


def dashboard(request):
  if request.user.is_authenticated:
    table = Password_Table.objects.filter(link=request.user)
    passwords = []
    for index, tr in enumerate(table, 1):
      d = {}
      d["index"] = str(index)
      d["name"] = tr.name
      d["password"] = decrypt(request.user, tr.name,
                              tr.password)
      passwords.append(d)
    if passwords == []:
      passwords = "nothing"
    data = {}
    data["passwords"] = passwords
    data["dashboard"] = "active no entries"
    data["title"] = "Dashboard | Password Manager"
    return render(request, "dashboard.html", data)
  else:
    return redirect(home)


def about(request):
  data = {}
  data["about"] = "active"
  data["title"] = "About | Password Manager"
  return render(request, "about.html", data)


def requests(request):
  if request.method == "POST":
    # SignUp User
    print("request")
    if request.POST["type"] == "signup":
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
        messages.success(request, "Your account has been created successfully\nPlease verify your email address to activate your account")
        response["ok"] = True
        return HttpResponse(json.dumps(response), content_type='application/json')

    # Login user
    elif request.POST["type"] == "login":
      email = request.POST["email"]
      password = request.POST["password"]
      user = authenticate(email=email, password=password)
      response = {}
      if user is not None:
        response["ok"] = True
        login(request, user)
        messages.success(
          request, "Your account has been logged in successfully")
        return HttpResponse(json.dumps(response), content_type='application/json')
      else:
        response['ok'] = False
        response["error"] = "Invalid username or password"
        return HttpResponse(json.dumps(response), content_type='application/json')

    # Logout User
    elif request.POST["type"] == "logout":
      print(logout)
      logout(request)
      messages.success(request, "Logged out Successfully")
      response = {}
      response["ok"] = True
      print("domain")
      return HttpResponse(json.dumps(response), content_type='application/json')
      

    # Save Password
    elif request.POST["type"] == "save":
      name = request.POST["name"]
      password = request.POST["password"]
      response = {}
      if Password_Table.objects.filter(name=name, link=request.user).exists():
        response['ok'] = False
        response["error"] = "Name already exists"
        return HttpResponse(json.dumps(response), content_type='application/json')
      else:
        response['ok'] = True
        data = Password_Table(name=name, password=encrypt(request.user, name, password),
                              link=request.user)
        data.save()
        return HttpResponse(json.dumps(response), content_type='application/json')

    # Delete Item
    elif request.POST["type"] == "delete":
      name = request.POST["name"]
      Password_Table.objects.get(name=name).delete()
      response = {}
      response['ok'] = True
      return HttpResponse(json.dumps(response), content_type='application/json')
  else:
    return redirect(home)


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


def delete(request):
  if request.user.is_authenticated:
    return render(request, "delete.html")
  else:
    return redirect(home)
