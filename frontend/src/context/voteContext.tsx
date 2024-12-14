"use client";
import {VotingResults} from "@/types/VotingResults";
import axios from "axios";
import {createContext, useEffect, useState} from "react";

type Props = {
  children: React.ReactNode;
};

interface IVoteContext {
  votingResults?: VotingResults;
  setVotingResults: (votingResults: VotingResults) => void;
  loading: boolean;
}

export const VoteContext = createContext<IVoteContext>({
  votingResults: undefined,
  setVotingResults: () => {},
  loading: true,
});

export const VoteProvider = ({children}: Props) => {
  const [votingResults, setVotingResults] = useState<VotingResults>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVotingResults = async () => {
      try {
        const res = await axios("http://localhost:8080/vote/results");
        setVotingResults(res.data);
        setLoading(false);
      } catch (error) {
        alert("Error fetching voting results");
      }
    };
    fetchVotingResults();
  }, []);

  return (
    <VoteContext.Provider
      value={{
        votingResults: votingResults,
        setVotingResults: setVotingResults,
        loading: loading,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};
