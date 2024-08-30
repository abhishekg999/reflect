# Reflect

Simple endpoint to reflect HTML.


## Example Usage:
```py
from base64 import b64encode

def https_host(src: str) -> str:
    html = b64encode(src.encode()).decode()
    return f"https://reflect.ahh.bet/#{html}"

html_source = "<script>alert('hi!')</script>"
url = https_host(html_source) # https://reflect.ahh.bet/#PHNjcmlwdD5hbGVydCgnaGkhJyk8L3NjcmlwdD4=

```
