// const cardItems = document.querySelectorAll(".card__item");

// cardItems.forEach((ele) => {
//   const addToCartBtn = ele.querySelector(".add-to-cart-btn");
//   const featureCollectionNotifi = ele.querySelector('.feature-collection__notification')
//   addToCartBtn.addEventListener("click", function () {
//     const variantId = ele.querySelector(".product-select").value;
//     const quantity = ele.querySelector(".quantity").value;
//     const formData = new FormData();
//     formData.append("id", variantId);
//     formData.append("quantity", quantity);
//     fetch("/cart/add.js", {
//       method: "POST",
//       body: formData,
//     })
//       .then(function (response) {
//         showSuccessToast();
//         updateCartItemCount();
//         return response.json();
//       })
//       .then(function (json) {
//         console.log(json);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   });
//   //
// });

// add to cart
function addToCart(productId, variantId) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/cart/add.js');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Update cart count
        updateCartItemCount();
        showSuccessToast();
      } else {
        alert('Error adding product to  cart: ' + xhr.responseText);
      }
    };
    xhr.send(JSON.stringify({
      'id': variantId,
      'quantity': 1
    }));
  }
//
