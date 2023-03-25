const notificationCloser = document.querySelector('.js-notification__closer');
const notification = document.querySelector('.js-notification');


const removeNotification = (ele) => {
  ele.innerHtml = '';
};

const closerNotifi = ()=>{
    notificationCloser.addEventListener('click', () => {
      notification.style.top = '-100%';
    });
    removeNotification(ele);
}