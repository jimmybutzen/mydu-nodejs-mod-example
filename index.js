require("dotenv").config();
const { startApiServer, registerMod } = require("./server/api");
startApiServer();
registerMod();