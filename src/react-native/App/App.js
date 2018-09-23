import React from "react";
import { Route } from "react-router-native";
import { Text, AppRegistry } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Icon,
  Tab,
  Tabs,
  Body,
  Card,
  CardItem
} from "native-base";
import { Login, Register } from "../auth-service/auth-service";
import User from "./User/User";
import { ChatLog } from "./ChatLog/ChatLog";
import Crud from "../crud-service/crud-service";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route
          path="/home"
          render={props => {
            return (
              <Card>
                <CardItem>
                  <Body>
                    <Text>home</Text>
                  </Body>
                </CardItem>
              </Card>
            );
          }}
        />
        <Route
          path="/auth/login"
          render={props => {
            return (
              <Login
                onRegister={() => {
                  props.history.push("/auth/register");
                }}
              />
            );
          }}
        />
        <Route path="/auth/register" component={Register} />
        <Route
          path="/"
          render={props => {
            return (
              <Crud modelName="user">
                <User />
              </Crud>
            );
          }}
        />
        <Route
          path="/chat-log"
          render={props => {
            return <ChatLog />;
          }}
        />
      </React.Fragment>
    );
  }
  componentWillReceiveProps(nextProps) {}
}

export const Admin = ({}) => {
  return <p>Admin Page</p>;
};
