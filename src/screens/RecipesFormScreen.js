import { View,Text,TextInput,TouchableOpacity,Image,StyleSheet,} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeedit } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  const saverecipe = async () => {
    try{
        const newrecipe = {
            title:title,
            image:image,
            description:description,
            ingredients:ingredients
        }
        const customReceipies = await AsyncStorage.getItem('customrecipes');
        console.log(customReceipies)
        let recipes = [];
        try{
            recipes = JSON.parse(customReceipies);
            if (!Array.isArray(recipes)) {
                recipes = [];
            }
        }catch(error){
            console.log('No recipies found / could not parse', error);
        }

        if(recipes[recipeIndex]){
            //This is an edit
            recipes[recipeIndex]=newrecipe;
        }else{
            //This is a new entry
            recipes.push(newrecipe);
        }

        onrecipeedit(recipes);
        await AsyncStorage.setItem('customrecipes',JSON.stringify(recipes));

        navigation.goBack();
    }catch(error){
        alert('An error occured');
        console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Input a list of instructions"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TextInput
        placeholder="Input list of ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, {height:hp(15),textAlignVertical:'top'}]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
