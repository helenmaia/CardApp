import firebase from 'react-native-firebase';
import uuid4 from 'uuid/v4';


//Função para realizar o login
export function login({ email, password }) {
  firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((value) => console.log(value))
}
//Função para criar um cardápio(usuario)
export function signup({ email, senha, displayName }) {
  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((userInfo) => {
      console.log(userInfo)
      userInfo.user.updateProfile({ displayName: displayName.trim() })
        .then(() => { })
    })
}

//Função para identificar o cardapio logado
export function subscribeToAuthChanges(authStateChanged) {
  firebase.auth().onAuthStateChanged((user) => {
    authStateChanged(user);
  })
}

//função para sair do cardapio (logoff)
export function signout(onSignedOut) {
  firebase.auth().signOut()
    .then(() => {
      onSignedOut();
    })
}

//função de atualizar o item do cardapio
export function updateFood(food, updateComplete) {
  food.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log("Atualizando o item no firebase");

  firebase.firestore()
    .collection('Foods')
    .doc(food.id).set(food)
    .then(() => updateComplete(food))
    .catch((error) => console.log(error));
}

//função de apagar o item do cardapio

export function deleteFood(food, deleteComplete) {
  console.log(food);

  firebase.firestore()
    .collection('Foods')
    .doc(food.id).delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}

//função que carrega os itens do cardapio
export async function getFoods(foodsRetreived) {

  var foodList = [];

  var snapshot = await firebase.firestore()
    .collection('Foods')
    .orderBy('createdAt')
    .get()

  snapshot.forEach((doc) => {
    const foodItem = doc.data();
    foodItem.id = doc.id;
    foodList.push(foodItem);
  });

  foodsRetreived(foodList);
}

//função que salva a imagem do item (tanto na atualização quanto na adição do mesmo)

export function uploadItem(food, onFoodUploaded, { updating }) {

  if (food.imageUri) {
    const fileExtension = food.imageUri.split('.').pop();
    console.log("EXT: " + fileExtension);

    var uuid = uuid4();

    const fileName = `${uuid}.${fileExtension}`;
    console.log(fileName);

    var storageRef = firebase.storage().ref(`foods/images/${fileName}`);

    storageRef.putFile(food.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log("snapshot: " + snapshot.state);
          console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            console.log("Successo!");
          }
        },
        error => {
          unsubscribe();
          console.log("Erro no upload da Imagem: " + error.toString());
        },
        () => {
          storageRef.getDownloadURL()
            .then((downloadUrl) => {
              console.log("Imagem Disponivel: " + downloadUrl);

              food.image = downloadUrl;

              delete food.imageUri;

              if (updating) {
                console.log("Atualizando....");
                updateFood(food, onFoodUploaded);
              } else {
                console.log("Adicionando...");
                addFood(food, onFoodUploaded);
              }
            })
        }
      )
  } else {
    console.log("Pulando upload de imagem ");

    delete food.imageUri;

    if (updating) {
      console.log("Atualizando....");
      updateFood(food, onFoodUploaded);
    } else {
      console.log("Adicionando...");
      addFood(food, onFoodUploaded);
    }
  }
}

//adicionando o item no firebase
export function addFood(food, addComplete) {
  food.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  firebase.firestore()
    .collection('Foods')
    .add(food)
    .then((snapshot) => {
      food.id = snapshot.id;
      snapshot.set(food);
    }).then(() => addComplete(food))
    .catch((error) => console.log(error));
}