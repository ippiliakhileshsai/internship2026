import json
import urllib.request
import urllib.error

payload = json.dumps({'email': 'admin@governance.local', 'password': 'admin123'}).encode()
req = urllib.request.Request('http://127.0.0.1:8001/api/auth/login', data=payload, headers={'Content-Type': 'application/json'})
try:
    response = urllib.request.urlopen(req)
    print(response.status)
    print(response.read().decode())
except urllib.error.HTTPError as error:
    print(error.code)
    print(error.read().decode())
