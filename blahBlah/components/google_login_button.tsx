import { Box, Button } from '@chakra-ui/react';

interface Props {
    onClick: () => void;
}
export const GoogleLoginButton = function ({onClick}: Props) {
  return (
    <Box>
        <Button size="lg"
                width="full"
                maxW="md"
                borderRadius="full"
                bgColor="#4285f4"
                color="white"
                colorScheme="blut"
                leftIcon={<img src="/google.svg" alt="google 로고" style={{backgroundColor: "white", padding: "8px"}} />}
                onClick={onClick}
        >
        Google 계정으로 시작하기
        </Button>
      </Box>
  );
};