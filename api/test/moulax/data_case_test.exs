defmodule Moulax.DataCaseTest do
  use Moulax.DataCase, async: true

  test "errors_on/1 interpolates options in error messages" do
    changeset =
      {%{}, %{name: :string}}
      |> Ecto.Changeset.cast(%{name: "ab"}, [:name])
      |> Ecto.Changeset.validate_length(:name, min: 3)

    assert %{name: [msg]} = errors_on(changeset)
    assert msg =~ "at least 3"
  end
end
