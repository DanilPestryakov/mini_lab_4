import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { auth } from "../firebase";

const UserProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Avatar rounded
                size={250}
                source={{ uri: auth?.currentUser?.photoURL }}> </Avatar>
            <View style={styles.info}>
                <Text style={styles.name}>
                    {auth?.currentUser?.displayName}
                </Text>
                <Text style={styles.email}>
                    Email:
                    <Text style={{ fontWeight: "bold" }}>
                        {auth?.currentUser?.email}
                    </Text>
                </Text>
                <Text>Additional info...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    name: {
        fontSize: "3em",
    },
    email: {
        fontStyle: "italic",
        fontSize: "1.5em",
    },
    container: {
        backgroundColor: "#d6f5ce",
        padding: "20px",
        borderRadius: "10px",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
        minWidth: "500px",
        alignItems: "flex-start",
        justifyContent: "left",
        height: "100%",
        flexDirection: "row",
    },
    info: {
        paddingLeft: "20px",
    }
});

export default UserProfileScreen;