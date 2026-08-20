// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises.
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully.
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      reject(new Error("All promises rejected"));
      return;
    }

    let rejectedCount = 0;
    const errors = new Array(promises.length);

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          rejectedCount++;

          if (rejectedCount === promises.length) {
            reject(new Error("All promises rejected"));
          }
        });
    });
  });
}

module.exports = promiseAny;
