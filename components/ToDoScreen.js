import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

export default class ToDoScreen extends Component {
  static navigationOptions = {
    title: 'ToDoScreen',
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>ToDoScreen</Text>
        <Button
          title="Go to TODO List  Details"
          onPress={() => this.props.navigation.navigate('ToDoDetails')}
        />
        <Button
          title="Go to Add item in a TODO list"
          onPress={() => this.props.navigation.navigate('AddToDo')}
        />
        <Button
          title="Go to Edit item in TODO List"
          onPress={() => this.props.navigation.navigate('ToDoEdit')}
        />
      </View>
    );
  }
}
