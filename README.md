# Fabrício Concursos

Site de vendas (página única) do Fabrício Concursos: HTML estático puro,
sem etapa de build. Igual à estrutura dos outros sites do projeto: um
`index.html` e uma pasta `assets/`.

## Estrutura

```
index.html                        Site inteiro (todas as seções, estilos e scripts)
ebook-analise-edital-sefaz-es.html  Landing do guia estratégico da SEFAZ-ES (captura + link do Drive)
assets/
  logo.png                        Logotipo usado no cabeçalho e rodapé
  logo com a ls.png               Logotipo em parceria com a LS Concursos
  foto-fabricio-.png              Foto usada na seção "Quem orienta"
  ebook-capa-sefaz-es.png         Capa do guia estratégico (landing do e-book)
  *.webp                          Versões leves dos PNGs acima, servidas por
                                  <picture>; os PNGs ficam como reserva
  styles.css                      Estilos próprios, fora do Tailwind
  tailwind-config.js              Paleta e fontes da marca
  fabricio-hero.jpg               Foto do hero, master 2880x1620 (desktop 2x)
  fabricio-hero-1440.jpg          Hero desktop 1x
  fabricio-hero-mobile.jpg        Hero mobile, recorte 4:5 (2x)
  fabricio-hero-mobile-648.jpg    Hero mobile 1x
```

Os `.webp` foram gerados a partir dos PNGs com o ffmpeg e são o que o
navegador realmente baixa (o PNG só é usado por navegador sem suporte a
WebP). Para regerar depois de trocar uma arte, rode a partir desta pasta:

```bash
ffmpeg -i "assets/foto-fabricio-.png"      -vf scale=720:-1 -c:v libwebp -q:v 82 assets/foto-fabricio.webp
ffmpeg -i "assets/logo.png"                -vf scale=364:-1 -c:v libwebp -q:v 88 assets/logo.webp
ffmpeg -i "assets/logo com a ls.png"       -vf scale=457:-1 -c:v libwebp -q:v 88 assets/logo-com-ls.webp
ffmpeg -i "assets/ebook-capa-sefaz-es.png" -vf scale=840:-1 -c:v libwebp -q:v 74 assets/ebook-capa-sefaz-es.webp
```

## Como rodar localmente

Como é HTML puro, basta abrir o `index.html` no navegador. Para testar com
um servidor local (recomendado, evita bloqueios de CORS em alguns
navegadores), rode a partir desta pasta:

```bash
npx serve .
```

ou, se preferir outra ferramenta:

```bash
npx http-server .
```

## Tecnologias usadas (via CDN, sem instalação)

- [Tailwind CSS](https://tailwindcss.com) (script CDN, com a paleta da marca
  configurada diretamente no `<head>` do `index.html`)
- [Lenis](https://github.com/darkroomengineering/lenis) para o scroll suave
- [Google Fonts](https://fonts.google.com) (Inter e Lexend)
- [Formspree](https://formspree.io) para o formulário de contato

## Editando conteúdo

Todo o conteúdo do site está diretamente no `index.html`, organizado em
seções comentadas (`<!-- ===== NOME DA SECAO ===== -->`). Para editar um
texto, procure a seção correspondente e altere o HTML diretamente.

### Configurações centrais (WhatsApp, e-mail, redes sociais)

Logo no início do `<body>`, há um bloco `window.SITE_CONFIG` com os dados
de contato usados no site inteiro:

```html
window.SITE_CONFIG = {
  whatsappNumber: "5527997866811",
  whatsappMensagemPadrao: "...",
  email: "contato@fabricioconcursos.com.br",
  instagram: "...",
  youtube: "...",
  tiktok: "...",
};
```

Atualize esses valores e todos os links de WhatsApp, e-mail e redes sociais
do site são atualizados automaticamente (o script no final do arquivo
preenche todos os elementos com a classe `wa-link`).

### Depoimentos e números de prova social

Os depoimentos (seção "O que dizem os alunos acompanhados") e os números
("[N]" alunos atendidos, etc.) estão marcados com **placeholders entre
colchetes**. Substitua pelo conteúdo real diretamente no HTML antes de
publicar o site.

### Formulário de contato (Formspree)

O formulário já está pronto, faltando só o ID do Formspree:

1. Crie uma conta gratuita em [formspree.io](https://formspree.io) e um novo
   formulário.
2. No `index.html`, localize `action="https://formspree.io/f/SEU_FORM_ID_AQUI"`
   (dentro da seção `#contato`) e troque `SEU_FORM_ID_AQUI` pelo ID
   fornecido pelo Formspree.

Enquanto o ID não for trocado, o formulário mostra uma mensagem de erro ao
ser enviado (comportamento esperado, não é um bug).

## Deploy

Por ser HTML estático, pode ser hospedado em qualquer lugar sem
configuração de servidor: Vercel, Netlify, GitHub Pages, Cloudflare Pages ou
qualquer hospedagem compartilhada tradicional. Basta enviar o `index.html`
e a pasta `assets/`.

## Versão mobile

O site é feito "mobile first" no sentido prático: o layout do celular tem
decisões próprias, não é só o desktop espremido.

- **Hero.** No desktop a foto é fundo de tela cheia com selos de vidro
  flutuando sobre ela. No celular isso não cabe, então a foto vem logo
  abaixo do texto, de ponta a ponta, com um degradê que funde o roxo do
  estúdio no fundo escuro da seção, os mesmos selos de vidro sobrepostos e
  uma faixa com os números de prova social. O título usa `clamp()` para
  acompanhar a largura da tela.
- **Botões.** O rótulo do CTA pode quebrar em duas linhas no celular
  (`.flow-text` perde o `white-space: nowrap` abaixo de 640px) e as setas
  animadas somem, porque a animação que as desliza depende de hover.
- **Hover no toque.** Todo estado de hover está atrás de `@media (hover:
  hover)`, inclusive os utilitários `hover:` do Tailwind (flag
  `hoverOnlyWhenSupported` em `tailwind-config.js`). Sem isso, no celular o
  card tocado fica preso no estado de hover.
- **Abas do FAQ.** Viram uma tira que rola na horizontal com encaixe, em vez
  de cinco pílulas empilhadas ocupando meia tela. A tabela comparativa rola
  do mesmo jeito e avisa disso.
- **Mural de depoimentos.** No celular roda bem mais devagar (uma coluna só)
  e tem botão de pausar, já que não existe hover para pausar no toque.
- **Texto.** O alinhamento justificado só vale do breakpoint `md` para
  cima: em coluna estreita ele abre buracos entre as palavras. Campos de
  formulário usam 16px para o iOS não dar zoom ao focar.

## Acessibilidade e performance

- Scroll suave (Lenis), rolagem do mural de depoimentos e flutuação dos
  selos do hero respeitam `prefers-reduced-motion` (usuários que pedem menos
  movimento no sistema não veem essas animações).
- A faixa de palavras-chave abaixo do hero é a única animação que roda
  sempre, por ser puramente decorativa.
- Menu mobile, acordeão de perguntas frequentes e pausa do mural de
  depoimentos são operáveis via teclado e usam atributos ARIA
  (`aria-expanded`, `aria-pressed`, `aria-label`).
- As imagens pesadas são servidas em WebP por `<picture>`, com `width` e
  `height` declarados para a página não pular enquanto carrega, e as que
  ficam abaixo da dobra usam `loading="lazy"`.
