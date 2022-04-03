import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'
import Header from './Header'
import Modal from './Modal'

const AppProvider = ({ children }) => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <ThemeProvider attribute="class">
        <RecoilRoot>
          <Head>
            <title>NFT Mint Drop</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          {children}
          <Modal />
          <Toaster position="bottom-center" />
        </RecoilRoot>
      </ThemeProvider>
    </ThirdwebProvider>
  )
}

export default AppProvider