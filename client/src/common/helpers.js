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
  const array = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).split('/')
  array.unshift(array.pop())

  return array.join('-')
}
