import { Dev } from "../../models/Dev";

export function getCopyOfDevs(devs: Dev[]) {
    const devsCopy: Dev[] = [];
    devs.forEach(d => devsCopy.push(d));
    return devsCopy;
}