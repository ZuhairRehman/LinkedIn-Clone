import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { User } from '@/types';

//type definitions
type UserListItemProps = {
    user: User;
};

const UserListItem = ({ user }: UserListItemProps) => {
    return (
        <View>
            <Link
                href={`/users/${user.id}`}
                asChild
            >
                <Pressable style={styles.header}>
                    <Image
                        source={{ uri: user.image }}
                        style={styles.userimage}
                    />
                    <View>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text>{user.position}</Text>
                    </View>
                </Pressable>
            </Link>{' '}
        </View>
    );
};

export default UserListItem;
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
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
});
