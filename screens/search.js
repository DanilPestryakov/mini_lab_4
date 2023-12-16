import {SafeAreaView, ScrollView,  StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import ChatListItem from '../components/ChatListItem';

const SearchScreen = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [chats, setChats] = useState([]);

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
        const q = query(collection(db, "chats"), where("chatName", '>=', input), where("chatName", '<=', input + '\uf8ff'));
        //where("chatName", '>=', input), where("chatName", '<=', input + '\uf8ff')) -замена поиску с помощью Like
        //'\uf8ff' - это последний символ Unicode. Все другие символы расположены до него.
        const unsubscribe = onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
                if (doc.data().chatName.toLowerCase().includes(input.toLowerCase()))
                chats.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            console.log(chats);
            setChats(chats);
        });
    },[input]);

    return (
        <View style={styles.container}>
            <Input placeholder='Enter a chat name' value={input}
                   onChangeText={(text) => setInput(text)}
                   value={input}

                   leftIcon={
                       <Icon name="search" size={24} color="black"/>
                   }
            />

            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    {chats.map( ({id, data: { chatName }}) => (
                        <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>

    )
};

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }
})