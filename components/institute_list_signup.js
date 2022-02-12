import React  from "react";
import { View, Text, TouchableOpacity, ToastAndroid, Image } from "react-native";

import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { Bar } from 'react-native-progress';

class InstituteListSignup extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            selectedUniversityId: props.route.params.selectedUniversityId,
            selectedUniversityName: props.route.params.selectedUniversityName,
            isLoading: false,
            selectedInstitute: 0,
            selectedInstituteName: '',
            institutes: [
                {
                    'id': 0,
                    'institute_name': 'Select',
                },
            ],
        };
    }

    componentDidMount = () => {
        this.setState({ isLoading: true }, () => {
            this.fetchInstitutes().then(() => {
                this.setState({ isLoading: false });
            });
        });
    }

    fetchInstitutes = async () => {
        await axios.get('https://jdarshan1210.pythonanywhere.com/university/api/fetchInstitutes/', {
            params: {
                'university_id': this.state.selectedUniversityId,
            }
        }).then(res => {
            if(res.status == 200) {
                this.setState({ institutes: this.state.institutes.concat(res.data) });
            }
        }).finally(() => {
            this.setState({ isLoading: false });
        });
    }

    setSelectedInstitute = (itemValue) => {
        // console.log(itemValue, typeof(itemValue));
        this.setState({ selectedInstitute: itemValue }, () => {
            // console.log(this.state.selectedInstitute);
            this.state.institutes.find((dic) => {
                if(dic.id == this.state.selectedInstitute) {
                    this.setState({ selectedInstituteName: dic.institute_name }, () => {
                        // console.log(this.state.selectedInstituteName);
                    });
                }
            });
        });
    }

    navigateToDepartmentListSignup = () => {
        const { navigation } = this.state;
        if(this.state.selectedInstitute == 0) {
            ToastAndroid.show('Select an Institute', ToastAndroid.LONG);
            return;
        }
        navigation.navigate('departmentListSignup', {
            selectedInstituteId: this.state.selectedInstitute,
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
        let institute_list = this.state.institutes.map((value, index) => {
            return <Picker.Item label={value.institute_name} value={value.id} key={value.id} />
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
                                    Select Your Institute
                                </Text>
                            </View>
                            <Picker 
                                style={{
                                    width: '90%',
                                }}
                                selectedValue={this.state.selectedInstitute}
                                onValueChange={this.setSelectedInstitute}
                                mode='dialog'
                                >
                                {institute_list}
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
                                onPress={this.navigateToDepartmentListSignup}
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

export default InstituteListSignup;
