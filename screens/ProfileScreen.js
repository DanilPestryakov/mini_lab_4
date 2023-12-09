import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';

const ProfileScreen = ({ navigation }) => {
    const goHome = () => {
      navigation.replace('Home');
    };
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { color: 'black' },
        headerLeft: () => (
          <View style={{ marginLeft: 80 }}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 120,
              marginRight: 0,
            }}>
            <TouchableOpacity onPress={goHome} activeOpacity={0.5}>
              <Ionicons name="home" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
      });
    }, [navigation]);
  
    // Добавим размещение текста в центре экрана
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Avatar size={200} rounded source={{ uri: auth?.currentUser?.photoURL }} />
        <Text>Имя: {auth?.currentUser?.displayName}</Text>
        <Text>Email: {auth?.currentUser?.email}</Text>
      </View>
    );
  };
  
  export default ProfileScreen;