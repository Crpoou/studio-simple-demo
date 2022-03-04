/** @type {Set<Function>} */
const MicroTasks = new Set() // Each similar-origin window agent also has micro tasks (a set of zero or more microtask objects), which is initially empty.
const SignalSlots = new Set()
let MutationObserverMicrotaskQueued = false // Each similar-origin window agent has a mutation observer microtask queued (a boolean), which is initially false. [HTML]
/** @type {Set<MutationObserver>} */
const MutationObservers = new Set() // Each similar-origin window agent also has mutation observers (a set of zero or more MutationObserver objects), which is initially empty.
/**
 * To queue a mutation observer microtask, run these steps:
 */
function QueueMutationObserverMicrotask() {
  if (MutationObserverMicrotaskQueued) return // If the surrounding agent’s mutation observer microtask queued is true, then return.
  MutationObserverMicrotaskQueued = true // Set the surrounding agent’s mutation observer microtask queued to true.
  NotifyMutationObservers(MutationObservers.values().next().value) // Queue a microtask to notify mutation observers.
}
/**
 * To notify mutation observers, run these steps:
 * @param {Function} task
 */
function NotifyMutationObservers(task) {
  MutationObserverMicrotaskQueued = false // Set the surrounding agent’s mutation observer microtask queued to false.
  const notifySet = new Set(MutationObservers) // Let notifySet be a clone of the surrounding agent’s mutation observers.
  const signalSet = new Set(SignalSlots) // Let signalSet be a clone of the surrounding agent’s signal slots.
  SignalSlots.clear() // Empty the surrounding agent’s signal slots.
  // For each mo of notifySet:
  for (const mo of notifySet) {
    const records = new Set(mo.records) // Let records be a clone of mo’s record queue.
    mo.records.clear() // Empty mo’s record queue.
    for (const node of mo.nodes) {
      node.registeredObserverList = node.registeredObserverList.filter(RegisteredObserverPredicate, mo) //  For each node of mo’s node list, remove all transient registered observers whose observer is mo from node’s registered observer list.
    }
    // If records is not empty
    if (records.size) {
      try {
        mo.Callback(records, mo) // then invoke mo’s callback with « records, mo », and mo.
      } catch (error) {
        throw error // If this throws an exception, catch it, and report the exception.
      }
    }
  }
  // For each slot of signalSet
  for (const slot of signalSet) {
    slot.dispatchEvent(new Event('slotchange', { bubbles: true })) // fire an event named slotchange, with its bubbles attribute set to true, at slot.
  }
}
function RegisteredObserverPredicate(x) {
  return x !== this
}
