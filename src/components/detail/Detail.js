import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import { withRouter } from 'react-router-dom';
import './Detail.css';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceName: '',
      detailContact: props.detailContact.contactArr[0],
      loggedIn: props.detailContact.loggedIn,
      click: 0,
      delText: "Delete",
      message: "Unauthorized"
    };
    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const resourceName = 'people/' + this.props.match.params.resourceName; // history was pushed, get the params and store it
    this.setState({ resourceName: resourceName });
    this.fetchContact(resourceName);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.detailContact !== nextProps.detailContact.contactArr[0]) {
      const resourceName = nextProps.match.params.resourceName;
      this.setState({message: "Loading"});
      this.setState({ detailContact: nextProps.detailContact.contactArr[0] });
      this.setState({ loggedIn: nextProps.detailContact.loggedIn });
    }
  }

  fetchContact(resourceName) {
    this.props.getContact(resourceName); // get a single contact using just resourceName
  }

  handleDelete() {
    const { resourceName } = this.state;
    const { history } = this.props;

    this.props.deleteContact(resourceName); // call delete api
    history.push("/"); // return home
  }

  confirmDelete() {
    const { click, delText } = this.state;
    if (click === 0) {
      this.setState({ click: 1, delText: "Are you sure?" }) // first click, asking for confirmation
    }
    else if (click === 1) {
      this.setState({ click: 0, delText: "Delete" }) // second click, delete is handled
      this.handleDelete();
    }

  }

  render() {
    const { detailContact, loggedIn, delText, message } = this.state;
    if (!loggedIn) {
      return (
        <h1>{message}</h1>
      );
    }
    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {detailContact.name}
        </h1>

        <div className="Detail-container">
          <div className="Detail-item">
            Email <span className="Detail-value">{detailContact.email}</span>
          </div>
          <div className="Detail-item">
            Phone <span className="Detail-value">{detailContact.phone}</span>
          </div>
          <div className="Detail-item">
            Gender
            <span className="Detail-value">{detailContact.gender}</span>
          </div>
          <div className="Detail-item">
            Birthday
            <span className="Detail-value">{detailContact.birthday}</span>
          </div>
          <button className="Delete" onClick={this.confirmDelete}>{delText}</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    detailContact: state.detailContact,
    loggedIn: state.loggedIn
  };
};

export default withRouter(connect(mapStateToProps, actions)(Detail));
