import { defineToStringTag } from '../util.js'
import { Component } from './index.js'

export class Aside extends Component {
  static {
    defineToStringTag(this)
  }

  aside = Object.assign(document.createElement(TagName.ASIDE), { id: TagName.ASIDE })

  constructor() {
    super()

    return this.aside
  }
}
