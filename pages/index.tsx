import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div className="h-screen bg-black">
      <Head>
        <title>NFT Mint Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-red-700">Welcome to the NFT Mint DROP PAPARISE</h1>
      <div className="flex h-full items-center justify-center">
        <button onClick={() => router.push("/nft/paparise")}
          className="font-deca transform bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text 
          text-3xl md:text-5xl font-bold text-transparent transition-all duration-200 ease-out hover:brightness-110 
          active:scale-95"
        >
          Let's Get Some NFT's
        </button>
      </div>
    </div>
  )
}

export default Home
