import throttle from './throttle';

/**
 *滑动改变路由
 * @param {this} self 必须传入this对象
 * @param {DOM}  dom  需要监听滑动的DOM对象
 * @param {String} to  跳转的下一个页面的path
 * @param {String} back 返回的上一个页面
 * @param {Boolean} ifNext 是否可以跳转下一个页面
 */
function slideChange(self, dom, to, back = '', ifNext = true, ifPrev = true) {
  let startY = 0; let
    endY = 0;
  const start = throttle((e) => {
    startY = e.touches[0].clientY;
  }, 3000);
  dom.addEventListener('touchstart', start);
  const cancle = (e) => {
    e.preventDefault();
  };
  dom.addEventListener('touchmove', cancle, { passive: false });

  const end = throttle((e) => {
    endY = e.changedTouches[0].clientY;
    const diffY = endY - startY;
    if (diffY < -50 && ifNext) {
      self.$emit('nextPage', 1);
      self.$router.push(to);
    }
    if (diffY > 50 && ifPrev) {
      self.$emit('nextPage', 0);
      if (!back) {
        self.$router.back();
      } else {
        self.$router.push(back);
      }
    }
  }, 3000);
  dom.addEventListener('touchend', end);
}

export default slideChange;
