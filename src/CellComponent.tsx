import { Grid, Paper } from "@mui/material";
import React from "react";

interface ICellComponentProps{ 
    x:number,
    y:number, 
    cell:number,
    child_onClick: Function,
    needUpdate: number
};



class CellComponent extends React.Component<ICellComponentProps> {
    shouldComponentUpdate(nextProps:ICellComponentProps) {
        console.log("should update");
        return nextProps.cell !== this.props.cell ? true: false;
    }
    getClassName=(v:number)=>{
        if(v == 0) return 'unvisited';
        else if(v == 1) return 'visited';
        else if(v == 2) return 'revisited';
        else if(v == 3) return 'start';
        else if(v == 4) return 'path';
    }
    render() {
        console.log("render"+{x: this.props.x, y: this.props.y});
        return ( 
                <Paper onClick={()=>this.props.child_onClick(this.props.x, this.props.y)} elevation={3} className={this.getClassName(this.props.cell)}>
                    <span>0</span>
                    
                </Paper>
        );
    }
}

export default CellComponent;