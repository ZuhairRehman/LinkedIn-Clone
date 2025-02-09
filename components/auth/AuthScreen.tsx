import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';

const AuthScreen = () => {
    //State Variables
    const [activeTab, setActiveTab] = useState('SignIn');

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text
                    onPress={() => setActiveTab('SignIn')}
                    style={{
                        fontWeight: '500',
                        fontSize: 20,
                        color: activeTab === 'SignIn' ? 'royalblue' : 'gray',
                    }}
                >
                    Sign-in
                </Text>
                <Text
                    onPress={() => setActiveTab('SignUp')}
                    style={{
                        fontWeight: '500',
                        fontSize: 20,
                        color: activeTab === 'SignUp' ? 'royalblue' : 'gray',
                    }}
                >
                    Sign-up
                </Text>
            </View>
            {activeTab === 'SignIn' && <SignInScreen />}
            {activeTab === 'SignUp' && <SignUpScreen />}
        </View>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({});
