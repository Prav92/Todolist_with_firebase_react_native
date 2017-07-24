/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  ToolbarAndroid
} from 'react-native';
import * as firebase from 'firebase';
import ListItem from './components/ListItem.js';
import styles from './styles.js'
import FloatingActionButton from 'react-native-action-button';

var config = {
  apiKey: "AIzaSyBHWhZIrHc-i_6JcaMqVkxGAQdS5GKAhT8",
  authDomain: "todo-61b49.firebaseapp.com",
  databaseURL: "https://todo-61b49.firebaseio.com",
  storageBucket: "todo-61b49.appspot.com",
};


const firebaseApp = firebase.initializeApp(config);

export default class TodoFirebase extends Component {
  
   constructor(props) {
    super(props);
    this.tasksRef = firebaseApp.database().ref();
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource,
      newTask: ""
    };
  }

  componentDidMount() {
  // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
    console.log(this.tasksRef, "=-=-=-=-=-=-")
  }

  _renderItem(task) {
    // a method for building each list item
    const onTaskCompletion = () => {
      // removes the item from the list
      this.tasksRef.child(task._key).remove()
    };
    return (
      <ListItem task={task} onTaskCompletion={onTaskCompletion} />
    );
  }

  _addTask() {
    if (this.state.newTask === "") {
      return;
    }
    this.tasksRef.push({ name: this.state.newTask});
    this.setState({newTask: ""});
}

  listenForTasks(tasksRef) {
    tasksRef.on('value', (dataSnapshot) => {
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          name: child.val().name,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
    });
  }


  render() {
    return (
      <View style={styles.container}>
   <ToolbarAndroid
          style={styles.navbar}
          title="Todo List" />
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listView}/>
        <TextInput
          value={this.state.newTask}
          style={styles.textEdit}
          onChangeText={(text) => this.setState({newTask: text})}
          placeholder="New Task"
      />
      <FloatingActionButton 
        hideShadow={true} // this is to avoid a bug in the FAB library.
        buttonColor="rgba(231,76,60,1)" 
        onPress={this._addTask.bind(this)}/>
      </View>
    );
  }
}


AppRegistry.registerComponent('TodoFirebase', () => TodoFirebase);
