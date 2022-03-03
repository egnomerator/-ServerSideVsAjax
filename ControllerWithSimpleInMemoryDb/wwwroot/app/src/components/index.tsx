import * as React from "react";
import * as ReactDOM from "react-dom";
import { PubSub } from "../pubSub";
import { Accordion } from "./common/accordion/Accordion";
import { AccordionSection } from "./common/accordion/AccordionSection";
import { DevsEditor } from "./devsEditor/DevsEditor";
import { DevsWebApi } from "./devsEditor/DevsEditor/webApi";

function renderDevsEditor(container: Element, api: DevsWebApi, pubSub: PubSub) {
    ReactDOM.render(
        <Accordion collapseAsAccordion={true}>
            <AccordionSection sectionTitle="SECTION YO 0" isExpanded={true}>
                <div>YO!  -0-a</div>
                <div>YO!  -0-b</div>
                <div>YO!  -0-c</div>
                <div>YO!  -0-d</div>
            </AccordionSection>
            <AccordionSection sectionTitle="SECTION TABLE 1">
                <DevsEditor devsWebApi={api} pubSub={pubSub} />
            </AccordionSection>
            <AccordionSection sectionTitle="SECTION YO 2" isExpanded={true}>
                <div>YO!  -2-a</div>
                <div>YO!  -2-b</div>
            </AccordionSection>
            <AccordionSection sectionTitle="SECTION YO 3">
                <div>YO! -3-a</div>
                <div>YO! -3-b</div>
            </AccordionSection>
        </Accordion>,
        container
    )
}

function renderExampleAccordion(container: Element) {
    ReactDOM.render(
        <Accordion collapseAsAccordion={true}>
            <AccordionSection sectionTitle="SECTION YO 1" isExpanded={true}>
                <div>YO!  -1-a</div>
                <div>YO!  -1-b</div>
                <div>YO!  -1-c</div>
                <div>YO!  -1-d</div>
            </AccordionSection>
            <AccordionSection sectionTitle="SECTION YO 2" isExpanded={true}>
                <div>YO!  -2-a</div>
                <div>YO!  -2-b</div>
            </AccordionSection>
            <AccordionSection sectionTitle="SECTION YO 3">
                <div>YO! -3-a</div>
                <div>YO! -3-b</div>
            </AccordionSection>
        </Accordion>,
        container
    )
}

const Components = {
    renderDevsEditor: function (container: Element, devsWebApi: object, pubSub: object) {
        renderDevsEditor(container, devsWebApi as DevsWebApi, pubSub as PubSub);
    },
    renderExampleAccordion: function (container: Element) {
        renderExampleAccordion(container);
    }
}

export default Components;
