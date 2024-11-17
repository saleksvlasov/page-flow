import { doStyles } from '../utils'

export class HTMLSizerElement extends HTMLElement {
  static observedAttributes: string[] = ['value']
  
  #rowsPerPage: string[] = []
  
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
      <div class="wrapper">
        <label for="sizer">Показывать по</label>
        <div class="horizontal-divider"></div>
        <select class="select-sizer" id="sizer" name="select-sizer" autocomplete="off"></select>
      </div>
    `
    
    const sheet = doStyles()
    this.shadowRoot.adoptedStyleSheets = [sheet]
    
    this.#rowsPerPage = (this.getAttribute('rowsPerPage') as string)
      .split(',')
      .map(item => item.trim())
    
    this.#renderSelectOptions(this.#rowsPerPage)
    
    this.list.addEventListener('input', this.#onSelectListItem.bind(this))
  }
  
  attributeChangedCallback(name: string, oldName: string, newName: string) {
    console.log(name, oldName, newName)
  }
  
  #onSelectListItem(event: Event) {
    // event.stopPropagation()
    this.value = (event.target as HTMLSelectElement).value
    // console.log('#onSelectListItem:', event)
    
    // this.listItem.map((element: HTMLOptionElement) => {
    //   if (element.value === this.value) {
    //     element.setAttribute('id', this.value)
    //     element.setAttribute('selected', '')
    //   }
    //   return element
    // })
    
    // console.log('this.list.value:', this.list.value)
    
    this.dispatchEvent(new Event('change'))
  }
  
  #renderSelectOptions(rowsPerPage: string[]) {
    rowsPerPage.map(item => {
      const $optionElement = document.createElement('option')
      $optionElement.textContent = item
      $optionElement.value = item
      
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

if (!customElements.get('sv-sizer')) {
  customElements.define('sv-sizer', HTMLSizerElement)
}
