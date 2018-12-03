CREATE TABLE IF NOT EXISTS todos ( 
  id BIGSERIAL PRIMARY KEY,
  started TIMESTAMPTZ DEFAULT NOW(),
  completed TIMESTAMPTZ,
  userid VARCHAR(100),
  name VARCHAR(100)
);
CREATE INDEX idx_userid ON todos (userid);