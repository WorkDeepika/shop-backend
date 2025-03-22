const {DataModel} = require('../models/dataModel');
const fetchAndSendData =async (req, res)=> {
  try {

    // Aggregation query
    const data = await DataModel.aggregate([
        {
          $group: {
            _id: {
              City: "$Q1A",    // Replace "city" with the actual field name for city
              AgeGroup: "$Q1D", // Replace "ageGroup" with the actual field name for age group
              Gender: "$Q1E"   // Replace "gender" with the actual field name for gender
            },
            count: { $sum: 1 } // Count the number of documents in each group
          }
        },
        {
          $project: {
            _id: 0,          // Exclude the `_id` field
            City: "$_id.City",
            AgeGroup: "$_id.AgeGroup",
            Gender: "$_id.Gender",
            count: 1
          }
        }
      ])

    //console.log("Aggregated Data:", data);

    return res.status(200).json({ 
        Data : data
        
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from MongoDB.' });
  } 
}
const fetchAndSendData2 =async (req, res)=> {
  try {

    // Aggregation query
    const data = await DataModel.aggregate([
        {
          $group: {
            _id: {
              Q1A: "$Q1A",    // Replace "city" with the actual field name for city
              Q1E: "$Q1E" ,  // Replace "gender" with the actual field name for gender
              App1Category: {
              $cond: {
                if: { $eq: ["$App1", "True Balance"] }, // Check if App1 is "True Balance"
                then: "True Balance",
                else: "Other" // Group all other values as "Other"
              }
            }
            },
            count: { $sum: 1 } // Count the number of documents in each group
          }
        },
        {
          $project: {
            _id: 0,          // Exclude the `_id` field
            city: "$_id.Q1A",       // City
            Gender: "$_id.Q1E",         // Gender
            App1Category: "$_id.App1Category", // Category (True Balance or Other)
            count: 1
          }
        }
      ]);

    //console.log("Aggregated Data:", data);

    return res.status(200).json({ 
        Data : data
        
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from MongoDB.' });
  } 
}
const fetchAndSendData3 =async (req, res)=> {
  try {

    // Aggregation query
    const data = await DataModel.aggregate([
        {
          $group: {
            _id: {
              Q1A: "$Q1A",    // Replace "city" with the actual field name for city
              Q1E: "$Q1E" ,  // Replace "gender" with the actual field name for gender
              App1Category: {
              $cond: {
                if: { $eq: ["$App2", "True Balance"] }, // Check if App1 is "True Balance"
                then: "True Balance",
                else: "Other" // Group all other values as "Other"
              }
            }
            },
            count: { $sum: 1 } // Count the number of documents in each group
          }
        },
        {
          $project: {
            _id: 0,          // Exclude the `_id` field
            city: "$_id.Q1A",       // City
            Gender: "$_id.Q1E",         // Gender
            App1Category: "$_id.App1Category", // Category (True Balance or Other)
            count: 1
          }
        }
      ]);

    //console.log("Aggregated Data:", data);

    return res.status(200).json({ 
        Data : data
        
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from MongoDB.' });
  } 
}

module.exports={
    fetchAndSendData,fetchAndSendData3,fetchAndSendData2
}
