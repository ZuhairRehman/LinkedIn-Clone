import * as React from 'react';
import { Text, TextInput, Button, View, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState('');

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return;

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress,
                password,
            });

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true);
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
        }
    };

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            });

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/');
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
        }
    };

    if (pendingVerification) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Verify your email</Text>
                <TextInput
                    value={code}
                    placeholder='Enter your verification code'
                    onChangeText={code => setCode(code)}
                    style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        padding: 10,
                        width: '50%',
                        marginVertical: 10,
                    }}
                />
                <Button
                    title='Verify'
                    onPress={onVerifyPress}
                />
            </View>
        );
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <>
                <Text>Sign up</Text>
                <TextInput
                    autoCapitalize='none'
                    value={emailAddress}
                    placeholder='Enter email'
                    onChangeText={email => setEmailAddress(email)}
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
                    title='Sign up'
                    onPress={onSignUpPress}
                />
            </>
        </View>
    );
}
