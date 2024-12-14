import Ballot from "@/components/ballot";
import Header from "@/components/header";
import VoteDisplay from "@/components/voteDisplay";
import {VoteProvider} from "@/context/voteContext";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <VoteProvider>
        <Header />
        <VoteDisplay />
        <Ballot />
      </VoteProvider>
    </div>
  );
}
