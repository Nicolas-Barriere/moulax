import Config

config :moulax, Moulax.Repo,
  username: "postgres",
  password: "postgres",
  hostname: System.get_env("DATABASE_HOST", "localhost"),
  database: "moulax_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: System.schedulers_online() * 2

config :moulax, MoulaxWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base:
    "test_only_secret_key_base_that_is_at_least_64_bytes_long_for_phoenix_test_mode_ok",
  server: false

config :logger, level: :warning
config :phoenix, :plug_init_mode, :runtime
