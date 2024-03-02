const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const config = {
    user: 'sa',
    password: 'duke1234',
    server: '10.1.3.160',
    database: 'Project_db',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};
app.get('/customers', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(config);
        // Query the database to fetch all rows from CustMaster table
        const result = await pool.request().query('SELECT * FROM CustMaster');
        // Send the fetched data as JSON response
        res.json({ success: true, customers: result.recordset });
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
