import * as React from "react";
import { DevDetailsProps } from "./props";

export class DevDetails extends React.Component<DevDetailsProps> {
    constructor(props: DevDetailsProps) {
        super(props)
    }

    render() {
        return <div>
            <div className="h4" style={{ display: "inline" }}>Dev Details:</div>{" "}
            <div style={{ display: "inline" }}>{this.props.details}</div>
        </div>
    }
}