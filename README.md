# Sorria Vida - site estático em React

Projeto enxugado para deploy estático via Vite.

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar build

```bash
npm run build
```

Os arquivos finais ficarão na pasta `dist`.

## Publicação no cPanel / subdomínio

1. Gere o build com `npm run build`.
2. Envie o conteúdo da pasta `dist` para a pasta raiz do subdomínio no cPanel.
3. Como o `vite.config.js` está com `base: './'`, os assets ficam com caminho relativo, o que ajuda no deploy em subdomínio.
