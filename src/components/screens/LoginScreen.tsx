import { useNavigation } from '@react-navigation/native';
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ConnectedProps, connect } from 'react-redux';

import { config } from '../../common/config';
import { login } from '../../redux/modules/auth';
import { FormErrors, FormField, WobblyText } from '../atoms';
import WobblyButton, { Intent } from '../atoms/WobblyButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeHeading: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

const mapDispatch = {
  login,
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export interface LoginFormFields {
  domain: string;
  email: string;
  password: string;
}

const LoginScreen: React.FC<PropsFromRedux> = ({ login }) => {
  const handleSubmit = (values: LoginFormFields) => {
    login(values.domain, values.email, values.password);
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <WobblyText title2={true} style={styles.welcomeHeading}>
        Login
      </WobblyText>
      <Formik
        initialValues={{ domain: config.backendUrl, email: '', password: '' }}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {(formikBag: FormikProps<LoginFormFields>) => (
          <View>
            <FormErrors errors={Object.values(formikBag.errors)} />
            <FormField
              autoCapitalize="none"
              onChangeText={formikBag.handleChange('domain')}
              value={formikBag.values.domain}
              placeholder="Domain"
            />
            <FormField
              autoCapitalize="none"
              onChangeText={formikBag.handleChange('email')}
              value={formikBag.values.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            <FormField
              autoCapitalize="none"
              onChangeText={formikBag.handleChange('password')}
              value={formikBag.values.password}
              secureTextEntry={true}
              placeholder="Password"
            />
            <WobblyButton
              text="Log in"
              isLoading={false}
              intent={Intent.PRIMARY}
              onPress={formikBag.handleSubmit}
              disabled={false}
            />
          </View>
        )}
      </Formik>
      <WobblyButton
        onPress={() => navigation.navigate('Signup')}
        text="Sign up"
      />
    </SafeAreaView>
  );
};

export default connector(LoginScreen);
