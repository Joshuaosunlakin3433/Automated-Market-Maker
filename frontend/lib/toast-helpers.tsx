import toast from "react-hot-toast";

export function showSuccessToast(txId: string, message: string) {
  toast.success(
    (t) => (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{message}</p>
        <button
          onClick={() => {
            window.open(
              `https://explorer.hiro.so/txid/0x${txId}?chain=testnet`,
              "_blank"
            );
            toast.dismiss(t.id);
          }}
          className="text-left text-blue-600 hover:text-blue-800 underline text-sm font-medium"
        >
          View on Explorer →
        </button>
      </div>
    ),
    { duration: 6000 }
  );
}

export function showErrorToast(message: string) {
  toast.error(
    <div className="flex flex-col gap-1">
      <p className="font-semibold">Transaction failed ❌</p>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}

export function showMintSuccessToast(txId: string, message: string) {
  toast.success(
    (t) => (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{message}</p>
        <button
          onClick={() => {
            window.open(
              `https://explorer.hiro.so/txid/0x${txId}?chain=testnet`,
              "_blank"
            );
            toast.dismiss(t.id);
          }}
          className="text-left text-blue-600 hover:text-blue-800 underline text-sm font-medium"
        >
          View on Explorer →
        </button>
      </div>
    ),
    { duration: 6000 }
  );
}

export function showPoolCreatedToast(txId: string, message: string) {
  toast.success(
    (t) => (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{message}</p>
        <button
          onClick={() => {
            window.open(
              `https://explorer.hiro.so/txid/0x${txId}?chain=testnet`,
              "_blank"
            );
            toast.dismiss(t.id);
          }}
          className="text-left text-blue-600 hover:text-blue-800 underline text-sm font-medium"
        >
          View on Explorer →
        </button>
      </div>
    ),
    { duration: 6000 }
  );
}
