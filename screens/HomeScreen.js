import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import ChatListItem from '../components/ChatListItem';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const q = query(collection(db, "chats"), where("chatName", '!=', ""));
    const unsubscribe = onSnapshot(q, (querySnapshots) => {
      const chats = querySnapshots.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
      setChats(chats);
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "PolyChat",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerLeft: () => (
        <View style={styles.avatarContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("UserProfile")}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
            <SimpleLineIcons name='pencil' size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Search")} activeOpacity={0.5}>
            <Ionicons name='search' size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
            <Ionicons name='exit' size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    marginLeft: 20,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    marginRight: 20,
  },
});
