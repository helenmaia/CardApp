import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Image,
  StyleSheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const CurryImagePicker = ({ image, onImagePicked }) => {

  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (image) {
      console.log("useEffect: " + image);
      setSelectedImage({ uri: image });
    }
  }, [image])

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: 'Selecione uma Imagem', maxWidth: 800, maxHeight: 600 },
      response => {
        if (response.error) {
          console.log("Erro!");
        } else {
          console.log("Imagem: " + response.uri)
          setSelectedImage({ uri: response.uri });
          onImagePicked({ uri: response.uri });
        }
      }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
      </View>
      <View style={styles.button}>
        <Button 
        backgroundColor='transparent'
        color='#104D04'
        title="Adicionar Imagem" onPress={this.pickImageHandler} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  imageContainer: {
    marginBottom:15,
    borderRadius:100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '50%',
    height: 150
  },
  button: {
    marginTop: 15,
    borderRadius:15
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius:100
  }
})

export default CurryImagePicker;