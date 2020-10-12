/* eslint-disable no-param-reassign,no-underscore-dangle,prefer-rest-params,no-use-before-define */
function throttle(fn, interval, option) {
  let last = 0;
  let timer = null;
  if (!option) option = {};

  const trailing = option.trailing || false;
  const result = option.result || null;

  const handleFn = function handleFn() {
    // this和argument
    const _this = this;
    const _arguments = arguments;

    const now = new Date().getTime();
    if (now - last > interval) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      callFn(_this, _arguments);
      last = now;
    } else if (timer === null && trailing) { // 只是最后一次
      timer = setTimeout(() => {
        timer = null;
        callFn(_this, _arguments);
      }, interval);
    }
  };

  handleFn.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  function callFn(context, argument) {
    const res = fn.apply(context, argument);
    if (result) {
      result(res);
    }
  }

  return handleFn;
}

export default throttle;
