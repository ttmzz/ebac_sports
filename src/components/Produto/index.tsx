import { useDispatch, useSelector } from 'react-redux' // 1. IMPORTANTE: Adicionados para interagir com o Redux
import { RootState } from '../../store'
import { adicionar, favoritar } from '../../store/reducers/carrinho' // 2. IMPORTANTE: Importa as actions que criamos

import { Produto as ProdutoType } from '../../App'
import * as S from './styles'

// 3. ALTERAÇÃO: Props reduzidas. Não precisamos mais passar funções ou booleans do pai
type Props = {
  produto: ProdutoType
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useDispatch()

  // 4. ALTERAÇÃO: O próprio componente agora descobre se está nos favoritos checando a store
  const favoritos = useSelector((state: RootState) => state.carrinho.favoritos)
  const estaNosFavoritos = favoritos.some((p) => p.id === produto.id)

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>

      {/* 5. ALTERAÇÃO: Dispara a action 'favoritar' ao clicar */}
      <S.BtnComprar onClick={() => dispatch(favoritar(produto))} type="button">
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>

      {/* 6. ALTERAÇÃO: Dispara a action 'adicionar' ao clicar */}
      <S.BtnComprar onClick={() => dispatch(adicionar(produto))} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
