"use client";
import {AuthContext} from "@/context/authContext";
import {VoteContext} from "@/context/voteContext";
import axios from "axios";
import {serialize} from "bson";
import {useContext, useState} from "react";
import {pickle} from "picklefriend";

const Ballot = () => {
  const {token, loading: authLoading, setUser, user} = useContext(AuthContext);
  const {votingResults, loading, setVotingResults} = useContext(VoteContext);
  const [vote, setVote] = useState<"biden" | "trump" | null>();
  const [submitted, setSubmitted] = useState(false);

  if (loading || authLoading) {
    return (
      <div className="shadow-xl w-full p-10 mt-10 hover:shadow-2xl transition-all duration-300 ease-in bg-white">
        Loading...
      </div>
    );
  }

  if (user?.voted) {
    return (
      <div className="shadow-xl w-full text-2xl p-10 mt-10 hover:shadow-2xl transition-all duration-300 ease-in bg-white">
        You have already voted. Thank you!
      </div>
    );
  }

  const handleSubmit = async (e: any) => {
    if (!vote) {
      alert("Please select a candidate");
      return;
    }
    setSubmitted(true);
    const candidate = vote === "biden" ? "candidateA" : "candidateB";

    // Submit vote
    // Serialize the vote data
    const voteData = {candidate};
    const serializedData = pickle.dumps(voteData);

    // Create a Blob from the serialized data
    const blob = new Blob([serializedData], {type: "application/octet-stream"});

    // Prepare FormData to send the file
    const formData = new FormData();
    formData.append("file", blob, "vote.pkl"); // The file will be named `vote.pkl`

    try {
      await axios.post("http://localhost:8080/vote/submit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (user) {
        setUser({
          ...user,
          voted: true,
        });
      }
      if (votingResults) {
        setVotingResults({
          ...votingResults,
          [candidate]: votingResults[candidate] + 1,
        });
      }
      alert("Vote submitted successfully");
    } catch (err) {
      alert("Failed to submit vote");
    }
    setSubmitted(false);
  };

  const handleChange = (e: any) => {
    setVote(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="shadow-xl w-full p-10 mt-10 hover:shadow-2xl transition-all duration-300 ease-in bg-white">
      <div>
        <div className="font-bold text-3xl">PRESIDENTIAL ELECTOR</div>
        <div className=" text-xl">(VOTE FOR NO MORE THAN 1)</div>
        <div className="mt-3 flex justify-start gap-2 text-2xl">
          <input
            type="radio"
            id="biden"
            name="president"
            value="biden"
            onChange={handleChange}
            checked={vote === "biden"}
          />
          <label htmlFor="biden">Joe Biden</label>
        </div>
        <div className="mt-3 flex justify-start gap-2 text-2xl">
          <input
            type="radio"
            id="trump"
            name="president"
            value="trump"
            onChange={handleChange}
            checked={vote === "trump"}
          />
          <label htmlFor="trump">Donald Trump</label>
        </div>
        <button
          className="mt-5 bg-neutral-700 text-white p-3 rounded-lg hover:bg-neutral-500 transition-all duration-300 ease-in flex justify-center items-center gap-2"
          onClick={handleSubmit}
        >
          <div
            className={`${
              !submitted && "hidden"
            } animate-spin inline-block w-5 h-5 border-[4px] border-current border-t-transparent text-white rounded-full`}
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Ballot;
