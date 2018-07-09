const path = require("path");
const router = require("./boot")(path.join(__dirname, "./controllers"));

module.exports = router;
