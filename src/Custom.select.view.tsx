import { ChangeEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { selectService } from './Select.service'

export const CustomSelectView = observer(function customSelectView() {
  const { pageable } = selectService
  
  const onChange = (event: ChangeEvent<HTMLSizerElement>) => {
    const value = event.target.value
    pageable.setSize(value)
  }
  
  return (
    <sv-sizer
      rowsPerPage={[10, 25, 50, 100]}
      value={pageable.size}
      onChange={onChange}
    />
  )
})
