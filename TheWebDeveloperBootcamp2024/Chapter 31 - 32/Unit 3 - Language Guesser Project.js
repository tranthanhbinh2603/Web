var franc = require('franc');
var langs = require('langs');
var colors = require('colors');

result = langs.where("3", franc(process.argv[2]))?.name;
if (result) {
    console.log(result.green);
}
else {
    console.log('Could not match a language. Please try again with a larger sample'.red)
}
