import React, { memo, useState } from 'react';
import { Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { emailValidator } from '../utils/validators';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../config/theme';
import Button from '../components/Button';
import { API_URL, FORGOT_ROUTE } from '../config/urls';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function _onSendPressed() {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    const forgotUrl = API_URL + FORGOT_ROUTE;
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email.value
      })
    };

    setLoading(true);
    const res = fetch(forgotUrl, request)
      .then(response => response.json())
      .then(json => {
        switch(json.data) {
          case 'passwords.throttled':
            Alert.alert(
              'Too many requests',
              'Please try again after waiting for a short time.',
              [{text: 'OK'}],
              { cancelable: false }
            );
            break;

          case 'passwords.user':
            setEmail({ ...email, error: 'No account exists with this email.' });
            break;

          default:
            Alert.alert(
              'Reset link sent!',
              'Please check your inbox for a password reset link.',
              [{text: 'OK'}],
              { cancelable: false }
            );
            navigation.navigate('LoginScreen');
        }        
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button 
        mode="contained"
        onPress={_onSendPressed}
        style={styles.button}
        disabled={loading}
        loading={loading}
      >
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
