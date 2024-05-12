[**5/9**](https://twitter.com/fiveoutofnine)'s personal website: [**fiveoutofnine.com**](https://fiveoutofnine.com).

## Structure

The site is divided into 4 categories:

- [`/`](https://fiveoutofnine.com), page featuring cool things I've done.
- [`/blog`](https://fiveoutofnine.com/blog), page listing things I've written.
- [`/design`](https://fiveoutofnine.com/design), documentation for my design system.
- Other projects, pages, etc.

## Local development

### Installation

```sh
git clone https://github.com/fiveoutofnine/www.git
pnpm install
pnpm run dev
```

### Building

```sh
supabase gen types typescript --project-id $PROJECT_ID > generated/database.types.ts
pnpm dlx next build
```
