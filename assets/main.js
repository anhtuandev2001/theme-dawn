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
