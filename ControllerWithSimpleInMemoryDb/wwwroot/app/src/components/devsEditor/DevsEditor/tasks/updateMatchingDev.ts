import { Dev } from "../../models/Dev";

export function updateMatchingDev(updatedDev: Dev, existingDevs: Dev[]) {
    const devWithNameFieldChanged = existingDevs.find(d => d.id === updatedDev.id);
    devWithNameFieldChanged.firstName = updatedDev.firstName;

    return existingDevs;
}