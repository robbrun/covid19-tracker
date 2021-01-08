import React from 'react'
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

// destructuring of items that will be listed in each infobox
function InfoBox({ title, cases, total }) {
  return (
    // from material ui, card element:
    <Card className="infoBox">
      <CardContent>
          {/* Title */}
          <Typography className="infoBox__title" color="textSecondary">{title}</Typography>

          {/* Number of cases */}
          <h2 className="infoBox__cases">{cases}</h2>

          {/* Total */}
          <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
