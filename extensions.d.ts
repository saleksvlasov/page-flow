import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sv-sizer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSizerElement>,
        HTMLSizerElement
      > & {
        value?: number
        rowsPerPage?: number[] | string
        required?: boolean
      }
    }
  }
}

declare global {
  interface HTMLSizerElement extends HTMLElement {
    value: number
    rowsPerPage: number[] | string
    required?: boolean
    
    addEventListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (
        this: HTMLSizerElement & {
          value: string
        },
        ev: HTMLElementEventMap[K]
      ) => any,
      options?: boolean | AddEventListenerOptions
    ): void
    
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void
    
    removeEventListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (
        this: HTMLSizerElement & {
          value: string
        },
        ev: HTMLElementEventMap[K]
      ) => any,
      options?: boolean | EventListenerOptions
    ): void
    
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions
    ): void
  }
}

export {}
