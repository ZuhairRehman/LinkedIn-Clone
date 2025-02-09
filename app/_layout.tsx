import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { ApolloProvider } from '@apollo/client';
import client from '@/apollo/Client';
import AuthScreen from '@/components/auth/AuthScreen';
import * as SecureStore from 'expo-secure-store';
import { tokenCache } from '@/cache';

SplashScreen.preventAutoHideAsync();

//Authetication by Clerk
const CLERK_PUB_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <ClerkProvider
            publishableKey={CLERK_PUB_KEY}
            tokenCache={tokenCache}
        >
            <ApolloProvider client={client}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <SignedIn>
                        <Stack>
                            <Stack.Screen
                                name='(tabs)'
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name='posts/[id]'
                                options={{
                                    headerTitleAlign: 'center',
                                    title: 'Post',
                                    presentation: 'modal',
                                    animationTypeForReplace: 'push',
                                    animation: 'slide_from_bottom',
                                }}
                            />
                        </Stack>
                    </SignedIn>
                    <SignedOut>
                        <AuthScreen />
                    </SignedOut>
                </ThemeProvider>
            </ApolloProvider>
        </ClerkProvider>
    );
}
