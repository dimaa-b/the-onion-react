import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';

export default function ArticleCard({ articleData }) {
    return (
        <Card sx={{ width: 320 }}>
            <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                    src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <div>
                <Typography level="title-lg">{articleData.title}</Typography>
                {/* <Typography level="body-sm">April 24 to May 02, 2021</Typography> */}
            </div>
        </Card>
    )
}