import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { EditableTable } from ".";

describe("EditableTable", () => {
    it("should render empty", () => {
        const devs = [];

        const table = ReactTestRenderer.create(
            <EditableTable
                devs={devs}
                view={() => { }}
                edit={() => { }}
                delete={() => { }}
            />);

        expect(table).toMatchSnapshot();
    });

    it("should render with 1 dev", () => {
        const devs = [
            { id: 1, firstName: "first1", lastName: "last1" }
        ];

        const table = ReactTestRenderer.create(
            <EditableTable
                devs={devs}
                view={() => { }}
                edit={() => { }}
                delete={() => { }}
            />);

        expect(table).toMatchSnapshot();
    });

    it("should render with 2 devs", () => {
        const devs = [
            { id: 1, firstName: "first1", lastName: "last1" },
            { id: 2, firstName: "first2", lastName: "last2" }
        ];

        const table = ReactTestRenderer.create(
            <EditableTable
                devs={devs}
                view={() => { }}
                edit={() => { }}
                delete={() => { }}
            />);

        expect(table).toMatchSnapshot();
    });

    it("should render with 3 devs", () => {
        const devs = [
            { id: 1, firstName: "first1", lastName: "last1" },
            { id: 2, firstName: "first2", lastName: "last2" },
            { id: 3, firstName: "first3", lastName: "last3" }
        ];

        const table = ReactTestRenderer.create(
            <EditableTable
                devs={devs}
                view={() => { }}
                edit={() => { }}
                delete={() => { }}
            />);

        expect(table).toMatchSnapshot();
    });
});