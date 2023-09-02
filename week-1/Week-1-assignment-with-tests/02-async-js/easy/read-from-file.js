// Reading the contents of a file

const fs = require('fs');

fs.readFile('file.txt','utf-8',(error,data) => {
  if (error){
    console.log("Error while reading the file.");
  }
  else{
    console.log("File content : ",data);
  }
});