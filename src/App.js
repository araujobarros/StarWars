import React from 'react';
import './styles.scss';
import DataProvider from './context/DataProvider';
import Table from './components/Table';
import Inputs from './components/Inputs';
// import Teste from './components/Teste';

function App() {
  return (
    <DataProvider>
      <div>
        <Inputs />
        {/* <Teste /> */}
        <Table />
      </div>
    </DataProvider>

  );
}

export default App;
