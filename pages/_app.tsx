import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const MyComponent = Component as any
  return <MyComponent {...pageProps} />
}

export default MyApp
