// Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.




var counter = 1;

function print(){
    console.clear();
    console.log(counter);
    counter+=1;
    setTimeout(print,1*1000);
}

print();