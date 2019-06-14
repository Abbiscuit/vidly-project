const express = require('express');
const app = express();

const genres = require('./routes/genres');

// body parsing
app.use(express.json());
app.use('/api/genres', genres);

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
