import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import Header from './Header'

const AppProvider = ({ children }) => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <ThemeProvider attribute="class">
        <Header />
        {children}
      </ThemeProvider>
    </ThirdwebProvider>
  )
}

export default AppProvider