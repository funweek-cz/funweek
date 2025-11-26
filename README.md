# **Funweek Web – Informace pro vývojáře**

Vítejte v repozitáři **Funweek Web**! Tento dokument slouží jako přehled důležitých informací pro všechny vývojáře, kteří na projektu pracují nebo se k němu chtějí připojit.

---

## 🚀 Tech Stack

* **Supabase** – Backend-as-a-Service (auth, databáze, API).
* **Next.js** – hlavní framework pro frontend i server-side logiku.
* **React** – základní UI knihovna.
* **Tailwind CSS v4** – pro rychlé a efektivní stylování.
* **PNPM** – správce balíčků.

---

## 📦 PNPM – Rychlý úvod

Používáme **pnpm** místo **npm** nebo **yarn**, protože je rychlejší, efektivnější a pracuje chytře s diskovým místem.

> 🔧 **Použití je téměř stejné jako u npm – jen místo `npm` píšeme `pnpm`.**

### Základní příkazy:

```bash
pnpm install        # Instalace všech závislostí
pnpm add <balík>    # Přidání balíčku
pnpm remove <balík> # Odebrání balíčku
```

---

## ▶️ Spuštění vývojového serveru

```bash
pnpm dev
```

Aplikace se spustí obvykle na: `http://localhost:3000`

---

## 🎨 Stylování – Tailwind CSS v4

* Tailwind je předkonfigurovaný.
* Doporučuje se používat utility-first přístup.
* Dokumentace: [https://tailwindcss.com/](https://tailwindcss.com/)

---

## 📝 Konvenční commity

Pro přehlednější historii doporučujeme používat **Conventional Commits**.

Příklad:

```
feat: přidána nová komponenta headeru
fix: opraveno chování tlačítka v mobilu
refactor: zjednodušena logika ve utils
```

### Rychlé shrnutí:

* **feat:** nová funkce
* **fix:** oprava bugů
* **refactor:** úpravy kódu bez změny chování
* **chore:** údržba repa, buildu atd.
* **docs:** změny dokumentace
* **style:** úpravy formátování, žádný kód

Oficiální specifikace: [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

---

## 📂 Struktura projektu

### ❗ Poznámka k TypeScriptu

V projektu **nepoužíváme TypeScript**, pouze čistý JavaScript.

## 📂 Struktura projektu (doporučený přehled)

```
/src
  /app          # Hlavní Next.js routing
  /components   # Sdílené React komponenty
  /lib          # Pomocné funkce, klienti, služby
  /styles       # Tailwind a globální styly
```

---

## 🛠️ Linting & Formátování

Doporučené nástroje:

* **ESLint** – kontrola kvality kódu
* **Prettier** – automatické formátování

Spuštění lintu:

```bash
pnpm lint
```

---

## 📘 Uživatelské přístupy & Env proměnné

* Všechny proměnné prostředí patří do `.env.local` (nikdy necommituje!).
* Pokud potřebujete novou env proměnnou, napište ostatním vývojářům.

---

## 🤝 Contribuce

1. Vytvořte si větev pojmenovanou dle konvenčních commitů / feature názvů.
2. Dodržujte strukturu kódu a formátovací pravidla.
3. Pište čistý a čitelný kód.

---

Pokud vás napadne něco dalšího, co by se mělo do README přidat, klidně aktualizujte nebo navrhněte úpravu! 🚀✨
