const {DataModel} = require('../models/dataModel');

const getInfo= async (req, res)=>{
    try{
        const totalEntry= await DataModel.countDocuments();
        const cityCount = await DataModel.aggregate([
            { $group: { _id: "$city", count: { $sum: 1 } } }
        ]);

        // Aggregate to count unique occurrences for `typeOfRespondent`
        const typeOfRespondentCount = await DataModel.aggregate([
            { $group: { _id: "$TypeofSegment", count: { $sum: 1 } } }
        ]);

        // Convert results to key-value pair format
        const cityData = cityCount.reduce((acc, item) => {
            acc[item._id || "undefined"] = item.count;
            return acc;
        }, {});

        const typeOfRespondentData = typeOfRespondentCount.reduce((acc, item) => {
            acc[item._id?.toString() || "undefined"] = item.count;
            return acc;
        }, {});

        // Final formatted response
        res.status(200).json({
            success: true,
            data: {
                totalEntry : totalEntry,
                city: cityData,
                typeOfRespondent: typeOfRespondentData
            }
        });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}
module.exports={
    getInfo
}