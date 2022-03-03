import { CoordinationSectionCallback } from "./coordinationSectionsRegistry";

export interface AccordionProps {
    collapseAsAccordion?: boolean;
}

export interface AccordionSectionProps {
    sectionTitle: string;
    isExpanded?: boolean;
}

export interface AccordionSectionHandlerProps {
    sectionTitle: string;
    sectionId: string;
    expanded: boolean;
    coordinationCallback: Function;
    registerWithCoordinationSections: (section: CoordinationSectionCallback) => void;
}
