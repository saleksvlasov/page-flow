import { doStyles } from '../utils'

export class HTMLSizerElement extends HTMLElement {
  static formAssociated = true
  
  #rowsPerPage: number[] = []
  
  shadowRoot: ShadowRoot
  
  value = ''
  
  constructor() {
    super()
  }
  
  connectedCallback() {
    if (!this.shadowRoot) {
      this.shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true })
    }
    
    this.shadowRoot.innerHTML = `
      ${doStyles}
      <div class="wrapper">
        <label for="sizer">Показывать по</label>
        <div class="horizontal-divider"></div>
        <select class="select-sizer" id="sizer" name="select-sizer" autocomplete="off"></select>
      </div>
    `
    
    this.#rowsPerPage = (this.getAttribute('rowsPerPage') as string)
      .split(',')
      .map(item => parseInt(item.trim()))
    
    this.#renderSelectOptions(this.#rowsPerPage)
    
    this.list.addEventListener('input', this.#onSelectListItem.bind(this))
  }
  
  #onSelectListItem(event: Event) {
    this.value = (event.target as HTMLSelectElement).value
    
    this.dispatchEvent(new Event('change'))
  }
  
  #renderSelectOptions(rowsPerPage: number[]) {
    rowsPerPage.map(item => {
      const $optionElement = document.createElement('option')
      $optionElement.textContent = String(item)
      $optionElement.value = String(item)
      
      this.list.appendChild($optionElement)
    })
  }
  
  get list() {
    return this.shadowRoot.getElementById('sizer') as HTMLSelectElement
  }
  
  get listItem() {
    return Array.from(this.list.children) as HTMLOptionElement[]
  }
}

customElements.define('sv-sizer', HTMLSizerElement)
