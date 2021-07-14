import React from 'react';
import { View, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from './context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

class Profile extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
        }
    }

    handleLogout = async () => {
        const { setIsLoggedIn } = this.context;
        const token = await AsyncStorage.getItem('token');
        axios.post('http://79f502ad1517.ngrok.io/rest_auth/logout/', {}, {
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json',
            },
        }).then(async res => {
            if(res.status == 200) {
                console.log('Logout Successful.');
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('university_id');
                setIsLoggedIn(false);
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    render() {
        return(
            <View 
                style={{
                    flex: 1,
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                <FontAwesomeIcon name='user' size={20} />
                <Button 
                    title="Log out" 
                    onPress={this.handleLogout}
                    />
            </View>
        )
    }
}

export default Profile;
