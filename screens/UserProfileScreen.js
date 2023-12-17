import { Text, View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth } from '../firebase';

const UserProfileScreen = ({ navigation }) => {
    return(
    <View style={styles.container}>
        <Avatar rounded size="xlarge" source={{ uri: auth?.currentUser?.photoURL }}/>
        <Text>{auth?.currentUser?.displayName} </Text>
        <Text>{auth?.currentUser?.email} </Text>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    },
   
})

export default UserProfileScreen;