import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image
} from 'react-native';
import { Button, Text } from 'react-native-elements'
import { withFormik } from 'formik';
import * as yup from 'yup';

const AuthForm = (props) => {

  displayNameInput = (
    <View>
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('displayName', text)}
        placeholder='Nome'
      />
      <Text style={styles.validationText}>{props.errors.nome}</Text>
    </View>
  )
 var displayImg=(
<Image source={require('./images/a.jpg')}
      style={{
        width:200,
        height:250,
        marginBottom:15
      }}/>
    )


  return (
    <View style={styles.container}>
  
      

      {props.authMode === 'signup' ? displayNameInput : null}
      {props.authMode === 'login' ? displayImg: null}
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('email', text)}
        placeholder='Email'
      />
      <Text style={styles.validationText}> {props.errors.email}</Text>
      <TextInput
        style={styles.formInput}
        secureTextEntry={true}
        onChangeText={text => props.setFieldValue('password', text)}
        placeholder='Senha'
      />
      <Text style={styles.validationText}> {props.errors.password}</Text>
      <Button
        onPress={() => props.handleSubmit()}
        buttonStyle={styles.loginButton}
        title={props.authMode === 'login' ? 'Login' : 'Criar Cardápio'} />
      <Button
        backgroundColor='transparent'
        color='black'
        buttonStyle={styles.switchButton}
        onPress={() => props.switchAuthMode()}
        title={props.authMode === 'login' ? 'Cadastre-se' : 'Voltar para Login'} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 60
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validationText: {
    marginTop: 8,
    marginBottom: 16,
    color: 'red',
    alignSelf: 'center'
  },
  formInput: {
    width: 300,
    height: 50,
    borderColor: '#104D04',
    borderWidth: 1,
    marginBottom: 10,
    padding: 15,
    borderRadius:25,
    alignItems:'center'
  },
  loginButton: {
    width: 200,
    marginBottom: 16,
    backgroundColor: '#22890D',
  },
  switchButton: {
    width: 200,
    backgroundColor: '#104D04'
  }
});

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '', displayName: '' }),
  validationSchema: (props) => yup.object().shape({
    email: yup.string("").email().required("O e-mail não pode ficar em branco!"),
    password: yup.string().required("É necessátio inserir a senha"),
    displayName: props.authMode === 'signup' ?
      yup.string().required("Você deve inserir seu nome de usuario") : null
  }),
  handleSubmit: (values, { props }) => {
    props.authMode === 'login' ? props.login(values) : props.signup(values)
  },
})(AuthForm);