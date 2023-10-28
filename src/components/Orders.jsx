import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import { TextField, Grid, IconButton, FormControl, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";

export default function Orders(){

    function showOrders(){
        return(
            <MaterialTable
                    // height="50%"
                    title="Current Electricity rate: 235.5"
                    columns={[
                        { title: 'Type', field: 'type' },
                        { title: 'Quantity', field: 'qty' },
                        { title: 'Status', field: 'status' },
                        { title: 'Rate', field: 'rate' },
                        
                    ]}
                    data={[
                        { type:'Buy', qty: '20 unit', status: 'pending exchange', rate: "9/-" },
                      ]}
                      actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete User',
                            onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
        )
    }

    return(
        <div>
            {showOrders()}
        </div>
    )
}