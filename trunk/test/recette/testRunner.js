var testRunner = require("qunit");
var path = require('path');


testRunner.run({
    code:  path.join(__dirname, "script.js"),
    tests: path.join(__dirname, "testVCard.js")
});
