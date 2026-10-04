# compramosatuacasa.pt

Landing page estática (HTML + CSS + JS, sem dependências nem build).

## Estrutura

```
index.html            Página
assets/css/styles.css Estilos (desktop-first; breakpoints em 1140, 1080, 960, 640 e 420px)
assets/js/main.js     Menu móvel e formulário de proposta
assets/img/           Imagens
```

## Correr localmente

Abrir `index.html` no browser, ou servir a pasta:

```
npx serve .
```

## Formulário

O formulário valida os campos no browser. Para enviar os pedidos para um backend,
preencher o atributo `data-endpoint` do `<form id="lead-form">` com o URL — os dados
são enviados por `POST` em JSON (`localizacao`, `tipo`, `nome`, `telefone`).
Sem endpoint, é apenas mostrada a mensagem de sucesso.

## Imagens

As imagens em `assets/img/` (`hero.jpg`, `antes.jpg`, `depois.jpg`, `cta-lisboa.jpg`,
`avatar-*.jpg`) são provisórias, recortadas do mockup em baixa resolução.
Substituir pelos originais mantendo os mesmos nomes.
