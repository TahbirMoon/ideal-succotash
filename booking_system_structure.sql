-- Users Table: Minimization and consent tracking
CREATE TABLE abc123_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email BYTEA,  -- Store encrypted email
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('reserver', 'administrator')),
    age INT NOT NULL,
    consent_given BOOLEAN DEFAULT FALSE -- Track user consent for data collection
    );
 
-- Resources Table: No changes needed here
CREATE TABLE abc123_resources (
    resource_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    hourly_rate DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
-- Reservations Table: Anonymize reserver identity in public views
CREATE TABLE abc123_reservations (
    reservation_id SERIAL PRIMARY KEY,
    reserver_id INT NOT NULL REFERENCES abc123_users(user_id) ON DELETE CASCADE,
    resource_id INT NOT NULL REFERENCES abc123_resources(resource_id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
-- Public Views: Anonymized data for public view
CREATE VIEW abc123_public_reservations AS
SELECT
    r.resource_id,
    r.name AS resource_name,
    res.start_time,
    res.end_time
FROM
    abc123_resources r
JOIN
    abc123_reservations res ON r.resource_id = res.resource_id;
 
-- Consent History Table: Track consent for compliance
CREATE TABLE abc123_consent_history (
    consent_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES abc123_users(user_id),
    consent_given BOOLEAN DEFAULT FALSE,
    consent_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
-- Optional: Data Access Request Table
CREATE TABLE abc123_data_access_requests (
    request_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES abc123_users(user_id),
    request_type VARCHAR(50) CHECK (request_type IN ('access', 'delete', 'update')),
    request_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);