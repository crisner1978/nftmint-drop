import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import React from 'react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from 'lib/sanity'
import { Collection } from 'typings'
import Link from 'next/link'

interface Props {
  collection: Collection
}

const NFTDropPage = ({ collection }: Props) => {
  const router = useRouter()
  console.log('collection', collection)

  // Authentication
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  console.log('address', address)

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

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection?.title}
          </h1>
          <p className="pt-2 text-xl text-green-500 dark:brightness-125">
            13 / 21 NFT's claimed
          </p>
        </div>

        {/* Mint Button */}
        {address && (
          <button
            className="mt-10 h-16 w-full transform rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 font-bold
        text-white transition-all duration-150 ease-out active:scale-95"
          >
            Mint NFT (0.01 ETH)
          </button>
        )}
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
