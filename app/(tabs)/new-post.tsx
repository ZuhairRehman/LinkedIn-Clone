import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';

const NewPostsScreen = () => {
    //State Variables
    const [content, setContent] = useState('');
    // Hooks
    const navigation = useNavigation();
    const router = useRouter();

    // Function to handle the post button press
    const onPost = () => {
        console.log(content);
        setContent('');
        router.back(); // Navigate back to the home screen after posting
    };

    //Routing modifications
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPressIn={onPost}
                    style={styles.postButton}
                >
                    <Text style={styles.postBtnText}>Submit</Text>
                </TouchableOpacity>
            ),
        });
    }, [onPost]);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='what you want to talk about?..'
                multiline
                style={styles.input}
                value={content}
                onChangeText={setContent}
            />
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
    input: {
        fontSize: 18,
    },
});
