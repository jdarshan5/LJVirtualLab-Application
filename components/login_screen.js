import React from 'react';
import { View,Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from './context';
import axios from 'axios';

class Login extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            email: '',
            password: '',
        }
    }

    setEmail = (value) => {
        this.setState({ email: value});
    }

    setPassword = (value) => {
        this.setState({ password: value});
    }

    handleLogIn = () => {
        if(this.state.email == '' || this.state.password == '') {
            ToastAndroid.show('Enter Credentials.', ToastAndroid.LONG);
            return;
        }
        axios.get('http://79f502ad1517.ngrok.io/api/checkApproval/', {
            params: {
                email: this.state.email,
            }
        }).then(res => {
            if(res.status == 200) {
                if(typeof(res.data) == 'object') {
                    ToastAndroid.show('Email Has Not Been Registered', ToastAndroid.LONG);
                    return;
                } else if(typeof(res.data) == 'number') {
                    if(res.data == 0) {
                        ToastAndroid.show('Your Email Id Has Not Been Approved Yet \nPlease Contact Your Mentor.', ToastAndroid.LONG);
                        return;
                    } else {
                        const form = new FormData();
                        form.append('username', this.state.email);
                        form.append('password', this.state.password);
                        axios.post('http://79f502ad1517.ngrok.io/api/login/', form).then(async res => {
                            if(res.status == 200) {
                                const { setIsLoggedIn } = this.context;
                                await AsyncStorage.setItem('token', res.data.token);
                                await axios.get('http://79f502ad1517.ngrok.io/api/fetchUniversityByStudent/', {
                                    headers: {
                                        'Authorization': 'Token ' + res.data.token,
                                        'Content-Type': 'application/json',
                                    },
                                }).then(async res => {
                                    if(res.status == 200) {
                                        // console.log(toString(res.data.id));
                                        await AsyncStorage.setItem('university_id', (res.data.id).toString());
                                    }
                                }).catch(errors => {
                                    console.log(errors);
                                });
                                setIsLoggedIn(true);
                            }
                        }).catch(errors => {
                            console.log(errors);
                            return;
                        })
                    }
                }
            }
        }).catch(errors => {
            console.log(errors);
            return;
        });
    }

    navigateToSignUp = () => {
        const { navigation } = this.state;
        navigation.navigate('signup');
    }

    render() {
        return(
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                }}
                >
                <View 
                    style={{
                        margin: 20,
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                        }}>
                        Login
                    </Text>
                </View>
                <View 
                    style={{
                        width: '85%',
                    }}
                    >
                    <TextInput 
                        placeholder="EMAIL"
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholderTextColor="#AAA"
                        style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            color: '#000'
                        }}
                        onChangeText={this.setEmail}
                        />
                    <TextInput 
                        placeholder="PASSWORD"
                        secureTextEntry={true}
                        placeholderTextColor="#AAA"
                        style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            color: '#000'
                        }}
                        onChangeText={this.setPassword}
                        />
                </View>
                <View 
                    style={{
                        margin: 20,
                    }}
                    >
                    <TouchableOpacity
                        onPress={this.handleLogIn}
                        >
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                            >
                            Click To Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 30,
                    }}
                    >
                    <TouchableOpacity
                        onPress={this.navigateToSignUp}
                        >
                        <Text>
                            Click To Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Login;
