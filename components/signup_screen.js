import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import Context from './context';
import axios from 'axios';

class SignUp extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            email: '',
            first_name: '',
            last_name: '',
            enrollmentNumber: 0,
            password: '',
            password2: '',
            selectedUniversity: 0,
            universities: [
                {
                    'id': 0,
                    'univ_name': 'Select University',
                }],
        };
    }

    componentDidMount = () => {
        axios.get('http://79f502ad1517.ngrok.io/api/fetchUniversities/').then(res => {
            if(res.status == 200) {
                console.log(res.data);
                this.setState({ universities: this.state.universities.concat(res.data) });
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    setSelectedUniversity = (itemValue) => {
        console.log(itemValue, typeof(itemValue));
        this.setState({ selectedUniversity: itemValue }, () => {
            console.log(this.state.selectedUniversity);
        });
    }

    setEmail = (value) => {
        this.setState({ email: value});
    }

    setFirstName = (value) => {
        this.setState({ first_name: value});
    }

    setLastName = (value) => {
        this.setState({ last_name: value});
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
            alert('Enter Email');
            return;
        }
        if(this.state.first_name == '') {
            alert('Enter First Name');
            return;
        }
        if(this.state.last_name == '') {
            alert('Enter Last Name');
            return;
        }
        if(this.state.enrollmentNumber == '') {
            alert('Enter Enrollment Number');
            return;
        }
        if(this.state.enrollmentNumber.toString().length != 12) {
            alert('Enrollment Number Should Be Of 12 Digit');
        }
        if(this.state.password == '') {
            alert('Enter Password');
            return;
        }
        if(this.state.password2 == '') {
            alert('Enter Confirm Password');
            return;
        }
        if(this.state.password != this.state.password2) {
            alert('Passwords Does Not Match!');
        }
        if(this.state.selectedUniversity == 0) {
            alert('Select A University');
            return;
        }
        const form = new FormData();
        form.append('email', this.state.email);
        form.append('first_name', this.state.first_name);
        form.append('last_name', this.state.last_name);
        form.append('enrollment', this.state.enrollmentNumber);
        form.append('university', this.state.selectedUniversity);
        form.append('password', this.state.password);
        form.append('password2', this.state.password2);
        axios.post('http://79f502ad1517.ngrok.io/api/register/', form).then(res => {
            if(res.status == 200) {
                console.log(res.data);
                if(res.data == 0) {
                    alert('Your Accont Has Been Registered, Please Wait Untill You Are Approved.');
                    const { navigation } = this.state;
                    navigation.goBack();
                } else {
                    alert(Object.values(res.data));
                }
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    render() {
        let university_list = this.state.universities.map((value, index) => {
            return <Picker.Item label={value.univ_name} value={value.id} key={value.id} />
        });
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
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                        }}>
                        Sign Up
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
                        placeholder="FIRST NAME"
                        placeholderTextColor="#AAA"
                        style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            color: '#000'
                        }}
                        onChangeText={this.setFirstName}
                        />
                    <TextInput 
                        placeholder="LAST NAME"
                        placeholderTextColor="#AAA"
                        style={{
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            color: '#000'
                        }}
                        onChangeText={this.setLastName}
                        />
                    <TextInput 
                        placeholder="ENROLLMENT NUMBER"
                        keyboardType='number-pad'
                        placeholderTextColor="#AAA"
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
                    <Picker
                        selectedValue={this.state.selectedUniversity}
                        onValueChange={this.setSelectedUniversity}
                        mode='dropdown'
                        style={{
                            color: '#000',
                        }}
                        >
                        {university_list}
                    </Picker>
                </View>
                <View
                    style={{
                        margin: 20,
                    }}>
                    <TouchableOpacity
                        onPress={this.handleSignUp}
                        >
                        <Text
                            style={{
                                fontSize: 16,
                            }}>
                            Click To Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default SignUp;
