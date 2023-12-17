import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import ChatListItem from '../components/ChatListItem';

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [chats, setChats] = useState([]);

  useLayoutEffect(() => {
    searchChat('');
  }, [navigation]);

  const searchChat = (text) => {
    const q = query(
      collection(db, 'chats'),
      where('chatName', '!=', ''),
      where('chatName', '>=', text),
      where('chatName', '<=', text + '\uffff')
    );
    const unsubscribe = onSnapshot(q, (querySnapshots) => {
      const newChats = querySnapshots.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setChats(newChats);
    });
    return unsubscribe;
  };

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', { id, chatName });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => {
          setChats([]);
          setInput(text);
          searchChat(text);
        }}
        leftIcon={<Icon name="search" type="antdesign" size={24} color="black" />}
      />
      <ScrollView style={styles.scrollView}>
        {chats.map(({ id, data: { chatName } }) => (
          <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
});
