const pageCount = 356
const meetingDate = new Date("2024-04-24")
const currentDate = new Date()
const oneDay = 1000 * 3600 * 24
let currentPage = 50

let daysToMeeting = Math.floor((meetingDate.getTime() - currentDate.getTime())/oneDay) - 1
let pagesLeft = Math.ceil((pageCount - currentPage)/daysToMeeting)

console.log(`Days left: ${daysToMeeting}`)
console.log(`Pages per day needed: ${pagesLeft}`)
