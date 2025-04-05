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
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const RepairDataTable = ({ data }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("clientName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedFilterField, setSelectedFilterField] = useState("clientName");
  const [filterValue, setFilterValue] = useState("");

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
  
    const date = new Date(isoDate);
  
    const pad = (n) => n.toString().padStart(2, "0");
  
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
  
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${day}/${month}/${year}:${hours}:${minutes}:${seconds}`;
  };
  

  const formatMilliseconds = (ms) => {
    if (!ms) return "";
    const totalSeconds = Math.floor(ms / 1000);
  
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const pad = (n) => n.toString().padStart(2, '0');
  
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

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

  const handleFilterFieldChange = (event) => {
    setSelectedFilterField(event.target.value);
    setFilterValue("");
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const fieldValue = item[selectedFilterField];
    return fieldValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[orderBy] ?? "";
    const bValue = b[orderBy] ?? "";
    if (order === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });
  

  const columnHeaders = [
    { id: "clientName", label: "Nombre del Cliente" },
    { id: "failureType", label: "Tipo de Falla" },
    { id: "dieWorker", label: "Matricero" },
    { id: "operationNumber", label: "Número de Operación" },
    { id: "partNumber", label: "Número de Parte" },
    { id: "pressCode", label: "Código de Prensa" },
    { id: "repairPerformed", label: "Reparación Realizada" },
    { id: "workshopRepairFolio", label: "Folio de Reparación" },
    { id: "markedDate", label: "Fecha Marcada" },
    { id: "createdDate", label: "Fecha Creación" },
    { id: "initialDate", label: "Fecha Inicial" },
    { id: "endDate", label: "Fecha Final" },
    { id: "timeElapsed", label: "Tiempo Transcurrido" },
  ];

  return (
    <Paper>
      <Box display="flex" gap={2} p={2} flexWrap="wrap">
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Campo a Filtrar</InputLabel>
          <Select
            value={selectedFilterField}
            label="Campo a Filtrar"
            onChange={handleFilterFieldChange}
          >
            {columnHeaders.map((col) => (
              <MenuItem key={col.id} value={col.id}>
                {col.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Valor de Filtro"
          value={filterValue}
          onChange={handleFilterValueChange}
          size="small"
        />
      </Box>

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
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
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
                  <TableCell>{formatDate(item.createdDate)}</TableCell>
                  <TableCell>{formatDate(item.initialDate)}</TableCell>
                  <TableCell>{formatDate(item.endDate)}</TableCell>
                  <TableCell>{formatMilliseconds(item.timeElapsed)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RepairDataTable;
