defmodule Moulax.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      Moulax.Repo,
      {Phoenix.PubSub, name: Moulax.PubSub},
      MoulaxWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: Moulax.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    MoulaxWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
