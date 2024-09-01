const pageCount = 346 //update monthly
const meetingDate = new Date("September 25 2024 19:00:00") //update monthly
const currentDate = new Date()
const oneDay = 1000 * 3600 * 24
let currentPage = 0
console.log(`Current Date: ${currentDate}`)
console.log(`Meeting date: ${meetingDate}`)

let daysToMeeting = Math.floor((meetingDate.getTime() - currentDate.getTime()) / oneDay) - 1
//let ppd = Math.ceil((pageCount - currentPage)/daysToMeeting)

document.getElementById("meeting-date").innerHTML = `Need to Finish By: ${
  meetingDate.getMonth() + 1
}-${meetingDate.getDate()}-${meetingDate.getFullYear()}`

document.getElementById("pagecount").innerHTML = `Page Count: ${pageCount}`

document.getElementById("ppd").innerHTML = `Pages Per Day Needed: `
document.getElementById("days-left").innerHTML = `Days Left Till Meeting: ${daysToMeeting}`

function calculatePPD() {
  currentPage = document.getElementById("currentpage").value
  let ppd = Math.ceil((pageCount - currentPage) / daysToMeeting)
  document.getElementById("ppd").innerHTML = `Pages Per Day Needed: ${ppd}`
  document.getElementById("pages-left").innerHTML = `Pages Left: ${pageCount - currentPage}`
}
