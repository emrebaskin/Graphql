require("dotenv").config();
const cluster = require('cluster');

/**
 * Base
 */

baseVariable = {};
const x = module.exports = baseVariable;

x.app       = null;

let workers = {};
let firstWorker = {};

/**
 * Express
 */
if(process.env.CLUSTER_ENABLE === "true") {

    if (cluster.isMaster) {
        masterProcess();
    }
    else {
        childProcess();
    }
}
else {
    childProcess();
}

/**
 * Express
 */

function masterProcess() {

    for (let i = 0; i < process.env.CLUSTER_COUNT; i++) {

        let worker = cluster.fork();
        workers[worker.process.pid] = worker;

        if (i === 0) {
            firstWorker = worker;
        }
    }
}

function childProcess() {
    let app = require("../modules/express");
    require("../routes/api")(app,x);
}