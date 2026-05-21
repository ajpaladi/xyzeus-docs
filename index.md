---
layout: home

hero:
  name: "Agentic Earth"
  text: "Developer Documentation"
  tagline: "150+ live geospatial datasets. One natural-language interface. CLI and Python SDK."
  actions:
    - theme: brand
      text: Quickstart →
      link: /quickstart
    - theme: alt
      text: CLI Reference
      link: /cli
    - theme: alt
      text: Python SDK
      link: /sdk/
    - theme: alt
      text: MCP Server
      link: /mcp
    - theme: alt
      text: View on PyPI ↗
      link: https://pypi.org/project/agenticearth/

features:
  - icon: 💬
    title: Chat like an LLM. Think like an analyst.
    details: "ae chat gives you a conversational interface that feels like ChatGPT — except every answer is grounded in live geospatial data. Ask follow-ups, refine results, and build a full picture across multiple sources in a single session."

  - icon: 🌍
    title: 150+ live data sources
    details: "AIS vessels, SAR imagery, ACLED conflict events, NDBC buoys, Overture buildings, GDELT, planetary climate layers, and much more — all queryable in plain English."

  - icon: ⚡
    title: One-line install
    details: "pip install agenticearth — then ae login. You're querying live satellite, vessel, conflict, and climate data in under a minute."

  - icon: 🤖
    title: Natural language to geodata
    details: "Ask a question, get GeoJSON, CSV, or Parquet back. The agent picks the right sources, fetches and cross-references the data, then streams results back to you."

  - icon: 🐍
    title: Python-native
    details: "The SDK returns GeoDataFrames if you have geopandas installed — drop straight into your analysis pipeline with zero extra wrangling."

  - icon: 📤
    title: Export anywhere
    details: "Save results as GeoJSON, CSV, or Parquet with --output or result.save(). Every result is also accessible by key for later retrieval."

  - icon: 🔌
    title: MCP — native in Claude Desktop & Cursor
    details: "Connect Agentic Earth to Claude Desktop, Cursor, or Windsurf in two minutes. 150+ live geospatial datasets as native tools inside your AI assistant."
    link: /mcp
    linkText: Setup guide →
---

## `ae chat` — a smarter terminal

Most LLMs can reason about geography. None of them can *fetch* it.

`ae chat` is an interactive terminal session backed by 150+ live geospatial datasets. Ask it anything — it reasons about what data to pull, fetches it in real time, and gives you a synthesized answer with exportable results. Then ask a follow-up.

```
$ ae chat

  > What's the current vessel traffic near the Strait of Hormuz?
  ✓ get_ais_vessels  (312 features)

  There are 312 AIS-tracked vessels within 50km of the Strait of Hormuz.
  The heaviest concentration is in the northbound lane — 47 tankers,
  predominantly flagged to Panama and Marshall Islands...

  > Which of those are supertankers carrying crude?
  ✓ get_ais_vessels  (18 features)

  18 VLCCs match the profile. Notable vessels include...

  > /save hormuz_vlccs.geojson
  ✓ Saved → hormuz_vlccs.geojson
```

The difference from a standard LLM:

| | Standard LLM | ae chat |
|---|---|---|
| Knowledge cutoff | Yes | No — live data |
| Real vessel positions | ❌ | ✓ AIS feed |
| Satellite imagery | ❌ | ✓ SAR, optical |
| Conflict events | ❌ | ✓ ACLED, GDELT |
| Exportable geodata | ❌ | ✓ GeoJSON, CSV, Parquet |
| Follow-up memory | Limited | ✓ Full session context |

[Get started with ae chat →](/cli#ae-chat)
