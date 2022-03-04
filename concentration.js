import {
  createEntryByClassName,
  createEntryByName,
  createEntryByTagName,
  defineToStringTag,
  getElementById,
  getName,
  sleep
} from './util.js'

/** @type {(VariablePool:object,initializer:string,binding?:string) => any} */
const evaluate = Function('return function evaluate(p,e,b){let r;with(p)r=eval(e);if(b)return p[b]=r;return r}')()
/**
 * @extends {Set<string>}
 */
class ProxySelectedSet extends Set {
  static {
    defineToStringTag(this)
  }
  /** @type {Concentration} */
  #concentration
  constructor(concentration) {
    super()
    this.#concentration = concentration
  }

  equal(value) {
    this.#concentration.CurrentStepId = value
    super.clear()
    return super.add(value)
  }

  add(value) {
    this.#concentration.CurrentStepId = value
    return super.add(value)
  }

  delete(value) {
    this.#concentration.REFRESH()
    return super.delete(value)
  }

  clear() {
    this.#concentration.REFRESH()
    return super.clear()
  }
}
export class Concentration extends EventTarget {
  static {
    Reflect.deleteProperty(this.prototype, this.prototype.addEventListener.name)
    Reflect.deleteProperty(this.prototype, this.prototype.dispatchEvent.name)
    defineToStringTag(this)
  }
  /** 文档 */
  $ = new Document();
  [STATUS.DISABLED] = this.$.getElementsByClassName(STATUS.DISABLED)
  /** 节点集合 */
  TagMap = new Map(Object.values(TAG).map(createEntryByTagName, this.$))
  StepMap = new Map(Object.values(STEP).map(createEntryByName, this.$))
  StatusMap = new Map(Object.values(STATUS).map(createEntryByClassName, this.$))
  /**
   * 变量池
   * @type {Map<string,any>}
   */
  VariablePool = Object.create(null);
  /**
   * 选中的
   */
  [STATUS.SELECTED] = new ProxySelectedSet(this)

