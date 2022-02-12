import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import Context from './context';
import axios from 'axios';

class SignUp extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            selectedDepartmentId: props.route.params.selectedDepartmentId,
            selectedDepartmentName: props.route.params.selectedDepartmentName,
            selectedInstituteId: props.route.params.selectedInstituteId,
            selectedInstituteName: props.route.params.selectedInstituteName,
            selectedUniversityId: props.route.params.selectedUniversityId,
            selectedUniversityName: props.route.params.selectedUniversityName,
            email: '',
            name: '',
            mobileNumber: 0,
            enrollmentNumber: 0,
            password: '',
            password2: '',
        };
    }

    setEmail = (value) => {
        this.setState({ email: value});
    }

    setName = (value) => {
        this.setState({ name: value});
    }

    setMobileNumber = (value) => {
        this.setState({ mobileNumber: value });
    }

    setEnrollmentNumber = (value) => {
        this.setState({ enrollmentNumber: value });
    }

    setPassword = (value) => {
        this.setState({ password : value });
    }

    setPassword2 = (value) => {
        this.setState({ password2 : value });
    }

    handleSignUp = async () => {
        if(this.state.email == '') {
            ToastAndroid.show('Enter Email', ToastAndroid.SHORT);
            return;
        }
        if(this.state.name == '') {
            ToastAndroid.show('Enter Your Full Name', ToastAndroid.SHORT);
            return;
        }
        if(this.state.mobileNumber == 0) {
            ToastAndroid.show('Enter Mobile Number', ToastAndroid.SHORT);
            return;
        }
        if(this.state.mobileNumber.toString().length != 10) {
            ToastAndroid.show('Mobile Number Should Be Of 10 Digit', ToastAndroid.SHORT);
            return;
        }
        if(this.state.enrollmentNumber == 0) {
            ToastAndroid.show('Enter Enrollment Number', ToastAndroid.SHORT);
            return;
        }
        if(this.state.enrollmentNumber.toString().length != 12) {
            ToastAndroid.show('Enrollment Number Should Be Of 12 Digit', ToastAndroid.SHORT);
            return;
        }
        if(this.state.password == '') {
            ToastAndroid.show('Enter Password', ToastAndroid.SHORT);
            return;
        }
        if(this.state.password2 == '') {
            ToastAndroid.show('Enter Confirm Password', ToastAndroid.SHORT);
            return;
        }
        if(this.state.password != this.state.password2) {
            ToastAndroid.show('Passwords Does Not Match!', ToastAndroid.SHORT);
        }
        const { navigation } = this.state;
        navigation.navigate('detailFormSignup', {
            selectedDepartmentId: this.state.selectedDepartmentId,
            selectedDepartmentName: this.state.selectedDepartmentName,
            selectedInstituteId: this.state.selectedInstituteId,
            selectedInstituteName: this.state.selectedInstituteName,
            selectedUniversityId: this.state.selectedUniversityId,
            selectedUniversityName: this.state.selectedUniversityName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            name: this.state.name,
            mobile_number: this.state.mobileNumber,
            enrollment_number: this.state.enrollmentNumber,
        });
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }

    render() {
        return(
            <View 
                style={{
                    flex: 1,
                    // justifyContent: 'center',
                    // alignItems: 'center',
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
                            SIGN UP
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
                        alignItems: 'center',
                    }}
                    >
                    {/* <View
                        style={{
                            margin: 20,
                            width: '85%',
                        }}>
                        <Text
                            style={{
                                fontSize: 25,
                            }}>
                            Sign Up
                        </Text>
                    </View> */}
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
                            placeholder="FIRSTNAME MIDDLENAME LASTNAME"
                            placeholderTextColor="#AAA"
                            style={{
                                marginVertical: 5,
                                borderBottomWidth: 1,
                                color: '#000'
                            }}
                            onChangeText={this.setName}
                            />
                        <TextInput 
                            placeholder="Mobile Number"
                            keyboardType='number-pad'
                            placeholderTextColor="#AAA"
                            maxLength={10}
                            style={{
                                marginVertical: 5,
                                borderBottomWidth: 1,
                                color: '#000'
                            }}
                            onChangeText={this.setMobileNumber}
                            />
                        <TextInput 
                            placeholder="ENROLLMENT NUMBER"
                            keyboardType='number-pad'
                            placeholderTextColor="#AAA"
                            maxLength={12}
                            style={{
                                marginVertical: 5,
                                borderBottomWidth: 1,
                                color: '#000'
                            }}
                            onChangeText={this.setEnrollmentNumber}
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
                        <TextInput 
                            placeholder="CONFIRM PASSWORD"
                            secureTextEntry={true}
                            placeholderTextColor="#AAA"
                            style={{
                                marginVertical: 5,
                                borderBottomWidth: 1,
                                color: '#000'
                            }}
                            onChangeText={this.setPassword2}
                            />
                    </View>
                    <View
                        style={{
                            margin: 20,
                            padding: 10,
                            width: '80%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0.5,
                            borderRadius: 50,
                        }}>
                        <TouchableOpacity
                            onPress={this.handleSignUp}
                            >
                            <Text
                                style={{
                                    fontSize: 20,
                                }}>
                                CONTINUE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default SignUp;
