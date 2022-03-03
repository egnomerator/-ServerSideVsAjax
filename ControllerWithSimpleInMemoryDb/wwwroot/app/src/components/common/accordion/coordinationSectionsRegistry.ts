export interface IcollapseCoordinationSectionsRegistry {
    registerSection: (section: CoordinationSectionCallback) => void;
    callSectionsOtherThan: (sectionId: string) => void;
}

export interface CoordinationSectionCallback {
    sectionId: string;
    callback: (sectionId: string) => void;
}

export function createSectionsRegistry() {
    const registry = new collapseCoordinationSectionsRegistry();
    return registry;
}

class collapseCoordinationSectionsRegistry {
    registeredSections: CoordinationSectionCallback[];
    constructor() {
        this.registeredSections = [];
        this.registerSection = this.registerSection.bind(this);
        this.callSectionsOtherThan = this.callSectionsOtherThan.bind(this);
    }

    registerSection(section: CoordinationSectionCallback) {
        const indexLookupResult = this.registeredSections.findIndex((sectionCallBack) => sectionCallBack.sectionId === section.sectionId);
        const sectionNotYetRegistered = indexLookupResult === -1;
        if (sectionNotYetRegistered) this.registeredSections.push({ sectionId: section.sectionId, callback: section.callback });
    }

    callSectionsOtherThan(sectionId: string) {
        let sectionsToCall = this.registeredSections.filter((section) => section.sectionId !== sectionId);
        sectionsToCall.forEach((section) => section.callback(sectionId));
    }
}
