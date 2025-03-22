const { DataModel } = require('../models/dataModel');
const XLSX = require("xlsx");
const {s3Client}= require("../services/aws/s3");
const { PutObjectCommand} = require("@aws-sdk/client-s3");
const path = require('path');

//write bucket name
require("dotenv").config();

const exportDataToXLSX = async (req, res) => {
    try {
        // Step 1: Fetch data from MongoDB
        const data = await DataModel.find().lean();
        if (!data.length) {
            return res.status(404).json({ message: 'No data found' });
        }

        // Define the expected fields
        const expectedFields = [
            "_id","startTime", "startDate", "endTime", "endDate", "duration", "language", "email", "name", "contact", "interviewerName", "interviewerId", "address",
            "vehRegNo","city", "TypeOfSegment", 
            "Q1", "Q1a", 
            "Q2_1_Month", "Q2_2_Month", "Q2_3_Month", "Q2_4_Month", "Q2_5_Month", "Q2_6_Month", "Q2_7_Month", 
            "Q3", "Q3a", "Q4", "Q5", "Q5_other", 
            "Q6_1_Models",
            "Q6_2_Models",
            "Q6_3_Models",
            "Q6_4_Models",
            "Q6_5_Models",
            "Q6_6_Models",
            "Q6_7_Models",
            "Q6_8_Models",
            "Q6_9_Models",
            "Q6_10_Models",
            "Q6_11_Models",
            "Q6_12_Models",
            "Q6_13_Models",
            "Q6_14_Models",
            "Q6_15_Models",
            "Q6_16_Models",
            "Q6_17_Models",
            "Q6_18_Models",
            "Q6_19_Models",
            "Q6_20_Models",
            "Q7_1_Models",
            "Q7_2_Models",
            "Q7_3_Models",
            "Q7_4_Models",
            "Q7_5_Models",
            "Q7_6_Models",
            "Q7_7_Models",
            "Q7_8_Models",
            "Q7_9_Models",
            "Q7_10_Models",
            "Q7_11_Models",
            "Q7_12_Models",
            "Q7_13_Models",
            "Q7_14_Models",
            "Q7_15_Models",
            "Q7_16_Models",
            "Q7_17_Models",
            "Q7_18_Models",
            "Q7_19_Models",
            "Q7_20_Models",
            "Q7_99_selected",
            "Q8_brand",
            "Q8_models", "Q8a", 
            "Q9", 
            "Q10", "Q10_other", 
            "Q11_Rank1","Q11_Rank1_other", "Q11_Rank2", "Q11_Rank2_other", "Q11_Rank3","Q11_Rank3_other", 
            "Q12", "Q13", "Q14", "Q15", "Q16", "Q17", "Q17_lakhs", "Q17_thousands","Q18", "Q19", "Q20", "Q21", "Q22", "Q23",
            
            "latitude", "longitude", "backST", "backSD", "backET", "backED", "Q1a_rec", "Q2_rec", "Q5_rec", "Q8_rec","Q10_rec","Q23_rec"

        ];

        const formatDate = (dateString) => {
            if (!dateString || typeof dateString !== "string") {
                console.error("Invalid date input:", dateString);
                return null; // Return null or a default value
            }
        
            let delimiter = dateString.includes("/") ? "/" : dateString.includes("-") ? "-" : null;
        
            if (!delimiter) {
                console.error("Unexpected date format:", dateString);
                return null; // Handle unexpected formats
            }
        
            const parts = dateString.split(delimiter);
            
            if (parts.length !== 3) {
                console.error("Invalid date structure:", dateString);
                return null; // Ensure we get exactly 3 parts
            }
        
            let [part1, part2, year] = parts.map(part => part.trim());
        
            if (!year || isNaN(year)) {
                console.error("Invalid year in date:", dateString);
                return null;
            }
        
            // Determine if format is MM-DD-YYYY or DD-MM-YYYY
            let month, day;
            if (parseInt(part1) > 12) { 
                // If first part is greater than 12, it's likely DD-MM-YYYY
                day = part1;
                month = part2;
            } else {
                // Otherwise, assume it's MM-DD-YYYY
                month = part1;
                day = part2;
            }
        
            if (!month || !day || isNaN(month) || isNaN(day)) {
                console.error("Invalid day/month in date:", { month, day, year });
                return null;
            }
        
            return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
        };
        

        // Step 2: Format the data and enforce the correct field order
        const formattedData = data.map(row => {
            const orderedRow = {};
            expectedFields.forEach(field => {
                if (field === "startDate" || field === "endDate") {
                    orderedRow[field] = formatDate(row[field]);
                } else if (field === "_id") {
                    // Convert _id to a string
                    orderedRow[field] = row[field] ? row[field].toString() : null;
                }else if (Array.isArray(row[field])) {
                    // Convert arrays to a comma-separated string
                    orderedRow[field] = row[field].join(", ");
                } else {
                    orderedRow[field] = row.hasOwnProperty(field) ? row[field] : null;
                }
            });
            return orderedRow;
        });
        // Step 1: Create a worksheet with formatted data
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        // Step 3: Add `expectedFields` starting at `AY2`
        XLSX.utils.sheet_add_aoa(worksheet, [expectedFields], { origin: "A1" });

        // Step 4: Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');


        // Step 4: Convert the workbook to a buffer
        const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        const date = new Date();
        //console.log(date)
        const optionsDate = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Kolkata',
        };

        const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
        timeZone: 'Asia/Kolkata',
        };

        // Format the date as YYYY-MM-DD
        const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate)
        .format(date)
        .replace(/\//g, '-');

        // Format the time as HH-MM-SS
        const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime)
        .format(date)
        .replace(/:/g, '-');
        
          // Combine date and time for unique naming
          const fileName = `carsurveybackend-${formattedDate}-${formattedTime}.xlsx`;
        const uploadParams = {
            Bucket: "carsurveybackend", // Replace with your bucket name
            Key: `xlsx/${fileName}`,
            Body: excelBuffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };

        try {
            const command = new PutObjectCommand(uploadParams);
            const result = await s3Client.send(command);
            console.log('Excel file uploaded to S3:', result);

            res.status(200).json({
                message: 'Excel file uploaded successfully to S3',
                downloadUrl: `https://${uploadParams.Bucket}.s3.eu-north-1.amazonaws.com/xlsx/${fileName}`,
            });
        } catch (err) {
            console.error('Error uploading Excel file to S3:', err);
            res.status(500).json({
                message: 'Error uploading Excel file to S3',
                error: err.message,
            });
        }
    } catch (error) {
        console.error('Error exporting data to Excel:', error);
        res.status(500).json({ message: 'An error occurred while exporting data to Excel' });
    }
};
module.exports = { 
    exportDataToXLSX
};
