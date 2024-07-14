import React, { useEffect, useState } from "react";
import { useValue } from "../../../context/ContextProvider";
import { getUsers, updateStatus } from "../../../actions/user";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";

const UsersActions = ({ params, rowId, setRowId }) => {
  const {
    dispatch,
    state: { currentUser, users },
  } = useValue();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { role, active, _id } = params.row;
    console.log("Updating user with ID:", _id);
  console.log("New role:", role, "New active status:", active);
    const result = await updateStatus(
      { role, active },
      _id,
      dispatch,
      currentUser
    );
    if (result) {
      setSuccess(true);
      setRowId(null);
      getUsers(dispatch, currentUser);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[800] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UsersActions;
