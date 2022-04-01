import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react'
import React from 'react'

const NFTDropPage = () => {

  // Authentication
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  console.log("address", address)

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left  */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 via-red-300 to-indigo-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src="https://links.papareact.com/8sg"
              alt="NFT"
            />
          </div>

          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">PAPARISE Apes</h1>
            <h2 className="text-xl text-gray-300">
              A collection of PAPARISE Apes who live & breathe React!
            </h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col px-4 py-12 sm:p-12 lg:col-span-6 bg-gradient-to-b from-white to-gray-50">
        <header className="flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
            The{' '}
            <span className="font-extrabold underline decoration-pink-600/50">
            PAPARISE
            </span>{' '}
            NFT Market Place
          </h1>
          
          <button onClick={() => address ? disconnect() : connectWithMetamask()} 
          className={`${address ? "bg-gray-500 hover:ring-gray-600/50  signInBtn"
          : "bg-red-400 hover:ring-pink-600/50 signInBtn"}`}>
            {address ? "Sign Out" : "Sign In"}
          </button>
        </header>

        <hr className="my-2 border" />

        {address && (
          <p className="text-center text-sm text-rose-400">You're logged in with wallet {address.substring(0, 5)}...{address.substring(address.length - 5)}</p>
        )}
        {/* Content */}
        <div
          className="mt-10 flex flex-1 flex-col items-center 
        space-y-6 text-center lg:justify-center lg:space-y-0"
        >
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src="https://links.papareact.com/bdy"
            alt="NFT"
          />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            PAPARISE Ape Developers | NFT Mint Drop
          </h1>
          <p className="pt-2 text-xl text-green-500">13 / 21 NFT's claimed</p>
        </div>

        {/* Mint Button */}
        <button className="mt-10 h-16 w-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 font-bold text-white
        transition-all transform ease-out duration-150 active:scale-95">
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage
