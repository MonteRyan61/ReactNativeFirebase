import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

import {auth} from '../firebase_setup/firebase.js'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@firebase/auth'

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleRegisterClick = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(cred => {
        console.log(cred.user)
        console.log(cred.user.uid)
        console.log("Logged in")
        console.log('Registered');
        //Create a doc in the DB for the user and their details
        setDoc(doc(firestore, cred.user.uid, "UserDetails"), {
          email: email,
          name: userName,
        });
        navigation.navigate('Home', { username: userName });
        })
    } catch (e) {
      console.error('Registration Error', e);
    }
  };

  const handleLoginClick = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Create an account, </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Register" onPress={handleRegisterClick} />
      <Text style={styles.text}>Already have an account?</Text>
      <Button title="Login" onPress={handleLoginClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default RegisterScreen;