import { Dev } from "../../models/Dev";

export function determineNextId(devs: Dev[]) {
    if (devs === null) return 0;

    let highestId = 0;
    devs.map((dev) => {
        if (dev.id > highestId) highestId = dev.id;
    });

    return highestId + 1;
}