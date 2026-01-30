INSERT INTO users (email, password_hash, name, role)
VALUES
(
  'admin@example.com',
  '$2b$10$ehUX0Q/WCJVJeUdmV6Gu1.s6cy1aTgYcUf4qHZfnKXvfIpeezIWgW',
  'Admin User',
  'admin'
),
(
  'user@example.com',
  '$2b$10$GOXH7OpvxNUGWVQXzYqRO.8WNMltLE3FAvXQ3Z88ruafqM0NjJ4z6',
  'Regular User',
  'user'
)
ON CONFLICT (email) DO NOTHING;
