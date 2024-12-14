"use client";

import {VoteContext} from "@/context/voteContext";
import {useContext} from "react";

const VoteDisplay = () => {
  const {votingResults, loading} = useContext(VoteContext);

  if (loading || !votingResults) {
    return (
      <div className="shadow-xl p-10 bg-white hover:shadow-2xl transition-all duration-300">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  const totalVotes =
    (votingResults?.candidateA ?? 0) + (votingResults?.candidateB ?? 0);
  const candidateAPercentage =
    totalVotes > 0
      ? Math.round(((votingResults?.candidateA ?? 0) / totalVotes) * 100)
      : 0;

  return (
    <div className="shadow-xl p-10 bg-white hover:shadow-2xl transition-all duration-300">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex justify-start items-end gap-5">
            <img
              src="/biden-headshot.png"
              className="h-[180px] w-[180px] bg-[#000fff] rounded-full object-cover shadow-lg"
            />
            <div>
              <p className="text-4xl font-bold mb-2">Joe Biden</p>
              <p className="text-2xl">
                {votingResults?.candidateA.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex justify-end items-end gap-5 text-end">
            <div>
              <p className="text-4xl font-bold mb-2">Donald Trump</p>
              <p className="text-2xl">
                {votingResults?.candidateB.toLocaleString()}
              </p>
            </div>
            <img
              src="/trump-headshot.png"
              className="h-[180px] w-[180px] bg-[#ff0803] rounded-full object-cover shadow-lg"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex-grow h-9 shadow bg-[#ff0803] relative">
            <div
              className="h-full inset-0  bg-[#000fff]  absolute"
              style={{
                width: `${candidateAPercentage}%`,
              }}
            ></div>
            {/* Vertical line at 50% */}
            <div className="absolute top-0 h-full w-[2px] bg-black left-[50%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDisplay;
