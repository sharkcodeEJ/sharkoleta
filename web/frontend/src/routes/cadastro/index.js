import React, { useState } from 'react';
import Axios from 'axios';
import api from '../../services/api';

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
    Textarea,
    IconButton,
    InputGroup,
    InputRightElement,
    Heading,
    Spinner
} from "@chakra-ui/react";

import { Map, Marker, TileLayer, Popup } from 'react-leaflet';

import { DownloadIcon, SearchIcon } from "@chakra-ui/icons"
import ImagemLampadas from './imgs/lampadas.svg';
import ImagemPilhas from './imgs/baterias.svg';
import ImagemEletronicos from './imgs/eletronicos.svg';
import Local from '../dadosColeta/imgs/Group.svg';
import SharkcoletaLogo from '../../styles/sharkcoleta_logo.png';

export function ComponentCadastro(props) {

    const classes = {
        selectedItem: {
            border: '3px solid #2AC28B',
            transform: 'scale(1.02)'
        }
    }

    const [loaders, setLoaders] = useState({
        searchCEP: false,
        searchPosition: false
    });
    const [position, setPosition] = useState([-28.4781703, -49.1820172]);
    // eslint-disable-next-line no-unused-vars
    const [zoom, setZoom] = useState(13);
    const [endereco, setEndereco] = useState({
        rua: null,
        bairro: null,
        numero: null,
        cidade: null,
        uf: null,
        cep: null
    });
    const [dados, setDados] = useState({
        name: null,
        email: null,
        description: null,
        whatsapp: null,
        fone: null,
        latitude: 10,
        longitude: 10,
        city: endereco.cidade,
        uf: endereco.uf,
        address: endereco.rua,
        district: endereco.bairro,
        number: endereco.numero,
        image: " ",
        cep: endereco.cep,
        itens: {
            id: 1
        }
    });

    const [itensSelected, setItensSelected] = useState({
        lampadas: false,
        pilhas: false,
        residuos: false
    });


    function getLocationPoint() {
        try {
            setLoaders({
                ...loaders,
                searchPosition: true
            });

            window.navigator.geolocation.getCurrentPosition(resolve => {
                const { latitude, longitude } = resolve.coords;
                setPosition([latitude, longitude]);

                Axios
                    .get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude
                        }&lon=${longitude
                        }&addressdetails=1&format=json`)
                    .then(resolve => {
                        const { data } = resolve;
                        setEndereco({
                            ...endereco,
                            cidade: data.address.city,
                            rua: data.address.road,
                            uf: data.address.state,
                            bairro: data.address.suburb,
                            cep: data.address.postcode,
                        });

                        setLoaders({
                            ...loaders,
                            searchPosition: false
                        });
                    });
            });
        } catch (error) {
            setLoaders({
                ...loaders,
                searchPosition: false
            });

            console.log(error);
        }
    }

    async function getCEP() {
        try {
            setLoaders({
                ...loaders,
                searchCEP: true
            });

            const { data: response } = await Axios
                .get(`https://viacep.com.br/ws/${endereco.cep}/json/`)

            const { data: responsePositionCode } = await Axios
                .get(`https://nominatim.openstreetmap.org/search?street=${`${response.logradouro}`
                    }&city=${response.localidade
                    }&state=${response.uf
                    }&postalcode=${endereco.cep
                    }&format=json&limit=1`
                )

            setEndereco({
                ...endereco,
                rua: response.logradouro,
                bairro: response.bairro,
                numero: response.siafi,
                cidade: response.localidade,
                uf: response.uf
            });

            setPosition([
                responsePositionCode[0].lat,
                responsePositionCode[0].lon,
            ]);

            setLoaders({
                ...loaders,
                searchCEP: false
            });

        } catch (error) {
            setLoaders({
                ...loaders,
                searchPosition: false
            });
            console.log(error.message)
        }
    }

    function formatNumber(strNumber) {
        if (!typeof strNumber === 'string') return;

        const length = strNumber.length;

        if (length === 2)
            return `(${strNumber.charAt(0)}${strNumber.charAt(1)}) `

        if (length === 9) {
            return `${strNumber.substring(-9)} - ${strNumber.substring(9)}`
        }
    }

    async function sendData(event) {
        event.preventDefault();
        alert("Dados: " + dados);

        try {
            await api.post('points', { dados }).then((result) => {
                console.log(result.data);
            })
                .catch((error) => {
                    console.log(error);
                });
        } catch (err) {
            console.log("erro: " + err);
        }
    }

    return (
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
                    Cadastro de ponto
                </Text>
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

                    <form onSubmit={sendData}>
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
                                    Informações pessoais
                                </Text>
                                <FormControl
                                    display='block'
                                    id='name'
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
                                        value={dados.name}
                                        borderRadius='15px'
                                        onInput={(e) => setDados({ ...dados, name: e.target.value })}
                                        padding='20px'
                                        boxSizing='border-box'
                                        className='dados-form'
                                        id='name'
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
                                        onInput={(e) => setDados({ ...dados, email: e.target.value })}
                                        value={dados.email}
                                    />
                                </FormControl>
                                <FormControl
                                    display='block'
                                    margin='50px 0px 0px 0px'
                                    id='description'
                                    className='inputs-form-hover'
                                >
                                    <FormLabel
                                        marginBottom='10px'
                                        color='#322153'
                                        fontFamily={`'Poppins', sans-serif`}
                                    >
                                        Descrição
                                    </FormLabel>
                                    <Textarea
                                        resize='vertical'
                                        variant="outline"
                                        type='text'
                                        background='#F0F0F5'
                                        width='100%'
                                        height='150px'
                                        borderRadius='15px'
                                        padding='20px'
                                        boxSizing='border-box'
                                        onInput={(e) => setDados({ ...dados, description: e.target.value })}
                                        value={dados.description}
                                    />
                                </FormControl>

                                <FormControl
                                    display='flex'
                                    justifyContent='space-between'
                                    maxWidth='100%'
                                    margin='50px 0px 0px 0px'
                                    id='telefone'
                                    className='inputs-form-hover'
                                >
                                    <div>
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
                                            width='100%'
                                            height='50px'
                                            borderRadius='15px'
                                            padding='20px'
                                            boxSizing='border-box'
                                            onInput={(e) => {
                                                const typeEvent = e.nativeEvent.inputType;

                                                const value =
                                                    e.target.value.length >= 2 && typeEvent !== "deleteContentBackward"
                                                        ? formatNumber(e.target.value) : e.target.value

                                                setDados({ ...dados, whatsapp: value })
                                            }}
                                            value={dados.whatsapp}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel
                                            marginBottom='10px'
                                            color='#322153'
                                            fontFamily={`'Poppins', sans-serif`}
                                        >
                                            Telefone secundário
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
                                            onInput={(e) => {
                                                const typeEvent = e.nativeEvent.inputType;

                                                const value =
                                                    e.target.value.length >= 2 && typeEvent !== "deleteContentBackward"
                                                        ? formatNumber(e.target.value) : e.target.value

                                                setDados({ ...dados, fone: value })
                                            }}
                                            value={dados.fone}
                                        />
                                    </div>
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
                                    Endereço
                                </Text>
                                <Box height='500px' position='relative'>
                                    <Map center={position} zoom={zoom} style={{ width: `100%`, height: '100%', zIndex: 10 }}>
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={position}>
                                            <Popup>
                                                Vocë esta aqui!
                                            </Popup>
                                        </Marker>
                                    </Map>
                                </Box>
                                <Stack
                                    spacing='20px'
                                    direction='row'
                                    margin='30px 0px 0px 0px'
                                >
                                    <FormControl
                                        display='block'
                                        id='cidade'
                                        maxWidth='40%'
                                        className='inputs-form-hover'
                                    >
                                        <FormLabel
                                            marginBottom='10px'
                                            color='#322153'
                                            fontFamily={`'Poppins', sans-serif`}
                                        >
                                            Cidade
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
                                            value={endereco.cidade}

                                        />
                                    </FormControl>
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
                                            value={endereco.bairro}

                                        />
                                    </FormControl>
                                    <FormControl
                                        display='block'
                                        maxWidth='15%'
                                        id='numero'
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
                                            value={endereco.numero}
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
                                            Endereço
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
                                            value={endereco.rua}
                                        />
                                    </FormControl>
                                    <FormControl
                                        display='block'
                                        maxWidth='25%'
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
                                                        minWidth='20px'
                                                        minHeight='20px'
                                                        width='40px'
                                                        height='40px'
                                                        maxWidth='50px'
                                                        maxHeight='50px'
                                                        right='10px'
                                                        borderRadius='5px'
                                                        cursor='pointer'
                                                        boxSizing='border-box'
                                                        onClick={() => getCEP()}
                                                    >
                                                        {!loaders.searchCEP
                                                            ? (<SearchIcon height='20px' width='20px' />)
                                                            : (<Spinner height='20px' width='20px' color='inherit' />)}

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
                                                onInput={(e) => setEndereco({ ...endereco, cep: e.target.value })}
                                                value={endereco.cep}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                                <Stack
                                    spacing='20px'
                                    direction='row'
                                    margin='30px 0px 0px 0px'
                                >
                                    <Button
                                        color='#FFF'
                                        padding='20px 40px'
                                        maxHeight='50px'
                                        maxWidth='400px'
                                        width='300px'
                                        minWidth='200px'
                                        borderRadius='10px'
                                        float='right'
                                        fontWeight='bolder'
                                        background='#2F80ED'
                                        boxSizing='border-box'
                                        cursor='pointer'
                                        leftIcon={
                                            !loaders.searchPosition
                                                ? (<Image color='inherit' width='20px' height='20px' marginRight='10px' src={Local} />)
                                                : (<Spinner thickness="4px" color='inherit' width='20px' height='20px' marginRight='10px'></Spinner>)
                                        }
                                        onClick={getLocationPoint}
                                    >
                                        Obter localização atual
                                    </Button>
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
                                        cursor='pointer'
                                        transition='all .5s'
                                        _hover={{
                                            background: 'rgba(150,150,150,0.3)'
                                        }}
                                        onClick={(event) => {
                                            const componentParent = event.currentTarget;
                                            const componentFile = document.createElement('input');
                                            componentFile.setAttribute('type', 'file');
                                            componentFile.click();

                                            componentFile.addEventListener('input', (e) => {
                                                const [file] = e.target.files;
                                                const readerFile = new FileReader();
                                                readerFile.readAsText(file);

                                                readerFile.addEventListener('load', (result) => {
                                                    const componentBackground = document.createElement('div');
                                                    Object.defineProperty(componentBackground, 'style', {
                                                        value: {
                                                            ...componentBackground.style,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '100%',
                                                            height: '100%',
                                                            position: 'absolute',
                                                            background: 'black'
                                                        }
                                                    });

                                                    componentBackground.innerHTML = result.currentTarget.result;
                                                    componentParent.appendChild(componentBackground);
                                                })
                                            })
                                        }}
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
                                        width='calc(33.33% - 20px)'
                                        borderRadius='5px'
                                        className='select-card'
                                        style={Boolean(itensSelected.pilhas) ? classes.selectedItem : null}
                                        onClick={() => {
                                            setItensSelected({
                                                ...itensSelected,
                                                pilhas: !itensSelected.pilhas
                                            })
                                        }}
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
                                        width='calc(33.33% - 20px)'
                                        borderRadius='5px'
                                        className='select-card'
                                        style={Boolean(itensSelected.lampadas) ? classes.selectedItem : null}
                                        onClick={() => {
                                            setItensSelected({
                                                ...itensSelected,
                                                lampadas: !itensSelected.lampadas
                                            })
                                        }}
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
                                        width='calc(33.33% - 20px)'
                                        borderRadius='5px'
                                        className='select-card'
                                        style={Boolean(itensSelected.residuos) ? classes.selectedItem : null}
                                        onClick={() => {
                                            setItensSelected({
                                                ...itensSelected,
                                                residuos: !itensSelected.residuos
                                            })
                                        }}
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
                                    type='submit'
                                    display='block'
                                    padding='20px 50px 20px 50px'
                                    color='#fff'
                                    background='#2AC28B'
                                    fontWeight='bolder'
                                    borderRadius='10px'
                                    fontSize='20px'
                                    float='right'
                                    boxShadow='0px 2px 2px 0px rgb(150,150,150)'
                                    className='button-submit'
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

export default ComponentCadastro