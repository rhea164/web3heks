import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Image, Keyboard } from 'react-native';
import { Text, Button, Icon, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Context } from '../context/PostContext';


const NewPostScreen = ({ navigation, route }) => {
    const { addPost } = useContext(Context);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handlePost = () => {
        // if (title && description) {
        //     const newPost = {
        //         id: Date.now().toString(),
        //         user: 'Karen', // Replace with actual user name
        //         avatar: 'https://randomuser.me/api/portraits/women/41.jpg', // Replace with actual user avatar
        //         title,
        //         description,
        //         image: image || 'https://via.placeholder.com/400x250',
        //         likes: 0,
        //         comments: 0,
        //     };
        // }

        addPost(title, description, image);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container} onTouchStart={dismissKeyboard}>
            <View style={styles.header}>
                <Avatar
                    rounded
                    source={{ uri: 'https://randomuser.me/api/portraits/women/41.jpg' }}
                    size="small"
                />
                <Text h4 style={styles.headerTitle}>New Post</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    placeholderTextColor="#8899AA"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Enter description"
                    placeholderTextColor="#8899AA"
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.uploadedImage} />
                    ) : (
                        <>
                            <Icon name="upload" type="feather" color="#8899AA" size={24} />
                            <Text style={styles.uploadText}>Upload media</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
            <Button
                title="Post"
                onPress={handlePost}
                buttonStyle={styles.postButton}
                disabled={!title || !description}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E2746',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    headerTitle: {
        color: '#FFF',
        marginLeft: 10,
    },
    inputContainer: {
        padding: 20,
    },
    input: {
        backgroundColor: '#2A365A',
        borderRadius: 10,
        padding: 15,
        color: '#FFF',
        marginBottom: 15,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    imageUpload: {
        backgroundColor: '#2A365A',
        borderRadius: 10,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        color: '#8899AA',
        marginTop: 10,
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    postButton: {
        backgroundColor: '#4ECDC4',
        marginHorizontal: 20,
        marginTop: 20,
    },
});

export default NewPostScreen;