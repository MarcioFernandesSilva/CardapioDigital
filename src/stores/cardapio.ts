import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'

export interface Item {
  id: number
  nome: string
  preco: number
  descricao?: string
  categoria: 'prato' | 'bebida' | 'sobremesa' | 'ingrediente'
  disponivel: boolean
  imagem?: string
}

export interface PratoMontavel {
  id: number
  nome: string
  ingredientes: Item[]
  precoBase: number
  disponivel: boolean
}

export interface PratoFixo {
  id: number
  nome: string
  descricao?: string
  preco: number
  ingredientes: Item[]
  opcoes: {
    carne?: Item[]
    salada?: Item[]
    molho?: Item[]
  }
  disponivel: boolean
  imagem?: string
}

export const useCardapioStore = defineStore(
  'cardapio',
  () => {
    // Estado
    const pratosFixos = ref<PratoFixo[]>([
      {
        id: 1,
        nome: 'X-Burger Clássico',
        descricao: 'Hambúrguer com queijo, alface, tomate e molho especial',
        preco: 25.90,
        ingredientes: [],
        opcoes: {
          carne: [
            { id: 1, nome: 'Carne de Boi', preco: 0, descricao: 'Carne bovina grelhada', categoria: 'ingrediente', disponivel: true },
            { id: 2, nome: 'Frango', preco: 2.00, descricao: 'Peito de frango grelhado', categoria: 'ingrediente', disponivel: true }
          ],
          salada: [
            { id: 3, nome: 'Alface', preco: 0, descricao: 'Alface fresca', categoria: 'ingrediente', disponivel: true },
            { id: 4, nome: 'Tomate', preco: 0, descricao: 'Tomate fresco', categoria: 'ingrediente', disponivel: true },
            { id: 5, nome: 'Cebola', preco: 0, descricao: 'Cebola roxa', categoria: 'ingrediente', disponivel: true }
          ]
        },
        disponivel: true,
        imagem: '/img/x-burger.jpg'
      },
      {
        id: 2,
        nome: 'X-Salada Premium',
        descricao: 'Hambúrguer com queijo, bacon, alface, tomate, cebola e molho especial',
        preco: 32.90,
        ingredientes: [],
        opcoes: {
          carne: [
            { id: 1, nome: 'Carne de Boi', preco: 0, descricao: 'Carne bovina grelhada', categoria: 'ingrediente', disponivel: true },
            { id: 2, nome: 'Frango', preco: 2.00, descricao: 'Peito de frango grelhado', categoria: 'ingrediente', disponivel: true }
          ],
          salada: [
            { id: 3, nome: 'Alface', preco: 0, descricao: 'Alface fresca', categoria: 'ingrediente', disponivel: true },
            { id: 4, nome: 'Tomate', preco: 0, descricao: 'Tomate fresco', categoria: 'ingrediente', disponivel: true },
            { id: 5, nome: 'Cebola', preco: 0, descricao: 'Cebola roxa', categoria: 'ingrediente', disponivel: true }
          ]
        },
        disponivel: true,
        imagem: '/img/x-salada.jpg'
      }
    ])

    const pratosMontaveis = ref<PratoMontavel[]>([
      {
        id: 1,
        nome: 'Monte Seu Hambúrguer',
        ingredientes: [
          { id: 6, nome: 'Pão de Hambúrguer', preco: 3.00, descricao: 'Pão artesanal', categoria: 'ingrediente', disponivel: true },
          { id: 7, nome: 'Carne de Boi', preco: 8.00, descricao: 'Carne bovina grelhada', categoria: 'ingrediente', disponivel: true },
          { id: 8, nome: 'Queijo Cheddar', preco: 2.50, descricao: 'Queijo cheddar derretido', categoria: 'ingrediente', disponivel: true },
          { id: 9, nome: 'Bacon', preco: 4.00, descricao: 'Bacon crocante', categoria: 'ingrediente', disponivel: true },
          { id: 10, nome: 'Alface', preco: 1.00, descricao: 'Alface fresca', categoria: 'ingrediente', disponivel: true },
          { id: 11, nome: 'Tomate', preco: 1.00, descricao: 'Tomate fresco', categoria: 'ingrediente', disponivel: true },
          { id: 12, nome: 'Cebola', preco: 1.00, descricao: 'Cebola roxa', categoria: 'ingrediente', disponivel: true }
        ],
        precoBase: 0,
        disponivel: true
      }
    ])

    const bebidas = ref<Item[]>([
      { id: 13, nome: 'Refrigerante Cola', preco: 6.00, descricao: 'Refrigerante cola 350ml', categoria: 'bebida', disponivel: true },
      { id: 14, nome: 'Suco Natural', preco: 8.00, descricao: 'Suco natural de laranja 300ml', categoria: 'bebida', disponivel: true },
      { id: 15, nome: 'Água', preco: 3.00, descricao: 'Água mineral 500ml', categoria: 'bebida', disponivel: true }
    ])

    const sobremesas = ref<Item[]>([
      { id: 16, nome: 'Sorvete', preco: 8.00, descricao: 'Sorvete de creme com calda', categoria: 'sobremesa', disponivel: true },
      { id: 17, nome: 'Pudim', preco: 6.00, descricao: 'Pudim de leite condensado', categoria: 'sobremesa', disponivel: true }
    ])

    const ingredientes = ref<Item[]>([
      { id: 18, nome: 'Pão de Hambúrguer', preco: 3.00, descricao: 'Pão artesanal', categoria: 'ingrediente', disponivel: true },
      { id: 19, nome: 'Carne de Boi', preco: 8.00, descricao: 'Carne bovina grelhada', categoria: 'ingrediente', disponivel: true },
      { id: 20, nome: 'Queijo Cheddar', preco: 2.50, descricao: 'Queijo cheddar derretido', categoria: 'ingrediente', disponivel: true },
      { id: 21, nome: 'Bacon', preco: 4.00, descricao: 'Bacon crocante', categoria: 'ingrediente', disponivel: true },
      { id: 22, nome: 'Alface', preco: 1.00, descricao: 'Alface fresca', categoria: 'ingrediente', disponivel: true },
      { id: 23, nome: 'Tomate', preco: 1.00, descricao: 'Tomate fresco', categoria: 'ingrediente', disponivel: true },
      { id: 24, nome: 'Cebola', preco: 1.00, descricao: 'Cebola roxa', categoria: 'ingrediente', disponivel: true }
    ])

    // Getters
    const getPratosFixosDisponiveis = computed(() => 
      pratosFixos.value.filter(prato => prato.disponivel)
    )

    const getPratosMontaveisDisponiveis = computed(() => 
      pratosMontaveis.value.filter(prato => prato.disponivel)
    )

    const getBebidasDisponiveis = computed(() => 
      bebidas.value.filter(bebida => bebida.disponivel)
    )

    const getSobremesasDisponiveis = computed(() => 
      sobremesas.value.filter(sobremesa => sobremesa.disponivel)
    )

    const getIngredientesDisponiveis = computed(() => 
      ingredientes.value.filter(ingrediente => ingrediente.disponivel)
    )

    // Actions
    const adicionarPratoFixo = (prato: PratoFixo) => {
      pratosFixos.value.push(prato)
    }

    const atualizarPratoFixo = (id: number, prato: Partial<PratoFixo>) => {
      const index = pratosFixos.value.findIndex(p => p.id === id)
      if (index !== -1) {
        pratosFixos.value[index] = { ...pratosFixos.value[index], ...prato }
      }
    }

    const removerPratoFixo = (id: number) => {
      const index = pratosFixos.value.findIndex(p => p.id === id)
      if (index !== -1) {
        pratosFixos.value.splice(index, 1)
      }
    }

    const removerItem = (categoria: 'bebida' | 'sobremesa', id: number) => {
      let array: Ref<Item[]> | null = null
      if (categoria === 'bebida') {
        array = bebidas
      } else if (categoria === 'sobremesa') {
        array = sobremesas
      }

      if (array) {
        const index = array.value.findIndex(item => item.id === id)
        if (index !== -1) {
          array.value.splice(index, 1)
        }
      }
    }

    const removerIngrediente = (id: number) => {
      const index = ingredientes.value.findIndex(ingrediente => ingrediente.id === id)
      if (index !== -1) {
        ingredientes.value.splice(index, 1)
      }
    }

    const adicionarItem = (item: Item) => {
      // Validações básicas
      if (!item.nome || item.nome.trim().length < 2) {
        throw new Error('Nome do item deve ter pelo menos 2 caracteres')
      }
      
      if (item.preco < 0 || item.preco > 1000) {
        throw new Error('Preço deve estar entre R$ 0,00 e R$ 1.000,00')
      }
      
      // Verificar se já existe um item com o mesmo nome
      const itemExistente = [...bebidas.value, ...sobremesas.value, ...ingredientes.value]
        .find(i => i.nome.toLowerCase() === item.nome.toLowerCase())
      
      if (itemExistente) {
        throw new Error('Já existe um item com este nome')
      }
      
      switch (item.categoria) {
        case 'bebida':
          bebidas.value.push(item)
          break
        case 'sobremesa':
          sobremesas.value.push(item)
          break
        case 'ingrediente':
          ingredientes.value.push(item)
          break
      }
    }

    const atualizarItem = (id: number, item: Partial<Item>) => {
      // Atualizar em todas as categorias
      const atualizarEmArray = (array: Item[]) => {
        const index = array.findIndex(i => i.id === id)
        if (index !== -1) {
          array[index] = { ...array[index], ...item }
        }
      }

      atualizarEmArray(bebidas.value)
      atualizarEmArray(sobremesas.value)
      atualizarEmArray(ingredientes.value)
      
      // Atualizar em pratos montáveis
      pratosMontaveis.value.forEach(prato => {
        atualizarEmArray(prato.ingredientes)
      })

      // Atualizar em pratos fixos
      pratosFixos.value.forEach(prato => {
        Object.values(prato.opcoes).forEach(opcoes => {
          if (Array.isArray(opcoes)) {
            atualizarEmArray(opcoes)
          }
        })
      })
    }

    return {
      // Estado
      pratosFixos,
      pratosMontaveis,
      bebidas,
      sobremesas,
      ingredientes,
      
      // Getters
      getPratosFixosDisponiveis,
      getPratosMontaveisDisponiveis,
      getBebidasDisponiveis,
      getSobremesasDisponiveis,
      getIngredientesDisponiveis,
      
      // Actions
      adicionarPratoFixo,
      atualizarPratoFixo,
      removerPratoFixo,
      removerItem,
      removerIngrediente,
      adicionarItem,
      atualizarItem
    }
  },
  {
    persist: {
      key: 'cardapio-store',
      storage: localStorage
    }
  }
) 