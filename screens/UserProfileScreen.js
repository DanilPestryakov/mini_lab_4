import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ChatListItem from '../components/ChatListItem';
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query, doc, getDocs} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome"



const UserProfileScreen = ({navigation}) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const profile =
    {
    "displayName": "",
    "email": "",
    "photoURL": "",
    }

    if (user !== null) {
    profile["displayName"]= user.displayName;
    profile["email"] = user.email;
    profile["photoURL"] = user.photoURL;
    }

    const [chat_count, setChat_count] = useState();
    const [mess, setMess] = useState();


    let count_messages = 0;

    useEffect(() => {
        //Выводит данные с опозданием
            const q = query(collection(db, "chats"), where("chatName", '!=', ""));
            const m = onSnapshot(q,
            async (querySnaphot) => {
            for (const document of querySnaphot.docs) {
                //подсчёт количества отправленных в чате сообщений
                const p = query(collection(db, "chats", document.id, "messages"), where("displayName", '==', profile["displayName"]))
                const querySnapshots = await getDocs(p);
                count_messages += querySnapshots.size;
            }
            setMess(count_messages);
            setChat_count(querySnaphot.size);
            });
    });

    profile["chat_count"]=chat_count


    // При выходе из учетки возвращаемся на экран Login
    const signOut = () => {
        auth.signOut().then(()=> {
            navigation.replace("Login");
        });
    };

    // Перед отрисовкой UI настраиваем содержимое верхней плашки
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Profile",
            headerStyle : { backgroundColor: "#fff" },
            headerTitleStyle: {color: "black"},
            // Задаем разметку частей слева и справа от заголовка
            headerLeft: () => (
                <View style={{flexDirection: "row",
                justifyContent: "space-between",
                    width: 120,
                    marginLeft: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} activeOpacity={0.5}>
                        <AntDesign name="arrowleft" size={24}  color="black"/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 45,
                }}>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                        <Ionicons name='exit' size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
     <ScrollView style={styles.container}>
     <View style={styles.backContent}>
        <View style={{alignItems: "center",}}>
            <View style= {styles.photoContainer}>
                <Image
                    style={styles.photo}
                    source={{ uri: profile["photoURL"] }}
                />
            </View>
            <Text style={styles.name}> {profile["displayName"]} </Text>
        </View>

        <View style={{flexDirection: "column",}}>

            <View style={styles.contentContainer}>
                <SimpleLineIcons name='envelope' size={24} color="black"/>

                <View style={styles.content_label}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "300"}}>Email</Text>
                    <Text style={styles.content}>{profile["email"]}</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <SimpleLineIcons name='speech' size={24} color="black"/>

                <View style={styles.content_label}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "300"}}>Count of chats</Text>
                    <Text style={styles.content}>{chat_count}</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>

                <Icon name="wechat" type="antdesign" size={24} color="black"/>

                <View style={styles.content_label}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "300"}}>The total number of messages</Text>
                    <Text style={styles.content}>{mess}</Text>
                </View>
            </View>

        </View>

     </View>
     </ScrollView>
  )

};

export default UserProfileScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        backgroundColor: "#03c03c",
    },

    backContent:
    {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        width: "90%",
        height: 460,
        backgroundColor: "#fff",
        borderRadius: 10,
    },

    photoContainer:
    {
        marginTop: 40,
        shadowColor: "black",
        shadowRadius: 15,
        shadowOpacity: 0.4,
    },

    photo:
    {
        width: 136,
        height: 136,
        borderRadius: 68,
    },

    name:
    {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "500"
    },

    contentContainer:
    {
        alignItems: "center",
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginLeft: 20,
    },

    content_label:
    {
        flexDirection: "column",
        marginLeft: 20,
        width: "90%",
    },

    content:
    {
        fontSize: 20,
        fontWeight: "400"
    }


})