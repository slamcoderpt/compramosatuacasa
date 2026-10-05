// Recebe os pedidos do formulário e grava-os na base de dados "Leads" do Notion.
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   NOTION_TOKEN        token da integração interna do Notion
//   NOTION_DATABASE_ID  ID da base de dados de leads

const TIPOS = ["Apartamento", "Moradia", "Prédio", "Terreno", "Loja / Espaço comercial", "Outro"];
const PHONE_RE = /^\+?[0-9\s]{9,15}$/;

function clean(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max);
}

function text(content) {
  return { rich_text: content ? [{ text: { content } }] : [] };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};

  // Campo escondido: só os bots o preenchem. Fingimos sucesso e não gravamos nada.
  if (clean(body.empresa, 200)) {
    return res.status(200).json({ ok: true });
  }

  const nome = clean(body.nome, 120);
  const telefone = clean(body.telefone, 20);
  const localizacao = clean(body.localizacao, 200);
  const tipo = TIPOS.includes(body.tipo) ? body.tipo : "Outro";
  const origem = clean(body.origem, 300);

  if (!nome || !localizacao || !PHONE_RE.test(telefone)) {
    return res.status(400).json({ ok: false, error: "invalid_fields" });
  }

  const { NOTION_TOKEN, NOTION_DATABASE_ID } = process.env;
  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    console.error("lead: NOTION_TOKEN ou NOTION_DATABASE_ID não definidos");
    return res.status(500).json({ ok: false, error: "not_configured" });
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          "Nome": { title: [{ text: { content: nome } }] },
          "Telefone": { phone_number: telefone },
          "Localização": text(localizacao),
          "Tipo de imóvel": { select: { name: tipo } },
          "Estado": { select: { name: "Novo" } },
          "Origem": text(origem)
        }
      })
    });

    if (!response.ok) {
      console.error("lead: Notion respondeu", response.status, await response.text());
      return res.status(502).json({ ok: false, error: "storage_failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("lead: erro ao contactar o Notion", err);
    return res.status(502).json({ ok: false, error: "storage_failed" });
  }
};

function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}
