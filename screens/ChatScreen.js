import React, { useLayoutEffect, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
  getDoc,
  doc
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { deafultPicURL } from '../utils';

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [touchedMsg, setTouchedMsg] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Avatar rounded source={{ uri: messages[messages.length - 1]?.data.photoUrl || deafultPicURL }} />
          <Text style={styles.headerText}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.headerLeft} onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, messages]);

  const sendMessage = async () => {
    Keyboard.dismiss();
    try {
      const docRef = await addDoc(collection(db, "chats", route.params.id, "messages"), {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoUrl: auth.currentUser.photoURL
      });
      setInput("");
    } catch (error) {
      alert(error.message);
    }
  };

  const msgOptions = (id) => {
    setTouchedMsg(id);
    setShowModal(true);
  };

  useLayoutEffect(() => {
    const q = query(collection(db, "chats", route.params.id, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshots) => {
      const messages = querySnapshots.docs.map(doc => ({ id: doc.id, data: doc.data() }));
      setMessages(messages);
    });
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={125}
      >
        <ScrollView style={styles.scrollView}>
          <View visible={showModal}>
            <Modal
              transparent={true}
              style={styles.centeredView}
              animationType="slide"
              visible={showModal}
              onRequestClose={() => setShowModal(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Delete this message?</Text>
                  <Button containerStyle={styles.button} onPress={async () => {
                    try {
                      console.log(touchedMsg);
                      await deleteDoc(doc(db, "chats", route.params.id, "messages", touchedMsg));
                      setShowModal(false);
                    } catch (error) {
                      alert(error.message);
                    }
                  }} title='Yes' />
                  <Button containerStyle={styles.button} onPress={() => setShowModal(false)} title='No' />
                </View>
              </View>
            </Modal>
          </View>
          {messages.map(({ id, data }) => (
            data.email === auth.currentUser.email ? (
              <TouchableOpacity activeOpacity={0.5} onPress={() => msgOptions(id)}>
                <View key={id} style={styles.userMessage}>
                  <Avatar rounded source={{ uri: data.photoUrl }}
                    containerStyle={styles.userAvatar}
                    position="absolute"
                    bottom={-15}
                    right={-5}
                    size={30}
                  />
                  <Text style={styles.userText}>{data.message}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View key={id} style={styles.senderMessage}>
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
                <Avatar rounded source={{ uri: data.photoUrl }}
                  containerStyle={styles.senderAvatar}
                  position="absolute"
                  bottom={-15}
                  left={-5}
                  size={30}
                />
              </View>
            )
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput value={input} onChangeText={(text) => setInput(text)}
            placeholder='Message...' style={styles.textInput} />
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color="#017c13" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  // ... (existing styles)

  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "700",
  },
  headerLeft: {
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  userAvatar: {
    position: "absolute",
    bottom: -15,
    right: -5,
  },
  senderAvatar: {
    position: "absolute",
    bottom: -15,
    left: -5,
  },
});
