import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class LoginSignup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
        }
    }

    navigateToLogin = () => {
        const { navigation } = this.state;
        navigation.navigate('login');
    }

    navigateToUniversityListSignup = () => {
        const { navigation } = this.state;
        navigation.navigate('universityListSignup');
    }

    render() {
        return(
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                }}
                >
                <View
                    style={{
                        width: '100%',
                        flex: 1,
                        justifyContent: 'center',
                    }}
                    >
                    <View
                        style={{
                            marginVertical: 20,
                            alignItems: 'center',
                        }}
                        >
                        <Text
                            style={{
                                fontSize: 40,
                                color: '#000',
                                fontWeight: 'normal',
                                textShadowColor: 'black',
                            }}
                            >
                            Virtual Lab
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                        >
                        <TouchableOpacity
                            style={{
                                margin: 20,
                                padding: 10,
                                width: '80%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 0.1,
                                borderRadius: 10,
                            }}
                            onPress={this.navigateToLogin}
                            >
                            <Text
                                style={{
                                    fontSize: 20,
                                }}
                                >
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                margin: 20,
                                padding: 10,
                                width: '80%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 0.1,
                                borderRadius: 10,
                            }}
                            onPress={this.navigateToUniversityListSignup}
                            >
                            <Text
                                style={{
                                    fontSize: 20,
                                }}
                                >
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 10,
                    }}
                    >
                    <Image 
                        source={require('../static/logo.png')}
                        style={{
                            width: '40%',
                            height: 60,
                        }}
                        resizeMode='contain'
                        />
                </View>
            </View>
        )
    }
}

export default LoginSignup

