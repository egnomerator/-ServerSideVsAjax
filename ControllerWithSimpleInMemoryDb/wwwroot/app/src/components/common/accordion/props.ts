export interface AccordionProps {
    collapseAsAccordion?: boolean;
    sectionIndexInitialExpanded?: number;
    sectionIndexInitialExpandeds?: number[];
}
export interface AccordionSectionProps {
    sectionTitle: string;
}

export interface AccordionSectionHandlerProps {
    sectionTitle: string;
    sectionId: string;
    expanded: boolean;
    coordinationCallback: Function;
    coordinationCallbackCollection: CoordinationSectionCallback[];
}

export interface CoordinationSectionCallback {
    sectionId: string;
    callBack: Function;
}