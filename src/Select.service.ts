import { makeObservable, observable, reaction } from 'mobx'
import { Pageable } from './Pageable'

export class SelectService {
  value: string = ''

  pageable = new Pageable()

  constructor() {
    // document.addEventListener('own-change', event => {
    //   console.log('SelectService:', event.detail)
    //   runInAction(() => (this.value = event.detail))
    // })

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
      }
    )
  }
}

export const selectService = new SelectService()
