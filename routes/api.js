module.exports = function(app,connections) {

    let ApiController = require("../controller/ApiController");
    ApiController.build(connections);

    app.get('/', function(req,res){ ApiController.test(req,res) });

};