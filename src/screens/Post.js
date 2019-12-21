import React, {Component} from 'react';
import {Image, StyleSheet, ToastAndroid, ActivityIndicator} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title,
  View,
  Input,
  Item,
} from 'native-base';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      body: '',
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5').then(res =>
      this.setState({
        posts: res.data,
      }),
    );
  }

  newPost = (title, body) => {
    axios
      .post('https://jsonplaceholder.typicode.com/posts?', {
        title,
        body,
      })
      .then(res =>
        this.setState({
          posts: [...this.state.posts, res.data],
          title: '',
          body: '',
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
    // console.log(this.state.posts);

    return (
      <Container>
        <Header>
          <Body>
            <Title>Post</Title>
          </Body>
        </Header>

        <View>
          <ScrollView>
            <View style={{marginVertical: 10, marginHorizontal: 10}}>
              <Item
              // floatingLabel
              >
                {/* <Label>New todo</Label> */}
                <Input
                  placeholder="Title"
                  value={this.state.title}
                  autoCapitalize={'none'}
                  onChangeText={title => this.setState({title})}
                />
              </Item>
              <Item
              // floatingLabel
              >
                {/* <Label>New todo</Label> */}
                <Input
                  placeholder="Body"
                  value={this.state.body}
                  autoCapitalize={'none'}
                  onChangeText={body => this.setState({body})}
                />
              </Item>
              <Button
                style={styles.ButtonAdd}
                onPress={() => this.newPost(this.state.title, this.state.body)}>
                <Text>Add new post</Text>
                {/* <Icon type="FontAwesome" name="plus" style={{color: 'white'}} /> */}
              </Button>
              {/* </Item> */}
            </View>
            {this.state.posts.length > 0 ? null : (
              <View>
                <ActivityIndicator size="large" color="black" />
                {/* <Text>Loading...</Text> */}
              </View>
            )}

            {this.state.posts
              .map((item, index) => {
                return (
                  <Card key={index} style={{flex: 0}}>
                    <CardItem>
                      <Left>
                        <Thumbnail
                          source={{
                            uri:
                              'https://images.immediate.co.uk/production/volatile/sites/3/2017/11/imagenotavailable1-39de324.png?quality=90&resize=768,574',
                          }}
                        />
                        <Body>
                          <Text>{item.title}</Text>
                          <Text note>April 15, 2016</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Image
                          source={{
                            uri:
                              'https://images.immediate.co.uk/production/volatile/sites/3/2017/11/imagenotavailable1-39de324.png?quality=90&resize=768,574',
                          }}
                          style={{height: 200, width: '100%', flex: 1}}
                        />
                        <Text>{item.body}</Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent>
                          <Icon active name="thumbs-up" />
                          <Text>12 Likes</Text>
                        </Button>
                      </Left>
                      <Body>
                        <Button transparent>
                          <Icon active name="chatbubbles" />
                          <Text>4 Comments</Text>
                        </Button>
                      </Body>
                      {/* <Right>
                <Text>11h ago</Text>
              </Right> */}
                    </CardItem>
                  </Card>
                );
              })
              .reverse()}
          </ScrollView>
        </View>
      </Container>
    );
  }
}
export default Post;

const styles = StyleSheet.create({
  ButtonAdd: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
