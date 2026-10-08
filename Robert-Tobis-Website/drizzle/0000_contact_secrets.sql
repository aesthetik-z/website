CREATE TABLE `site_secrets` (
  `name` text PRIMARY KEY NOT NULL,
  `ciphertext` text NOT NULL,
  `iv` text NOT NULL,
  `updated_at` integer NOT NULL
);
