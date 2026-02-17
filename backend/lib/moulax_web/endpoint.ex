defmodule MoulaxWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :moulax

  @session_options [
    store: :cookie,
    key: "_moulax_key",
    signing_salt: "moulax_dev",
    same_site: "Lax"
  ]

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  plug CORSPlug, origin: ["http://localhost:3000"]
  plug MoulaxWeb.Router
end
