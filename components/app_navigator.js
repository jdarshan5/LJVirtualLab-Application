import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './login_screen';
import SignUp from './signup_screen';
import Home from './home_screen';

import Context from './context';
import Profile from './profile_screen';
import Practical from './practical_screen';
import PracticalDetail from './practical_detail_screen';
import LoginSignup from './login_signup_screen';
import UniversityListSignup from './university_list_signup_screen';
import InstituteListSignup from './institute_list_signup';
import DepartmentListSignup from './department_list_signup';
import DetailFormSignup from './detail_form_signup';
import Course from './course_screen';
import YoutubeVideo from './youtube_screen';
import Calculations from './practical_calculation';

const AuthStack = createStackNavigator();

class AuthenticationNavigator extends React.Component {
    render() {
        return(
            <AuthStack.Navigator 
                initialRouteName="loginSignup"
                screenOptions={{
                    headerShown: false,
                }}>
                    <AuthStack.Screen name="loginSignup" component={LoginSignup} />
                    <AuthStack.Screen name="login" component={Login} />
                    <AuthStack.Screen name="universityListSignup" component={UniversityListSignup} />
                    <AuthStack.Screen name="instituteListSignup" component={InstituteListSignup} />
                    <AuthStack.Screen name="departmentListSignup" component={DepartmentListSignup} />
                    <AuthStack.Screen name="signup" component={SignUp} />
                    <AuthStack.Screen name="detailFormSignup" component={DetailFormSignup} />
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
                <HomeStack.Screen name='course' component={Course} />
                <HomeStack.Screen name='practical' component={Practical} />
                <HomeStack.Screen name='practicalDetail' component={PracticalDetail} />
                <HomeStack.Screen name='youtubeVideoScreen' component={YoutubeVideo} />
                <HomeStack.Screen name='calculation' component={Calculations} />
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
