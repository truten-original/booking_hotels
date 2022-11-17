import moment from 'moment'
const checkBookingInterval = (currentDate, interval) => {
  const getDate = (obj) => {
    const arr = [obj.years, obj.months, obj.date]
    const string = arr.join('-')
    return { arr, string }
  }
  const getDateObj = (date) => moment(date).toObject()
  const arrivalCurrentDateObj = getDateObj(currentDate[0])
  const departureCurrentDateObj = getDateObj(currentDate[1])
  const currentArrivalDateString = moment(getDate(arrivalCurrentDateObj).arr)
  const departureString = moment(getDate(departureCurrentDateObj).arr)
  const daysQuantity = departureString.diff(currentArrivalDateString, 'days')

  const boolResultArr = []
  if (!!interval.length) {
    const interArr = interval.map((i) => [
      getDate(getDateObj(i[0])).string,
      getDate(getDateObj(i[1])).string,
    ])
    const intervalArr = interArr.flat()
    if (daysQuantity === 0) {
      return !moment(getDate(arrivalCurrentDateObj).string).isBetween(
        intervalArr[0],
        intervalArr[1],
        undefined,
        '[]'
      )
    }

    const resultArr = []
    let initialDate = currentDate[0]
    for (let i = 0; i < daysQuantity; i++) {
      if (i === 0) {
        resultArr.push(getDate(arrivalCurrentDateObj).string)
      }
      initialDate = initialDate + 86400000
      resultArr.push(getDate(getDateObj(initialDate)).string)
    }
    for (const currentDate of resultArr) {
      for (const interval of interArr) {
        if (
          moment(currentDate).isBetween(
            interval[0],
            interval[1],
            undefined,
            '[]'
          )
        ) {
          boolResultArr.push(true)
        }
      }
    }
    if (boolResultArr.includes(true)) {
      return false
    }
  }
  return { isValid: true, daysQuantity }
}

export default checkBookingInterval