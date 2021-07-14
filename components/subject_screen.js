import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';

import axios from 'axios';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

class Subject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            refreshing: false,
            department: props.route.params.department,
            subjects: [],
        }
    }

    componentDidMount = () => {
        console.log(this.state.department);
        this.fetchSubjects();
    }

    fetchSubjects = async () => {
        await axios.get('http://79f502ad1517.ngrok.io/api/fetchSubjects/', {
            params: {
                department: this.state.department,
            }
        }).then(res => {
            if(res.status == 200) {
                console.log(res.data);
                this.setState({ subjects: res.data });
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }

    renderSubjects = ({ item }) => {
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
                        navigation.navigate('practical', {
                            subject: item.id,
                        });
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'center',
                        }}
                        >
                        {item.sub_name}, {item.sub_code}
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
                            Subjects
                        </Text>
                    </View>
                    <Image 
                        source={require('../static/lj_logo.png')} 
                        style={{
                            height: 30,
                            width: 30,
                        }}/>
                </View>
                {this.state.subjects.length == 0 ?
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
                            No Subjects Yet
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
                            data={this.state.subjects}
                            renderItem={this.renderSubjects}
                            keyExtractor={item => item.id}
                            refreshControl={
                                <RefreshControl 
                                    enabled={true}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this.setState({ refreshing : true });
                                        console.log('refreshing');
                                        this.fetchSubjects().then(() => {
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

export default Subject;
