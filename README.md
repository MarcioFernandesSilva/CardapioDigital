# 🍔 Cardápio Digital

Sistema de cardápio digital para restaurantes com funcionalidades avançadas de carrinho, personalização e integração com WhatsApp.

## ✨ Funcionalidades

- 📱 **PWA (Progressive Web App)** - Instala como app no celular
- 🛒 **Carrinho inteligente** - Consolida itens idênticos automaticamente
- 🎨 **Personalização completa** - Cores, logo, horários
- 📋 **Gestão de cardápio** - Pratos fixos, montáveis, bebidas, sobremesas
- 💬 **Integração WhatsApp** - Envio automático de pedidos
- 🔒 **Área administrativa** - Senha protegida
- 💾 **Persistência local** - Dados salvos no navegador

## 🚀 Deploy

### GitHub Pages
1. Faça push do projeto para o GitHub
2. Vá em Settings > Pages
3. Selecione "Deploy from a branch"
4. Escolha a branch `main` e pasta `/docs`
5. Acesse: `https://seuusuario.github.io/nome-do-repo`

### Vercel (Recomendado)
1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Deploy automático a cada push
3. URL: `https://nome-do-projeto.vercel.app`

## 📱 Como usar no celular

### Opção 1: PWA (Recomendado)
1. Acesse o site no navegador do celular
2. Toque em "Adicionar à tela inicial"
3. O app será instalado como aplicativo nativo

### Opção 2: Navegador
1. Acesse diretamente pelo navegador
2. Funciona em qualquer dispositivo

## 🛠️ Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seuusuario/restaurante-cardapio.git

# Entre na pasta
cd restaurante-cardapio

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔧 Configuração

### Senha do Admin
- **Padrão**: `admin123`
- **Alterar**: Acesse `/admin` e vá na aba "Segurança"

### Personalização
- **Cores**: Personalize cores primária, secundária e fundo
- **Logo**: Faça upload da logo do restaurante
- **Horários**: Configure horário de funcionamento
- **WhatsApp**: Adicione o número do WhatsApp

## 📊 Estrutura do Projeto

```
src/
├── components/          # Componentes Vue
├── stores/             # Stores Pinia
│   ├── admin.ts        # Configurações e autenticação
│   ├── cardapio.ts     # Gestão do cardápio
│   └── carrinho.ts     # Carrinho de compras
├── views/              # Páginas
│   ├── HomeView.vue    # Cardápio principal
│   ├── AdminView.vue   # Área administrativa
│   └── LoginView.vue   # Login admin
├── router/             # Configuração de rotas
└── utils/              # Utilitários
```

## 🎯 Tecnologias

- **Vue 3** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vuetify 3** - UI Framework
- **Pinia** - Gerenciamento de estado
- **Vite** - Build tool
- **PWA** - Progressive Web App

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, envie um email para seu-email@exemplo.com ou abra uma issue no GitHub.

---

**Desenvolvido com ❤️ para restaurantes**

<!-- Trigger Vercel Deploy -->
