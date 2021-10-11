import React, {useState, useEffect} from 'react';
import { vw, vh } from 'react-native-expo-viewport-units';
import { StyleSheet, View, Text, Linking, Image, ScrollView, TouchableOpacity, ImageComponent } from 'react-native';
import Local from '@react-native-community/geolocation'
// import {  TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Map(props: any ){

    const [InitialLatitude, setLatitude] = useState(0);
    const [InitialLongitude, setLongitude] = useState(0);
    

    useEffect(()=>{
        
        Local.getCurrentPosition((pos)=>{
            setLatitude(pos.coords.latitude)
            setLongitude(pos.coords.longitude)
            console.log('asd');
        }, 
        (erro) => {
            alert('Erro: ' + erro.message)
        }
        , {
            enableHighAccuracy: true, timeout: 120000, maximumAge:1000
        });
    });

    // const teste = 'https://reactnative.dev/img/tiny_logo.png' or https://www.rocketseat.com.br/_next/image?url=https%3A%2F%2Fmedia.graphcms.com%2F4hbvOcc4QyqxtxvBLyyK&w=640&q=100

    const a = true;

    return(
        <SafeAreaView style={css.container}>

            <ScrollView >

                <View >
                    <Image style={css.photo} source={require('../img/place_photo.png')}/>
                    <Text style={css.name}>{props.route.params.name}</Text>
                    <Text style={css.description}>{props.route.params.description}</Text>
                    <Text style={css.address}>Endereço</Text>
                    <Text style={css.cityState}>{props.route.params.city + ', ' + props.route.params.uf}</Text>
                        <Text style={css.addressDistrict}>{props.route.params.address + ', ' + props.route.params.district}</Text>
                        <Text style={css.houseNumber}>{props.route.params.number}</Text>
                    <View style= {{flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>

                        {props.route.params.itens.map(({image, id, title}) => {
                            return <Image 
                                    key={id}
                                    source={(title == 'oleo') ? require('../img/oleo.png') : require('../img/lixo_eletronico.png')}/>
                        })}
                    </View>
                        
                    
                    <View style={css.footer}>



                        <View style={css.buttons}>
                            <View>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps/dir/?api=1&origin=' +InitialLatitude + ',' + InitialLongitude + '&destination=' + props.route.params.latitude +  ',' + props.route.params.longitude)} >
                                    <Image
                                        
                                        source={require('../img/go_button.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity style={{marginLeft: 15}} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=5548996767825&text=Hello%20World')} >
                                    <Image
                                        
                                        source={require('../img/whatsapp_button.png')}
                                    />
                                </TouchableOpacity>      
                            </View>

                        </View>
                    </View>
                </View>    
            </ScrollView>
            </SafeAreaView>

    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2AC28B',
        justifyContent: 'center',
        height: '100%'
    },
    off: {
        display: 'none',
    },
    name: {
        marginLeft: 30,
        marginTop: 30,
        color: '#322153',
        fontWeight: 'bold',
        fontSize: 36
    },
    photo: {
        alignSelf: 'center',
        width: vw(80),
        height: vh(30)
    },
    description: {
        marginLeft: 30,
        marginTop: 15,
        color: "#ffffff",
        fontSize: 20,
    },
    address: {
        marginLeft: 30,
        marginTop: 30,
        color: "#ffffff",
        fontSize: 16,
    },
    cityState: {
        marginLeft: 30,
        marginTop: 5,
        color: "#ffffff",
        fontSize: 18,
    },
    addressDistrict: {
        marginLeft: 30,
        color: "#ffffff",
        fontSize: 18,
    },
    houseNumber: {
        marginLeft: 30,
        color: "#ffffff",
        fontSize: 18,
    },
    
    footer: {
        marginTop: 150,
        marginBottom: 0,
        backgroundColor: '#ffffff',
        height: vh(13),

    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        
        
    }

})
