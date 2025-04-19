-- Create permissions table
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(100)
);

-- Create role_permissions junction table
CREATE TABLE role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE
);

-- Insert default permissions
INSERT INTO permissions (name, description) VALUES 
('READ_USER', 'Can view user information'),
('WRITE_USER', 'Can edit user information'),
('DELETE_USER', 'Can delete users'),
('READ_ALL_USERS', 'Can view all users'),
('MANAGE_ROLES', 'Can manage roles and permissions'),
('ACCESS_ADMIN_PANEL', 'Can access admin panel'),
('ACCESS_MODERATOR_PANEL', 'Can access moderator panel'),
('ACCESS_USER_PANEL', 'Can access user panel');

-- Assign permissions to roles
-- ROLE_USER permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ROLE_USER' AND p.name IN ('READ_USER', 'ACCESS_USER_PANEL');

-- ROLE_MODERATOR permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ROLE_MODERATOR' AND p.name IN ('READ_USER', 'WRITE_USER', 'READ_ALL_USERS', 'ACCESS_USER_PANEL', 'ACCESS_MODERATOR_PANEL');

-- ROLE_ADMIN permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ROLE_ADMIN' AND p.name IN ('READ_USER', 'WRITE_USER', 'DELETE_USER', 'READ_ALL_USERS', 'MANAGE_ROLES', 'ACCESS_USER_PANEL', 'ACCESS_MODERATOR_PANEL', 'ACCESS_ADMIN_PANEL');
