import React, { useState, useEffect } from 'react';
import { vw, vh } from 'react-native-expo-viewport-units';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import {  Text, View, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';



export default function Search( props: any )
{




useFonts({
    Poppins_500Medium,
});

const [state, setState] = useState();
const [city, setCity] = useState(0);
const [resEstados=[], setResEstados] = useState()
const [markers=[], setMarkers] = useState(false);


useEffect(() => {
    function goToMap() {
        props.navigation.navigate('Map', {
            body: markers
        
        })
    }

    if(markers != false)
{
        goToMap();
}

},[markers])


useEffect(()=> {
    async function sendServer(){
        let response = await fetch('http://192.168.0.112:3032/estados', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
         setResEstados(await response.json())
        
    }

   

    sendServer();
}, [])




// console.log(estadosRes.name);


resEstados.map(({name, cidades}) => {
    // console.log("Estado: " + name)
    cidades.map(({name}) => {
    // console.log("Cidade: " + name)
})
})



async function sendForm(){
    let markersResponse = await fetch('http://192.168.0.112:3032/pesquisa', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        estado: state,
        cidade: city
      })
})

 setMarkers(await markersResponse.json())

}



// console.log("SEARCH: " + markers)


let on: boolean;
let buttonEnable = false;

let dataCity = [];

on = false;

resEstados.map(({name, cidades}) => {
    if(state == name)
    {
        on= true;
        for(let i=0; i< cidades.length; i++)
        {
            dataCity.push(cidades[i].name)
        }

        for (let i=0; i< cidades.length; i++)
        {
            if(cidades[i].name == city)
            {
                buttonEnable = true;

            }
        }
        console.log("BUTTONENABLE: " + buttonEnable)
        console.log("ESTADO ATUAL: " + state)
        console.log("CIDADE ATUAL: " + city)
    }
})




    return(
    <View style={css.content}>
            <View style={css.textsBox}>
            <Image
                style={css.recic}
                source={require('../img/recic.png')}
            />
                <View style={css.headerBox}>
                    <Text style={css.titlePage}>Seu marketplace</Text>
                    <Text style={css.titlePage}>de coleta de</Text>
                    <Text style={css.titlePage}>resíduos </Text>
                </View>
                <View >
                    <Text style={css.textPage}>Ajudam pessoas a encontrarem</Text>        
                    <Text style={css.textPage}>pontos de coleta de forma eficiente.</Text>        
                </View>
            </View>

            <View style= {css.pickerBox}>
                <Picker 
                    selectedValue={state}
                    onValueChange={(itemValue, itemIndex) =>
                        setState(itemValue)
                    }                    
                    
                    >
                    <Picker.Item label="Escolha um estado" value=""  />
                    {resEstados.map(({name})=> 
                        {
                            return <Picker.Item value={name} label={name} key={name} />
                        })
                        }
                </Picker>
                

                <Picker
                        selectedValue={city}
                        onValueChange={(itemValue, itemIndex) =>
                            setCity(itemValue)
                        } 
                        style={css.pickerItem} 
                        enabled={on}

                        >
                    <Picker.Item label="Selecione sua cidade" value=""/>
                        {dataCity.map((data)=> 
                            {
                                return <Picker.Item value={data} label={data} key={data}/>
                            })
                        }
                </Picker>

            </View>
            

            <TouchableOpacity disabled={(!buttonEnable) ? true : false} onPress={() => sendForm()} style={(!buttonEnable) ? css.buttonDisabled : css.button}>
            <Image
                style={(!buttonEnable) ? css.buttonExtensionDisabled : css.buttonExtension}
                source={require('../img/buttonExtension.png')}
            />
                <Text style={css.textButton}>{(!buttonEnable) ? "Escolha acima      ": "Entrar"} </Text>
            </TouchableOpacity>

            
        </View>
        
    );



}



const css = StyleSheet.create({



    recic: {
        width: 350,
        height: 350,
        position: 'absolute',
        left: vw(-40),
        top: vh(-10),
    },

    content: {
        width: vw(100),
        height: vh(100),
        flex: 1,
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: "#E5E5E5"

    },

    headerBox: {
        marginTop: vh(13),
    },
    textsBox: {
        marginLeft: vw(10),
    },
    
    titlePage:{
        fontFamily: 'Poppins_500Medium',
        fontSize: vh(4),
        color: '#2AC28B',
    },

    textPage: {
    
        fontFamily: 'Poppins_500Medium',
    },
    pickerBox: {
        alignSelf: "center",
        width: vw(80),
        marginTop: vh(25),
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
    },

    pickerItem: {
        borderColor: "#E5E5E5",
        borderWidth: 10,      
        borderRadius: 4 
    },

    button: {
        position: 'relative',
        backgroundColor: '#2AC28B',
        marginLeft: vw(10),
        width: vw(80),
        height: vh(7),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        color: '#FFFFFF',   
        flexDirection: 'row',
        marginBottom: 30,
    },

    buttonDisabled: {
        position: 'relative',
        backgroundColor: 'crimson',
        marginLeft: vw(10),
        width: vw(80),
        height: vh(7),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        color: '#FFFFFF',   
        flexDirection: 'row',
        marginBottom: 30,
    },

    buttonExtension: {
        position: 'absolute',
        width: vw(12),
        height: vh(10),
        left: 0,
    },
        buttonExtensionDisabled: {
        display:'none',
    },
    textButton: {
        fontFamily: 'Poppins_500Medium',
        color: '#FFFFFF',
    }

})
