import { GetStaticProps } from 'next';
import { api } from '../services/api';

type Episode = {
  id: string;
  title: string;
  members: string;
}

type HomeProps = {
  episodes: Episode[];
}

export default function Home(props: HomeProps) {

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
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  //Uma versão estática vai ser cacheada e a cada 8 horas eu faço um novo acesso a api a atualizo
  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8
  }
}
