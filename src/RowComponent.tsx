import { Grid, Paper } from "@mui/material";
import React from "react";
import CellComponent from "./CellComponent";

interface IRowComponentProps{ 
    row:number[],
    y:number, 
    toUpdate:number,
    child_onClick: Function
};

class RowComponent extends React.Component<IRowComponentProps> {
    shouldComponentUpdate(nextProps:IRowComponentProps) {
        return nextProps.y == nextProps.toUpdate ? true: false;
    }
    render() {
        console.log("render row "+this.props.y);
        return (
            <div className="grid-parent">
              {/* {
                this.props.row.map((cell, x) =>
                    <CellComponent key={x} x={x} y={this.props.y} cell={cell} child_onClick={this.props.child_onClick}/>
                )
              } */}
            </div>
          );
    }
}

export default RowComponent;