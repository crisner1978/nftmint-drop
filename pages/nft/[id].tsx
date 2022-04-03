import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { modalState } from 'atoms/modalAtom'
import { BigNumber } from 'ethers'
import { sanityClient, urlFor } from 'lib/sanity'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { Collection } from 'typings'
import { nftState } from 'atoms/nftAtom'

interface Props {
  collection: Collection
}

const NFTDropPage = ({ collection }: Props) => {
  const [open, setOpen] = useRecoilState(modalState);
  const [nftData, setNftData] = useRecoilState(nftState)
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [loading, setLoading] = useState<boolean>(true)
  const [priceInEth, setPriceInEth] = useState<string>()
  const nftDrop = useNFTDrop(collection.address)
  console.log('collection', collection)

  // Authentication
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  useEffect(() => {
    if (!nftDrop) return
    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll()
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }
    fetchPrice()
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) return
    const fetchNFTDropData = async () => {
      setLoading(true)
      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()
      setClaimedSupply(claimed.length)
      setTotalSupply(total)
      setLoading(false)
    }
    fetchNFTDropData()
  }, [nftDrop])

  const mintNft = () => {
    if (!nftDrop || !address) return
    const quantity = 1 // how many unique NFT's you want to claim

    setLoading(true)
    const notification = toast.loading('Minting....', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    })

    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt // the transaction receipt
        const claimedTokenId = tx[0].id // the id of the NFT claimed
        const claimedNFT = await tx[0].data() // (optional) get the claimed NFT metadata
        setNftData({
          receipt,
          claimedTokenId,
          claimedNFT,
        })
        setOpen(true)
        toast("HOORAY... You Successfully Minted!", {
          duration: 8000,
          style: {
            background: "green",
            color: "white",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          }
        })

        console.log('tx', tx)
        console.log('receipt', receipt)
        console.log('claimedTokenId', claimedTokenId)
        console.log('claimedNFT', claimedNFT)
      })
      .catch((err) => {
        console.log('err', err)
        toast("Whoops... Something went wrong!", {
          style: {
            background: "red",
            color: 'white',
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          }
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  return (
    <div className="flex h-screen flex-col overflow-y-scroll scrollbar-hide lg:grid lg:grid-cols-10">
      {/* Left  */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 dark:from-blue-900  dark:via-black dark:to-pink-900 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 via-red-300 to-indigo-600 p-2 dark:from-rose-900 dark:via-blue-700/50 dark:to-violet-900">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src={urlFor(collection.previewImage.asset).url()}
              alt="NFT"
            />
          </div>

          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">
              {collection?.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection?.description}</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col bg-gradient-to-b from-white to-gray-50 px-4 py-12 dark:from-black dark:to-gray-900 sm:p-12 lg:col-span-6">
        <header className="flex items-center justify-between">
          <Link href="/">
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              The{' '}
              <span className="font-extrabold underline decoration-pink-600/50 dark:decoration-red-400">
                PAPARISE
              </span>{' '}
              NFT Market Place
            </h1>
          </Link>

          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className={`${
              address
                ? 'signInBtn bg-gray-500  hover:ring-gray-600/50 dark:hover:ring-slate-300'
                : 'signInBtn bg-red-400 hover:ring-pink-600/50 dark:bg-pink-900  dark:hover:bg-gray-200 dark:hover:ring-red-400'
            }`}
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>

        <hr className="my-2 border" />

        {address && (
          <p className="text-center text-sm text-rose-400">
            You're logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}
        {/* Content */}
        <div
          className="mt-10 flex flex-1 flex-col items-center 
        space-y-6 text-center lg:justify-center lg:space-y-0"
        >
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection.mainImage.asset).url()}
            alt="NFT"
          />

          <h1 className="text-3xl font-bold lg:text-4xl lg:font-extrabold">
            {collection?.title}
          </h1>
          {loading ? (
            <p className="animate-pulse pt-2 text-xl text-green-500 dark:brightness-125">
              Loading Supply Count...
            </p>
          ) : (
            <p className="pt-2 text-xl text-green-500 dark:brightness-125">
              {claimedSupply} / {totalSupply?.toString()} NFT's claimed
            </p>
          )}

          {loading && (
            <img
              className="h-80 w-80 object-contain"
              src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
              alt=""
            />
          )}
        </div>

        {/* Mint Button */}
        <button
          onClick={mintNft}
          disabled={
            loading || claimedSupply === totalSupply?.toNumber() || !address
          }
          className="mt-10 h-16 w-full transform rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 font-bold
          text-white transition-all duration-150 ease-out active:scale-95 disabled:from-gray-700 disabled:to-gray-400 disabled:text-gray-400"
        >
          {loading ? (
            <>Loading</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>SOLD OUT</>
          ) : !address ? (
            <>Sign in to Mint</>
          ) : !priceInEth ? (
            <>Loading</>
          ) : (
            <span className="font-bold">Mint NFT ({priceInEth} ETH)</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
        asset
    },
    previewImage {
        asset
    },
    slug {
        current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
          current
      },
    },
  }`

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
