export function debounce(func, wait, immediate) {
  let timeout
  return function () {
    // 保存this 解决this指向问题
    let ctx = this
    // 保存事件对象
    let args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
        let callNow = !timeout
        timeout = setTimeout(function() {
            timeout = null
        }, wait)
        // 如果已经调用就不用调用了
        if (callNow) func.apply(ctx, args)
    } else {
        timeout = setTimeout(function() {
            func.apply(ctx, args)
        }, wait)
    }
  }
}
