import crypto from "crypto";
import CreateUUID from ".";

describe("UUID", () => {

    global.crypto = crypto;

    it("should create", () => {
        const uuid1 = CreateUUID();
        const uuid2 = CreateUUID();

        console.log(uuid1);
        console.log(uuid2);

        expect(uuid1).not.toBeUndefined();
        expect(uuid2).not.toBeUndefined();
        expect(uuid1).not.toBeNull();
        expect(uuid2).not.toBeNull();
        expect(uuid1.length).toEqual(36);
        expect(uuid2.length).toEqual(36);

        expect(uuid1).not.toEqual(uuid2);
    });

    delete global[crypto];

});