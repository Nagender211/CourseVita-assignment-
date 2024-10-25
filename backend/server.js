const express = require('express');
const cors = require('cors');
const route = require('./Route/route.js');
const dbConnection = require('./dbConnetion/dbConnetioin.js');

const app = express();

app.use(express.json());


app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.code).json({
            success: false,
            message: err.message
        });
    }
    res.status(500).json({
        success: false,
        message: "An unexpected error occurred"
    });
});

app.use(route);

const PORT = 8080;

app.listen(PORT, () => {
    dbConnection();
    console.log(`Server is running at ${PORT}`);
});