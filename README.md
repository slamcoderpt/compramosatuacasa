# compramosatuacasa.pt

Landing page estática (HTML + CSS + JS, sem dependências nem build).

## Estrutura

```
index.html            Página
404.html              Página de erro (servida pela Vercel em URLs inexistentes)
vercel.json           Configuração da Vercel (URLs limpos, headers de segurança e cache)
robots.txt            Indicações para motores de busca
sitemap.xml           Sitemap
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

As fotos dos testemunhos (`avatar-*.jpg`) são provisórias, recortadas do mockup em baixa resolução.
Substituir pelos originais mantendo os mesmos nomes.

`hero.jpg` (desktop) e `hero-mobile.jpg` (1100px, para ecrãs ≤960px) são a imagem final do hero; `cta-lisboa.jpg` e `cta-lisboa-mobile.jpg` (≤640px) a da faixa final.

`logo.png` e `logo-white.png` (versão para o rodapé escuro) foram gerados a partir
do logo original.

## Deploy na Vercel

Site estático, sem build.

1. Em vercel.com: **Add New → Project → Import** do repositório GitHub.
2. **Framework Preset:** `Other`. Deixar *Build Command* e *Output Directory* vazios.
3. **Deploy.** Cada push para o branch de produção faz um novo deploy.

## Domínio

1. No projeto na Vercel: **Settings → Domains**, adicionar `www.compramosatuacasa.pt`
   (domínio principal) e `compramosatuacasa.pt` (a redirecionar para o `www`).
2. No registo de DNS do domínio, criar os registos que a Vercel indicar. Normalmente:
   - `A` em `@` → `76.76.21.21`
   - `CNAME` em `www` → `cname.vercel-dns.com`
3. O certificado HTTPS é emitido automaticamente depois de o DNS propagar.

O domínio canónico (`https://www.compramosatuacasa.pt/`) está definido em `index.html`
(`canonical` e Open Graph), `robots.txt` e `sitemap.xml`. Se mudar, atualizar nesses ficheiros.
