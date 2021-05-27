import React, { useEffect, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoIosArrowUp } from 'react-icons/io';
import { FaGalacticRepublic } from 'react-icons/fa';
import DataContext from '../context/DataContext';

// teste

function Table() {
  const { data,
    isLoading,
    filters,
    order,
    windowDimensions } = useContext(DataContext);

  const [films] = useState(['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith']);
  const [size, setSize] = useState('0.9em');

  useEffect(() => {
    // console.log(isLoading);
  }, [isLoading]);

  // useEffect(() => {
  //   window.addEventListener('resize',
  //     () => setSize(
  //       (`${parseFloat(size) - 0.05}em`),
  //     ));
  // }, [size]);

  const filterByText = () => data.filter(
    (row) => row.name.includes(filters.filterByName.name),
  );

  // criar uma função para sort aqui com os parâmetros do context

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
  // let updatedFilter = filterByText().sort((a, b) => a.name.localeCompare(b.name));
  // console.log(updatedFilter);

  const filterList = filters.filterByNumericValues;
  // console.log(filterList);

  filterList.forEach((objectToFilter) => {
    const { column, comparison, value } = objectToFilter;
    if (value && comparison === 'maior que') {
      // console.log({ column, comparison, value });
      updatedFilter = updatedFilter.filter((row) => (parseInt(row[column]) > parseInt(value)));
      // console.log('if1');
    } else if (value && comparison === 'menor que') {
      // console.log({ column, comparison, value });
      updatedFilter = updatedFilter.filter((row) => (parseInt(row[column]) < parseInt(value)));
      // console.log('if2');
    } else if (value) {
      // console.log({ column, comparison, value });
      updatedFilter = updatedFilter.filter((row) => (parseInt(row[column]) === parseInt(value)));
      // console.log('if2');
    }
  });

  // const filterByNumber = () => {

  // };

  // console.log(useWindowDimensions());

  const { height, width } = windowDimensions;

  function createRef(el) {
    if (!el) return el;
    el.style.fontSize = (width < 760) ? `${height / 30}px` : '0.9em';
    window.addEventListener('scroll',
      () => {
        const position = el.getBoundingClientRect().y;
        if (position <= height && width < 760) {
          el.style.fontSize = `${el.getBoundingClientRect().y / 30}px`;
        }
      });
  }

  function renderIntroduction() {
    if (width < 760) {
      return (
        <section className="intro_text">
          <p className="intro_animacao block">A Long Time Ago, in a galaxy far, far away ...</p>
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

    if (isPlanetCell === true) {
      return (
        <td>
          <p className="td-content" ref={ createRef }>
            {(width < 760) ? `${field}: ${row[field]}` : row[field]}
          </p>
        </td>
      );
    } if (isFilmsCell === true) {
      return (
        <td className="menu">
          <p className="td-content" ref={ createRef }>
            { (width < 760) ? `${field}:` : ''}
          </p>
          {row[field].map(
            (film) => (
              <ul className="menu-list" key={ film }>
                <a href={ film } ref={ createRef }>
                  <p className="td-content">{films[parseInt(film[film.length - 2]) - 1]}</p>
                </a>
              </ul>),
          )}
        </td>
      );
    } if (isUrlCell === true) {
      return (
        <td>
          <a href={ row[field] } ref={ createRef }>
            <p className="td-content">Mais informações</p>
          </a>
        </td>
      );
    }
    return (
      <td key={ row[field] } title={ row[field] }>
        <p className="td-content" ref={ createRef }>
          {(width < 760) ? `${field}: ${row[field]}` : row[field]}
        </p>
      </td>
    );
  }

  if (!isLoading && data.length !== 0) {
    // console.log(data[0]);
    const fields = Object.keys(data[0]);
    // console.log(fields);
    const fieldsFiltered = fields.filter(
      (field) => (
        field !== 'residents'
      ),
    );
    // console.log(fieldsFiltered);
    return (
      <div className="block">
        {renderIntroduction()}
        <section>
          {/* {productsFromMLB.map(
          (product) => (<ProductCard exemploProps={ product } key={ product.id } />),
        )} */}
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

// Table.propTypes = {
//   movie: PropTypes.shape({
//     title: PropTypes.string,
//     subtitle: PropTypes.string,
//     storyline: PropTypes.string,
//     rating: PropTypes.number,
//     imagePath: PropTypes.string,
//     id: PropTypes.string,
//   }).isRequired,
// };

export default Table;
