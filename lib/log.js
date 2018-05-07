
const fs = require('fs');
var dateFormat = require('dateformat');
const os = require('os');

const MAX_SIZE =   2 * 1000 * 1000;       // trim log file when it exceeds MAX_SIZE bytes
const KEEP = 1 * 1000 * 1000;             // # of bytes to keep when trimming
const TRIM_EVERY = 6 * 60 * 60;           // how often to trim (seconds)

var logfile = '';

module.exports =  {

   init() {
      // check that the logs folder exists
      var logfolder = global.appRoot + '/logs';

      if (!fs.existsSync(logfolder)) {
         fs.mkdirSync(logfolder);
      }

      logfile = logfolder + '/stratum.log';

      setTimeout(trimLogfile, 0);
   },


   // log to the console
   LogS() {
      console.log(concat(arguments));
   },


   // log to disk file
   LogD() {
      logToDisk(concat(arguments));
   },


   // log to both console and disk file
   LogB() {
      var logText = concat(arguments);
      console.log(logText);
      logToDisk(logText);
   }
}


function logToDisk(text) {
   fs.appendFile(logfile, text + os.EOL, (err) => {
      if (err) {
         console.log('Error: logToDisk.appendFile failed with error', err);
      }
   });   
}

function concat(arguments) {
   var output = dateFormat("'d'd HH:MM:ss.l> ");
   for (var i = 0; i < arguments.length; i++) {
      output += arguments[i] + ' ';
   }
   return output;
}

function trimLogfile() {
   var stats = fs.statSync(logfile);
   if (stats.size > MAX_SIZE) {
      var fileContents = fs.readFileSync(logfile, 'utf8');
      var cleanLineBreakPos = fileContents.indexOf(os.EOL, fileContents.length - KEEP);
      fileContents = fileContents.substr(cleanLineBreakPos);
      fs.writeFileSync(logfile, fileContents);
   }
   setTimeout(trimLogfile, TRIM_EVERY * 1000);
}