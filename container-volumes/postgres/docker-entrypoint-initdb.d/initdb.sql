-- create schema called app to house most of our database data
CREATE ROLE "shared-service-user"
    SUPERUSER 
    LOGIN 
    PASSWORD 'shared-service-password';

--  create payment service database
CREATE DATABASE ecommerce
    WITH
    ENCODING = 'UTF8'
    -- LC_COLLATE = 'C'
    -- LC_CTYPE = 'C';
    OWNER = "shared-service-user";
    
\connect ecommerce; 
-- https://stackoverflow.com/questions/6508267/postgresql-create-schema-in-specific-database
CREATE SCHEMA app;

