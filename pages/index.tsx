import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

function traitsFromGroup(group){
  return <ul>

    {Object.keys(group).map(trait => <li key={trait}>{trait}</li>)}

  </ul>
}

function TraitGroup({name, group}) {
  return <><dt>{name}</dt><dd>{traitsFromGroup(group)}</dd></>
}

export default function Home({collection}) {
  console.log(collection)
  return (
    <div className={styles.container}>
      <Head>
        <title>DegenVision</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Degen Vision</a>
        </h1>

        <p className={styles.description}>
          {collection.name}
        </p>

        <div className={styles.grid}>
          <dl>
            {Object.keys(collection.traits).map(key => <TraitGroup key={key} name={key} group={collection.traits[key]} />)}
          </dl>


        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {

  const options = {method: 'GET'};

  const res = await fetch('https://api.opensea.io/api/v1/collection/degentoonz-collection', options)
  const {collection} = await res.json()

  const res2 = await fetch('https://api.opensea.io/api/v1/bundles?on_sale=true&asset_contract_address=0x19b86299c21505cdf59ce63740b240a9c822b5e4&limit=20&offset=0', options)
  const debug = await res.json()




    console.log(debug)



  return {
    props: {
      collection
    }
  }
}
