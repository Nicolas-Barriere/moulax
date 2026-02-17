# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Moulax.Repo.insert!(%Moulax.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Moulax.Repo
import Ecto.Query

# Default categories for V1 (see V1_SPEC.md and gh issue #4)
default_categories = [
  %{name: "Alimentation", color: "#22c55e"},
  %{name: "Transport", color: "#3b82f6"},
  %{name: "Logement", color: "#8b5cf6"},
  %{name: "Loisirs", color: "#ec4899"},
  %{name: "Santé", color: "#ef4444"},
  %{name: "Abonnements", color: "#f59e0b"},
  %{name: "Revenus", color: "#10b981"},
  %{name: "Épargne", color: "#06b6d4"},
  %{name: "Autres", color: "#6b7280"}
]

now = DateTime.utc_now() |> DateTime.truncate(:second)

rows =
  Enum.map(default_categories, fn attrs ->
    %{
      id: Ecto.UUID.bingenerate(),
      name: attrs.name,
      color: attrs.color,
      inserted_at: now,
      updated_at: now
    }
  end)

# Only insert if no categories exist (idempotent seed)
if Repo.one(from c in "categories", select: count()) == 0 do
  Repo.insert_all("categories", rows)
  IO.puts("Seeded #{length(rows)} default categories.")
else
  IO.puts("Categories already present, skipping seed.")
end
