import dayjs from 'dayjs'
const formatDateDefault = 'YYYY/MM/DD HH:mm:ss'

export const nowToUnixTime = () => dayjs().unix() * 1000
export const convertUnixToDatetime = (unix: number, formatDate = formatDateDefault) => dayjs(unix).format(formatDate)
