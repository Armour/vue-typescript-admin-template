/**
 * Parse the time to string
 *
 * @export
 * @param {(object | string | number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time?: object | string | number, cFormat?: string) {
  if (arguments.length === 0) {
    return null
  }
  if (time === undefined) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      return '0' + value
    }
    return String(value) || '0'
  })
  return timeStr
}

interface IDebounce {
  [key: string]: Function | number | boolean
}

/**
 * @export
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @returns
 */
export function debounce(func: Function, wait: number, immediate?: boolean) {
  let timeout: NodeJS.Timeout | null,
    localArgs: any,
    context: Function | null,
    timestamp: number,
    result: any

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为 immediate === true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, localArgs)
        if (!timeout) {
          context = localArgs = null
        }
      }
    }
  }

  return function(...args: any[]) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      context = localArgs = null
    }

    return result
  }
}
