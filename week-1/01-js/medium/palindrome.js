/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isAlphabetCharacter(character) {
  return /^[a-zA-Z]$/.test(character);
}

function isDigit(character){
  return /\d/.test(character);
}

function isPalindrome(word) {
  str = ""
  for (var i = 0 ; i < word.length ; i++){
    if(isAlphabetCharacter(word[i]) || isDigit(word[i]))
    str += word[i];
  }
  str = str.split(" ").join("");
  var i = 0;
  var j = str.length-1;
  while(i < j ){
    if (str[i].toLowerCase() != str[j].toLowerCase()){
      return false;
    }
    i+=1;
    j-=1;
  }
  return true;
}

module.exports = isPalindrome;
