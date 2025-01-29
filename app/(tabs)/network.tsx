import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NetworkScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Network Screen</Text>
        </View>
    );
};

export default NetworkScreen;

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
