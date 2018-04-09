
const serverUsage = require("./index.js");
// GET THE MEMORY USAGE
 let mem= serverUsage.GetMemoryUsage();
 console.log("\nMemory Usage  =>\n")
 console.log(`Memory Available ${mem.memoryAvailable}\nMemory In Use:${mem.memoryInUse}\nTotal Memory:${mem.totalMemory} `)
 console.log("\n ")

 // GET TGE CURRENT CPU USAGE AVERAGE
 serverUsage.GetCpuUsage( function(usage){
    console.log(`Current CPU Usage => ${usage} % \n`)
   
});

// GET LAST 1, 5 AND 15 MINUTES USAGE AVG OF CPU SEPERATELY
console.log(`\nLast 1 Minute: ${serverUsage.cpuLoadAvg.loadavg1().Last1Minute} %\n`);
console.log(`\nLast 5 Minute: ${serverUsage.cpuLoadAvg.loadavg5().Last5Minutes} %\n`);
console.log(`\nLast 15 Minute: ${serverUsage.cpuLoadAvg.loadavg15().Last15Minutes} %\n`);


// GET LAST 1, 5 AND 15 MINUTES USAGE AVG OF CPU ALL 3 TOGETHER..
let avgLoad=  serverUsage.cpuLoadAvg.loadavg()
if(avgLoad){

    if(avgLoad.Last1Minute)
    console.log(`\nLast 1 Minute: ${avgLoad.Last1Minute} %\n`);
    if(avgLoad.Last5Minutes)
    console.log(`\nLast 5 Minute: ${avgLoad.Last5Minutes} %\n`);
    if(avgLoad.Last15Minutes)
    console.log(`\nLast 15 Minute: ${avgLoad.Last1Minute} %\n`);
    
}else
console.log('Avg cannot be calculated at this time!')
