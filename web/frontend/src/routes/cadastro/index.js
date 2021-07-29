import React,{useState} from 'react';
import { 
    Container, 
    Input,
    FormControl,
    FormLabel,
    Box,
    Stack,
    Center,
    Image,
    Button,
    Wrap,
    WrapItem,
    Text,    
    IconButton,
    InputGroup,
    InputRightElement,
    Heading,
    AspectRatio
 } from "@chakra-ui/react"

import {DownloadIcon,ArrowBackIcon,SearchIcon} from "@chakra-ui/icons"
import ImagemLampadas from './imgs/lampadas.svg';
import ImagemPilhas from './imgs/baterias.svg';
import ImagemEletronicos from './imgs/eletronicos.svg';


export function componentConcluido(props){

    return (
        <Container 
            display='flex'
            alignItems='center'
            justifyContent='flex-start'
            maxWidth='lg'
            background='#2AC28B'
            centerContent={true}
        >
            <Box
                width='100%'
                background='#219653'
                position='fixed'
                top='0px'
                zIndex={1000}
            >
                <Button
                    leftIcon={<ArrowBackIcon width='25px' height='auto'/>}
                    variant="solid"
                    padding='25px'
                    background='transparent'
                    fontSize='25px'
                    color='#fff'
                    fontFamily={`'Ubuntu', sans-serif`}
                    fontWeight='bolder'
                >
                    Home
                </Button>
            </Box>
                
            <Center
                display='block'
                padding='100px'
                background='#FFF'
                overflow='auto'
            >
                <Stack
                    direction='column'
                    spacing='50px'
                    
                >
                    <Heading
                        display='block'
                        fontSize='35px'
                        textAlign='center'
                        as="h1"
                        fontFamily={`'Ubuntu', sans-serif`}
                        color='#2AC28B'
                        padding='20px'

                    >
                    
                        Dados
                    </Heading>
                
                    <form>
                        <Stack
                            direction='column'
                            spacing='120px'
                            maxWidth='800px'
                            minWidth='600px'
                            width='700px'
                        >
                        <Box>
                            <Text
                                fontSize='25px'
                                fontWeight='bolder'
                                color='#322153'
                                fontFamily={` 'Ubuntu', sans-serif`}
                                margin='0px 0px 30px 0px'
                            >
                                Dados
                            </Text>
                            <FormControl
                                display='block'
                                id='nome'
                                className='inputs-form-hover'
                            >
                                    <FormLabel 
                                        marginBottom='10px'
                                        color='#322153'
                                        fontFamily={`'Poppins', sans-serif`}
                                    >
                                        Nome da entidade
                                    </FormLabel>
                                    <Input 
                                        variant="outline" 
                                        type='text'
                                        background='#F0F0F5'
                                        width='100%'
                                        height='50px'
                                        borderRadius='15px'
                                        padding='20px'
                                        boxSizing='border-box'
                                    />
                            </FormControl>
                            <FormControl
                                display='block'
                                margin='50px 0px 0px 0px'
                                id='email'
                                className='inputs-form-hover'
                            >
                                    <FormLabel 
                                        marginBottom='10px'
                                        color='#322153'
                                        fontFamily={`'Poppins', sans-serif`}
                                    >
                                        E-mail
                                    </FormLabel>
                                    <Input 
                                        variant="outline" 
                                        type='text'
                                        background='#F0F0F5'
                                        width='100%'
                                        height='50px'
                                        borderRadius='15px'
                                        padding='20px'
                                        boxSizing='border-box'
                                        //children={}
                                        
                                    />
                            </FormControl>
                            <FormControl
                                display='block'
                                margin='50px 0px 0px 0px'
                                id='telefone'
                                className='inputs-form-hover'
                            >
                                    <FormLabel 
                                        marginBottom='10px'
                                        color='#322153'
                                        fontFamily={`'Poppins', sans-serif`}
                                    >
                                        WhatsApp
                                    </FormLabel>
                                    <Input 
                                        variant="outline" 
                                        type='text'
                                        background='#F0F0F5'
                                        width='50%'
                                        height='50px'
                                        borderRadius='15px'
                                        defaultValue={`(\t)`}
                                        padding='20px'
                                        boxSizing='border-box'
                                        //children={<span>( )</span>}
                                    />
                            </FormControl>
                        </Box>
                        <Box>
                            <Text
                                fontSize='25px'
                                fontWeight='bolder'
                                color='#322153'
                                fontFamily={` 'Ubuntu', sans-serif`}
                                margin='0px 0px 30px 0px'
                            >
                                Endereco
                            </Text>
                            <AspectRatio  height='auto'>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224450.92494095035!2d-49.18201722145378!3d-28.478170264824826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952142efba29114d%3A0xb811c0e3c0044343!2sTubar%C3%A3o%20-%20SC!5e0!3m2!1spt-BR!2sbr!4v1626543760241!5m2!1spt-BR!2sbr" 
                            />
                            </AspectRatio>
                            <Stack
                                spacing='20px'
                                direction='row'
                                margin='30px 0px 0px 0px'
                            >
                                <FormControl
                                    display='block'
                                    id='numero'
                                    width='30%'
                                    className='inputs-form-hover'
                                >
                                        <FormLabel 
                                            marginBottom='10px'
                                            color='#322153'
                                            fontFamily={`'Poppins', sans-serif`}
                                        >
                                            Numero
                                        </FormLabel>
                                        <Input 
                                            variant="outline" 
                                            type='text'
                                            background='#F0F0F5'
                                            width='100%'
                                            height='50px'
                                            borderRadius='15px'
                                            padding='20px'
                                            boxSizing='border-box'
                                            //children={}
                                            
                                        />
                                </FormControl>
                                <FormControl
                                    display='block'
                                    id='endereco'
                                    className='inputs-form-hover'
                                >
                                        <FormLabel 
                                            marginBottom='10px'
                                            color='#322153'
                                            fontFamily={`'Poppins', sans-serif`}
                                        >
                                            Endereco
                                        </FormLabel>
                                        <Input 
                                            variant="outline" 
                                            type='text'
                                            background='#F0F0F5'
                                            width='100%'
                                            height='50px'
                                            borderRadius='15px'
                                            padding='20px'
                                            boxSizing='border-box'
                                            //children={}
                                            
                                        />
                                </FormControl>
                            </Stack>
                            <Stack
                                spacing='20px'
                                direction='row'
                                margin='30px 0px 0px 0px'
                            >
                                <FormControl
                                    display='block'
                                    id='bairro'
                                    className='inputs-form-hover'
                                >
                                        <FormLabel 
                                            marginBottom='10px'
                                            color='#322153'
                                            fontFamily={`'Poppins', sans-serif`}
                                        >
                                            Bairro
                                        </FormLabel>
                                        <Input 
                                            variant="outline" 
                                            type='text'
                                            background='#F0F0F5'
                                            width='100%'
                                            height='50px'
                                            borderRadius='15px'
                                            padding='20px'
                                            boxSizing='border-box'
                                            //children={}
                                            
                                        />
                                </FormControl>
                                <FormControl
                                    display='block'
                                    width='40%'
                                    id='cep'
                                    className='inputs-form-hover'
                                >
                                        <FormLabel 
                                            marginBottom='10px'
                                            color='#322153'
                                            fontFamily={`'Poppins', sans-serif`}
                                        >
                                            CEP
                                        </FormLabel>
                                        <InputGroup>
                                            <InputRightElement
                                                height='100%'
                                                children={
                                                    <IconButton
                                                        background='#2AC28B'
                                                        color='#FFF'
                                                        padding= '5px'
                                                        right='10px'
                                                        borderRadius='5px'
                                                        cursor='pointer'
                                                    >
                                                        <SearchIcon height='20px' width='auto'/>
                                                    </IconButton>
                                                } 
                                            />
                                            <Input 
                                                variant="outline" 
                                                type='text'
                                                background='#F0F0F5'
                                                width='100%'
                                                height='50px'
                                                borderRadius='15px'
                                                padding='20px'
                                                paddingRight='50px'
                                                border='2px solid transparent'
                                                boxSizing='border-box'
                                            />
                                        </InputGroup>
                                </FormControl>
                                
                            </Stack>
                            
                        </Box>
                        <Box>
                            <Center
                                background='#E1FAEC'
                                borderRadius='5px'
                                height='500px'
                        >
                            <Center
                                width='80%'
                                height='80%'
                                borderRadius='10px'
                                border='3px dashed #2AC28B'
                            >
                                <Stack
                                    spacing='20px'
                                    direction='column'    
                                >
                                    <IconButton
                                        background='transparent'
                                        color='#2AC28B'
                                        icon={
                                            <DownloadIcon
                                                height='25px'
                                                width='auto' 
                                            />
                                        }
                                    />
                                    <Text
                                        fontFamily={`'Roboto', sans-serif`}
                                        color='#322153'
                                        fontWeight='bold'
                                        align='center'
                                    >
                                        Imagem do Estabelecimento
                                    </Text>
                                </Stack>
                            </Center>
                        </Center>
                        </Box>
                        <Box>
                            <Text
                                fontSize='25px'
                                fontWeight='bolder'
                                color='#322153'
                                fontFamily={` 'Ubuntu', sans-serif`}
                                margin='0px 0px 30px 0px'
                            >
                                Composicao da Coleta
                            </Text>
                            <Wrap>
                                <WrapItem
                                    background='#E1FAEC'
                                    width='calc(33.33% - 10px)'
                                    borderRadius='5px'
                                >
                                    <Center 
                                        width='100%'
                                        padding='20px 0px 20px 0px'
                                    >
                                        <Stack
                                            direction='column'
                                            spacing='20px'
                                        >
                                            <Image
                                                boxSize="100px"
                                                objectFit="cover"
                                                src={ImagemLampadas}
                                                alt="Lampadas"
                                            />
                                            <Text 
                                                align='center'
                                                color='#322153'
                                                fontFamily={`'Roboto', sans-serif`}
                                            >
                                                Lampadas
                                            </Text>
                                        </Stack>
                                    </Center>
                                </WrapItem>
                                <WrapItem
                                     background='#E1FAEC'
                                     width='calc(33.33% - 10px)'
                                     borderRadius='5px'
                                >
                                    <Center
                                        width='100%'
                                        padding='20px 0px 20px 0px'
                                    >
                                        <Stack
                                            direction='column'
                                            spacing='20px'
                                        >
                                            <Image
                                                src={ImagemPilhas}
                                                boxSize="100px"
                                                objectFit="cover"
                                                alt='Pilhas e baterias' 
                                            />
                                            <Text 
                                                align='center'
                                                color='#322153'
                                                fontFamily={`'Roboto', sans-serif`}
                                            >
                                                Pilhas e baterias
                                            </Text>
                                        </Stack>
                                    </Center>
                                </WrapItem>
                                <WrapItem
                                     background='#E1FAEC'
                                     width='calc(33.33% - 10px)'
                                     borderRadius='5px'
                                >
                                    <Center 
                                        width='100%'
                                        padding='20px 0px 20px 0px'
                                    >
                                        <Stack
                                            direction='column'
                                            spacing='20px'
                                        >
                                            <Image 
                                                src={ImagemEletronicos}
                                                boxSize="100px"
                                                objectFit="cover"
                                                alt='Eletronicos' 
                                            />
                                            <Text
                                                align='center'
                                                color='#322153'
                                                fontFamily={`'Roboto', sans-serif`}
                                            >
                                                Residuos Eletronicos
                                            </Text>
                                        </Stack>
                                    </Center>
                                </WrapItem>
                            </Wrap>
                        </Box>
                        <Box>
                            <Button
                                display='block'
                                padding='20px 50px 20px 50px'
                                color='#fff'
                                background='#2AC28B'
                                fontWeight='bolder'
                                borderRadius='10px'
                                fontSize='20px'
                                float='right'
                            >
                                Cadastrar ponto de coleta
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Stack>
            </Center>
        </Container>
    )
}


export default componentConcluido