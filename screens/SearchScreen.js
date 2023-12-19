import {  View, StyleSheet, ScrollView } from 'react-native';
import { Input } from 'react-native-elements'
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import ChatListItem from '../components/ChatListItem';

const SearchScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])
    const [text, setSearch] = useState('')
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }
    const filterChats = (text) => {
        setSearch(text)
        const q = query(collection(db, "chats"), where("chatName", '!=', ""));
        const unsubscribe = onSnapshot(q, (querySnaphots) => {
        const chats = [];
        querySnaphots.forEach((doc) => {
        chats.push({
            id: doc.id,
            data: doc.data()
        });
        });
        setChats(chats.filter((chat) => {
            return chat.data.chatName.includes(text)
        }))
    });
    return unsubscribe;
    }
    useEffect(() => {
        return filterChats(text)
    }, [])
    return(
    <View style={chatstyles.container}>
        <Input placeholder='Enter a chat name' onChangeText={(text) => filterChats(text)}></Input>
        <ScrollView style={chatstyles.container}>
            {chats.map( ({id, data: { chatName }}) => (
                <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
            ))}   
        </ScrollView>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }
})

const chatstyles = StyleSheet.create({
    container: {
        height: "100%"
    }
})
export default SearchScreen;