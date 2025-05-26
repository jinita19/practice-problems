import React, { useState, useMemo, useEffect } from "react";
import "./DataTable.scss";

function DataTable() {
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "asc",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/users.json");
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    };

    fetchData();
  }, []);

  const sortedData = useMemo(() => {
    const sorted = [...users];
    const { key, direction } = sortConfig;

    sorted.sort((a, b) => {
      if (typeof a[key] === "number") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      } else {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    return sorted;
  }, [users, sortConfig]);

  const totalPages = Math.max(1, Math.floor(users.length / +rowsPerPage));

  const startIndex = (activePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            {/**convert it to button to make it asscessible*/}
            {/* <th scope="col">
              <button onClick={() => handleSort('id')} aria-label="Sort by ID">
                ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </button>
            </th> */}
            <th scope="col" onClick={() => handleSort("id")}>
              id
            </th>
            <th scope="col" onClick={() => handleSort("name")}>
              name
            </th>
            <th scope="col" onClick={() => handleSort("age")}>
              age
            </th>
            <th scope="col" onClick={() => handleSort("occupation")}>
              occupation
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData
            .slice(startIndex, endIndex)
            .map(({ id, name, age, occupation }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{age}</td>
                  <td>{occupation}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/*page controller*/}
      <nav className="btn-container" aria-label="Pagination navigation">
        <button
          disabled={activePage === 1}
          onClick={() => setActivePage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {activePage} of {totalPages}
        </span>

        <button
          disabled={activePage === totalPages}
          onClick={() => setActivePage((prev) => prev + 1)}
        >
          Next
        </button>

        {/*row-selector*/}
        <div className="row-select">
          <label htmlFor="rows-select">Rows per page</label>
          <select
            id="rows-select"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
          </select>
        </div>
      </nav>
    </div>
  );
}

export default DataTable;
