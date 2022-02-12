import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import axios from "axios";
import { Bar } from 'react-native-progress';

class DetailFormSignup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            navigation: props.navigation,
            selectedDepartmentId: props.route.params.selectedDepartmentId,
            selectedDepartmentName: props.route.params.selectedDepartmentName,
            selectedInstituteId: props.route.params.selectedInstituteId,
            selectedInstituteName: props.route.params.selectedInstituteName,
            selectedUniversityId: props.route.params.selectedUniversityId,
            selectedUniversityName: props.route.params.selectedUniversityName,
            email: props.route.params.email,
            password: props.route.params.password,
            password2: props.route.params.password2,
            name: props.route.params.name,
            mobile_number: props.route.params.mobile_number,
            enrollment_number: props.route.params.enrollment_number,
        };
    }

    handleSignup = () => {
        this.setState({ isLoading: true }, () => {
            const form = new FormData();
            form.append('email', this.state.email);
            form.append('password', this.state.password);
            form.append('password2', this.state.password2);
            form.append('department_id', this.state.selectedDepartmentId);
            form.append('user_name', this.state.name);
            form.append('user_mobile_number', this.state.mobile_number);
            form.append('user_enrollment_number', this.state.enrollment_number);
            axios.post('https://jdarshan1210.pythonanywhere.com/user/api/register/', form).then(res => {
                if(res.status == 200) {
                    alert('Your Accont Has Been Registered, Please Wait Untill You Are Approved.');
                    this.setState({ isLoading: false });
                    const { navigation } = this.state;
                    navigation.popToTop();
                } else if(res.status == 202) {
                    let error_msg = ''
                    for(let i in res.data) {
                        error_msg += i + ': ' + res.data[i][0] + '\n';
                    }
                    alert(error_msg);
                    this.setState({ isLoading: false });
                }
            }).catch(errors => {
                console.log(errors);
                ToastAndroid.show('Technical Erro', ToastAndroid.SHORT);
                this.setState({ isLoading: false });
            });
        });
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
                        alignItems: 'center',
                    }}
                    >
                    <View
                        style={{
                            marginVertical: 30,
                            width: '85%',
                            justifyContent: 'center',
                        }}
                        >
                        <Text
                            style={{
                                fontSize: 18,
                            }}
                            >
                            Please Verify Your Details
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '90%',
                            borderWidth: 0.3,
                            borderRadius: 5,
                            padding: 5,
                        }}
                        >
                        <Text
                            style={{
                                fontSize: 18,
                                marginVertical: 5,
                            }}
                            >
                            University Name: {this.state.selectedUniversityName}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                marginVertical: 5,
                            }}
                            >
                            Institute Name: {this.state.selectedInstituteName}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                marginVertical: 5,
                            }}
                            >
                            Department Name: {this.state.selectedDepartmentName}
                        </Text>    
                        <Text
                            style={{
                                fontSize: 18,
                                marginVertical: 5,
                            }}
                            >
                            Email: {this.state.email}
                        </Text>    
                        <Text
                            style={{
                                fontSize: 18,
                                marginVertical: 5,
                            }}
                            >
                            Password: {this.state.password}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                marginVertical: 5,
                            }}
                            >
                            Name: {this.state.name}
                        </Text>    
                        <Text
                            style={{
                                fontSize: 18,
                                marginVertical: 5,
                            }}
                            >
                            Mobile Number: {this.state.mobile_number}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                marginVertical: 5,
                            }}
                            >
                            Enrollment Number: {this.state.enrollment_number}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '40%',
                            margin: 30,
                            padding: 10,
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 10,
                        }}
                        >
                        <TouchableOpacity
                            onPress={this.handleSignup}
                            >
                            <Text
                                style={{
                                    fontSize: 20,
                                }}
                                >
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default DetailFormSignup;
