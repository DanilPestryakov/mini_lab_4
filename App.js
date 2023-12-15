import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider} from 'react-native-elements';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import {MenuProvider} from "react-native-popup-menu";
import ProfileScreen from "./screens/ProfileScreen";
import SearchChatScreen from "./screens/SearchChatScreen";


// Навигационный стек экранов. Позволяет упорядоченно переключатся между экранами
const Stack = createStackNavigator();
// Настройки заголовка (верхняя плашка, которая присутствует на всех экранах)
const globalScreenOptions = {
    headerStyle: {backgroundColor: "#37B34A"},
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
};
// Цветовая тема компонентов из библиотеки reac-native-elements
const theme = {
  colors: {
    primary: '#37B34A',
  }
};

export default function App() {
  return (
      <MenuProvider>
          {/* Обертка для доступа всех дочерних компонентов к теме приложения*/}
          <ThemeProvider theme={theme}>
              {/* Контейнер для организации навигации между экранами */}
              <NavigationContainer>
                  <Stack.Navigator screenOptions={globalScreenOptions}>
                      {/* Экраны приложения. По name осуществляется поиск, а затем переключение на соответствующий component */}
                      {/* Через options можно настроить внешний вид верхней плашки. В данном случае указан заголовок экрана */}
                      <Stack.Screen options={{title: "Login"}} name="Login" component={LoginScreen}/>
                      <Stack.Screen options={{title: "Register"}} name="Register" component={RegisterScreen}/>
                      <Stack.Screen options={{title: "Home"}} name="Home" component={HomeScreen}/>
                      <Stack.Screen options={{title: "Add Chat"}} name="AddChat" component={AddChatScreen}/>
                      <Stack.Screen options={{title: "Chat"}} name="Chat" component={ChatScreen}/>
                      <Stack.Screen options={{title: "Profile", headerBackTitle: "Chats"}} name="Profile" component={ProfileScreen}/>
                      <Stack.Screen options={{title: "Search Chat", headerBackTitle: "  Chats"}} name="SearchChat" component={SearchChatScreen}/>
                  </Stack.Navigator>
              </NavigationContainer>
          </ThemeProvider>
      </MenuProvider>
  );
}
