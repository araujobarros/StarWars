import React, { useEffect, useContext, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { FaGalacticRepublic } from 'react-icons/fa';
import DataContext from '../context/DataContext';

function Table() {
  const MAXWIDTH = 812;
  const DIVFACTOR = 30;
  const EMPTY = 0;

  const { data,
    isLoading,
    filters,
    order,
    windowDimensions } = useContext(DataContext);

  const [films] = useState(
    ['A New Hope',
      'The Empire Strikes Back',
      'Return of the Jedi',
      'The Phantom Menace',
      'Attack of the Clones',
      'Revenge of the Sith'],
  );

  useEffect(() => {
  }, [isLoading]);

  const filterByText = () => data.filter(
    (row) => row.name.includes(filters.filterByName.name),
  );

  const sortNumbers = (column, sort) => {
    if (sort === 'ASC') {
      return filterByText().sort((a, b) => a[column] - b[column]);
    }
    return filterByText().sort((a, b) => b[column] - a[column]);
  };

  // ajuda de https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare e
  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value?page=1&tab=votes#tab-top
  const sortStrings = (column, sort) => {
    if (sort === 'ASC') {
      return filterByText().sort((a, b) => a[column].localeCompare(b[column]));
    }
    return filterByText().sort((a, b) => b[column].localeCompare(a[column]));
  };

  const applyOrder = (column, sort) => {
    if (column === 'name') {
      return sortStrings(column, sort);
    }
    return sortNumbers(column, sort);
  };

  let updatedFilter = applyOrder(order.column, order.sort);

  const filterList = filters.filterByNumericValues;

  filterList.forEach((objectToFilter) => {
    const { column, comparison, value } = objectToFilter;
    if (value && comparison === 'maior que') {
      updatedFilter = updatedFilter.filter(
        (row) => (parseInt(row[column], 10) > parseInt(value, 10)),
      );
    } else if (value && comparison === 'menor que') {
      updatedFilter = updatedFilter.filter(
        (row) => (parseInt(row[column], 10) < parseInt(value, 10)),
      );
    } else if (value) {
      updatedFilter = updatedFilter.filter(
        (row) => (parseInt(row[column], 10) === parseInt(value, 10)),
      );
    }
  });

  const { height, width } = windowDimensions;

  function createRef(el) {
    if (!el) return el;
    el.style.fontSize = (width < MAXWIDTH) ? `${height / DIVFACTOR}px` : '0.9em';
    window.addEventListener('scroll',
      () => {
        const position = el.getBoundingClientRect().y;
        if (position <= height && width < MAXWIDTH) {
          el.style.fontSize = `${el.getBoundingClientRect().y / DIVFACTOR}px`;
        }
      });
  }

  function renderIntroduction() {
    if (width < MAXWIDTH) {
      return (
        <section className="intro_text">
          <p className="intro_animacao block">
            A Long Time Ago, in a galaxy far, far away ...
          </p>
          <div className="arrows">
            <div className="arrow_1"><IoIosArrowUp /></div>
            <div className="arrow_2"><IoIosArrowUp /></div>
            <div className="arrow_3"><IoIosArrowUp /></div>
          </div>
        </section>
      );
    }
  }

  function renderCells(row, field) {
    const planetsList = updatedFilter.map((objectPlamet) => objectPlamet.name);
    const isPlanetCell = planetsList.some((planet) => planet === row[field]);
    const filmsList = updatedFilter.map((objectPlamet) => objectPlamet.films);
    const isFilmsCell = filmsList.some((film) => film === row[field]);
    const urlList = updatedFilter.map((objectPlamet) => objectPlamet.url);
    const isUrlCell = urlList.some((url) => url === row[field]);
    const FACTOR_TO_FIND_NUMBER_IN_URL_FILM = 2;

    if (isPlanetCell === true) {
      return (
        <td key={ row[field] }>
          <p className="td-content" ref={ createRef } data-testid="planet-name">
            {(width < MAXWIDTH) ? `${field}: ${row[field]}` : row[field]}
          </p>
        </td>
      );
    } if (isFilmsCell === true) {
      return (
        <td className="menu" key={ row[field] }>
          <p className="td-content" ref={ createRef }>
            { (width < MAXWIDTH) ? `${field}:` : ''}
          </p>
          {row[field].map(
            (film) => (
              <ul className="menu-list" key={ film }>
                <a href={ film } ref={ createRef }>
                  <p className="td-content">
                    {films[film[film.length - FACTOR_TO_FIND_NUMBER_IN_URL_FILM] - 1]}
                  </p>
                </a>
              </ul>),
          )}
        </td>
      );
    } if (isUrlCell === true) {
      return (
        <td key={ row[field] }>
          <a href={ row[field] } ref={ createRef }>
            <p className="td-content">Mais informações</p>
          </a>
        </td>
      );
    }
    return (
      <td key={ row[field] } title={ row[field] }>
        <p className="td-content" ref={ createRef }>
          {(width < MAXWIDTH) ? `${field}: ${row[field]}` : row[field]}
        </p>
      </td>
    );
  }

  if (!isLoading && data.length !== EMPTY) {
    const fields = Object.keys(data[0]);
    const fieldsFiltered = fields.filter(
      (field) => (
        field !== 'residents'
      ),
    );
    return (
      <div className="block">
        {renderIntroduction()}
        <section>
          <table>
            <thead>
              <tr>
                {fieldsFiltered.map(
                  (field) => (<th key={ field } title={ field }>{field}</th>),
                )}
              </tr>
            </thead>
            <tbody>
              {updatedFilter
                .map(
                  (row) => (
                    <tr key={ row.name } title={ row.name }>
                      {fieldsFiltered.map(
                        (field) => (
                          renderCells(row, field)
                        ),
                      )}
                    </tr>),
                )}
            </tbody>
          </table>
        </section>
      </div>

    );
  }
  return (
    <div className="load"><FaGalacticRepublic /></div>
  );
}

export default Table;
