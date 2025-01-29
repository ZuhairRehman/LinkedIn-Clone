import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const JobsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>JobsScreen</Text>
        </View>
    );
};

export default JobsScreen;

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
