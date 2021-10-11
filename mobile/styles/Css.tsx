import { StyleSheet, Dimensions } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';

// var [fonts] = useFonts({
//     Poppins_500Medium,
//   });



const css = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlePage:{
        marginTop: 10,
    },

    textPage: {
        backgroundColor: 'orange',
        marginTop: vh(10),
        fontFamily: 'Poppins_500Medium',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#2AC28B',
        marginLeft: vw(10),
        width: vw(80),
        height: vh(7),
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins_500Medium'
    }

})

export {css};