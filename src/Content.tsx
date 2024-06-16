import React, { useContext, useEffect, useState } from 'react';
import Generator from './components/Generator';
import Settings from './components/Settings';
import { AppContext, AppProps } from './App';
import { ROUTES } from './const';

function Content() {
  const { route } = useContext<AppProps>(AppContext);

  switch (route) {
    case ROUTES.SETTINGS:
      return <Settings />;

    default:
      return <Generator />;
  }
}

export default Content;
