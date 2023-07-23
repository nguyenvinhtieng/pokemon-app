import Head from 'next/head'

export default function HeadMeta() {
  return (
    <Head>
      <title>Pokemon App</title>
      <meta name="description" content="Pokemon App" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
