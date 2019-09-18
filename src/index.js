import React from 'react';
import Routes from './routes';
import './config/StatusBarConfig';
import moment from 'moment';
import 'moment/locale/pt';

moment.locale('pt');
console.disableYellowBox = true;

const App = () => <Routes/>;

export default App;