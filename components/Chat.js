import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected }) => {

    const { name, background } = route.params;
    const [messages, setMessages] = useState([]);

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setLists(JSON.parse(cachedMessages));
    }

    // Speech Bubble Customization
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    // Remove Input bar when offline
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    // Static Messages
    useEffect(() => {
        navigation.setOptions({ title: name });
        let unsubMessages;
        if (isConnected === true) {
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                })
                cacheMessageLists(newMessages)
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    const cacheMessageLists = async (messagesToCache) => {
        try {
          await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
          console.log(error.message);
        }
    };

    const onSend = async (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    const renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: route.params.id,
                    name
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Chat;