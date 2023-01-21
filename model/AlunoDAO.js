module.exports = class AlunoDAO {

  constructor() {
    this.id = 0;
    this.nome = "";
    this.rg = "";
    this.cpf = "";
    this.endereco = "";
    this.email = "";
    this.id_curso = 0;
    this.modalidade_curso = "";
  }

  setId(i) {
    this.id = i;
  }

  getId() {
    return this.id;
  }

  setNome(n) {
    this.nome = n;
  }

  getNome() {
    return this.nome;
  }

  setRg(r) {
    this.rg = r;
  }

  getRg() {
    return this.rg;
  }

  setCpf(c) {
    this.cpf = c;
  }

  getCpf() {
    return this.cpf;
  }

  setEndereco(e) {
    this.endereco = e;
  }

  getEndereco() {
    return this.endereco;
  }

  setEmail(e) {
    this.email = e;
  }

  getEmail() {
    return this.email;
  }

  setIdCurso(i) {
    this.id_curso = i;
  }

  getIdCurso() {
    return this.id_curso;
  }

  setModalidade(mo) {
    this.modalidade_curso = mo;
  }

  getModalidade() {
    return this.modalidade_curso;
  }

  //, b.modalidade as modalidade_curso 
  listar(connection, callback) {
    var sql = "SELECT a.id, a.nome, a.rg, a.cpf " +
      "       a.email, a.id_curso, b.nome as nome_curso " +
      "  FROM alunos as a, cursos as b " +
      " WHERE a.id_curso = b.id ";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  inserir(connection) {
    var sql = "INSERT INTO alunos (nome, rg, cpf, endereco, email, id_curso) VALUES(?, ?, ?, ?, ?, ?)" +
      "  FROM cursos WHERE modalidade = ?";

    connection.query(sql, [this.nome, this.rg, this.cpf, this.endereco, this.email, this.id_curso, this.modalidade_curso], function (err, result) {
      if (err) throw err;
    });
  }

  buscarPorId(connection, callback) {
    var sql = "SELECT id, nome, rg, cpf, endereco, email, id_curso " +
      "  FROM alunos WHERE id = ?";

    var sql_cursos = "SELECT id, nome FROM cursos ORDER BY nome";

    connection.query(sql, [this.id], function (err, result) {
      connection.query(sql_cursos, function (err2, result2) {
        if (err) throw err;
        if (err2) throw err2;
        return callback(result, result2);
      });
    });
  }

  atualizar(connection) {
    var sql = "UPDATE aluno SET nome=?, rg=?, cpf=?, endereco=?, email=?, id_curso=? WHERE id=?";

    connection.query(sql, [this.nome, this.rg, this.cpf, this.endereco, this.email, this.id_curso, this.id], function (err, result) {
      if (err) throw err;
    });
  }

}




