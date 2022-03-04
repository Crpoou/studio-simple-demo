import {Concentration} from './concentration.js'
/////////////////////////////
/// Response
/////////////////////////////
/** @param {Response} response */
export function toJson(response) {
  return response.json()
}
/** @param {Response} response */
export function toText(response) {
  return response.text()
}
/////////////////////////////
/// Document
/////////////////////////////
/**
 * @this Document
 * @param {string} x
 * @param {number} i
 * @param {Array<string>} r
 * @return {Element}
 */
export function getElementById(x, i, r) {
  return this.getElementById(x)
}
/**
 * @template T
 * @this Document
 * @param {T} x
 * @param {number} i
 * @param {Array<T>} r
 * @return {[T,NodeListOf<Element>]}
 */
export function createEntryByName(x, i, r) {
  return [x, this.getElementsByName(x)]
}
/**
 * @template T
 * @this Document
 * @param {T} x
 * @param {number} i
 * @param {Array<T>} r
 * @return {[T,HTMLCollectionOf<Element>]}
 */
export function createEntryByTagName(x, i, r) {
  return [x, this.getElementsByTagName(x)]
}
/**
 * @template T
 * @this Document
 * @param {T} x
 * @param {number} i
 * @param {Array<T>} r
 * @return {[T,HTMLCollectionOf<Element>]}
 */
export function createEntryByClassName(x, i, r) {
  return [x, this.getElementsByClassName(x)]
}
/**
 * @param {Element} x
 * @param {number} i
 * @param {Array<Element>} r
 */
export function getName(x, i, r) {
  return x.attributes.name.nodeValue
}
/**
 * @this {string}
 * @param {Element} x
 * @param {number} i
 * @param {Array<Element>} r
 */
export function isSameName(x, i, r) {
  return x.attributes.name?.nodeValue === this
}
/** @param {Document} $ */
export function clear($) {
  const a = new WeakSet($.all)
  const c = new Set()
  /** @type {Node} */
  let n
  for (n of $.all) for (n of n.childNodes) a.has(n) || (n.nodeValue && (n.nodeValue = n.nodeValue.trim())) || c.add(n)
  for (n of c) n.remove()
}
/////////////////////////////
/// CSS
/////////////////////////////
/** @param {string} id */
export function createIdSelector(id) {
  return `#${CSS.escape(id)}`
}
/** @param {string} id */
export function createValueSelector(id) {
  return `[value='${id}']`
}
/** @param  {Array<CSSStyleSheet>} sheets */
export function appendCSSStyleSheet(...sheets) {
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...sheets]
}
/////////////////////////////
/// Event
/////////////////////////////
/**
 * @template {Event} E
 * @param {E} $event
 */
export function preventDefault($event) {
  return $event.preventDefault() || $event
}
/**
 * @template {Event} E
 * @param {E} $event
 */
export function stopPropagation($event) {
  return $event.stopPropagation() || $event
}
/**
 * @template {Event} E
 * @param {E} $event
 */
export function stopImmediatePropagation($event) {
  return $event.stopImmediatePropagation() || $event
}
/**
 * @template {Event} E
 * @param {E} $event
 */
export function preventStopPropagation($event) {
  return stopPropagation(preventDefault($event))
}
/**
 * @template {Event} E
 * @param {E} $event
 */
export function preventStopImmediatePropagation($event) {
  return stopImmediatePropagation(preventDefault($event))
}
/////////////////////////////
/// Other
/////////////////////////////
/** @param {Function} resolve */
function $executor(resolve) {
  setTimeout(resolve, 300)
}
/** @returns {Promise<void>} */
export function sleep() {
  return new Promise($executor)
}
/** @param {Function} C */
export function defineToStringTag(C) {
  return Reflect.defineProperty(C.prototype, Symbol.toStringTag, {value: C.name})
}
