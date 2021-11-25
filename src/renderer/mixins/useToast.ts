import useStore from '@/store'
import { ApplicationActionTypes } from '@/store/modules/systems/application/actions'
import { Snackbar } from '@/types/applications/Snackbar'
import { v4 } from 'uuid'

export default function () {
  const store = useStore()

  const showToast = (args = {} as Snackbar) => {
    store.dispatch(ApplicationActionTypes.ADD_SNACKBAR_TO_LIST, {
      id: v4(),
      title: args.title || '',
      content: args.content || '',
      type: args.type || 'info',
    } as Snackbar)
  }

  return {
    showToast,
  }
}
