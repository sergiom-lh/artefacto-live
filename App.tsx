import React, { useState } from 'react';
import Home from './components/Home';
import Day1 from './components/Day1';
import Day2 from './components/Day2';
import Day3 from './components/Day3';
import Day4 from './components/Day4';
import { AppRoute } from './types';

const App: React.FC = () => {
  const [route, setRoute] = useState<approute>(AppRoute.HOME);

  const renderContent = () => {
    switch (route) {
      case AppRoute.HOME:
        return <home setroute="{setRoute}"/>;
      case AppRoute.DAY_1:
        return <day1 setroute="{setRoute}"/>;
      case AppRoute.DAY_2:
        return <day2 setroute="{setRoute}"/>;
      case AppRoute.DAY_3:
        return <day3 setroute="{setRoute}"/>;
      case AppRoute.DAY_4:
        return <day4 setroute="{setRoute}"/>;
      default:
        return <home setroute="{setRoute}"/>;
    }
  };

  return (
    <div classname="app-container">
      {renderContent()}
    </div>
  );
};

export default App;