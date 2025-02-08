import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import ExperienceListItem from '@/components/ExperienceListItem';
import { gql, useQuery } from '@apollo/client';

const profileQuery = gql`
    query profileQuery($id: ID!) {
        profile(id: $id) {
            id
            name
            backimage
            image
            position
            about
            experience {
                id
                companyname
                companyimage
                title
                userid
            }
        }
    }
`;

const ProfileScreen = () => {
    //Hooks
    const { id } = useLocalSearchParams();
    const { loading, error, data } = useQuery(profileQuery, {
        variables: { id },
    });

    //Constants & Variables
    const user = data?.profile;

    // Navigation Hook
    const navigation = useNavigation();

    useLayoutEffect(() => {
        //Routing
        navigation.setOptions({ title: user?.name || 'User', headerTitleAlign: 'center' });
    }, [user?.name]);

    //Functions
    const onConnectPress = () => {
        //Handle connecting with user
        console.log('Connecting with user', user?.id);
    };

    //error handling
    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Something went wrong...</Text>;

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    {/*Header Image */}
                    <Image
                        source={{ uri: user?.backimage }}
                        style={styles.headerImage}
                    />
                    <View style={styles.headerContent}>
                        {/* Profile Image */}
                        <Image
                            source={{ uri: user?.image }}
                            style={styles.userImage}
                        />
                        {/*Name & Position */}
                        <Text style={styles.username}>{user?.name}</Text>
                        <Text>{user?.position}</Text>
                        {/*Connect buttton */}
                        <Pressable
                            onPress={onConnectPress}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Connect</Text>
                        </Pressable>
                    </View>
                </View>
                {/*About */}
                <View style={styles.about}>
                    <Text style={styles.aboutTitle}>About</Text>
                    <Text style={styles.aboutContent}>{user.about}</Text>
                </View>
                {/*Experience */}
                <View style={styles.about}>
                    <Text style={styles.aboutTitle}>Experience</Text>

                    {user.experience?.map(experience => (
                        <ExperienceListItem
                            key={experience.id}
                            experience={experience}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    // Header Styles
    header: {
        backgroundColor: 'white',
    },

    // Header Content Styles
    headerImage: {
        width: '100%',
        aspectRatio: 5 / 2,
        marginBottom: -60,
    },

    headerContent: {
        padding: 10,
        paddingTop: 0,
    },
    userImage: {
        width: 120,
        aspectRatio: 1,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'white',
    },
    username: {
        fontSize: 24,
        fontWeight: '500',
    },
    // Header Button Styles
    button: {
        backgroundColor: 'royalblue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        borderRadius: 5,
        padding: 5,
    },

    //Body Styles
    about: {
        padding: 10,
        backgroundColor: 'white',
        marginVertical: 10,
    },
    aboutTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
    },
    aboutContent: {
        lineHeight: 20,
    },
    // Footer Styles
    footer: {
        backgroundColor: 'white',
        padding: 10,
    },
    footerText: {
        fontSize: 14,
    },
});
