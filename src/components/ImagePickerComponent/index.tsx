import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Solicitar permissão para acessar a galeria/câmera
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('É necessário conceder permissão para acessar a galeria!');
      return;
    }

    // Exibir o seletor de imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('É necessário conceder permissão para acessar a câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Escolher da Galeria" onPress={pickImage} />
      <Button title="Tirar Foto" onPress={takePhoto} />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0000003f"
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default ImagePickerComponent;
