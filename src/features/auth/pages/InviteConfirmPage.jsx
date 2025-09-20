import InviteConfirmationForm from "../components/InviteConfirmationForm";

export default function InviteConfirmPage() {
  const handleConfirm = (form) => {
    console.log("Confirm Invite:", form);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-400/15 via-purple-400/15 to-pink-400/15 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-indigo-500/8 via-purple-500/8 to-pink-500/8 rounded-full blur-xl translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-16 left-16 w-16 h-16 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-40 w-20 h-20 bg-gradient-to-r from-pink-500/15 to-orange-500/15 rounded-full animate-bounce [animation-delay:1s]"></div>
      <div className="absolute top-1/2 left-8 w-12 h-12 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full animate-ping [animation-delay:2s]"></div>
      <InviteConfirmationForm onsubmit={handleConfirm} />
    </div>
  );
}
