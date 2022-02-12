import React from "react";
import { View, Text, PixelRatio, ScrollView, Image } from "react-native";

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import YouTube from 'react-native-youtube';

class YoutubeVideo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            id: props.route.params.id,
            practical_id: props.route.params.practical_id,
            youtube_video_links: props.route.params.youtube_video_links,
            youtube_video_title: props.route.params.youtube_video_title,
            containerYoutubeVideoWidth: null,
            practical_procedure: props.route.params.practical_procedure,
            practical_application: props.route.params.practical_application,
            practical_advantages: props.route.params.practical_advantages,
            practical_conclusion: props.route.params.practical_conclusion,
        };
    }

    navigateBack = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }

    render() {
        String.prototype.interpolate = function(params) {
            const names = Object.keys(params);
            const vals = Object.values(params);
            return new Function(...names, `return \`${this}\`;`)(...vals);
        }
        // {this.state.practical_procedure.interpolate(this.state)}
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
                            Practical Video
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
                    onLayout={evt => {
                        this.setState({ containerYoutubeVideoWidth: evt.nativeEvent.layout.width });
                    }}>
                    <YouTube 
                        apiKey='AIzaSyCsZTEe-odkC8eW2nCxfTnBgRbOIHkQSAw'
                        videoId={this.state.youtube_video_links.split("v=")[1].substring(0, 11)}
                        style={{
                            height: PixelRatio.roundToNearestPixel(this.state.containerYoutubeVideoWidth / ( 16 / 9 ),),
                            alignSelf: 'stretch',
                        }}
                        />
                </View>
                <ScrollView
                    style={{
                        marginHorizontal: 10,
                    }}
                    >
                    {this.state.practical_procedure == '' ? 
                        null
                        :
                        <View
                            style={{
                                marginVertical: 10,
                            }}
                            >
                            <View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                    }}
                                    >
                                    Procedure
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginHorizontal: 10,
                                }}
                                >
                                <Text>
                                    {this.state.practical_procedure.interpolate(this.state)}
                                </Text>
                            </View>
                        </View>
                        }
                    {this.state.practical_application == '' ? 
                        null
                        :
                        <View
                            style={{
                                marginVertical: 10,
                            }}
                            >
                            <View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                    }}
                                    >
                                    Application
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginHorizontal: 10,
                                }}
                                >
                                <Text>
                                    {this.state.practical_application}
                                </Text>
                            </View>
                        </View>
                        }
                    {this.state.practical_advantages == "" ? 
                        null
                        :
                        <View
                            style={{
                                marginVertical: 10,
                            }}
                            >
                            <View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                    }}
                                    >
                                    Advantages
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginHorizontal: 10,
                                }}
                                >
                                <Text>
                                    {this.state.practical_advantages}
                                </Text>
                            </View>
                        </View>
                        }
                    {this.state.practical_conclusion == "" ? 
                        null
                        :
                        <View
                            style={{
                                marginVertical: 10,
                            }}
                            >
                            <View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                    }}
                                    >
                                    Conclusion
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginHorizontal: 10,
                                }}
                                >
                                <Text>
                                    {this.state.practical_conclusion}
                                </Text>
                            </View>
                        </View>
                        }
                </ScrollView>
            </View>
        )
    }
}

export default YoutubeVideo;
