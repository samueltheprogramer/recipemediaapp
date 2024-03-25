"use client";

import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { auth, db, storage } from "../config/firebase";
import Navbar from "../components/Navbar";
import { ref, uploadBytes } from "firebase/storage";

export default function CreatePost() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstruction] = useState("");
  const [durations, setDurations] = useState("");
  const [recipeImage, setRecipeImage] = useState();
  const [recipeImageName, setRecipeImageName] = useState("");

  const postsCollectionRef = collection(db, "recipes");

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      recipeName,
      ingredients,
      instructions,
      durations,
      recipeImageName,
      author: {
        name: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        photoURL: auth.currentUser.photoURL,
      },
    });
  };

  const imageName = () => {
    setRecipeImageName(recipeImage?.name);
  };
  const addImage = async () => {
    if (recipeImage == null) return;
    const metadata = { contentType: "image/jpeg" };
    const imageRef = ref(storage, `images/${recipeImage.name}`);
    await uploadBytes(imageRef, recipeImage, metadata);
  };

  const handleUplodeImage = () => {
    addImage();
    imageName();
  };

  return (
    <div className="createPostPage  bg-green-300 ">
      <div className="bg-green-800 text-xl font-extrabold text-center text-white w-full">
        <h1>RecipeMedia App</h1>
      </div>
      <Navbar />
      <div className="cpContainer mt-6 mb-12">
        <h1>Create A Recipes</h1>
        <div className="inputGp">
          <label> Name:</label>
          <input
            type="text"
            className="text-black"
            placeholder="Name..."
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label> Ingredients:</label>
          <textarea
            className="text-black"
            type="text"
            placeholder="Eg: 1 this ,2 that..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label> Instructions:</label>
          <textarea
            className="text-black"
            type="text"
            placeholder="
            Eg: step1: add this ,step 2:put that....
            
            "
            value={instructions}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label> Duration:</label>
          <input
            type="text"
            className="text-black"
            placeholder="minutes"
            value={durations}
            onChange={(e) => setDurations(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label> Recipe Image:</label>
          <input
            type="file"
            className="text-green-500"
            filename={recipeImage}
            onChange={(e) => setRecipeImage(e.target.files[0])}
          />
        </div>
        <button onClick={handleUplodeImage}>Uplode Image</button>
        <button onClick={createPost}> Submit Recipe</button>
      </div>
    </div>
  );
}
