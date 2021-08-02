import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography, TextField } from '@material-ui/core';
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search"
import { textAlign } from '@material-ui/system';
import { toFirstCharUppercase } from '../utils';
import {useHistory} from "react-router-dom"

import axios from 'axios'
import { classExpression } from '@babel/types';



const useStyles = makeStyles(theme => ({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: "50px",
    },
    cardMedia: {
        margin: 'auto'
    },
    cardContent: {
        margin: 'auto',
        textAlign: 'center'
    },
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px"
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px"
    }

}));





const Pokedex = (props) => {
    
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const {history} = props

    const [filter, setFilter] = useState("");

    const searchbarChange = (e) => {
        setFilter(e.target.value);
    }
    
    useEffect(()=> {
        axios
            .get(`http://pokeapi.co/api/v2/pokemon?limit=2000`)
            .then(function(response){
                const  {data} = response;
                const {results} = data;
                const newPokemonData = {};
                results.forEach((pokemon,  index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                    }
                })
                setPokemonData(newPokemonData);
            })

    }, []);
    

    const getPokemonCard = (pokemonId) => {
        console.log(pokemonData[`${pokemonId}`]) 
        const { id, name, sprite } = pokemonData[pokemonId]
        
        return (
            <Grid item xs={4} key={pokemonId}>
                <Card onClick={() => history.push(`/${id}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography> {`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )

    }
    return (
        <>
            <AppBar position='Static' color="primary">
                <Toolbar>
                    <div className = {classes.searchContainer}>
                        <SearchIcon className = {classes.searchIcon} />
                        <TextField onChange = {searchbarChange} classname = {classes.searchInput} label = "Pokemon" variant = "standard"/>
                        
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(pokemonId => pokemonData[pokemonId].name.includes(filter) && getPokemonCard(pokemonId))}
                </Grid>
            ) : (
                <CircularProgress />
            )}

        </>
    )
}

export default Pokedex;