#!/bin/sh

# Sair imediatamente se um comando sair com um código de saída diferente de zero.
set -e

npx prisma db pull
npx prisma generate
npm run dev
