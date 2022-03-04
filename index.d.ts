/** 文档标签名 */
declare enum TAG {
  WORK = 'work',
  FLOW = 'flow',
  BRANCH = 'branch',
  STEP = 'step'
}

/** step语句 */
declare enum STEP {
  WHILE = 'while',
  VAR = 'var',
  IF = 'if',
  INVOKE = 'invoke',
  PRINT = 'print'
}

/** 文档树内使用，状态集合 */
declare enum STATUS {
  /** 折叠 */
  FOLD = 'FOLD',
  /** 选中 */
  SELECTED = 'SELECTED',
  /** 禁用 */
  DISABLED = 'DISABLED',
}

/** 文档树及页面都可以使用，文档树使用大写，页面使用常规 */
declare enum EVENT {
  /** 初始化 */
  INIT = 'INIT',
  /** 突变，文档树发生变化 */
  MUTATION = 'MUTATION',
  /** 刷新，中间量发生变化 */
  REFRESH = 'REFRESH',
  /** 运行 */
  RUN = 'RUN',
  /** 日志 */
  LOG = 'LOG',
  /** 暂停 */
  PAUSE = 'PAUSE',
  /** 终止 */
  STOP = 'STOP',
  /** 普通点击 */
  CLICK = 'click'
}

declare enum OPERATION {
  ADD = 'ADD',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE'
}

/** 限定页面内使用，一些常规类名 */
declare enum ClassName {
  SCROLL = 'scroll'
}

/** 常用css style */
declare enum Style {
  DISPLAY_NONE = 'display:none',
  DISPLAY_REVERT = 'display:revert'
}

declare enum TagName {
  A = 'a',
  ABBR = 'abbr',
  ADDRESS = 'address',
  AREA = 'area',
  ARTICLE = 'article',
  ASIDE = 'aside',
  AUDIO = 'audio',
  B = 'b',
  BASE = 'base',
  BDI = 'bdi',
  BDO = 'bdo',
  BLOCKQUOTE = 'blockquote',
  BODY = 'body',
  BR = 'br',
  BUTTON = 'button',
  CANVAS = 'canvas',
  CAPTION = 'caption',
  CITE = 'cite',
  CODE = 'code',
  COL = 'col',
  COLGROUP = 'colgroup',
  DATA = 'data',
  DATALIST = 'datalist',
  DD = 'dd',
  DEL = 'del',
  DETAILS = 'details',
  DFN = 'dfn',
  DIALOG = 'dialog',
  DIR = 'dir',
  DIV = 'div',
  DL = 'dl',
  DT = 'dt',
  EM = 'em',
  EMBED = 'embed',
  FIELDSET = 'fieldset',
  FIGCAPTION = 'figcaption',
  FIGURE = 'figure',
  FONT = 'font',
  FOOTER = 'footer',
  FORM = 'form',
  FRAME = 'frame',
  FRAMESET = 'frameset',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  HEAD = 'head',
  HEADER = 'header',
  HGROUP = 'hgroup',
  HR = 'hr',
  HTML = 'html',
  I = 'i',
  IFRAME = 'iframe',
  IMG = 'img',
  INPUT = 'input',
  INS = 'ins',
  KBD = 'kbd',
  LABEL = 'label',
  LEGEND = 'legend',
  LI = 'li',
  LINK = 'link',
  MAIN = 'main',
  MAP = 'map',
  MARK = 'mark',
  MARQUEE = 'marquee',
  MENU = 'menu',
  META = 'meta',
  METER = 'meter',
  NAV = 'nav',
  NOSCRIPT = 'noscript',
  OBJECT = 'object',
  OL = 'ol',
  OPTGROUP = 'optgroup',
  OPTION = 'option',
  OUTPUT = 'output',
  P = 'p',
  PARAM = 'param',
  PICTURE = 'picture',
  PRE = 'pre',
  PROGRESS = 'progress',
  Q = 'q',
  RP = 'rp',
  RT = 'rt',
  RUBY = 'ruby',
  S = 's',
  SAMP = 'samp',
  SCRIPT = 'script',
  SECTION = 'section',
  SELECT = 'select',
  SLOT = 'slot',
  SMALL = 'small',
  SOURCE = 'source',
  SPAN = 'span',
  STRONG = 'strong',
  STYLE = 'style',
  SUB = 'sub',
  SUMMARY = 'summary',
  SUP = 'sup',
  TABLE = 'table',
  TBODY = 'tbody',
  TD = 'td',
  TEMPLATE = 'template',
  TEXTAREA = 'textarea',
  TFOOT = 'tfoot',
  TH = 'th',
  THEAD = 'thead',
  TIME = 'time',
  TITLE = 'title',
  TR = 'tr',
  TRACK = 'track',
  U = 'u',
  UL = 'ul',
  VAR = 'var',
  VIDEO = 'video',
  WBR = 'wbr'
}

interface BRANCH {
  readonly THEN: unique symbol
  readonly ELSE: unique symbol
  readonly DEFAULT: unique symbol
}
declare const Branch: BRANCH

interface LogDescription {
  currentNode: Element
  value: any
  description: string
}

interface ConcentrationEventMap {
  [EVENT.INIT]: CustomEvent<null>
  [EVENT.MUTATION]: CustomEvent<null>
  [EVENT.REFRESH]: CustomEvent<null>
  [EVENT.RUN]: CustomEvent<null>
  [EVENT.LOG]: CustomEvent<LogDescription>
}

interface Document {
  adoptedStyleSheets: Array<CSSStyleSheet>
}
interface NamedNodeMap {
  [key: string]: Attr | undefined
}
// interface EventTarget {
//   $: Document
//   StepCollection: HTMLCollectionOf<Element>
//   init(template: string): this
//   addEventListener<K extends keyof ConcentrationEventMap>(
//     type: K,
//     listener: (this: Concentration, ev: ConcentrationEventMap[K]) => any,
//     options?: boolean | AddEventListenerOptions
//   ): void
//   [Symbol.toPrimitive](): string
// }
