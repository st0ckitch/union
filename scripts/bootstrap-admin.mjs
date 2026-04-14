#!/usr/bin/env node
/**
 * Bootstrap admin user using only the anon key from .env.local.
 * 1. Signs up a new user via Supabase Auth
 * 2. Attempts to grant admin role
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env
// Try .env.local first, fall back to .env
let envPath = path.resolve(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) envPath = path.resolve(__dirname, '..', '.env');
const envRaw = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envRaw.split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/i);
  if (m) env[m[1]] = m[2];
}

const url = env.VITE_SUPABASE_URL;
const anonKey = env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !anonKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env.local');
  process.exit(1);
}

const EMAIL = 'admin@hmspace.ge';
const PASSWORD = 'HMspace2026!';

const supabase = createClient(url, anonKey);

async function main() {
  console.log(`[bootstrap] Supabase URL: ${url}`);
  console.log(`[bootstrap] Signing up ${EMAIL}...`);

  // Step 1: Sign up
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: EMAIL,
    password: PASSWORD,
  });

  if (signUpError) {
    if (signUpError.message.includes('already registered') || signUpError.message.includes('already been registered')) {
      console.log('[bootstrap] User already exists. Trying to sign in...');
    } else {
      console.error('[bootstrap] Signup failed:', signUpError.message);
      // Try signing in anyway
    }
  } else {
    console.log('[bootstrap] Signup successful! User ID:', signUpData?.user?.id);
  }

  // Step 2: Sign in to get a session
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: EMAIL,
    password: PASSWORD,
  });

  if (signInError) {
    console.error('[bootstrap] Sign-in failed:', signInError.message);

    if (signInError.message.includes('Email not confirmed')) {
      console.log('\n========================================');
      console.log('EMAIL CONFIRMATION REQUIRED');
      console.log('========================================');
      console.log('Supabase requires email confirmation before login.');
      console.log('To fix this:');
      console.log(`1. Go to: https://supabase.com/dashboard/project/${env.VITE_SUPABASE_PROJECT_ID || 'YOUR_PROJECT'}/auth/users`);
      console.log(`2. Find user: ${EMAIL}`);
      console.log('3. Click the three dots (...) → "Confirm user"');
      console.log('4. Then re-run this script');
      console.log('========================================\n');
    }
    process.exit(1);
  }

  const userId = signInData.user.id;
  console.log('[bootstrap] Signed in! User ID:', userId);

  // Step 3: Try to grant admin role
  console.log('[bootstrap] Attempting to grant admin role...');

  const { error: roleError } = await supabase
    .from('user_roles')
    .insert({ user_id: userId, role: 'admin' });

  if (roleError) {
    if (roleError.message.includes('duplicate') || roleError.code === '23505') {
      console.log('[bootstrap] Admin role already granted!');
    } else {
      console.log('[bootstrap] Direct insert blocked by RLS (expected):', roleError.message);
      console.log('\n========================================');
      console.log('MANUAL STEP REQUIRED');
      console.log('========================================');
      console.log('The user was created but needs admin role.');
      console.log(`Open: https://supabase.com/dashboard/project/${env.VITE_SUPABASE_PROJECT_ID || 'nsmtxxsvutmryhwszccm'}/sql/new`);
      console.log('Paste this single line and click RUN:\n');
      console.log(`INSERT INTO public.user_roles (user_id, role) VALUES ('${userId}', 'admin') ON CONFLICT DO NOTHING;\n`);
      console.log('========================================\n');

      await supabase.auth.signOut();
      process.exit(0);
    }
  } else {
    console.log('[bootstrap] Admin role granted successfully!');
  }

  await supabase.auth.signOut();

  console.log('\n========================================');
  console.log('ADMIN ACCOUNT READY');
  console.log('========================================');
  console.log(`URL:      http://localhost:8080/admin/login`);
  console.log(`Email:    ${EMAIL}`);
  console.log(`Password: ${PASSWORD}`);
  console.log('========================================\n');
}

main().catch(e => { console.error(e); process.exit(1); });
