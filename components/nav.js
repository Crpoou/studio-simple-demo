import { BUTTON_TEMPLATE } from '../constant.js'
import { defineToStringTag } from '../util.js'
import { Component } from './index.js'

class NavButton extends Component {
  static {
    defineToStringTag(this)
  }

  /** @type {HTMLButtonElement} */
  button = BUTTON_TEMPLATE.cloneNode(true)

  /** @param {Element} source */
  constructor(source) {
    super()

    this.button.value = source.id
    this.button.textContent = source.attributes.title.nodeValue

    this.button.addEventListener(EVENT.CLICK, this.click.bind(this))

    return this.button
  }
  /** @param {MouseEvent} $event */
  click($event) {
    this.concentration.CurrentFlowId = this.button.value
  }
}

export class Nav extends Component {
  static {
    defineToStringTag(this)
  }

  nav = Object.assign(document.createElement(TagName.NAV), { id: TagName.NAV })

  constructor() {
    super()

    this.concentration.addEventListener(EVENT.INIT, this.INIT.bind(this))

    return this.nav
  }

  [EVENT.INIT]() {
    const fragment = document.createDocumentFragment()
    /** @type {Element} */
    let source
    for (source of this.concentration.$.documentElement.children) fragment.append(new NavButton(source))
    this.nav.append(fragment)
  }
}
