import { ActivityIndicator, ActivityIndicatorBase, FlatList } from 'react-native';
import PostListItem from '@/components/PostListItem';
import { gql, useQuery } from '@apollo/client';
import { Text } from 'react-native';
import { useState } from 'react';

//GQL queries
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
//Pagination
const postPaginatedQuery = gql`
    query PostPaginatedQuery($first: Int, $after: Int) {
        postPaginatedList(first: $first, after: $after) {
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
    //State Variables
    const [hasMore, setHasMore] = useState(true);

    // Fetching data with Apollo Client
    const { loading, error, data, fetchMore } = useQuery(postPaginatedQuery, {
        variables: { first: 2 },
    });

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Something went wrong...</Text>;
    //console.log('data: ', data);

    //Util functions

    const loadMore = async () => {
        if (!hasMore) return;
        const resp = await fetchMore({ variables: { after: data.postPaginatedList.length } }); //Used apollo cache for the next set of data fetch request
        if (resp.data.postPaginatedList.length === 0) setHasMore(false);
        console.log('response: ', resp.data.postPaginatedList);
    };

    return (
        <FlatList
            data={data.postPaginatedList}
            renderItem={({ item }) => <PostListItem post={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            onEndReached={loadMore}
        />
    );
};

export default HomeFeedScreen;
