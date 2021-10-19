import React,{useEffect, useState} from 'react';
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
    Text,    
    IconButton,
    Spinner,
    InputGroup,
    InputRightElement,
    Heading,
    AspectRatio,
    Select,
    List,
    ListItem,
    transition,
    MenuButton,
    MenuList,
    MenuItem,
    Menu
 } from "@chakra-ui/react"

import {ArrowBackIcon,SearchIcon,ChevronDownIcon,HamburgerIcon} from "@chakra-ui/icons"

import ImagemLampadas from '../cadastro/imgs/lampadas.svg';
import ImagemPilhas from '../cadastro/imgs/baterias.svg';
import ImagemEletronicos from '../cadastro/imgs/eletronicos.svg';
import ListaLocalizacao from './imgs/localizacao.svg';
import ListaTempo from './imgs/relogio.svg';

import Axios from 'axios';
import {Map,Marker,TileLayer,Popup} from 'react-leaflet';
import '../../global.css';
import Us from './imgs/us.svg'
import Home from './imgs/home.svg'
import Search from './imgs/search.svg'

const dadosFake = [
    {
        nome:'Loja Amaral Junior',
        horarios: 'Aberto das 08:00 as 12:00 ate 13:00 as 18:00',
        localizacao:{
            endereco: 'Rua Antonio Manuel dos Santos',
            numero: 393,
            bairro: 'Cacador',
            cidade: 'Capivari de Baixo',
            localidade:[-28.4746953,-49.0162887]
        },
        codModalidades:[1,2,3]
    },
    {
        nome:'Giassi',
        horarios: 'Aberto das 08:00 as 12:00 ate 13:00 as 18:00',
        localizacao:{
            endereco: 'Pasto do Gado',
            numero: 393,
            bairro: 'Andrino',
            cidade: 'Tubarao',
            localidade:[-28.4943835,-48.9961946]
        },
        codModalidades:[1,2,3]
    },
    {
        nome:'Americanas',
        horarios: 'Aberto das 08:00 as 12:00 ate 13:00 as 18:00',
        localizacao:{
            endereco: 'Giassi',
            numero: 393,
            bairro: 'centro',
            cidade: 'tubarao',
            localidade:[-28.4746953,-49.0162887]
        },
        codModalidades:[1,2,3]
    }
]

function ComponentCardsPesquisa({data, onSelected}){
    const [showMessage,setShowMessage] = useState(false);
    return (
        <Stack
            width='calc(50% - 100px)'
            background='red'
            direction='column'
            spacing='25px'
            margin='20px'
            padding='10px'
            boxSizing='border-box'
            background='#F2F2F2'
            border='2px solid #2AC28B'
            borderRadius='10px'
            cursor='pointer'
            position='relative'
            _hover={
                {
                    boxShadow:'inset 0px 300px 300px 0px #737373',
                    transition:'all 1s'
                }
            }
            onMouseOver={(e)=> {
                setShowMessage(true)
            }}
            onMouseOut={()=> {
                setShowMessage(false);
            }}
        >
            <Center
                width='100%'
                height='100%'
                position='absolute'
                top='0px'
                left='0px'

            >
                <Button
                    padding='20px 30px'
                    borderRadius='10px'
                    cursor='pointer'
                    color='#fff'
                    letterSpacing='1px'
                    transition='all 2s'
                    _hover={{
                        boxShadow:'inset 500px 0px 20px 0px #009900'
                    }}
                    background='#00cc00'
                    fontFamily={`'Roboto', sans-serif`}
                    fontWeight='bold'
                    fontSize='15px'
                    display={showMessage ? `block` : `none`}
                    onClick={()=> onSelected(data)}

                >
                    Visualizar no mapa
                </Button>
            </Center>
            <Text 
                fontWeight='bolder'
                fontFamily={`'Roboto', sans-serif`}
                color='#43199C'
                align='center'
                fontSize='15px'
            >
                {data.nome}
            </Text>
            <List spacing='20px'>
                <ListItem
                    display='flex'
                    alignItems='center'
                    textAlign='left'
                    fontFamily={`'Roboto', sans-serif`}
                    color='#43199C'
                    fontSize='12px'
                >
                    <Image 
                        margin='0px 10px 0px 0px'
                        src={ListaTempo}
                    />
                    {data.horarios}
                </ListItem>
                <ListItem
                    display='flex'
                    alignItems='center'
                    textAlign='left'
                    fontFamily={`'Roboto', sans-serif`}
                    color='#43199C'
                    fontSize='12px'
                >
                    <Image 
                        src={ListaLocalizacao}
                        margin='0px 10px 0px 0px'
                    />
                    {`${data.localizacao.endereco}, `} 
                    {`${data.localizacao.bairro}, `}
                    {`${data.localizacao.numero}, `}
                    {`${data.localizacao.cidade}`}

                </ListItem>
            </List>
            <Center>
                <Stack direction='row' spacing='25px'>
                    <Image maxHeight='50px' width='auto' src={ImagemEletronicos}/>
                    <Image maxHeight='50px' width='auto' src={ImagemLampadas}/>
                    <Image maxHeight='50px' width='auto' src={ImagemPilhas}/>
                </Stack>
            </Center>
        </Stack>
    )
}



