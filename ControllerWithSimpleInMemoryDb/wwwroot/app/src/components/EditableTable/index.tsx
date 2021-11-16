import * as React from "react";

export class EditableTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>testId</td>
                        <td>testName</td>
                        <td>testActions</td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
}
