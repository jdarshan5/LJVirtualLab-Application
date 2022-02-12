import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Course from './course_screen';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
        };
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
    }

    navigateToProfileScreen = () => {
        const { navigation } = this.state;
        navigation.navigate('profile');
    }

    render() {
        return(
            <View 
                style={{
                    flex: 1,
                    backgroundColor: '#FFF',
                }}
                >
                <Course navigation={this.state.navigation} />
                <View 
                    style={{
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={this.navigateToProfileScreen}
                        >
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                            >
                            Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Home;
