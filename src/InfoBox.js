import React from 'react'
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

/* destructuring of items that will be listed in each infobox
 * ...props covers for any other props other than defined, 
 * so onClick would be inside this
 */
function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    /* From material ui, card element:
     * If active mark 'infoBox--selected' 
     * If isRed mark active 'infoBox--red'
     */
    <Card onClick={props.onClick} className=
    {`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
      <CardContent>
          {/* Title */}
          <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
          {/* Number of cases */}
          <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
          {/* Total cases */}
          <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
