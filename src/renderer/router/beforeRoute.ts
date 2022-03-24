import { router } from '@/router/index'
import { useManagerStore } from '@/stores/manager'
import { useMasterStore } from '@/stores/master'

router.beforeEach(async (to, from, next) => {
  const managerStore = useManagerStore()
  const masterStore = useMasterStore()

  /* If no master data */
  if (!masterStore.MasterConfig || !masterStore.MasterConfig.name) {
    await masterStore.loadMaster()
  }

  /* If no manager data */
  if (!managerStore.CurrentManger || !managerStore.CurrentManger.id) {
    await managerStore.loadCurrentManager()
  }

  next()
})
