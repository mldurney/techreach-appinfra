import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { userLogout } from '../actions';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();

  function _onLoginPressed() {
    dispatch(userLogout());
    navigation.navigate('HomeScreen');
  }

  return (
    <Background>
      <Logo />
      <Header>Logged in!</Header>
      <Paragraph>
        Add information about the current user etc etc.
      </Paragraph>
      <Button mode="outlined" onPress={_onLoginPressed}>
        Logout
      </Button>
    </Background>
  );
}

export default memo(Dashboard);
