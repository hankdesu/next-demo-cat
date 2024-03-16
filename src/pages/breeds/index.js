import { useEffect, useState } from 'react'
import Image from 'next/image'

import Layout from '@/components/Layout'
import Select from '@/components/Select'

export async function getStaticProps() {
  const res = await fetch('https://api.thecatapi.com/v1/breeds?api_key=live_5EX8mKyUdT8LPVAvA3IX8RrmDnhR7DS8WIehR2QUrwZuep8Sf6XVpIjYFrH5cDMm')
  const breeds = await res.json()

  return { props: { breeds } }
}

export default function Breeds({ breeds }) {
  const options = breeds.map(({ id, name }) => ({ id, name }));
  const [breed, setBreed] = useState('');
  const [breedImage, setBreedImage] = useState('');

  useEffect(() => {
    async function getBreedImage() {
      const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&api_key=live_5EX8mKyUdT8LPVAvA3IX8RrmDnhR7DS8WIehR2QUrwZuep8Sf6XVpIjYFrH5cDMm`);
      const result = await res.json();
      const data = result.pop() || {};

      setBreedImage(data.url || '');
    }

    if (breed) {
      getBreedImage();
    }
  }, [breed])

  function handleChange(e) {
    const value = e.currentTarget.value;
    setBreed(value);
  }

  return (
    <>
      <Select options={options} handleChange={handleChange} />
      <div className="mt-5 aspect-h-1 aspect-w-1 w-80 overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
        {breedImage && (
          <Image
            src={breedImage}
            alt="breed image"
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            width={300}
            height={300}
          />
        )}
      </div>
    </>
  )
}

Breeds.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  )
}
