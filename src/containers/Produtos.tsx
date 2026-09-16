import { useGetProdutosQuery } from '../services/api' // 1. IMPORTANTE: Hook do RTK Query para carregar os dados
import Produto from '../components/Produto'
import * as S from './styles'

// 2. ALTERAÇÃO: A tipagem Props foi 100% removida, pois nenhum dado vem mais do App.tsx

const ProdutosComponent = () => {
  // 3. ALTERAÇÃO: O RTK Query gerencia o carregamento, erros e dados da API sozinho
  const { data: produtos, isLoading, error } = useGetProdutosQuery()

  // 4. ALTERAÇÃO: A função 'produtoEstaNosFavoritos' foi removida daqui,
  // pois o componente individual <Produto /> agora faz essa checagem sozinho.

  if (isLoading) return <h2>Carregando produtos...</h2>
  if (error) return <h2>Ocorreu um erro ao carregar os produtos.</h2>

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            key={produto.id}
            produto={produto}
            //
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
