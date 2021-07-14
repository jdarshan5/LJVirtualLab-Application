import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';

import axios from 'axios';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

class Practical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            refreshing: false,
            subject: props.route.params.subject,
            practicals: [],
        };
    }

    componentDidMount = () => {
        this.fetchPracticals();
    }

    fetchPracticals = async () => {
        await axios.get('http://79f502ad1517.ngrok.io/api/fetchPracticals/', {
            params: {
                subject: this.state.subject,
            }
        }).then(res => {
            if(res.status == 200) {
                console.log(res.data);
                this.setState({ practicals: res.data });
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }

    renderPracticals = ({ item }) => {
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
                        navigation.navigate('practicalDetail', {
                            practical_id: item.id,
                            practical_name: item.practical_name,
                            practical_link: item.yt_link,
                            practical_file: item.excel_file,
                        });
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'center',
                        }}
                        >
                        {item.practical_name}
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
                            Practicals
                        </Text>
                    </View>
                    <Image 
                        source={require('../static/lj_logo.png')} 
                        style={{
                            height: 30,
                            width: 30,
                        }}/>
                </View>
                {this.state.practicals.length == 0 ?
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
                            No Practicals Yet
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
                            data={this.state.practicals}
                            renderItem={this.renderPracticals}
                            keyExtractor={item => item.id}
                            refreshControl={
                                <RefreshControl 
                                    enabled={true}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this.setState({ refreshing : true });
                                        console.log('refreshing');
                                        this.fetchPracticals().then(() => {
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

export default Practical;
