import React, { useState, useEffect } from 'react';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const dropDownList = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [data, setData] = useState([]);
  const [isLoading, setLoad] = useState(false);
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [parameterList, setParameterList] = useState(dropDownList);
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contextValue = {
    data,
    setData,
    isLoading,
    setLoad,
    filters,
    setFilter,
    parameterList,
    setParameterList,
    order,
    setOrder,
    windowDimensions,
  };

  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  // Realizado com a ajuda de https://stackoverflow.com/questions/63570597/typeerror-func-apply-is-not-a-function
  useEffect(() => {
    (async () => {
      setLoad(true);
      const { results } = await fetch(url)
        .then((response) => response.json());
      // console.log(results);
      setData(results);
      setLoad(false);
    })();
  }, []);

  // https://qastack.com.br/programming/36862334/get-viewport-window-height-in-reactjs

  return (
    <DataContext.Provider
      value={ { ...contextValue } }
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
