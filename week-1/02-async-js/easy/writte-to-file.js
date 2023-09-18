// Write to a file

const fs = require('fs');

data = "this is a sample text.";

//It will create output.txt if  the file doesnt exist.

fs.writeFile('output,txt', data ,'utf8',err => {
  if (err){
    console.log("Error while writing the file.")
  }
  else{
    console.log("File written successfully.")
  }
})
