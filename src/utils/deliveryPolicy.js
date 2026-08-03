import dayjs from 'dayjs'

export const MINIMUM_DELIVERY_DATE_COUNT = 3

export function formatDeliveryDateList(deliveryDates) {
  return deliveryDates.map((date) => dayjs(date).format('M월 D일')).join(' · ')
}

export function isDeliveryDateAvailable(deliveryDate, now = dayjs()) {
  const date = dayjs(deliveryDate).startOf('day')

  return !date.isBefore(dayjs(now).startOf('day')) && date.day() !== 0
}

export function hasMinimumDeliveryDates(deliveryDates, now = dayjs()) {
  return (
    deliveryDates.filter((deliveryDate) => isDeliveryDateAvailable(deliveryDate, now)).length >=
    MINIMUM_DELIVERY_DATE_COUNT
  )
}

export function getDeliveryWeekSelectionCounts(deliveryDates, now = dayjs()) {
  const cycleStart = dayjs(now).startOf('week')
  const firstWeekEnd = cycleStart.add(6, 'day')
  const secondWeekEnd = cycleStart.add(13, 'day')

  return deliveryDates.reduce(
    (counts, deliveryDate) => {
      const date = dayjs(deliveryDate).startOf('day')

      if (!isDeliveryDateAvailable(date, now)) {
        return counts
      }

      if (!date.isBefore(cycleStart, 'day') && !date.isAfter(firstWeekEnd, 'day')) {
        counts.week1 += 1
      }

      if (date.isAfter(firstWeekEnd, 'day') && !date.isAfter(secondWeekEnd, 'day')) {
        counts.week2 += 1
      }

      return counts
    },
    { week1: 0, week2: 0 },
  )
}

export function hasMinimumDeliveryDatesForEachWeek(deliveryDates, now = dayjs()) {
  const counts = getDeliveryWeekSelectionCounts(deliveryDates, now)

  return counts.week1 >= MINIMUM_DELIVERY_DATE_COUNT && counts.week2 >= MINIMUM_DELIVERY_DATE_COUNT
}

export function getDeliveryChangeDeadline(deliveryDate) {
  return dayjs(deliveryDate).startOf('day').subtract(3, 'day').hour(18)
}

export function isDeliveryChangeAllowed(deliveryDate, now = dayjs()) {
  return dayjs(now).isBefore(getDeliveryChangeDeadline(deliveryDate))
}

export function formatDeliveryChangeDeadline(deliveryDate) {
  return getDeliveryChangeDeadline(deliveryDate).format('YYYY-MM-DD HH:mm')
}
