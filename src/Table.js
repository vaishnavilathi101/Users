import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {

          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {

          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    if (sortConfig !== null && sortConfig.searchTerm !== "") {
      const data = sortableItems.filter(
        product =>
          (product.firstName.toLowerCase().indexOf(sortConfig.searchTerm) > -1) || (product.lastName.toLowerCase().indexOf(sortConfig.searchTerm) > -1) ,
      );
      return data;
    }
    else {
      return sortableItems
    }
  }, [items, sortConfig]);

  const requestSort = (key, searchTerm) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({ key, direction, searchTerm });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const Table = (props) => {

  const [searchValue, setSearchValue] = useState('');
  const { items, requestSort, sortConfig } = useSortableData(props.users);
  const [filteredProducts, setFilteredProducts] = useState(items);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  useEffect(() => {

    setFilteredProducts(items)
  }, [items])

  const search = (searchTerm) => {
    setSearchValue(searchTerm);

    if (searchTerm !== "") {

      const filtered = items.filter(
        product =>
          (product.first_name.toLowerCase().indexOf(searchTerm) > -1) || (product.last_name.toLowerCase().indexOf(searchTerm) > -1)
      );

      setFilteredProducts(filtered);
    }
    else {
      setFilteredProducts(items);
    }
  }

  return (
    <div class="container">
      <h2 className="title">Users</h2>
      <div class="wrap">
        <div class="search">
          <input type="text" value={searchValue} onChange={(e) => search(e.target.value)} className="searchTerm"
            id="input_text" />
          <button type="submit" className="searchButton">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort('first_name', searchValue)}
                className="table-header"
              >
                Firstname
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('last_name', searchValue)}
                className="table-header"
              >
                Lastname
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('age', searchValue)}
                className="table-header"
              >
                Age
              </button>
            </th>

            <th>
              <button
                type="button"
                onClick={() => requestSort('email', searchValue)}
                className="table-header"
              >
                Email
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('web', searchValue)}
                className="table-header"
              >
                Web
              </button>
            </th>
          </tr>
        </thead>

        <Pagination
          data={filteredProducts}
          title="Products"
          pageLimit={5}
          dataLimit={10}
        />

      </table>
    </div>


  );
};
export default Table;
