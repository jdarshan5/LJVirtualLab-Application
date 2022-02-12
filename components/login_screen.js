import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bar } from 'react-native-progress';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

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
            isLoading: false,
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
            ToastAndroid.show('Enter Credentials', ToastAndroid.LONG);
            return;
        }
        this.setState({ isLoading: true }, () => {
            axios.get('https://jdarshan1210.pythonanywhere.com/user/api/fetchUserApproval/', {
                params: {
                    email: this.state.email,
                }
            }).then(res => {
                if(res.status == 200) {
                    if(typeof(res.data) == 'object') {
                        ToastAndroid.show('No Record Found For That Email,\nPlease Sign Up.', ToastAndroid.CENTER);
                        this.setState({ isLoading: false });
                        return;
                    } else if(typeof(res.data) == 'number') {
                        if(res.data == 0) {
                            ToastAndroid.show('Your Email Id Has Not Been Approved Yet,\nPlease Contact Your Mentor.', ToastAndroid.LONG);
                            this.setState({ isLoading: false });
                            return;
                        } else {
                            const form = new FormData();
                            form.append('username', this.state.email);
                            form.append('password', this.state.password);
                            axios.post('https://jdarshan1210.pythonanywhere.com/user/api/login/', form).then(async res => {
                                if(res.status == 200) {
                                    const { setIsLoggedIn } = this.context;
                                    await AsyncStorage.setItem('token', res.data.token);
                                    await axios.get('https://jdarshan1210.pythonanywhere.com/university/api/fetchEducationalInfo/', {
                                        headers: {
                                            'Authorization': 'Token ' + res.data.token,
                                            'Content-Type': 'application/json',
                                        },
                                    }).then(async res => {
                                        if(res.status == 200) {
                                            await AsyncStorage.setItem('university_id', res.data.university_id.toString()).then(async () => {
                                                await AsyncStorage.setItem('institute_id', res.data.institute_id.toString()).then(async () => {
                                                    await AsyncStorage.setItem('department_id', res.data.department_id.toString());
                                                });
                                            });
                                        }
                                    }).catch(errors => {
                                        console.log(errors);
                                        ToastAndroid.show('Error fetching user info', ToastAndroid.SHORT);
                                    });
                                    setIsLoggedIn(true);
                                }
                            }).catch(errors => {
                                console.log(errors);
                                ToastAndroid.show('Login error', ToastAndroid.SHORT);
                                this.setState({ isLoading: false });
                                return;
                            })
                        }
                    }
                }
            }).catch(errors => {
                if(errors.response.status == 400) {
                    let error_msg = '';
                    for(let e in errors.response.data) {
                        error_msg += e + ': ' + errors.response.data[e][0] + '\n';
                    }
                    alert(error_msg);
                } else {
                    console.log(errors);
                }
                ToastAndroid.show('Technical Erro', ToastAndroid.SHORT);
                this.setState({ isLoading: false });
                return;
            });
        });
    }

    navigateToSignUp = () => {
        const { navigation } = this.state;
        navigation.navigate('signup');
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    <Bar 
                        indeterminate={true}
                        width={250}
                        height={1}
                        color='#000'
                        />
                    <Text>
                        LOADING
                    </Text>
                </View>
            )
        }
        return(
            <View 
                style={{
                    flex: 1,
                    backgroundColor: '#FFF',
                }}
                >
                <View
                    style={{
                        margin: 15,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
                    >
                    <View 
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <IoniconsIcon 
                            name='arrow-back'
                            size={20} 
                            style={{
                                paddingRight: 10,
                            }}
                            onPress={this.navigateBack}
                            />
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: '700',
                            }}
                            >
                            LOG IN
                        </Text>
                    </View>
                    <Image 
                        source={require('../static/lj_logo.png')} 
                        style={{
                            height: 30,
                            width: 30,
                        }}/>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                    >
                    <View 
                        style={{
                            // width: '100%',
                            marginHorizontal: 30,
                        }}
                        >
                        <TextInput 
                            placeholder="EMAIL"
                            keyboardType='email-address'
                            autoCapitalize='none'
                            placeholderTextColor="#AAA"
                            style={{
                                marginVertical: 5,
                                borderBottomWidth: 0.5,
                                color: '#000'
                            }}
                            onChangeText={this.setEmail}
                            editable={!this.state.isLoading}
                            />
                        <TextInput 
                            placeholder="PASSWORD"
                            secureTextEntry={true}
                            placeholderTextColor="#AAA"
                            style={{
                                marginVertical: 5,
                                borderBottomWidth: 0.5,
                                color: '#000'
                            }}
                            onChangeText={this.setPassword}
                            editable={!this.state.isLoading}
                            />
                    </View>
                    <View 
                        style={{
                            marginVertical: 20,
                            marginHorizontal: 40,
                            padding: 10,
                            width: '80%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0.5,
                            borderRadius: 50,
                        }}
                        >
                        <TouchableOpacity
                            onPress={this.handleLogIn}
                            disabled={this.state.isLoading}
                            >
                            <Text
                                style={{
                                    fontSize: 20,
                                }}
                                >
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View
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
                </View> */}
            </View>
        )
    }
}

export default Login;
