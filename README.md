# Reflect

Simple endpoint to reflect HTML.


## Example Usage:
```py
from urllib.parse import quote

def https_host(src: str) -> str:
  html = quote(src)
  return f"https://reflect.ahh.bet/#{html}"

html_source = "<script>alert('hi!')</script>"
url = https_host(html_source) # https://reflect.ahh.bet/#%3Cscript%3Ealert%28%27hi%21%27%29%3C/script%3E
```
