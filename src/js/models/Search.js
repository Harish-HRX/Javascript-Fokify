import axios from 'axios'
import {proxy,key} from '../config'
export default class Search{
    constructor(query){
        this.query=query;
    }

    async getResults(){
        try{    
        const res=await axios(`https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}`);
        this.result=res.data.results;
        //console.log(this.result);
        }
        catch(error){
            alert("Error");
        }
    }
}