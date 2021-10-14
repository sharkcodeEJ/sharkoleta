import React, {useState, useEffect} from 'react';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { vw, vh } from 'react-native-expo-viewport-units';
import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { color } from 'react-native-reanimated';




export default function Map(props: any ){
    useFonts({
        Poppins_500Medium,
    });


const [counterMarker, setCounterMarker] = useState(0);
const [markers = [], setMarkers] = useState();


useEffect(()=> {
    async function resMarkers(){
        let markersTemp =  await props.route.params.body;
        
         setMarkers(await markersTemp)
        
    }

    resMarkers();
}, [])

console.log("MAP:" + markers)



    return(
        <View style={css.container}>
            <View style={css.header}>
                <Text style={css.titlePage}>Bem-vindo</Text>
                <Text style={css.description}>Encontre no mapa um ponto de coleta.</Text>
            </View>

            <MapView 
            style={css.mapStyle}
            initialRegion={{
                latitude: -28.495696340879743,
                longitude: -49.01386381255002,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            >
                {markers.map(({id, name, markerLatitude, markerLongitude, type, description, whatsapp, number, city, uf, address, district, image, itens}) => {
                    return <Marker
                    style={css.marker}
                        key={id}
                        coordinate={{ latitude : markerLatitude , longitude : markerLongitude }}
                        title={name}
                        image= {(type == 1 ) ? require('../img/map_marker.png') : 
                                (type == 2 ) ? require('../img/marker_two.png') :
                                 require('../img/marker_three.png')}
                        >
                            <Callout tooltip
                            onPress={() => props.navigation.navigate('Place', {
                                name: name,
                                id: id,
                                latitude: markerLatitude,
                                longitude: markerLongitude,
                                description: description, 
                                whatsapp: whatsapp, 
                                number: number, 
                                city: city, 
                                uf: uf, 
                                address: address, 
                                district: district, 
                                image: image,
                                itens: itens
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
