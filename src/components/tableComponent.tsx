import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
} from "@mui/material";

const RepairDataTable = ({ data }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("clientName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = [...data].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const columnHeaders = [
    { id: "clientName", label: "Nombre del Cliente" },
    { id: "failureType", label: "Tipo de Falla" },
    { id: "dieWorker", label: "Matricero"},
    { id: "operationNumber", label: "Número de Operación" },
    { id: "partNumber", label: "Número de Parte" },
    { id: "pressCode", label: "Código de Prensa" },
    { id: "repairPerformed", label: "Reparación Realizada" },
    { id: "workshopRepairFolio", label: "Folio de Reparación" },
    { id: "markedDate", label: "Fecha Marcada" },
    { id: "createdDate", label: "Fecha Creacion" },
    { id: "initialDate", label: "Fecha Inicial" },
    { id: "endDate", label: "Fecha Final" },
    { id: "timeElapsed", label: "Tiempo Transcurrido" },
  ];

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columnHeaders.map((headCell) => (
                <TableCell key={headCell.id}>
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.clientName}</TableCell>
                <TableCell>{item.failureType}</TableCell>
                <TableCell>{item.dieWorker}</TableCell>
                <TableCell>{item.operationNumber}</TableCell>
                <TableCell>{item.partNumber}</TableCell>
                <TableCell>{item.pressCode}</TableCell>
                <TableCell>{item.repairPerformed}</TableCell>
                <TableCell>{item.workshopRepairFolio}</TableCell>
                <TableCell>{item.markedDate}</TableCell>
                <TableCell>{item.createdDate}</TableCell>
                <TableCell>{formatDate(item.initialDate)}</TableCell>
                <TableCell>{formatDate(item.endDate)}</TableCell>
                <TableCell>{formatDate(item.timeElapsed)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RepairDataTable;
