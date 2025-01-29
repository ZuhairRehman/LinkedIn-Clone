import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NotificationsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications Screen</Text>
        </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
