import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Typography, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import StarBorder from '@material-ui/icons/StarBorder'
import IdexImg from '../../assets/trade/IDEX_Screenshot.png'
import PDexImg from '../../assets/trade/Paradex_Screenshot.png'
import WaveImg from '../../assets/trade/Waves_Exchange_Screenshot.png'
import useStyles from './styles'

function Trade () {
  const classes = useStyles()
  const tileData = [
    {
      img: IdexImg,
      title: 'IDEX - Trade ERC-20 Tokens',
      author: 'Idex.market'
    },
    {
      img: PDexImg,
      title: 'Paradex - Trade ERC-20 Tokens',
      author: 'Paradex.io'
    },
    {
      img: WaveImg,
      title: 'Wave - Trade or Create ERC-20 Tokens',
      author: 'Waves.exchange'
    }
  ]
  return (
    <Grid container justify='center' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h1'>
          Trade ERC-20 Crytocurrencies in an Efficent Manner
        </Typography>
        <Typography variant='subtitle2'>
          Below is list of ERC-20 (Ethereum based Tokens) Decentralized Exchanges that can be used with your wallet, allowing you to trade easily and efficently.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={2.5}>
            {tileData.map((tile) => (
              <GridListTile key={tile.img}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  actionIcon={
                    <IconButton aria-label={`star ${tile.title}`}>
                      <StarBorder className={classes.title} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Grid>
    </Grid>
  )
}

export default withRouter(Trade)
