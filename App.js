import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import ToDoScreen from './components/ToDoScreen';
import ToDoDetails from './components/ToDoDetails';
import AddToDo from './components/AddToDo';
import ToDoEdit from './components/ToDoEdit';

const Main = createStackNavigator(
  {
    ToDoScreen: ToDoScreen,
    ToDoDetails: ToDoDetails,
    AddToDo: AddToDo,
    ToDoEdit: ToDoEdit,
  },
  {
    initialRouteName: 'Product',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
const MainContainer = createAppContainer(Main);

export default class App extends React.Component {
  render() {
    return <MainContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
