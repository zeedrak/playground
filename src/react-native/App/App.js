import React from "react";
import {
  Route,
  NativeRouter as Router,
  Switch,
  Redirect
} from "react-router-native";
import {
  LoginWithAuth,
  RegisterWithAuth,
  authDomainStore,
  authUiStore,
  Crud,
  crudDomainStore,
  Socket,
  socketDomainStore,
  Admin,
  adminDomainStore,
  Media,
  mediaDomainStore
} from "./react+react-native";
import MainWrapper from "./Wrappers/MainWrapper";
import User from "./User/User";
import Login from "./Login/MaterialLogin";
import Register from "./Register/MaterialRegister";
import AdminPage from "./Admin/Admin";
import Home from "./Home/Home";
import Chat from "./Chat/Chat";
import Settings from "./Settings/Settings";
import Store from "./Store/Store";
import { observer } from "mobx-react";
import LoginWrapper from "./Wrappers/LoginWrapper";
import loginBG from "./Login/login-bg.jpg";
import registerBG from "./Register/register-bg.jpg";
import logo from "./Assets/logos/Markab@full.svg";
import {
  Drawer,
  H1,
  H2,
  H3,
  Text,
  Header,
  List,
  ListItem,
  Container,
  Title,
  Button,
  Left,
  Content,
  Right,
  Body,
  Icon,
  Tab,
  Tabs,
  Footer,
  FooterTab
} from "native-base";

let rootStore = new Store({
  authDomainStore,
  authUiStore,
  crudDomainStore,
  socketDomainStore,
  adminDomainStore,
  mediaDomainStore
});

export default class App extends React.Component {
  state = {
    isLoggedIn: true,
    currentUser: {}
  };
  componentWillReceiveProps(nextProps) {}
  componentDidMount(props) {
    rootStore.authDomainStore.isAuthenticated().then(res => {
      if (res.status !== 200) {
        this.setState({ isLoggedIn: false });
      } else {
        this.setState({ isLoggedIn: true, currentUser: res.data });
      }
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/auth/login"
            render={({ location, history, match }) => {
              return (
                <LoginWrapper title="Login" backgroundImage={loginBG}>
                  <LoginWithAuth
                    onRegister={() => history.push("/auth/register")}
                    authUiStore={rootStore.authUiStore}
                    authDomainStore={rootStore.authDomainStore}
                  >
                    <Login
                      location={location}
                      history={history}
                      match={match}
                    />
                  </LoginWithAuth>
                </LoginWrapper>
              );
            }}
          />
          <Route
            path="/auth/register"
            render={props => {
              return (
                <LoginWrapper title="Login" backgroundImage={registerBG}>
                  <RegisterWithAuth
                    authDomainStore={rootStore.authDomainStore}
                    authUiStore={rootStore.authUiStore}
                  >
                    <Register />
                  </RegisterWithAuth>
                </LoginWrapper>
              );
            }}
          />
          <Route
            path="/"
            exact
            render={({ location, history, match }) => {
              return (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                  auth={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  logo={logo}
                >
                  <Home />
                </MainWrapper>
              );
            }}
          />
          <Route
            path="/admin"
            render={({ location, history, match }) =>
              this.state.isLoggedIn ? (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                  auth={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  logo={logo}
                  hasPadding={true}
                >
                  <Admin adminDomainStore={rootStore.adminDomainStore}>
                    <AdminPage
                      crudDomainStore={rootStore.crudDomainStore}
                      location={location}
                      match={match}
                      history={history}
                    />
                  </Admin>
                </MainWrapper>
              ) : (
                <Redirect
                  to={{
                    pathname:
                      "/auth/login?message='please login to view this page'",
                    state: { from: location }
                  }}
                />
              )
            }
          />
          <Route
            path="/chat"
            exact
            render={({ location, history, match }) =>
              this.state.isLoggedIn ? (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                  auth={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  logo={logo}
                  hasPadding={true}
                >
                  <Crud
                    modelName="chat-log"
                    crudDomainStore={rootStore.crudDomainStore}
                  >
                    <Socket
                      channel="chat"
                      socketDomainStore={rootStore.socketDomainStore}
                    >
                      <Chat />
                    </Socket>
                  </Crud>
                </MainWrapper>
              ) : (
                <Redirect
                  to={{
                    pathname:
                      "/auth/login?message='please login to view this page'",
                    state: { from: location }
                  }}
                />
              )
            }
          />
          <Route
            path="/settings"
            exact
            render={({ location, history, match }) =>
              this.state.isLoggedIn ? (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                  auth={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  logo={logo}
                  hasPadding={true}
                >
                  <Crud
                    modelName="settings"
                    crudDomainStore={rootStore.crudDomainStore}
                  >
                    <Media>
                      <Settings />
                    </Media>
                  </Crud>
                </MainWrapper>
              ) : (
                <Redirect
                  to={{
                    pathname:
                      "/auth/login?message='please login to view this page'",
                    state: { from: location }
                  }}
                />
              )
            }
          />
          <Route
            path="/user"
            render={({ location, match, history }) => {
              return (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                  auth={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  logo={logo}
                  hasPadding={true}
                >
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
          <Route
            path="*"
            render={({ location, match, history }) => {
              return (
                <MainWrapper
                  location={location}
                  match={match}
                  history={history}
                  auth={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  logo={logo}
                  hasPadding={true}
                >
                  <Text>Not found</Text>
                </MainWrapper>
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
  componentWillReceiveProps(nextProps) {}
}
