import { Concentration } from '../concentration.js'
import { defineToStringTag, toText } from '../util.js'

const concentration = new Concentration()
fetch('/template.xml').then(toText).then(Concentration.prototype[EVENT.INIT].bind(concentration)).then(console.dir)
Reflect.defineProperty(globalThis, Concentration.name.toLowerCase(), { value: concentration })
export class Component extends EventTarget {
  static {defineToStringTag(this)}
  concentration = concentration
}
