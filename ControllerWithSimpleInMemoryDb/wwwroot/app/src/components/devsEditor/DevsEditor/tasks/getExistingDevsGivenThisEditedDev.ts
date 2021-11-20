import { Dev } from "../../models/Dev";

export function getExistingDevsGivenThisEditedDev(dev: Dev, existingDevs: Dev[]) {
    const devWithNameFieldChanged = existingDevs.find(d => d.id === dev.id);
    devWithNameFieldChanged.name = dev.name;

    return existingDevs;
}