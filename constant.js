/** 按钮模板 */
export const BUTTON_TEMPLATE = document.createElement('button')
BUTTON_TEMPLATE.type = BUTTON_TEMPLATE.localName

/** flow容器模板 */
export const FLOW_TEMPLATE = document.createElement('section')
FLOW_TEMPLATE.classList.add(TAG.FLOW)

/** branch模板 */
export const BRANCH_TEMPLATE = document.createElement('section')
BRANCH_TEMPLATE.classList.add(TAG.BRANCH)

/** 卡片模板 */
export const STEP_TEMPLATE = document.createElement('article')
/** 卡片header */
export const STEP_HEADER_TEMPLATE = document.createElement('header')
STEP_TEMPLATE.classList.add(TAG.STEP)
STEP_TEMPLATE.tabIndex = 0
STEP_HEADER_TEMPLATE.classList.add(`${TAG.STEP}__${STEP_HEADER_TEMPLATE.localName}`)
STEP_HEADER_TEMPLATE.setAttribute('name', STEP_HEADER_TEMPLATE.localName)
STEP_TEMPLATE.appendChild(STEP_HEADER_TEMPLATE)

export const USELESS_SELECTOR = ':where()'
export const USELESS_RULE = `${USELESS_SELECTOR}{}`
