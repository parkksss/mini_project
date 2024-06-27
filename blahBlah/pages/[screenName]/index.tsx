import { ServiceLayout } from "@/components/service_layout";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const userInfo = {
    uid: 'test',
    email: 'yesleee9211@gmail.com',
    displayName: 'yeseul park',
    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocLmlGfIc9o87qiP8wPWNCJeI_-AcrvLGtocowuskQUMjoGre8nx=s96-c'
}

const UserHomePage: NextPage = () => {
    return (
        <ServiceLayout title="user home" minH="100vh" backgroundColor="gray.50">
            <Box maxW="md" mx="auto" pt="6">
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
                    <Flex p="6">
                        <Avatar size="lg" src={userInfo.photoURL} mr="2" />
                        <Flex direction="column" justify="center">
                            <Text fontSize="md">{userInfo.displayName}</Text>
                            <Text fontSize="xs">{userInfo.email}</Text>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </ServiceLayout>
    );
};

export default UserHomePage;
