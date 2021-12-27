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
    render() {
        console.log("render"+{x: this.props.x, y: this.props.y});
        return (
            <Grid item xs={1}>
                <Paper elevation={3} className={this.props.cell == 0 ? 'unvisited' : 'visited'}>
                    <span>0</span>
                </Paper>
            </Grid>
        );
    }
}

export default CellComponent;