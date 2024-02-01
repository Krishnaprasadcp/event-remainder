import Layout from '@/components/Layout/Layout'
import store from '@/store';
import { useAppDispatch } from '@/store/hooks';
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
     <Provider store={store}>
     <SessionProvider session={pageProps.session}>
        <Layout>
        <Component {...pageProps} />
        </Layout>
    </SessionProvider>
     </Provider>
    </Fragment>
  )
}
