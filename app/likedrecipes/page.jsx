"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { FaDeleteLeft } from "react-icons/fa6";
import Image from "next/image";

export default function LikedRecipes() {
  const [likedRecipesLists, setLikedRecipesList] = useState([]);
  const likedRecipesRef = collection(db, "likedrecipes");

  useEffect(() => {
    const querydata = query(
      likedRecipesRef,
      where("userId", "==", auth.currentUser.uid)
    );
    const unsuscribe = onSnapshot(querydata, (snapshot) => {
      let likedRecipes = [];
      snapshot.forEach((doc) => {
        likedRecipes.push({ ...doc.data(), id: doc.id });
      });
      setLikedRecipesList(likedRecipes);
    });
    return () => unsuscribe;
  }, []);

  const deletePost = async (id, userId) => {
    if (auth.currentUser.uid === userId) {
      const recipeDoc = doc(db, "likedrecipes", id);
      await deleteDoc(recipeDoc);
    }
  };

  return (
    <div className="homePage bg-green-950 h-full">
      <div className="bg-green-800 text-xl font-extrabold text-center text-white w-full">
        <h1>RecipeMedia App</h1>
      </div>
      <Navbar />

      {likedRecipesLists.map((recipe) => {
        return (
          <div key={recipe.id} className="post">
            <div className="postHeader">
              <div className="title">
                <h1 className="font-serif text-lg font-extrabold">
                  {recipe.recipeName}
                </h1>
              </div>

              <div className="deletePost">
                <button
                  className="border-black border-1 "
                  onClick={() => {
                    deletePost(recipe.id, recipe.userId);
                  }}
                >
                  <FaDeleteLeft />
                </button>
              </div>
            </div>

            <img
              className="h-[250px] w-full"
              src={`https://firebasestorage.googleapis.com/v0/b/recipemediaapp.appspot.com/o/images%2F${recipe.recipeImagel}?alt=media&token=70082baa-c8de-46be-b084-205450ff06e9`}
            />
            <div className="title">
              <h1 className="font-serif text-lg font-extrabold">Ingredients</h1>
            </div>
            <div className="postTextContainer text-white font-extrabold text-lg  mt-2 bg-blue-300 p-2 rounded-xl">
              {recipe?.ingredients}
            </div>
            <div className="title">
              <h1 className="font-serif text-lg font-extrabold">
                Instructions
              </h1>
            </div>
            <div className="postTextContainer text-white font-extrabold text-lg  mt-2 bg-blue-300 p-2 rounded-xl">
              {recipe?.instructions}
            </div>
            <div className="title">
              <h1 className="font-serif text-lg font-extrabold">Duration</h1>
            </div>
            <h1>{recipe.durations}</h1>

            <Image
              src={recipe?.autherImagel}
              width={25}
              height={25}
              alt="pic"
              className="rounded-full mt-2"
            />
            <h3 className="text-xs">@{recipe?.autherNamel}</h3>
          </div>
        );
      })}
    </div>
  );
}
