import React, {useState, useEffect} from 'react';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { vw, vh } from 'react-native-expo-viewport-units';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';




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
                {markers.map(({id, title, markerLatitude, markerLongitude}) => {
                    return <Marker
                        key={id}
                        coordinate={{ latitude : markerLatitude , longitude : markerLongitude }}
                        title={title}
                        description="ababababa"
                        image= {require('../img/map_marker.png')}
                        >
                            <Callout onPress={() => props.navigation.navigate('Search')}>
                                <View>
                                    <Text>{title}</Text>
                                    <Text>Descrição</Text>
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
    }
})
