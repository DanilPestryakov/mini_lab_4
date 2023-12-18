import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Input } from 'react-native-elements';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ChatListItem from '../components/ChatListItem';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';

const SearchScreen = ({navigation}) => {
    // Отслеживаем и обрабатываем изменения списка чатов
    const [chats, setChats] = useState([]);
    const [filter, setFilter] = useState('');

    const allChats = chats.map(a => JSON.parse(JSON.stringify(a)));

    useEffect(() => {
            const q = query(collection(db, "chats"), where("chatName", '!=', ""));
            const unsubscribe = onSnapshot(q, (querySnaphots) => {
                const chats = [];
                querySnaphots.forEach((doc) => {
                    chats.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setChats(chats);
            });
            return unsubscribe;
        }, [])

    // Переходим на экран чата; при этом передаем id и name выбранного чата,
    // чтобы на экране чата отобразить нужное содержимое
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }


  return (
    <SafeAreaView>
        <View style={styles.inputContainer}>
            <Input onChangeText = {(text) => setFilter(text)}/>
        </View>
        <ScrollView style={styles.container}>
            {
                chats.filter(
                    (chat) => chat.data.chatName.match(new RegExp(`.*${filter}.*`, 'i'))
                ).map(
                    ({id, data: { chatName }}) => (
                        <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                    )
                )
            }
        </ScrollView>
    </SafeAreaView>
  )
};

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})