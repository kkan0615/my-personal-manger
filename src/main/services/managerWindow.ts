/* Control moving */
import { IpcMainEvent, screen } from 'electron'
import { managerWindow } from '../windows/manager'

export const moveMangerScreen = (event: IpcMainEvent, args: { x: number; y: number }) => {
  const cursorScreenPoint = screen.getCursorScreenPoint()
  if (managerWindow) {
    const newX = cursorScreenPoint.x - args.x
    const newY = cursorScreenPoint.y - args.y
    event.sender.send('manger-window-position-changing', {
      x: newX,
      y: newY,
    })
    managerWindow.setPosition(newX, newY)
  }
}
export const stopMoveMangerScreen = (event: IpcMainEvent, args: { x: number; y: number }) => {
  const cursorScreenPoint = screen.getCursorScreenPoint()
  if (managerWindow) {
    const newX = cursorScreenPoint.x - args.x
    const newY = cursorScreenPoint.y - args.y
    event.sender.send('manger-window-position-changed', {
      x: newX,
      y: newY,
    })
    managerWindow.setPosition(newX, newY)
  }
}

export const managerThroughOn = () => {
  if (managerWindow) {
    managerWindow.setIgnoreMouseEvents(true, { forward: true })
  }
}

export const managerThroughOff = () => {
  if (managerWindow) {
    managerWindow.setIgnoreMouseEvents(false, { forward: false })
  }
}

export const closeManagerWindow = () => {
  if (managerWindow && managerWindow.closable) {
    managerWindow.close()
  }
}

