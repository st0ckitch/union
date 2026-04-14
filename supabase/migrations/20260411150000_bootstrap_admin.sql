-- Bootstrap: create an admin user you can log in with immediately.
-- Safe to re-run: both inserts use ON CONFLICT guards.
--
-- Credentials created:
--   email:    admin@hmspace.ge
--   password: HMspace2026!
--
-- After applying, change the password from the Supabase dashboard
-- (Authentication → Users) or through the app's password-reset flow.

-- Supabase auth.users uses bcrypt hashes in encrypted_password.
-- pgcrypto is already available in every Supabase project.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  v_user_id uuid;
  v_email   text := 'admin@hmspace.ge';
  v_password text := 'HMspace2026!';
BEGIN
  -- 1. If the user already exists, reuse its id; otherwise create it.
  SELECT id INTO v_user_id FROM auth.users WHERE email = v_email;

  IF v_user_id IS NULL THEN
    v_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      v_email,
      crypt(v_password, gen_salt('bf')),
      now(),
      NULL,
      NULL,
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
      '{}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    -- Mirror into auth.identities so Supabase treats this as a
    -- fully-initialised email/password identity.
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', v_email),
      'email',
      v_user_id::text,
      now(),
      now(),
      now()
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- 2. Grant the admin role.
  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;
