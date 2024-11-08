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

  constructor() {
    super()

    this.#internals = this.attachInternals()
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true })
    }

    const sheet = this.#appendStyles()
    this.shadowRoot.adoptedStyleSheets = [sheet]

    this.#count = this.getAttribute('count')
    this.#rowsPerPage = this.getAttribute('rowsPerPage').split(',')

    this.#renderSelect(this.#rowsPerPage)
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
    $selectElement.value = this.#count

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

  /**
   * @function #appendStyles
   *
   * @return CSSStyleSheet
   */
  #appendStyles() {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(`
        :host {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
        }
        
        :host * {
          font-size: inherit;
          line-height: inherit;
        }
    
        .wrapper {
          width: max-content;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid #c4c4c4c4;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
          color: gray;
        }
    
        .horizontal-divider {
          border-left: 1px solid #c4c4c4c4;
          margin: 0 16px;
          height: 1rem;
        }
        
        .select-sizer {
          border: none;
          color: gray;
        }
    `)

    return sheet
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

  /**
   * @function #onSizeChange
   * @param { HTMLElementEventMap[string] } event
   */
  #onSizeChange(event) {
    console.log(event.target.value)
  }
}

if (!customElements.get('sv-sizer-wc')) {
  customElements.define('sv-sizer-wc', SVSizerWc)
}
