import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PostListItem from '@/components/PostListItem';
import posts from '../../assets/data/posts.json';

//Test Variable
const firstPost = posts[1];

const TabOneScreen = () => {
    return (
        <View style={styles.container}>
            <PostListItem post={firstPost} />
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
