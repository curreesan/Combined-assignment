// ## Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

const data= 'hi from fs'
fs.writeFile('./write-file.txt',data,'utf-8', callback );


function callback(err) {
    if (err) {
        console.log(err)
    }
}