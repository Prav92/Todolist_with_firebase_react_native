import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from '../styles.js';

class ListItem extends Component {
  render() {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{this.props.task.name}</Text>
        <TouchableHighlight onPress={this.props.onTaskCompletion}>
          <Image style={styles.liAction} source={{uri: 'https://1.bp.blogspot.com/-uRaHoFqqsxY/V70he-ZYRlI/AAAAAAAAA7A/S4Js-D6sMR8vs28NFv7W39rFRAPX7XIWgCLcB/s1600/ic_done_black_24dp.png'}} />
        </TouchableHighlight>
        {/*Icon taken from google's material icon pack: https://design.google.com/icons/#ic_done*/}
      </View>
    );
  }
}

module.exports = ListItem;