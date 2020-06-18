import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export default class ToDoScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'ToDoList',
      headerRight: (
        <Button
          buttonStyle={{padding: 0, backgroundColor: 'transparent'}}
          icon={{name: 'add-circle', style: {marginRight: 0, fontSize: 28}}}
          onPress={() => {
            navigation.navigate('AddToDo', {
              onNavigateBack: this.handleOnNavigateBack,
            });
          }}
        />
      ),
    };
  };
  constructor() {
    super();
    this.state = {
      isLoading: true,
      items: [],
      notFound: 'items not found.\nPlease click (+) button to add it.',
    };
  }
  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getitems();
    });
  }
  getitems() {
    let items = [];
    db.listToDo()
      .then(data => {
        items = data;
        this.setState({
          items,
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
  keyExtractor = (item, index) => index.toString();
  renderItem = ({item}) => (
    <ListItem
      title={item.ToDoName}
      onPress={() => {
        this.props.navigation.navigate('ToDoDetails', {
          ToDoId: `${item.ToDoId}`,
        });
      }}
      chevron
      bottomDivider
    />
  );
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (this.state.items.length === 0) {
      return (
        <View>
          <Text style={styles.message}>{this.state.notFound}</Text>
        </View>
      );
    }

    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.items}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
  message: {
    padding: 16,
    fontSize: 18,
    color: 'red',
  },
});
