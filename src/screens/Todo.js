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
import uuidv1 from 'uuid/v1';
import AsyncStorage from '@react-native-community/async-storage';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newtodo: '',
    };
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = async () => {
    try {
      const getTodos = await AsyncStorage.getItem('todos');
      const parsedTodos = JSON.parse(getTodos);
      this.setState({todos: parsedTodos || {}});
    } catch (err) {
      console.log(err);
    }
    // console.log(getTodos);
  };

  saveTodos = newToDos => {
    const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newToDos));
    // this.loadTodos();
  };

  addTodo = title => {
    this.setState({newtodo: ''});
    const {newTodoItem} = title;

    if (newTodoItem !== '') {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            userId: 1,
            id: ID,
            title: title,
            completed: false,
          },
        };
        const newState = {
          ...prevState,
          newTodoItem: '',
          todos: {
            ...prevState.todos,
            ...newToDoObject,
          },
        };
        this.saveTodos(newState.todos); // add this
        return {...newState};
      });
      ToastAndroid.showWithGravityAndOffset(
        'Added Success',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      );
    }
  };

  deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos,
      };
      this.saveTodos(newState.todos); // add this
      return {...newState};
    });
    ToastAndroid.showWithGravityAndOffset(
      'Deleted Success',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  markComplete = (id, completed) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            completed: completed ? false : true,
          },
        },
      };
      this.saveTodos(newState.todos); // add this
      return {...newState};
    });

    ToastAndroid.showWithGravityAndOffset(
      completed ? 'One Canceled' : 'One Completed',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      25,
      50,
    );
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
              placeholder="New task"
              value={this.state.newtodo}
              autoCapitalize={'none'}
              onChangeText={newtodo => this.setState({newtodo})}
            />
          </Item>
          <Button
            style={styles.ButtonAdd}
            onPress={() => this.addTodo(this.state.newtodo)}>
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
