import React, {useState, useEffect} from 'react';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { vw, vh } from 'react-native-expo-viewport-units';
import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'




export default function Map(props: any ){
    useFonts({
        Poppins_500Medium,
    });


const [markers = [], setMarkers] = useState();
const [initLatitude, setInitLatitude] = useState(props.route.params.initLatitude);
const [initLongitude, setInitLongitude] = useState(props.route.params.initLongitude);


useEffect(()=> {
    async function resMarkers(){
        let markersTemp =  await props.route.params.body;
        
        setMarkers(await markersTemp)
        
    }

    resMarkers();
}, [])

if(props.route.params.latitude == 0 || props.route.params.longitude == 0){
    alert("Problemas ao obter localização do usuário.\nO sistema de rotas pode apresentar falhas!")
    console.log("Entrou no IF")
        Geolocation.getCurrentPosition((pos)=>{
        setInitLatitude(pos.coords.latitude)
        setInitLongitude(pos.coords.longitude)


    console.log('latitude:' + initLatitude);
    console.log('longitude:' + initLongitude);
}, 
(erro) => {
    console.log('Erro: ' + erro.message)
    // alert("Erro ao obter localização do usuário!\n Reinicie o aplicativo para corrigir esse problema!");
}
, {
    enableHighAccuracy: false, timeout: 10000, maximumAge:10000
});
}

    return(
        <View style={css.container}>
            <View style={css.header}>
                <Text style={css.titlePage}>Bem-vindo</Text>
                <Text style={css.description}>Encontre no mapa um ponto de coleta.</Text>
            </View>

            <MapView 
            style={css.mapStyle}
            initialRegion={{
                latitude: props.route.params.latitude,
                longitude: props.route.params.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            >
                {markers.map(({id, name, latitude, longitude, description, whatsapp, number, city, uf, address, district, image, itens}) => {
                    return console.log("aqui"), <Marker
                    style={css.marker}
                        key={id}
                        coordinate={{ latitude : latitude , longitude : longitude }}
                        title={name}
                        image= {(itens.length > 1) ? require('../img/map_marker.png') :
                                (itens[0].title == "Eletrônicos") ? require('../img/marker_trash.png') : require('../img/marker_oil.png')}
                        >
                            <Callout tooltip
                            onPress={() => props.navigation.navigate('Place', {
                                name: name,
                                id: id,
                                latitude: latitude,
                                longitude: longitude,
                                description: description, 
                                whatsapp: whatsapp, 
                                number: number, 
                                city: city, 
                                uf: uf, 
                                address: address, 
                                district: district, 
                                image: image,
                                itens: itens,
                                initLatitude: initLatitude,
                                initLongitude: initLongitude
                            })}>
                                <View >
                                    <View style={css.bubble}>
                                        <Text style={css.name}>{name}</Text>
                                        <Text style={css.click}> Clique aqui para saber mais</Text>
                                    </View>
                                    <View style={css.arrowBorder}/>
                                    <View style={css.arrow}/>
                                </View> 
                            </Callout>
                        </Marker>
                })}
            </MapView>
        </View>
    )
}

const css = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#2AC28B',
        width: vw(100),
    },
    titlePage:{
        marginLeft: vw(4),
        fontFamily: 'Poppins_500Medium',
        fontWeight: 'bold',
        fontSize: vh(4),
        color: '#FFF',
    },
    bubble: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#2AC28B',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 1.5,
        width: 150,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#2AC28B',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#2AC28B',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    },
    description: {
        marginLeft: vw(4),
        fontFamily: 'Poppins_500Medium',
        fontStyle: 'italic',
        fontSize: vh(2.5),
        color: '#FFF',
    },
    mapStyle: {
        width: vw(100),
        height: vh(50),
        flex: 1,
    },
    name: {
        fontSize: 16,
        marginBottom: 5,
        color: '#fff'
    },
    click: {
        fontSize: 10,
        marginBottom: 2.5,
        color: '#fff'        
    },
    marker: {
        width: vw(2),
        height: vh(2)

    }
})
