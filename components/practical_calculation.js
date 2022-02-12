import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Picker } from "@react-native-picker/picker";

import MathView from 'react-native-math-view';

class Calculations extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            isLoading: false,
            practical_id: props.route.params.practical_id,
            calculation: props.route.params.calculation,
            // calculation: "<latex>\\frac{1}{2}</latex>blah...blah...<latex>\\frac{T1+T2+T3+T4}{4}</latex><latex>{\\tiny \\frac{T1+T2+T3+T4}{4}}</latex>",
            sentences: [],
            values: props.route.params.values,
            selectedName: '',
            selectedIndex: 0,
            mapIndexList: props.route.params.mapIndexList,
        };
    }

    componentDidMount = () => {
        this.setState({ isLoading: true }, () => {
            // this.fetchPracticalValues().then(() => {
            this.findLatex().then(() => {
                this.setState({ isLoading: false });
            });
            // });
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

    findLatex = async () => {
        for(let i of this.state.calculation.split('<latex>')) {
            let b = i.split('</latex>');
            for(let j of b) {
                this.state.sentences.push(j);
            }
        }
    }

    setIndex = (itemValue, itemIndex) => {
        // console.log(itemValue, itemIndex);
        this.setState({ selectedIndex: itemIndex }, () => {
            this.state.mapIndexList.find((dic) => {
                if(dic.id == this.state.selectedIndex) {
                    this.setState({ selectedName: dic.o_name }, () => {
                        // console.log(this.state.selectedName, this.state.selectedIndex);
                    });
                }
            });
        });
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View>
                    <Text>
                        Loading
                    </Text>
                </View>
            )
        }
        String.prototype.interpolate = function(params) {
            const names = Object.keys(params);
            const vals = Object.values(params);
            return new Function(...names, `return \`${this}\`;`)(...vals);
        }
        let c = this.state.sentences.map((value, index) => {
            return(
                <View
                    key={index}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginHorizontal: 10,
                    }}
                    >
                    {index % 2 == 0 ?
                        <Text>
                            {value.interpolate(this.state)}
                        </Text>
                        :
                        <MathView 
                            math={value.interpolate(this.state)}
                            />
                        }
                </View>
            )
        });
        console.log(this.state.mapIndexList);
        let s = this.state.mapIndexList.map((value, index) => {
            return(
                <Picker.Item label={value.o_name} value={value.id} key={index} />
            )
        });
        return(
            <View
                style={{
                    flex: 1,
                }}
                >
                <Picker 
                    style={{
                        width: '100%',
                    }}
                    selectedValue={this.state.selectedIndex}
                    onValueChange={this.setIndex}
                    mode='dialog'
                    >
                    {s}
                </Picker>
                <ScrollView>
                    {c}
                </ScrollView>
            </View>
        )
    }
}

export default Calculations;
