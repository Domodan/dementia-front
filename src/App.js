import React from 'react';
import {
    Heading,
    VStack,
    IconButton,
} from '@chakra-ui/react';
import {FaSun, FaMoon, FaArrowCircleRight} from 'react-icons/fa';
import DataList from './components/DataList';
import DataAdd from './components/DataAdd';

const App = () => {
    return (
        <VStack padding={4}>
            <IconButton
                icon={<FaSun />}
                isRound={'true'}
                size={"lg"}
                alignSelf={'flex-end'}
            />
            <Heading mb={8} fontWeight={"extrabold"} size={"2xl"}>
                Dementia Application
            </Heading>
            <DataList />
        </VStack>
    );
}

export default App