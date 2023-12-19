import { SafeAreaView, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import React, { useCallback, useEffect, useState } from 'react';
import ChatListItem from '../components/ChatListItem';
import { db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';

const SearchScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const q = query(collection(db, "chats"), where("chatName", '!=', ""));
        const unsubscribe = onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
                const data = doc.data();
                if (data.chatName.toLowerCase().includes(searchQuery.toLowerCase())) {
                    chats.push({ id: doc.id, data: doc.data() });
                }
            });
            setChats(chats);
        });
        return unsubscribe;
    }, [searchQuery])

    const handleChangeText = useCallback(newSearchQuery => {
        setSearchQuery(newSearchQuery);
    }, []);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }
  return (
    <SafeAreaView>
        <ScrollView style={{height: '100%'}}>
            <SearchBar round lightTheme platform='ios' value={searchQuery} onChangeText={handleChangeText} />
            {chats.map( ({id, data: { chatName }}) => (
                <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
            ))}
        </ScrollView>
    </SafeAreaView>
  )
};

export default SearchScreen
