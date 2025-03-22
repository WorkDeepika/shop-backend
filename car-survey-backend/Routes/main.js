const express = require('express');
const {welcome}=require("../controllers/wecomeController")
const { getAudioUrlController }= require("../controllers/audioController")
const { getImageUrl }= require("../controllers/addImageController")
const { loginController,  }= require("../controllers/loginController")
const {putData, }= require("../controllers/addDataController")
const {exportDataToXLSX }=  require("../controllers/getCsvController")
const multer = require('multer');
const path = require('path');
const { fetchAndSendData, fetchAndSendData3,fetchAndSendData2} = require('../controllers/dashbored');
const { getDateTime } = require('../controllers/getTimeDate');
const { getInfo } = require('../controllers/dashboredController');

// Configure multer storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

const router = express.Router();

router.get('/', welcome)
router.get('/get-data1', fetchAndSendData)
router.get('/get-data2', fetchAndSendData2)
router.get('/get-data3', fetchAndSendData3)
router.post('/add-data',putData);
router.get('/download-xlsx',exportDataToXLSX)
router.post('/add-audio', upload.single('file'),getAudioUrlController);
router.post('/login', loginController);
router.get('/getCurrentTimeDate', getDateTime);
router.post('/add-image', upload.single('file'), getImageUrl);
router.get('/getInfo', getInfo)

module.exports = router;