# API Hooks

This directory contains all React Query hooks for API interactions, organized by domain.

## Structure

```
hooks/
├── index.ts                     # Main barrel export file
├── auth/                        # Authentication hooks
│   ├── index.ts                 # Auth exports
│   └── useAuth.ts               # Login, register, profile, logout
├── transactions/                # Transaction hooks
│   ├── index.ts                 # Transaction exports
│   ├── useTransactionQueries.ts # Query hooks (GET operations)
│   └── useTransactionMutations.ts # Mutation hooks (POST/PUT/DELETE)
└── accounts/                    # Account hooks
    ├── index.ts                 # Account exports
    ├── useAccountQueries.ts     # Query hooks (GET operations)
    └── useAccountMutations.ts   # Mutation hooks (POST/PUT/DELETE)
```

## Design Principles

### 1. Domain-Driven Organization
Hooks are organized by business domain (auth, transactions, accounts) rather than by operation type.

### 2. Separation of Queries and Mutations
Within each domain, queries (read operations) and mutations (write operations) are separated into different files for better maintainability.

### 3. Barrel Exports
Each domain has an `index.ts` that re-exports all hooks from that domain, and the main `index.ts` re-exports everything.

### 4. Consistent Naming
- Query hooks: `use[Entity]`, `use[Entity]s`, `use[Entity][Descriptor]`
- Mutation hooks: `useCreate[Entity]`, `useUpdate[Entity]`, `useDelete[Entity]`

### 5. TypeScript First
All hooks are fully typed with proper generics and return types.

## Usage

### Import from main index (recommended)
```typescript
import { useLogin, useTransactions, useCreateAccount } from '@/hooks';
```

### Import from domain-specific modules
```typescript
import { useLogin } from '@/hooks/auth';
import { useTransactions } from '@/hooks/transactions';
import { useCreateAccount } from '@/hooks/accounts';
```

### Import from specific files (most explicit)
```typescript
import { useLogin } from '@/hooks/auth/useAuth';
import { useTransactions } from '@/hooks/transactions/useTransactionQueries';
import { useCreateAccount } from '@/hooks/accounts/useAccountMutations';
```

## Adding New Hooks

### For a new domain
1. Create a new directory: `hooks/[domain]/`
2. Create query file: `use[Domain]Queries.ts`
3. Create mutation file: `use[Domain]Mutations.ts`
4. Create index file: `index.ts`
5. Add export to main `hooks/index.ts`

### For existing domain
1. Add the hook to appropriate file (`useXxxQueries.ts` or `useXxxMutations.ts`)
2. Export from domain's `index.ts`

## Error Handling

All hooks use React Query's built-in error handling. Errors are exposed through the hook's return value:

```typescript
const { data, error, isLoading, isError } = useTransactions();

if (isError) {
  console.error('Failed to fetch transactions:', error);
}
```

## Cache Invalidation

Mutation hooks automatically invalidate related queries:

```typescript
// When creating a transaction, these caches are invalidated:
const createTransaction = useCreateTransaction();
// - ['transactions']
// - ['accounts'] 
// - ['dashboard']
```

## Authentication

Query hooks automatically check authentication status and are disabled when the user is not authenticated:

```typescript
const { data } = useTransactions(); // Only runs if user is authenticated
```
