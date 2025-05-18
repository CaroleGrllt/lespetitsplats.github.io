/*********************************************************************************
*
* Link to JSON file
*
/*********************************************************************************/

export default function dataRecipes() {

    async function getData() {
        return await fetch('../../assets/data/recipes.json') 
        .then(res => res.json())
        .catch(err => console.log("Une erreur s'est produite dans la récupération des données json : ", err))
    }

    async function getAllRecipes() {
        let data = await getData()
        return data.recipes
    }

    return { getAllRecipes }
}