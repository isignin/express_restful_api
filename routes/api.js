// router.js
var express = require('express');
var router = express.Router();

var Member = require('../models/member');

//Middleware that is specific to this router
router.use(function(req,res,next){
   console.log('Middleware is responding.');
   next(); //make sure we go to the next route and not stop here.
});

router.get('/', function(req,res) {
   res.json({message: 'Welcome to our new API!'});
});

router.get('/findByName/:name', function(req,res){
	Member.findByName(req.params.name, function(err,member){
		if (err)
		  res.send(err);
		if (member)
		  res.json(member);
		else
		  res.send("Name "+req.params.name +" not found");
	});
});

router.route('/member')
  .post(function(req, res) {
    var member = new Member();
    member.name = req.body.name;
    member.email = req.body.email;

    member.save(function(err){
    	if (err)
    		res.send(err);

    	res.json({message: 'member created'});
    });
  })
  .get(function(req,res){
    Member.find(function(err, members){
    	if (err)
    		res.send(err);
    	res.json(members);
    });
  });

router.route('/member/:member_id')
  	.get(function(req, res){
  	  Member.findById(req.params.member_id, function(err, member){
  		if (err)
  			res.send(err);
        res.json(member);
  	  });
  	})
  	.put(function(req,res){
  		Member.findById(req.params.member_id, function(err, member){
  			if (err)
  				res.send(err);
  			member.name = req.body.name;
  			member.email = req.body.email;

  			member.save(function(err){
  				if (err)
  					res.send(err);
  				res.json({message: 'member updated'});
  			});
  		});
  	})
  	.delete(function(req,res){
  		Member.remove({
  			_id: req.params.member_id
  		}, function(err, member) {
  			if (err)
  				res.send(err);
  			res.json({message: 'Successfully deleted'});
  		});
  	});

module.exports = router;

