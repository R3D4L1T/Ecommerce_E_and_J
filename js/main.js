(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 55) {
        $(".fixed-top").addClass("shadow");
      } else {
        $(".fixed-top").removeClass("shadow");
      }
    } else {
      if ($(this).scrollTop() > 55) {
        $(".fixed-top").addClass("shadow").css("top", -55);
      } else {
        $(".fixed-top").removeClass("shadow").css("top", 0);
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 2000,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  });

  // vegetable carousel
  $(".vegetable-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0",
      );
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Product Quantity
  $(".quantity button").on("click", function () {
    var button = $(this);
    var oldValue = button.parent().parent().find("input").val();
    if (button.hasClass("btn-plus")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    button.parent().parent().find("input").val(newVal);
  });
})(jQuery);

// link to google maps
document.addEventListener("DOMContentLoaded", function () {
  const address = "1600 Amphitheatre Parkway, Mountain View, CA";
  const mapLink = document.getElementById("mapLink");
  mapLink.href = `https://www.google.com/maps/place/Jr.+Huancayo+209,+Cajamarca+06002/@-7.1650571,-78.5032663,18z/data=!4m5!3m4!1s0x91b25b1e123a1711:0x2671af9a87fc72f1!8m2!3d-7.1647242!4d-78.5025192?entry=ttu`;
});

// link to gmail message
document.addEventListener("DOMContentLoaded", function () {
  const email = " &JMini@markett.com";
  const subject = "Subject Here";
  const body = "Body content here";
  const gmailLink = document.getElementById("gmailLink");
  gmailLink.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// saved the product in the local store
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCountElement = document.getElementById("cart-count");

  let cartCount = JSON.parse(localStorage.getItem("cart"))?.length || 0;
  cartCountElement.textContent = cartCount;

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const productElement = button.closest(".fruite-item");
      const product = {
        image: productElement.querySelector(".fruite-img img").src,
        name: productElement.querySelector("h4").textContent,
        price: productElement.querySelector(".fs-5").textContent,
        quantity: 1,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let total = parseFloat(localStorage.getItem("total")) || 0;

      // Check if the product is already in the cart
      const productExists = cart.some((item) => item.name === product.name);

      if (!productExists) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        total += parseFloat(product.price.replace(/[^\d.-]/g, ""));
        localStorage.setItem("total", total.toFixed(2));
        cartCount += 1;
        cartCountElement.textContent = cartCount;
        console.log("Product added to cart!");
      } else {
        console.log("Product is already in the cart!");
      }
    });
  });
});

// show products of the cart
document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = parseFloat(localStorage.getItem("total")) || 0;
  const totalElement = document.getElementById("total-amount");
  const subtotalElement = document.getElementById("subtotal-amount");
  const shippingCost = 3.0;
  const couponInput = document.getElementById("coupon-code");
  const applyCouponButton = document.getElementById("apply-coupon");
  const couponMessageElement = document.getElementById("coupon-message");
  let discount = 0;

  const proceedCheckoutButton = document.getElementById("proceed-checkout");

  function updateCart() {
    total = cart.reduce(
      (sum, product) =>
        sum +
        parseFloat(product.price.replace(/[^\d.-]/g, "")) * product.quantity,
      0,
    );
    total -= discount;

    // save update total to locasl storage
    localStorage.setItem("total", total.toFixed(2));
    // Save updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Refresh cart display
    displayCart();
  }

  function displayCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<tr><td colspan="6" class="text-center">Your cart is empty.</td></tr>';
    } else {
      cart.forEach((product, index) => {
        const productRow = document.createElement("tr");
        const priceText = product.price.replace(/[^\d.-]/g, "");

        const priceP = parseFloat(priceText);
        const quantityP = parseFloat(product.quantity);

        productRow.innerHTML = `
                    <th scope="row">
                        <div class="d-flex align-items-center">
                            <img src="${product.image}" class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="${product.name}">
                        </div>
                    </th>
                    <td>
                        <p class="mb-0 mt-4">${product.name}</p>
                    </td>
                    <td>
                        <p class="mb-0 mt-4">${product.price}</p>
                    </td>
                    <td>
                        <div class="input-group quantity mt-4" style="width: 100px;">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-minus rounded-circle bg-light border">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" class="form-control form-control-sm text-center border-0" value="${product.quantity}">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-plus rounded-circle bg-light border">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 mt-4"> S/ ${(priceP * quantityP).toFixed(2)}</p>
                    </td>
                    <td>
                        <button class="btn btn-md rounded-circle bg-light border mt-4 remove-item">
                            <i class="fa fa-times text-danger"></i>
                        </button>
                    </td>
                `;

        // Add event listeners for quantity buttons
        productRow.querySelector(".btn-minus").addEventListener("click", () => {
          if (product.quantity > 1) {
            product.quantity -= 1;
            updateCart();
          }
        });

        productRow.querySelector(".btn-plus").addEventListener("click", () => {
          product.quantity += 1;
          updateCart();
        });

        // Add event listener for remove button
        productRow
          .querySelector(".remove-item")
          .addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
          });

        cartItemsContainer.appendChild(productRow);
      });

      // update subtotal and total elements to proced Checkout
      subtotalElement.textContent = `S/ ${total.toFixed(2)}`;
      totalElement.textContent = `S/ ${(total + shippingCost).toFixed(2)}`;
    }
  }

  // apply coupon code
  applyCouponButton.addEventListener("click", function () {
    const couponCode = couponInput.value.trim();
    if (couponCode == "aaaooo") {
      discount = 5;
      updateCart();
      couponInput.textContent = "";
      couponMessageElement.textContent = "Descuento de S/ 5";
    } else {
      discount = 0;
      couponMessageElement.textContent = "Cupon Invalido!!!";
    }
  });

  proceedCheckoutButton.addEventListener("click", function () {
    window.location.href = "chackout.html";
  });

  // Initialize cart display
  displayCart();
});
