"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManager = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const uuid_1 = require("uuid");
const createManager = (payload) => {
    const dataFolder = electron_is_dev_1.default ? path_1.default.join(__dirname, '..', 'data') : path_1.default.join(process.resourcesPath, 'data');
    /* Data data folder is not exist */
    if (!fs_1.default.existsSync(dataFolder)) {
        fs_1.default.mkdirSync(dataFolder);
    }
    // const fileList = fs.readdirSync(dataFolder).filter(file => file.includes(MANAGER_FILE_PREFIX))
    /* First slot */
    // if (!fileList.length) {
    const name = (0, uuid_1.v4)();
    fs_1.default.mkdirSync(`${dataFolder}/${name}`);
    fs_1.default.writeFileSync(`${dataFolder}/${name}/manager.json`, JSON.stringify(payload));
    // } else {
    //   const num = Number(fileList[fileList.length - 1].split(MANAGER_FILE_PREFIX)[1])
    //   fs.writeFileSync(`${dataFolder}/${MANAGER_FILE_PREFIX}${num + 1}`, JSON.stringify(payload))
    // }
};
exports.createManager = createManager;
//# sourceMappingURL=manager.js.map