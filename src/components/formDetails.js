import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

export default function FormDetails() {
  const [rows, setRows] = useState([]);
  const getAllDockets = async () => {
    try {
      const response = await axios.get(
        "https://parshva-screening-backend.onrender.com/getDockets"
      );
      const allRows = response?.data?.map((rowItem, index) => {
        return {
          name: rowItem?.name,
          startTime: moment(rowItem?.startTime, "HH:mm").format("h:mm A"),
          endTime: moment(rowItem?.endTime, "HH:mm").format("h:mm A"),
          workedHours: rowItem?.workedHours,
          ratePerHours: rowItem?.ratePerHours,
          supplierName: rowItem?.supplierName?.supplierName,
          purchaseOrderNumber: rowItem?.purchaseOrder?.orderNumber,
          description: rowItem?.purchaseOrder?.description,
        };
      });
      setRows(allRows);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllDockets();
  }, []);

  if (rows.length === 0) {
    return <span>Please create Docket First</span>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              {" "}
              <b>Name</b>
            </TableCell>
            <TableCell align="center">
              <b>Start Time</b>
            </TableCell>
            <TableCell align="center">
              <b>End Time</b>
            </TableCell>
            <TableCell align="center">
              <b>No. Of Hours Worked</b>
            </TableCell>
            <TableCell align="center">
              <b>Rate Per Hour</b>
            </TableCell>
            <TableCell align="center">
              <b>Supplier Name</b>
            </TableCell>
            <TableCell align="center">
              <b>Purchase Order No.</b>
            </TableCell>
            <TableCell align="center">
              <b>Description</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.startTime}</TableCell>
              <TableCell align="center">{row.endTime}</TableCell>
              <TableCell align="center">{row.workedHours}</TableCell>
              <TableCell align="center">{row.ratePerHours}</TableCell>
              <TableCell align="center">{row.supplierName}</TableCell>
              <TableCell align="center">{row.purchaseOrderNumber}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
