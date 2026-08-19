// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');

const path = './messy.txt';

function callback(err, data) {
    if (err) {
        console.log(err);
        return;
    }

    const cleaned = data.replace(/ +/g, ' ');

    fs.writeFile(path, cleaned, 'utf-8', callback2);
}

function callback2(err) {
    err && console.log(err);
}

fs.readFile(path, 'utf-8', callback);