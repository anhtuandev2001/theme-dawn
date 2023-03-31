const headerMenu = document.querySelector(".js-header__menu");
const headerIconMenu = document.querySelector(".js-header__icon-menu");
const headerIconClose = document.querySelector(".js-header__icon-close");
const headerNavContainer = document.querySelector(".js-header__nav-container");
const headerNavChildLists = document.querySelectorAll(".js-header__nav-child-list");
const body = document.body;
const HeaderNavItems = document.querySelectorAll(".js-header__nav-item");
const headerNavChildTexts = document.querySelectorAll(".js-header__nav-child-text");
const notification = document.querySelector('.js-notification')
const headerContainer = document.querySelector(".js-header__container");
const announcementBar = document.querySelector(".announcement-bar");
const headerSearch = document.querySelector('.header__search');
const headerSearchContainer = document.querySelector('.header__search-container');
const headerFormClose = document.querySelector('.header__form-close');
const headerModal = document.querySelector('.header__modal');
const headerModalMenu = document.querySelector('.header__modal-menu');

// header__menu click
headerMenu.addEventListener("click", () => {
  toggleMenu();
  showNavItem();
  headerModalMenu.classList.toggle('d-none');
});

headerModalMenu.addEventListener('click',()=>{
  toggleMenu();
  showNavItem();
  headerModalMenu.classList.toggle('d-none');
});
// 

// dong mo menu child
HeaderNavItems.forEach((HeaderNavItem, index) => {
  headerMenu.addEventListener("click", showNavItem);
  HeaderNavItem.addEventListener("click", (event) =>
    toggleChildMenu(event, index)
  );
});
// 

// dong menu child khi click vao headerNavChildText
headerNavChildTexts.forEach((headerNavChildText) => {
  headerNavChildText.addEventListener("click", () => removeChildMenu());
});
// 

// lay chieu cao cua announcementHeight khi co block va khong co block
let blocksSet = announcementBar.dataset.blocksSize;
let announcementHeight = 0;
if (blocksSet > 0) {
  announcementHeight = announcementBar.clientHeight;
}
// 

// tinh chieu cao cua nav__container
const windowHeight = window.innerHeight;
const headerHeight = headerContainer.clientHeight;
const navHeight = windowHeight - headerHeight - announcementHeight;
document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
//

// top nav
const headerMenuHeight = headerMenu.clientHeight;
const headerNavContainerTop = (headerHeight + headerMenuHeight) / 2;
document.documentElement.style.setProperty(
  "--header-nav-container-top",
  `${headerNavContainerTop}px`
);

// bat su kien khi scroll qua announ + header
const srollHeader = announcementHeight + headerHeight;
window.addEventListener("scroll", () => {
  if (window.scrollY > srollHeader) { // khi scroll qua announ + header
    headerContainer.classList.add("header-scroll");
    paddingBody(headerHeight);
  } else if (window.scrollY < announcementHeight) {
    headerContainer.classList.remove("header-scroll");
    paddingBody(0);
  }
});
// 

// even srcoll up and down
  let prevScrollpos = window.pageYOffset; //gan gia vi tri hien tai
  window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) { //so sanh vi tri hien tai voi vi tri sau khi scroll
      headerContainer.style.top = '0'; //run code when scroll down
      // notification.style.top = headerHeight; //run code when scroll down
    } else {
      headerContainer.style.top = '-100%';//run code when scroll up
      // notification.style.top = '0';//run code when scroll up
    }
    prevScrollpos = currentScrollPos; // gan prevScrollpos = vi tri sau khi scroll
  };
//


// function---------------------------

// --------menu----------
// toggle class
 function toggleMenu (){
  headerNavContainer.classList.toggle("header-open-menu"); //   remove header-open-menu of header__nav-container
  headerIconMenu.classList.toggle("icon-menu-show"); //   toggle icon-menu-show of header__icon-menu
  headerIconClose.classList.toggle("icon-menu-show"); //   toggle icon-menu-show of header__icon-close
  headerNavChildLists.forEach((headerNavChildList) => {
    headerNavChildList.classList.remove("header-open-menu"); //   remove header-open-menu of header__nav-child-list
  });
  body.classList.toggle("no-scroll"); //   body no scroll
};
//

// remove class d-none of Header__Nav-Item
 function showNavItem (){
  HeaderNavItems.forEach((HeaderNavItem) => {
    HeaderNavItem.classList.remove("d-none");
    //   HeaderNavItem remove class hidden
  });
};

// toggle class header-open-menu of chile menu
 function toggleChildMenu (event, index){
  let headerNavChildList = headerNavChildLists[index];
  // event.preventDefault();
  headerNavChildList.classList.toggle("header-open-menu");
};

// remove class header-open-menu of child menu
 function removeChildMenu (){
  headerNavChildLists.forEach((headerNavChildList) => {
    headerNavChildList.classList.remove("header-open-menu");
  });
};

//set padding-bottom announ
 function paddingBody (paddingValue){
  body.style.paddingTop = `${paddingValue}px`;
};
// 
//---------end menu----------

// search


headerSearch.addEventListener('click', () => {
  headerSearchContainer.style.transform = 'translateY(0)';
  headerModal.classList.remove('d-none')
  body.classList.toggle("no-scroll"); //   body no scroll

});


const hiddenSearch = ()=>{
  headerSearchContainer.style.transform = 'translateY(-140%)';
  headerModal.classList.add('d-none');
  body.classList.toggle("no-scroll"); //   body no scroll
};

headerFormClose.addEventListener('click', hiddenSearch);

headerModal.addEventListener('click',hiddenSearch);

