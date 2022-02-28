import * as React from "react";
import CreateUUID from "../../../shared/uuid";
import { AccordionSection } from "./AccordionSection";
import { AccordionSectionHandler } from "./AccordionSectionHandler";
import { AccordionProps } from "./props";
import { AccordionSectionState, AccordionState } from "./state";

export class Accordion extends React.Component<AccordionProps, AccordionState>{
    childrenStates: AccordionSectionState[] = [];

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

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.state = {
            sections: this.childrenStates
        }
    }

    toggleExpanded(sectionIndex) {
        let currentExpandeds = this.state.sections;
        let currentExpanded = currentExpandeds[sectionIndex].expanded;

        let newExpandeds: AccordionSectionState[] = [];
        currentExpandeds.forEach((section, i) => newExpandeds.push({ expanded: section.expanded }));

        // AS ACCORDION -- accordion-style expand/collapse
        if (this.props.collapseAsAccordion) {

            // JUST COLLAPSING the current expanded section
            if (currentExpanded) {
                newExpandeds[sectionIndex].expanded = !currentExpanded;
                this.setState({ sections: newExpandeds });
                return;
            }

            // EXPANDING the current collapsed section => need to ensure all other sections are collapsed
            newExpandeds.forEach((section, i) => i === sectionIndex ? section.expanded = !currentExpanded : section.expanded = currentExpanded)

            this.setState({ sections: newExpandeds });

            return;
        }

        // NOT AS ACCORDION -- ALWAYS JUST FLIPPING the current section expanded state
        newExpandeds[sectionIndex].expanded = !currentExpanded;
        this.setState({ sections: newExpandeds });
        return;
    }

    render() {

        let accordionSections: AccordionSection[] = []
        React.Children.toArray(this.props.children).forEach((child, i) => accordionSections.push(child as AccordionSection));

        return <div id="accordion" style={{ width: "100%" }}>
            {accordionSections.map((section, i) =>
                <AccordionSectionHandler key={CreateUUID()}
                    sectionTitle={section.props.sectionTitle}
                    accordionIndex={i}
                    expanded={this.state.sections[i].expanded}
                    expandedToggler={this.toggleExpanded}>
                    {section.props.children}
                </AccordionSectionHandler>
            )}
        </div>
    }
}