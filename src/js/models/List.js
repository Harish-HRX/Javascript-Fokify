import uniqid from "uniqid";

export default class List{
    constructor(){
        this.items=[];
    }
    additem(ingrident){
       // console.log(ingrident);
        const item={
            id:uniqid(),
            ingrident
        }
        this.items.push(item);
        
        return item;
    }

    deleteItem(id){
        const index=this.items.findIndex(el=>el.id===id);
        this.items.splice(index,1);
    }
} 