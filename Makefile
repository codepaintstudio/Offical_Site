.PHONY: dev dev-public build typecheck preview

dev dev-public:
	bun run dev

build:
	bun run build

typecheck:
	bun run typecheck

preview:
	bun run preview
