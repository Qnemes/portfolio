import Head from 'next/head'

export const BaseLayout = ({ children }) => {
  return (
    <div id="main">
      <Head>
        <title>Vladyslav Semeniuk | Frontend developer</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#181818" />
        <meta name="msapplication-TileColor" content="#120e26" />
        <meta name="theme-color" content="#120e26" />
        <meta
          name="viewport"
          key="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@qnemes" />
        <meta property="og:site_name" content="Vladyslav Semeniuk | Frontend developer" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Vladyslav Semeniuk | Frontend developer" />
        <meta property="og:locale" content="en" />
        <meta property="og:url" content="https://qnemes.vercel.app" />
        <meta
          name="description"
          content="Hello! I'm Vladyslav, a Frontend Developer based in Opole, Poland. I enjoy creating beautiful and reliable applications for internet and phones. My goal is to always build scalable products and performant experiences."
        />
        <meta
          name="keywords"
          content="Developer, Javascript, Frontend, React, Typescript, Next.js, React Developer"
        />
        <meta property="og:image" content="https://qnemes.vercel.app/avatar.jpg" />
        <meta property="twitter:image" content="https://qnemes.vercel.app/avatar.jpg" />
      </Head>
      {children}
    </div>
  )
}
