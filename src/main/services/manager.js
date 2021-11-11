"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManager = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Manager_1 = require("../types/models/Manager");
const createManager = (payload) => {
    const dataFolder = path_1.default.join(__dirname, '..', 'data');
    /* Data data folder is not exist */
    if (!fs_1.default.existsSync(dataFolder)) {
        fs_1.default.mkdirSync(dataFolder);
    }
    const fileList = fs_1.default.readdirSync(dataFolder).filter(file => file.includes(Manager_1.MANAGER_FILE_PREFIX));
    /* First slot */
    if (!fileList.length) {
        fs_1.default.writeFileSync(`${dataFolder}/${Manager_1.MANAGER_FILE_PREFIX}1`, JSON.stringify(payload));
    }
    else {
        const num = Number(fileList[fileList.length - 1].split(Manager_1.MANAGER_FILE_PREFIX)[1]);
        fs_1.default.writeFileSync(`${dataFolder}/${Manager_1.MANAGER_FILE_PREFIX}${num + 1}`, JSON.stringify(payload));
    }
};
exports.createManager = createManager;
//# sourceMappingURL=manager.js.map