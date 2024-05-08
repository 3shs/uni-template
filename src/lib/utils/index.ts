export function debounce(
  func: Function,
  wait: number,
  immediate: boolean
  )
  {
  let timeout: any
  return function () {
    // 保存this 解决this指向问题
    // @ts-ignore TODO
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

interface ScEum {
  CYR: string
  FDM: string
  HYM: string
  long: string
  short: string
  ENABLE: string
  UNABLE: string
  'long,short': string
  OPT: string
  OPT_FIGHT: string
}

const SC_EUM: ScEum = {
  CYR: '波段',
  FDM: '突破',
  HYM: '箱体',
  long: '做多',
  short: '做空',
  ENABLE: '启用',
  UNABLE: '停用',
  "long,short": '多空双开',
  OPT: '期权',
  OPT_FIGHT: '短线期权'
}

export function formatEum(type: keyof ScEum) {
  return SC_EUM[type]
}
