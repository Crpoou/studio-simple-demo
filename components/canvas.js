import { BRANCH_TEMPLATE, FLOW_TEMPLATE, STEP_HEADER_TEMPLATE, STEP_TEMPLATE, USELESS_SELECTOR } from '../constant.js'
import { appendCSSStyleSheet, createIdSelector, defineToStringTag, getName } from '../util.js'
import { Component } from './index.js'

class Step extends Component {
  static {
    defineToStringTag(this)
  }

  /** @type {HTMLElement} */
  article = STEP_TEMPLATE.cloneNode(true)
  /** @type {HTMLElement} */
  header = this.article.children.header

  /** @param {Element} source */
  constructor(source) {
    super()

    this.article.id = source.id
    this.header.textContent = getName(source)

    this.article.addEventListener(EVENT.CLICK, this.click.bind(this))

    return this.article
  }
  /** @param {MouseEvent} $event */
  click($event) {
    $event.stopPropagation()
    $event.ctrlKey || $event.metaKey || this.concentration.SELECTED.clear()
    this.concentration.SELECTED.add(this.article.id)
  }
}

export class Canvas extends Component {
  static sheet = new CSSStyleSheet()
  /** @type {CSSStyleRule} */
  static flow_rule =
    this.sheet.cssRules[
      this.sheet.insertRule(`${USELESS_SELECTOR}{${Style.DISPLAY_REVERT}}`, this.sheet.cssRules.length)
    ]
  /** @type {CSSStyleRule} */
  static step_rule =
    this.sheet.cssRules[
      this.sheet.insertRule(`${USELESS_SELECTOR}{outline:.25rem solid orange}`, this.sheet.cssRules.length)
    ]
  static {
    defineToStringTag(this)
    appendCSSStyleSheet(this.sheet)
  }

  canvas = Object.assign(document.createElement(TagName.SECTION), { id: TagName.CANVAS, className: ClassName.SCROLL })

  constructor() {
    super()

    this.concentration.addEventListener(EVENT.INIT, this.INIT.bind(this))
    this.concentration.addEventListener(EVENT.MUTATION, this.MUTATION.bind(this))
    this.concentration.addEventListener(EVENT.REFRESH, this.REFRESH.bind(this))
    this.canvas.addEventListener(EVENT.CLICK, this.click.bind(this))

    return this.canvas
  }

  /** @param {ConcentrationEventMap[EVENT.INIT]} $event */
  [EVENT.INIT]($event) {
    /** @type {Map<Element, HTMLElement>} */
    const map = new Map()
    let flowFrom = FLOW_TEMPLATE
    let flowTo = FLOW_TEMPLATE
    let branchFrom = BRANCH_TEMPLATE
    let branchTo = BRANCH_TEMPLATE
    let stepFrom = STEP_TEMPLATE
    let stepTo = STEP_TEMPLATE
    let header = STEP_HEADER_TEMPLATE
    const fragment = document.createDocumentFragment()
    for (flowFrom of concentration.$.documentElement.children) {
      flowTo = FLOW_TEMPLATE.cloneNode(true)
      flowTo.id = flowFrom.id
      fragment.append(flowTo)
      map.set(flowFrom, flowTo)
    }
    for ([flowFrom, flowTo] of map) {
      for (branchFrom of flowFrom.children) {
        branchTo = BRANCH_TEMPLATE.cloneNode(true)
        branchTo.id = branchFrom.id
        flowTo.append(branchTo)
        for (stepFrom of branchFrom.children) {
          stepTo = new Step(stepFrom)
          branchTo.append(stepTo)
          map.set(stepFrom, stepTo)
        }
      }
    }
    this.canvas.append(fragment)
  }
  [EVENT.MUTATION]() {}
  [EVENT.REFRESH]() {
    Canvas.flow_rule.selectorText = createIdSelector(concentration.CurrentFlowId)
    Canvas.step_rule.selectorText = concentration.SELECTED.size
      ? [...concentration.SELECTED].map(createIdSelector)
      : USELESS_SELECTOR
  }
  /** @param {MouseEvent} $event */
  click($event) {
    this.concentration.SELECTED.clear()
  }
}
