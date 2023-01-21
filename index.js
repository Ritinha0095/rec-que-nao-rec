const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));

app.listen(3000, function () {
	console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "campus"
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Banco de dados conectado!");
});

app.get('/', function (req, res) {
	res.render('index.ejs');
});


/* Implementação do Cadastro de Cursos */

const CursoDAO = require('./model/CursoDAO');

app.get('/cursos', function (req, res) {

	var curso = new CursoDAO();
	curso.listar(con, function (result) {
		res.render('cursos/lista.ejs', { cursos: result });
	});

});

app.post('/salvarCurso', function (req, res) {
	try {
		var curso = new CursoDAO();
		curso.setId(req.body.id);
		curso.setNome(req.body.nome);
		curso.setNivel(req.body.nivel);
		curso.setModalidade(req.body.modalidade);
		curso.setTurno(req.body.turno);

		if (req.body.acao == "Salvar") {
			if (curso.getId() > 0) {
				var retorno = curso.atualizar(con);
			} else {
				var retorno = curso.inserir(con);
			}

			res.render('cursos/resultado.ejs');
		} else {
			if (req.body.acao == "Cancelar") {
				res.redirect("http://localhost:3000");
			}
		}
	} catch (e) {
		res.render('erro.ejs', { erro: e });
	}
});

app.get('/excluirCurso', function (req, res) {
	var curso = new CursoDAO();
	curso.setId(req.query.id);

	var retorno = curso.excluir(con);

	res.render('cursos/resultado.ejs');
});

app.get('/formCurso', function (req, res) {
	var curso = new CursoDAO();
	curso.setId(req.query.id);

	curso.buscarPorId(con, function (result) {
		res.render('cursos/form.ejs', { curso: result });
	});
});




/* Implementação do Cadastro de Alunos */

const AlunoDAO = require('./model/AlunoDAO');

app.get('/alunos', function (req, res) {

	var aluno = new AlunoDAO();
	aluno.listar(con, function (result) {
		res.render('alunos/lista.ejs', { alunos: result });
	});

});

app.get('/formAluno', function (req, res) {
	var aluno = new AlunoDAO();
	aluno.setId(req.query.id);

	aluno.buscarPorId(con, function (result, result2) {
		res.render('alunos/form.ejs', { aluno: result, cursos: result2 });
	});
});


app.post('/salvarAluno', function (req, res) {
	var aluno = new AlunoDAO();
	aluno.setId(req.body.id);
	aluno.setNome(req.body.nome);
	aluno.setRg(req.body.rg);
	aluno.setCpf(req.body.cpf);
	aluno.setEndereco(req.body.endereco);
	aluno.setEmail(req.body.email);
	aluno.setIdCurso(req.body.curso);
	aluno.setModalidade(req.body.modalidade);

	if (req.body.acao == "Salvar") {
		if (aluno.getId() > 0) {
			var retorno = aluno.atualizar(con);
		} else {
			var retorno = aluno.inserir(con);
		}

		res.sendFile(__dirname + '/views/alunos/resultado.html');
	} else {
		if (req.body.acao == "Cancelar") {
			res.redirect("http://localhost:3000");
		}
	}

	app.get('/excluirAluno', function(req, res){
		var aluno = new AlunoDAO();  
		aluno.setId(req.query.id);
		
		var retorno = aluno.excluir(con);
		res.render('alunos/resultado.ejs');
	});

	app.get('/formAluno', function(req, res){
		var aluno = new AlunoDAO();  
		aluno.setId(req.query.id);
		
		aluno.buscarPorId(con, function(result){
			res.render('alunos/form.ejs', {aluno: result});
		});
	});
}); 

