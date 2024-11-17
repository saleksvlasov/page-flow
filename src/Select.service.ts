import { makeObservable, observable, reaction } from 'mobx'
import { Pageable } from './Pageable'

export class SelectService {
  value: string = ''
  
  pageable = new Pageable()
  
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
        // fetch('https://api.github.com/repositories/1300192/issues?page=515&size=20')
        //   .then((response) => response.json())
        //   .then((json) => console.log(json))
      }
    )
    
    reaction(
      () => this.pageable.page,
      () => {
        console.log('(from SelectService) CHANGE PAGE:', this.pageable.page)
        // fetch('https://api.github.com/repositories/1300192/issues?page=515&size=20')
        //   .then((response) => response.json())
        //   .then((json) => console.log(json))
      }
    )
  }
}

export const selectService = new SelectService()
