defmodule MoulaxWeb.ConnCase do
  use ExUnit.CaseTemplate

  using do
    quote do
      import Plug.Conn
      import Phoenix.ConnTest
      import MoulaxWeb.ConnCase

      @endpoint MoulaxWeb.Endpoint
    end
  end

  setup tags do
    Moulax.DataCase.setup_sandbox(tags)
    {:ok, conn: Phoenix.ConnTest.build_conn()}
  end
end
