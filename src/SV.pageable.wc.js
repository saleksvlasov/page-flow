export class SVPageableWc extends HTMLElement {
  /** @type {string[]} */
  static observedAttributes = ['count', 'page', 'rowsPerPage', 'rowsPerPageLabel']
  constructor() {
    super()
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
