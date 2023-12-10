import {StyleSheet, View, Text, Image} from "react-native";
import React, {useLayoutEffect} from "react";
import {auth} from "../firebase";

const ProfileScreen = ({ navigation }) =>{
    return (
        <View style={styles.container}>
            <Image source={{
                uri: auth?.currentUser?.photoURL
            }} style={styles.photo}></Image>
            <Text style={styles.name}>{auth?.currentUser?.displayName}</Text>
            <Text style={styles.email}>{auth?.currentUser?.email}</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#666',
    }
})
