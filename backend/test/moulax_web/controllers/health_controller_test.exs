defmodule MoulaxWeb.HealthControllerTest do
  use MoulaxWeb.ConnCase, async: true

  test "GET /api/v1/health returns ok", %{conn: conn} do
    conn = get(conn, "/api/v1/health")

    assert json_response(conn, 200) == %{
             "status" => "ok",
             "version" => "0.1.0"
           }
  end
end
