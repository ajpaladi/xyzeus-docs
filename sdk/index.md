# Python SDK

The `agenticearth` Python package gives you programmatic access to the same agent that powers the CLI and web app — query live geospatial datasets, stream events, upload files, and get results as GeoDataFrames or raw dicts.

## Installation

```bash
pip install agenticearth
```

With GeoDataFrame support (recommended for data science workflows):

```bash
pip install agenticearth[geo]
```

**Requirements:** Python ≥ 3.9

**Dependencies:** `httpx`, `rich`, `click`

**Optional:** `geopandas ≥ 0.14`, `pandas ≥ 2.0`

---

## Authentication

Set your API key once with the CLI:

```bash
ae login
```

Or pass it directly in code, or via environment variable:

```python
import agenticearth as ae

# From environment variable AE_API_KEY (recommended)
result = ae.query("conflict events in Sudan last 30 days")

# Or pass explicitly
from agenticearth import AgenticEarth
client = AgenticEarth(api_key="ae_sk_...")
```

---

## Quick examples

### Simple query

```python
import agenticearth as ae

result = ae.query("NDBC weather buoys in the Gulf of Mexico")
print(result.answer)
# → "I found 47 NDBC weather buoys across the Gulf of Mexico..."

result.save("buoys.geojson")
```

### GeoDataFrame

```python
import agenticearth as ae

result = ae.query("Overture buildings within 1km of Times Square")
gdf = result.fetch()          # returns GeoDataFrame (requires geopandas)
print(gdf.shape)              # (2341, 12)
print(gdf.crs)                # EPSG:4326
```

### Upload and analyse

```python
import agenticearth as ae

ae.upload("my_survey.csv")
result = ae.query("cluster the survey points by response score")
gdf = result.fetch()
```

### Multi-turn with history

```python
from agenticearth import AgenticEarth

client = AgenticEarth()
history = []

r1 = client.query("ACLED conflict events in Mali last 90 days", history=history)
history += [{"role": "user", "content": "ACLED conflict events in Mali last 90 days"},
            {"role": "assistant", "content": r1.answer}]

r2 = client.query("now show only events with fatalities > 10", history=history)
r2.save("mali_high_fatality.geojson")
```

### Streaming events

```python
from agenticearth import AgenticEarth

client = AgenticEarth()

def on_event(event):
    if event.type == "tool_start":
        print(f"▶ Running {event.tool}...")
    elif event.type == "tool_done":
        print(f"✓ {event.tool} — {event.count} features")
    elif event.type == "text_delta":
        print(event.text, end="", flush=True)

result = client.query("vessel traffic near the Strait of Hormuz", on_event=on_event)
```

---

## QueryResult

Every `query()` call returns a `QueryResult`:

```python
result = ae.query("...")

result.answer        # str — the agent's written response
result.result_keys   # list[str] — keys for fetching geo data

result.fetch()       # GeoDataFrame or dict — first result key
result.fetch(result_key="get_ais_vessels_a1b2")  # specific key
result.fetch(format="parquet")  # as Parquet bytes → GeoDataFrame

result.save("output.geojson")    # GeoJSON
result.save("output.csv")        # CSV (properties only)
result.save("output.parquet")    # Parquet
```

---

## Error handling

```python
from agenticearth import AgenticEarth, AuthError, InsufficientCreditsError, AgenticEarthError

client = AgenticEarth()

try:
    result = client.query("global shipping lanes")
    result.save("lanes.geojson")
except AuthError:
    print("Invalid API key — run `ae login`")
except InsufficientCreditsError:
    print("Out of credits — upgrade at agenticearth.app")
except AgenticEarthError as e:
    print(f"SDK error: {e}")
```

---

## Full API reference

See [API Reference](/sdk/reference) for all classes and methods.
