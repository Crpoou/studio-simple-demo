import { BUTTON_TEMPLATE } from '../constant.js'
import { defineToStringTag } from '../util.js'
import { Component } from './index.js'
// 0: "open"
// 1: "returnValue"
// 2: "close"
// 3: "show"
// 4: "showModal"
// 5: "constructor"
// 6: Symbol(Symbol.toStringTag)
export class Log extends Component {
  static {
    defineToStringTag(this)
  }

  log = Object.assign(document.createElement(TagName.DIV), { id: this.constructor.name.toLowerCase() })

  /** @type {HTMLButtonElement} */
  toggleButton = Object.assign(BUTTON_TEMPLATE.cloneNode(), { name: 'toggle', textContent: 'toggle' })
  header = Object.assign(document.createElement(TagName.HEADER), { id: 'log-header' })
  track = Object.assign(document.createElement(TagName.SECTION), { id: 'log-track', hidden: true })

  dialog = document.createElement(TagName.DIALOG)
  dialogFooter = document.createElement(TagName.FOOTER)
  dialogCancel = Object.assign(BUTTON_TEMPLATE.cloneNode(), { name: 'cancel', textContent: 'cancel' })
  dialogConfirm = Object.assign(BUTTON_TEMPLATE.cloneNode(), { name: 'confirm', textContent: 'confirm' })

  constructor() {
    super()

    this.header.append(this.toggleButton)
    this.log.append(this.header, this.track)

    this.dialogFooter.append(this.dialogCancel, this.dialogConfirm)
    this.dialog.append(this.dialogFooter)

    this.concentration.addEventListener(EVENT.RUN, this.RUN.bind(this))
    this.concentration.addEventListener(EVENT.LOG, this.LOG.bind(this))
    this.concentration.addEventListener(EVENT.PAUSE, this.PAUSE.bind(this))
    this.concentration.addEventListener(EVENT.STOP, this.STOP.bind(this))

    this.toggleButton.addEventListener(EVENT.CLICK, this.toggle.bind(this))
    this.dialogCancel.addEventListener(EVENT.CLICK, this.cancel.bind(this))
    this.dialogConfirm.addEventListener(EVENT.CLICK, this.confirm.bind(this))

    return this.log
  }

  /** @param {ConcentrationEventMap[EVENT.RUN]} $event */
  [EVENT.RUN]($event) {
    this.track.replaceChildren()
    this.track.hidden = false
  }

  /** @param {ConcentrationEventMap[EVENT.LOG]} $event */
  [EVENT.LOG]($event) {
    const { currentNode, value, description } = $event.detail
    const option = document.createElement(TagName.OPTION)
    if (value) option.label = `${description}：${value}`
    else option.label = description
    this.track.append(option)
    option.scrollIntoView()
  }

  [EVENT.PAUSE]($event) {
    alert(this.PAUSE.name)
  }

  [EVENT.STOP]($event) {
    this.track.hidden = true
    this.dialog.prepend(this.STOP.name)
    document.body.append(this.dialog)
    this.dialog.showModal()
  }

  toggle() {
    this.track.hidden = !this.track.hidden
  }

  cancel() {
    this.dialog.close()
    this.dialog.remove()
  }

  confirm() {
    this.dialog.close()
    this.dialog.remove()
  }
}
