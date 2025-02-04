import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Post } from '@/types';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

//Types
type PostListItemProps = {
    post: Post;
};
type FooterButtonProp = {
    text: string;
    icon: React.ComponentProps<typeof FontAwesome>['name'];
};

const FooterButton = ({ text, icon }: FooterButtonProp) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <FontAwesome
                name={icon}
                size={24}
                color='gray'
            />
            <Text style={{ marginLeft: 5, color: 'gray', fontWeight: '500' }}>{text}</Text>
        </View>
    );
};

const PostListItem = ({ post }: PostListItemProps) => {
    //console.log('PostId:', post.id);
    //console.log('post:', post);
    return (
        <Link
            href={`/posts/${post.id}`}
            asChild
        >
            <Pressable style={styles.container}>
                {/* Header */}
                <Link
                    href={`/users/${post.profile.id}`}
                    asChild
                >
                    <Pressable style={styles.header}>
                        <Image
                            source={{ uri: post.profile.image }}
                            style={styles.userimage}
                        />
                        <View>
                            <Text style={styles.username}>{post.profile.name}</Text>
                            <Text>{post.profile.position}</Text>
                        </View>
                    </Pressable>
                </Link>
                {/* Body */}

                <Text style={styles.content}>{post.content}</Text>
                {/* Image */}
                {post.image && (
                    <Image
                        source={{ uri: post.image }}
                        style={styles.postImage}
                    />
                )}

                {/* Footer */}
                <View style={styles.footer}>
                    <FooterButton
                        text='Like'
                        icon='thumbs-o-up'
                    />
                    <FooterButton
                        text='comment'
                        icon='comment-o'
                    />
                    <FooterButton
                        text='share'
                        icon='share'
                    />
                </View>
            </Pressable>
        </Link>
    );
};

export default PostListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },
    //Header Styles
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 3,
    },
    userimage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },

    //Body Styles
    postImage: {
        width: '100%',
        aspectRatio: 1,
    },
    content: {
        margin: 15,
        backgroundColor: 'white',
        lineHeight: 23,
        padding: 7,
    },

    //Footer Styles
    footer: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-around',
        borderTopWidth: 0.6,
        backgroundColor: 'white',
        borderColor: 'lightgray',
    },
});
