document.addEventListener("DOMContentLoaded", function () {
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementById("main-content11")
        .insertAdjacentHTML("beforeend", data);
    })
    .catch((error) => console.error("Error loading footer.html:", error));
});

