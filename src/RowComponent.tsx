import { Grid, Paper } from "@mui/material";
import React from "react";
import CellComponent from "./CellComponent";

interface IRowComponentProps{ 
    row:number[],
    y:number, 
    toUpdate:number
};

class RowComponent extends React.Component<IRowComponentProps> {
    shouldComponentUpdate(nextProps:IRowComponentProps) {
        return nextProps.y == nextProps.toUpdate ? true: false;
    }
    render() {
        console.log("render row "+this.props.y);
        return (
            <Grid container spacing={2} columns={{ xs: 30, sm: 30, md: 30 }}>
              {
                this.props.row.map((cell, x) =>
                    <CellComponent key={x} x={x} y={this.props.y} cell={cell} />
                )
              }
            </Grid>
          );
    }
}

export default RowComponent;