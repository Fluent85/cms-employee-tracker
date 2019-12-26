DROP DATABASE IF EXISTS CMSDB;
CREATE DATABASE CMSDB;

USE CMSDB;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(7,2) NULL,
    department_id INT NOT NULL,
    -- FOREIGN KEY?
    PRIMARY KEY (id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    salary DECIMAL(7,2) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    -- FOREIGN KEY?
    PRIMARY KEY (id)
);