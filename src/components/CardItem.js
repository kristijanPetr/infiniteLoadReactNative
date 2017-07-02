import React, {Component} from 'react';
import { Image } from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body  } from 'native-base';


class UserScreen extends Component {
    static navigationOptions = {
        title: 'User ',
    };
    render() {
        const { params } = this.props.navigation.state;
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: params.user.picture.large}} />
                                <Body>
                                <Text>{params.user.name.first + " " + params.user.name.last}</Text>
                                <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: params.user.picture.large}}
                                   style={{height: 150, width: null, flex: 1}}
                            />
                        </CardItem>

                    </Card>
                </Content>
            </Container>
        );
    }
}

export default UserScreen;