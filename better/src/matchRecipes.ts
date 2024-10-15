import {Database, Json, Tables} from './database.types';
import {supabase} from './connection';
import {useEffect, useState} from 'react';
import { PostgrestResponse } from '@supabase/supabase-js';
import { NullLiteral } from 'typescript';

// interface Recipe {
//     id : number;
//     name : string;
//     prep_time : number
// }

export const allRecipes = async (minTime: number, maxTime: number): Promise<Json | undefined> => {
    try {  
        let { data: recipes, error } = await supabase
            .from('recipes')
            .select('*')
            .gte('prep_time', minTime)
            .lte('prep_time', maxTime);

        
        if (recipes) {
            return recipes;
        }
    } catch (error) {
        console.log('No recipes');
        return undefined;
    }
}


// export const findIngredient = async (keyword: string) => {
//     try {
//         let { data, error} = await supabase
//             .from('keywords')
//             .select('keyword_id, ingredient')
//             .eq('ingredient', keyword);

//         if ({data, error}) {
//             console.log({data, error});
//         }
//     } catch {
//         console.log('No recipes with that ingredient');
//     }
// }

// export const filter = async (categories : string[], query: string[]): Promise<Json | undefined> => {
//     try {
//         let { data: recipes, error } = await supabase
//             .from('recipes')
//             .select('*')
//             .in('category', categories)
        
//         if (recipes) {
//             return recipes;
//         }
//     } catch (error) {
//         console.log('No recipes match that category.');
//         return undefined;
//     }
// }

export const filterHelper = async (categories: string[], ingredients: string[], minTime: number, maxTime: number): 
        Promise<Json | undefined> => {
    if (ingredients.length !== 0 && categories.length !== 0 ) {
        try {
            let { data: recipes, error } = await supabase
                .from('recipes')
                .select('*, recipe_keywords(keyword_id), keywords(ingredient)')
                .in('category', categories)
                .gte('prep_time', minTime)
                .lte('prep_time', maxTime);
    
            if (error) throw error;
    
            // If ingredients are provided, filter recipes in JavaScript
            if (recipes) {
                // Filter out recipes that don't have all the specified ingredients
                const filteredRecipes = recipes.filter((recipe) => {
                    // Extract ingredients for this recipe
                    const recipeIngredients = recipe.keywords.map((k: any) => k.ingredient);
                    // Check if the recipe contains all specified ingredients
                    return ingredients.every(ingredient => recipeIngredients.includes(ingredient));
                });
    
                return filteredRecipes;
            }
    
            return recipes || undefined;
        } catch (error) {
            console.log('Error fetching recipes');
            return undefined;
        }
    } else if (ingredients.length !== 0 && categories.length === 0) {
        try {
            let { data: recipes, error } = await supabase
                .from('recipes')
                .select('*, recipe_keywords(keyword_id), keywords(ingredient)')
                .gte('prep_time', minTime)
                .lte('prep_time', maxTime);
    
            if (error) throw error;
    
            // If ingredients are provided, filter recipes in JavaScript
            if (recipes) {
                // Filter out recipes that don't have all the specified ingredients
                const filteredRecipes = recipes.filter((recipe) => {
                    // Extract ingredients for this recipe
                    const recipeIngredients = recipe.keywords.map((k: any) => k.ingredient);
                    // Check if the recipe contains all specified ingredients
                    return ingredients.every(ingredient => recipeIngredients.includes(ingredient));
                });
    
                return filteredRecipes;
            }
    
            return recipes || undefined;
        } catch (error) {
            console.log('Error fetching recipes');
            return undefined;
        }
    } 
    
    else {
        try {
            let { data: recipes, error } = await supabase
                .from('recipes')
                .select('*')
                .in('category', categories)
                .gte('prep_time', minTime)
                .lte('prep_time', maxTime);
            
            if (recipes) {
                return recipes;
            }
        } catch (error) {
            console.log('No recipes match that category.');
            return undefined;
        }
    };
}


const findRecipesHelper = async (ingredients : string[], minTime: number, maxTime: number) : Promise<PostgrestResponse<any>['data'] | null> => {
    try {
        let { data: ingredient_data, error } = await supabase
            .from('keywords')
            .select('keyword_id')
            .in('ingredient', ingredients)
            .gte('prep_time', minTime)
            .lte('prep_time', maxTime);
        
        if (error) {
            throw new Error;
        }
        return ingredient_data;
    } catch (error) {
        return null;
    }
}

// const prepTimeFilter = async (times : [bigint, bigint]) : Promise<PostgrestResponse<any>['data'] | null> => {
//     try {
//         let { data: ingredient_data, error } = await supabase
//             .from('keywords')
//             .select('keyword_id')
//             .in('ingredient', ingredients)
        
//         if (error) {
//             throw new Error;
//         }
//         return ingredient_data;
//     } catch (error) {
//         return null;
//     }
// }