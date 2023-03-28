const express = require('express');
const app = express();

const port = process.env.PORT || 3000; // Use the PORT environment variable if available, otherwise use 3000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
