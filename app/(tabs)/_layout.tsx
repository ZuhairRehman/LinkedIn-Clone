import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return (
        <FontAwesome
            size={24}
            style={{ marginBottom: 3 }}
            {...props}
        />
    );
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#191919',
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home Feed',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name='home'
                            color={color}
                        />
                    ),
                    headerRight: () => (
                        <Link
                            href='/search'
                            asChild
                        >
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name='search'
                                        size={18}
                                        color='gray'
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name='network'
                options={{
                    title: 'My Network',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name='group'
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='new-post'
                options={{
                    title: 'Post',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name='plus-square'
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='notifications'
                options={{
                    title: 'Notifications',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name='bell'
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='jobs'
                options={{
                    title: 'Jobs',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name='briefcase'
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
