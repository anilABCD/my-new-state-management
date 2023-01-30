import React from "react";
import { v4 as uuidv4 } from 'uuid';

class RegisteredMap{
  static registeredMap : Map<string, React.Dispatch<any>> | null = new Map();
}

class State {

    stateId : string=uuidv4();
    StatesMap: Map<string, React.Dispatch<any>[]> | null = new Map();

    registeredMap : Map<string, React.Dispatch<any>> | null = RegisteredMap.registeredMap;

    register(setState:React.Dispatch<any>, traverse : boolean=false){
        // for regestiring into deeper tree ... 
        if(traverse) {
        this.setUpdateStateToAllChildren(this,setState, false);
        }

        this.addSetState(setState);
    }

    unRegister(setState:React.Dispatch<any>,traverse : boolean=false){
      // for unregistering from deeper tree ... 
      if(traverse){
      this.setUpdateStateToAllChildren(this,setState, true);
      }
      
      this.removeSetState(setState)
    }

    setUpdateStateToAllChildren(object :any, setState:React.Dispatch<any>, shouldDelete :boolean) {
     Object.keys(object).map((item,index)=>{
      let someObject :any = object;
       if( Array.isArray(someObject[item])){
         this.setUpdateStateToAllChildren(someObject[item], setState, shouldDelete);
       }
       else{
        if(shouldDelete == false) {
        if(someObject[item].addSetState){
          someObject[item].addSetState(setState);
        }
      }
      else{
        if(someObject[item].removeSetState){
         someObject[item].removeSetState(setState)
        }
      }
       }
     })
   }

    constructor(){

      this.StatesMap = new Map();

      this.stateId = uuidv4();

      this.StatesMap.set(this.stateId,[]);
      
    }

  
   addSetState(setState:React.Dispatch<any>){
      let states = this.StatesMap?.get(this.stateId);
   
      if(states){
        
      let isDuplicate :boolean = false;
       for(let i =0;i<states.length; i++){
         if(states[i] == setState){
          isDuplicate = true
          console.log("is duplicate", isDuplicate)
          break;
         }
       }

       if(!isDuplicate){
        states.push(setState)
       }
      }
      console.log( JSON.stringify( this.StatesMap?.get(this.stateId)?.length));
    
   }

   removeSetState(setState:React.Dispatch<any>){
    let states = this.StatesMap?.get(this.stateId);
 
    if(states){
   
     for(let i =0;i<states.length; i++){
       if(states[i] == setState){
        states.splice(states.indexOf(states[i]), 1);
        break;
       }
     }

    }
    console.log( JSON.stringify( this.StatesMap?.get(this.stateId)?.length));
  
 }

   update(){
    this.StatesMap?.get(this.stateId)?.map((item)=>{
       if(item){ item(uuidv4());}
      //  console.log(item)  
    })
    console.log(JSON.stringify(this.StatesMap?.get(this.stateId)?.length));
   }

}


class Product extends State{
  _increment : number = 0;


  incrementNumber(){
  
    this._increment++;
    
    this.update();
  }

}

class GlobalState extends State{
   _increment : number=0;

   products : Product[] = [new Product(), new Product];

   newProduce : Product = new Product();

   incrementNumber(){

    this.products.splice(1,1);

    this._increment++;

    this.update();
    
  }

}

let globalState = new GlobalState() ;

export default globalState;
