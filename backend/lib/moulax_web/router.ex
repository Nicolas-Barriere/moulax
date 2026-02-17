defmodule MoulaxWeb.Router do
  use Phoenix.Router, helpers: false

  import Plug.Conn

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api/v1", MoulaxWeb do
    pipe_through :api

    get "/health", HealthController, :index
  end

  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: MoulaxWeb.Telemetry
    end
  end
end
