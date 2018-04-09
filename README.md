# cpuCheckUsage
NodeJs based app to check CPU usage (Current &amp; Avg), Memory Usage. (Windows &amp; Linux).
I implemented this small app to impelemnt some functionality with native lib of NodeJs called OS.

Steps..

Run Node test.js 

(TESTCASE 1)
It will display memory usage  
(TESTCASE 2)
one by one CPU Usage Avg for Last 1, 5 and 15 minutes respectively.
(TESTCASE 3)
Then it will call a function to display all CPU Usage Avg for Last 1, 5 and 15 minutes respectively.
(TESTCASE 4)
Display Current CPU usage avg.%

* IMPROVEMENTS NEEDED:
Make all func async to prevent locking on CPU.
