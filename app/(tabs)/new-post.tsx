import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicatorBase,
    ActivityIndicator,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';

const insertPost = gql`
    mutation MyMutation($userid: ID, $image: String, $content: String!) {
        insertPost(content: $content, image: $image, userid: $userid) {
            userid
            content
            id
            image
        }
    }
`;

const NewPostsScreen = () => {
    //State Variables
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);

    // Hooks
    const [insertPostMutation, { loading, error, data }] = useMutation(insertPost); //Hook provided by apollo for inserting post mutations
    const navigation = useNavigation();
    const router = useRouter();

    // Function to handle the post button press
    const onPost = async () => {
        console.log(content);

        try {
            await insertPostMutation({
                variables: {
                    userid: 2,
                    content: content,
                },
            });

            setContent('');
            setImage(null);
            router.back(); // Navigate back to the home screen after posting
        
        } catch (error) {
            console.log('error inserting', error);
        }
    };

    //Routing modifications
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPressIn={onPost}
                    style={styles.postButton}
                >
                    <Text style={styles.postBtnText}>
                        {loading ? <ActivityIndicator /> : 'Submit'}
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [onPost, loading]);

    // Function to handle image picking
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 5],
            quality: 0.7,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='what you want to talk about?..'
                multiline
                style={styles.input}
                value={content}
                onChangeText={setContent}
            />

            {image && (
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
            )}

            <Pressable
                onPress={pickImage}
                style={styles.footer}
            >
                <FontAwesome
                    name='image'
                    size={24}
                    color='black'
                    style={styles.iconButton}
                />
                <FontAwesome
                    name='camera'
                    size={24}
                    color='black'
                    style={styles.iconButton}
                />
                <FontAwesome
                    name='glass'
                    size={24}
                    color='black'
                    style={styles.iconButton}
                />
            </Pressable>
        </View>
    );
};

export default NewPostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },

    //Header Styles
    postButton: {
        backgroundColor: 'royalblue',
        borderRadius: 50,
        padding: 5,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    postBtnText: {
        color: 'white',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    //Input Styles
    input: {
        fontSize: 18,
    },
    //Image Styles
    image: {
        width: '100%',
        aspectRatio: 1,
        marginTop: 'auto',
    },

    //Footer Styles
    footer: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconButton: {
        backgroundColor: 'gainsboro',
        padding: 10,
        borderRadius: 25,
        overflow: 'hidden',
        justifyContent: 'center',
    },
});
