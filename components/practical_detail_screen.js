import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity, Dimensions, FlatList, ScrollView, PixelRatio } from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import FastImage from 'react-native-fast-image';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calculations from './practical_calculation';

const deviceWidth = Dimensions.get('window').width;

class PracticalDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            navigation: props.navigation,
            practical_id: props.route.params.practical_id,
            practical_name: props.route.params.practical_name,
            practical_feature_image: 'https://jdarshan1210.pythonanywhere.com' + props.route.params.practical_feature_image,
            practical_procedure: props.route.params.practical_procedure,
            practical_application: props.route.params.practical_application,
            practical_advantages: props.route.params.practical_advantages,
            practical_conclusion: props.route.params.practical_conclusion,
            practical_calculation: props.route.params.practical_calculation,
            youtube_links: [],
            containerFastImageWidth: 0,
            imageHeight: 200,
            imageWidth: 0,
            values: {
                    // "input": {
                    //     "V": ["75","70","65","60","55","50","45","40","35","30","25","20"
                    //     ],
                    //     "I": [
                    //         "0.25",
                    //         "0.23",
                    //         "0.2",
                    //         "0.2",
                    //         "0.18",
                    //         "0.15",
                    //         "0.12",
                    //         "0.11",
                    //         "0.09",
                    //         "0.07",
                    //         "0.06",
                    //         "0.01"
                    //     ],
                    //     "Q": [
                    //         "0.25",
                    //         "0.23",
                    //         "0.2",
                    //         "0.2",
                    //         "0.18",
                    //         "0.15",
                    //         "0.12",
                    //         "0.11",
                    //         "0.09",
                    //         "0.07",
                    //         "0.06",
                    //         "0.01"
                    //     ],
                    //     "T1": [
                    //         "105.2",
                    //         "96.5",
                    //         "84.0",
                    //         "83.7",
                    //         "73.0",
                    //         "67.3",
                    //         "57.1",
                    //         "54.8",
                    //         "46.6",
                    //         "42.1",
                    //         "41.1",
                    //         "34.2"
                    //     ],
                    //     "T2": [
                    //         "105.3",
                    //         "96.4",
                    //         "84.2",
                    //         "83.4",
                    //         "73.2",
                    //         "66.0",
                    //         "56.7",
                    //         "54.7",
                    //         "46.5",
                    //         "42.3",
                    //         "41.2",
                    //         "34.1"
                    //     ],
                    //     "T3": [
                    //         "105.4",
                    //         "96.4",
                    //         "84.3",
                    //         "83.5",
                    //         "73.3",
                    //         "66.7",
                    //         "56.8",
                    //         "54.6",
                    //         "46.7",
                    //         "42.0",
                    //         "41.2",
                    //         "34.2"
                    //     ],
                    //     "T4": [
                    //         "105.5",
                    //         "96.3",
                    //         "84.4",
                    //         "83.6",
                    //         "73.2",
                    //         "67.0",
                    //         "57.2",
                    //         "54.5",
                    //         "46.4",
                    //         "42.2",
                    //         "41.2",
                    //         "34.2"
                    //     ],
                    //     "T5": [
                    //         "37.5",
                    //         "37.8",
                    //         "36.7",
                    //         "37.8",
                    //         "35.2",
                    //         "37.4",
                    //         "34.0",
                    //         "36.9",
                    //         "34.4",
                    //         "33.5",
                    //         "33.6",
                    //         "33.0"
                    //     ],
                    //     "T6": [
                    //         "37.5",
                    //         "37.6",
                    //         "36.4",
                    //         "37.9",
                    //         "35.1",
                    //         "36.8",
                    //         "34.1",
                    //         "36.7",
                    //         "34.5",
                    //         "33.4",
                    //         "33.5",
                    //         "33.1"
                    //     ],
                    //     "T7": [
                    //         "37.6",
                    //         "37.5",
                    //         "36.5",
                    //         "37.6",
                    //         "35.2",
                    //         "37.3",
                    //         "34.0",
                    //         "36.3",
                    //         "34.8",
                    //         "33.6",
                    //         "33.3",
                    //         "33.2"
                    //     ],
                    //     "T8": [
                    //         "37.7",
                    //         "37.8",
                    //         "36.6",
                    //         "37.8",
                    //         "35.3",
                    //         "36.6",
                    //         "34.2",
                    //         "35.7",
                    //         "34.7",
                    //         "33.2",
                    //         "33.4",
                    //         "33.3"
                    //     ],
                    //     "T9": [
                    //         "37.5",
                    //         "37.7",
                    //         "36.4",
                    //         "37.5",
                    //         "35.2",
                    //         "36.6",
                    //         "34.3",
                    //         "35.9",
                    //         "34.4",
                    //         "33.5",
                    //         "33.3",
                    //         "33.2"
                    //     ],
                    //     "T10": [
                    //         "37.6",
                    //         "37.6",
                    //         "36.7",
                    //         "37.9",
                    //         "35.3",
                    //         "36.5",
                    //         "34.4",
                    //         "36.2",
                    //         "34.9",
                    //         "33.5",
                    //         "33.1",
                    //         "33.1"
                    //     ],
                    //     "Ti": [
                    //         "105.35",
                    //         "96.4",
                    //         "84.225",
                    //         "83.55000000000001",
                    //         "73.175",
                    //         "66.75",
                    //         "56.95",
                    //         "54.65",
                    //         "46.550000000000004",
                    //         "42.150000000000006",
                    //         "41.175000000000004",
                    //         "34.175000000000004"
                    //     ],
                    //     "To": [
                    //         "37.56666666666667",
                    //         "37.666666666666664",
                    //         "36.550000000000004",
                    //         "37.74999999999999",
                    //         "35.21666666666667",
                    //         "36.86666666666667",
                    //         "34.16666666666667",
                    //         "36.28333333333333",
                    //         "34.61666666666667",
                    //         "33.449999999999996",
                    //         "33.36666666666666",
                    //         "33.15"
                    //     ]
                    // },
                    // "output": {
                    //     "K": [
                    //         "0.8781481611577506",
                    //         "0.9458948164964055",
                    //         "1.0820619105883922",
                    //         "1.0397171969224368",
                    //         "1.1499660237311173",
                    //         "1.3279154383448863",
                    //         "1.5675619186957885",
                    //         "1.728459078731311",
                    //         "2.3277467411545616",
                    //         "2.736726874657906",
                    //         "2.5410377598211076",
                    //         "15.485869144405644"
                    //     ]
                    // },
                    // "f_input": {
                    //     "ri": [
                    //         "100.0"
                    //     ],
                    //     "ro": [
                    //         "200.0"
                    //     ]
                    // },
                    // "f_output": {}
            },
            mapIndexList: [],
        };
    }

    componentDidMount = () => {
        console.log(this.state.practical_calculation);
        this.setState({ isLoading: true }, () => {
            this.fetchYoutubeLinks().then(() => {
                // this.fetchPracticalValues();
            });
        });
    }

    fetchYoutubeLinks = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get('https://jdarshan1210.pythonanywhere.com/practical/api/fetchYoutubeLinks/', {
            params: {
                practical_id: this.state.practical_id,
            },
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if(res.status == 200) {
                // console.log(res.data);
                this.setState({ youtube_links: res.data });
            }
        }).catch(errors => {
            console.log(errors);
        });
    }

    fetchPracticalValues = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get('https://jdarshan1210.pythonanywhere.com/practical/api/fetchPracticalValues/', {
            params: {
                practical_id: this.state.practical_id,
            },
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json',
            }
        }).then(async res => {
            this.setState({ values: res.data}, () => {
                console.log(this.state.values);
                let key = Object.keys(this.state.values.input)[0];
                let arr = [];
                for(let i = 0; i < this.state.values.input[key].length; i++) {
                    arr.push({id: i, o_name: 'Observation ' + (i+1)});
                }
                this.setState({ mapIndexList: arr });
            });
        }).catch(errors => {
            console.log(errors);
        });
    }

    // fetchFeatureImage = () => {
    //     axios.get();
    // }

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

    navigateToYoutubeVideo = (value) => {
        const { navigation } = this.state;
        navigation.navigate('youtubeVideoScreen', {
            id: value.id,
            practical_id: value.practical_id,
            youtube_video_links: value.youtube_video_links,
            youtube_video_title: value.youtube_video_title,
            practical_procedure: this.state.practical_procedure,
            practical_application: this.state.practical_application,
            practical_advantages: this.state.practical_advantages,
            practical_conclusion: this.state.practical_conclusion,
        });
    }

    navigateToCalculation = () => {
        const { navigation } = this.state;
        navigation.navigate('calculation', {
            practical_id: this.state.practical_id,
            calculation: this.state.practical_calculation,
            values: this.state.values,
            mapIndexList: this.state.mapIndexList,
        });
    }

    render() {
        let youtube_videos = this.state.youtube_links.map((value, index) => {
            return(
                <View
                    key={index}
                    style={{
                        alignItems: 'center',
                    }}
                    >
                    <TouchableOpacity
                        onPress={() => this.navigateToYoutubeVideo(value)}
                        >
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                            >
                            {value.youtube_video_title}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        });
        const imguri = { uri : this.state.practical_feature_image };
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
                <ScrollView>
                    <View
                        style={{
                            marginHorizontal: 10,
                        }}
                        >
                        <View 
                            style={{
                                marginVertical: 10,
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '700',
                                }}
                                >
                                {this.state.practical_name}
                            </Text>
                        </View>
                        <View
                            onLayout={evt => {
                                this.setState({ containerFastImageWidth: evt.nativeEvent.layout.width });
                            }}
                            style={{
                                alignItems: 'center',
                            }}
                            >
                            {this.state.practical_feature_image ? 
                                <FastImage 
                                    source={imguri}
                                    onLoad={evt => {
                                        this.setState({
                                            imageWidth: evt.nativeEvent.width,
                                            imageHeight: evt.nativeEvent.height,
                                        });
                                    }}
                                    style={{
                                        height: PixelRatio.roundToNearestPixel(this.state.containerFastImageWidth / (16 / 9),),
                                        alignSelf: 'stretch',
                                        marginVertical: 10,
                                        borderRadius: 10,
                                    }}
                                    />
                                :
                                null
                                }
                        </View>
                        {this.state.youtube_links.length > 0 ?
                            <View>
                                <Text
                                    style={{
                                        fontSize: 18,
                                    }}
                                    >
                                    Youtube Videos
                                </Text>
                                {youtube_videos}
                            </View>
                            :
                            null}
                        {this.state.practical_calculation == '' ? 
                            null
                            :
                            <View
                                style={{
                                    marginVertical: 10,
                                }}
                                >
                                <TouchableOpacity
                                    onPress={this.navigateToCalculation}
                                    >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                        }}
                                        >
                                        Practical Calculations {'>'}
                                    </Text>
                                </TouchableOpacity>
                                {/* <View
                                    style={{
                                        marginHorizontal: 10,
                                    }}
                                    >
                                    <Calculations calculation={this.state.practical_calculation} practical_id={this.state.practical_id} />
                                </View> */}
                            </View>
                            }
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
                                            fontSize: 18,
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
                                    <Text
                                        style={{
                                            fontSize: 16,
                                        }}
                                        >
                                        {this.state.practical_procedure}
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
                                            fontSize: 18,
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
                                    <Text
                                        style={{
                                            fontSize: 16,
                                        }}
                                        >
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
                                            fontSize: 18,
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
                                    <Text
                                        style={{
                                            fontSize: 16,
                                        }}
                                        >
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
                                            fontSize: 18,
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
                                    <Text
                                        style={{
                                            fontSize: 16,
                                        }}
                                        >
                                        {this.state.practical_conclusion}
                                    </Text>
                                </View>
                            </View>
                            }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default PracticalDetail;
