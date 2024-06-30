document.addEventListener("DOMContentLoaded", function () {
  fetch("headerTop.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header77").insertAdjacentHTML("beforeend", data);
    })
    .catch((error) => console.error("Error loading headerTop.html:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("testimoniosClientes.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementById("testimonios")
        .insertAdjacentHTML("beforeend", data);
    })
    .catch((error) =>
      console.error("Error loading testimoniosClientes.html:", error),
    );
});

