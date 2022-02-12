import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            refreshing: false,
            courses: [],
            department_id: 0,
        }
    }

    componentDidMount = () => {
        this.setState({ refreshing: true }, () => {
            this.fetchCourses().then(() => {
                this.setState({ refreshing: false });
            });
        });
    }

    fetchCourses = async () => {
        const token = await AsyncStorage.getItem('token');
        const department_id = await AsyncStorage.getItem('department_id');
        await axios.get('https://jdarshan1210.pythonanywhere.com/university/api/fetchCourses/', {
            params: {
                department_id: department_id,
            },
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json',
            },
        }).then(res => {
            if(res.status == 200) {
                // console.log(res.data);
                this.setState({ courses: res.data });
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }

    renderCourses = ({ item }) => {
        return(
            <View 
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginVertical: 5,
                    borderBottomWidth: 1,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        const { navigation } = this.state;
                        navigation.navigate('practical', {
                            course_id: item.id,
                        });
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'left',
                        }}
                        >
                        {item.courses_name}, {item.courses_code}
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
                    <View 
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: '700',
                            }}
                            >
                            Courses
                        </Text>
                    </View>
                    <Image 
                        source={require('../static/lj_logo.png')} 
                        style={{
                            height: 30,
                            width: 30,
                        }}/>
                </View>
                {this.state.courses.length == 0 ?
                    <View 
                        style={{
                            flex: 1,
                        }}
                        >
                        <ScrollView
                            style={{
                                flex: 1,
                            }}
                            refreshControl={
                                <RefreshControl 
                                    enabled={true}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this.setState({ refreshing : true });
                                        console.log('refreshing');
                                        this.fetchCourses().then(() => {
                                            this.setState({ refreshing: false });
                                        });
                                    }}
                                    />
                            }
                            >
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                >
                                <Text
                                    style={{
                                        fontSize: 18,
                                    }}
                                    >
                                    {this.state.refreshing ? null : 'No Courses Available' }
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                    :
                    <View 
                        style={{
                            marginHorizontal: 15,
                            flex: 1,
                        }}
                        >
                        <FlatList 
                            data={this.state.courses}
                            renderItem={this.renderCourses}
                            keyExtractor={item => item.id}
                            refreshControl={
                                <RefreshControl 
                                    enabled={true}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this.setState({ refreshing : true });
                                        console.log('refreshing');
                                        this.fetchCourses().then(() => {
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

export default Course;
