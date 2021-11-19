import { Dev } from "../models/Dev";

export interface EditableTableState {
    nextId: number;
    devs: Dev[];
    devDetails: string;
    ajaxResult: string;
}
