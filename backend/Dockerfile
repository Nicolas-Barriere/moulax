FROM elixir:1.17-otp-27-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    inotify-tools \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN mix local.hex --force && \
    mix local.rebar --force

COPY mix.exs ./

RUN mix deps.get

COPY . .

EXPOSE 4000

ENV MIX_ENV=dev
ENV DATABASE_HOST=db

CMD ["sh", "-c", "mix deps.get && mix ecto.setup && mix phx.server"]
