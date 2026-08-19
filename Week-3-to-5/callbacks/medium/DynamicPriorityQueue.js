// Problem Description – Priority Task Queue with Dynamic Concurrency
//
// You are required to implement a task queue that executes asynchronous
// tasks based on priority.
// Higher-priority tasks should be executed before lower-priority ones.
// The queue must enforce a concurrency limit, ensuring only a fixed number
// of tasks run at the same time.
// The concurrency limit can be updated dynamically while the system is running.
//
// Each task must invoke its callback when finished.
class DynamicPriorityQueue {
  constructor(concurrency) {
    this.limit = concurrency;
    this.running = 0;
    this.queue = [];
  }

  setLimit(newLimit) {
    this.limit = newLimit;
    this.runNext();
  }

  add(task, priority, onComplete) {
    this.queue.push({ task, priority, onComplete });
    this.runNext();
  }

  runNext() {
    while (this.running < this.limit && this.queue.length > 0) {
      let bestIndex = 0;
      for (let i = 1; i < this.queue.length; i++) {
        if (this.queue[i].priority > this.queue[bestIndex].priority) {
          bestIndex = i;
        }
      }

      const { task, onComplete } = this.queue.splice(bestIndex, 1)[0];
      this.running++;

      task((err, result) => {
        this.running--;
        onComplete(err, result);
        this.runNext();
      });
    }
  }
}

module.exports = DynamicPriorityQueue;
