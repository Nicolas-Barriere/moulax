defmodule Moulax.Repo.Migrations.CreateCategorizationRules do
  use Ecto.Migration

  def change do
    create table(:categorization_rules, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :keyword, :string, null: false
      add :category_id, references(:categories, type: :binary_id), null: false
      add :priority, :integer, default: 0

      timestamps()
    end

    create index(:categorization_rules, [:category_id])
  end
end
