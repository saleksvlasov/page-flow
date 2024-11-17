import { observer } from 'mobx-react-lite'

import './sizer/SV.sizer.wc'
import { CustomSelectView } from './Custom.select.view'

export const App = observer(function app() {
  return (
    <div>
      <CustomSelectView />
    </div>
  )
})
