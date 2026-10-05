# compramosatuacasa.pt

Landing page estática (HTML + CSS + JS, sem dependências nem build).

## Estrutura

```
index.html            Página
api/lead.js           Função que grava os pedidos do formulário no Notion
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

## Formulário → Notion

O formulário envia os pedidos para `api/lead.js` (função da Vercel), que cria uma linha
na base de dados **"Leads — compramosatuacasa.pt"** do Notion com nome, telefone,
localização, tipo de imóvel, estado (`Novo`) e origem da visita (parâmetros UTM ou site de origem).

Variáveis de ambiente na Vercel (**Settings → Environment Variables**):

- `NOTION_DATABASE_ID` — ID da base de dados de leads.
- `NOTION_TOKEN` — token da integração interna do Notion (marcar como *Sensitive*).

Configurar a integração:

1. Em https://www.notion.so/profile/integrations, criar uma integração **interna** no workspace
   e copiar o *Internal Integration Secret*.
2. Na base de dados de leads: **⋯ → Connections → adicionar** a integração.
3. Pôr o secret em `NOTION_TOKEN` na Vercel e fazer *Redeploy*.

O formulário tem um campo escondido (`empresa`) contra bots: pedidos com esse campo preenchido
são ignorados.

## Imagens

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
