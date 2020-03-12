import React, { memo, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { userLogout } from "../actions";
import { API_URL, LOGOUT_ROUTE } from "../config/urls";

const Dashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // this is a hack. for some reason, using plain useSelector doesn't work?
  const authReducer = JSON.parse(
    JSON.stringify(useSelector(state => state.authReducer))
  );
  // const authReducer = useSelector(state => state.authReducer);

  async function _onLoginPressed() {
    // console.log(currentUser.current_user);
    if (!authReducer || !authReducer.current_user) {
      // Not logged in
      Alert.alert(
        "Error",
        "No user is currently logged in.",
        [{ text: "OK" }],
        { cancelable: false }
      );

      return;
    }

    const currentUser = authReducer.current_user;
    const logoutUrl = API_URL + LOGOUT_ROUTE;
    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: currentUser.token_type + currentUser.access_token
      }
    };

    setLoading(true);
    const res = fetch(logoutUrl, request)
      .then(response => response.json())
      .then(json => {
        setLoading(false);

        if (json.hasOwnProperty("error")) {
          Alert.alert(
            "Error",
            "Server error. Please try again after waiting for a short time.",
            [{ text: "OK" }],
            { cancelable: false }
          );
        } else {
          dispatch(userLogout());
          navigation.navigate("HomeScreen");
        }
      })
      .catch(error => {
        Alert.alert(
          "Network error",
          "Please check your internet connection and try again.",
          [{ text: "OK" }],
          { cancelable: false }
        );
        setLoading(false);
      });
  }

  return (
    <Background>
      <Logo />
      <Header>Logged in!</Header>
      <Paragraph>Add information about the current user etc etc.</Paragraph>
      <Button
        mode="outlined"
        onPress={_onLoginPressed}
        disabled={loading}
        loading={loading}
      >
        Logout
      </Button>
    </Background>
  );
};

export default memo(Dashboard);