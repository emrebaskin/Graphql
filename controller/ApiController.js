const {parameters} 	= require("../config/parameters");

let controller = {

	build: function (connections) {

	},

	test: async function (req, res) {
		res.send("Success");
	},

};

module.exports = controller;
