import {USELESS_RULE, USELESS_SELECTOR} from '../constant.js'
import {appendCSSStyleSheet, createValueSelector, defineToStringTag, getName} from '../util.js'
import {Component} from './index.js'

const OUTLINE_FLOW_SELECTOR = 'outline-flow'
const OUTLINE_DETAILS_SELECTOR = 'outline-details'
const OUTLINE_BRANCH_SELECTOR = 'outline-branch'
const OUTLINE_SUMMARY_SELECTOR = 'outline-summary'
const OUTLINE_STEP_SELECTOR = 'outline-step'
const OUTLINE_OPTION_SELECTOR = 'outline-option'

/** outline-flow模板 */
const OUTLINE_FLOW_TEMPLATE = Object.assign(document.createElement(TagName.SECTION), {
  className: OUTLINE_FLOW_SELECTOR
})
/** details模板 */
const OUTLINE_DETAILS_TEMPLATE = Object.assign(document.createElement(TagName.DETAILS), {
  className: OUTLINE_DETAILS_SELECTOR
})
/** summary模板 */
const OUTLINE_SUMMARY_TEMPLATE = Object.assign(document.createElement(TagName.SUMMARY), {
  className: OUTLINE_SUMMARY_SELECTOR
})
OUTLINE_DETAILS_TEMPLATE.appendChild(OUTLINE_SUMMARY_TEMPLATE).setAttribute('name', TagName.SUMMARY)

/** outline-option模板 */
const OUTLINE_OPTION_TEMPLATE = Object.assign(document.createElement(TagName.OPTION), {
  className: OUTLINE_OPTION_SELECTOR,
  tabIndex: 0
})

class OutlineBranch extends Component {
  static {
    defineToStringTag(this)
  }
  /** @type {HTMLDetailsElement} */
  details = OUTLINE_DETAILS_TEMPLATE.cloneNode(true)
  /** @type {HTMLElement} */
  summary = this.details.children.summary
  /** @param {Element} source */
  constructor(source) {
    super()

    this.details.classList.add(OUTLINE_BRANCH_SELECTOR)
    this.summary.textContent = getName(source)

    return this.details
  }
}

class OutlineStep extends Component {
  static sheet = new CSSStyleSheet()
  /** @type {CSSStyleRule} */
  static select_step_rule =
    this.sheet.cssRules[
      this.sheet.insertRule(`${USELESS_SELECTOR}{background-color:lightgrey}`, this.sheet.cssRules.length)
    ]

  static {
    defineToStringTag(this)
    appendCSSStyleSheet(this.sheet)
  }

  /** @param {MouseEvent} $event */
  click($event) {
    $event.stopPropagation()
    this.concentration.SELECTED.equal($event.currentTarget.attributes.value.nodeValue)
  }
}
class OutlineStepContainer extends OutlineStep {
  static {
    defineToStringTag(this)
  }

  /** @type {HTMLDetailsElement} */
  details = OUTLINE_DETAILS_TEMPLATE.cloneNode(true)
  /** @type {HTMLElement} */
  summary = this.details.children.summary

  /** @param {Element} source */
  constructor(source) {
    super()

    this.details.classList.add(OUTLINE_STEP_SELECTOR)
    this.details.setAttribute('value', source.id)
    this.summary.textContent = getName(source)

    this.details.addEventListener(EVENT.CLICK, this.click.bind(this))

    return this.details
  }
}
class OutlineStepNormal extends OutlineStep {
  static {
    defineToStringTag(this)
  }

  /** @type {HTMLOptionElement} */
  option = OUTLINE_OPTION_TEMPLATE.cloneNode(true)

  /** @param {Element} source */
  constructor(source) {
    super()

    this.option.value = source.id
    this.option.label = getName(source)

    this.option.addEventListener(EVENT.CLICK, this.click.bind(this))

    return this.option
  }
}

export class Outline extends Component {
  static sheet = new CSSStyleSheet()
  /**
   * 展示命中的流程
   * @type {CSSStyleRule}
   */
  static outline_flow_rule =
    this.sheet.cssRules[
      this.sheet.insertRule(`${USELESS_SELECTOR}{${Style.DISPLAY_REVERT}}`, this.sheet.cssRules.length)
    ]
  static {
    defineToStringTag(this)
    appendCSSStyleSheet(this.sheet)
  }

  outline = Object.assign(document.createElement(TagName.ASIDE), {
    id: this.constructor.name.toLowerCase(),
    className: ClassName.SCROLL
  })

  constructor() {
    super()

    this.concentration.addEventListener(EVENT.INIT, this.INIT.bind(this))
    this.concentration.addEventListener(EVENT.MUTATION, this.MUTATION.bind(this))
    this.concentration.addEventListener(EVENT.REFRESH, this.REFRESH.bind(this))

    return this.outline
  }
  /** @param {ConcentrationEventMap[EVENT.INIT]} $event */
  [EVENT.INIT]() {
    /** @type {Map<Element, HTMLElement>} */
    const map = new Map()
    /** @type {HTMLDetailsElement} */
    let details
    /** @type {Element} */
    let source
    /** @type {HTMLDetailsElement} */
    let target
    const fragment = document.createDocumentFragment()
    for (source of concentration.$.documentElement.children) this.flow(source, fragment, map)
    for ([source, target] of map) {
      for (source of source.children) {
        details = getName(source) === BRANCH.DEFAULT.description ? target : this.branch(source, target)
        for (source of source.children) this.step(source, details, map)
      }
    }
    this.outline.appendChild(fragment)
  }
  [EVENT.MUTATION]() {}
  [EVENT.REFRESH]() {
    Outline.outline_flow_rule.selectorText = `.${OUTLINE_FLOW_SELECTOR}${createValueSelector(
      this.concentration.CurrentFlowId
    )}`
    const complexSelectorList = [...this.concentration.SELECTED].map(createValueSelector).join()
    OutlineStep.select_step_rule.selectorText = this.concentration.SELECTED.size
      ? `.${OUTLINE_OPTION_SELECTOR}:where(${complexSelectorList}),.${OUTLINE_STEP_SELECTOR}:where(${complexSelectorList})>.${OUTLINE_SUMMARY_SELECTOR}`
      : USELESS_SELECTOR
  }
  [TAG.FLOW](source, target, map) {
    /** @type {HTMLElement} */
    const section = OUTLINE_FLOW_TEMPLATE.cloneNode(true)
    section.setAttribute('value', source.id)
    map.set(source, target.appendChild(section))
  }
  [TAG.BRANCH](source, target) {
    return target.appendChild(new OutlineBranch(source))
  }
  [TAG.STEP](source, target, map) {
    if (source.childElementCount) {
      map.set(source, target.appendChild(new OutlineStepContainer(source)))
    } else {
      map.set(source, target.appendChild(new OutlineStepNormal(source)))
    }
  }
}
