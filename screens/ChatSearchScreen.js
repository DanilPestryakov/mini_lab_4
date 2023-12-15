import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Input } from 'react-native-elements';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ChatListItem from '../components/ChatListItem';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import {collection, onSnapshot, query, where } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChatSearchScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState('');

        useLayoutEffect(() => {
        navigation.setOptions({
            title: "Search a Chat",
            // Только iOS
            headerBackTitle: "Chats",

        })
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }
    useEffect(() => {
        const q = query(collection(db, "chats"), where("chatName", '!=', ""));
        return onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
                if (doc.data().chatName.toLowerCase().includes(input.toLowerCase()))
                    chats.push({
                        id: doc.id,
                        data: doc.data()
                    });
            });
            setChats(chats);
        });
    }, [input])

    return (
        <SafeAreaView>
            <Input placeholder='Enter a chat name'
                   value={input}
                   onChangeText={(text) => setInput(text)}
                   leftIcon={ <MaterialCommunityIcons name='text-box-search-outline' size={30} color="black"/> }
                   style={styles.input}
            />
            <ScrollView style={styles.container}>
                {chats.map( ({id, data: { chatName }}) => (
                    <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
};

export default ChatSearchScreen

const styles = StyleSheet.create({
    input: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: "flex-end",
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
        maxWidth: "100%",
        position: "relative",
    },
    container: {
        height: "100%",
    }
})