import { Dev } from "../models/Dev";

export interface EditableTableState {
    nextId: number;
    devs: Dev[];
    createDevName: string;
    devDetails: string;
    ajaxResult: string;
}
