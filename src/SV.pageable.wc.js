export class SVPageableWc extends HTMLElement {
  /** @type {string[]} */
  static observedAttributes = ['count', 'page', 'rowsPerPage', 'rowsPerPageLabel']

  /** @type {string} */
  #count = '0'

  /** @type {string[]} */
  #rowsPerPage = []

  constructor() {
    super()
  }

  connectedCallback() {
    this.#count = this.getAttribute('count')
    this.#rowsPerPage = this.getAttribute('rowsPerPage').split(',')

    const sizerElement = this.#renderSelect(this.#rowsPerPage)

    const sheet = this.#appendStyles()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.adoptedStyleSheets = [sheet]
    shadow.appendChild(sizerElement)
  }

  /**
   * @function #renderSelect
   * @param {string[]} rowsPerPage
   *
   * @return HTMLElement
   */
  #renderSelect(rowsPerPage) {
    const wrapperElement = document.createElement('div')
    wrapperElement.className = 'wrapper'

    const labelElement = document.createElement('label')
    labelElement.setAttribute('htmlFor', 'sizer')
    labelElement.textContent = 'Показывать по'

    const horizontalDividerElement = document.createElement('div')
    horizontalDividerElement.className = 'horizontal-divider'

    const selectElement = document.createElement('select')
    selectElement.className = 'select-sizer'
    selectElement.setAttribute('name', 'select-sizer')
    selectElement.setAttribute('id', 'sizer')
    selectElement.setAttribute('value', this.#count)

    rowsPerPage.map(item => {
      const optionElement = document.createElement('option')
      optionElement.setAttribute('value', item)
      optionElement.textContent = item
      selectElement.appendChild(optionElement)
    })

    wrapperElement.appendChild(labelElement)
    wrapperElement.appendChild(horizontalDividerElement)
    wrapperElement.appendChild(selectElement)

    return wrapperElement
  }

  /**
   * @function #appendStyles
   *
   * @return CSSStyleSheet
   */
  #appendStyles() {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(`
        .wrapper {
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
   * @param {string} oldValue
   * @param {string} newValue
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes
   */
  attributeChangedCallback(name, oldValue, newValue) {}
}

if (!customElements.get('sv-pageable-wc')) {
  customElements.define('sv-pageable-wc', SVPageableWc)
}
