import React, { useEffect, useMemo, useState } from "react";
import { useValue } from "../../../context/ContextProvider";
import { getRooms } from "../../../actions/room";
import { Avatar, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import RoomsActions from "./RoomsActions";
import { Box } from "@mui/system";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";

const Rooms = ({ setSelectedLink, link }) => {
  const {
    state: { rooms },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (rooms.length === 0) getRooms(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "images",
        headerName: "Images",
        width: 70,
        renderCell: (params) => (
          <Avatar src={params.row.images[0]} variant="rounded" />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: "price",
        headerName: "Cost",
        width: 90,
        renderCell: (params) => "Rs." + params.row.price,
      },
      {
        field: "title",
        headerName: "Title",
        width: 180,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
      },
      {
        field: "lng",
        headerName: "Longitude",
        width: 110,
      },
      {
        field: "lat",
        headerName: "Latitude",
        width: 110,
      },
      {
        field: "uName",
        headerName: "Added By ",
        width: 90,
        renderCell: (params) => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto} />
          </Tooltip>
        ),
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      { field: "_id", hide: true },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => <RoomsActions {...{ params }} />,
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage Rooms
      </Typography>
      <DataGrid
        columns={columns}
        rows={rooms}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 15]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Rooms;
