import { router } from '@/router/index'
import { useManagerStore } from '@/stores/manager'

router.beforeEach(async (to, from, next) => {
  const managerStore = useManagerStore()

  if (!managerStore.CurrentManger || !managerStore.CurrentManger.id) {
    await managerStore.loadCurrentManager()
  }

  next()
})
