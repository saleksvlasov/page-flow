import { makeObservable, observable, reaction } from 'mobx'
import { Pageable } from './Pageable'

export class SelectService {
  value: string = ''
  
  pageable = new Pageable()
  total = 30
  
  constructor() {
    makeObservable(
      this,
      {
        value: observable,
        pageable: observable
      },
      { autoBind: true }
    )
    
    reaction(
      () => this.pageable.size,
      () => {
        console.log('(from SelectService) CHANGE SIZE:', this.pageable.size)
        // fetch(`http://jsonplaceholder.typicode.com/photos?_start=${this.pageable.page}&_limit=${this.pageable.size}`)
        //   .then((response) => response.json())
        //   .then((json) => console.log(json))
      }
    )
    
    reaction(
      () => this.pageable.page,
      () => {
        console.log('(from SelectService) CHANGE PAGE:', this.pageable.page)
        // fetch(`http://jsonplaceholder.typicode.com/photos?_start=${this.pageable.page}&_limit=${this.pageable.size}`)
        //   .then((response) => response.json())
        //   .then((json) => console.log(json))
      }
    )
  }
}

export const selectService = new SelectService()
