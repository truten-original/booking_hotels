import { current } from '@reduxjs/toolkit'
import * as moment from 'moment'
const checkBookingInterval = (currentDate, interval) => {
  const boolResultArr = []
  if (!!interval.length) {
    const getDate = (obj) => {
      const arr = [obj.years, obj.months, obj.date]
      const string = arr.join('-')
      return { arr, string }
    }
    const getDateObj = (date) => moment(date).toObject()
    const arrivalCurrentDateObj = getDateObj(currentDate[0])
    const departureCurrentDateObj = getDateObj(currentDate[1])
    const currentArrivalDate = moment(getDate(arrivalCurrentDateObj).arr)
    const departureString = moment(getDate(departureCurrentDateObj).arr)
    const daysQuality = departureString.diff(currentArrivalDate, 'days')
    const intervalsArr = interval.map((i) => [
      getDate(getDateObj(i[0])).string,
      getDate(getDateObj(i[1])).string,
    ])
    const resultArr = []
    let initialDate = currentDate[0]
    for (let i = 0; i < daysQuality; i++) {
      if (i === 0) {
        resultArr.push(getDate(arrivalCurrentDateObj).string)
      }
      initialDate = initialDate + 86400000
      resultArr.push(getDate(getDateObj(initialDate)).string)
    }
    for (const currentDate of resultArr) {
      for (const interval of intervalsArr) {
        if (moment(currentDate).isBetween(interval[0], interval[1])) {
          boolResultArr.push(true)
        }
      }
    }

    console.log(resultArr)
    console.log(intervalsArr)
    console.log(boolResultArr)
    if (boolResultArr.includes(true)) {
      return false
    }
  }

  return true
}

export default checkBookingInterval
