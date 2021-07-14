import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './login_screen';
import SignUp from './signup_screen';
import Home from './home_screen';

import Context from './context';
import Profile from './profile_screen';
import Subject from './subject_screen';
import Practical from './practical_screen';
import PracticalDetail from './practical_detail_screen';
import Output from './procedure_and_process_output';
import Input from './procedure_and_process_input';

const AuthStack = createStackNavigator();

class AuthenticationNavigator extends React.Component {
    render() {
        return(
            <AuthStack.Navigator 
                initialRouteName='login'
                screenOptions={{
                    headerShown: false,
                }}>
                <AuthStack.Screen name="login" component={Login} />
                <AuthStack.Screen name="signup" component={SignUp} />
            </AuthStack.Navigator>
        )
    }
}

const HomeStack = createStackNavigator();

class HomeNavigator extends React.Component {
    render() {
        return(
            <HomeStack.Navigator 
                initialRouteName='home'
                screenOptions={{
                    headerShown: false,
                }}>
                <HomeStack.Screen name="home" component={Home} />
                <HomeStack.Screen name='profile' component={Profile} />
                <HomeStack.Screen name='subject' component={Subject} />
                <HomeStack.Screen name='practical' component={Practical} />
                <HomeStack.Screen name='practicalDetail' component={PracticalDetail} />
                <HomeStack.Screen name='input' component={Input} />
                <HomeStack.Screen name='output' component={Output} />
            </HomeStack.Navigator>
        )
    }
}

class AppNavigationContainer extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);
    }

    render() {
        const { isLoggedIn } = this.context;
        if(isLoggedIn){
            return(
                <NavigationContainer>
                    <HomeNavigator />
                </NavigationContainer>
            )
        } else {
            return(
                <NavigationContainer>
                    <AuthenticationNavigator />
                </NavigationContainer>
            )
        }
    }
}

export default AppNavigationContainer;