export function ComponentBusca(props){

    const [pointSelected,setPointSelected] = useState(null);
    const [position, setPosition] = useState([-28.4781703,-49.1820172]);
    const [zoom, setZoom] = useState(13);
    const [endereco, setEndereco] = useState({
        rua:null,
        bairro:null,
        numero:null,
        cidade:null,
        uf:null,
        cep:null
    });
    const [loaders, setLoaders] = useState({
        searchCEP:false,
        searchBusca:false
    });

    async function getCEP(){
        try{
            setLoaders({
                ...loaders,
                searchCEP:true
            });
    
            const { data:response } = await Axios
                .get(`https://viacep.com.br/ws/${endereco.cep}/json/`)
    
            const { data: responsePositionCode} = await Axios
                .get(`https://nominatim.openstreetmap.org/search?street=${
                    `${response.logradouro}` 
                    }&city=${
                        response.localidade
                    }&state=${
                        response.uf
                    }&postalcode=${
                        endereco.cep
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
                searchCEP:false
            });
    
        }catch(error){
            setLoaders({
                ...loaders,
                searchPosition:false
            });
            console.log(error.message)
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
                        //fontWeight='400'
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
                    Procura de pontos
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
                        fontSize='35px'
                        textAlign='center'
                        as="h1"
                        fontFamily={`'Ubuntu', sans-serif`}
                        color='#2AC28B'
                        padding='20px'

                >
                        Procura de pontos
                </Heading>
                <Stack
                    width='900px'
                    direction='column'
                    spacing='25px'
                >
                    <Box>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            margin='0px 0px 30px 0px'
                        >
                            <Text
                                fontSize='25px'
                                color='#322153'
                                fontFamily={`'Ubuntu', sans-serif`}
                                fontWeight='bolder'
                            >
                                Endereço
                            </Text>
                            <Text
                                fontSize='15px'
                                color='#6C6C80'
                                fontFamily={`'Roboto', sans-serif`}
                            >
                                Procure por sua cidade
                            </Text>
                        </Box>
                        <Box>
                            <Stack
                                width='100%'
                                direction='row'
                                spacing='35px'   
                            >
                                <Input 
                                    variant="outline" 
                                    type='text'
                                    width='50%'
                                    boxSizing='border-box'
                                    padding='15px'
                                    border='2px solid #2AC28B'
                                    borderRadius='10px'
                                    boxShadow='0px 2px 5px 0px rgb(150,150,150)'
                                    placeholder='Cidade'
                                    value={endereco.cidade}
                                    onInput={(e)=> setEndereco({...endereco, cidade: e.target.value})}
                                />
                                <Input 
                                    variant="outline" 
                                    type='text'
                                    width='20%'
                                    boxSizing='border-box'
                                    padding='15px'
                                    border='2px solid #2AC28B'
                                    borderRadius='10px'
                                    boxShadow='0px 2px 5px 0px rgb(150,150,150)'
                                    placeholder='UF'
                                    value={endereco.uf}
                                    onInput={(e)=> setEndereco({...endereco, uf: e.target.value})}
                                />
                                <InputGroup width='30%'>
                                    <InputRightElement
                                        height='100%'
                                        children={
                                            <IconButton
                                                background='#2AC28B'
                                                color='#FFF'
                                                minWidth='20px'
                                                minHeight='20px'
                                                width='30px'
                                                height='30px'
                                                maxWidth='40px'
                                                maxHeight='40px'
                                                right='10px'
                                                borderRadius='5px'
                                                cursor='pointer'
                                                onClick={getCEP}
                                            >
                                                {!loaders.searchCEP 
                                                    ? (<SearchIcon  height='50%' width='auto'/>)
                                                    : (<Spinner height='15px' width='15px' color='inherit'/>)
                                                }
                                            </IconButton>
                                        } 
                                    />
                                    <Input 
                                        variant="outline" 
                                        type='text'
                                        width='100%'
                                        height='100%'
                                        boxSizing='border-box'
                                        padding='15px'
                                        border='2px solid #2AC28B'
                                        borderRadius='10px'
                                        boxShadow='0px 2px 5px 0px rgb(150,150,150)'
                                        placeholder='CEP'
                                        value={endereco.cep}
                                        onInput={(e)=> setEndereco({...endereco, cep: e.target.value})}
                                        onKeyUp={(e)=>{
                                            if(e.key === 'Enter' && e.currentTarget === e.target)
                                                getCEP();
                                        }}
                                    />
                                </InputGroup>
                            </Stack>
                        </Box>
                    </Box>
                    <Box>
                        <Input 
                            width='100%'
                            boxSizing='border-box'
                            padding='15px'
                            border='2px solid #2AC28B'
                            borderRadius='10px'
                            boxShadow='0px 2px 5px 0px rgb(150,150,150)'
                            placeholder='Ex: ...Bairro, Rua, Numero'
                            _placeholder={{
                                letterSpacing:'2px'
                            }}
                            
                            value={
                                !endereco.bairro && !endereco.rua && !endereco.numero 
                                    ? null 
                                    : Object
                                        .values({
                                            bairro: endereco.bairro,
                                            rua: endereco.rua,
                                            numero: endereco.numero,
                                        })
                                        .toString()
                                        .replaceAll(',',', ') 
                            }
                        />
                    </Box>
                    <Box 
                        display='flex'
                        justifyContent='space-between'
                        alignItems='flex-end'
                    >
                        <FormControl width='80%'>
                            <FormLabel
                                fontSize='15px'
                                color='#6C6C80'
                                fontFamily={`'Roboto', sans-serif`}
                                margin='0px 0px 10px 0px'
                            >
                                Nome do ponto de coleta
                            </FormLabel>
                            <InputGroup>
                                <InputRightElement
                                    height='100%'
                                    color='#2AC28B'
                                    children={<SearchIcon marginRight='15px' height='20px' width='auto'/>} 
                                />
                                <Input 
                                    variant="outline" 
                                    type='text'
                                    background='#F0F0F5'
                                    width='100%'
                                    borderRadius='15px'
                                    padding='15px 50px 15px 15px'
                                    border='2px solid transparent'
                                    boxSizing='border-box'
                                />
                            </InputGroup>
                        </FormControl>
                        <Button 
                            maxWidth='20%'
                            fontSize='20px'
                            padding='15px 25px'
                            background='#2AC28B'
                            fontWeight='bolder'
                            color='#FFF'
                            boxShadow='0px 2px 2px 0px rgb(150,150,150)'
                            borderRadius='5px'
                            rightIcon={
                                loaders.searchBusca && 
                                    <Spinner 
                                            thickness="4px" 
                                            speed="0.8s" 
                                            marginLeft='10px' 
                                            width='18px' 
                                            height='18px' 
                                    />
                            }
                            className='button-submit'
                            onClick={()=> setLoaders({...loaders,searchBusca:true})}
                        >
                            Buscar
                        </Button>
                    </Box>
                    <Box>
                        <Text
                            margin='50px 0px 25px 0px'
                            fontSize='25px'
                            color='#322153'
                            fontFamily={`'Ubuntu', sans-serif`}
                            fontWeight='bolder'
                        >
                            Resultado(s) encontrado(s)
                        </Text>
                        <Box
                            padding='40px'
                            border='1px solid #d5f6ea'
                            borderRadius='10px'
                        >
                            <Box
                                display='flex'
                                flexDirection='row'
                                alignItems='center'
                                justifyContent='center'
                                flexWrap='wrap'
                            >
                                {dadosFake.map(el =>{
                                    return (
                                        <ComponentCardsPesquisa
                                            data={el}
                                            onSelected={(d)=>{
                                                setPointSelected(d.localizacao.localidade)
                                            }}
                                        />
                                    )
                                })}
                            </Box>

                            <Stack
                                direction='column'
                                spacing='15px'
                                margin='100px 0px 0px 0px'
                            >
                                <Text
                                    fontSize='15px'
                                    color='#6C6C80'
                                    fontFamily={`'Roboto', sans-serif`}
                                >
                                    Localização
                                </Text>
                                <Box  height='400px' background='#f2f2f2'>
                                    {!pointSelected ? 
                                    (
                                        <Center 
                                            width='100%' 
                                            height='100%' 
                                            zIndex='10'
                                        >
                                            <Text 
                                                fontFamily={`'Roboto', sans-serif`} 
                                                fontWeight='600' 
                                                fontSize='25px' 
                                                color='#666666'
                                            >
                                                Selecione um dos itens para visualizacao no mapa
                                            </Text>
                                        </Center>
                                    )
                                : <Map 
                                    center={pointSelected} 
                                    zoom={zoom} 
                                    style={{width:`100%`,height:'100%',zIndex:10}}
                                >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {/*
                                    VERIFICAR VERSAO NOVA PARA ADICIONAR MAIS E UM MARCADOR
                                {
                                    dadosFake.map(dataPoint => {
                                        return (
                                            <>
                                                <Marker 
                                                    position={dataPoint.localizacao.localidade}
                                                >
                                                    <Popup>
                                                        {dataPoint.nome}
                                                    </Popup>
                                                </Marker>
                                            </>
                                        )
                                    })
                                } */}
                                <Marker 
                                    position={pointSelected}
                                >
                                    <Popup>
                                        Estou aqui
                                    </Popup>
                                </Marker>
                            </Map>}
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
            </Center>
        </Container>
    )
}


export default ComponentBusca;