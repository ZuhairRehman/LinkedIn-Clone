import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NewPostsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>New Posts Screen</Text>
        </View>
    );
};

export default NewPostsScreen;

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
