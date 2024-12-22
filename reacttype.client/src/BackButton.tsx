import { Component } from "react";

export class BackButton extends Component {
    static contextTypes = {
        router: () => true, // replace with PropTypes.object if you use them
    }

    render() {
        return (
            <button
                onClick={this.context.router.history.goBack}>
                Back
            </button>
        )
    }
}