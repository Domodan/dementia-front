import React, { useEffect, useState } from "react";
import { getDocs, onSnapshot } from "firebase/firestore";

import {
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Stack, Button,
    Container, Box, FormControl, FormLabel, Input, VStack, Heading, Center, Divider,
    InputGroup, InputLeftAddon,
} from '@chakra-ui/react';

import { MdRepeat } from "react-icons/md";
import { EditIcon } from "@chakra-ui/icons";
import { dataCollectionRef } from "../lib/firebase-collection";


const DataList = () => {
    const [dataList, setDataList] = useState([]);
    const [edit, setEdit] = useState(false);

    const [datetime, setDatetime] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [distance, setDistance] = useState(0);
    const [rssi, setRssi] = useState(0);

    const [state, setState] = useState({
        date: "",
        time: "",
        location: {
            _lat: "",
            _long: "",
        },
        temperature: 0,
        distance: 0,
        rssi: 0,
    });

    console.log("Date:", datetime, "Time:", datetime);


    // const handleChange = (e) => {
    //     const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    //     if (e.target.files && e.target.files[0]) {
    //         const value = e.target.files[0];
    //         setState({...state, [e.target.name]: value});
    //     }
    //     else {
    //         setState((state) => ({...state, [e.target.name]: value}));
    //     }

    // };


    useEffect(() => {
        const unsubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
            const dataObject = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            setDataList(dataObject);
        });

        return () => {
            unsubscribe();
        }
    }, []);


    const getData = () => {
        getDocs(dataCollectionRef)
        .then((response) => {
            const dataObject = response.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            setDataList(dataObject);
        })
        .catch((error) => console.log("Error:", error))
    }


    const editData = (id) => {
        setEdit(true);
        getDocs(dataCollectionRef)
        .then((response) => {
            const dataObject = response.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            setDataList(dataObject);
        })
        .catch((error) => console.log("Error:", error))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Editting Data");
    }

    return (
        <div>
            <TableContainer>
                <Table variant='striped'>
                    <TableCaption>List of Location Data From the Database</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Temperature ({'\u00b0'}C)</Th>
                            <Th>Distance (km)</Th>
                            <Th colSpan={2}>Location</Th>
                            <Th isNumeric>RSSI</Th>
                            <Th>Date</Th>
                            <Th>Time</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dataList.map((data) =>
                            <Tr key={ data.id}>
                                <Td>{data.data.temperature}</Td>
                                <Td>{data.data.distance}</Td>
                                <Td>{data.data.location._lat}</Td>
                                <Td>{data.data.location._long}</Td>
                                <Td isNumeric>{data.data.rssi}</Td>
                                <Td>{data.data.date}</Td>
                                <Td>{data.data.time}</Td>
                                <Td>
                                    <Button onClick={()=>editData(data.id)} rightIcon={<EditIcon />} colorScheme='blue' variant='outline'>
                                        Edit
                                    </Button>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Temperature</Th>
                            <Th>Distance</Th>
                            <Th colSpan={2}>Location</Th>
                            <Th isNumeric>RSSI</Th>
                            <Th>Date</Th>
                            <Th>Time</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <Stack direction='row' spacing={4}>
                <Button onClick={() => getData()} rightIcon={<MdRepeat />} colorScheme='teal' variant='outline'>
                    Refresh
                </Button>
            </Stack>
                <VStack>
                    <Container maxW='container.sm' borderWidth='1px' rounded='md'>
                        <Center>
                            <Heading margin={3}>Edit Location Data</Heading>
                        </Center>
                        <Divider />
                        <form>
                            <Box padding={4}>
                                <FormControl marginBottom={4} isRequired>
                                    <FormLabel>Temperature ({'\u00b0'}C)</FormLabel>
                                    <Input placeholder='Temperature' onChange={(e)=>setTemperature(e.target.value)} />
                                </FormControl>
                                <FormControl marginBottom={4} isRequired>
                                    <FormLabel>Distance (km)</FormLabel>
                                    <Input placeholder='Distance' onChange={(e)=>setDistance(e.target.value)} />
                                </FormControl>
                                <FormControl marginBottom={4} isRequired>
                                    <FormLabel>Location</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children='Latitude' />
                                        <Input placeholder='Latitude' onChange={(e)=>setLatitude(e.target.value)} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl marginBottom={4} isRequired>
                                    <InputGroup>
                                        <InputLeftAddon children='Longitude' />
                                        <Input placeholder='Longitude' onChange={(e)=>setLongitude(e.target.value)} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl marginBottom={4} isRequired>
                                    <FormLabel>RSSI</FormLabel>
                                    <Input placeholder='RSSI' onChange={(e)=>setRssi(e.target.value)} />
                                </FormControl>
                                <FormControl marginBottom={4} isRequired>
                                    <FormLabel>Date/Time</FormLabel>
                                    <Input
                                        placeholder="Select Date and Time"
                                        size="md"
                                        type="datetime-local"
                                        onChange={(e)=>setDatetime(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box padding={4}>
                                <Center>
                                    <Button type="submit" colorScheme={'whatsapp'} mr={3} onClick={()=>handleSubmit()}>
                                        Update
                                    </Button>
                                </Center>
                            </Box>
                        </form>
                    </Container>
                </VStack>
        </div>
    )
}

export default DataList