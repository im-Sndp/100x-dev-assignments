/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep(seconds) {
    var startTime = new Date();
    var currTime = new Date();
    while((currTime -startTime ) < seconds){
        var currTime = new Date();
    }
}

console.log("Start")
seconds = 5
sleep(seconds*1000)
console.log(`Thread halted for ${seconds} seconds`)

