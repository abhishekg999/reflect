document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));

    tab.classList.add("active");

    const tabId = tab.getAttribute("data-tab");
    document.getElementById(`${tabId}-tab`).classList.add("active");
  });
});

document.querySelectorAll(".example-item").forEach((item) => {
  item.addEventListener("click", () => {
    const html = item.getAttribute("data-html");
    document.getElementById("source").value = html;

    document.getElementById("source").dispatchEvent(new Event("input"));

    document.querySelector('[data-tab="create"]').click();
  });
});

function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = "notification";
  notification.classList.add(type);
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function copyPythonToClipboard() {
  const pythonCode = `
from urllib.parse import quote

def https_host(src: str) -> str:
  """
  Example:
      >>> html_source = "&lt;script&gt;alert('hi!')&lt;/script&gt;"
      >>> https_host(html_source)
      'https:
  """
  html = quote(src)
  return f"https:
`.trim();
  navigator.clipboard.writeText(pythonCode);
  showNotification("Python code copied to clipboard!");
}

function copyJsToClipboard() {
  const jsCode = `
function createReflectLink(htmlString) {
  const encodedHtml = encodeURIComponent(htmlString);
  return \`https:
}
`.trim();
  navigator.clipboard.writeText(jsCode);
  showNotification("JavaScript code copied to clipboard!");
}

function minifyHTML(html) {
  return html
    .replace(/\n/g, " ")
    .replace(/[\t ]+/g, " ")
    .replace(/> </g, "><")
    .trim();
}

function setVisibility(element, isVisible) {
  element.style.display = isVisible ? "block" : "none";
}

window.onload = () => {
  if (location.hash) {
    try {
      document.write(decodeURIComponent(location.hash.slice(1)));
    } catch (e) {
      document.body.innerHTML =
        '<div class="container"><p style="color: red; font-size: 1.2rem; text-align: center;">Invalid HTML encoding in URL hash.</p></div>';
    }
  } else {
    const sourceTextarea = document.getElementById("source");
    const resultSpan = document.getElementById("result-span");
    const resultLink = document.getElementById("result-link");
    const openUrlBtn = document.getElementById("open-url-btn");
    const minifyCheckbox = document.getElementById("minify-html");
    const copyUrlBtn = document.getElementById("copy-url-btn");

    setVisibility(resultSpan, false);

    sourceTextarea.addEventListener("input", function () {
      let htmlContent = this.value;

      if (minifyCheckbox.checked) {
        htmlContent = minifyHTML(htmlContent);
      }

      setVisibility(resultSpan, true);
      const url = new URL(location.href);
      url.hash = encodeURIComponent(htmlContent);

      resultLink.href = url.href;
      resultLink.textContent = url.href;
      resultLink.target = "_blank";
      resultLink.rel = "noopener noreferrer";

      openUrlBtn.href = url.href;

      if (this.value.trim() === "") {
        setVisibility(resultSpan, false);
      }
    });

    copyUrlBtn.addEventListener("click", function () {
      const link = document.getElementById("result-link").href;
      navigator.clipboard.writeText(link);
      showNotification("URL copied to clipboard!");
    });

    if (window.location.hash) {
      const hashContent = decodeURIComponent(window.location.hash.slice(1));
      sourceTextarea.value = hashContent;
      sourceTextarea.dispatchEvent(new Event("input"));
    }
  }
};
