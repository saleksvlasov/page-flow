import { observer } from 'mobx-react-lite'

import './sizer/SV.sizer.wc'
import { CustomSelectView } from './Custom.select.view'

export const App = observer(function app() {
  return (
    <div>
      <CustomSelectView />
      <select
        style={{ marginTop: '32px' }}
        name="select-test"
        id={crypto.randomUUID()}
        onChange={e => {
          console.log(e.target)
        }}
      >
        {[10, 25, 50, 100].map(size => (
          <option key={`test-select_size-${size}`} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  )
})
