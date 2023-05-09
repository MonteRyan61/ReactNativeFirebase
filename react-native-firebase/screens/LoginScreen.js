import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

import {auth} from '../firebase_setup/firebase.js'
import {signInWithEmailAndPassword} from '@firebase/auth'

import {getDoc, doc} from "firebase/firestore"; 
import { firestore } from "../firebase_setup/firebase.js"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    //Eliminate existing state when reloaded
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
    });
    return unsubscribe;
  }, [navigation]);

  const handleLoginClick = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then(cred => {
        // Getting the users user name and details for the home page from DB
        var username;
        const db = firestore;
        const docRef = doc(db, cred.user.uid, "UserDetails");
            getDoc(docRef).then(docSnap => {
            username = docSnap.data().name
            // Calling the page change after the user is signed in and their name has been retrieved from the DB
            navigation.navigate('Home', { username: username });
            });
      })
    } catch (e) {
      console.error('Sign In Error', e);
    }
  };

  const handleRegisterClick = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Sign In</Text>
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
      <Button title="Log In" onPress={handleLoginClick} />
      <Text style={styles.text}>Don't have an account?</Text>
      <Button title="Register" onPress={handleRegisterClick} />
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

export default LoginScreen;