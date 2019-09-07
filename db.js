	const mongoClient = require("mongodb").MongoClient;
	
	const ObjectId = require("mongodb").ObjectId;

	const resultPages = 2;

	mongoClient.connect("mongodb://localhost/projeto1", {
     		 	 useNewUrlParser: true,
   			 useUnifiedTopology: true
 		  })
            .then(conn => global.conn = conn.db("projeto1_db"))
            .catch(err => console.log(err))

	
	function findAll(pagina, callback){  
    		const tamanhoSkip = resultPages * (pagina - 1);
    		global.conn.collection("books").find({})
                                       .skip(tamanhoSkip)
                                       .limit(resultPages)
                                       .toArray(callback);
	}

	function insert(book, callback){
	    global.conn.collection("books").insert(book, callback);
	}

	
	function findOne(id, callback){  
	    global.conn.collection("books").find(new ObjectId(id)).toArray(callback);
	}

	function update(id, book, callback){
		global.conn.collection("books").updateOne({_id:new ObjectId(id)}, {$set:{titulo:book.titulo, autor:book.autor}}, callback);
        }

	function deleteOne(id, callback){
   		 global.conn.collection("books").deleteOne({_id: new ObjectId(id)}, callback);
	}

	//callback deve considerar error e count
	function countAll(callback){  
	    global.conn.collection("books").count(callback);
	}
 
module.exports = { findAll, insert, findOne, update, deleteOne, countAll, resultPages }
