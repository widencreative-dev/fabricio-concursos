# Fabrício Concursos

Site de vendas (página única) do Fabrício Concursos: HTML estático puro,
sem etapa de build. Igual à estrutura dos outros sites do projeto: um
`index.html` e uma pasta `assets/`.

## Estrutura

```
index.html    Site inteiro (todas as seções, estilos e scripts)
assets/
  logo.png            Logotipo usado no cabeçalho e rodapé
  fabricio-hero.png   Foto do orientador usada no hero e na seção "Quem orienta"
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

## Acessibilidade e performance

- Scroll suave (Lenis), rolagem do mural de depoimentos e flutuação dos
  selos do hero respeitam `prefers-reduced-motion` (usuários que pedem menos
  movimento no sistema não veem essas animações).
- A faixa de palavras-chave abaixo do hero é a única animação que roda
  sempre, por ser puramente decorativa.
- Menu mobile, acordeão de perguntas frequentes e pausa do mural de
  depoimentos são operáveis via teclado e usam atributos ARIA
  (`aria-expanded`, `aria-pressed`, `aria-label`).
