const express = require('express');
const app = express();
const port = 3030;

// Using the public folder at the root of the project
app.use(express.static("public"));

// Using the images folder at the route /images
app.use("/images", express.static("images"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
