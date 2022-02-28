import * as React from "react";
import CreateUUID from "../../../shared/uuid";
import { AccordionSection } from "./AccordionSection";
import { AccordionSectionHandler } from "./AccordionSectionHandler";
import { AccordionProps, CoordinationSectionCallback } from "./props";

export class Accordion extends React.Component<AccordionProps>{
    constructor(props) {
        super(props);

        let children = React.Children.toArray(this.props.children);
        if (this.props.sectionIndexInitialExpandeds !== undefined) {
            children.forEach((child, i) => this.childrenStates.push({ expanded: this.props.sectionIndexInitialExpandeds.includes(i) }));
        } else {
            if (this.props.sectionIndexInitialExpanded === undefined) children.forEach((child, i) => this.childrenStates.push({ expanded: i === 0 }));
            if (this.props.sectionIndexInitialExpanded !== undefined) {
                children.forEach((child, i) => this.childrenStates.push({ expanded: i === this.props.sectionIndexInitialExpanded }));
            }
        }

        this.onSectionExpandChanged = this.onSectionExpandChanged.bind(this);
    }

    childrenStates = [];
    childCoordinationCallbacks: CoordinationSectionCallback[] = [];

    onSectionExpandChanged(sectionId) {
        if (!this.props.collapseAsAccordion) return;

        let otherSectionsToCall = this.childCoordinationCallbacks.filter((section) => section.sectionId !== sectionId);

        otherSectionsToCall.forEach((section) => section.callBack(sectionId));
    }

    render() {

        let accordionSections: AccordionSection[] = []
        React.Children.toArray(this.props.children).forEach((child, i) => accordionSections.push(child as AccordionSection));

        return <div id="accordion" style={{ width: "100%" }}>
            {accordionSections.map((section, i) =>
                <AccordionSectionHandler key={CreateUUID()}
                    sectionTitle={section.props.sectionTitle}
                    sectionId={CreateUUID()}
                    expanded={this.childrenStates[i].expanded}
                    coordinationCallback={this.onSectionExpandChanged}
                    coordinationCallbackCollection={this.childCoordinationCallbacks}>
                    {section.props.children}
                </AccordionSectionHandler>
            )}
        </div>
    }
}