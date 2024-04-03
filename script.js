const pageCount = 356;
const meetingDate = new Date("2024-04-24");
const currentDate = new Date();
const oneDay = 1000 * 3600 * 24;
let currentPage = 0;

let daysToMeeting =
  Math.floor((meetingDate.getTime() - currentDate.getTime()) / oneDay) - 1;
//let ppd = Math.ceil((pageCount - currentPage)/daysToMeeting)

document.getElementById("meeting-date").innerHTML = `Need to Finish By: ${
  meetingDate.getMonth() + 1
}-${meetingDate.getDate()}-${meetingDate.getFullYear()}`;

document.getElementById("pagecount").innerHTML = `Page Count: ${pageCount}`;

document.getElementById("ppd").innerHTML = `Pages Per Day Needed: `;
document.getElementById(
  "days-left"
).innerHTML = `Days Left Till Meeting: ${daysToMeeting}`;

function calculatePPD() {
  currentPage = document.getElementById("currentpage").value;
  let ppd = Math.ceil((pageCount - currentPage) / daysToMeeting);
  document.getElementById("ppd").innerHTML = `Pages Per Day Needed: ${ppd}`;
  document.getElementById("pages-left").innerHTML = `Pages Left: ${
    pageCount - currentPage
  }`;
}

console.log(`Days left: ${daysToMeeting}`);
console.log(`Pages per day needed: ${ppd}`);
