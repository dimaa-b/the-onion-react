import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { search_for_image } from '../helpers/common';

export default function ArticleCard({ articleData, setViewArticle, index }) {
    const [image, setImage] = useState('');
    useEffect(() => {
        if (image === '') {
            console.log(articleData)
            if (articleData.imageDescription && articleData.mainTag) {
                search_for_image(articleData.imageDescription).then((data) => {
                    setImage(data);
                });
            } 
        }
        
    }   )

    return (
        <Card sx={{ width: 320 }}>
            <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                    src={image}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <div>
                <Typography level="title-lg">{articleData.title}</Typography>
            </div>
            <Button onClick={() => setViewArticle(index)}>Read More</Button>
        </Card>
    )
}