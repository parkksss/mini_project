import { NextPage } from 'next';
import { ServiceLayout } from '@/components/service_layout';
import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import { GoogleLoginButton } from '@/components/google_login_button';
import { useAuth } from '@/contexts/auth_user.context';

const IndexPage: NextPage = () => {
    const { signInWithGoogle } = useAuth();
    return (
        <ServiceLayout title="test">
            <Box maxW="md" mx="auto">
                <img src="/main_logo.svg" alt="메인 로고" />
                <Flex justify="center">
                    <Heading>#BlahBlah</Heading>
                </Flex>
            </Box>
            <Center mt="20">
                <GoogleLoginButton onClick={signInWithGoogle} />
            </Center>
        </ServiceLayout>
    );
};

export default IndexPage;
