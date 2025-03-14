// import { useState } from "react";
// import axios from "axios";
//
// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";
//
// export default function AddRecipe() {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [occasion, setOccasion] = useState("Breakfast");
//     const [ingredients, setIngredients] = useState("");
//     const [steps, setSteps] = useState("");
//
//     const handleSubmit = async () => {
//         const recipeData = {
//             title,
//             description,
//             occasion,
//             ingredients: ingredients.split(","),
//             steps: steps.split("\n"),
//         };
//
//         await axios.post(`${API_URL}/recipes/add`, recipeData);
//         alert("Recipe added successfully!");
//     };
//
//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
//             <input type="text" placeholder="Title" className="p-2 border rounded w-full mb-2"
//                    value={title} onChange={(e) => setTitle(e.target.value)} />
//             <textarea placeholder="Description" className="p-2 border rounded w-full mb-2"
//                       value={description} onChange={(e) => setDescription(e.target.value)} />
//             <select className="p-2 border rounded w-full mb-2"
//                     value={occasion} onChange={(e) => setOccasion(e.target.value)}>
//                 <option>Breakfast</option>
//                 <option>Lunch</option>
//                 <option>Dinner</option>
//                 <option>Dessert</option>
//             </select>
//             <textarea placeholder="Ingredients (comma-separated)" className="p-2 border rounded w-full mb-2"
//                       value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
//             <textarea placeholder="Steps (one per line)" className="p-2 border rounded w-full mb-2"
//                       value={steps} onChange={(e) => setSteps(e.target.value)} />
//             <button className="px-6 py-3 bg-green-500 text-white rounded-md"
//                     onClick={handleSubmit}>Submit Recipe</button>
//         </div>
//     );
// }
