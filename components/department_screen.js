import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, RefreshControl } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

class Department extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            refreshing: false,
            departments: [],
        };
    }

    componentDidMount = async () => {
        this.fetchDepartments();
        // axios.get('http://79f502ad1517.ngrok.io/api/fetchDepartments/', {
        //     params: {
        //         'university': await AsyncStorage.getItem('university_id'),
        //     }
        // }).then(res => {
        //     if(res.status == 200) {
        //         console.log(res.data);
        //         this.setState({ departments: res.data });
        //     }
        // }).catch(errors => {
        //     console.log(errors);
        // });
    }

    fetchDepartments = async () => {
        await axios.get('http://79f502ad1517.ngrok.io/api/fetchDepartments/', {
            params: {
                'university': await AsyncStorage.getItem('university_id'),
            }
        }).then(res => {
            if(res.status == 200) {
                console.log(res.data);
                this.setState({ departments: res.data });
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    navigateToSubject = () => {
        const { navigation } = this.state;
        navigation.navigate('subject');
    }

    renderDepartments = ({ item }) => {
        return(
            <View 
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginVertical: 5,
                    borderWidth: 1,
                    borderRadius: 10,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        const { navigation } = this.state;
                        navigation.navigate('subject', {
                            department: item.id,
                        });
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'center',
                        }}
                        >
                        {item.dept_name}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFF',
                }}>
                <View
                    style={{
                        margin: 15,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: '700',
                        }}
                        >
                        Departments
                    </Text>
                    <Image 
                        source={require('../static/lj_logo.png')} 
                        style={{
                            height: 30,
                            width: 30,
                        }}/>
                </View>
                {this.state.departments.length == 0 ?
                    <View 
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                            >
                            No Departments Yet
                        </Text>
                    </View>
                    :
                    <View 
                        style={{
                            marginHorizontal: 15,
                            flex: 1,
                        }}
                        >
                        <FlatList 
                            data={this.state.departments}
                            renderItem={this.renderDepartments}
                            keyExtractor={item => item.id}
                            refreshControl={
                                <RefreshControl 
                                    enabled={true}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this.setState({ refreshing : true });
                                        console.log('refreshing');
                                        this.fetchDepartments().then(() => {
                                            this.setState({ refreshing: false });
                                        });
                                    }}
                                    />
                            }
                            />
                    </View>
                    }
            </View>
        )
    }
}

export default Department;
