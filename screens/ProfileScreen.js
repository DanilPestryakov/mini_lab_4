import { SafeAreaView, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import React from 'react';
import { auth } from '../firebase';

const UserProfileScreen = () => {
    return (
        <SafeAreaView>
            <View style={{ flexDirection: "column", margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 10 }}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </View>

                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>{auth?.currentUser?.displayName}</Text>
                        <Text>{auth?.currentUser?.email}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default UserProfileScreen
