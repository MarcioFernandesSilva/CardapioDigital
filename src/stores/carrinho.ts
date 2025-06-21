import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Item, PratoFixo } from './cardapio'

export interface ItemCarrinho {
  id: string
  nome: string
  preco: number
  quantidade: number
  tipo: 'prato-fixo' | 'prato-montavel' | 'item'
  modificacoes?: {
    carne?: string
    salada?: string[]
    ingredientes?: string[]
  }
  observacoes?: string
}

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref<ItemCarrinho[]>([])
  const endereco = ref('')
  const telefone = ref('')
  const nome = ref('')

  // Proteções contra spam
  const MAX_ITENS_CARRINHO = 50
  const MAX_QUANTIDADE_ITEM = 20
  const MIN_VALOR_PEDIDO = 5.00 // Pedido mínimo de R$ 5,00

  // Getters
  const totalItens = computed(() => 
    itens.value.reduce((total, item) => total + item.quantidade, 0)
  )

  const totalPreco = computed(() => 
    itens.value.reduce((total, item) => total + (item.preco * item.quantidade), 0)
  )

  const carrinhoVazio = computed(() => itens.value.length === 0)

  const pedidoValido = computed(() => {
    return totalPreco.value >= MIN_VALOR_PEDIDO && 
           totalItens.value <= MAX_ITENS_CARRINHO &&
           nome.value.trim().length >= 2 &&
           telefone.value.trim().length >= 10 &&
           endereco.value.trim().length >= 10
  })

  // Função para verificar se dois itens são idênticos
  const itensSaoIdenticos = (item1: ItemCarrinho, item2: ItemCarrinho): boolean => {
    // Verificar se são do mesmo tipo e têm o mesmo nome
    if (item1.tipo !== item2.tipo || item1.nome !== item2.nome) {
      return false
    }

    // Verificar modificações (carne, salada, ingredientes)
    const mod1 = item1.modificacoes || {}
    const mod2 = item2.modificacoes || {}

    // Verificar carne
    if (mod1.carne !== mod2.carne) {
      return false
    }

    // Verificar salada (array ordenado para comparação)
    const salada1 = mod1.salada ? [...mod1.salada].sort() : []
    const salada2 = mod2.salada ? [...mod2.salada].sort() : []
    if (salada1.length !== salada2.length || !salada1.every((s, i) => s === salada2[i])) {
      return false
    }

    // Verificar ingredientes (array ordenado para comparação)
    const ingredientes1 = mod1.ingredientes ? [...mod1.ingredientes].sort() : []
    const ingredientes2 = mod2.ingredientes ? [...mod2.ingredientes].sort() : []
    if (ingredientes1.length !== ingredientes2.length || !ingredientes1.every((s, i) => s === ingredientes2[i])) {
      return false
    }

    // Verificar observações
    if (item1.observacoes !== item2.observacoes) {
      return false
    }

    return true
  }

  // Função para consolidar itens idênticos
  const consolidarItensIdenticos = () => {
    const itensConsolidados: ItemCarrinho[] = []
    
    itens.value.forEach(item => {
      const itemExistente = itensConsolidados.find(existente => itensSaoIdenticos(existente, item))
      
      if (itemExistente) {
        // Se encontrou item idêntico, aumenta a quantidade
        itemExistente.quantidade += item.quantidade
      } else {
        // Se não encontrou, adiciona como novo item
        itensConsolidados.push({ ...item })
      }
    })
    
    itens.value = itensConsolidados
  }

  // Actions
  const adicionarPratoFixo = (prato: PratoFixo, precoFinal: number, modificacoes: any, observacoes?: string) => {
    const itemCarrinho = {
      id: `prato-fixo-${Date.now()}-${Math.random()}`,
      nome: prato.nome,
      preco: precoFinal,
      quantidade: 1,
      tipo: 'prato-fixo' as const,
      modificacoes: modificacoes,
      observacoes: observacoes,
    };
    
    itens.value.push(itemCarrinho);
    consolidarItensIdenticos();
  }

  const atualizarItem = (itemId: string, atualizacoes: Partial<ItemCarrinho>) => {
    const index = itens.value.findIndex(item => item.id === itemId);
    if (index !== -1) {
      // Para evitar bugs de reatividade, substituímos o objeto
      const itemAtualizado = {
        ...itens.value[index],
        ...atualizacoes,
      };
      itens.value.splice(index, 1, itemAtualizado);
      
      // Após atualizar, consolidar itens idênticos
      consolidarItensIdenticos();
    }
  }

  const adicionarPratoMontavel = (precoFinal: number, ingredientesNomes: string[], observacoes?: string) => {
    // Proteção contra spam
    if (itens.value.length >= MAX_ITENS_CARRINHO) {
      throw new Error(`Limite máximo de ${MAX_ITENS_CARRINHO} itens no carrinho atingido`)
    }

    const id = `prato-montavel-${Date.now()}-${Math.random()}`

    const item: ItemCarrinho = {
      id,
      nome: 'Prato Personalizado',
      preco: precoFinal,
      quantidade: 1,
      tipo: 'prato-montavel',
      modificacoes: {
        ingredientes: ingredientesNomes
      },
      observacoes
    }

    itens.value.push(item)
    consolidarItensIdenticos();
  }

  const adicionarItem = (item: Item, observacoes?: string) => {
    // Proteção contra spam
    if (itens.value.length >= MAX_ITENS_CARRINHO) {
      throw new Error(`Limite máximo de ${MAX_ITENS_CARRINHO} itens no carrinho atingido`)
    }

    const id = `item-${item.id}-${Date.now()}-${Math.random()}`
    
    const itemCarrinho: ItemCarrinho = {
      id,
      nome: item.nome,
      preco: item.preco,
      quantidade: 1,
      tipo: 'item',
      observacoes
    }

    itens.value.push(itemCarrinho)
    consolidarItensIdenticos();
  }

  const aumentarQuantidade = (id: string) => {
    const item = itens.value.find(i => i.id === id)
    if (item) {
      if (item.quantidade >= MAX_QUANTIDADE_ITEM) {
        throw new Error(`Quantidade máxima de ${MAX_QUANTIDADE_ITEM} unidades por item`)
      }
      item.quantidade++
    }
  }

  const diminuirQuantidade = (id: string) => {
    const item = itens.value.find(i => i.id === id)
    if (item && item.quantidade > 1) {
      item.quantidade--
    } else if (item && item.quantidade === 1) {
      removerItem(id)
    }
  }

  const removerItem = (id: string) => {
    const index = itens.value.findIndex(i => i.id === id)
    if (index !== -1) {
      itens.value.splice(index, 1)
    }
  }

  const limparCarrinho = () => {
    itens.value = []
    endereco.value = ''
    telefone.value = ''
    nome.value = ''
  }

  const setEndereco = (novoEndereco: string) => {
    endereco.value = novoEndereco
  }

  const setTelefone = (novoTelefone: string) => {
    telefone.value = novoTelefone
  }

  const setNome = (novoNome: string) => {
    nome.value = novoNome
  }

  const gerarMensagemWhatsApp = () => {
    if (carrinhoVazio.value) return ''

    let mensagem = `🍔 *PEDIDO - ${nome.value}*\n\n`
    mensagem += `📱 *Telefone:* ${telefone.value}\n`
    mensagem += `📍 *Endereço:* ${endereco.value}\n\n`
    mensagem += `📋 *ITENS:*\n`

    itens.value.forEach(item => {
      mensagem += `• ${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`
      
      if (item.modificacoes?.carne) {
        mensagem += `  🥩 Carne: ${item.modificacoes.carne}\n`
      }
      
      if (item.modificacoes?.salada && item.modificacoes.salada.length > 0) {
        mensagem += `  🥬 Salada: ${item.modificacoes.salada.join(', ')}\n`
      }
      
      if (item.modificacoes?.ingredientes && item.modificacoes.ingredientes.length > 0) {
        mensagem += `  🧀 Ingredientes: ${item.modificacoes.ingredientes.join(', ')}\n`
      }
      
      if (item.observacoes) {
        mensagem += `  📝 Obs: ${item.observacoes}\n`
      }
      
      mensagem += '\n'
    })

    mensagem += `💰 *TOTAL: R$ ${totalPreco.value.toFixed(2)}*\n\n`
    mensagem += `⏰ *Horário do pedido:* ${new Date().toLocaleString('pt-BR')}`

    return encodeURIComponent(mensagem)
  }

  return {
    // Estado
    itens,
    endereco,
    telefone,
    nome,
    
    // Getters
    totalItens,
    totalPreco,
    carrinhoVazio,
    pedidoValido,
    
    // Actions
    adicionarPratoFixo,
    atualizarItem,
    adicionarPratoMontavel,
    adicionarItem,
    aumentarQuantidade,
    diminuirQuantidade,
    removerItem,
    limparCarrinho,
    setEndereco,
    setTelefone,
    setNome,
    gerarMensagemWhatsApp
  }
}, {
  persist: {
    key: 'carrinho-store',
    storage: localStorage
  }
}) 