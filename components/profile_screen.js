import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from './context';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';

class Profile extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            info: {},
        }
    }

    componentDidMount = () => {
        this.fetchUserInfo();
    }

    fetchUserInfo = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get('https://jdarshan1210.pythonanywhere.com/user/api/fetchUserInfo/', {
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if(res.status == 200) {
                this.setState({ info: res.data });
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    handleLogout = async () => {
        const { setIsLoggedIn } = this.context;
        const token = await AsyncStorage.getItem('token');
        axios.post('https://jdarshan1210.pythonanywhere.com/user/api/rest_auth/logout/', {}, {
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
                    // justifyContent: 'center',
                    // alignItems: 'center',
                }}
                >
                <View
                    style={{
                        margin: 20,
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: '700',
                        }}
                        >
                        Profile
                    </Text>
                </View>
                <View
                    style={{
                        marginHorizontal: 20,
                    }}
                    >
                    <Text
                        style={{
                            paddingVertical: 5,
                            fontSize: 16,
                        }}
                        >
                        Name: {this.state.info.user_name}
                    </Text>
                    <Text
                        style={{
                            paddingVertical: 5,
                            fontSize: 16,
                        }}
                        >
                        Email: {this.state.info.user_email}
                    </Text>
                    <Text
                        style={{
                            paddingVertical: 5,
                            fontSize: 16,
                        }}
                        >
                        Mobile Number: {this.state.info.user_mobile_number}
                    </Text>
                    <Text
                        style={{
                            paddingVertical: 5,
                            fontSize: 16,
                        }}
                        >
                        Enrollment Number: {this.state.info.user_enrollment_number}
                    </Text>
                    <Text
                        style={{
                            paddingVertical: 5,
                            fontSize: 16,
                        }}
                        >
                        University: {this.state.info.university_name}
                    </Text>
                    <Text
                        style={{
                            paddingVertical: 5,
                            fontSize: 16,
                        }}
                        >
                        Institute: {this.state.info.institute_name}
                    </Text>
                    <Text
                        style={{
                            paddingVertical: 5,
                            fontSize: 16,
                        }}
                        >
                        Department: {this.state.info.department_name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        >
                        <Text
                            style={{
                                paddingVertical: 5,
                                fontSize: 16,
                            }}
                            >
                            Mobile Verified: {this.state.info.is_verified_mobile}
                        </Text>
                        {this.state.info.is_verified_mobile ? 
                            <OcticonsIcon name='verified' size={20} /> 
                            : 
                            <EntypoIcon name='cross' size={20} /> }
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        >
                        <Text
                            style={{
                                paddingVertical: 5,
                                fontSize: 16,
                            }}
                            >
                            Email Verified: {this.state.info.is_verified_email}
                        </Text>
                        {this.state.info.is_verified_email ? 
                            <OcticonsIcon name='verified' size={20} /> 
                            : 
                            <EntypoIcon name='cross' size={20} /> }
                    </View>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                    }}
                    >
                    <TouchableOpacity
                        style={{
                            margin: 15,
                            padding: 15,
                            backgroundColor: 'lightblue',
                            borderRadius: 10,
                        }} 
                        onPress={this.handleLogout}
                        >
                        <Text>
                            LOGOUT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Profile;
