import React  from "react";
import { View, Text, TouchableOpacity, ToastAndroid, Image } from "react-native";

import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { Bar } from 'react-native-progress';

class UniversityListSignup extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            isLoading: false,
            selectedUniversity: 0,
            selectedUniversityName: '',
            universities: [
                {
                    'id': 0,
                    'university_name': 'Select',
                },
            ],
        };
    }

    componentDidMount = () => {
        this.setState({ isLoading: true }, () => {
            this.fetchUniversities().then(() => {
                this.setState({ isLoading: false });
            });
        });
    }

    fetchUniversities = async () => {
        await axios.get('https://jdarshan1210.pythonanywhere.com/university/api/fetchUniversities/')
        .then(res => {
            if(res.status == 200) {
                this.setState({ universities: this.state.universities.concat(res.data) });
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.setState({ isLoading: false });
        });
    }

    setSelectedUniversity = (itemValue, itemIndex) => {
        this.setState({ selectedUniversity: itemValue }, () => {
            this.state.universities.find((dic) => {
                if(dic.id == this.state.selectedUniversity) {
                    this.setState({ selectedUniversityName: dic.university_name }, () => {
                    });
                }
            });
        });
    }

    navigateToInstituteListSignup = () => {
        const { navigation } = this.state;
        if(this.state.selectedUniversity == 0) {
            ToastAndroid.show('Select a University', ToastAndroid.LONG);
            return;
        }
        navigation.navigate('instituteListSignup', {
            selectedUniversityId: this.state.selectedUniversity,
            selectedUniversityName: this.state.selectedUniversityName,
        });
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }
    
    render() {
        let university_list = this.state.universities.map((value, index) => {
            return <Picker.Item label={value.university_name} value={value.id} key={value.id} />
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
                                    Select Your University
                                </Text>
                            </View>
                            <Picker 
                                style={{
                                    width: '90%',
                                }}
                                selectedValue={this.state.selectedUniversity}
                                onValueChange={this.setSelectedUniversity}
                                mode='dialog'
                                >
                                {university_list}
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
                                onPress={this.navigateToInstituteListSignup}
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

export default UniversityListSignup;
