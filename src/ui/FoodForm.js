import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  ScrollView
} from 'react-native';
import GridList from '../ui/GridList';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { addFood, updateFood, uploadItem } from '../api/FoodsApi';
import CurryImagePicker from '../ui/CurryImagePicker';

const FoodForm = (props) => {

  setFoodImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <CurryImagePicker image={props.food.image} onImagePicked={setFoodImage} />
      <TextInput
        value={props.values.name}
        style={styles.longFormInput}
        placeholder='Item'
        onChangeText={text => { props.setFieldValue('name', text) }}
      />
      <Text style={styles.validationText}> {props.errors.name}</Text>
      <TextInput
        value={props.values.category}
        style={styles.longFormInput}
        placeholder='Valor'
        onChangeText={text => { props.setFieldValue('category', text) }}
      />
      <Text style={styles.validationText}> {props.errors.category}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.formInput}
          onChangeText={text => { props.setSubIngredients(text) }}
          placeholder='Ingredientes'
        />
        <Button
        backgroundColor='transparent'
        color='#104D04'
          style={styles.button}
          title='Add'
          onPress={() => { props.submitSubIngredients() }} />
      </View>
      <GridList
        style={{
          width:10,
          backgroundColor: '#104D04',
          marginBottom:15
        }}

        items={props.food.subIngredients}/>
      <Button
      style={{
          width:'100%',
          backgroundColor: '#104D04',
          marginBottom:15
        }}
        backgroundColor='transparent'
        color='#104D04'
        marginTop='26'
        
        title='Enviar'
        onPress={() => props.handleSubmit()}
      />
       </View>
      </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32
  },
  container: {
    width: '100%',
    padding:30,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  formInput: {
    borderColor: '#104D04',
    borderWidth: 1,
    padding: 8,
    height: 50,
    color: 'black',
    width: '75%',
    marginBottom: 5,
    marginTop: 16,
    borderRadius:15
  },
  validationText: {
    color: 'red'
  },
  longFormInput: {
    width: '100%',
    height: 50,
    color: 'black',
    borderColor: '#104D04',
    borderWidth: 1,
    padding: 8,
    borderRadius:15,
    margin: 16
  },
});

export default withFormik({
  mapPropsToValues: ({ food }) => ({
    name: food.name,
    category: food.category,
    imageUri: null
  }),
  enableReinitialize: true,
  validationSchema: (props) => yup.object().shape({
    name: yup.string().max(30).required("Adicione o item!"),
    category: yup.string().max(15).required("Informe o Valor!")
  }),
  handleSubmit: (values, { props }) => {
    console.log(props);

    values.subIngredients = props.food.subIngredients;

    console.log(values);

    if (props.food.id) {
      values.id = props.food.id;
      values.createdAt = props.food.createdAt;
      values.image = props.food.image;
      uploadItem(values, props.onFoodUpdated, { updating: true });
    } else {
      uploadItem(values, props.onFoodAdded, { updating: false });
    }
  },
})(FoodForm);
