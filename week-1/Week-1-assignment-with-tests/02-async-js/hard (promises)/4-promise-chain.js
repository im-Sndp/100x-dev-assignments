/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Resolve after 1 second.")
        },1000);
    });
}

function waitTwoSecond() {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Resolve after 2 second.")
        },2000);
    });
}

function waitThreeSecond() {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Resolve after 3 second.")
        },3000);
    });
}

function calculateTime() {
    var startTime = new Date();

    return Promise.all([waitOneSecond(),waitTwoSecond(),waitThreeSecond()]).then(()=>{
        var endTime = new Date();
        return (endTime-startTime);
    })

}

async function calculateSequentially(){
        var startTime = new Date();
        var first = await waitOneSecond();
        var second = await waitOneSecond();
        var third = await waitThreeSecond();
        var endTime = new Date();
        return endTime-startTime
}

calculateSequentially().then((resolve)=>{
    console.log(`Sequential execution takes ${resolve/1000} second.`)
})


calculateTime().then((resolve)=>{
    console.log(`Executing using promise all takes ${resolve/1000} seconds.`)
})
