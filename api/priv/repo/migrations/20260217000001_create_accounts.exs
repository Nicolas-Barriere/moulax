defmodule Moulax.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    execute(
      "CREATE TYPE account_type AS ENUM ('checking', 'savings', 'brokerage', 'crypto')",
      "DROP TYPE account_type"
    )

    create table(:accounts, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, null: false
      add :bank, :string, null: false
      add :type, :account_type, null: false
      add :initial_balance, :decimal, default: 0
      add :currency, :string, default: "EUR"
      add :archived, :boolean, default: false

      timestamps()
    end
  end
end
