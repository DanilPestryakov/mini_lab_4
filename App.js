import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: "#37B34A" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

const theme = {
  colors: {
    primary: '#37B34A',
  },
};

const headerBackgroundColor = "#37B34A";
const headerTextColor = "white";

const screens = [
  { name: "Login", title: "Login", component: LoginScreen },
  { name: "Register", title: "Register", component: RegisterScreen },
  { name: "Home", title: "Home", component: HomeScreen },
  { name: "AddChat", title: "Add Chat", component: AddChatScreen },
  { name: "Chat", title: "Chat", component: ChatScreen },
  { name: "UserProfile", title: "UserProfile", component: UserProfileScreen },
  { name: "Search", title: "Search", component: SearchScreen },
];

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={headerOptions}>
          {screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              options={{ title: screen.title }}
              name={screen.name}
              component={screen.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
