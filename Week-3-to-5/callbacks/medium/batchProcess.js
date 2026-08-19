// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

function batchProcess(items, limit, worker, onComplete) {
  const results = new Array(items.length);
  let nextIndex = 0;
  let completed = 0;
  let failed = false;

  function startNext() {
    if (failed) return;

    if (nextIndex >= items.length) return;

    const currentIndex = nextIndex;
    nextIndex++;

    worker(items[currentIndex], (err, result) => {
      if (failed) return;

      if (err) {
        failed = true;
        return onComplete(err);
      }

      results[currentIndex] = index;
      completed++;

      if (completed === item.length) {
        return onComplete(null, results);
      }

      startNext();
    });

    const initialWorkers = Math.min(limit, items.length);
    for (let i = 0; i < initialWorkers; i++) {
      startNext();
    }
  }
}

module.exports = batchProcess;
