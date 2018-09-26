import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import {
  LoginWithAuth,
  RegisterWithAuth,
  PrivateRoute,
  authDomainStore,
  authUiStore,
  Crud,
  crudDomainStore
} from "../../react+react-native";
import MainWrapper from "./Wrappers/MainWrapper";
import User from "./User/User";
import Login from "./Login/MaterialLogin";
import Register from "./Register/MaterialRegister";
import Store from "./Store/Store";

let rootStore = new Store({
  authDomainStore,
  authUiStore,
  crudDomainStore
});

class App extends React.Component {
  componentDidMount(props) {}
  render() {
    return (
      <Router>
        <div>
          <Route
            path="/auth/login"
            render={props => {
              return (
                <LoginWithAuth
                  onRegister={() => props.history.push("/auth/register")}
                  authUiStore={rootStore.authUiStore}
                  authDomainStore={rootStore.authDomainStore}
                >
                  <Login />
                </LoginWithAuth>
              );
            }}
          />
          <Route
            path="/auth/register"
            render={props => {
              return (
                <RegisterWithAuth
                  authDomainStore={rootStore.authDomainStore}
                  authUiStore={rootStore.authUiStore}
                >
                  <Register />
                </RegisterWithAuth>
              );
            }}
          />
          <PrivateRoute
            path="/admin"
            render={props => {
              return (
                <MainWrapper>
                  <Admin />
                </MainWrapper>
              );
            }}
            authDomainStore={rootStore.authDomainStore}
          />
          <Route
            path="/user"
            render={({ location, match, history }) => {
              return (
                <MainWrapper>
                  <Crud
                    modelName="user"
                    crudDomainStore={rootStore.crudDomainStore}
                  >
                    <User location={location} match={match} history={history} />
                  </Crud>
                </MainWrapper>
              );
            }}
          />
        </div>
      </Router>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export const Admin = ({}) => {
  return <p>Admin Page</p>;
};

ReactDOM.render(<App />, document.getElementById("app"));
