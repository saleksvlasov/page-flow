import { ChangeEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { selectService } from './Select.service'

export const CustomSelectView = observer(function customSelectView() {
  const { pageable } = selectService
  
  const onSizeChange = (event: ChangeEvent<HTMLSizerElement>) => {
    const value = event.target.value
    pageable.setSize(value)
  }
  
  const onClickerChange = (event: ChangeEvent<HTMLClickerElement>) => {
    const value = event.target.page as number
    pageable.setPage(value)
  }
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <sv-sizer
        rowsPerPage={[10, 25, 50, 100]}
        value={pageable.size}
        onChange={onSizeChange}
      />
      <sv-clicker totalPage={30} page={pageable.page} onChange={onClickerChange} />
    </div>
  )
})
