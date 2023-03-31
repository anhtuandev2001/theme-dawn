const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const productVariantTitles = $$(".js-product__variant-title");
const productImg = $(".product__img");
const productMedia = $(".product__media");
const slideControlCount = $(".slide-control__count");
const productPriceContainers = $$(".product__price-container");
const productBtnItems = $$(".product__btn-item");



// check sold out
let CheckSoldOut = $(
  ".product__price-container.product__price-container--active"
).classList.contains("product__price--soldout");

const btnSoldOut = () => {
  CheckSoldOut = $(
    ".product__price-container.product__price-container--active"
  ).classList.contains("product__price--soldout");
  if (CheckSoldOut == true) {
    productBtnItems.forEach((productBtnItem) => {
      productBtnItem.classList.add("btn--disable");
    });
  } else {
    productBtnItems.forEach((productBtnItem) => {
      productBtnItem.classList.remove("btn--disable");
    });
  }
};
// 

btnSoldOut();

let widthProductImg = productImg.offsetWidth;
let transformMedia = 1;

let controlIndex = 0;
let slideControlCurrent = 1;
const variantsSize = slideControlCount.dataset.variantsSize;
const updateCount = (value) => {
  slideControlCount.innerHTML = `${value}/${variantsSize}`;
};
updateCount(slideControlCurrent);
// tap slide
productVariantTitles.forEach((productVariantTitle, index) => {
  productVariantTitle.addEventListener("click", () => {

    const productPriceContainer = productPriceContainers[index];
    $(
      ".product__variant-title.product__variant-title--active"
    ).classList.remove("product__variant-title--active");
    $(
      ".product__price-container.product__price-container--active"
    ).classList.remove("product__price-container--active");
    productVariantTitle.classList.add("product__variant-title--active");
    productPriceContainer.classList.add("product__price-container--active");

    controlIndex = index;

    widthProductImg = productImg.offsetWidth;
    transformMedia = widthProductImg * index;
    
    productMedia.style.transform = `translateX(-${transformMedia}px)`;
    
    slideControlCurrent = index + 1;
    updateCount(slideControlCurrent);
    btnSoldOut();
  });
});

const slideControlLeft = $('.js-slide-control-left');
const slideControlRight = $('.js-slide-control-right');

slideControlRight.addEventListener('click',()=>{
    if(slideControlCurrent < variantsSize){
    controlIndex += 1;

    widthProductImg = productImg.offsetWidth;
    transformMedia = widthProductImg * controlIndex;
    
    productMedia.style.transform = `translateX(-${transformMedia}px)`;
    
    slideControlCurrent = controlIndex + 1;
    updateCount(slideControlCurrent);
    }else{
    controlIndex = 0;

    widthProductImg = productImg.offsetWidth;
    transformMedia = widthProductImg * controlIndex;
    
    productMedia.style.transform = `translateX(-${transformMedia}px)`;
    
    slideControlCurrent = controlIndex + 1;
    updateCount(slideControlCurrent);
    }
})

slideControlLeft.addEventListener('click',()=>{
    if(slideControlCurrent > 1){
        controlIndex -= 1;
    
        widthProductImg = productImg.offsetWidth;
        transformMedia = widthProductImg * controlIndex;
        
        productMedia.style.transform = `translateX(-${transformMedia}px)`;
        
        slideControlCurrent = controlIndex + 1;
        updateCount(slideControlCurrent);
    }else{
        controlIndex = variantsSize - 1;
    
        widthProductImg = productImg.offsetWidth;
        transformMedia = widthProductImg * controlIndex;
        
        productMedia.style.transform = `translateX(-${transformMedia}px)`;
        
        slideControlCurrent = controlIndex + 1;
        updateCount(slideControlCurrent);
        }
})

// ---------------------
// quantity
let quantityValue = Number($(".quantity__input").value);
const productMinus = $(".product-minus");
const productPlus = $(".product-plus");

productMinus.onclick = function () {
  if (quantityValue > 1) {
    quantityValue -= 1;
    $(".quantity__input").value = quantityValue;
  }
};

productPlus.onclick = function () {
  if (quantityValue < 10) {
    quantityValue = quantityValue + 1;
    $(".quantity__input").value = quantityValue;
  }
};

// ----------------------------
// add to cart
const addToCartBtn = $(".product-add-to-cart");
addToCartBtn.addEventListener("click", function () {
  if (CheckSoldOut == false) {
    const variantId = $(
      ".product__variant-title.product__variant-title--active"
    ).dataset.variantId;
    const quantity = $(".quantity__input").value;
    const formData = new FormData();
    formData.append("id", variantId);
    formData.append("quantity", quantity);
    fetch("/cart/add.js", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        headerContainer.style.top = '0';
        showSuccessToast();
        updateCartItemCount();
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});
//

// buy now
const buyNow = $(".btn-buy-now");
buyNow.addEventListener("click", function () {
  if (CheckSoldOut == false) {
    const variantId = $(
      ".product__variant-title.product__variant-title--active"
    ).dataset.variantId;
    const quantity = $(".quantity__input").value;
    const formData = new FormData();
    formData.append("id", variantId);
    formData.append("quantity", quantity);
    fetch("/cart/add.js", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        window.location.href = "/cart";
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});
//
