import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const handleReset = (form) => {
    console.log("Reset Password:", form);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 shadow-lg rounded-lg border w-[450px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <ResetPasswordForm onSubmit={handleReset} />
      </div>
    </div>
  );
}
