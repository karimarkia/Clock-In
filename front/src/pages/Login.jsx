import React, { Component } from 'react';
import { connect } from 'react-redux';
import frontlogo from '../assets/img/front-page-logo.jpg';

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../store/actions/userActions';

class Test extends Component {
  state = {
    msg: '',
    loginCred: {
      email: '',
      password: ''
    },
    signupCred: {
      email: '',
      password: '',
      username: ''
    }
  };

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  signupHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }));
  };

  doLogin = async ev => {
    ev.preventDefault();
    const { email, password } = this.state.loginCred;
    if (!email || !password) {
      return this.setState({ msg: 'Please enter user/password' });
    }
    const userCreds = { email, password };
    this.props.login(userCreds);
    this.setState({ loginCred: { email: '', password: '' } });
  };

  doSignup = async ev => {
    ev.preventDefault();
    const { email, password } = this.state.signupCred;
    if (!email || !password) {
      return this.setState({ msg: 'All inputs are required!' });
    }
    const signupCreds = { email, password };
    this.props.signup(signupCreds);
    this.setState({ signupCred: { email: '', password: '' } });
  };

  removeUser = userId => {
    this.props.removeUser(userId);
  };

  render() {
    
    let loginSection = (
      <form onSubmit={this.doLogin}>
        <input
          type="text"
          name="email"
          value={this.state.loginCred.email}
          onChange={this.loginHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
    );

    const { loggedInUser } = this.props;
    return (
      <div className="ca">
        <img className=" img-100p" src={frontlogo} alt="" />

        <h1>Login</h1>
        <h2>{this.state.msg}</h2>

        {loggedInUser && (
          <div>
            <h2>Welcome: {loggedInUser.email} </h2>
            <button onClick={this.props.logout}>Logout</button>
          </div>
        )}

        <div className="ca h100">

          {!loggedInUser && loginSection}
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    loggedInUser: state.user.loggedInUser,
    isLoading: state.system.isLoading
  };
};
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
