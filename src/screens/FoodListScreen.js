import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { getFoods, signout } from '../api/FoodsApi';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome';

class FoodList extends Component {
  static navigationOptions = ({ navigation }) => {

    onSignedOut = () => {
      navigation.navigate('Auth');
    }

    return {
        title:'Cardápio',
      headerRight: (

        <Button
          backgroundColor='transparent'
          color='#104D04'
          margin='10'
          title='Sair'
          onPress={() => signout(onSignedOut)} />
      )
    }
  };

  state = {
    foodList: [],
    selectedIndex: 0
  }

  onFoodAdded = (food) => {
    this.setState(prevState => ({
      foodList: [...prevState.foodList, food]
    }));
    this.props.navigation.popToTop();
  }

  onFoodDeleted = () => {

    var newFoodList = [...this.state.foodList];
    newFoodList.splice(this.state.selectedIndex, 1);

    this.setState(prevState => ({
      foodList: prevState.foodList = newFoodList
    }));

    this.props.navigation.popToTop();
  }

  onFoodsReceived = (foodList) => {
    this.setState(prevState => ({
      foodList: prevState.foodList = foodList
    }));
  }

  componentDidMount() {
    getFoods(this.onFoodsReceived);
  }

  showActionButton = () =>
    <ActionButton
      buttonColor='#104D04'
      onPress={() => this.props.navigation.navigate('FoodForm', { foodAddedCallback: this.onFoodAdded })}
    />


  render() {
    return this.state.foodList.length > 0 ?
      <SafeAreaView style={styles.container}>
      <View 
      backgroundColor=''
      style={styles.lista}>
                <Text style={styles.texto}> Lista de Itens</Text>
      </View>
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View>
              <ListItem
                containerStyle={styles.listItem}
                title={item.name}
                subtitle={`R$: ${item.category}`}
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subtitleStyle}
                leftAvatar={{
                  size: 125,
                  rounded: true,
                  source: item.image && { uri: item.image }
                }}

                onPress={() => {
                  Tts.speak("Item "+item.name),
                   Tts.speak("Este produto custa "+item.category+" reais"),
          

                  this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                  this.props.navigation.navigate('FoodDetail', { food: item, foodDeletedCallback: this.onFoodDeleted })

                }
                }

              />
              </View>
            );
          }
          }
            /> 
        {this.showActionButton()}
      </SafeAreaView> 

      :
      <View 
      
      style={styles.textContainer}>
        <Text style={styles.emptyTitle}>Cardápio Vazio!</Text>
        <Text style={styles.emptySubtitle}>Adicione um item no botão + </Text>
        {this.showActionButton()}
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 50,
    color:'#104D04'
  },
  subtitleStyle: {
    fontSize: 45,
    color:'#104D04'
  },
  emptyTitle: {
    fontSize: 50,
    marginBottom: 16
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic'
  },
  lista:{
    backgroundColor:'#104D04',
    width:'100%',
    height:60,
    padding:15,
    alignItems:'center'
  },
  texto:{
    color:'white',
    fontSize:25
  }

});

export default FoodList;