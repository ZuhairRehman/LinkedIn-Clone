import { StyleSheet, Text, View } from 'react-native';
import { Post } from '@/types';
import React from 'react';

//Types
type PostListItemProps = {
    post: Post;
};

const PostListItem = ({ post }: PostListItemProps) => {
    console.log('PostListItem', post);
    return (
        <View>
            <Text>{post.content}</Text>
        </View>
    );
};

export default PostListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
