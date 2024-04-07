"use client";

import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { FaDeleteLeft } from "react-icons/fa6";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [recipeLists, setRecipeList] = useState([]);
  const recipeCollectionRef = collection(db, "recipes");

  const router = useRouter();

  const deletePost = async (id, userId) => {
    if (auth.currentUser.uid === userId) {
      const recipeDoc = doc(db, "recipes", id);
      await deleteDoc(recipeDoc);
    }
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const querydata = query(recipeCollectionRef);
    const unsuscribe = onSnapshot(querydata, (snapshot) => {
      let recipes = [];
      snapshot.forEach((doc) => {
        recipes.push({ ...doc.data(), id: doc.id });
      });
      setRecipeList(recipes);
    });
    return () => unsuscribe;
  }, []);

  return (
    <div className="homePage bg-green-950 h-full">
      <div className="bg-green-800 text-xl font-extrabold flex-col text-white w-full ">
        <h1 className="text-center ">RecipeMedia App</h1>
        <div className="flex justify-around items-center">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={auth?.currentUser?.photoURL}
              width={25}
              height={25}
              alt="pic"
              className="rounded-full mt-2"
            />
            <h1 className="text-white">{auth?.currentUser?.displayName}</h1>
          </div>
          <div>
            <button onClick={handleSignout} className="text-sm">
              Sign-Out
            </button>
          </div>
        </div>
      </div>
      <Navbar />
      {recipeLists.map((recipe) => {
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
                    deletePost(recipe.id, recipe.author.userId);
                  }}
                >
                  <FaDeleteLeft />
                </button>
              </div>
            </div>

            <img
              className="h-[250px] w-full"
              src={`https://firebasestorage.googleapis.com/v0/b/recipemediaapp.appspot.com/o/images%2F${recipe.recipeImageName}?alt=media&token=70082baa-c8de-46be-b084-205450ff06e9`}
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
              src={recipe?.author?.photoURL}
              width={25}
              height={25}
              alt="pic"
              className="rounded-full mt-2"
            />
            <h3 className="text-xs">@{recipe?.author?.name}</h3>
          </div>
        );
      })}
    </div>
  );
}
