import ConnectButton from "./components/ConnectButton";

export default function Page() {
  return (<div>


    <div className="flex justify-between items-center p-6">
      <p className="text-lg font-bold">Wowow FAICET</p>
      <ConnectButton />

      
    </div>
    <div>
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Get a token from Wowow</h1>
        <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700">
          Get Wowow tokens
        </button>
      </div>
    </div>
    </div>
  </div>
  );
}
