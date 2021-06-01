import React from 'react';
import './styles.scss';
import DataProvider from './context/DataProvider';
import Table from './components/Table';
import Inputs from './components/Inputs';

function App() {
  return (
    <DataProvider>
      <Inputs />
      <Table />
    </DataProvider>
  );
}

export default App;
