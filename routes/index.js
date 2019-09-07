	const express = require('express');
	const router = express.Router();

	
	router.get('/new', function(req, res, next) {
	  res.render('new', { title: 'Cadastrar Livro', doc: {"titulo":"","autor":""}, action: '/new' });
	})

	router.post('/new', function(req, res) {
	  const titulo = req.body.titulo;
	  const autor  = req.body.autor;
	  global.db.insert({titulo, autor}, (err, result) => {
		  if(err) { return console.log(err); }
		  res.redirect('/');
	      })
	})
	
	router.get('/edit/:id', function(req, res, next) {
	  const id = req.params.id;
	  global.db.findOne(id, (e, docs) => {
	      if(e) { return console.log(e); }
	      res.render('new', { title: 'Edição de Livro', doc: docs[0], action: '/edit/' + docs[0]._id });
	    });
	})

	router.post('/edit/:id', function(req, res) {
	  const id = req.params.id;
	  const titulo = req.body.titulo;
	  const autor = req.body.autor;
	  global.db.update(id, {titulo, autor}, (e, result) => {
		if(e) { return console.log(e); }
		res.redirect('/');
	    });
	})


	router.get('/delete/:id', function(req, res) {
	  const id = req.params.id;
	  global.db.deleteOne(id, (e, r) => {
		if(e) { return console.log(e); }
		res.redirect('/');
	      });
	})

	
	/* GET home page. */
	router.get('/:pagina?', function(req, res) {
	  const pagina = parseInt(req.params.pagina || "1");
	  global.db.findAll(pagina, (e, docs) => {
	      if(e) { return console.log(e); }
	 
	      global.db.countAll((e, count) => {
			if(e) { return console.log(e); }
	 
		const qtdPaginas = Math.ceil(count / global.db.resultPages);
		res.render('index', { title: 'Lista de Livros', docs, count, qtdPaginas, pagina });
	      })
	  })
	})


module.exports = router;
