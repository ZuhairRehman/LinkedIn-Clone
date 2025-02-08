import { ActivityIndicator, ScrollView, Text } from 'react-native';
import PostListItem from '@/components/PostListItem';
import { useLocalSearchParams } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

const query = gql`
    query MyQuery($id: ID!) {
        post(id: $id) {
            content
            id
            image
            profile {
                id
                name
                image
                position
            }
        }
    }
`;

const PostDetailsScreen = () => {
    //Hooks
    const { id } = useLocalSearchParams();
    const { loading, error, data } = useQuery(query, { variables: { id } });

    //Constants & Variables
    if (loading) {
        return <ActivityIndicator />;
    }
    //error handling
    if (error) {
        console.log(error);
        return <Text>Post not found.</Text>; //error handling for non-existent post id
    }
    console.log('data:', data);
    return (
        <ScrollView>
            <PostListItem post={data.post} />
        </ScrollView>
    );
};

export default PostDetailsScreen;
