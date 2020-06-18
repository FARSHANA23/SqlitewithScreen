import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

export default class ToDoDetails extends Component {
  static navigationOptions = {
    title: 'ToDo Details',
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>ToDo Details</Text>
        <Button
          title="Go to  TODO Details  again"
          onPress={() => this.props.navigation.push('ToDoDetails')}
        />
        <Button
          title="Go to Main Page"
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
