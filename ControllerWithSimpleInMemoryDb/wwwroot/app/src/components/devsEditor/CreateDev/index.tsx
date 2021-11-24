import * as React from "react";
import { CreateDevState } from "./state";
import { CreateDevProps } from "./props";

export class CreateDev extends React.Component<CreateDevProps, CreateDevState> {
    constructor(props: CreateDevProps) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.clearDevNameFieldsOnSaveSuccessCallback = this.clearDevNameFieldsOnSaveSuccessCallback.bind(this);
        this.handleDevFirstNameChange = this.handleDevFirstNameChange.bind(this);
        this.handleDevLastNameChange = this.handleDevLastNameChange.bind(this);

        this.state = {
            firstName: "",
            lastName: ""
        }
    }

    getNextId() {
        return this.props.nextIdIsKnown ? this.props.nextId.toString() : "";
    }

    handleSave() {
        this.props.save(this.state.firstName, this.state.lastName, this.clearDevNameFieldsOnSaveSuccessCallback);
    }

    clearDevNameFieldsOnSaveSuccessCallback() {
        this.setState({ firstName: "", lastName: "" });
    }

    handleDevFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }

    handleDevLastNameChange(event) {
        this.setState({ lastName: event.target.value });
    }

    render() {
        return <div>
            <div>
                <input id="reactNewDevId" type="number" readOnly={true} value={this.getNextId()} />
                {" "}
                <label htmlFor="reactNewDevId">Next Id</label>
            </div>
            <div>
                <input id="reactNewDevFirstName" type="text" value={this.state.firstName} onChange={this.handleDevFirstNameChange} />
                {" "}
                <label htmlFor="reactNewDevFirstName">First Name</label>
            </div>
            <div>
                <input id="reactNewDevLastName" type="text" value={this.state.lastName} onChange={this.handleDevLastNameChange} />
                {" "}
                <label htmlFor="reactNewDevLastName">Last Name</label>
            </div>
            <button onClick={this.handleSave}>Save Dev</button>
        </div>
    }
}