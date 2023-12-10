import {ScrollView, StyleSheet, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Input} from "react-native-elements";
import React, {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../firebase";
import ChatListItem from "../components/ChatListItem";

const SearchChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "chats"), where("chatName", '!=', ""));
        return onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
               if(doc.data().chatName.includes(input)) {
                   chats.push({
                       id: doc.id,
                       data: doc.data()
                   });
               }
            });
            setChats(chats);
        });
    }, [input])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }

    return (
        <View style={styles.container}>
            <Input placeholder='Enter a chat name' value={input}
                   onChangeText={(text) => setInput(text)}
                   leftIcon={
                       <Icon name="wechat" type="antdesign" size={24} color="black"/>
                   }
            />
            <ScrollView style={styles.container}>
                {chats.map( ({id, data: { chatName }}) => (
                    <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default SearchChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }
})