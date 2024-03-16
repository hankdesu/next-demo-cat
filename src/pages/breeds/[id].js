import Layout from "@/components/Layout";
import Image from "next/image";

export async function getStaticPaths() {
  const res = await fetch(
    "https://api.thecatapi.com/v1/breeds?api_key=live_5EX8mKyUdT8LPVAvA3IX8RrmDnhR7DS8WIehR2QUrwZuep8Sf6XVpIjYFrH5cDMm"
  );
  const breeds = await res.json();
  const paths = breeds.map((breed) => ({
    params: { id: breed.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${params.id}&api_key=live_5EX8mKyUdT8LPVAvA3IX8RrmDnhR7DS8WIehR2QUrwZuep8Sf6XVpIjYFrH5cDMm`
  );
  const result = await res.json();
  const data = result.pop() || {};

  return { props: { data } };
}

export default function BreedId({ data }) {
  return (
    <>
      <div className="mt-5 aspect-h-1 aspect-w-1 w-80 overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={data.url}
          alt="breed image"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          width={300}
          height={300}
        />
      </div>
    </>
  );
}

BreedId.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
