import React from "react";
import "./InfoBox.css";
import { Card, Typography, CardContent } from "@material-ui/core";

function InfoBox({ title, isRed, isBlue, isPink, cases, total }) {
  return (
    <div className="infoBox">
      <Card
        style={{
          borderTop: isBlue
            ? "4px solid rgb(185 233 111)"
            : "4px solid rgb(220 35 146)",
        }}
      >
        <CardContent className="infoBox__content">
          <Typography className="infoBox__title">{title}</Typography>
          <h2 className="infoBox__cases">+{cases}</h2>
          <Typography className="infoBox__total">+{total} Total</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
