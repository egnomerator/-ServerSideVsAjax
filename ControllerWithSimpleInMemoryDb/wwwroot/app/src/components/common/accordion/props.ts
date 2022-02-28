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
    accordionIndex: number;
    expanded: boolean;
    expandedToggler: Function;
}
