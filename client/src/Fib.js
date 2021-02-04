import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const fetchValues = async () => {
  const { data } = await axios.get("/api/values/current");
  return data;
};

const fetchIndexes = async () => {
  const { data } = await axios.get("/api/values/all");
  return data;
};

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchData = useCallback(async () => {
    const values = await fetchValues();
    const indexes = await fetchIndexes();
    setValues(values);
    setSeenIndexes(indexes);
  }, []);

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const onChange = (e) => {
    setIndex(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/values", {
      index,
    });

    setIndex("");
  };

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For Index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="">Enter your index</label>
        <input value={index} onChange={onChange} type="text" />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}
      <div className="hello">hello</div>
    </div>
  );
};

export default Fib;
