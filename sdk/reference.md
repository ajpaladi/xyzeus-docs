# API Reference

## Module-level shortcuts

```python
import agenticearth as ae
```

### `ae.query(prompt, **kwargs)`

Run a query with the default client (initialised from `AE_API_KEY` / `~/.agenticearth/config.json`).

```python
result = ae.query("NDBC buoys in the Gulf of Mexico")
```

See [`AgenticEarth.query()`](#agenticearth-query) for full parameter docs.

---

### `ae.upload(file_path, **kwargs)`

Upload a file with the default client.

```python
meta = ae.upload("my_data.csv")
print(meta["dataset_key"])
```

See [`AgenticEarth.upload()`](#agenticearth-upload) for full parameter docs.

---

## `AgenticEarth`

The main SDK client.

```python
from agenticearth import AgenticEarth

client = AgenticEarth(
    api_key="ae_sk_...",    # optional — falls back to AE_API_KEY env or config file
    base_url="https://api.agenticearth.app",  # optional
    timeout=120.0,          # optional, seconds
)
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `api_key` | `str \| None` | `None` | API key. Falls back to `AE_API_KEY` env var, then `~/.agenticearth/config.json` |
| `base_url` | `str \| None` | `None` | API base URL. Falls back to `AE_BASE_URL` env var, then `https://api.agenticearth.app` |
| `timeout` | `float` | `120.0` | HTTP timeout in seconds for streaming requests |

Raises `AuthError` if no API key can be resolved.

---

### `AgenticEarth.query()` {#agenticearth-query}

Run an agent query. Streams events internally and returns a `QueryResult` when complete.

```python
result = client.query(
    prompt="conflict events in Sudan last 30 days",
    history=None,       # optional — list of prior turns
    on_event=None,      # optional — callback for streaming events
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | `str` | — | Natural-language query |
| `history` | `list[dict] \| None` | `None` | Prior conversation turns as `[{"role": "user", "content": "..."}, ...]` |
| `on_event` | `Callable[[StreamEvent], None] \| None` | `None` | Called for each streaming event as it arrives |

**Returns:** [`QueryResult`](#queryresult)

---

### `AgenticEarth.fetch_result()`

Fetch a stored result by key. Returns a `GeoDataFrame` if `geopandas` is installed, otherwise a raw dict.

```python
gdf = client.fetch_result("get_ais_vessels_a1b2")
gdf = client.fetch_result("get_ais_vessels_a1b2", format="parquet")
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `result_key` | `str` | — | Result key from a previous query |
| `format` | `str` | `"geojson"` | `"geojson"`, `"csv"`, or `"parquet"` |

---

### `AgenticEarth.fetch_raw()`

Fetch the raw stored result dict, with no post-processing.

```python
raw = client.fetch_raw("get_ais_vessels_a1b2")
```

---

### `AgenticEarth.save_result()`

Download a result and write it to a file.

```python
path = client.save_result("get_ais_vessels_a1b2", Path("vessels.geojson"), format="geojson")
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `result_key` | `str` | Result key |
| `path` | `Path` | Destination file path |
| `format` | `str` | `"geojson"`, `"csv"`, or `"parquet"` |

**Returns:** `Path` — the written file path.

---

### `AgenticEarth.upload()` {#agenticearth-upload}

Upload a file and make it available for agent queries.

```python
meta = client.upload("my_data.csv")
print(meta["dataset_key"])   # e.g. "ds_a1b2c3d4"
print(meta["row_count"])     # e.g. 4201
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_path` | `str \| Path` | Path to the file to upload |
| `filename` | `str \| None` | Override the filename sent to the server |

Supported formats: CSV, GeoJSON, GeoPackage, Parquet, Shapefile (zip), TIFF.

**Returns:** `dict` with `dataset_key`, `row_count`, and other metadata.

---

### `AgenticEarth.balance()`

Return current credit balance and plan tier.

```python
b = client.balance()
# {
#   "tier": "Growth",
#   "credits_remaining": 8240,
#   "credits_monthly": 10000,
#   "credits_used": 1760
# }
```

---

### `AgenticEarth.datasets()`

List uploaded datasets for the current user.

```python
items = client.datasets()
for d in items:
    print(d["dataset_key"], d["filename"], d["row_count"])
```

---

## `QueryResult`

Returned by `client.query()`.

```python
result.answer        # str
result.result_keys   # list[str]
```

### `QueryResult.fetch()`

Download a result. Returns `GeoDataFrame` if geopandas is installed, otherwise a dict.

```python
gdf = result.fetch()
gdf = result.fetch(result_key="get_ais_vessels_a1b2")  # specific key
gdf = result.fetch(format="parquet")
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `result_key` | `str \| None` | `None` | Defaults to `result_keys[0]` |
| `format` | `str` | `"geojson"` | `"geojson"` or `"parquet"` |

---

### `QueryResult.save()`

Save a result to a file. Format is inferred from the file extension.

```python
result.save("output.geojson")
result.save("output.csv")
result.save("output.parquet")
result.save("output.geojson", result_key="get_ais_vessels_a1b2")
```

**Returns:** `Path`

---

## `StreamEvent`

Passed to the `on_event` callback in `client.query()`.

| Attribute | Type | Description |
|-----------|------|-------------|
| `type` | `str` | Event type — see table below |
| `tool` | `str \| None` | Tool name (for `tool_start` / `tool_done`) |
| `args` | `dict \| None` | Tool arguments (for `tool_start`) |
| `result_key` | `str \| None` | Result key (for `tool_done`) |
| `count` | `int \| None` | Feature count (for `tool_done`) |
| `text` | `str \| None` | Text chunk (for `text_delta`) |
| `answer` | `str \| None` | Full answer (for `done`) |

### Event types

| type | When | Key attributes |
|------|------|----------------|
| `thinking` | Agent is reasoning | — |
| `tool_start` | Tool call begins | `tool`, `args` |
| `tool_done` | Tool call completed | `tool`, `result_key`, `count` |
| `text_delta` | Answer text streaming | `text` |
| `done` | Query complete | `answer` |
| `error` | Error occurred | `message` |

---

## Exceptions

| Exception | When |
|-----------|------|
| `AgenticEarthError` | Base class for all SDK errors |
| `AuthError` | No API key found, or key is invalid |
| `InsufficientCreditsError` | Credit balance too low to complete the query |
