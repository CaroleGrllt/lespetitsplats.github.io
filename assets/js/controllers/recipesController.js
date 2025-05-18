import dataRecipes from "../models/recipesModel.js"

export async function getRecipes(state) {
    
    const data = dataRecipes()
    let recipes = await data.getAllRecipes()
 
    // SEARCH FIELD
    if(state.searchLength >=3) {
        recipes = recipes.filter(recipe => {
            const name = recipe.name.toLowerCase().split(' ')
            const description = recipe.description.toLowerCase().split(' ')
            const ingredients = recipe.ingredients.map(data => data.ingredient.toLowerCase())
            const data = [...name, ...description, ...ingredients]

            return(
                state.search.every(word =>
                    data.some(dataWord => dataWord.includes(word.toLowerCase()))
                ) 
            )
        })
    }

    // INGREDIENTS 
    if(state.ingredients.length > 0 ) {
        recipes = recipes.filter(recipe => {
            const ingredients = recipe.ingredients.map(data => data.ingredient.toLowerCase()) //casse => miniscule
            return (
                state.ingredients.every(ingredient => 
                    ingredients.some(ing => ing.includes(ingredient.toLowerCase())) //méthode some() teste si au moins un élément correspond
                )
            )
        })
    }

    // APPLIANCES 
    if(state.appliances.length > 0 ) {
        recipes = recipes.filter(recipe => {
            
            const appliance = recipe.appliance.toLowerCase()
            // On vérifie si l'appareil est dans la liste des filtres
            return ( 
                state.appliances.some(data => data.toLowerCase() === appliance) 
            )
        
        })
    }

    // USTENSILS 
    if (state.ustensils.length > 0) {
        recipes = recipes.filter(recipe => {
            const ustensils = recipe.ustensils.map(data => data.toLowerCase())
    
            return (
                state.ustensils.every(ustensil =>
                    ustensils.some(ust => ust.includes(ustensil.toLowerCase()))
                )
            )
        })
    }

    return recipes
}

export function getIngredientsList(recipes) {
    const ingredientsSet = new Set(); //permet de ne pas avoir de doublons
    // Parcourir toutes les recettes et ajouter les ingrédients au Set

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => {
            ingredientsSet.add(ing.ingredient.toLowerCase());
        })
    })

    return Array.from(ingredientsSet).sort()
}

// OBTENIR LA LISTE DES APPAREILS
export function getAppliancesList(recipes) {
    const appliancesSet = new Set()
    recipes.forEach(recipe => {
        appliancesSet.add(recipe.appliance.toLowerCase())
        
    })
    return Array.from(appliancesSet).sort()
}

// OBTENIR LA LISTE DES USTENSILES
export function getUstensilsList(recipes) {
    const ustensilsSet = new Set(); 
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ust => {
            ustensilsSet.add(ust.toLowerCase())
        })
    });
    return Array.from(ustensilsSet).sort()
}