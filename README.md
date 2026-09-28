# Nanda Trufas — cardápio e montagem visual

Projeto em HTML, CSS e JavaScript com Vite. Inclui 37 opções, fotografias locais, ilustrações de sabores, montagem por camadas e resumo para WhatsApp.

## Executar e editar

Requer Node.js 22 LTS e npm.

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite (porta 3000). Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Google AI Studio

Importe este repositório quando a opção de importação do GitHub estiver disponível na sua conta. A raiz do projeto é a pasta que contém `package.json`. O comando de desenvolvimento é `npm run dev`, na porta 3000.

O projeto está em JavaScript com Vite; não precisa de Gemini, chave de API ou banco de dados para funcionar. O suporte de importação depende das opções disponíveis no AI Studio. Se o ambiente propuser recriar o projeto, use o código existente como base e preserve os arquivos de imagens.

Prompt sugerido para começar:

> Este é o projeto existente da Nanda Trufas em HTML, CSS e JavaScript com Vite. Execute npm install e npm run dev. Preserve as 37 opções, preços, regras de recheio, fotos locais, montagem visual, navegação por hash e resumo para WhatsApp. Faça apenas as alterações solicitadas, sem substituir o site por um novo template. As imagens ficam em public/assets e devem continuar incluídas no projeto. Valide npm run build após editar.

## Publicar na Vercel

1. Importe `luizmk7/cake` na Vercel.
2. Use a raiz do repositório como Root Directory.
3. Framework Preset: **Vite**.
4. Build Command: **npm run build**.
5. Output Directory: **dist**.
6. Install Command: **npm install** (ou `npm ci`).

O arquivo `vercel.json` já define framework, build e saída. Todas as imagens estão em `public/assets`; o build as copia para `dist/assets`. Não envie apenas `src` ou `index.html`. Nenhuma variável de ambiente é necessária.

## Onde alterar

- `index.html`: estrutura, apresentação, dúvidas e campos do pedido.
- `src/main.js`: catálogo, valores, modelos, regras, montagem e mensagem do pedido.
- `src/styles.css`: estilos da base.
- `src/menu.css`: cardápio, montagem e ajustes para celular.
- `public/assets`: fotografias e componentes ilustrativos.

Busque `catalog`, `models`, `extras` e `composeMessage` em `src/main.js` para encontrar os principais dados.

## Antes de divulgar

Confira o número do WhatsApp herdado do projeto em `index.html` e `src/main.js`, além dos preços, porções e condições comerciais. O envio abre uma mensagem para o cliente revisar no WhatsApp; não confirma pedidos automaticamente. Não há painel administrativo ou armazenamento de pedidos.

A montagem é uma composição de imagens com aparência 3D, não um modelo 3D giratório. Texturas e proporções são ilustrativas. Tortas e bolos vulcão têm imagens geradas, identificadas como ilustrativas. Fotos de trabalhos reais estão preservadas. Decoração, disponibilidade, entrega e pagamento são confirmados no atendimento.
