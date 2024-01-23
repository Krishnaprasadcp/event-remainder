import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Fragment } from 'react';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <SessionProvider session={pageProps.session}>
        <Layout>
        <Component {...pageProps} />
        </Layout>
    </SessionProvider>
    </Fragment>
  )
}
