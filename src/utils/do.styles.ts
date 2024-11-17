/**
 * @function doStyles
 *
 * @return CSSStyleSheet
 */
export function doStyles() {
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
