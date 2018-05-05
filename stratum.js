

var redisInterface = require('./lib/redis-interface')
var StratumServer = require('./lib/stratum-server')

var pool_env = process.argv[2] || 'production';

console.log('pool_env', pool_env);

var accountConfigFile = './account.config';

if (pool_env == "test") {
   console.log("Using test mode!!! - Ropsten ")
   accountConfigFile = './test.account.config';
} 

var accountConfig = require(accountConfigFile).accounts;

init();

async function init()
{
   var path = require('path');
   global.logfileFolder = path.resolve(__dirname);
   
   await redisInterface.init()
   var stratumServer = new StratumServer(accountConfig, redisInterface);
   stratumServer.start();
}
