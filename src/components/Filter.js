import React, { useState } from "react";

export default function Filter({ data }) {
  const [selectFilter, setSelectFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("az");
  const [newData, setNewData] = useState(data);

  const onChangeFilterHandler = (event) => {
    setSelectFilter(event.target.value);

    const lithuaniaArea = data && data.find((x) => x.name === "Lithuania").area;

    if (event.target.value === "all") {
      setNewData(data.sort((a, b) => a.name.localeCompare(b.name)));
    }

    if (event.target.value === "all" && nameFilter === "za") {
      setNewData(data.sort((a, b) => b.name.localeCompare(a.name)));
    }

    if (event.target.value === "Lithuania") {
      setNewData(
        data
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter((result) => result.area < lithuaniaArea)
      );
    }
    if (event.target.value === "Lithuania" && nameFilter === "za") {
      setNewData(
        data
          .sort((a, b) => b.name.localeCompare(a.name))
          .filter((result) => result.area < lithuaniaArea)
      );
    }

    if (event.target.value === "Oceania") {
      setNewData(
        data
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter((result) => result.region === "Oceania")
      );
    }
    if (event.target.value === "Oceania" && nameFilter === "za") {
      setNewData(
        data
          .sort((a, b) => b.name.localeCompare(a.name))
          .filter((result) => result.region === "Oceania")
      );
    }
  };

  const onChangeNameHandler = (event) => {
    setNameFilter(event.target.value);

    if (event.target.value === "az") {
      newData.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (event.target.value === "za") {
      newData.sort((a, b) => b.name.localeCompare(a.name));
    }
  };

  return (
    <>
      <span>
        <select value={selectFilter} onChange={onChangeFilterHandler}>
          <option value="all">All</option>
          <option value="Lithuania">Smaller than Lithuania</option>
          <option value="Oceania">In Oceania region</option>
        </select>
      </span>

      <span className="nameFilter">
        <select value={nameFilter} onChange={onChangeNameHandler}>
          <option value="az">Name A-Z</option>
          <option value="za">Name Z-A</option>
        </select>
      </span>

      <div>
        {newData &&
          newData.map((country) => (
            <ul key={country.name}>
              <li>
                <span>Name: {country.name}</span>
              </li>
              <li>
                <span>Area: {country.area}</span>
              </li>
              <li>
                <span>Region: {country.region}</span>
              </li>
            </ul>
          ))}
      </div>
    </>
  );
}
