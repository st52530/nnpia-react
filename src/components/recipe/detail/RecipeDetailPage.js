import React, {useState, useEffect} from 'react';
import {
    useParams
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import RecipeDetailHeader from "./RecipeDetailHeader";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {getRecipe, getRecipeImageUrl} from "../../../services/RecipeService";
import {makeStyles} from '@material-ui/core/styles';
import ContentLoadingError from "../../util/ContentLoadingErrror";
import RecipeInstructions from "./RecipeInstructions";
import RecipeCategories from "./RecipeCategories";
import FaceIcon from '@material-ui/icons/Face';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        top: -50
    },
    icon: {
        marginRight: theme.spacing(0.5)
    },
    authorBox: {
        marginLeft: theme.spacing(3)
    }
}));

const RecipeDetailPage = () => {
    const classes = useStyles()
    const {id} = useParams()
    const [recipe, setRecipe] = useState(null)
    const [error, setError] = useState(null)
    const isLoading = recipe === null && error === null

    useEffect(() => {
        setRecipe(null)
        fetchRecipe(id, setRecipe, setError)
    }, [id])

    const author = recipe && (recipe.author.displayName || recipe.author.username)

    // TODO:  ingredients.
    // TODO: Edit/delete.
    return (
        <ContentLoadingError isLoading={isLoading} error={error} tryAgain={() => fetchRecipe(id, setRecipe, setError)}>
            {
                recipe != null && (
                    <>
                        <RecipeDetailHeader name={recipe.name} imageUrl={getRecipeImageUrl(id)}/>
                        <Container maxWidth="md" className={classes.root}>
                            <Box display="flex" justifyContent="center" flexWrap="wrap">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <TimerIcon color="primary" className={classes.icon}/>
                                    <Typography component="p">{recipe.preparationTime}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="center" alignItems="center"
                                     className={classes.authorBox}>
                                    <FaceIcon color="primary" className={classes.icon}/>
                                    <Typography component="p">{author}</Typography>
                                </Box>
                            </Box>
                            <RecipeCategories categories={recipe.categories}/>
                            <Typography component="p" gutterBottom>{recipe.description}</Typography>
                            <Typography component="h2" variant="h4" gutterBottom>Postup</Typography>
                            <RecipeInstructions instructions={recipe.instructions.split('\n')}/>
                        </Container>
                    </>
                )
            }
        </ContentLoadingError>
    )
}

const fetchRecipe = async (id, setRecipe, setError) => {
    try {
        const data = await getRecipe(id)
        setRecipe(data)
    } catch (exception) {
        setError("Při načítání tohoto receptu se něco se pokazilo.\nZkuste to prosím znovu.")
    }
}

export default RecipeDetailPage