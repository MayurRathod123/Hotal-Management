/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      {/* <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen025.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Hotel Management</span>
        </div>
      </div>
      <AsideMenuItemWithSub to='/hotel/' title='Hotel' hasBullet={true}>
     
        <AsideMenuItem to='/hotel-management' title='Hotel Management' hasBullet={true}/>
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub to='/car/' title='Car' hasBullet={true}>
        <AsideMenuItem to='/car-management' title='Car Management' hasBullet={true}/>
      </AsideMenuItemWithSub>
      {/* <AsideMenuItem
        to='/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      /> */}
    </>
  )
}
