defmodule Moulax.Repo.Migrations.CreateTransactions do
  use Ecto.Migration

  def change do
    execute(
      "CREATE TYPE transaction_source AS ENUM ('csv_import', 'manual')",
      "DROP TYPE transaction_source"
    )

    create table(:transactions, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :account_id, references(:accounts, type: :binary_id), null: false
      add :date, :date, null: false
      add :label, :string, null: false
      add :original_label, :string, null: false
      add :amount, :decimal, null: false
      add :currency, :string, default: "EUR"
      add :category_id, references(:categories, type: :binary_id)
      add :bank_reference, :string
      add :source, :transaction_source, null: false

      timestamps()
    end

    create index(:transactions, [:account_id])
    create index(:transactions, [:category_id])
    create index(:transactions, [:date])

    create unique_index(:transactions, [:account_id, :date, :amount, :original_label],
             name: :transactions_account_date_amount_original_label_index
           )
  end
end
