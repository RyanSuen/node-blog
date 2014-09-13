var crypto = require('crypto'),
	User = require('../models/user.js');
/*
 * GET home page.
 * 各页面路由
 */
module.exports = function(app) {
	
	//主页
	app.get('/',function(req, res) {
		res.render('index', {title: 'RyanSuen'});
	});

	app.get('/test', function(req, res) {
		res.send('hello,world!');
	});

	//注册get
	app.get('/reg', function(req, res) {
		res.render('reg', {title: '注册'});
	});
	
	//注册post
	app.post('/reg', function(req, res) {
		var name = req.body.name,
			password = req.body.password,
			password_re = req.body['password-repeat'];
		if(password_re !== password) {
			req.flash('error', '两次密码不一样');
			return res.redirect('/reg');
		}

		var md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');
		console.log(password);
		var newUser = new User({
			name: name,
			password: password,
			email: req.body.email
		});

		User.get(newUser.name, function(err, user) {
			if(user) {
				req.flash('error', '用户已存在！');
				return res.redirect('/reg');
			}
		});
	});

	//登录get
	app.get('/login', function(req, res) {
		res.render('login', {title: '登录'});
	});

	//登录post
	app.post('/login', function(req, res) {

	});

	//发表get
	app.get('/post', function(req, res) {
		res.render('post', {title: '发表'});
	});

	//发表post
	app.post('/post', function(req, res) {

	});

	//退出
	app.get('/logout', function(req, res) {

	});

};
