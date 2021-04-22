import { useEffect } from 'react';

export default function Home(props) {

  /*
    CONSUMINFO API: SPA
    useEffect(() => {
    fetch('http://localhost:3333/episodes')
      .then(response => response.json())
      .then(data => console.log(data))
  }, []);

  CONSUMINDO API: SSR
  export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    }
  }

}

  */




  return (
    <>
      <h1>Esta é a página inicial</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}

//Consumindo API com SSG
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  //Uma versão estática vai ser cacheada e a cada 8 horas eu faço um novo acesso a api a atualizo
  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8
  }

}
