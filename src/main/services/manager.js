"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManagerMainImage = exports.createManager = void 0;
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
    const mangerData = {
        manager: payload.manager,
        config: payload.config,
    };
    fs_1.default.writeFileSync(`${dataFolder}/${managerId}/manager.json`, JSON.stringify(mangerData));
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
//# sourceMappingURL=manager.js.map