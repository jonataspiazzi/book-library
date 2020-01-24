import React from 'react';
import { appStorage } from '../common/appStorage';

export const withUser = (Wrapped) => (props) => 
  (<Wrapped {...props} user={appStorage.getUser()} />);