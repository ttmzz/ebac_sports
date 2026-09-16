import { useSelector } from 'react-redux' // 1. IMPORTANTE: Adicionado para ler a store
import { RootState } from '../../store' // 2. IMPORTANTE: Importa o tipo do estado global

import * as S from './styles'
import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'

// 3. ALTERAÇÃO: A tipagem Props foi removida pois o App.tsx não passa mais nada por aqui.

const Header = () => {
  // 4. ALTERAÇÃO: Buscando os dados direto do Redux em vez de receber por parâmetro
  const itensNoCarrinho = useSelector(
    (state: RootState) => state.carrinho.itens
  )
  const favoritos = useSelector((state: RootState) => state.carrinho.favoritos)

  const valorTotal = itensNoCarrinho.reduce((acc, item) => {
    acc += item.preco
    return acc
  }, 0)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        {/* O restante do seu HTML permanece exatamente igual, pois as variáveis mantêm os mesmos nomes */}
        <span>{favoritos.length} favoritos</span>
        <img src={cesta} />
        <span>
          {itensNoCarrinho.length} itens, valor total: {paraReal(valorTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
