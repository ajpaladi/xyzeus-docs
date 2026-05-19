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
      text: View on PyPI ↗
      link: https://pypi.org/project/agenticearth/

features:
  - icon: ⚡
    title: One-line install
    details: "pip install agenticearth — then ae login. You're querying live satellite, vessel, conflict, and climate data in under a minute."

  - icon: 🌍
    title: 150+ live data sources
    details: "AIS vessels, SAR imagery, ACLED conflict events, NDBC buoys, Overture buildings, GDELT, planetary climate layers, and much more — all queryable in plain English."

  - icon: 🤖
    title: Natural language to geodata
    details: "Ask a question, get GeoJSON, CSV, or Parquet back. The agent picks the right sources, fetches and cross-references the data, then streams results back to you."

  - icon: 💬
    title: Multi-turn sessions
    details: "Use ae chat for an interactive session that remembers context — follow-up queries, mid-session uploads, and exportable results all in one flow."

  - icon: 🐍
    title: Python-native
    details: "The SDK returns GeoDataFrames if you have geopandas installed — drop straight into your analysis pipeline with zero extra wrangling."

  - icon: 📤
    title: Export anywhere
    details: "Save results as GeoJSON, CSV, or Parquet with --output or result.save(). Every result is also accessible by key for later retrieval."
---
