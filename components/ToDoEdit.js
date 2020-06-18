import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

export default class ToDoEdit extends Component {
  static navigationOptions = {
    title: 'Edit an item in ToDo list',
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Add Product</Text>
        <Button
          title="Go to Edit item ... again"
          onPress={() => this.props.navigation.push('ToDoEdit')}
        />
        <Button
          title="Go to Home"
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
