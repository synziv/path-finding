import { Grid, Paper } from "@mui/material";
import React from "react";

interface ICellComponentProps{ 
    x:number,
    y:number, 
    cell:number
};



class CellComponent extends React.Component<ICellComponentProps> {
    shouldComponentUpdate(nextProps:ICellComponentProps) {
        return nextProps.cell !== this.props.cell ? true: false;
    }
    getClassName=(v:number)=>{
        if(v == 0) return 'unvisited';
        else if(v == 1) return 'visited';
        else if(v == 2) return 'revisited';
    }
    render() {
        console.log("render"+{x: this.props.x, y: this.props.y});
        return ( 
                <Paper elevation={3} className={this.getClassName(this.props.cell)}>
                    <span>0</span>
                </Paper>
        );
    }
}

export default CellComponent;