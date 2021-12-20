import dayjs from 'dayjs'
const formatDateDefault = 'YYYY/MM/DD HH:mm:ss'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const nowToUnixTime = () => dayjs().unix() * 1000
export const convertUnixToDatetime = (unix: number, formatDate = formatDateDefault) => dayjs(unix).format(formatDate)
export const dateFromNow = (unix: number) => dayjs(unix).fromNow()
