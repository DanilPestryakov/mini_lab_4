import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import ChatListItem from '../components/ChatListItem';


const DialogueSearchScreen = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [chats, setChats] = useState([]);
    const [searchChats, setSearchChats] = useState([]);

    useEffect(() => {
        const q = query(
            collection(db, "chats"),
            where("chatName", '!=', "")
        );
        return onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
                chats.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setChats(chats);
            updateSearchChats(chats, search);
        });
    }, [search])

    const updateSearchChats = (chats, search) => {
        setSearchChats(
            chats.filter(
                (chat) => chat.data.chatName.
                toLowerCase().
                includes(search.toLowerCase())
            )
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Search Dialogues",
            headerBackTitle: "Chats",
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Input style={styles.input} placeholder='Enter a chat name' value={search}
                onChangeText={(text) => { 
                    setSearch(text);
                    updateSearchChats(chats, text);
                }}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
            />
            <SafeAreaView>
                <ScrollView style={styles.container}>
                    {searchChats.map(({ id, data: { chatName } }) => (
                        <ChatListItem key={id} id={id} chatName={chatName} enterChat={(id, chatName) => {
                            navigation.navigate("Chat", { id, chatName })
                        }} />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>

    )
}

export default DialogueSearchScreen;

const styles = StyleSheet.create({
    container: {
        borderRadius: "15px",
        backgroundColor: "white",
        padding: "30px",
        height: "100%",
    },
    input: {
        paddingLeft: "5px",
        marginLeft: "10px",
    }
})