const formatLongDate = (_date) => {
  // Extract year, month, and day (Month is 0-based)
  const [year, month, day] = _date.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  // The first parameter undefined lets the browser detect the user's
  // current locale.
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

const dateTimeUtility = {
  formatLongDate
}

export default dateTimeUtility
