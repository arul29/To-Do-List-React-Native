import React, {Component} from 'react';
import {
  View,
  Header,
  Body,
  Title,
  Container,
  Item,
  Input,
  Button,
  Text,
} from 'native-base';
import axios from 'axios';
import List from './List';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, ToastAndroid} from 'react-native';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newtodo: '',
    };
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5').then(res =>
      this.setState({
        todos: res.data,
      }),
    );
  }

  //Checklist complete
  markComplete = id => {
    // console.log(id);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
    ToastAndroid.showWithGravityAndOffset(
      'One list has finished',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
    // console.log(this.state.todos);
  };

  // Delete Todo
  deleteTodo = id => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res =>
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)],
        }),
      )
      .then(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Deleted Success',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50,
        );
      });
  };

  // Add Todo
  Addtodo = title => {
    axios
      .post('https://jsonplaceholder.typicode.com/todos?', {
        title,
        completed: false,
      })
      .then(res =>
        this.setState({
          todos: [...this.state.todos, res.data],
          newtodo: '',
        }),
      )
      .then(() => {
        ToastAndroid.showWithGravityAndOffset(
          'Added Success',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50,
        );
      });
  };

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>To do list</Title>
          </Body>
        </Header>
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Item
          // floatingLabel
          >
            {/* <Label>New todo</Label> */}
            <Input
              placeholder="New todo"
              value={this.state.newtodo}
              autoCapitalize={'none'}
              onChangeText={newtodo => this.setState({newtodo})}
            />
          </Item>
          <Button
            style={styles.ButtonAdd}
            onPress={() => this.Addtodo(this.state.newtodo)}>
            <Text>Add</Text>
            {/* <Icon type="FontAwesome" name="plus" style={{color: 'white'}} /> */}
          </Button>
          {/* </Item> */}
        </View>
        <ScrollView>
          <View>
            <List
              todos={this.state.todos}
              markComplete={this.markComplete}
              deleteTodo={this.deleteTodo}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}
export default Todo;

const styles = StyleSheet.create({
  ButtonAdd: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
