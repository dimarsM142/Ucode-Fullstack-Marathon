CREATE DATABASE ucode_web;

CREATE USER 'darseniuk'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL ON ucode_web.* TO 'darseniuk'@'localhost';