  /** @type {string} */
  #CurrentFlowId = null
  get CurrentFlowId() {
    return this.#CurrentFlowId
  }
  set CurrentFlowId(v) {
    if (this.#CurrentFlowId === v) return v
    // 只有在运行时才单独设置current
    this.#CurrentFlowId = v
    this.#CurrentStepId = null
    this.SELECTED.clear()
    this.REFRESH()
    return v
  }
  /** 当前定位、展示流程 */
  get CurrentFlow() {
    return this.$.getElementById(this.#CurrentFlowId)
  }

  /** @type {string} */
  #CurrentStepId = null
  get CurrentStepId() {
    return this.#CurrentStepId
  }
  set CurrentStepId(v) {
    if (this.#CurrentStepId === v) return v
    // 只有在运行时才单独设置current
    // 同时修正CurrentFlowId
    this.#CurrentStepId = v
    const step = this.$.getElementById(v)
    if (step) {
      this.#CurrentFlowId = step.closest(TAG.FLOW).id
    }
    this.REFRESH()
    return v
  }
  /** 当前定位、展示卡片 */
  get CurrentStep() {
    return this.$.getElementById(this.#CurrentStepId)
  }
  /**
   * @param {Array<MutationRecord>} mutations
   * @param {MutationObserver} observer
   */
  #MutationObserverCallback = (mutations, observer) => {
    console.table(mutations)
    //
    this.MUTATION()
  }
  MutationObserver = new MutationObserver(this.#MutationObserverCallback);
  [EVENT.INIT](template) {
    const fragment = this.$.createElement(this.constructor.name)
    fragment.innerHTML = template
    this.$.append(...fragment.children)
    this.#CurrentFlowId = this.TagMap.get(TAG.FLOW)[0].id
    this.#CurrentStepId = this.TagMap.get(TAG.STEP)[0].id
    this.dispatchEvent(new Event(EVENT.INIT))
    this.REFRESH()
    this.MutationObserver.observe(this.$, {
      attributeOldValue: true,
      attributes: true,
      childList: true,
      subtree: true
    })
    return this
  }
  #mutation = false
  #IdleMutationCallback = () => {
    this.dispatchEvent(new Event(EVENT.MUTATION))
    this.#mutation = false
  };
  [EVENT.MUTATION]() {
    if (this.#mutation) return
    this.#mutation = true
    requestIdleCallback(this.#IdleMutationCallback)
  }
  #refresh = false
  #IdleRefreshCallback = () => {
    this.dispatchEvent(new Event(EVENT.REFRESH))
    this.#refresh = false
  };
  [EVENT.REFRESH]() {
    if (this.#refresh) return
    this.#refresh = true
    requestIdleCallback(this.#IdleRefreshCallback)
  }
  #run = false
  async [EVENT.RUN]() {
    if (this.#run) return
    this.#run = true
    this.SELECTED.clear()
    this.dispatchEvent(new Event(EVENT.RUN))
    const walker = this.$.createTreeWalker(this.$.documentElement, NodeFilter.SHOW_ELEMENT)
    const stack = []
    /** @type {Element} */
    let currentNode
    loop: while (walker.nextNode()) {
      currentNode = walker.currentNode
      switch (currentNode.nodeName) {
        case TAG.FLOW:
          if (stack.length) {
            this.dispatchEvent(new Event(EVENT.STOP))
            break loop
          } else {
            stack.push(currentNode)
          }
          break
        case TAG.BRANCH:
          break
        case TAG.STEP: {
          this.CurrentStepId = currentNode.id
          const actionName = getName(currentNode)
          await sleep()
          this.dispatchEvent(
            new CustomEvent(EVENT.LOG, {
              detail: {
                currentNode,
                value: null,
                description: `开始执行${actionName}`
              }
            })
          )
          switch (actionName) {
            // case STEP.WHILE: {
            //   const expression = currentNode.attributes.expression.nodeValue
            //   while (evaluate(this.VariablePool, expression)) {
            //     walker.currentNode = walker
            //   }
            //   break
            // }
            case STEP.WHILE:
              break
            case STEP.VAR:
              evaluate(
                this.VariablePool,
                currentNode.attributes.initializer.nodeValue,
                currentNode.attributes.binding.nodeValue
              )
              break
            case STEP.IF:
            case STEP.INVOKE:
              break
            case STEP.PRINT:
              await sleep()
              this.dispatchEvent(
                new CustomEvent(EVENT.LOG, {
                  detail: {
                    currentNode,
                    value: evaluate(this.VariablePool, currentNode.attributes.data.nodeValue),
                    description: actionName
                  }
                })
              )
          }
        }
      }
    }
    this.#run = false
  }
  [OPERATION.ADD](target) {}
  /**
   *
   * @param {Array<string>} targets
   */
  [OPERATION.DELETE](targets) {
    // targets.map(getElementById, this.$)
  }
  [OPERATION.UPDATE]() {}
  [Symbol.toPrimitive]() {
    return this.$.documentElement.outerHTML
  }
  /**
   * @template {EVENT} K
   * @param {K} type
   * @param {(this:Concentration,ev:ConcentrationEventMap[K])=>any} listener
   * @param {boolean|AddEventListenerOptions} [options]
   * @returns {void}
   */
  addEventListener(type, listener, options) {}
  /**
   * @template {EVENT}K
   * @param {ConcentrationEventMap[K]} event
   * @returns {boolean}
   */
  dispatchEvent(event) {}
}

// class Concentration extends EventTarget {
//   $ = new Document();

//   SELECTED = this.$.getElementsByClassName('SELECTED');

//   FOLD = this.$.getElementsByClassName('FOLD');

//   DISABLED = this.$.getElementsByClassName('DISABLED');

//   STEP = this.$.getElementsByTagName('step');

//   VAR = this.$.getElementsByName('var');

//   SELECTED_AND_DISABLED = this.$.getElementsByClassName('SELECTED DISABLED');

//   DISABLED_STEP = this.$.querySelectorAll('step.DISABLED');

//   /** ... */
// }
