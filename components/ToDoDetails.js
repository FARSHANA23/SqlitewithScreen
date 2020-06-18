import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export default class ToDoDetails extends Component {
  static navigationOptions = {
    title: 'ToDo Details',
  };
  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      const {navigation} = this.props;
      db.getToDoId(navigation.getParam('ToDoId'))
        .then(data => {
          console.log(data);
          ToDo = data;
          this.setState({
            ToDo,
            isLoading: false,
            id: ToDo.ToDoId,
          });
        })
        .catch(err => {
          console.log(err);
          this.setState = {
            isLoading: false,
          };
        });
    });
  }
  deleteitem(id) {
    const {navigation} = this.props;
    this.setState({
      isLoading: true,
    });
    db.deleteitem(id)
      .then(result => {
        console.log(result);
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
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
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text style={{fontSize: 16}}>
                ToDo ID: {this.state.ToDo.ToDoId}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 16}}>
                ToDo Name: {this.state.ToDo.ToDoName}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 16}}>
                ToDo Desc: {this.state.ToDo.ToDoDesc}
              </Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title="Edit"
              onPress={() => {
                this.props.navigation.navigate('ToDoEdit', {
                  ToDoId: `${this.state.id}`,
                });
              }}
            />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title="Delete"
              onPress={() => this.deleteitem(this.state.id)}
            />
          </View>
        </Card>
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
    paddingBottom: 20,
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
  detailButton: {
    marginTop: 10,
  },
});
