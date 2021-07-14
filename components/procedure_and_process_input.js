import axios from 'axios';
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

class Input extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            practical_id: props.route.params.practical_id,
            excel_file: props.route.params.excel_file,
            practical_values: [],
        };
    }

    componentDidMount = () => {
        axios.get('http://79f502ad1517.ngrok.io/api/fetchPracticalValues/', {
            params: {
                practical: this.state.practical_id,
            }
        }).then(res => {
            if(res.status == 200) {
                this.setState({ practical_values: res.data }, () => {
                    console.log(this.state.practical_values);
                });
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }

    render() {
        let practicals = this.state.practical_values.map((value, index) => {
            return (
                <View 
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 5,
                        marginVertical: 5,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginHorizontal: 15,
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            const { navigation } = this.state;
                            navigation.navigate('output', {
                                output: value.output,
                            });
                        }}
                        >
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: 'center',
                            }}
                            >
                            {value.input}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
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
                            Practical Input
                        </Text>
                    </View>
                    <Image 
                        source={require('../static/lj_logo.png')} 
                        style={{
                            height: 30,
                            width: 30,
                        }}/>
                </View>
                {/* <View 
                    style={{
                        marginHorizontal: 15,
                    }}
                    >
                    <FlatList 
                        data={this.state.practicals}
                        renderItem={this.renderPracticals}
                        keyExtractor={item => item.id}
                        />
                </View> */}
                {practicals}
            </View>
        )
    }
}

export default Input;
