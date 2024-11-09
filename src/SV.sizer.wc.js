import { doStyles } from './utils/index.js'

export class SVSizerWc extends HTMLElement {
  /** @type { string[] } */
  static observedAttributes = ['count', 'page', 'rowsPerPage', 'rowsPerPageLabel']

  /** @type { string } */
  #count = '0'

  /** @type { string[] } */
  #rowsPerPage = []

  /** @type { ElementInternals } */
  #internals

  /** @type {  ShadowRoot } */
  shadowRoot

  /** @type { string } */
  selectedSize

  constructor() {
    super()
    this.#internals = this.attachInternals()
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true })
    }

    const sheet = doStyles()
    this.shadowRoot.adoptedStyleSheets = [sheet]

    this.#count = this.getAttribute('count')
    this.selectedSize = this.#count
    this.#rowsPerPage = this.getAttribute('rowsPerPage').split(',')

    this.#renderSelect(this.#rowsPerPage)
  }

  /**
   * @function attributeChangedCallback
   * @description The attributeChangedCallback() callback is then called whenever an attribute whose name is listed in the element's observedAttributes property is added, modified, removed, or replaced.
   *
   * @param {string} name
   * @param {string | null} oldValue
   * @param {string | null} newValue
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback:', name, oldValue, newValue)
  }

  get list() {
    return this.shadowRoot.getElementById('sizer')
  }

  get listItems() {
    return Array.from(this.list.children)
  }

  /**
   * @function #onSizeChange
   * @param { HTMLElementEventMap[string] } event
   */
  #onSizeChange(event) {
    this.selectedSize = event.target.value
  }

  /**
   * @function #renderSelect
   * @param {string[]} rowsPerPage
   *
   */
  #renderSelect(rowsPerPage) {
    const $wrapperElement = document.createElement('div')
    $wrapperElement.className = 'wrapper'

    const $labelElement = document.createElement('label')
    $labelElement.htmlFor = 'sizer'
    $labelElement.textContent = 'Показывать по'

    const $horizontalDividerElement = document.createElement('div')
    $horizontalDividerElement.className = 'horizontal-divider'

    const $selectElement = document.createElement('select')
    $selectElement.className = 'select-sizer'
    $selectElement.name = 'select-sizer'
    $selectElement.id = 'sizer'

    rowsPerPage.map(item => {
      const $optionElement = document.createElement('option')
      $optionElement.value = item
      $optionElement.textContent = item
      $selectElement.appendChild($optionElement)
    })

    $selectElement.addEventListener('change', this.#onSizeChange.bind(this))

    $wrapperElement.appendChild($labelElement)
    $wrapperElement.appendChild($horizontalDividerElement)
    $wrapperElement.appendChild($selectElement)

    this.shadowRoot.appendChild($wrapperElement)
  }
}

if (!customElements.get('sv-sizer-wc')) {
  customElements.define('sv-sizer-wc', SVSizerWc)
}
