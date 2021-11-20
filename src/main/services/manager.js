"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManagerById = exports.getManagerList = exports.createManagerMainImage = exports.createManager = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const uuid_1 = require("uuid");
const dataFolder = electron_is_dev_1.default ? path_1.default.join(__dirname, '..', 'data') : path_1.default.join(process.resourcesPath, 'data');
const createManager = async (payload) => {
    /* Data data folder is not exist */
    if (!fs_1.default.existsSync(dataFolder)) {
        fs_1.default.mkdirSync(dataFolder);
    }
    /* Set manager Id */
    const managerId = (0, uuid_1.v4)();
    payload.manager.id = managerId;
    // if (payload.mainImg) {
    //   /* Blob to int8Array */
    //   const fileData = new Int8Array(await payload.mainImg.arrayBuffer())
    //   /* Create file */
    //   fs.writeFileSync(`${dataFolder}/${managerId}/manger.${payload.mainImg.name.split('.')[1]}`, fileData)
    // }
    //
    // if (payload.circleImg) {
    //   /* Blob to int8Array */
    //   const fileData = new Int8Array(await payload.circleImg.arrayBuffer())
    //   /* Create file */
    //   fs.writeFileSync(`${dataFolder}/${managerId}/manger_circle.${payload.circleImg.name.split('.')[1]}`, fileData)
    // }
    /* Create file */
    fs_1.default.mkdirSync(`${dataFolder}/${managerId}`);
    fs_1.default.writeFileSync(`${dataFolder}/${managerId}/manager.json`, JSON.stringify(payload.manager));
    fs_1.default.writeFileSync(`${dataFolder}/${managerId}/managerConfig.json`, JSON.stringify(payload.config));
    return managerId;
};
exports.createManager = createManager;
const createManagerMainImage = async (id, file) => {
    if (!fs_1.default.existsSync(`${dataFolder}/${id}`)) {
        throw new Error('no existed id');
    }
    try {
        /* Blob to int8Array */
        const fileData = new Int8Array(await file.arrayBuffer());
        /* Create file */
        fs_1.default.writeFileSync(`${dataFolder}/${id}/manger.${file.name.split('.')[1]}`, fileData);
    }
    catch (e) {
        console.error(e);
        throw new Error('error');
    }
};
exports.createManagerMainImage = createManagerMainImage;
const getManagerList = async (event) => {
    try {
        const result = [];
        const folderNameList = fs_1.default.readdirSync(dataFolder);
        console.log(folderNameList);
        for (let i = 0; i < folderNameList.length; i++) {
            const folderName = folderNameList[i];
            const manager = fs_1.default.readFileSync(`${dataFolder}/${folderName}/manager.json`);
            const config = fs_1.default.readFileSync(`${dataFolder}/${folderName}/managerConfig.json`);
            result.push({
                manager: JSON.parse(manager),
                config: JSON.parse(config),
            });
        }
        return result;
    }
    catch (e) {
        console.error(e);
        throw { code: 400, message: e };
    }
};
exports.getManagerList = getManagerList;
const getManagerById = async (event, args) => {
    try {
        const folderNameList = fs_1.default.readdirSync(dataFolder);
        console.log(folderNameList);
        return {};
    }
    catch (e) {
        console.error(e);
        throw { code: 400, message: e };
    }
};
exports.getManagerById = getManagerById;
//# sourceMappingURL=manager.js.map