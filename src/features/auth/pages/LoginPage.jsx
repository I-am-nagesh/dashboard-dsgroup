import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const handleLogin = (form) => {
    console.log("Login:", form);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 shadow-lg rounded-lg border w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
