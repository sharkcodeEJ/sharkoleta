import React,{useEffect, useState} from 'react';
import axious from 'axios';
import { 
    Container, 
    Input,
    FormControl,
    FormLabel,
    Box,
    Stack,
    Divider,
    Center,
    Image,
    Button,
    Text,    
    IconButton,
    Spinner,
    InputGroup,
    InputRightElement,
    Heading,
    AspectRatio,
    List,
    ListItem,
    ListIcon,
    UnorderedList,
    AlertDialog,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogOverlay,
    AlertDialogContent,
    MenuList,
    MenuItem,
    Menu,
    MenuButton
 } from "@chakra-ui/react"

import {ArrowBackIcon,SearchIcon,PhoneIcon,TimeIcon,HamburgerIcon} from "@chakra-ui/icons"

import Tel from './imgs/tel.svg';
import Local from './imgs/Group.svg';
import Wpp from './imgs/Whatsapp.svg';
import Email from './imgs/E-mail.svg';
import LocalGoogle from './imgs/LocalGoogle.png';
import Home from './imgs/home.svg'
import Search from './imgs/search.svg';
import Us from './imgs/us.svg'
import REMOVER from './imgs/backgroundREMOVER.svg'


function ComponentEmail({onClose,open=true}){
    return (
        <AlertDialog
        isOpen={true}
        onClose={onClose}
        
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
}

export function ComponentPerfil(props){
    const [openDialogEmail,setOpenDialogEmail] = useState(false);
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
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon width='25px' height='auto'/>}
                        variant="outline"
                        padding='20px'
                        margin='0px 0px 0px 50px'
                        background='transparent'
                        cursor='pointer'
                        color='#FFF'
                        border='2px solid #49d085'
                        transition='all .2s'
                        _hover={{
                            background:'rgb(0,0,0,0.3)'
                        }}
                    />
                    <MenuList 
                        maxWidth='500px' 
                        minWidth='300px' 
                        width='400px'
                        background='#1a653c'
                        color='#d6f5e4'
                        fontWeight='bolder'
                        fontSize='18px'
                        
                    >
                        <MenuItem 
                            padding='20px' 
                            fontWeight='550' 
                            fontSize='inherit'
                            letterSpacing='2px'
                            background='inherit'
                            transition='all .2s'
                            cursor='pointer'
                            _hover={{
                                background:'#e6e6e6',
                                color:'#1a653c'
                            }}
                        >
                            <Image margin ='0px 10px' margin ='0px 40px 0px 0px' color='#FFF' src={Home}/>
                            Inicio
                        </MenuItem>
                        <MenuItem 
                            padding='20px' 
                            background='inherit' 
                            fontWeight='550' 
                            letterSpacing='2px'
                            fontSize='inherit'
                            cursor='pointer'
                            _hover={{
                                background:'#e6e6e6',
                                color:'#1a653c'
                            }}
                        >
                            <Image margin ='0px 10px' margin ='0px 40px 0px 0px' color='#FFF' src={Us}/>
                            Junte-se a nos
                        </MenuItem>
                        <MenuItem  
                            padding='20px' 
                            background='inherit' 
                            fontWeight='550' 
                            letterSpacing='2px'
                            fontSize='inherit'
                            cursor='pointer'
                            _hover={{
                                background:'#e6e6e6',
                                color:'#1a653c'
                            }}
                        >
                            <Image margin ='0px 40px 0px 0px' color='#FFF' src={Search}/>
                            Localizar
                        </MenuItem>
                    </MenuList>
                </Menu>

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
                        IFSC - Instituto Federal de Santa Catarina (Campus Tubarao)
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat.    
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
                                    {`${'(48) 3301-9100'} ${'(48) 3301-9100'}`}
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
                            <ListIcon as={LocalGoogle} height='25px' width='auto' color='#2AC28B' margin='0px 20px 0px 0px'/>
                            <Text
                                display='inline-block' 
                                maxWidth='300px'
                                minWidth='200px'
                            >
                                {`${'Rua Deputado Olices Pedra de Caldas'}, ${'480'}, ${'Dehon'} - ${'Tubarão / SC'}`}
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
                                <ListIcon as={TimeIcon} height='25px' width='auto' color='#2AC28B' margin='0px 20px 0px 0px'/>
                                <Text
                                    display='inline-block'
                                    maxWidth='300px'
                                    minWidth='200px'
                                >
                                    {`${'Rua Deputado Olices Pedra de Caldas'}, ${'480'}, ${'Dehon'} - ${'Tubarão / SC'}`}
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
                                <UnorderedList 
                                    fontFamily={`'Roboto', sans-serif`} 
                                    spacing='15px'
                                    color='#2AC28B'
                                    fontSize='15px'
                                >
                                    <ListItem>Televisores</ListItem>
                                    <ListItem>Celulares</ListItem>
                                    <ListItem>Lampadas</ListItem>
                                    <ListItem>Camputadores</ListItem>
                                    <ListItem>Carregadores de celulares</ListItem>
                                </UnorderedList>
                            </Box>
                        </Box>     
                    </Box>
                    <Divider />
                    <Box>
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
                    </Box>
                </Stack>
            </Center>
            {/* <ComponentEmail open/> */}
        </Container>
        
    </>
    )
}


export default ComponentPerfil;