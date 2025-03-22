const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    startTime: { type: String, default: null },
    startDate: { type: String, default: null },
    endTime: { type: String, default: null },
    endDate: { type: String, default: null },
    backST: { type: String, default: null },
    backSD: { type: String, default: null },
    backET: { type: String, default: null },
    backED: { type: String, default: null },
    // duration: { type: String, default: null },
    // language: { type: String, default: null },
    // email: { type: String, default: null },
    name: { type: String, default: null },
    contact: { type: mongoose.Schema.Types.Mixed, default: null },
    interviewerName: { type: String, default: null },
    interviewerId: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: mongoose.Schema.Types.Mixed, default: null },
    // TypeofSegment: { type: mongoose.Schema.Types.Mixed, default: null },
    UserId: { type: mongoose.Schema.Types.Mixed, default: null },
    shop_nm: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);
const DataModel = mongoose.model("Data", dataSchema);

module.exports = { DataModel };
// UserId
// : 
// "admin"
// address
// : 
// "423"
// backED
// : 
// "21-03-2025"
// backET
// : 
// "23:15:36"
// backSD
// : 
// "21-03-2025"
// backST
// : 
// "23:14:56"
// city
// : 
// "Noida"
// contact
// : 
// "4323333329"
// endDate
// : 
// "21/03/2025"
// endTime
// : 
// "11:15:35 PM"
// interviewerId
// : 
// "234"
// interviewerName
// : 
// "423"
// latitude
// : 
// 18.5211
// longitude
// : 
// 73.8502
// name
// : 
// "23"
// shop_nm
// : 
// "423"
// startDate
// : 
// "21/03/2025"
// startTime
// : 
// "11:14:56 PM"