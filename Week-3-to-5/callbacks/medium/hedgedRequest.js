// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.
function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
  let settled = false;
  let failCount = 0;

  function succeed(result) {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    onComplete(null, result);
  }

  function fail(err) {
    failCount++;
    if (failCount === 2 && !settled) {
      settled = true;
      onComplete(err);
    }
  }

  primary((err, result) => {
    if (err) return fail(err);
    succeed(result);
  });

  const timer = setTimeout(() => {
    if (settled) return;
    secondary((err, result) => {
      if (err) return fail(err);
      succeed(result);
    });
  }, timeoutMs);
}

module.exports = hedgedRequest;
