import { Aside } from './aside.js'
import { Header } from './header.js'
import { Component } from './index.js'
import { Main } from './main.js'
import { Outline } from './Outline.js'
import { defineToStringTag } from '../util.js'

export class App extends Component {
  header = new Header()
  aside = new Aside()
  outline = new Outline()
  main = new Main()
  static {
    defineToStringTag(this)
  }
  constructor() {
    super()
    const fragment = document.createDocumentFragment()
    fragment.append(this.header, this.aside, this.outline, this.main)
    return fragment
  }
}
