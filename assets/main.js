// /Script để update số lượng sản phẩm trong giỏ hàng

// Lấy thẻ HTML chứa số lượng sản phẩm trong giỏ hàng
const cartItemCount = document.getElementById("cart-item-count");

// Lấy số lượng sản phẩm trong giỏ hàng từ đối tượng JSON trả về sau khi thêm sản phẩm vào giỏ hàng
function updateCartItemCount() {
  fetch("/cart.json")
    .then((response) => response.json())
    .then((data) => {
      const itemCount = data.item_count;
      cartItemCount.textContent = itemCount;
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    });
}

// Gọi hàm updateCartItemCount để cập nhật số lượng sản phẩm ban đầu
updateCartItemCount();
