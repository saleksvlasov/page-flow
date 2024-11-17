import { observer } from 'mobx-react-lite'

import './pageable/sizer/SV.sizer.wc'
import './pageable/clicker/SV.clicker.wc'
import { CustomSelectView } from './Custom.select.view'

export const App = observer(function app() {
  return (
    <div>
      <CustomSelectView />
    </div>
  )
})
