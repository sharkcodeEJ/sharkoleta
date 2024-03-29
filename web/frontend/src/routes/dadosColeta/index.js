import React,{useEffect, useState} from 'react';
import api from '../../services/api';
import { 
    Container, 
    Box,
    Stack,
    Divider,
    Center,
    Image,
    Button,
    Text,    
    Heading,
    List,
    ListItem,
    ListIcon,
    UnorderedList
 } from "@chakra-ui/react"

import {PhoneIcon, InfoIcon, EmailIcon} from "@chakra-ui/icons"

import Local from './imgs/Group.svg';
import Wpp from './imgs/Whatsapp.svg';
import Email from './imgs/E-mail.svg';
import REMOVER from './imgs/backgroundREMOVER.svg'
import SharkcoletaLogo from '../../styles/sharkcoleta_logo.png';

import sharkcoleta_data from "../../../src/data/sharkcoleta_data.json";

export function ComponentPerfil(props){
    const [data, setData] = useState({
        localizacao:{
            endereco:'',
            bairro:'',
            numero:'',
            cidade:'',
            uf:'',
            localidade:[-28.4746953,-49.0162887]
        },
        nome:'',
        descricao:'',
        foto:null
    });

    const [positionOrigem,setPositionOrigem] = useState(null);

    async function goRotaGoogle(){
        if(!positionOrigem) return;

        const position = data.localizacao.localidade;

        const url = `https://www.google.com/maps/dir/?api=1&origin=${
            positionOrigem[0]
        },${
            positionOrigem[1]
        }&destination=${
            position[0]
        },${
            position[1]
        }`;

        const $componentLink = document.createElement('a');
        $componentLink.setAttribute('href',url);
        $componentLink.setAttribute('target','_blank');
        $componentLink.click();
    }

    function getLocationPoint(){
        window.navigator.geolocation.getCurrentPosition(resolve =>{
            const {latitude,longitude} = resolve.coords; 
            setPositionOrigem([latitude,longitude]);
        });
    }

    useEffect(()=>{
        getLocationPoint();
    },[])

    //const [points, setPoints] = useState([]);

    let urlId = window.location.search.substring(4).split('&');
    const points = sharkcoleta_data.Point.find((point) => point.id === urlId[0]);
    const pointItem = sharkcoleta_data.PointItem
        .filter((point) => point.pointid === urlId[0])
        .map((item => item.itemId == 1 ? 'Eletrônico' : 'Óleo'));

    // useEffect(() => {
    //     api.get(`points/${urlId}`, {}).then (response => {
    //         setPoints(response.data);
    //     })
    // }, [])

    return (
    <>  
        <Container 
            display='flex'
            alignItems='center'
            justifyContent='flex-start'
            maxWidth='lg'
            centerContent={true}
            className='container'
        >
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                width='100%'
                background='#219653'
                position='fixed'
                top='0px'
                padding='5px'
                zIndex={1000}
            >
                <Image 
                    src={SharkcoletaLogo} 
                    alt='Logo do projeto Sharkcoleta'
                    marginLeft='40px'
                ></Image>

                <Text
                    fontSize='25px'
                    color='#e6e6e6'
                    fontFamily={`'Ubuntu', sans-serif`}
                    fontWeight='bolder'
                    margin='0px 40px 0px 0px'
                >
                    Dados da Coleta
                </Text>
            </Box>
                
            <Center
                display='block'
                padding='100px'
                background='#FFF'
                overflow='auto'
            >
                <Heading
                        display='block'
                        maxWidth='900px'
                        fontSize='35px'
                        textAlign='left'
                        as="h1"
                        fontFamily={`'Ubuntu', sans-serif`}
                        color='#2AC28B'
                        padding='20px'
                        margin='0px 0px 40px 0px'
                >
                    {points.name}
                </Heading>
                <Stack
                    width='900px'
                    direction='column'
                    spacing='25px'
                >
                    <Box 
                        overflow='hidden'
                        borderRadius='20px 20px 0px 0px'
                        boxShadow='1px 2px 5px 0px rgb(150,150,150)'
                    >
                        <Image 
                            width='100%'
                            height='auto'
                            src={REMOVER}
                        />                        
                    </Box>
                    <Text
                        fontSize='20px'
                        fontFamily={`'Ubuntu', sans-serif`}
                        color='#4F4F4F'  
                    >
                        {points.description}   
                    </Text>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        padding='25px 0px'
                    >
                        <List spacing='50px' width='50%'>
                            <ListItem 
                                color='#4F4F4F' 
                                fontSize='15px'
                                fontWeight='bold' 
                                fontFamily={`'Ubuntu', sans-serif`}
                                display='flex'
                                alignItems='flex-start'
                                justifyContent='flex-start'
                            >
                                <ListIcon as={PhoneIcon} height='25px' width='auto' color='#2AC28B' margin='0px 20px 0px 0px'/>
                                    {`${points.whatsapp} ${!points.fone ? points.fone : "" }`}
                            </ListItem>
                            <ListItem
                                color='#4F4F4F' 
                                fontSize='15px'
                                fontWeight='bold' 
                                fontFamily={`'Ubuntu', sans-serif`}
                                display='flex'
                                alignItems='flex-start'
                                justifyContent='flex-start'  
                            >
                            <ListIcon as={EmailIcon} height='25px' width='auto' color='#2AC28B' margin='0px 20px 0px 0px'/>
                            <Text
                                display='inline-block' 
                                maxWidth='300px'
                                minWidth='200px'
                            >
                                {`${points.email}`}
                            </Text>
                            </ListItem>
                            <ListItem
                                color='#4F4F4F' 
                                fontSize='15px'
                                fontWeight='bold'
                                fontFamily={`'Ubuntu', sans-serif`}
                                display='flex'
                                alignItems='flex-start'
                                justifyContent='flex-start'
                            >
                                <ListIcon as={InfoIcon} height='25px' width='auto' color='#2AC28B' margin='0px 20px 0px 0px'/>
                                <Text
                                    display='inline-block'
                                    maxWidth='300px'
                                    minWidth='200px'
                                >
                                    {`${points.address}, ${points.number}, ${points.district} - ${points.city} / ${points.uf}`}
                                </Text>
                            </ListItem>
                        </List>
                        <Box>
                            <Text
                                textAlign='center'
                                color='#2AC28B'
                                fontWeight='bolder'
                                fontSize='18px'
                                margin='0px 0px 20px 0px'
                                fontFamily={`'Roboto', sans-serif`}
                            >
                                Este ponto de colheta recolhe
                            </Text>
                            <Box
                                border='2px solid #2AC28B'
                                padding='40px'
                                borderRadius='15px'
                            >
                                <Text fontSize='15px'
                                    color='#2AC28B'
                                    fontFamily={`'Ubuntu', sans-serif`}
                                    fontWeight='bolder'
                                    marginBottom='8px'
                                >
                                    {`${pointItem[0] ?? ''}`}
                                </Text>
                                <Text fontSize='15px' 
                                    color='#2AC28B'
                                    fontFamily={`'Ubuntu', sans-serif`}
                                    fontWeight='bolder'
                                    marginBottom='8px'
                                >
                                    {`${pointItem[1] ?? ''}`}
                                </Text>
                            </Box>
                        </Box>     
                    </Box>
                    <Divider />
                    <Box>
                        <a href={`https://api.whatsapp.com/send?l=pt&phone=${points.whatsapp}`} target="_blank">
                            <Button
                                background='#34CB79'
                                leftIcon={<Image color='inherit' marginRight='10px' src={Wpp}/>}
                                color='#FFF'
                                padding='20px'
                                borderRadius='10px'
                                marginRight='20px'
                                width='200px'
                                float='left'
                                fontWeight='bolder'
                                transition='background .5s'
                                cursor='pointer'
                                _hover={{
                                    background:'#1a653c'
                                }}
                            >
                                WhatsApp
                            </Button>
                        </a>
                        <a href={`mailto:${points.email}`} >
                            <Button
                                background='#34CB79'
                                leftIcon={<Image color='inherit' marginRight='10px' src={Email}/>}
                                color='#FFF'
                                padding='20px'
                                width='200px'
                                borderRadius='10px'
                                float='left'
                                fontWeight='bolder'
                                transition='background .5s'
                                cursor='pointer'
                                _hover={{
                                    background:'#1a653c'
                                }}
                            >
                                E-mail
                            </Button>
                        </a>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${points.latitude}%2C${points.longitude}`} target="_blank">
                            <Button
                                background='#2F80ED'
                                leftIcon={<Image color='inherit' marginRight='10px' src={Local}/>}
                                color='#FFF'
                                padding='20px 40px'
                                borderRadius='10px'
                                float='right'
                                fontWeight='bolder'
                                onClick={goRotaGoogle}
                                transition='background .5s'
                                cursor='pointer'
                                _hover={{
                                    background:'#0e4fa4'
                                }}
                            >
                                Localizar
                            </Button>
                        </a>
                    </Box>
                </Stack>
            </Center>
        </Container>
    </>
    )
}

export default ComponentPerfil;