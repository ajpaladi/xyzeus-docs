# MCP Server

Connect Agentic Earth to Claude Desktop, Cursor, Windsurf, and any MCP-compatible host — no code required. Once configured, you can ask geospatial questions directly inside your AI assistant and get live data back.

::: tip What is MCP?
Model Context Protocol (MCP) is an open standard that lets AI assistants call external tools. Connecting Agentic Earth means your AI host gets access to 150+ live geospatial datasets as native tools.
:::

---

## Install

The MCP server is included in the `agenticearth` package. Install with the `mcp` extra:

```bash
pip install "agenticearth[mcp]"
```

---

## Claude Desktop

### 1. Get your API key

Sign in at [agenticearth.app](https://agenticearth.app), click your avatar → **API Keys**, and copy your `ae_sk_...` key.

### 2. Edit the config

Open (or create) the Claude Desktop config file:

::: code-group
```bash [macOS]
~/Library/Application Support/Claude/claude_desktop_config.json
```
```bash [Windows]
%APPDATA%\Claude\claude_desktop_config.json
```
:::

Add the `mcpServers` block:

```json
{
  "mcpServers": {
    "agenticearth": {
      "command": "ae",
      "args": ["mcp"],
      "env": {
        "AE_API_KEY": "ae_sk_..."
      }
    }
  }
}
```

::: tip Full path
If `ae` isn't on Claude Desktop's PATH, use the full path to the binary. Find it with `which ae` in your terminal.
:::

### 3. Restart Claude Desktop

Fully quit (Cmd+Q / Alt+F4) and reopen. Agentic Earth will appear in the tools panel.

### 4. Try it

Open a new chat and ask:

> *"Show me conflict events in Ukraine over the last 30 days"*
> 
> *"What's the vessel traffic near the Strait of Hormuz right now?"*
>
> *"Fetch Sentinel-2 imagery for the Amazon and describe deforestation activity"*

---

## Cursor / Windsurf / VS Code

For other MCP hosts, the configuration is similar. Add a server entry pointing to `ae mcp` with your `AE_API_KEY` in the environment. Consult your host's MCP documentation for the exact config file location.

---

## Available tools

The MCP server exposes three tools to the host model:

| Tool | Description |
|------|-------------|
| `ae_query` | Natural language query — fetches data, runs analysis, returns answer + result keys |
| `ae_fetch` | Retrieve the GeoJSON for a result key returned by `ae_query` |
| `ae_balance` | Check your remaining credit balance |

---

## How it works

When you ask a question in Claude Desktop, the host model calls `ae_query` with your prompt. That triggers the full Agentic Earth agent — which picks the right data sources, fetches live data, runs analysis, and returns a synthesized answer.

```
Claude Desktop
  └── calls ae_query("conflict events in Ukraine")
        └── Agentic Earth agent
              ├── get_conflict_events (ACLED)
              ├── get_deepstate_frontlines
              └── synthesized answer + result keys
```

Results are stored server-side by key. Use `ae_fetch(result_key)` to retrieve the full GeoJSON — up to 200 features by default.

---

## Credits

Every `ae_query` call draws from your Agentic Earth credit balance — the same pool used by the web app and CLI. Check your balance anytime:

```bash
ae credits
# or in Claude Desktop: ask "what's my Agentic Earth balance?"
```

Upgrade your plan at [agenticearth.app](https://agenticearth.app).

---

## Going further

The MCP integration gives you a taste of what Agentic Earth can do. For the full experience — interactive maps, hotspot analysis, clustering, Prophet forecasting, session history, and exports — use the dedicated tools:

<div class="tip custom-block" style="padding-top: 8px">

**[ae chat →](/cli#ae-chat)** — purpose-built terminal interface with maps and full analysis

**[agenticearth.app →](https://agenticearth.app)** — browser-based map with visual results

</div>

---

## Troubleshooting

**Agentic Earth doesn't appear in Claude Desktop**
- Make sure you fully quit and relaunched (Cmd+Q, not just close window)
- Check the config file is valid JSON — a trailing comma breaks it
- Run `ae mcp` in your terminal to confirm the server starts without errors

**`ae: command not found`**
- Use the full path: `which ae` in your terminal, then paste the result into the `"command"` field

**Auth error**
- Confirm your `AE_API_KEY` starts with `ae_sk_`
- Test it: `AE_API_KEY=ae_sk_... ae credits`
