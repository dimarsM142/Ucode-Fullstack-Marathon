USE ucode_web;

CREATE TABLE heroes (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(255) NOT NULL,
    race VARCHAR(255) DEFAULT 'human' NOT NULL,
    class_role ENUM('tankman', 'healer', 'dps') NOT NULL,
    PRIMARY KEY(id)
);