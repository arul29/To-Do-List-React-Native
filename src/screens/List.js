import React, {Component} from 'react';
import {ListItem, CheckBox, Text, Body, View, Right, Icon} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';
class List extends Component {
  render() {
    // this.props.todos.map((item, index) => {
    //   console.log(item.completed);
    // });
    return (
      <View>
        {this.props.todos.map((item, index) => (
          <ListItem>
            <CheckBox
              //   checked={false}
              checked={item.completed ? true : false}
              onPress={this.props.markComplete.bind(this, item.id)}
            />
            <Body>
              <Text
                style={{
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                }}>
                {item.title}
              </Text>
            </Body>
            <Right>
              <TouchableOpacity
                style={styles.ButtonDelete}
                onPress={this.props.deleteTodo.bind(this, item.id)}>
                {/* <Text>Delete</Text> */}
                <Icon
                  type="FontAwesome"
                  name="trash"
                  style={{color: 'white'}}
                />
              </TouchableOpacity>
            </Right>
          </ListItem>
        ))}
      </View>
    );
  }
}

export default List;

const styles = StyleSheet.create({
  ButtonDelete: {
    borderWidth: 1,
    width: 30,
    height: 30,
    borderColor: 'grey',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
});
