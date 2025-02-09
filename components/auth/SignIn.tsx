import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, Button, View } from 'react-native';
import React from 'react';

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Handle the submission of the sign-in form
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return;

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/');
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
        }
    }, [isLoaded, emailAddress, password]);

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <TextInput
                autoCapitalize='none'
                value={emailAddress}
                placeholder='Enter email'
                onChangeText={emailAddress => setEmailAddress(emailAddress)}
                style={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    padding: 10,
                    width: '90%',
                    marginVertical: 10,
                }}
            />
            <TextInput
                value={password}
                placeholder='Enter password'
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}
                style={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    padding: 10,
                    width: '90%',
                    marginVertical: 10,
                }}
            />
            <Button
                title='Sign in'
                onPress={onSignInPress}
            />
            <View style={{ marginTop: 10, width: '50%' }}>
                <Text>Don't have an account?</Text>
                <Link href='/SignUp'>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Sign up</Text>
                </Link>
            </View>
        </View>
    );
}
