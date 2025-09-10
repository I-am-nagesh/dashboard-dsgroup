import InviteConfirmationForm from "../components/InviteConfirmationForm";

export default function InviteConfirmPage() {
  const handleConfirm = (form) => {
    console.log("Confirm Invite:", form);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 shadow-lg rounded-lg border w-[450px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Confirm Account</h2>
        <InviteConfirmationForm onSubmit={handleConfirm} />
      </div>
    </div>
  );
}
