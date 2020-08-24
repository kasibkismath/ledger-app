const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

let routes = require("./app/routes/tenant-ledger/tenant-ledger.route");
routes(app);

const port = process.env.PORT || 4000;
app.listen(port, () =>
    console.info(`Ledger app has been started on port -> ${port}`)
);

module.exports = app;
