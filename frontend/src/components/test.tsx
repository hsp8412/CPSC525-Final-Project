"use client";

import axios from "axios";
import {useEffect, useState} from "react";

type VotingResultsType = {
  candidateA: number;
  candidateB: number;
};

const Test = () => {
  const [results, setResults] = useState<VotingResultsType | null>();
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:8080/vote/results");
        setResults(response.data); // Save the results in the state
      } catch (err) {
        console.log(err);
      }
    };

    fetchResults();
  }, []);

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>{results.candidateA}</div>
      <div>{results.candidateB}</div>
    </>
  );
};

export default Test;
