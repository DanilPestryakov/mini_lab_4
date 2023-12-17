import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

const UserProfileScreen = () => {
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const fetchMessageCount = async () => {
      const chatsQuery = query(collection(db, 'chats'), where('chatName', '!=', ''));
      const chatsSnapshot = await onSnapshot(chatsQuery);

      let count = 0;

      chatsSnapshot.forEach((chatDoc) => {
        const messagesQuery = query(
          collection(db, 'chats', chatDoc.id, 'messages'),
          where('email', '==', `${auth?.currentUser?.email}`)
        );

        onSnapshot(messagesQuery, (messagesSnapshot) => {
          count += messagesSnapshot.size;
          setMessageCount(count);
        });
      });
    };

    fetchMessageCount();
  }, []);

  return (
    <View style={styles.container}>
      <Avatar size="large" rounded source={{ uri: auth?.currentUser?.photoURL }} />
      <View>
        <Text UserInfo style={{ fontSize: 24, color: '#01a81a' }}>{auth.currentUser.displayName}</Text>
        <Text style={{ fontSize: 18 }}>Email:<Text UserInfo style={{ color: '#7CB9E8' }}> {auth.currentUser.email}</Text></Text>
        <Text style={{ fontSize: 18 }}>Messages: {messageCount}</Text>
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '90%',
  },
});
