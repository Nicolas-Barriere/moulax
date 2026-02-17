import Config

config :moulax,
  ecto_repos: [Moulax.Repo],
  generators: [timestamp_type: :utc_datetime, binary_id: true]

config :moulax, MoulaxWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [
    formats: [json: MoulaxWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Moulax.PubSub,
  live_view: [signing_salt: "moulax_dev"]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :phoenix, :json_library, Jason

import_config "#{config_env()}.exs"
