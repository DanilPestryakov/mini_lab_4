import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import ChatListItem from '../components/ChatListItem';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'


const SearchScreen = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [chats, setChats] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Search",
            // Только iOS
            headerBackTitle: "Chats",
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 120
                }}>
                    <TouchableOpacity onPress={goHome} activeOpacity={0.5}>
                        <Ionicons name='home' size={24} color="black"/>
                    </TouchableOpacity> 
                </View>
            )

        })
    }, [navigation]);

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
            updateSearchResults(chats,input);
        });
        return unsubscribe;
    }, [input])

    const updateSearchResults = (chats, searchText) => {
        const filteredChats = chats.filter(chat => chat.data.chatName.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(filteredChats);
    };

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }

    const goHome = () => {
        navigation.replace('Home');
      };

  return (
    <View style={styles.container}>
      <Input placeholder='Enter a chat name' value={input} 
      onChangeText={(text) => {setInput(text); updateSearchResults(chats,text);}}
      leftIcon={
            <Icon name="wechat" type="antdesign" size={24} color="black"/>
      }
      />
    <SafeAreaView>
        <ScrollView style={styles.container}>
            {searchResults.map( ({id, data: { chatName }}) => (
                <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
            ))}   
        </ScrollView>
    </SafeAreaView>
    </View>
    
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }
})