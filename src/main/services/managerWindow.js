"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeManagerWindow = exports.managerThroughOff = exports.managerThroughOn = exports.stopMoveMangerScreen = exports.moveMangerScreen = void 0;
/* Control moving */
const electron_1 = require("electron");
const manager_1 = require("../windows/manager");
const moveMangerScreen = (event, args) => {
    const cursorScreenPoint = electron_1.screen.getCursorScreenPoint();
    if (manager_1.managerWindow) {
        const newX = cursorScreenPoint.x - args.x;
        const newY = cursorScreenPoint.y - args.y;
        event.sender.send('manger-window-position-changing', {
            x: newX,
            y: newY,
        });
        manager_1.managerWindow.setPosition(newX, newY);
    }
};
exports.moveMangerScreen = moveMangerScreen;
const stopMoveMangerScreen = (event, args) => {
    const cursorScreenPoint = electron_1.screen.getCursorScreenPoint();
    if (manager_1.managerWindow) {
        const newX = cursorScreenPoint.x - args.x;
        const newY = cursorScreenPoint.y - args.y;
        event.sender.send('manger-window-position-changed', {
            x: newX,
            y: newY,
        });
        manager_1.managerWindow.setPosition(newX, newY);
    }
};
exports.stopMoveMangerScreen = stopMoveMangerScreen;
const managerThroughOn = () => {
    if (manager_1.managerWindow) {
        manager_1.managerWindow.setIgnoreMouseEvents(true, { forward: true });
    }
};
exports.managerThroughOn = managerThroughOn;
const managerThroughOff = () => {
    if (manager_1.managerWindow) {
        manager_1.managerWindow.setIgnoreMouseEvents(false, { forward: false });
    }
};
exports.managerThroughOff = managerThroughOff;
const closeManagerWindow = () => {
    if (manager_1.managerWindow && manager_1.managerWindow.closable) {
        manager_1.managerWindow.close();
    }
};
exports.closeManagerWindow = closeManagerWindow;
//# sourceMappingURL=managerWindow.js.map