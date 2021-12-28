import React, { memo, useRef } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import { Box, Button, ListItem, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import internal from 'stream';
import Heapify from "heapify";
import CellComponent from './CellComponent';
import RowComponent from './RowComponent';

interface ICoor{
  x: number,
  y: number
}

let render_matrix:JSX.Element[] =[];
let arrTest: JSX.Element[]=[];

function App() {
  const height =20;
  const width =30;
  //const {Heapify} = require('heapify');
  //const matrix:number[][] = [];
  const [needupdate, setNeedUpdate] = useState(0);
  const [rowUpdate, setRowUpdate] = useState(0);
  const [ready, setReady] = useState(false);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const start = useRef({x:0, y:0});
  console.log("init");

  //did mount
  useEffect(() => {
    for (let y = 0; y < height; y++) {
      matrix[y] = [];
      for (let x = 0; x < width; x++) {
        matrix[y][x] = 0;
      }
    }
    console.log(matrix);
    setReady(true);
    
  }, []);

  useEffect(() => {
    if(ready){
      render_matrix =  gen_row();
      console.log(render_matrix);
      setNeedUpdate(needupdate => needupdate +1);
    }

  }, [ready]);


  const coorToFlat=(x:number, y:number, width:number)=>{
    return x + width * y;
  }


 const initDijkstra =(distances: Uint32Array, Q:Heapify, parents:Uint32Array)=>{
  distances.fill(4294967295);
  parents.fill(-1);

  const startFlat = coorToFlat(start.current.x, start.current.y,width);
  Q.push(startFlat,1);
  distances[startFlat] =0;

 }

 const updateMatrix=async (x:number, y:number)=>{
    //matrix[y][x] =1;
    
    updateRenderMatrixCell({x: x, y: y}, 1);
    //setRowUpdate(y);
    setNeedUpdate(needupdate => needupdate +1);
    await new Promise(r => setTimeout(r, 0));
 }
 const getIdFromCoor=(coor: ICoor)=>{
   return (coor.y*width + coor.x);
 }
 const updateRenderMatrixCell=(coor:ICoor, newValue: number)=>{
  matrix[coor.y][coor.x] = newValue;
  render_matrix[getIdFromCoor(coor)] = <CellComponent key={coorToFlat(coor.x, coor.y, width)} x={coor.x} y={coor.y} cell={matrix[coor.y][coor.x]} child_onClick={cell_onClick} needUpdate={needupdate}/>
       
 }
 const cell_onClick=(new_x:number, new_y:number)=>{
  updateRenderMatrixCell({x: start.current.x, y: start.current.y}, 0);
  
  updateRenderMatrixCell({x: new_x, y: new_y}, 3);
  start.current = {x: new_x, y:new_y};

  setNeedUpdate(needupdate => needupdate +1);
 }
  
  const dijkstra=async ()=>{
    //console.log("coucou");
    const Q = new Heapify();
    let distances = new Uint32Array(30*20);
    let parents = new Uint32Array(30*20);
    initDijkstra(distances, Q, parents);

    while(Q.size !=0){
      //console.time('Function #1');
      const v = Q.pop();
      const distance_c = distances[v];
      
      if(distance_c != Infinity){
        const v_x = v % width;
        const v_y = Math.floor(v / width);
        
        console.time('updateMatrix');
        await updateMatrix(v_x, v_y);
        console.timeEnd('updateMatrix');
        
        let distance_n;

        //voisin droite
        if(v_x <width-1){
          
          const coorVoisin = coorToFlat(v_x+1, v_y, width);
          distance_n = distances[coorVoisin];
          if(distance_c+1 < distance_n){
            distances[coorVoisin] = distance_c+1;
            parents[coorVoisin] = v;
            Q.push(coorVoisin, distance_c+1);
          }
        }
        //voisin gauche
        if(v_x >0){
          //console.log("voisin G");
          const coorVoisin = coorToFlat(v_x-1, v_y, width);
          distance_n = distances[coorVoisin];
          //console.log("=>"+(v_x-1)+", "+v_y+": "+distance_n);
          if(distance_c+1 < distance_n){
            //console.log("minimise");
            distances[coorVoisin] = distance_c+1;
            parents[coorVoisin] = v;
            Q.push(coorVoisin, distance_c+1);
          }
        }
        //voisin bas
        if(v_y > 0){
          //console.log("voisin B");
          const coorVoisin = coorToFlat(v_x, v_y-1, width);
          distance_n = distances[coorVoisin];
          //console.log("=>"+v_x+", "+(v_y-1)+": "+distance_n);
          if(distance_c+1 < distance_n){
            //console.log("minimise");
            distances[coorVoisin] = distance_c+1;
            parents[coorVoisin] = v;
            Q.push(coorVoisin, distance_c+1);
          }
        }
        //voisin haut
        if(v_y <width-1){
          //console.log("voisin H");
          const coorVoisin = coorToFlat(v_x, v_y+1, width);
          distance_n = distances[coorVoisin];
          //console.log("=>"+v_x+", "+(v_y+1)+": "+distance_n);
          if(distance_c+1 < distance_n){
            //console.log("minimise");
            distances[coorVoisin] = distance_c+1;
            parents[coorVoisin] = v;
            Q.push(coorVoisin, distance_c+1);
          }
        }

        //console.log("****************************");
      }
      //console.timeEnd('Function #1');
      
    }
   
    

    
  }

  
  const gen_row = () => {
      //console.log("gen_row");
      //console.log(matrix);
      const arr=[]
      console.log("GEN*******************");
      for(let y =0; y<height; y++){
        for(let x =0; x<width; x++){
          arr.push(
            <CellComponent key={coorToFlat(x, y, width)} x={x} y={y} cell={matrix[y][x]} child_onClick={cell_onClick} needUpdate={needupdate}/>
          )
        }
      }
      return(arr);
  }
    return(
      <div>
        <div className='grid-parent'>
          {render_matrix}
        </div>
        {needupdate}
        <Button onClick={dijkstra}>Dijkstra</Button>
      </div>

      
    )
  
}

export default App;
