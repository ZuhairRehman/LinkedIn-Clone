import { StyleSheet, Text, View, FlatList } from 'react-native';
import users from '@/assets/data/users.json';
import React, { useLayoutEffect, useState } from 'react';
import UserListItem from '@/components/UserListItem';
import { useNavigation } from 'expo-router';

const SearchScreen = () => {
    //State variables
    const [search, setSearch] = useState('');
    //Hooks
    const navigation = useNavigation();
    //Routing functions
    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Search Users',
                onChangeText: setSearch,
            },
        });
    }, [navigation]);
    return (
        <View style={styles.userList}>
            <FlatList
                data={users}
                renderItem={({ item }) => <UserListItem user={item} />}
            />
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    userList: {
        backgroundColor: 'white',
        flex: 1,
    },
});
