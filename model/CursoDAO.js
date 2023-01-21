module.exports = class CursoDAO {
  
  constructor() {
	this.id = 0;
    this.nome = "";
    this.nivel = "";
    this.modalidade = "";
    this.turno = "";
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

  setNivel(n) {
	this.nivel = n;
  }

  getNivel() {
    return this.nivel;
  }

  setModalidade(m) {
    this.modalidade = m;
  }

  getModalidade() {
    return this.modalidade;
  }

  setTurno(t) {
    this.turno = t;
  }

  getTurno() {
    return this.turno;
  }

  inserir(connection) {
    try {
		var sql = "INSERT INTO cursos (nome, nivel, modalidade, turno) VALUES(?, ?, ?, ?)";

		connection.query(sql, [this.nome, this.nivel, this.modalidade, this.turno],       function (err, result) {
		  if (err) throw err;
		  });
	} catch (e) {
		throw e;
	}
  }
  
  listar(connection, callback) {
    var sql = "SELECT * FROM cursos";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  buscarPorId(connection, callback) {
    var sql = "SELECT * FROM cursos WHERE id = ?";

    connection.query(sql, [this.id], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  excluir(connection) {
    var sql = "DELETE FROM cursos WHERE id = ?";

    connection.query(sql, [this.id],       function (err, result) {
      if (err) throw err;
      });
  }
  
  atualizar(connection) {
    var sql = "UPDATE cursos SET nome=?, nivel=?, modalidade=?, turno=? WHERE id=?";

    connection.query(sql, [this.nome, this.nivel, this.modalidade, this.turno, this.id],       function (err, result) {
      if (err) throw err;
      });
  }

  
}




