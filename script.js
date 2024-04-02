const pageCount = 356
const meetingDate = new Date("2024-04-24")
const currentDate = new Date()
let currentPage = 50

let daysToMeeting = Math.floor((meetingDate.getTime() - currentDate.getTime())/(1000 * 3600 * 24))

console.log(daysToMeeting)
