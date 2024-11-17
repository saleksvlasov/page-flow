export class HTMLClickerElement extends HTMLElement {
  shadowRoot: ShadowRoot
  
  page = 0
  totalPage = 0
  shape: 'circular' | 'rounded' = 'rounded'
  
  #MAIN_ID = 'clicker'
  
  constructor() {
    super()
  }
  
  connectedCallback() {
    if (!this.shadowRoot) {
      this.shadowRoot = this.attachShadow({ mode: 'open' })
    }
    
    this.shadowRoot.innerHTML = `
      <div id="${this.#MAIN_ID}"></div>
    `
    
    this.#renderButtons()
  }
  
  disconnectedCallback() {
    this.totalPage = 0
    this.page = 0
    this.shape = 'rounded'
  }
  
  #renderButtons() {
    for (const page of [...Array(this.totalPage).keys()]) {
      const $buttonElement = document.createElement('button')
      $buttonElement.textContent = String(page + 1)
      $buttonElement.setAttribute('page-value', String(page))
      $buttonElement.addEventListener('click', this.#onBtnClick.bind(this))
      this.clicker.appendChild($buttonElement)
    }
  }
  
  #onBtnClick(event: MouseEvent) {
    const btn = event.target as HTMLButtonElement
    this.page = btn.getAttribute('page-value') as unknown as number
    
    this.dispatchEvent(new Event('change'))
  }
  
  get clicker() {
    return this.shadowRoot.getElementById(this.#MAIN_ID) as HTMLDivElement
  }
}

customElements.define('sv-clicker', HTMLClickerElement)
