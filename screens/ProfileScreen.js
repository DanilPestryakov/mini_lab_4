import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import React, { useState } from 'react';
import {StatusBar} from "expo-status-bar";
import { Avatar } from 'react-native-elements';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { deafultPicURL } from '../utils';

const ProfileScreen = ({ navigation }) => {
    const user = auth.currentUser;


  return (
    <View style={styles.container}>
        <Avatar rounded size={64} source={{ uri: user.photoURL }}/>
        <Text h3 style={{ marginBottom: 50 }}> {user.displayName} </Text>
        <Text h3 style={{ marginBottom: 50 }}> {user.email} </Text>

    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300
    }
});