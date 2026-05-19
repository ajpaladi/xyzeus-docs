# Quickstart

Get from zero to live geospatial data in under a minute.

## Install

```bash
pip install agenticearth
```

For GeoDataFrame support (recommended):

```bash
pip install agenticearth[geo]
```

## Get an API key

Sign in at [agenticearth.app](https://agenticearth.app), open **Settings → API Keys**, and create a key. Keys start with `ae_sk_`.

## Authenticate

```bash
ae login
# API key (from agenticearth.app/settings): ae_sk_...
# ✓ Logged in. Key saved to ~/.agenticearth/config.json
```

Or use an environment variable — useful for CI, notebooks, and scripts:

```bash
export AE_API_KEY=ae_sk_...
```

---

## Your first query

### CLI

```bash
ae ask "conflict events in Sudan in the last 30 days"
```

Save the result directly to a file:

```bash
ae ask "NDBC weather buoys in the Gulf of Mexico" --output buoys.geojson
```

### Python

```python
import agenticearth as ae

result = ae.query("conflict events in Sudan in the last 30 days")
print(result.answer)

# Save to file
result.save("sudan.geojson")
```

If `geopandas` is installed, `result.fetch()` returns a `GeoDataFrame`:

```python
gdf = result.fetch()
print(gdf.head())
```

---

## Interactive session

For multi-turn exploration, use `ae chat`:

```
ae chat

  > NDBC buoys in the Gulf of Mexico
  ✓ get_ndbc_buoys  (47 features)

  The query returned 47 NDBC weather buoys across the Gulf...

  > now cluster them by wave height
  ✓ cluster_points  (8 clusters)  key=cluster_points_a1b2

  Result keys: cluster_points_a1b2  · /save <file> to export

  > /save clusters.geojson
  ✓ Saved → clusters.geojson
```

See [CLI → ae chat](/cli#ae-chat) for the full list of in-session commands.

---

## Check your balance

```bash
ae credits
```

```python
import agenticearth as ae
client = ae.AgenticEarth()
print(client.balance())
```
