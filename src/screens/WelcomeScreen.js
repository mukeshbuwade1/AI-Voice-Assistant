import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp,heightPercentageToDP as hp  } from 'react-native-responsive-screen'
import { FONTS } from '../assets/Assets'

const WelcomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.heading}>Jarvis</Text>
                <Text style={styles.subHeading}>The future is here, powered by AI</Text>
                <Image source={require("../assets/images/welcome.png")} style={{
                    width: wp(80),
                    height: wp(80),
                    marginVertical:hp(11)
                }} />
                <TouchableOpacity style={styles.button}
                onPress={()=>navigation.navigate("Home")}
                >
                    <Text style={styles._text}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        color: "#000",
        fontFamily:FONTS.semiBold
    },
    subHeading: {
        fontSize: 15,
        fontFamily:FONTS.medium
    },
    button: {
        backgroundColor: "#019454",
        width: wp(80),
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    _text:{
        color:"#FFF",
        fontSize:18,
        fontFamily:FONTS.semiBold
    }
})