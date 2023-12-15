import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {Avatar, Image} from "react-native-elements";
import {auth} from "../firebase";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Avatar rounded
                    size= "xlarge"
                    source={{ uri: auth?.currentUser?.photoURL}}>
            </Avatar>
            <View style={styles.data}>
                <View style={{marginLeft: 10}}>
                    <Text style={styles.name}>
                        <Text style={{fontWeight: "bold", fontSize: 35}}>Name: </Text>
                        { auth?.currentUser?.displayName }
                    </Text>
                    <Text style={styles.email}>
                        <Text style={{fontWeight: "bold", fontSize: 35, fontStyle: "normal"}}>Email: </Text>
                        { auth?.currentUser?.email }
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    name: {
       fontSize: 30,
    },
    email: {
       fontSize: 30,
    },
    data: {
        marginTop: 30,
        marginLeft: 50,
    },
    container: {
        marginTop: 20,
        marginLeft: 20,
        alignItems: "flex-start",
        justifyContent: "left",
        height: "100%",
        flexDirection: "row",
    },
});