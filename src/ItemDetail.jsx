import React, { useState } from 'react';
import './ItemDetail.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ItemCount from './ItemCount';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function ItemDetail( { item, id, name, image, description, stock, initial, price }) {
    const classes = useStyles();

    const [ counter, setCounter ] = useState(initial)

    function add(){
        if (counter < stock ){
            setCounter(counter+1)
        }
    }

    function substract() {
        if (counter > initial ){
            setCounter(counter-1)
        }
    }

    return (
        <div className="itemDetail">
             <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={name}
                  height="300"
                  image={image}
                  title={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {description} Precio ${price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          <div className="itemDetail__counter">
            <ItemCount initial={initial} stock={stock} add={add} substract={substract}
            item={item} counter={counter}  id={id}/>
          </div>
        </div>
    )
}

export default ItemDetail 
