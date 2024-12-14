import LoginForm from "@/components/loginForm";
import Test from "@/components/test";

export default function Home() {
  return (
    <div
      id="card"
      className="w-[700px] bg-white bg-opacity-70 rounded-2xl shadow-lg py-10"
    >
      <div className="flex flex-row justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
