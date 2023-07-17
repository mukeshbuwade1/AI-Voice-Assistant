import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS } from '../assets/Assets'
import EmptyComponent from '../components/EmptyComponent'
import Voice from '@react-native-voice/voice';
import { getAnswer } from '../api/Api'

const dummyMessages = [
    {
        role: 'user',
        content: 'How are you?'
    },
    {
        role: 'assistant',
        content: "I'm fine, How may i help you today."
    },
    {
        role: 'user',
        content: 'create an image of a dog playing with cat'
    },
    {
        role: 'assistant',
        content: 'https://storage.googleapis.com/pai-images/ae74b3002bfe4b538493ca7aedb6a300.jpeg'
    }
]

const HomeScreen = () => {
    const [message, setMessage] = useState([...dummyMessages, ...dummyMessages, ...dummyMessages, ...dummyMessages])
    const [isRecording, setIsRecording] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [result, setResult] =useState([])

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;
        Voice.onSpeechError = onSpeechErrorHandler;

        return ()=>{
            // destroy the voice instance 
            Voice.destroy().then(Voice.removeAllListeners)
        }
    }, [])

    function onSpeechStartHandler(e) {
        console.log("onSpeechStartHandler");
    }
    function onSpeechEndHandler(e) {
        setIsRecording(false)
        console.log("onSpeechEndHandler");
    }
    function onSpeechResultsHandler(e) {
        setIsRecording(false)
        let text =e?.value[0]
        setResult(text)
        console.log("onSpeechResultsHandler", e);
    }
    function onSpeechErrorHandler(e) {
        setIsRecording(false)
        console.log("onSpeechErrorHandler", e);
    }

    const renderItem = ({ item, index }) => {
        return <View style={[styles.chatRow, item.role == "user"
            ? { backgroundColor: "#fff", alignSelf: "flex-end", borderTopRightRadius: 0 }
            : { backgroundColor: "#b1fcd5", alignSelf: "flex-start", borderTopLeftRadius: 0 }]}>
            {
                item.content.includes("https://")
                    ? <Image source={{ uri: item.content }} width={200} height={200} style={{
                        borderRadius: 3,
                    }} />
                    : <Text style={{
                        fontFamily: FONTS.medium,
                        color: "#000",
                        fontSize: 13
                    }}>{item.content}</Text>
            }
        </View>
    }

    const handleRecordingButton = async () => {
        try {
            if (isRecording) {
                setIsRecording(false)
                await Voice.stop();
            }
            else {
                setIsRecording(true)
                await Voice.start('en-US');
            }

        } catch (error) {
            console.log("ERROR", error)
        }
    }
    const handleStopButton = () => {

    }
    const handleClearButton = () => {
        setMessage([])
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button title='t' onPress={
                    ()=>getAnswer()
                    }/>
                <Image source={require("../assets/images/bot.png")} style={styles.image} />
                {message.length > 0
                    ? <>
                        <Text style={styles.heading}>Assistant</Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={message}
                            keyExtractor={(item, index) => "a" + index}
                            renderItem={renderItem}
                            style={styles.contentContainerStyle}
                            contentContainerStyle={{
                                paddingVertical: 10
                            }}
                        />
                    </>
                    : <>
                        <Text style={styles.heading}>Featured</Text>
                        <EmptyComponent />
                    </>}
                <View >
                    {
                        isSpeaking ?
                            <TouchableOpacity onPress={handleStopButton} style={[styles.fixedBtn, { top: wp(6), left: 10, backgroundColor: "red" }]}>
                                <Text style={styles.fixedBtnText}>Stop</Text>
                            </TouchableOpacity>
                            : null
                    }
                    <TouchableOpacity onPress={handleRecordingButton}>
                        <Image source={isRecording ? require("../assets/images/voiceLoading.gif")
                            : require("../assets/images/recordingIcon.png")} style={styles.recordingIcon} />
                    </TouchableOpacity>
                    {
                        message.length > 0 ? <TouchableOpacity onPress={handleClearButton} style={[styles.fixedBtn, { top: wp(6), right: 10, }]}>
                            <Text style={styles.fixedBtnText}>Clear</Text>
                        </TouchableOpacity>
                            : null

                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
    heading: {
        fontSize: 20,
        color: "#000",
        fontFamily: FONTS.semiBold
    },
    image: {
        width: hp(10),
        height: hp(10),
        alignSelf: "center",
        marginTop: hp("3%"),

    },
    chatRow: {
        maxWidth: "80%",
        backgroundColor: "#fff",
        borderRadius: 5,
        marginVertical: 5,
        padding: 5
    },
    contentContainerStyle: {
        backgroundColor: "grey",
        width: "100%",
        minHeight: hp(70),
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 5
    },
    recordingIcon: {
        width: hp(10),
        height: hp(10),
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 10
    },
    fixedBtn: {
        position: "absolute",
        backgroundColor: "grey",
        height: wp(8),
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: "center"
    },
    fixedBtnText: {
        fontFamily: FONTS.medium,
        color: "#fff",
        fontSize: 13
    }

})