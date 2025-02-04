import { ActivityIndicator, ActivityIndicatorBase, FlatList } from 'react-native';
import PostListItem from '@/components/PostListItem';
import { gql, useQuery } from '@apollo/client';
import { Text } from 'react-native';
//import posts from '../../assets/data/posts.json';

//Test Variable
//const firstPost = posts[0];
const postList = gql`
    query PostListQuery {
        postList {
            id
            content
            image
            profile {
                id
                name
                position
                image
            }
        }
    }
`;

const HomeFeedScreen = () => {
    const { loading, error, data } = useQuery(postList);

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Something went wrong...</Text>;
    //console.log('data: ', data);

    return (
        <FlatList
            data={data.postList}
            renderItem={({ item }) => <PostListItem post={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
        />
    );
};

export default HomeFeedScreen;
