import { ServiceLayout } from "@/components/service_layout";
import { Avatar, Box, Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import ResizeTextArea from 'react-textarea-autosize';

const userInfo = {
    uid: 'test',
    email: 'yesleee9211@gmail.com',
    displayName: 'yeseul park',
    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocLmlGfIc9o87qiP8wPWNCJeI_-AcrvLGtocowuskQUMjoGre8nx=s96-c'
}

const UserHomePage: NextPage = () => {
    const [message, setMessage] = useState('');
    const toast = useToast();
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
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
                    <Flex align="center" p="2">
                        <Avatar size="xs" src="https://bit.ly/brokken-link" mr="2" />
                        <Textarea
                            bg="gray.100"
                            border="none"
                            placeholder="무엇이 궁금한가요?"
                            resize="none"
                            minH="unset"
                            overflow="hiddden"
                            fontSize="xs"
                            mr="2"
                            maxRows={7}
                            as={ResizeTextArea}
                            value={message}
                            onChange={(e) => {
                                if (e.currentTarget.value) {
                                    const lineCount = (e.currentTarget.value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 1) + 1;
                                    if (lineCount > 7) {
                                        toast({
                                            title: '최대 7줄까지만 입력 가능합니다.',
                                            position: 'top-right',
                                        });
                                        return;
                                    } 
                                }
                                setMessage(e.currentTarget.value);
                            }}/>
                        <Button
                            disabled={message.length === 0}
                            bgColor="#FFBB6C"
                            color="white"
                            colorScheme="yelllow"
                            variant="solid"
                            size="sm">등록</Button>
                    </Flex>
                </Box>
            </Box>
        </ServiceLayout>
    );
};

export default UserHomePage;
