import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity ,
} from 'react-native';
import { Divider} from 'react-native-elements';
import { deleteFood } from '../api/FoodsApi'
import Icon from 'react-native-vector-icons/Entypo';
import Tts from 'react-native-tts';

class FoodDetailScreen extends Component {

  static navigationOptions = () => {
    return {
      title: 'Detalhes'
    }
  }

  render() {
    const food = this.props.navigation.getParam('food');
    const onFoodDeleted = this.props.navigation.getParam('foodDeletedCallback');

    console.log(food);
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('FoodForm', {food: food})}>
           <Image style={styles.icon} source={require('./images/editar.png')}/>
        </TouchableOpacity >
        <TouchableOpacity  onPress={() => Alert.alert(
                'Deseja apagar?',
                'Os dados não serão recuperados!',
                [
                  { text: 'Cancelar' },
                  { text: 'OK', onPress: () => { deleteFood(food, onFoodDeleted) } }
                ],
                { cancelable: false },
              )}>
            <Image style={styles.icon} source={require('./images/apagar.png')}/>
        </TouchableOpacity>
        </View>
        <Image style={styles.image} source={food.image && { uri: food.image }} />
        <Text style={styles.headerText}>{food.name}</Text>
        <Text style={styles.categoryText}>R$ {food.category}</Text>

        <Text style={styles.ingredientText}>Ingredientes</Text>
        {
          food.subIngredients === undefined || food.subIngredients.length == 0 ?
            <Text style={{
              fontSize:20
            }} onShow={Tts.speak('Nenhum Ingrediente Adicionado!')}>Nenhum Ingrediente Adicionado.</Text> : <FlatList onShow={Tts.speak('Este item contém os seguintes ingredientes:')}
              data={food.subIngredients}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() =>
                <Divider style={{ backgroundColor: 'black' }} />}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <Text style={styles.ingredientItemText}  onShow={Tts.speak(item)
              }>{item}</Text>
              }
            />
        }
      </View >
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icon:{
    width:5,
    height:5
  },
  headerText: {
    fontSize: 50,
    marginBottom: 20,
  },
  icon:{
    fontSize:15
  },
  image: {
    width: '100%',
    height:200,
    borderRadius:100,
    aspectRatio: 2,
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  categoryText: {
    fontSize: 45,
    marginBottom: 32,
  },
  ingredientText: {
    fontSize: 40,
    marginBottom: 32
  },
  ingredientItemText: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16
  },
  container: {
    alignItems: 'center'
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: 'grey'
  }
});

export default FoodDetailScreen;