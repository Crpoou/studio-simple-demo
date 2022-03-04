import { BUTTON_TEMPLATE } from '../constant.js'
import { defineToStringTag } from '../util.js'
import { Component } from './index.js'

export class Header extends Component {
  static {
    defineToStringTag(this)
  }

  header = Object.assign(document.createElement(TagName.HEADER), { id: TagName.HEADER })
  countLabel = Object.assign(document.createElement('label'), { textContent: '语句总数：' })
  stepSize = document.createTextNode(0)

  disableLabel = Object.assign(document.createElement('label'), { textContent: '禁用总数：' })
  disableSize = document.createTextNode(0)
  /** @type {HTMLButtonElement} */
  runButton = Object.assign(BUTTON_TEMPLATE.cloneNode(true), { textContent: '执行' })

  constructor() {
    super()

    this.countLabel.append(this.stepSize)
    this.disableLabel.append(this.disableSize)
    this.header.append(this.countLabel, this.disableLabel, this.runButton)

    this.concentration.addEventListener(EVENT.INIT, this.INIT.bind(this))
    this.concentration.addEventListener(EVENT.MUTATION, this.MUTATION.bind(this))
    this.concentration.addEventListener(EVENT.LOG, this.LOG.bind(this))

    this.runButton.addEventListener(EVENT.CLICK, this.concentration.RUN.bind(this.concentration))

    return this.header
  }

  /** @param {ConcentrationEventMap[EVENT.INIT]} $event */
  [EVENT.INIT]($event) {
    const { length } = this.concentration.TagMap.get(TAG.STEP)
    const { length: length2 } = this.concentration.StatusMap.get(STATUS.DISABLED)
    this.stepSize.nodeValue = length
    this.disableSize.nodeValue = length2
    this.runButton.disabled = !length
  }
  [EVENT.MUTATION]() {
    const { length } = this.concentration.TagMap.get(TAG.STEP)
    const { length: length2 } = this.concentration.StatusMap.get(STATUS.DISABLED)
    this.stepSize.nodeValue = length
    this.disableSize.nodeValue = length2
    this.runButton.disabled = !length
  }
  [EVENT.LOG]() {}
}
