/* type rfce es7 extension to fast game layout */
import React from 'react'
import { Card, CardContent, Typography} from '@material-ui/core';

function Active({title, cases, total, total2}) {
    return (
        <Card className="active">
            <CardContent>
                {/* Title covid cases */}
                <Typography className="active__title" color='textSecondary'>{title}</Typography>
                {/* 120k no of cases */}
                <h3 className="active__cases">{cases}</h3>
                {/* 1.2m total */}
                <Typography className="active__total" color='textSecondary'>{total} Critical </Typography>
            </CardContent>
            
        </Card>
    )
}

export default Active