import React from 'react';
import {
    Heading,
    VStack,
    IconButton,
    useColorMode
} from '@chakra-ui/react';
import {FaSun, FaMoon, FaArrowCircleRight} from 'react-icons/fa';
import DataList from './components/DataList';
import DataAdd from './components/DataAdd';

const App = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <VStack padding={4}>
            <IconButton
                icon={colorMode === 'light' ?<FaSun />:<FaMoon />}
                isRound={'true'}
                size={"lg"}
                alignSelf={'flex-end'}
                onClick={toggleColorMode}
            />
            <Heading
                bgGradient={'linear(to-r, pink.500, pink.300, blue.500)'}
                bgClip={"text"}
                m={10} fontWeight={"extrabold"} size={"2xl"}
            >
                Dementia Application
            </Heading>
            <DataList />
        </VStack>
    );
}

export default App