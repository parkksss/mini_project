import { ServiceLayout } from "@/components/service_layout";
import { Box } from "@chakra-ui/react";
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
            </Box>
        </ServiceLayout>
    );
};

export default UserHomePage;
