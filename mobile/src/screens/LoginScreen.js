import React, { memo, useState } from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../config/theme';
import { emailValidator, passwordValidator } from '../utils/validators';
import { userLogin } from '../actions';
import { API_URL, OAUTH_ROUTE } from '../config/urls';
import { CLIENT_ID, CLIENT_SECRET } from '../config/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ 
    value: '', 
    error: false, 
    error_message: '' 
  });
  const [password, setPassword] = useState({ 
    value: '', 
    error: false, 
    error_message: '' 
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function _onLoginPressed() {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: true, error_message: emailError });
      setPassword({ ...password, error: true, error_message: passwordError });
      return;
    } else {
      setEmail({ ...email, error: false, error_message: '' });
      setPassword({ ...password, error: false, error_message: '' });
    }

    // TODO(iris): change this to LOGIN_ROUTE
    const login_url = API_URL + OAUTH_ROUTE;
    const request = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username: email.value,
        password: password.value,
        scope: '*'
      })
    };

    setLoading(true);
    const res = fetch(login_url, request)
      .then(response => response.json())
      .then(json => {
        if (json.hasOwnProperty('error')) {
          setEmail({ 
            ...email, 
            error: true,
            error_message: 'Incorrect username or password.'
          });
          setPassword({...password, error: true});
        } else {
          dispatch(userLogin(json));
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

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={email.error}
        errorText={email.error_message}
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
        error={password.error}
        errorText={password.error_message}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button 
        mode="contained"
        onPress={_onLoginPressed}
        disabled={loading}
        loading={loading}
      >
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
