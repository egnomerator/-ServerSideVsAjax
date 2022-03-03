import * as React from "react";
import CreateUUID from "../../../shared/uuid";
import { AccordionSection } from "./AccordionSection";
import { AccordionSectionHandler } from "./AccordionSectionHandler";
import { CoordinationSectionCallback, createSectionsRegistry, IcollapseCoordinationSectionsRegistry } from "./coordinationSectionsRegistry";
import { AccordionProps } from "./props";

export class Accordion extends React.Component<AccordionProps>{
    collapseCoordinationSectionsRegistry: IcollapseCoordinationSectionsRegistry;

    constructor(props) {
        super(props);

        this.onSectionExpand = this.onSectionExpand.bind(this);
        this.registerWithCoordinationSections = this.registerWithCoordinationSections.bind(this);

        this.collapseCoordinationSectionsRegistry = createSectionsRegistry();
    }

    onSectionExpand(sectionId) {
        if (!this.props.collapseAsAccordion) return;

        this.collapseCoordinationSectionsRegistry.callSectionsOtherThan(sectionId);
    }

    registerWithCoordinationSections(section: CoordinationSectionCallback) {
        this.collapseCoordinationSectionsRegistry.registerSection(section);
    }

    determineSectionInitialExpandedStatus(isExpanded: boolean) {
        return isExpanded === undefined || isExpanded === null
            ? false
            : isExpanded;
    }

    render() {

        let accordionSections: AccordionSection[] = []
        React.Children.toArray(this.props.children).forEach((child, i) => accordionSections.push(child as AccordionSection));

        return <div style={{ width: "100%" }}>
            {accordionSections.map((section, i) =>
                <AccordionSectionHandler key={CreateUUID()}
                    sectionTitle={section.props.sectionTitle}
                    sectionId={CreateUUID()}
                    expanded={this.determineSectionInitialExpandedStatus(section.props.isExpanded)}
                    coordinationCallback={this.onSectionExpand}
                    registerWithCoordinationSections={this.registerWithCoordinationSections}>
                    {section.props.children}
                </AccordionSectionHandler>
            )}
        </div>
    }
}