import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

export default class AddToDo extends Component {
  static navigationOptions = {
    title: 'Add item to ToDo',
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Add item ToDo</Text>
        <Button
          title="Go to Add ToDo... again"
          onPress={() => this.props.navigation.push('AddToDo')}
        />
        <Button
          title="Go to Main page"
          onPress={() => this.props.navigation.navigate('ToDoScreen')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
