import * as React from "react";
import { Collapse } from "../common/collapse/Collapse";

export class CollapseTest extends React.Component<any,any> {
    constructor(props) {
        super(props);

        this.state = { isOpened: true };
    }

    render() {
        return <div>
            <div>
                <label className="label">
                    Opened:
                    <input
                        className="input"
                        type="checkbox"
                        checked={this.state.isOpened}
                        onChange={({ target: { checked } }) => this.setState({ isOpened: checked })} />
                </label>
            </div>
            <Collapse expanded={this.state.isOpened}>
                {this.props.content}
            </Collapse>
        </div>
    }
}