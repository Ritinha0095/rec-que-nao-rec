drop database campus;
create database campus;
use campus;
create table cursos (
  id int not null auto_increment,
  nome varchar(100),
  nivel varchar(10),
  modalidade varchar(15),
  turno varchar(10),
  primary key (id)
);
create table alunos (
  id int not null auto_increment,
  nome varchar(100),
  rg varchar(15),
  cpf varchar(11),
  endereco text,
  email varchar(100),
  id_curso int not null,
  primary key (id),
  foreign key (id_curso) references cursos(id)
);

insert into cursos (nome, nivel, modalidade, turno) values ('Informática', 'Técnico', 'Integrado', 'Tarde');
insert into cursos (nome, nivel, modalidade, turno) values ('Lazer', 'Técnico', 'Integrado', 'Manhã');
insert into cursos (nome, nivel, modalidade, turno) values ('Análise e Desenvolvimento de Sistemas', 'Superior', 'Tecnólogo', 'Noite');

insert into alunos(nome, rg, cpf, endereco, email, id_curso) values ('Clementina de Jesus', '1234567890', '09876543219', 'Rua Tiririca, 300, Fortaleza - CE', 'clementina.jesus@restinga.ifrs.edu.br', 1);
insert into alunos(nome, rg, cpf, endereco, email, id_curso) values ('Braulio Patriota', '1122334455', '07893465217', 'Rua Brasília, 100, Distrito Federal', 'braulio@restinga.ifrs.edu.br', 2);
insert into alunos(nome, rg, cpf, endereco, email, id_curso) values ('Nerso da Capetinga', '6785432890', '12123434556', 'Rua Pão de Queijo, 500, Capetinga - MG', 'nerso.capetinga@restinga.ifrs.edu.br', 3);

CREATE USER 'root'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;