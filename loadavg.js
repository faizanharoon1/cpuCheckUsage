//"author": "Faizan H",

const os = require("os");


class CpuT {
  constructor(timestamp) {
    this.timestamp = timestamp;
    this.busy = 0;
    this.total = 0;
  }

  /**
   * @returns {CpuT} current cput
   */
  static now() {
    var cpu_t = new CpuT(Date.now());
    var total = 0;
    var idle = 0;

    os.cpus().forEach(({ times: t }) => {
      total += t.user + t.nice + t.sys + t.idle + t.irq;
      idle += t.idle;
    });

    cpu_t.busy = total - idle;
    cpu_t.total = total;

    return cpu_t;
  }
}

const TIME_MS__1_MIN = 60000;
const NUM_OF_CORES = os.cpus().length;

const LOADAVG_OF_1 = TIME_MS__1_MIN;
const LOADAVG_OF_5 = 5 * TIME_MS__1_MIN;
const LOADAVG_OF_15 = 10 * TIME_MS__1_MIN;

let RESULT_AVG_OF_1 = 0,
  RESULT_AVG_OF_5 = 0,
  RESULT_AVG_OF_15 = 0;

const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;

function loadavgcalc(cpu_time, option) {
  var TotalTickStore15 = [];
  var BusyTickStore15 = [];
  var TotalTickStore5 = [];
  var BusyTickStore5 = [];
  var TotalTickStore1 = [];
  var BusyTickStore1 = [];
  let totalcpu1 = 0,
    busycpu1 = 0,
    totalcpu5 = 0,
    busycpu5 = 0,
    totalcpu15 = 0,
    busycpu15 = 0;

  let current_time;
  const now = Date.now();
  var CurrentMillis = 0;
  while (Date.now() - now < cpu_time) {
    current_time = CpuT.now();
    CurrentMillis = Math.floor((Date.now() - now) / 1000);

    if (option == 0 || option == 1) {
      if (CurrentMillis <= 60) {
        TotalTickStore1.push(current_time.total);
        BusyTickStore1.push(current_time.busy);
      }
    }

    if (option == 0 || option == 5) {
      if (CurrentMillis <= 60 * 5) {
        TotalTickStore5.push(current_time.total);
        BusyTickStore5.push(current_time.busy);

        if (option && CurrentMillis == 60 * 5) break;
      }
    }

    if (option == 0 || option == 15) {
      TotalTickStore15.push(current_time.total);
      BusyTickStore15.push(current_time.busy);
    }
  }

  totalcpu15 = average(TotalTickStore15);
  busycpu15 = average(BusyTickStore15);
  totalcpu5 = average(TotalTickStore5);
  busycpu5 = average(BusyTickStore5);
  totalcpu1 = average(TotalTickStore1);
  busycpu1 = average(BusyTickStore1);

  // console.log(totalcpu15);
  // console.log(busycpu15);
  // console.log(totalcpu5);
  // console.log(busycpu5);
  // console.log(totalcpu1);
  // console.log(busycpu1);
  // console.log("=====");

  if (totalcpu15 > 0) {
    RESULT_AVG_OF_15 = NUM_OF_CORES * (busycpu15 / totalcpu15);
  }

  if (totalcpu5 > 0) {
    RESULT_AVG_OF_5 = NUM_OF_CORES * (busycpu5 / totalcpu5);
  }

  if (totalcpu1 > 0) {
    RESULT_AVG_OF_1 = NUM_OF_CORES * (busycpu1 / totalcpu1);
  }

  RESULT_AVG_OF_1 = (100 * RESULT_AVG_OF_1).toFixed(4);
  RESULT_AVG_OF_5 = (100 * RESULT_AVG_OF_5).toFixed(4);
  RESULT_AVG_OF_15 = (100 * RESULT_AVG_OF_15).toFixed(4);
  // console.log(RESULT_AVG_OF_15);
  // console.log(RESULT_AVG_OF_5);
  // console.log(RESULT_AVG_OF_1);
  console.log("=====");
}
function cpuloadavglinux()
{
  if (os.platform()!='win32') {
    let cpuavgg=os.loadavg() 
    RESULT_AVG_OF_1=cpuavgg[0]
    RESULT_AVG_OF_5=cpuavgg[1]
    RESULT_AVG_OF_15=cpuavgg[2]
  }

}
var loadCpu = {

  loadavg: function() {
    
    if (os.platform()=='win32') {
      loadavgcalc(LOADAVG_OF_15, 0);
      return {
        Last1Minute: RESULT_AVG_OF_1,
        Last5Minutes: RESULT_AVG_OF_5,
        Last15Minutes: RESULT_AVG_OF_15
      };
    } else {
      cpuloadavglinux();
      return {
        Last1Minute: RESULT_AVG_OF_1,
        Last5Minutes: RESULT_AVG_OF_5,
        Last15Minutes: RESULT_AVG_OF_15
      };
    }
  },
  loadavg1: function() {

    if (os.platform()=='win32') {
      loadavgcalc(LOADAVG_OF_1, 1);
    return {
      Last1Minute: RESULT_AVG_OF_1
    };
    } else {
      cpuloadavglinux();
      return {
        Last1Minute: RESULT_AVG_OF_1
      };
    }


    
  },
  loadavg5: function() {

    if (os.platform()=='win32') {
      loadavgcalc(LOADAVG_OF_5, 5);
      return {
        Last5Minutes: RESULT_AVG_OF_5
      };
    } else {
      cpuloadavglinux();
      return {
        Last5Minutes: RESULT_AVG_OF_5
      };
    }

    
    
  },
  loadavg15: function() {

    if (os.platform()=='win32') {
      loadavgcalc(LOADAVG_OF_15, 15);
    return {
      Last15Minutes: RESULT_AVG_OF_15
    };
    } else {
      return {
        Last15Minutes: RESULT_AVG_OF_15
      };
    }


    
  }
};

module.exports = loadCpu;
