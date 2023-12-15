import {StyleSheet, View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {auth, db} from "../firebase";
import {Avatar} from "react-native-elements";
import {doc, getDoc} from "firebase/firestore";

const ProfileScreen = ({ navigation }) =>{
    const [messageStatistic, setMessageStatistic] = useState(0);

    const getUserMessageStatistic = async () => {
        const cityRef = doc(db, 'user-statistics', auth?.currentUser?.email);
        const docSnap = await getDoc(cityRef);

        return docSnap.exists() ? docSnap.data().sentMessages : 0;
    }

    useEffect(() => {
        getUserMessageStatistic().then((r) => {setMessageStatistic(r)});
    }, []);

    return (
        <View style={{height: "100%", justifyContent: "center", alignItems: "center"}}>
            <Avatar size="xlarge"
                    avatarStyle={styles.avatar}
                    source={{ uri: auth?.currentUser?.photoURL }}/>
            <Text style={{fontSize: 30, fontWeight: "600"}}>{auth?.currentUser?.displayName}</Text>
            <Text style={{fontSize: 25}}>{auth?.currentUser?.email}</Text>
            <Text style={{fontSize: 16}}>Отправленно сообщений: {messageStatistic}</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 20,
    },
    name: {
        fontSize: "30px",
        fontWeight: "600"
    },
    email: {
    },
});