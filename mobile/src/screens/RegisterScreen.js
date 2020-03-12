import React, { memo, useState } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../config/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../utils/validators';
import { userLogin } from '../actions';
import { API_URL, REGISTER_ROUTE } from '../config/urls';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [pwConfirm, setPwConfirm] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function _onSignUpPressed() {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const passwordLengthError = 
      (password.value.length < 8) ? 'Password must be at least 8 characters.' : '';
    const pwConfirmError = 
      (pwConfirm.value === password.value) ? '' : 'Passwords do not match.';

    if (emailError || passwordError || passwordLengthError || pwConfirmError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordLengthError ?? passwordError });
      setPwConfirm({ ...pwConfirm, error: pwConfirmError });
      return;
    }

    const registerUrl = API_URL + REGISTER_ROUTE;
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: pwConfirm.value
      })
    };

    setLoading(true);
    const res = fetch(registerUrl, request)
      .then(response => response.json())
      .then(json => {
        if (!json.success && json.data.hasOwnProperty('email')) {
          setEmail({ 
            ...email, 
            error: json.data.email[0]
          });
        } else {
          dispatch(userLogin(json.data));
          navigation.navigate('Dashboard');
        }
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert(
          'Network error',
          'Please check your internet connection and try again.',
          [{text: 'OK'}],
          { cancelable: false }
        );
        setLoading(false);
      });
  }

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="Confirm password"
        returnKeyType="done"
        value={pwConfirm.value}
        onChangeText={text => setPwConfirm({ value: text, error: '' })}
        error={!!pwConfirm.error}
        errorText={pwConfirm.error}
        secureTextEntry
      />

      <Button 
        mode="contained"
        onPress={_onSignUpPressed}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
