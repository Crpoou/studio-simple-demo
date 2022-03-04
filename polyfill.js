const TAG = Object.freeze({
  __proto__: null,
  WORK: 'work',
  FLOW: 'flow',
  BRANCH: 'branch',
  STEP: 'step'
})
const STEP = Object.freeze({
  __proto__: null,
  WHILE: 'while',
  VAR: 'var',
  IF: 'if',
  INVOKE: 'invoke',
  PRINT: 'print'
})
const STATUS = Object.freeze({
  __proto__: null,
  FOLD: 'FOLD',
  SELECTED: 'SELECTED',
  DISABLED: 'DISABLED'
})
const EVENT = Object.freeze({
  __proto__: null,
  INIT: 'INIT',
  MUTATION: 'MUTATION',
  REFRESH: 'REFRESH',
  RUN: 'RUN',
  LOG: 'LOG',
  PAUSE: 'PAUSE',
  STOP: 'STOP',
  CLICK: 'click'
})
const OPERATION = Object.freeze({
  __proto__: null,
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE'
})
const ClassName = Object.freeze({
  __proto__: null,
  SCROLL: 'scroll'
})
const Style = Object.freeze({
  __proto__: null,
  DISPLAY_NONE: 'display:none',
  DISPLAY_REVERT: 'display:revert'
})
const TagName = Object.freeze({
  __proto__: null,
  A: 'a',
  ABBR: 'abbr',
  ADDRESS: 'address',
  AREA: 'area',
  ARTICLE: 'article',
  ASIDE: 'aside',
  AUDIO: 'audio',
  B: 'b',
  BASE: 'base',
  BDI: 'bdi',
  BDO: 'bdo',
  BLOCKQUOTE: 'blockquote',
  BODY: 'body',
  BR: 'br',
  BUTTON: 'button',
  CANVAS: 'canvas',
  CAPTION: 'caption',
  CITE: 'cite',
  CODE: 'code',
  COL: 'col',
  COLGROUP: 'colgroup',
  DATA: 'data',
  DATALIST: 'datalist',
  DD: 'dd',
  DEL: 'del',
  DETAILS: 'details',
  DFN: 'dfn',
  DIALOG: 'dialog',
  DIR: 'dir',
  DIV: 'div',
  DL: 'dl',
  DT: 'dt',
  EM: 'em',
  EMBED: 'embed',
  FIELDSET: 'fieldset',
  FIGCAPTION: 'figcaption',
  FIGURE: 'figure',
  FONT: 'font',
  FOOTER: 'footer',
  FORM: 'form',
  FRAME: 'frame',
  FRAMESET: 'frameset',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  HEAD: 'head',
  HEADER: 'header',
  HGROUP: 'hgroup',
  HR: 'hr',
  HTML: 'html',
  I: 'i',
  IFRAME: 'iframe',
  IMG: 'img',
  INPUT: 'input',
  INS: 'ins',
  KBD: 'kbd',
  LABEL: 'label',
  LEGEND: 'legend',
  LI: 'li',
  LINK: 'link',
  MAIN: 'main',
  MAP: 'map',
  MARK: 'mark',
  MARQUEE: 'marquee',
  MENU: 'menu',
  META: 'meta',
  METER: 'meter',
  NAV: 'nav',
  NOSCRIPT: 'noscript',
  OBJECT: 'object',
  OL: 'ol',
  OPTGROUP: 'optgroup',
  OPTION: 'option',
  OUTPUT: 'output',
  P: 'p',
  PARAM: 'param',
  PICTURE: 'picture',
  PRE: 'pre',
  PROGRESS: 'progress',
  Q: 'q',
  RP: 'rp',
  RT: 'rt',
  RUBY: 'ruby',
  S: 's',
  SAMP: 'samp',
  SCRIPT: 'script',
  SECTION: 'section',
  SELECT: 'select',
  SLOT: 'slot',
  SMALL: 'small',
  SOURCE: 'source',
  SPAN: 'span',
  STRONG: 'strong',
  STYLE: 'style',
  SUB: 'sub',
  SUMMARY: 'summary',
  SUP: 'sup',
  TABLE: 'table',
  TBODY: 'tbody',
  TD: 'td',
  TEMPLATE: 'template',
  TEXTAREA: 'textarea',
  TFOOT: 'tfoot',
  TH: 'th',
  THEAD: 'thead',
  TIME: 'time',
  TITLE: 'title',
  TR: 'tr',
  TRACK: 'track',
  U: 'u',
  UL: 'ul',
  VAR: 'var',
  VIDEO: 'video',
  WBR: 'wbr'
})
const BRANCH = Object.freeze({
  __proto__: null,
  THEN: Symbol('then'),
  ELSE: Symbol('else'),
  DEFAULT: Symbol('default')
})

// Object.defineProperties(globalThis, Object.fromEntries(Reflect.ownKeys(MAP).map(translateEnum, MAP)))
// {
//   const BRANCH_PROPERTIES = {
//     [Branch.THEN]() {
//       return Array.prototype.find.call(this.children, isSameName, Branch.THEN.description)
//     },
//     [Branch.ELSE]() {
//       return Array.prototype.find.call(this.children, isSameName, Branch.ELSE.description)
//     }
//   }
//   Object.defineProperties(
//     Element.prototype,
//     Object.fromEntries(Reflect.ownKeys(BRANCH_PROPERTIES).map(translateProperty, BRANCH_PROPERTIES))
//   )
// }
