<html>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
</head>
<body>

<script>

let apply = (f, args) => {
	
	if (args == null) args = [];
	else args = Array.prototype.slice.call(args);
	
	return f.apply(null, args);
};

let timeout = async (time) => {
	await new Promise((f, e) => setTimeout(f, time));
};

let runAsync = function(f, args)
{
	(async () => {
		try
		{
			await apply(f, args);
		}
		catch (e)
		{
			console.log(e);
		}
	})()
};

let run = async () => {
	
	console.log(1);
	await apply(timeout, [500]);
	console.log(2);
};

runAsync(run, []);

</script>

</body>
</html>