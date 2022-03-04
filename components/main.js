import { Component } from './index.js'
import { defineToStringTag } from '../util.js'
import { Nav } from './nav.js'
import { Canvas } from './canvas.js'
import { Log } from './log.js'

export class Main extends Component {
  static {
    defineToStringTag(this)
  }

  main = Object.assign(document.createElement(TagName.MAIN), { id: TagName.MAIN })
  nav = new Nav()
  canvas = new Canvas()
  log = new Log()

  constructor() {
    super()

    this.main.append(this.nav, this.canvas, this.log)
    return this.main
  }
}
