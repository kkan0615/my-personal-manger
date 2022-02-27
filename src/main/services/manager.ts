import { app, IpcMainInvokeEvent } from 'electron'
import fs from 'fs/promises'

export const getManagerImages = async (event: IpcMainInvokeEvent, args: { id: string }) => {
  const path = `${app.getPath('documents')}/${app.getName()}`
  return {
    main: await fs.readFile(`${path}/${args.id}/main.png`)
  }
}
