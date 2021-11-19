import { Dev } from "../models/Dev";

export interface EditableTrProps {
    dev: Dev;
    view(id: number): void;
    edit(dev: Dev): void;
    delete(id: number): void;
}
