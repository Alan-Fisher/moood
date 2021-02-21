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

export const transformDateTimeToDate = (dateTime) => new Date(dateTime)
  .toLocaleString('en', { day: 'numeric', month: 'long', year: 'numeric' })

export const transformDateTimeToTime = (dateTime) => new Date(dateTime)
  .toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' })

export const maxMoodLevel = 3 // TODO: replace hardcoded 3 with the biggest level from json
