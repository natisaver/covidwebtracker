/* type rfce es7 extension to fast game layout */
import React from 'react'
import "./Infobox.css";
import { Card, CardContent, Typography} from '@material-ui/core';



function InfoBox({title, cases, isActive, isGreen, isOrange, total, ...props}) {
    return (

        <Card onClick={props.onClick} 
        className={`infoBox ${isActive && 'infoBox--selected'} ${isGreen &&  'infoBox--green'} ${isOrange && 'infoBox--orange'}`} 
        
        > {/* -- is for modification of element, __ is element change 
            3 diff classes: active, isgreen & isorange to style the cards*/}

            <CardContent>
                {/* Title covid cases */}
                <Typography className="infoBox__title" color='textSecondary'>{title}</Typography>
                {/* 120k no of cases */}
                <h2 className={`"infoBox__cases" ${isGreen &&  'infoBox--green'} ${isOrange && 'infoBox--orange'}`}>{cases}</h2>
                {/* 1.2m total */}
                <Typography className="infoBox__total" color='textSecondary'>{total} Total </Typography>
            </CardContent>
            
        </Card>
    )
}



export default InfoBox
