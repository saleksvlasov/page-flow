import { makeObservable, observable, runInAction } from 'mobx'

export class Pageable {
  page = 0
  size = 10

  constructor() {
    makeObservable(
      this,
      {
        page: observable,
        size: observable
      },
      { autoBind: true }
    )
  }

  setPage(value: number) {
    runInAction(() => (this.page = value))
  }

  setSize(value: number) {
    runInAction(() => (this.size = value))
  }
}
