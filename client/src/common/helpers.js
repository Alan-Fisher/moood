export const parseQueryString = (str) => {
  const objURL = {}

  str.replace(
    new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
    ($0, $1, $2, $3) => {
      objURL[$1] = $3
    },
  )

  return objURL
}

export const transformDateForInput = (date) => {
  const array = date.toLocaleDateString('en-US').split('/')
  array.unshift(array.pop())

  return array.join('-')
}
