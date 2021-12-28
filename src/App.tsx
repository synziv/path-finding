import React, { memo } from 'react';
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

function App() {
  const height =20;
  const width =30;
  //const {Heapify} = require('heapify');
  //const matrix:number[][] = [];
  const [needupdate, setNeedUpdate] = useState(0);
  const [rowUpdate, setRowUpdate] = useState(0);
  const [ready, setReady] = useState(false);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [start, setStart] = useState<ICoor>({x:0, y:0});
  console.log("init");

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


  const coorToFlat=(x:number, y:number, width:number)=>{
    return x + width * y;
  }


 const initDijkstra =(distances: Uint32Array, Q:Heapify, parents:Uint32Array)=>{
  distances.fill(4294967295);
  parents.fill(-1);

  const startFlat = coorToFlat(start.x, start.y,width);
  Q.push(startFlat,1);
  distances[startFlat] =0;

 }

 const updateMatrix=async (x:number, y:number)=>{
    matrix[y][x] =1;
    setNeedUpdate(needupdate => needupdate +1);
    //setRowUpdate(y);
    await new Promise(r => setTimeout(r, 0));
 }

 const cell_onClick=(new_x:number, new_y:number)=>{
  console.log("clicked");
  console.log({x: new_x, y: new_y});
  matrix[start.y][start.x] = 0;
  //setRowUpdate(start.y);
  matrix[new_y][new_x] =3;
  //setRowUpdate(new_y);
  setStart({x: new_x, y:new_y});
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
  const arrTest: JSX.Element[]=[
    <Button onClick={dijkstra}>Dijkstra1</Button>,
    <Button onClick={dijkstra}>Dijkstra2</Button>,
    <Button onClick={dijkstra}>Dijkstra3</Button>
  ]

  const gen_row = () => {
    if(ready){
      //console.log("gen_row");
      //console.log(matrix);
      console.log("GEN*******************");
      return (
        matrix.map((row, y) =>
          <div className="grid-parent">
            {
              row.map((cell, x) =>
                <CellComponent key={x} x={x} y={y} cell={cell} child_onClick={cell_onClick} />
              )
            }
          </div>


        ))
    }
  }


    return(
      <div className='grid-container'>
          {gen_row()}
        <Button onClick={dijkstra}>Dijkstra</Button>
        {needupdate}
      </div>
      
    )
  
}

export default App;
