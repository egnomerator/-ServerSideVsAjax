import { Dev } from "../models/Dev";

export interface DevsWebApi {
    getDevs(): JQueryXHR;
    createDev(dev: Dev): JQueryXHR;
    viewDev(id: number): JQueryXHR;
    editDev(dev: Dev): JQueryXHR;
    deleteDev(id: number): JQueryXHR;
}
