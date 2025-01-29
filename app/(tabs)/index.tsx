import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TabOneScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>index</Text>
        </View>
    );
};

export default TabOneScreen;

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
