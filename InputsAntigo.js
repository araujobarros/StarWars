import React, { useState, useContext, useEffect } from 'react';
import { FaGalacticRepublic } from 'react-icons/fa';
import { GiLightSabers } from 'react-icons/gi';
import DataContext from '../context/DataContext';

function Inputs() {
  const { filters, setFilter, parameterList, setParameterList,
    windowDimensions, setOrder } = useContext(DataContext);
  const [listToOrder] = useState(parameterList);
  const [columnFilter, setcolumnFilter] = useState(parameterList[0]);
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(null);
  const [activatedFilters, setActivatedFilters] = useState([]);
  const [columnToOrder, setColumnToOrder] = useState('name');
  const [sort, setSort] = useState('ASC');
  const [isActive, setIsActive] = useState(false);
  const [classBurger, setIsActiveBurger] = useState('');
  const [classMenu, setIsActiveMenu] = useState('navbar-menu');
  const [classSaber, setIsActiveSaber] = useState('rotated');

  const handleClick = () => {
    if (isActive === false) {
      setIsActive(true);
      setIsActiveBurger(classBurger.concat(' is-active'));
      setIsActiveMenu(classMenu.concat(' is-active'));
      setIsActiveSaber('clockwise');
    } else {
      setIsActive(false);
      setIsActiveBurger('');
      setIsActiveMenu('navbar-menu');
      setIsActiveSaber('counterClockwise');
    }
  };

  function handleChangeInputText(event) {
    setFilter({
      ...filters,
      filterByName: {
        name: event.target.value,
      },
    });
  }

  function handleChange(event, setState) {
    setState(event.target.value);
  }

  function handleClickNumericFilter() {
    const { filterByNumericValues } = filters;
    setFilter({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        {
          column: columnFilter,
          comparison,
          value: valueFilter,
        },
      ],
    });
    setParameterList(parameterList.filter(
      (element) => element !== columnFilter,
    ));
    setActivatedFilters([
      ...activatedFilters, { content: `${columnFilter} ${comparison} ${valueFilter}`,
        column: columnFilter },
    ]);
  }

  useEffect(() => {
    setcolumnFilter(parameterList[0]);
  }, [filters, parameterList]);

  useEffect(() => {
    setcolumnFilter(parameterList[0]);
  }, [filters, parameterList]);

  function handleClickAtivatedFilter({ target }) {
    const { filterByNumericValues } = filters;
    setFilter({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter((filter) => filter.column !== target.value),
    });
    setActivatedFilters(activatedFilters.filter((filter) => filter.column !== target.value));
    setParameterList([target.value, ...parameterList]);
  }

  function handleRadio({ target }) {
    if (target.checked) {
      setSort(target.value);
    }
  }

  function handleClickOrder() {
    setOrder({
      column: columnToOrder,
      sort,
    });
  }

  function renderSaberButton() {
    if (windowDimensions.width < 760) {
      return (
        <button
          type="button"
          className={ `${classBurger} button is-light button-saber` }
          onClick={ handleClick }
        >
          <div className={ classSaber }>
            <GiLightSabers className="subtitle light-saber" />
            {/* <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" /> */}
          </div>
        </button>
      );
    }
  }

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="columns is-vcentered">
        <div className="column is-2">
          <div className="navbar-brand columns is-mobile is-vcentered">
            <div className="navbar-item column is-10">
              <div className="columns is-vcentered is-mobile">
                <div className="column mx-2 my-2 is-3">
                  <FaGalacticRepublic className="title" />
                </div>
                <div className="jediFont subtitle column">
                  Star Wars Planets List
                </div>
              </div>
            </div>
            <div className="column">
              {renderSaberButton()}
            </div>
          </div>
        </div>
        {/* <div className="column test"> */}
        <div className={ `${classMenu} columns is-vcentered` }>
          <div className="column is-4">
            <div className="navbar-start columns is-vcentered mx-1 pl-5">
              <div className="navbar-item column px-1 is-3">
                <input
                  data-testid="name-filter"
                  className="input"
                  type="text"
                  placeholder="Planeta"
                  onChange={ handleChangeInputText }
                />
              </div>
              <div className="column is-8">
                <div className="columns is-mobile">
                  <span className="navbar-item column is-4">
                    <div className="select is-multiple is-small">
                      <select className="" data-testid="column-filter" onChange={ (event) => handleChange(event, setcolumnFilter) } onSelect="teste">
                        {parameterList.map(
                          (parameter) => <option key={ parameter } value={ parameter }>{parameter}</option>,
                        )}
                      </select>
                    </div>
                  </span>

                  <span className="navbar-item column is-4">
                    <div className="select is-multiple is-small">
                      <select className="" data-testid="comparison-filter" onChange={ (event) => handleChange(event, setComparison) }>
                        <option>maior que</option>
                        <option>menor que</option>
                        <option>igual a</option>
                      </select>
                    </div>
                  </span>

                  <span className="navbar-item column is-4 ">
                    <input
                      data-testid="value-filter"
                      className="input is-small"
                      type="number"
                      placeholder="Quantidade"
                      onChange={ (event) => handleChange(event, setValueFilter) }
                    />
                  </span>

                </div>
              </div>
            </div>
          </div>
          <div className="navbar-item column is-1">
            <div className="buttons is-centered">
              <button data-testid="button-filter" type="button" className="button" onClick={ handleClickNumericFilter }>Add filtro</button>
            </div>
          </div>
          <div className="column">
            <div className="navbar-item activated-filter">
              {activatedFilters.map((filter) => (
                <div key={ filter } className="">
                  <div data-testid="filter" className="tag">
                    {filter.content}
                    <div className="buttons is-centered">
                      <button type="button" className="delete is-small " value={ filter.column } onClick={ handleClickAtivatedFilter }>X</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="navbar-end column is-3">
            <div className="columns is-mobile is-vcentered pl-6">
              <div className="navbar-item column">
                <div className="select is-multiple">
                  <select
                    data-testid="column-sort"
                    onChange={ (event) => handleChange(event, setColumnToOrder) }
                  >
                    {
                      ['name', ...listToOrder].map(
                        (parameter) => <option key={ parameter } value={ parameter }>{parameter}</option>,
                      )
                    }
                  </select>
                </div>
              </div>

              <div className="navbar-item column is-6 ">
                <label htmlFor="answer" className="radio">
                  <input data-testid="column-sort-input-asc" type="radio" name="answer" value="ASC" onClick={ handleRadio } />
                  ASC
                </label>
                <label htmlFor="answer" className="radio">
                  <input data-testid="column-sort-input-desc" type="radio" name="answer" value="DESC" onClick={ handleRadio } />
                  DESC
                </label>
              </div>

            </div>

          </div>
          <div className="navbar-item column is-2">
            <div className="buttons is-centered">
              <button data-testid="column-sort-button" type="button" className="button" onClick={ handleClickOrder }>Ordenar</button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>

    </nav>
  );
}

export default Inputs;
