import * as React from "react";
import { EditableTable } from "../EditableTable";

export class DevsEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <div className="h2" style={{ display: "inline" }}>
                React{" "}
            </div>
            <a className="btn btn-primary" style={{ display: "inline" }}>
                Refresh
            </a>
            <p></p>
            <div>
                <label>
                    <input name="id" id="reactNewDevId" type="number" readOnly={true} value={5} />
                    {" "}Next Id
                </label>
            </div>
            <div>
                <label>
                    <input name="name" id="reactNewDevName" type="text" />
                    {" "}Name
                </label>
            </div>
            <button>Save Dev</button>

            <EditableTable />

            <p></p>
            <div>
                <div className="h4" style={{ display: "inline" }}>Dev Details:</div>
                <div style={{ display: "inline" }}></div>
            </div>
            <div>
                <div className="h4" style={{ display: "inline" }}>Ajax Result:</div>
                <div style={{ display: "inline" }}></div>
            </div>
        </div>
    }
}