import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Department from './department_screen';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            departments: [],
        };
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        console.log(await AsyncStorage.getItem('university_id'));
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
                <Department navigation={this.state.navigation} />
                <View 
                    style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={this.navigateToProfileScreen}
                        >
                        <Text>
                            Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Home;
