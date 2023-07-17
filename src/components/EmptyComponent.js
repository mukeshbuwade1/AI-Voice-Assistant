import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../assets/Assets'

const EmptyComponent = () => {
    return <View style={{flex:1}}>
        {/* ChatGPT View  */}
        <View style={styles.emptyRow}>
            <View style={styles.emptyRowChild}>
                <Image alt='chatgpt icon' source={require("../assets/images/chatgptIcon.png")} style={styles.icons} />
                <Text style={styles.emptyRowHeading}>ChatGPT</Text>
            </View>
            <Text style={styles.emptyRowText}>ChatGPT is notable for enabling users to refine and steer a conversation towards a desired length, format, style, level of detail, and language used</Text>
        </View>

        <View style={[styles.emptyRow, { backgroundColor: "#f5d7fc" }]}>
            <View style={styles.emptyRowChild}>
                <Image alt='dalleIcon' source={require("../assets/images/dalleIcon.png")} style={styles.icons} />
                <Text style={styles.emptyRowHeading}>Dall-E</Text>
            </View>
            <Text style={styles.emptyRowText}>ChatGPT is notable for enabling users to refine and steer a conversation towards a desired length, format, style, level of detail, and language used</Text>
        </View>
        <View style={[styles.emptyRow, { backgroundColor: "#96fafa" }]}>
            <View style={styles.emptyRowChild}>
                <Image alt='smartai Icon' source={require("../assets/images/smartaiIcon.png")} style={styles.icons} />
                <Text style={styles.emptyRowHeading}>Smart AI</Text>
            </View>
            <Text style={styles.emptyRowText}>ChatGPT is notable for enabling users to refine and steer a conversation towards a desired length, format, style, level of detail, and language used</Text>
        </View>
    </View>
}

export default EmptyComponent

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        color: "#000",
        fontFamily: FONTS.semiBold
    },
    emptyRow: {
        marginVertical: 10,
        backgroundColor: "#acfcd9",
        padding: 10,
        borderRadius: 10
    },
    emptyRowChild: {
        flexDirection: "row",
        alignItems: "center",
    },
    emptyRowHeading: {
        color: "#000",
        marginLeft: 10,
        fontFamily: FONTS.semiBold,
        fontSize: 16,
    },
    emptyRowText: {
        fontSize: 13,
        fontFamily: FONTS.medium,
        color: "#000"
    },
    icons: {
        width: 35,
        height: 35,
    },
})