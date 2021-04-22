import { GetStaticProps } from 'next';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  description: string,
  duration: number,
  durationAsString: string,
  url: string,
  publishedAt: string
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

  //A formatação dos dados deve ocorer antes de eles chegarem no componente
  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })

  //Uma versão estática vai ser cacheada e a cada 8 horas eu faço um novo acesso a api a atualizo
  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8
  }
}
