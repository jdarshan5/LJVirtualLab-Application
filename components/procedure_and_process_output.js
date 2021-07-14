import React from 'react';
import { View, Text, Image } from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

class Output extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            output: props.route.params.output,
        };
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
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
                            Practical Output
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
                        marginHorizontal: 15,
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 18,
                        }}
                        >
                        {this.state.output}
                    </Text>
                </View>
            </View>
        )
    }
}

export default Output;
