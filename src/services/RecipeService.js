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
