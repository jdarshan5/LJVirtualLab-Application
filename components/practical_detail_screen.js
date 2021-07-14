import React from 'react';
import { View, Text, Image, Linking, ToastAndroid, TouchableOpacity } from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

class PracticalDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            practical_id: props.route.params.practical_id,
            practical_name: props.route.params.practical_name,
            practical_link: props.route.params.practical_link,
            practical_file: props.route.params.practical_file,
        };
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }

    navigateToInput = () => {
        const { navigation } = this.state;
        navigation.navigate('input', {
            excel_file: this.state.practical_file,
            practical_id: this.state.practical_id,
        });
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
                                fontSize: 18,
                                fontWeight: '700',
                            }}
                            >
                            Practical
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
                        marginHorizontal: 15,
                    }}
                    >
                    <View 
                        style={{
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '700',
                            }}
                            >
                            {this.state.practical_name}
                        </Text>
                    </View>
                    <View 
                        style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                paddingRight: 10,
                            }}
                            >
                            Youtube Link
                        </Text>
                        <FontistoIcon 
                            name='youtube-play' 
                            size={20} 
                            color='red' 
                            onPress={async () => {
                                console.log('Youtube!');
                                const supported = await Linking.canOpenURL(this.state.practical_link);
                                if(supported) {
                                    await Linking.openURL(this.state.practical_link);
                                } else {
                                    ToastAndroid.show('Unable to open the youtube link...!', ToastAndroid.LONG);
                                }
                            }}/>
                    </View>
                    {this.state.practical_file ? 
                        <View
                            style={{
                                padding: 10,
                            }}
                            >
                            <TouchableOpacity
                                onPress={this.navigateToInput}
                                >
                                <Text
                                    style={{
                                        fontSize: 18,
                                    }}
                                    >
                                    Procedure And Process
                                </Text>
                            </TouchableOpacity>
                        </View>    
                        :
                        null
                        }
                    
                </View>
            </View>
        )
    }
}

export default PracticalDetail;
