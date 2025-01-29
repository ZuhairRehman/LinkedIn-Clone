import { FlatList } from 'react-native';
import PostListItem from '@/components/PostListItem';
import posts from '../../assets/data/posts.json';

//Test Variable
//const firstPost = posts[0];

const HomeFeedScreen = () => {
    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => <PostListItem post={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 10}}
        />
    );
};

export default HomeFeedScreen;
