import { doStyles } from '../utils/index.js'

export class SVSizerWc extends HTMLElement {
  /** @type { string[] } */
  static observedAttributes = ['rowsPerPage']
  static formAssociated = true

  // #observer = new MutationObserver(this.#onOptionsChanges.bind(this))

  /** @type { string[] } */
  #rowsPerPage = []

  /** @type {  ShadowRoot } */
  shadowRoot

  // /** @type { string } */
  // selectedSize

  constructor() {
    super()
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.shadowRoot = this.attachShadow({ mode: 'open' })
    }

    // this.#observer.observe(this, {
    //   childList: true,
    //   subtree: true,
    //   attributes: true,
    //   attributeFilter: ['data-selected']
    // })

    const sheet = doStyles()
    this.shadowRoot.adoptedStyleSheets = [sheet]

    this.#rowsPerPage = this.getAttribute('rowsPerPage')
      .split(',')
      .map(item => item.trim())

    // const $buttonElement = document.createElement('button')
    // $buttonElement.setAttribute('option-value', '10')
    // $buttonElement.textContent = '10'
    // $buttonElement.style.width = '100%'
    //
    // $buttonElement.addEventListener('click', this.#onSelectListItem.bind(this))
    //
    // this.shadowRoot.appendChild($buttonElement)

    this.#renderSelect(this.#rowsPerPage)
  }

  disconnectedCallback() {
    // this.#observer.disconnect()
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

  // #onOptionsChanges(event) {
  //   this.shadowRoot.getElementById('sizer').replaceChildren()
  //   console.log(event)
  // }

  get list() {
    return this.shadowRoot.getElementById('sizer')
  }

  get listItems() {
    return Array.from(this.list.children)
  }

  // /**
  //  * @function #onSizeChange
  //  * @param { HTMLElementEventMap[string] } event
  //  */
  // #onSizeChange(event) {
  //   this.selectedSize = event.target.value
  // }

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
    // $selectElement.classList.add('select-sizer')
    $selectElement.name = 'select-sizer'
    $selectElement.id = 'sizer'

    rowsPerPage.map(item => {
      const $optionElement = document.createElement('option')
      $optionElement.textContent = item
      $optionElement.value = item

      $selectElement.appendChild($optionElement)
    })

    $selectElement.addEventListener('change', this.#onSelectListItem.bind(this))
    this.shadowRoot.appendChild($selectElement)

    // $wrapperElement.appendChild($labelElement)
    // $wrapperElement.appendChild($horizontalDividerElement)
    // $wrapperElement.appendChild($selectElement)
    //
    // this.shadowRoot.appendChild($wrapperElement)
  }

  #onSelectListItem(event) {
    // event.stopPropagation()
    console.log('#onSelectListItem:', event.target.value)

    const customEvent = new Event('change', { bubbles: true })
    this.dispatchEvent(customEvent)
  }
}

customElements.define('sv-sizer-wc', SVSizerWc)
