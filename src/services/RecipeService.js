import {getData} from "../networking/ResponseCachingUtil";
import axios, {setupAuthentication} from "../networking/AxiosConfig";

export async function getRecipes(page = 0, orderBy, order) {
    const queryParams = {
        page,
        sort: `${orderBy},${order}`,
        size: 8 // TODO: Increase later.
    }

    setupAuthentication()
    const response = await axios.get(`recipes`, {params: queryParams})
    return response.data
}

export async function getRecipe(id) {
    return await getData(`recipes/${id}`)
}

export async function addRecipe(recipe, image) {
    const dto = prepareRecipeDto(recipe)

    const data = new FormData()
    data.append('file', image)
    data.append('recipe', JSON.stringify(dto))

    setupAuthentication()
    const response = await axios.post(`recipes`, data)
    sessionStorage.setItem(`recipes/${response.data.id}`, JSON.stringify(response.data))
    return response.data
}

export async function saveRecipe(recipe, image) {
    const dto = prepareRecipeDto(recipe)

    const data = new FormData()
    data.append('file', image)
    data.append('recipe', JSON.stringify(dto))

    const path = `recipes/${recipe.id}`
    setupAuthentication()
    const response = await axios.put(path, data)
    sessionStorage.setItem(path, JSON.stringify(response.data))
    return response.data
}

export async function deleteRecipe(id) {
    const path = `recipes/${id}`
    setupAuthentication()
    const response = await axios.delete(path)
    sessionStorage.removeItem(path)
    return response
}

function prepareRecipeDto(recipe) {
    const categories = recipe.categories.map((category) => category.id)

    const instructions = recipe.instructions.filter((instruction) => instruction.text || instruction.text !== "")
        .map((instruction) => {
            // Remove local ID from the object.
            return {
                ...instruction,
                localId: undefined
            }
        })

    const ingredients = recipe.ingredients.filter((ingredient) => ingredient.amount || ingredient.amount !== "")
        .map((ingredient) => {
            return {
                ingredientId: ingredient.ingredient.id,
                amount: ingredient.amount
            }
        })

    return {
        name: recipe.name,
        description: recipe.description,
        preparationTime: recipe.preparationTime,
        categories: categories,
        instructions,
        ingredients
    }
}