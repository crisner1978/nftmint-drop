import { Dialog, Transition } from "@headlessui/react";
import { modalState } from "atoms/modalAtom";
import { nftState } from "atoms/nftAtom";
import { urlFor } from "lib/sanity";
import { Fragment } from "react";
import { useRecoilState } from "recoil";

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [nftData, setNftData] = useRecoilState(nftState)
  const { claimedNFT } = nftData
  console.log(nftData)




  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opactiy-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle bg-gray-100 dark:bg-black rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-4  sm:max-w-sm sm:w-full sm:p-6">
              <div className="rounded-xl bg-gradient-to-br from-yellow-600 via-red-300 to-indigo-400 p-2 dark:from-rose-900 dark:via-blue-700/50 dark:to-violet-900">
              <div className="flex flex-col items-center justify-center py-2">
                <img
                  className="w-44 rounded-xl object-cover lg:h-60 lg:w-60"
                  src={claimedNFT?.metadata?.image}
                  alt="NFT"
                />
                <div className="space-y-2 p-5 text-center">
                  <h1 className="text-3xl font-bold text-slate-700 dark:text-gray-100">
                    {claimedNFT?.metadata?.description + " " + claimedNFT?.metadata.name}
                  </h1>
                  <h2 className="text-sm dark:text-rose-400 text-red-900">NFT was added to wallet {claimedNFT?.owner?.substring(0, 5)}...
                    {claimedNFT?.owner?.substring(claimedNFT?.owner?.length - 5)}</h2>
                </div>
              </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

// "owner": "0x7a2F531F219454e74001A4D536FdcF93E31936Da",
//     "metadata": {
//         "name": "#5",
//         "description": "A PAPAFAM Ape",
//         "image": "https://gateway.ipfscdn.io/ipfs/QmecgHz9dM171cR4JxSaw2B3uzWtQvLYjhBzNZJ3N1EX2c/5.png",
//         "id": {
//             "type": "BigNumber",
//             "hex": "0x05"
//         },
//         "uri": "ipfs://QmR3zsDrnxUYThSoPZXCQViqquLLhcN18VFDwuS4pnJJHS/5",
//         "properties": {
//             "Shirt": "black",
//             "Fur": "brown",
//             "Hat": "bunny ears",
//             "Eyes": "zombie"
//         }
//     }
