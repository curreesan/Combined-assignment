// Problem Description – Task Execution with Dependencies
//
// You are given a set of asynchronous tasks where some tasks depend
// on the completion of others.
// Your goal is to execute each task only after all of its dependencies
// have been successfully completed.
// The solution should ensure correct execution order and handle
// dependency relationships properly.
//
// Each task is asynchronous and must invoke a callback when finished.
// Invoke finalCallback after all tasks have completed, or with an error
// if any task fails.

function runWithDependencies(tasks, finalCallback) {
  if (tasks.length === 0) return finalCallback(null, {});

  const taskMap = {};
  const remainingDeps = {};
  const dependents = {};
  const results = {};
  let completedCount = 0;
  let settled = false;

  tasks.forEach((t) => {
    taskMap[t.id] = t;
    remainingDeps[t.id] = t.deps.length;
    dependents[t.id] = dependents[t.id] || [];
  });

  tasks.forEach((t) => {
    t.deps.forEach((depId) => {
      dependents[depId] = dependents[depId] || [];
      dependents[depId].push(t.id);
    });
  });

  function fail(err) {
    if (settled) return;
    settled = true;
    finalCallback(err);
  }

  function complete() {
    if (settled) return;
    if (completedCount === tasks.length) {
      settled = true;
      finalCallback(null, results);
    }
  }

  function startTask(id) {
    taskMap[id].run((err, result) => {
      if (settled) return;
      if (err) return fail(err);

      results[id] = result;
      completedCount++;

      dependents[id].forEach((depId) => {
        remainingDeps[depId]--;
        if (remainingDeps[depId] === 0) startTask(depId);
      });

      complete();
    });
  }

  tasks.forEach((t) => {
    if (remainingDeps[t.id] === 0) startTask(t.id);
  });
}

module.exports = runWithDependencies;
