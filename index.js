require("dotenv").config();
const { app } = require("./src/app");
const { databaseConnection } = require("./src/database/db");
databaseConnection()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server running on http//:localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Error from Index.js", err);
  });
