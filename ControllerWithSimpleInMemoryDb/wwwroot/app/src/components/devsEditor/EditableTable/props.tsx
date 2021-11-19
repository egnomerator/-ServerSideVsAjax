import { Dev } from "../models/Dev";

export interface EditableTableProps {
    devs: Dev[];
    view(id: number): void;
    edit(dev: Dev): void;
    delete(id: number): void;
}
