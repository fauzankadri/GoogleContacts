import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import Display from './list/Display';
import { GoogleLogin } from 'react-google-login';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allContacts: props.allContacts.contactsArr,
      loggedIn: props.allContacts.loggedIn,
      refresh: props.allContacts.refresh,
      nextPage: '',
      asc: false,
      ranks: props.allContacts.ranks,
    };

    this.responseGoogle = this.responseGoogle.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.filterName = this.filterName.bind(this);
    this.filterGender = this.filterGender.bind(this);
    this.filterBirthday = this.filterBirthday.bind(this);
  }

  // called when login is success
  responseGoogle(response) {
    this.setState({ loggedIn: true }); // make it known that login is success
    this.props.getContacts(); // dispatch to get contacts
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.allContacts.contactArr !== nextProps.allContacts.contactsArr) {
      this.setState({ allContacts: nextProps.allContacts.contactsArr });
      this.setState({ nextPage: nextProps.allContacts.nextPage })
      this.setState({ refresh: nextProps.allContacts.refresh });
      this.setState({ranks: nextProps.allContacts.ranks})
      // set a timeout to let states be up to date: this is not a good way to do it
      // then check if we need to refresh our contact list
      setTimeout(() => {
        if (this.state.refresh) {
          this.props.getContacts();
          this.setState({ranks: -19});
        }
      }, 500);
    }
  }

  // fetch the next batch of contacts
  handlePaginationClick() {
    const { nextPage } = this.state;
    this.props.getContacts(nextPage);
  }
  // filter by name
  filterName() {
    const { allContacts, asc } = this.state;

    allContacts.sort((a, b) => {
      if (a.names[0].displayName < b.names[0].displayName) return -1;
      if (a.names[0].displayName > b.names[0].displayName) return 1;
      return 0;
    })

    if (!asc) {
      allContacts.reverse();
    }

    this.setState({ asc: !asc });
    this.setState({ allContacts: allContacts });
  }

  // filter by gender
  filterGender() {
    const { allContacts, asc } = this.state;

    allContacts.sort((a, b) => {
      if (a.genders[0].formattedValue < b.genders[0].formattedValue) return -1;
      if (a.genders[0].formattedValue > b.genders[0].formattedValue) return 1;
      return 0;
    })

    if (!asc) {
      allContacts.reverse();
    }

    this.setState({ asc: !asc });
    this.setState({ allContacts: allContacts });
  }

  // filter by birthday
  filterBirthday() {
    const { allContacts, asc } = this.state;
    allContacts.sort((a, b) => {
      if ((a.birthdays[0].date.month + "." + a.birthdays[0].date.day) < (b.birthdays[0].date.month + "." + b.birthdays[0].date.day)) return -1;
      if ((a.birthdays[0].date.month + "." + a.birthdays[0].date.day) > (b.birthdays[0].date.month + "." + b.birthdays[0].date.day)) return 1;
      return 0;
    })
    if (!asc) {
      allContacts.reverse();
    }

    this.setState({ asc: !asc });
    this.setState({ allContacts: allContacts });

  }

  render() {
    const { allContacts, loggedIn, asc, ranks } = this.state;
    const { history } = this.props;
    // if not logged in, show login button
    if (!loggedIn) {
      return (
        <div className="Login-container">
          <div className="Flex-item">
            <GoogleLogin
              clientId="632142996891-5mj0hkah17dkdhad9dokie496p27iek1.apps.googleusercontent.com"
              buttonText="Login"
              scope="https://www.googleapis.com/auth/contacts"
              onSuccess={this.responseGoogle}
              onFailure={() => { console.log("login failed. check clientId token") }}
            />
          </div>
        </div>
      );

    }
    // in all other cases, ie. logged in, start the real app
    return (
      <div>
        <div className="Functions">
          <button className="btn" onClick={this.handlePaginationClick}>Next</button>
          <button className="btn" onClick={this.filterName}>Filter By Name</button>
          <button className="btn" onClick={this.filterGender}>Filter By Gender</button>
          <button className="btn" onClick={this.filterBirthday}>Filter By Birthday</button>
          <button className="btn" onClick={() => history.push('/create/')} >Create Contact</button>
        </div>
        <Display allContacts={allContacts} ranks={ranks} />
      </div>
    );

  }
}

const mapStateToProps = state => {
  return {
    allContacts: state.allContacts,
    nextPage: state.nextPage,
    loggedIn: state.loggedIn,
    refresh: state.refresh,
    ranks: state.ranks,
  };
};

export default connect(mapStateToProps, actions)(App);
