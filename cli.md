# CLI Reference

The `ae` CLI gives you full access to Agentic Earth from the terminal — one-shot queries, interactive sessions, file uploads, and result exports.

## Installation

[![PyPI version](https://img.shields.io/pypi/v/agenticearth?color=c4a46b&labelColor=1a1a2a&logo=python&logoColor=white)](https://pypi.org/project/agenticearth/)
[![Python versions](https://img.shields.io/pypi/pyversions/agenticearth?color=c4a46b&labelColor=1a1a2a)](https://pypi.org/project/agenticearth/)

```bash
pip install agenticearth
ae --version
```

[View on PyPI ↗](https://pypi.org/project/agenticearth/)

## Authentication

::: warning Requirements
CLI and SDK access requires a **Pro plan or above**. `ae signup` will prompt you to upgrade if your account is on Free or Hobbyist.
:::

```bash
ae signup
```

Opens your browser to sign up or log in, then saves your key to `~/.agenticearth/config.json` automatically. This is the recommended way to get started, no need to visit the website first.

Already have a key, or setting up in a CI/headless environment? Use `ae login --key` or the `AE_API_KEY` environment variable instead.

---

## Commands

### `ae signup`

Create an account (or log in) and save an API key — entirely from the terminal.

```bash
ae signup
```

| Option | Description |
|--------|-------------|
| `--url` | Custom API base URL (default: `https://api.agenticearth.app`) |

Under the hood, this opens a short-lived browser session at `agenticearth.app/cli-auth`, waits for you to sign in (and upgrade, if needed), then polls until it's ready and saves the resulting key, no copy-pasting.

---

### `ae login`

Save an API key you already have, without going through the browser.

```bash
ae login --key ae_sk_...
# or interactively:
ae login
# Prompts: API key (from agenticearth.app/settings)
```

| Option | Description |
|--------|-------------|
| `--key` | Your `ae_sk_*` API key (prompted if omitted) |
| `--url` | Custom API base URL (default: `https://api.agenticearth.app`) |

---

### `ae logout`

Clear saved credentials.

```bash
ae logout
```

---

### `ae whoami`

Show the current key (masked) and base URL.

```bash
ae whoami
# API key:  ae_sk_abc123…ef89
# Base URL: https://api.agenticearth.app
```

---

### `ae ask`

Run a one-shot query and stream the response.

```bash
ae ask "conflict events in Sudan last 30 days"
ae ask "cluster WiFi APs in Belarus" --output clusters.geojson
ae ask "NDBC buoys in Gulf of Mexico" -o buoys.csv
ae ask "what patterns do you see in this file?" --file my_data.csv
```

| Option | Description |
|--------|-------------|
| `--output`, `-o` | Save result to file. Extension determines format: `.geojson`, `.csv`, `.parquet` |
| `--file`, `-f` | Upload a local file and include it in the query. Supports CSV, GeoJSON, Parquet, Shapefile (zip), TIFF |
| `--url` | API base URL override (also: `AE_BASE_URL` env var) |

---

### `ae chat`

Start an interactive multi-turn session. The agent remembers context across turns — ask follow-up questions, refine results, and export data without re-running queries.

```bash
ae chat
```

Sessions are saved automatically to `~/.agenticearth/sessions/` and can be resumed later with `ae resume`.

#### In-session commands

| Command | Description |
|---------|-------------|
| `/preview <key>` | Preview a result as a table in the terminal |
| `/map <key>` | Open a result as an interactive map in the browser |
| `/save <file>` | Export the last result to a local file. Extension sets format: `.geojson`, `.csv`, `.parquet` |
| `/keep [key]` | Save a result permanently to your My Data library in the web app (different from `/save` — this persists to the cloud, not a local file) |
| `/agent [name]` | Show your active BYOA agent, or switch to a different saved one |
| `/upload <file>` | Upload a file mid-session and make it available to the agent |
| `/view <key>` | Open a chart result in the browser |
| `/credits` | Show current credit balance and tier |
| `/graph` | Show your knowledge graph stats (same as `ae graph`) |
| `/datasets` | List your uploaded datasets |
| `/sessions` | List saved sessions |
| `/clear` | Reset conversation history (keeps the session) |
| `/history` | Print a summary of the conversation so far |
| `/exit` | End the session (also `Ctrl+C`) |

**Example session:**

```
ae chat

  > NDBC buoys in the Gulf of Mexico
  ✓ get_ndbc_buoys  (47 features)  key=get_ndbc_buoys_3f2a

  > now cluster them by wave height
  ✓ cluster_points  (8 clusters)  key=cluster_points_a1b2

  > /save clusters.geojson
  ✓ Saved → clusters.geojson

  > /credits
  Tier:    Growth
  Credits: 8,240 / 10,000  [82%]

  > /exit
  Session saved (3 turns). Resume with: ae resume ae_sess_a1b2c3d4
```

---

### `ae resume`

Resume a previous session. Without an argument, resumes the most recent session.

```bash
ae resume                      # resumes last session
ae resume ae_sess_a1b2c3d4     # resumes a specific session
```

---

### `ae view`

Open a chart result in the browser. If the result is not a chart, use `ae export` instead.

```bash
ae view create_chart_e8d1
```

---

### `ae preview`

Preview a result as a table in the terminal, or open it as an interactive map in the browser.

```bash
ae preview get_conflict_events_a1b2          # first 5 rows as table
ae preview get_conflict_events_a1b2 -n 10    # first 10 rows
ae preview get_conflict_events_a1b2 --map    # open as a Leaflet map in the browser
ae preview get_ais_vessels_c3d4 --map        # vessel positions on a dark map
```

| Option | Description |
|--------|-------------|
| `--rows`, `-n` | Number of rows to show in the table preview (default: 5) |
| `--map` | Open the result as an interactive map instead of a table |
| `--url` | Custom API base URL |

---

### `ae export`

Download a result by key to a local file.

```bash
ae export get_conflict_events_a1b2 --output events.geojson
ae export get_conflict_events_a1b2 --output events.csv
ae export get_conflict_events_a1b2 --output events.parquet
```

| Option | Description |
|--------|-------------|
| `--output`, `-o` | **Required.** Output file path. Extension determines format |

---

### `ae upload`

Upload a file to make it available for analysis.

```bash
ae upload my_data.csv
ae upload survey_results.geojson
```

Supported formats: CSV, GeoJSON, GeoPackage, Parquet, Shapefile (zip), TIFF.

After uploading, reference the returned `dataset_key` in your next query:

```bash
ae ask "show me the hotspots in this dataset" --file my_data.csv
# or in chat: /upload my_data.csv, then ask about it
```

---

### `ae credits`

Show your current credit balance and plan tier.

```bash
ae credits

  Tier:      Growth
  Credits:   8,240 / 10,000 remaining  [82%]
  [████████████████░░░░]
  Used:      1,760 this cycle
```

---

### `ae graph`

Show your knowledge graph stats — nodes and edges you've touched, and your contribution to the global graph (same data as the web app's My Graph tab). This is always scoped to your own account; there's no global all-users count exposed by the API.

```bash
ae graph

  Your Graph
  Nodes touched:      1,204
  Edges discovered:   3,891

  Contribution to the global graph
  Tool coverage:      38 / 150 tools  [25.3%]
  [█████░░░░░░░░░░░░░░░]
  Edges contributed:  412  (18 first discoveries)
  Sessions:           27
  Top domain:         maritime
```

---

### `ae sessions`

List all saved chat sessions, most recent first.

```bash
ae sessions

  SESSION ID               UPDATED                TURNS
  ae_sess_a1b2c3d4         2026-05-17 14:22       5 turns  ←
  ae_sess_e5f6g7h8         2026-05-16 09:11       3 turns
```

---

### `ae datasets`

List files you've uploaded.

```bash
ae datasets

  DATASET KEY         FILE                            ROWS
  ds_a1b2c3d4         survey_results.csv              4,201
  ds_e5f6g7h8         infrastructure.geojson          892
```

---

### `ae agent`

Manage BYOA (Bring Your Own Agent) configs — the same feature as the web app's Settings page, just from the terminal. An agent config only changes the system prompt and focus areas; it doesn't restrict which tools are available.

```bash
ae agent list                          # list your saved agents
ae agent show "Insurance Risk Analyst" # show full details, including system prompt
ae agent delete "Insurance Risk Analyst"
ae agent create                        # interactive wizard
```

Scripted, non-interactive create:

```bash
ae agent create --name "Insurance Risk Analyst" \
  --system-prompt "Focus on flood/wildfire exposure, cite FEMA/NOAA sources." \
  --focus-area risk --focus-area real_estate --default
```

| Subcommand | Description |
|------------|-------------|
| `list` | List your saved agents |
| `show <name>` | Show full details for one agent, including its system prompt |
| `delete <name>` | Delete a saved agent (`--yes` to skip confirmation) |
| `create` | Build a new agent — interactive wizard, or scripted with flags |

Use a saved agent in a session:

```bash
ae chat --agent "Insurance Risk Analyst"
```

---

### `ae set-mapbox-token`

Save a Mapbox public token for `/map` and `ae preview --map`'s basemap. Without this, map previews fall back to a plain Esri basemap with no style switcher.

```bash
ae set-mapbox-token
# Prompts: Mapbox public token (starts with pk.)
```

The `MAPBOX_TOKEN` or `MAPBOX_ACCESS_TOKEN` environment variables are checked first if you already export one for other tools; this command is for making it permanent and shell-independent instead.

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `AE_API_KEY` | Your API key. Overrides `~/.agenticearth/config.json` |
| `AE_BASE_URL` | API base URL. Default: `https://api.agenticearth.app` |

---

## Config file

Credentials are stored at `~/.agenticearth/config.json`:

```json
{
  "api_key": "ae_sk_...",
  "base_url": "https://api.agenticearth.app"
}
```

The file is created with `chmod 600` (owner-read-only) on login.
