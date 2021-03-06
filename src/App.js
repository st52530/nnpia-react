import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import NoMatch from "./routing/NoMatch";
import PrivateRoute from "./routing/PrivateRoute";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
import Container from '@material-ui/core/Container';
import Logout from "./components/logout/Logout";
import NavBar from "./components/navbar/NavBar";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles';
import AddPage from "./components/recipe/add/AddRecipePage";
import SearchPage from "./components/search/SearchPage";
import RecipeDetailPage from "./components/recipe/detail/RecipeDetailPage";
import DeleteRecipePage from "./components/recipe/delete/DeleteRecipePage";
import EditRecipePage from "./components/recipe/edit/EditRecipePage";
import RegistrationPage from "./components/registration/RegistrationPage";

const useStyles = makeStyles(theme => ({
    toolbarArea: theme.mixins.toolbar,
    mainContainer: {
        paddingTop: theme.spacing(2)
    }
}));

const App = () => {
    const classes = useStyles();
    const theme = createMuiTheme({
        palette: {
            primary: {
                // light: will be calculated from palette.primary.main,
                main: '#d32f2f',
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                main: '#00bcd4'
            }
        },
        overrides: {
            MuiButton: {
                root: {
                    padding: '0.5rem'
                }
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline/>

                <Box>
                    <NavBar/>
                    {/* Take up toolbar space not to render content under it.*/}
                    <div className={classes.toolbarArea}/>

                    <Container component="main" maxWidth="lg" className={classes.mainContainer}>
                        <Switch>
                            <Route exact path="/login">
                                <LoginPage/>
                            </Route>
                            <Route exact path="/register">
                                <RegistrationPage/>
                            </Route>
                            <PrivateRoute exact path="/logout">
                                <Logout/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/">
                                <HomePage/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/add">
                                <AddPage/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/search">
                                <SearchPage/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/recipe/:id/:slug">
                                <RecipeDetailPage/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/recipe/:id/:slug/edit">
                                <EditRecipePage/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/recipe/:id/:slug/delete">
                                <DeleteRecipePage/>
                            </PrivateRoute>
                            <Route path="*" exact>
                                <NoMatch/>
                            </Route>
                        </Switch>
                    </Container>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
