# Ícones PWA

Para que o PWA funcione corretamente, você precisa adicionar os seguintes ícones nesta pasta:

## Ícones Obrigatórios

1. **icon-192.png** (192x192 pixels)
2. **icon-512.png** (512x512 pixels)

## Como criar os ícones

### Opção 1: Online (Gratuito)
- Use [Favicon.io](https://favicon.io/favicon-converter/)
- Faça upload de uma imagem do seu logo
- Baixe os ícones PNG nas dimensões corretas

### Opção 2: Photoshop/GIMP
- Crie uma imagem quadrada
- Redimensione para 192x192 e 512x512
- Salve como PNG

### Opção 3: Ícone padrão
Se não tiver logo, use um ícone de restaurante:
- 🍔 Emoji de hambúrguer
- 🍕 Emoji de pizza
- 🍽️ Emoji de prato

## Estrutura final
```
public/img/
├── icon-192.png
├── icon-512.png
└── README.md
```

## Teste
Após adicionar os ícones, teste o PWA:
1. Abra o site no Chrome
2. Pressione F12 (DevTools)
3. Vá na aba "Application"
4. Verifique se os ícones aparecem em "Manifest" 