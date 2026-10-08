# Medycyna Estetyczna Robert Tobis

Kompletny eksport źródeł niemieckojęzycznej strony medycyny estetycznej. Projekt zawiera stronę responsywną, publiczne zasoby graficzne, formularz kontaktowy wysyłający wiadomości przez Brevo, Worker Cloudflare, schemat bazy D1 oraz skrypty budowania i walidacji.

Eksport nie zawiera haseł, tokenów, kluczy API, odszyfrowanych sekretów ani danych zapisanych w produkcyjnej bazie D1.

## Wymagania

- Node.js 20 lub nowszy
- npm
- do wdrożenia formularza: konto Cloudflare z Workers i D1
- konto Brevo z zatwierdzonym adresem nadawcy

## Struktura projektu

- `site/` — HTML, CSS, JavaScript i publiczne zasoby strony
- `worker/` — kod źródłowy funkcji serwerowej formularza
- `scripts/build-worker.mjs` — budowanie gotowego Workera wraz ze stroną i zasobami
- `scripts/validate-worker.mjs` — podstawowe testy artefaktu
- `scripts/create-secret-sql.mjs` — bezpieczne przygotowanie zaszyfrowanego klucza Brevo do D1
- `drizzle/0000_contact_secrets.sql` — schemat tabeli sekretów
- `dist/` — aktualny, wygenerowany artefakt wdrożeniowy
- `.openai/hosting.json` — konfiguracja aktualnego projektu ChatGPT Sites
- `wrangler.toml.example` — przykład konfiguracji niezależnego wdrożenia Cloudflare
- `source-assets/` — edytowalne materiały źródłowe użyte przy przygotowaniu grafiki obszarów zabiegowych

## Instalacja i sprawdzenie

```bash
npm ci
npm run check
```

Polecenie `npm run build` tworzy `dist/server/index.js`. Polecenie `npm run validate` sprawdza eksport Workera, stronę główną i endpoint formularza.

## Zmienne i sekrety

Plik `.env.example` zawiera wyłącznie nazwy potrzebnych wartości:

- `CONTACT_RECIPIENT` — adres odbierający zapytania z formularza
- `BREVO_SENDER_EMAIL` — adres nadawcy zatwierdzony w Brevo
- `CONFIG_ENCRYPTION_KEY` — 32-bajtowy klucz AES zapisany jako Base64; należy dodać go jako sekret Workera
- `BREVO_API_KEY` — używany wyłącznie lokalnie przez skrypt przygotowujący zaszyfrowany wpis do D1; nie jest publikowany w kodzie ani jako zwykła zmienna Workera

Nie należy dodawać prawdziwego pliku `.env`, `.dev.vars`, `wrangler.toml` ani wygenerowanego pliku z zaszyfrowanym sekretem do repozytorium.

## Wdrożenie w Cloudflare Workers

1. Skopiuj `wrangler.toml.example` jako `wrangler.toml`.
2. Utwórz bazę D1:

   ```bash
   npx wrangler@latest d1 create robert-tobis-aesthetik
   ```

3. Wpisz zwrócone `database_id` do `wrangler.toml`.
4. Utwórz tabelę w bazie:

   ```bash
   npx wrangler@latest d1 execute robert-tobis-aesthetik --remote --file drizzle/0000_contact_secrets.sql
   ```

5. Wygeneruj losowy 32-bajtowy klucz, zapisz go bezpiecznie i dodaj jako sekret `CONFIG_ENCRYPTION_KEY`:

   ```bash
   openssl rand -base64 32
   npx wrangler@latest secret put CONFIG_ENCRYPTION_KEY
   ```

6. Ustaw lokalnie `CONFIG_ENCRYPTION_KEY` i `BREVO_API_KEY`, a następnie wygeneruj zaszyfrowany wpis SQL:

   ```bash
   CONFIG_ENCRYPTION_KEY="..." BREVO_API_KEY="..." node scripts/create-secret-sql.mjs > .brevo-secret.sql
   npx wrangler@latest d1 execute robert-tobis-aesthetik --remote --file .brevo-secret.sql
   rm .brevo-secret.sql
   ```

7. W `wrangler.toml` ustaw końcowe wartości `CONTACT_RECIPIENT` i `BREVO_SENDER_EMAIL`.
8. Zbuduj i opublikuj:

   ```bash
   npm run check
   npx wrangler@latest deploy
   ```

### Przygotowanie sekretu w Windows PowerShell

```powershell
$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
$env:CONFIG_ENCRYPTION_KEY = [Convert]::ToBase64String($bytes)
$env:BREVO_API_KEY = Read-Host "Brevo API key"
$env:CONFIG_ENCRYPTION_KEY | npx wrangler@latest secret put CONFIG_ENCRYPTION_KEY
node scripts/create-secret-sql.mjs | Set-Content -Encoding utf8 .brevo-secret.sql
npx wrangler@latest d1 execute robert-tobis-aesthetik --remote --file .brevo-secret.sql
Remove-Item .brevo-secret.sql
```

## Wdrożenie w ChatGPT Sites

Plik `.openai/hosting.json` zawiera identyfikator aktualnej strony oraz nazwę powiązania D1. Przy tworzeniu osobnej kopii w innym projekcie Sites należy zastąpić `project_id` identyfikatorem nowego projektu, przypisać bazę D1 jako `DB`, ustawić wymagane zmienne i sekret, uruchomić migrację oraz zbudować projekt poleceniem `npm run build`.

## Formularz kontaktowy

Endpoint `POST /api/contact`:

- sprawdza pochodzenie i format żądania,
- stosuje honeypot oraz ograniczenie częstotliwości,
- waliduje wymagane pola,
- pobiera zaszyfrowany klucz Brevo z D1,
- wysyła wiadomość do `CONTACT_RECIPIENT` bez otwierania programu pocztowego pacjenta.

Wiadomości z formularza nie są zapisywane w bazie D1; D1 przechowuje wyłącznie zaszyfrowany klucz techniczny.

## Uwagi bezpieczeństwa

- Nie umieszczaj klucza Brevo bezpośrednio w kodzie, pliku HTML ani `wrangler.toml`.
- Nie publikuj `CONFIG_ENCRYPTION_KEY` i zaszyfrowanego wpisu D1 razem w publicznym repozytorium.
- Po przeniesieniu strony najlepiej utworzyć nowy klucz Brevo i unieważnić poprzedni.
- Przed uruchomieniem produkcyjnym sprawdź adres odbiorcy, nadawcę Brevo, Impressum i Datenschutzerklärung.
