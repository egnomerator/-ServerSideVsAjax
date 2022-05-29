import { Dev } from "../models/Dev";

export interface EditableTableProps {
    devs: Dev[];
    handleDevNameChange(id: number, event): void;
    view(id: number): void;
    edit(dev: Dev): void;
    delete(id: number): void;
}
