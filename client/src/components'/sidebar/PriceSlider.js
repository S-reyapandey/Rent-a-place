import React from "react";
import { useValue } from "../../context/ContextProvider";
import { Box, Slider, Typography } from "@mui/material";

const marks = [
    { value: 0, label: 'Rs.0' },
    { value: 5000, label: 'Rs.5000' },
    { value: 10000, label: 'Rs.10000' },
  ];

const PriceSlider = () => {
  const {
    state: { priceFilter },
    dispatch,
  } = useValue();
  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Max Price : {"Rs" + priceFilter}</Typography>
      <Slider
        min={0}
        max={10000}
        defaultValue={500}
        valueLabelDisplay="auto"
        marks={marks}
        value={priceFilter}
        onChange={(e, price) =>
          dispatch({ type: "FILTER_PRICE", payload: price })
        }
      />
    </Box>
  );
};

export default PriceSlider;
