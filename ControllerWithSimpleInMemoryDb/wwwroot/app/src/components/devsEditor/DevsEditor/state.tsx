import { Dev } from "../models/Dev";

export interface DevsEditorState {
    nextId: number;
    devs: Dev[];
    devDetails: string;
    ajaxResult: string;
}
