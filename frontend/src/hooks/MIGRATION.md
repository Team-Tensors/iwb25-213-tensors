# API Hooks Migration Guide

This document helps you migrate from the old monolithic `useApi.ts` file to the new structured approach.

## New Structure

```
hooks/
├── index.ts                     # Main export file
├── auth/
│   ├── index.ts                # Auth hooks exports
│   └── useAuth.ts              # Auth-related hooks
├── transactions/
│   ├── index.ts                # Transaction hooks exports
│   ├── useTransactionQueries.ts # Query hooks for transactions
│   └── useTransactionMutations.ts # Mutation hooks for transactions
└── accounts/
    ├── index.ts                # Account hooks exports
    ├── useAccountQueries.ts    # Query hooks for accounts
    └── useAccountMutations.ts  # Mutation hooks for accounts
```

## Migration

### Before (old imports)
```typescript
import { useLogin, useTransactions, useAccounts } from '@/hooks/useApi';
```

### After (new imports)
```typescript
// Option 1: Import from main index
import { useLogin, useTransactions, useAccounts } from '@/hooks';

// Option 2: Import from specific modules
import { useLogin } from '@/hooks/auth';
import { useTransactions } from '@/hooks/transactions';
import { useAccounts } from '@/hooks/accounts';

// Option 3: Import specific files (most explicit)
import { useLogin } from '@/hooks/auth/useAuth';
import { useTransactions } from '@/hooks/transactions/useTransactionQueries';
import { useAccounts } from '@/hooks/accounts/useAccountQueries';
```

## Benefits of New Structure

1. **Better Organization**: Related hooks are grouped together
2. **Easier Maintenance**: Smaller, focused files are easier to maintain
3. **Better Tree Shaking**: Import only what you need
4. **Clear Separation**: Queries and mutations are separated
5. **Scalability**: Easy to add new hook categories
6. **Better Documentation**: Each file focuses on specific functionality

## All Available Hooks

### Auth Hooks (`@/hooks/auth`)
- `useLogin()` - User login
- `useRegister()` - User registration  
- `useProfile()` - Get user profile
- `useUpdateProfile()` - Update user profile
- `useLogout()` - User logout

### Transaction Hooks (`@/hooks/transactions`)
**Queries:**
- `useTransactions(params)` - Get paginated transactions
- `useTransaction(id)` - Get single transaction
- `useRecentTransactions(limit)` - Get recent transactions

**Mutations:**
- `useCreateTransaction()` - Create new transaction
- `useUpdateTransaction()` - Update existing transaction
- `useDeleteTransaction()` - Delete transaction

### Account Hooks (`@/hooks/accounts`)
**Queries:**
- `useAccounts(params)` - Get paginated accounts
- `useAccount(id)` - Get single account
- `useActiveAccounts()` - Get active accounts only
- `useAccountSummary()` - Get account summary statistics

**Mutations:**
- `useCreateAccount()` - Create new account
- `useUpdateAccount()` - Update existing account
- `useDeleteAccount()` - Delete account

## Usage Examples

```typescript
// Auth example
import { useLogin, useProfile } from '@/hooks/auth';

const LoginComponent = () => {
  const login = useLogin();
  const { data: profile } = useProfile();
  // ...
};

// Transactions example
import { useTransactions, useCreateTransaction } from '@/hooks/transactions';

const TransactionsPage = () => {
  const { data: transactions } = useTransactions({ page: 1, limit: 10 });
  const createTransaction = useCreateTransaction();
  // ...
};

// Accounts example
import { useAccounts, useAccountSummary } from '@/hooks/accounts';

const AccountsPage = () => {
  const { data: accounts } = useAccounts();
  const { data: summary } = useAccountSummary();
  // ...
};
```
