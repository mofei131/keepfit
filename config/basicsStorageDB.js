// Basics 用于存储基础数据
export const setBasicsDB = function (key, v) {
  var val = ''
  if (typeof(v) === 'object') {
    val = JSON.stringify(v)
    val = val.toString()
  } else {
    val = v
  }
  localStorage.setItem(key, val)
}

export const getBasicsDB = function (key) {
  var val = localStorage.getItem(key)
  try {
    if (JSON.parse(val)) {
      return JSON.parse(val)
    } else {
      return val
    }
  } catch (e) {

  }
  if(val=="null"){
    return null
  }
  return val
}

export const deleteBasicsDB = function (key) {
  localStorage.removeItem(key)
}
