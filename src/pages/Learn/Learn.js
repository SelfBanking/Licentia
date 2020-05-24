import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Typography, Button } from '@material-ui/core'
import ImportContactsOutlined from '@material-ui/icons/ImportContactsOutlined'
import LocalLibraryOutlined from '@material-ui/icons/LocalLibraryOutlined'
import LocalCafeOutlined from '@material-ui/icons/LocalCafeOutlined'
function Learn () {
  return (
    <Grid container justify='center' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h1'>
          Level Up Easily
        </Typography>
        <Typography variant='subtitle2'>
          Wealcome to a the future, the world of Crypto Currencies. The world of blockchain, which is the underlining technology behind decentralized Crypto Currencies, is vast and can be somewhat overwealming. Join the exploration by reading Reviews on Dapp (Decentralized Applications), get informed on the latest News or start Learning the ecosystem and it's technologies.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ImportContactsOutlined style={{ fontSize: 140 }} />
        <Typography variant='subtitle2'>
          Here you will find, in-depth product reviews, analysis on features and serivices, usability, security and more helpful information, helping you arrive at a better choice.
        </Typography>
        <Button variant='outlined' size='large'>Reviews</Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <LocalLibraryOutlined style={{ fontSize: 140 }} />
        <Typography variant='subtitle1'>
          Level up your blockchain knowledge by enjoying one of our curated available courses.
        </Typography>
        <Button variant='outlined' size='large'>Learn</Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <LocalCafeOutlined style={{ fontSize: 140 }} />
        <Typography variant='subtitle1'>
          The world is changing fast. Dont get left behind. Stay on top of these changes with the latest crypto and blockchain news.
        </Typography>
        <Button variant='outlined' size='large'>News</Button>
      </Grid>
    </Grid>
  )
}

export default withRouter(Learn)
