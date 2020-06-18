import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export default class ToDoEdit extends Component {
  static navigationOptions = {
    title: 'Edit an item in ToDo list',
  };
  constructor() {
    super();
    this.state = {
      ToDoId: '',
      ToDoName: '',
      ToDoDesc: '',
      isLoading: true,
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    db.getToDoId(navigation.getParam('ToDoId'))
      .then(data => {
        console.log(data);
        const ToDo = data;
        this.setState({
          ToDoId: ToDo.ToDoId,
          ToDoName: ToDo.ToDoName,
          ToDoDesc: ToDo.ToDoDesc,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
      });
  }
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };
  updateToDo() {
    this.setState({
      isLoading: true,
    });
    const {navigation} = this.props;
    let data = {
      ToDoId: this.state.ToDoId,
      ToDoName: this.state.ToDoName,
      ToDoDesc: this.state.ToDoDesc,
    };
    db.updateToDo(data.ToDoId, data)
      .then(result => {
        console.log(result);
        this.setState({
          isLoading: false,
        });
        this.props.navigation.state.params.onNavigateBack;
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={'ToDo ID'}
            value={this.state.ToDoId}
            onChangeText={text => this.updateTextInput(text, 'ToDoId')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={'ToDo Name'}
            value={this.state.ToDoName}
            onChangeText={text => this.updateTextInput(text, 'ToDoName')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'ToDo Description'}
            value={this.state.ToDoDesc}
            onChangeText={text => this.updateTextInput(text, 'ToDoDesc')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title="Save"
            onPress={() => this.updateToDo()}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
