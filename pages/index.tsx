import { sanityClient, urlFor } from 'lib/sanity'
import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Collection } from 'typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  const router = useRouter()
  return (
    <div className="m-auto flex h-screen max-w-7xl flex-col overflow-y-scroll py-20 px-10 scrollbar-hide 2xl:px-0">
      <h1 className="mb-10 text-4xl font-extralight">
        The{' '}
        <span className="font-extrabold underline decoration-pink-600/50">
          PAPARISE
        </span>{' '}
        NFT Market Place
      </h1>
      <main className="bg-slate-200 p-10 shadow-xl shadow-rose-400/20 dark:bg-slate-800 dark:shadow-pink-600/30">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collections.map((collection) => (
            <Link key={collection._id} href={`/nft/${collection.slug.current}`}>
              <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105 ">
                <img
                  className="h-96 w-60 rounded-2xl object-cover"
                  src={urlFor(collection.mainImage).url()}
                  alt="img"
                />
                <div className="p-5">
                  <h2 className="text-3xl">{collection.title}</h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

// Home.getLayout = function PageLayout(page: any) {
//   return (
//     <>{page}</>
//   )
// }

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
        asset
    },
    previewImage {
        asset
    },
    slug {
        current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
          current
      },
    },
  }`

  const collections = await sanityClient.fetch(query)
  console.log('collections', collections)

  return {
    props: {
      collections,
    },
  }
}
