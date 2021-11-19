import * as React from "react";

interface DevDetailsProps {
    details: string;
}

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