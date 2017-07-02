import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { Container, Content, List, ListItem, Thumbnail, Text,
    Body, Header, Title, Spinner } from 'native-base';
import { StackNavigator } from 'react-navigation';

import UserScreen from './components/CardItem'

class App extends Component {

    static navigationOptions = {
        title: 'Users Feed',
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        this.state = { users: [], page: 1 };
        this.getRandomUsers = this.getRandomUsers.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentDidMount() {
        this.getRandomUsers();
    }

    getRandomUsers() {

        axios.get('https://randomuser.me/api/?page=1&results=10&seed=kristijan').then((users) => {
            //console.log("Users loaded ", users.data.results);
            this.setState( {users: users.data.results} );
        });
    }

    renderUsers() {
            const { navigate } = this.props.navigation;
            const users = this.state.users;
            if(users.length === 0){
                return (
                    <Spinner />
                )
            }
             return users.map( (user,index) => {
                return (

                    <ListItem key={index}
                        onPress={() => {
                            console.log('clicked User:',user.name.first);
                            navigate('Chat', { user });
                        }}
                    >
                        <Thumbnail large
                                   source={{ uri: user.picture.large }} />
                        <Body>
                        <Text>{this.capitalizeFirstLetter(user.name.first) + " " + this.capitalizeFirstLetter(user.name.last)}</Text>
                        <Text note>Email: {user.email}</Text>
                        </Body>
                    </ListItem>

                )
             });
    }
    getPagination() {
        const currPage = this.state.page + 1;
        const url = `https://randomuser.me/api/?page=${currPage}&results=10&seed=kristijan`;
        axios.get(url).then((users) => {
            //console.log("Users loaded ", users.data.results);
            this.setState( {
                users: this.state.users.concat(users.data.results) ,
                page: currPage+1
            } );
        });
    }
    render() {
        const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
            const paddingToBottom = 200;
            console.log("Mesaure: ",layoutMeasurement);
            console.log("Content Size : ",contentOffset);
            return layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom;
        };
        return (
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        //enableSomeButton();
                        this.getPagination();
                        console.log('close to bottom!');
                    }
                }}
                scrollEventThrottle={1000}
                removeClippedSubviews={true}
            >
            <Container>
                <Content>
                    <List>
                        {this.renderUsers()}

                    </List>

                </Content>
            </Container>
            </ScrollView>
        );
    }
}


const Feed = StackNavigator({
    Home: { screen: App },
    Chat: { screen: UserScreen },
});

export default Feed;