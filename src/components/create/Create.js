import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import { withRouter } from 'react-router-dom';
import './Create.css';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            gender: '',
            month: '',
            day: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // keep updating the state as the user types
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    // once submit is hit, call api to create contact and return home
    handleSubmit(event) {
        this.props.createContact(this.state);
        this.props.history.push("/");
        event.preventDefault();
    }

    render() {
        return (
            <div className="Detail">
                <h1 className="Detail-heading">
                </h1>
                <div className="Detail-container">
                    <form className="Create-form" onSubmit={this.handleSubmit}>
                        <label className="Input-label">
                            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter name" />
                        </label>
                        <label className="Input-label">
                            <input name="gender" type="text" value={this.state.gender} onChange={this.handleChange} placeholder="Enter gender" />
                        </label>
                        <label className="Input-label">
                            <input name="month" type="text" value={this.state.month} onChange={this.handleChange} placeholder="Enter birth-month (must be integer)" />
                        </label>
                        <label className="Input-label">
                            <input name="day" type="text" value={this.state.day} onChange={this.handleChange} placeholder="Enter birth-day (must be integer)" />
                        </label>
                        <input className="Submit-btn" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, actions)(Create));
