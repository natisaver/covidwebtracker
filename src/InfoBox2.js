/* type rfce es7 extension to fast game layout */
import React from 'react'
import "./Infobox.css";
import { Card, CardContent, Typography} from '@material-ui/core';


function InfoBox2({title, cases, total, ...props}) {
    return (
        <Card onClick={props.onClick} className="infoBox">
            <CardContent>
                {/* Title covid cases */}
                <Typography className="infoBox__title" color='textSecondary'>{title}</Typography>
                {/* 120k no of cases */}
                <h2 className="infobox2">{cases}</h2>
                {/* 1.2m total */}
                <Typography className="infoBox__total" color='textSecondary'>{total} Total </Typography>
            </CardContent>
            
        </Card>
    )
}

export default InfoBox2