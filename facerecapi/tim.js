// // Input timestamp in the format "2023-09-02T05:12:28.015Z"
// const timestamp = "2023-09-02T05:12:28.015Z";

// // Create a JavaScript Date object from the timestamp
// const date = new Date(timestamp);

// // // Format the date and time in a more human-readable format
// // const options = {
// //   year: "numeric",
// //   month: "2-digit",
// //   day: "2-digit",
// //   hour: "2-digit",
// //   minute: "2-digit",
// //   second: "2-digit",
// //   fractionalSecondDigits: 3,
// //   timeZoneName: "short",
// // };

// const formattedDate = date.toLocaleDateString();
// const time=date.toLocaleTimeString()
// console.log(time);

// console.log(formattedDate);
const time= new Date()
console.log(time.toLocaleDateString());