import React, { useEffect, useState, useCallback } from "react";
import Loading from "./UI/LoadingSpinner";
import Filter from "./Filter";

export default function Data() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();


  const dataHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://restcountries.com/v2/all?fields=name,region,area"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const results = await response.json();
      setData(results);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    dataHandler();
  }, [dataHandler]);



  return (
    <>
      {error}
      {!error && loading && <Loading />}
      {!error && !loading && <Filter data={data} />}
    </>
  );
}
