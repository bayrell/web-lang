<html>

<head>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />	

<script src='/assets/jquery.min.js'></script>
<script src='/assets/runtime.js'></script>
<script src='/assets/lang.js'></script>
	
<style>
body{ margin: 0; padding: 0; }
.row1{
	font-size: 0;
}
.row1__item{
	display: inline-block;
	width: 50%;
	height: calc(100% - 50px);
	font-size: 14px;
}
.result--error{
	color: red;
}
.result--success{
	color: green;
}
</style>
	
</head>

<body>


<div class='row1'>
<textarea class='row1__item text--in'></textarea>
<textarea class='row1__item text--out'></textarea>
</div>

<center>
	<button class='go'>Go!</button>
	<div class='result'></div>
</center>


<script>
	
	window['use'] = function(s){ return Runtime.rtl.find_class(s); }
	
	$.ajax({
		'url': '/prg.bay',
		'cache': false,
		success: function(result){
			$('.text--in').val(result);
			go_work();
		},
	});
	
	async function go_work()
	{
		let Collection = Runtime.Collection;
		let Context = Runtime.Context;
		
		$('.result').html('');
		$('.result').removeClass('result--error');
		$('.result').removeClass('result--success');
		
		var data = $('.text--in').val();
		var is_context = false;
		
		try
		{
			var context = await Runtime.rtl.createContext({
				"modules": Collection.from([
					"Runtime",
					"Bayrell.Lang"
				]),
			});
			
			var parser = new Bayrell.Lang.LangBay.ParserBay();
			
			/* Create translator */
			var lang;
			
			lang = "php";
			//lang = "es6";
			//lang = "nodejs";
			
			var translator = Bayrell.Lang.LangUtils.createTranslator(lang);
			//var translator = translator_node;
			//var translator = translator_php;
			
			if (is_context)
			{
				var op_code = Bayrell.Lang.LangUtils.parse(context, parser, data);
				console.log(op_code);
				var output = Bayrell.Lang.LangUtils.translate(context, translator, op_code);
			}
			else
			{
				var op_code = Bayrell.Lang.LangUtils.parse(parser, data);
				console.log(op_code);
				var output = Bayrell.Lang.LangUtils.translate(translator, op_code);
			}
			
			$('.text--out').val(output);
			
			$('.result').addClass('result--success');
			$('.result').html('OK');
		}
		catch (ex)
		{
			var err = ex.toString(context, ex);
			$('.result').addClass('result--error');
			$('.result').html(err);
			console.log(ex.stack);
		}
	}
	
	$('.go').click(function(){
		go_work();
	});
	
</script>

</body>

</html>
