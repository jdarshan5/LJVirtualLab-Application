import React  from "react";
import { View, Text, TouchableOpacity, ToastAndroid, Image } from "react-native";

import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { Bar } from 'react-native-progress';

class DepartmentListSignup extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            selectedUniversityId: props.route.params.selectedUniversityId,
            selectedUniversityName: props.route.params.selectedUniversityName,
            selectedInstituteId: props.route.params.selectedInstituteId,
            selectedInstituteName: props.route.params.selectedInstituteName,
            isLoading: false,
            selectedDepartment: 0,
            selectedDepartmentName: '',
            departments: [
                {
                    'id': 0,
                    'department_name': 'Select',
                },
            ],
        };
    }

    componentDidMount = () => {
        this.setState({ isLoading: true }, () => {
            this.fetchDepartments().then(() => {
                this.setState({ isLoading: false });
            });
        });
    }

    fetchDepartments = async () => {
        await axios.get('https://jdarshan1210.pythonanywhere.com/university/api/fetchDepartments/', {
            params: {
                'institute_id': this.state.selectedInstituteId,
            }
        }).then(res => {
            if(res.status == 200) {
                // console.log(res.data);
                this.setState({ departments: this.state.departments.concat(res.data) });
            }
        }).finally(() => {
            this.setState({ isLoading: false });
        });
    }

    setSelectedDepartment = (itemValue) => {
        // console.log(itemValue, typeof(itemValue));
        this.setState({ selectedDepartment: itemValue }, () => {
            // console.log(this.state.selectedDepartment);
            this.state.departments.find((dic) => {
                if(dic.id == this.state.selectedDepartment) {
                    this.setState({ selectedDepartmentName: dic.department_name }, () => {
                        // console.log(this.state.selectedDepartmentName);
                    });
                }
            });
        });
    }

    navigateToSignup = () => {
        const { navigation } = this.state;
        if(this.state.selectedDepartment == 0) {
            ToastAndroid.show('Select a Department', ToastAndroid.LONG);
            return;
        }
        navigation.navigate('signup', {
            selectedDepartmentId: this.state.selectedDepartment,
            selectedDepartmentName: this.state.selectedDepartmentName,
            selectedInstituteId: this.state.selectedInstituteId,
            selectedInstituteName: this.state.selectedInstituteName,
            selectedUniversityId: this.state.selectedUniversityId,
            selectedUniversityName: this.state.selectedUniversityName,
        });
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }
    
    render() {
        let department_list = this.state.departments.map((value, index) => {
            return <Picker.Item label={value.department_name} value={value.id} key={value.id} />
        });
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
                {this.state.isLoading ?
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
                    :
                    <View>
                        <View
                            style={{
                                marginVertical: 20,
                                width: '100%',
                                alignItems: 'center',
                            }}
                            >
                            <View
                                style={{
                                    marginLeft: 20,
                                    width: '90%',
                                    alignItems: 'flex-start',
                                }}
                                >
                                <Text
                                    style={{
                                        fontSize: 18,
                                    }}
                                    >
                                    Select Your Department
                                </Text>
                            </View>
                            <Picker 
                                style={{
                                    width: '90%',
                                }}
                                selectedValue={this.state.selectedDepartment}
                                onValueChange={this.setSelectedDepartment}
                                mode='dialog'
                                >
                                {department_list}
                            </Picker>
                        </View>
                        <View
                            style={{
                                margin: 30,
                                alignItems: 'center',
                            }}
                            >
                            <TouchableOpacity
                                style={{
                                    width: '50%',
                                    padding: 10,
                                    alignItems: 'center',
                                    borderWidth: 0.2,
                                    borderRadius: 10,
                                }}
                                disabled={this.state.isLoading}
                                onPress={this.navigateToSignup}
                                >
                                <Text
                                    style={{
                                        fontSize: 20,
                                    }}
                                    >
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
            </View>
        )
    }
}

export default DepartmentListSignup;
