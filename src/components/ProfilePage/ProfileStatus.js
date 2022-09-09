import { Component } from "react";

export class ProfileStatus extends Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    activateEdit = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEdit = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }


    render() {
        return (
            <div>
                {this.state.editMode ?
                 <input autoFocus={true} onChange={this.onStatusChange} onBlur={this.deactivateEdit} value={this.state.status} /> 
                :  <span onClick={this.activateEdit}>{this.props.status||'-----'}</span>
                }
            </div>

        )
    }
}