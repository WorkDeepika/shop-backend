const express = require('express'); 
const connectDB = require('./services/db/mongo');
const cors = require('cors');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const routes= require('./Routes/main')

const app = express(); 
app.use(express.json()); 
connectDB();

app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT"],
    credentials: true
}));


dotenv.config();
app.use('/', routes);

app.listen(3001, () => {
    console.log(`Server running on port 3000`);
});