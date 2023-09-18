/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */


function waitOneSecond() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Resolve after 1 second.")
        },1000);
    });
}

function waitTwoSecond() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Resolve after 2 second.")
        },2000);
    });
}

function waitThreeSecond() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Resolve after 3 second.")
        },3000);
    });
}

function calculateTime() {
    var startTime = new Date();

    return Promise.all([waitOneSecond(),waitTwoSecond(),waitThreeSecond()]).then((result)=>{
        var endTime = new Date();
        return endTime - startTime;
    })
}

calculateTime().then((result)=>{
    console.log(`Total ${result/1000} second taken to resolve all 3 promises.`)
})



