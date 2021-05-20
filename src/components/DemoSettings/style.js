import styled from 'styled-components';
import SettingsIcon from '@material-ui/icons/Settings';
import Drawer from '@material-ui/core/Drawer';

export const CustomSettingBtn = styled(SettingsIcon)`
  position: absolute;
  top: 55px;
  font-size: 30px;
  right: 55px;
`;

export const SettingSelector = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  font-family: pfdintextarabic,'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;
  font-weight: 500;
  background: #fff;
  border: 1px solid grey;
  font-size: 13px;
  border-radius: 3px;
  &:hover {
    background-color: rgb(255, 252, 187);
    cursor: pointer;
  }
  &:focus {
    background-color: rgb(255, 252, 187);
  }
`;

export const CustomDrawer = styled(Drawer)``;

export const DrawerContainer = styled.div`
  width: 300px;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
`;

export const QuerySample = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
