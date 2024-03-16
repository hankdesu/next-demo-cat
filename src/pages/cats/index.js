import Layout from '@/components/Layout';
import Image from 'next/image';

export async function getServerSideProps() {
  const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=8&api_key=live_5EX8mKyUdT8LPVAvA3IX8RrmDnhR7DS8WIehR2QUrwZuep8Sf6XVpIjYFrH5cDMm')

  const cats = await res.json()

  return { props: { cats } }
}

export default function Cats({ cats }) {

  return (
    <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {cats.map((cat) => (
          <div key={cat.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <Image
                src={cat.url}
                alt={cat.id}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                width={300}
                height={300}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

Cats.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
