import React from "react";
import { Slider } from "@mui/material";
import { styled } from "@mui/system";

const StyledSlider = styled(Slider)({
  color: "#833ff9d9",
  height: 2,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 12,
    width: 12,
    backgroundColor: "#833ff9d9",
    border: "1px solid currentColor",
    "&:hover, &.Mui-focusVisible, &.Mui-active": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "transparent",
    color: "#833ff9d9",
    fontWeight: "bold",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#833ff9d9",
    height: 4,
    width: 4,
    "&.MuiSlider-markActive": {
      opacity: 0.7,
      backgroundColor: "currentColor",
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.4,
    backgroundColor: "#833ff9d9",
  },
  "& .MuiSlider-markLabel": {
    color: "#833ff9d9", // Sets color of the labels (min and max)
    fontWeight: "bold", // Makes the min and max labels bold
  },
});

interface CustomSliderProps {
  value: number;
  onChange: (event: Event, value: number | number[]) => void;
  step: number;
  min: number;
  max: number;
  valueLabelDisplay: "on" | "auto" | "off";
  marks: { value: number; label?: string }[];
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onChange,
  step,
  min,
  max,
  valueLabelDisplay,
  marks,
}) => {
  return (
    <StyledSlider
      value={value}
      onChange={onChange}
      step={step}
      min={min}
      max={max}
      valueLabelDisplay={valueLabelDisplay}
      marks={marks}
      // Ensure marks have labels for min and max
      sx={{
        "& .MuiSlider-markLabel": {
          color: "#833ff9d9",
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default CustomSlider;
