import { Dev } from "../models/Dev";

export interface DevsWebApi {
    getDevs(): any;
    createDev(dev: Dev): any;
    viewDev(id: number): any;
    editDev(dev: Dev): any;
    deleteDev(id: number): any;
}
