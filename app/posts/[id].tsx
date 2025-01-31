import { ScrollView, StyleSheet, Text, View } from 'react-native';
import posts from '@/assets/data/posts.json';
import PostListItem from '@/components/PostListItem';
import { useLocalSearchParams } from 'expo-router';

const PostDetailsScreen = () => {
    //Hooks
    const { id } = useLocalSearchParams();

    //Constants & Variables
    const post = posts.find(p => p.id === id); //filtering as sample dataset is offline

    //error handling
    if (!post) {
        return <Text>Post not found.</Text>; //error handling for non-existent post id
    }

    return (
        <ScrollView>
            <PostListItem post={post} />
        </ScrollView>
    );
};

export default PostDetailsScreen;

const styles = StyleSheet.create({});
