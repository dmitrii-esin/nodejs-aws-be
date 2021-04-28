--create database lesson4_1;

--drop database lesson4_1;

--create extension if not exists "uuid-ossp";

--create table todo_list (
--	id uuid primary key default uuid_generate_v4(),
--	list_name text,
--	list_description text
--)

--create table todo_item (
--	id uuid primary key default uuid_generate_v4(),
--	list_id uuid,
--	item_name text,
--	item_description text,
--	foreign key ("list_id") references "todo_list" ("id")
--)

--drop table products;

--insert into todo_list (list_name, list_description) values
--('third', 'third thing to do')

--insert into todo_item (list_id, item_name, item_description) values
--('825f5cb2-85b0-47d4-9064-c3d7476cb903', 'super name 1', 'super desc 1'),
--('fa81ee4b-a335-496c-b281-02ee2f3a633d', 'super name 2', 'super desc 2'),
--('e7b1f3ba-5e82-42bb-b17b-e9d5943d9bc2', 'super name 3', 'super desc 3')
