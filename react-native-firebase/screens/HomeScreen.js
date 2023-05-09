import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

import handleLogout from '../firebase_functions/firebase_logout.js';

const  HomeScreen = ({ navigation, route }) => {

  const handleLogoutClick = () => {
    handleLogout();
    navigation.navigate('Login');
  };

  const { username } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      <Button title="Log Out" onPress={handleLogoutClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#007aff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;