import Head from 'next/head'
import SEO from './SEO'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SEO title="MyAccount" description="내 자산 관리를 보다 쉽게!" image="" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}

export default Layout
