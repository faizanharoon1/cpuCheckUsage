
const os = require("os");
const helper = require("./helper.js");
const loadavg = require("./loadavg");
'use strict';

function cpuCurrentAvg() {
  //Initialise sum of idle and time of cores and fetch CPU info
  let totalIdle = 0,
    totalTick = 0;
    let cpus = os.cpus();

  //Loop through CPU cores
  for (let i = 0, len = cpus.length; i < len; i++) {
    //Select CPU core
    let cpu = cpus[i];

    //Total up the time in the cores tick
    for (type in cpu.times) {
      totalTick += cpu.times[type];
    }

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  //Return the average Idle and Tick times
  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

module.exports = {
  GetCpuUsage: function(callback) {
          //Grab first Measure
    var startMeasure = cpuCurrentAvg();
    
    //Set delay for second Measure
     setTimeout(function() { 
     
       //Grab second Measure
       var endMeasure = cpuCurrentAvg(); 
     
       //Calculate the difference in idle and total time between the measures
       var idleDifference = endMeasure.idle - startMeasure.idle;
       var totalDifference = endMeasure.total - startMeasure.total;
     
       //Calculate the average percentage CPU usage
       var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
     
       //return result
       return callback(percentageCPU);

     }, 100)
  },
  cpuLoadAvg:loadavg,

  GetMemoryUsage: function() {
    let usedMem = os.totalmem() - os.freemem();
    let memoryInUse = helper.bytesConvert(usedMem);
    let memoryAvailable = helper.bytesConvert(os.freemem());
    let totalMemory = helper.bytesConvert(os.totalmem());

    return {
      memoryInUse: `${memoryInUse[0]} ${memoryInUse[1]}`,
      memoryAvailable: `${memoryAvailable[0]} ${memoryAvailable[1]}`,
      totalMemory: `${totalMemory[0]} ${totalMemory[1]}`
    };
  }
};
