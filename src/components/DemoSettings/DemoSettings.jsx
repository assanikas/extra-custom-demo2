import React, { useContext } from 'react';
import {
  CustomSettingBtn,
  DrawerContainer,
  CustomDrawer,
  SettingSelector,
  QuerySample,
} from './style';

import { Context as DemoSettingsContext } from '../../context/appActions';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);
  const {
    updateQueryState,
    updateQueryStateResults,
    updateQueryPersona,
    updateQueryMerchandising,
  } = useContext(DemoSettingsContext);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  return (
    <div>
      <React.Fragment key='right'>
        <CustomSettingBtn onClick={toggleDrawer(true)}></CustomSettingBtn>
        <CustomDrawer anchor='right' open={state} onClose={toggleDrawer(false)}>
          <DrawerContainer>
            <h3>FederatedSearch Queries</h3>
            <QuerySample>
              <SettingSelector
                onClick={(e) => updateQueryState('blue jeans')}
                variant='outlined'
                color='primary'
              >
                blue Jeans
              </SettingSelector>
              <SettingSelector
                onClick={(e) => updateQueryState('t-shirt uomo')}
                variant='outlined'
                color='primary'
              >
                t-shirt Uomo
              </SettingSelector>
            </QuerySample>
            <h3>Results Queries</h3>
            <QuerySample>
              <SettingSelector
                onClick={(e) => updateQueryStateResults('bag')}
                variant='outlined'
                color='primary'
              >
                bag
              </SettingSelector>
              <SettingSelector
                onClick={(e) => updateQueryStateResults('accessories')}
                variant='outlined'
                color='primary'
              >
                accessories
              </SettingSelector>
            </QuerySample>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            >
              <h3>Voice queries </h3>
              <p style={{ marginLeft: '5px', fontSize: '12px' }}>
                (Read out nice and clear)
              </p>
            </div>
            <QuerySample>
              <SettingSelector variant='outlined' color='primary'>
                black bag
              </SettingSelector>
              <SettingSelector variant='outlined' color='primary'>
                accessories
              </SettingSelector>
            </QuerySample>
            <h3>Merchandising</h3>
            <SettingSelector
              onClick={(e) => updateQueryState('saldi')}
              variant='outlined'
              color='primary'
            >
              search "saldi"
            </SettingSelector>
            <h3>Redirection</h3>
            <SettingSelector
              onClick={(e) => updateQueryState('parfums')}
              variant='outlined'
              color='primary'
            >
              search "parfums"
            </SettingSelector>
            <h3>Persona</h3>
            <SettingSelector
              onClick={(e) => updateQueryPersona('kassim')}
              variant='outlined'
              color='primary'
            >
              Persona1: Kassim
            </SettingSelector>
            <SettingSelector
              onClick={(e) => updateQueryPersona('yixuan')}
              variant='outlined'
              color='primary'
            >
              Persona2: Yixuan
            </SettingSelector>
          </DrawerContainer>
        </CustomDrawer>
      </React.Fragment>
    </div>
  );
}
