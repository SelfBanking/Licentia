import React, { useState, useEffect } from 'react'
import { Drawer, IconButton, List } from '@material-ui/core'

// connect
// import LinkTwoToneIcon from '@material-ui/icons/LinkTwoTone'
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone'
import SwapHorizontalCircleTwoToneIcon from '@material-ui/icons/SwapHorizontalCircleTwoTone'
import PanToolTwoToneIcon from '@material-ui/icons/PanToolTwoTone'
import AssessmentTwoToneIcon from '@material-ui/icons/AssessmentTwoTone'
import PaymentTwoToneIcon from '@material-ui/icons/PaymentTwoTone'
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone'
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone'
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone'

import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone'

import { useTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

// styles
import useStyles from './styles'

// components
import SidebarLink from './components/SidebarLink/SidebarLink'

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from '../../context/LayoutContext'

const GettingStartedItems = [
  {
    id: 1,
    label: 'LEARN',
    link: '/learn',
    icon: <HelpTwoToneIcon />
  },
  {
    id: 2,
    label: 'EXCHANGE',
    link: '/exchange',
    icon: <SwapHorizontalCircleTwoToneIcon />
  },
  {
    id: 3,
    label: 'TRADE',
    link: '/trade',
    icon: <AssessmentTwoToneIcon />
  },
  {
    id: 4,
    label: 'LEND',
    link: '/lend',
    icon: <PanToolTwoToneIcon />
  },
  {
    id: 5,
    label: 'PAY',
    link: '/pay',
    icon: <PaymentTwoToneIcon />
  },
  {
    id: 6,
    label: 'INSURE',
    link: '/insure',
    icon: <VerifiedUserTwoToneIcon />
  },
  {
    id: 7,
    label: 'SHOP',
    link: '/shop',
    icon: <ShoppingCartTwoToneIcon />
  },
  {
    id: 8,
    label: 'BORROW',
    link: '/borrow',
    icon: <MonetizationOnTwoToneIcon />
  },
  {
    id: 9,
    label: 'DONATE',
    link: '/donate',
    icon: <FavoriteTwoToneIcon />
  }
]

function Sidebar ({ location }) {
  var classes = useStyles()
  var theme = useTheme()

  // global
  var { isSidebarOpened } = useLayoutState()
  var layoutDispatch = useLayoutDispatch()

  // local
  var [isPermanent, setPermanent] = useState(true)

  useEffect(function () {
    window.addEventListener('resize', handleWindowWidthChange)
    handleWindowWidthChange()
    return function cleanup () {
      window.removeEventListener('resize', handleWindowWidthChange)
    }
  })

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened
        })
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <CloseTwoToneIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {GettingStartedItems.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  )

  // ##################################################################
  function handleWindowWidthChange () {
    var windowWidth = window.innerWidth
    var breakpointWidth = theme.breakpoints.values.md
    var isSmallScreen = windowWidth < breakpointWidth

    if (isSmallScreen && isPermanent) {
      setPermanent(false)
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true)
    }
  }
}

export default withRouter(Sidebar)
