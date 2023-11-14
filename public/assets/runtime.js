/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.BaseObject;
use Runtime.BaseStruct;
use Runtime.Collection;
use Runtime.Context;
use Runtime.Date;
use Runtime.DateTime;
use Runtime.Dict;
use Runtime.Map;
use Runtime.Monad;
use Runtime.Vector;
use Runtime.Exceptions.AssertException;


class rtl
{
	/* Log level */
	
	/**
	 * Fatal error. Application stoped
	 */
	static const int LOG_FATAL = 0;
	
	/**
	 * Critical error. Application damaged, but works
	 */	
	static const int LOG_CRITICAL = 2;
	
	/**
	 * Any Application error or exception
	 */	
	static const int LOG_ERROR = 4;
	
	/**
	 * Log warning. Developer should attention to this
	 */
	static const int LOG_WARNING = 6;
	
	/**
	 * Information about any event
	 */
	static const int LOG_INFO = 8;
	
	/**
	 * Debug level 1
	 */
	static const int LOG_DEBUG = 10;
	
	/**
	 * Debug level 2
	 */	
	static const int LOG_DEBUG2 = 12;
	
	/* Status codes */ 
	static const int STATUS_PLAN = 0;
	static const int STATUS_DONE = 1;
	static const int STATUS_PROCESS = 100;
	static const int STATUS_FAIL = -1;
	
	/* Errors */
	static const int ERROR_NULL = 0;
	static const int ERROR_OK = 1;
	static const int ERROR_PROCCESS = 100;
	static const int ERROR_FALSE = -100;
	static const int ERROR_UNKNOWN = -1;
	static const int ERROR_INDEX_OUT_OF_RANGE = -2;
	static const int ERROR_KEY_NOT_FOUND = -3;
	static const int ERROR_STOP_ITERATION = -4;
	static const int ERROR_FILE_NOT_FOUND = -5;
	static const int ERROR_ITEM_NOT_FOUND = -5;
	static const int ERROR_OBJECT_DOES_NOT_EXISTS = -5;
	static const int ERROR_OBJECT_ALLREADY_EXISTS = -6;
	static const int ERROR_ASSERT = -7;
	static const int ERROR_REQUEST = -8;
	static const int ERROR_RESPONSE = -9;
	static const int ERROR_CSRF_TOKEN = -10;
	static const int ERROR_RUNTIME = -11;
	static const int ERROR_VALIDATION = -12;
	static const int ERROR_PARSE_SERIALIZATION_ERROR = -14;
	static const int ERROR_ASSIGN_DATA_STRUCT_VALUE = -15;
	static const int ERROR_AUTH = -16;
	static const int ERROR_DUPLICATE = -17;
	static const int ERROR_API_NOT_FOUND = -18;
	static const int ERROR_API_WRONG_FORMAT = -19;
	static const int ERROR_API_WRONG_APP_NAME = -20;
	static const int ERROR_API_ERROR = -21;
	static const int ERROR_FATAL = -99;
	static const int ERROR_HTTP_CONTINUE = -100;
	static const int ERROR_HTTP_SWITCH = -101;
	static const int ERROR_HTTP_PROCESSING = -102;
	static const int ERROR_HTTP_OK = -200;
	static const int ERROR_HTTP_BAD_GATEWAY = -502;
	static const int ERROR_USER = -10000;
	
	
	
	/**
	 * Define class
	 */
	static bool @defClass(var obj)
	{
		#switch
		#case ifcode ES6 then
		if (Runtime.rtl._classes == undefined) Runtime.rtl._classes = {};
		Runtime.rtl._classes[obj.getClassName()] = obj;
		#endswitch
	}
	
	
	
	/**
	 * Find class instance by name. If class does not exists return null.
	 * @return var - class instance
	 */
	static var @find_class(string class_name)
	{
		#switch
		#case ifcode PHP then
		return "\\" . preg_replace("/\\./", "\\", $class_name);
		
		#case ifcode ES6 then
		if (class_name instanceof Function)
			return class_name;
		
		if (window[class_name] != undefined)
			return window[class_name];
			
		return Runtime.rtl._classes[class_name];
		
		if (class_name instanceof Runtime.BaseObject) class_name = class_name.getClassName();
		else if (class_name instanceof Object) class_name = class_name.constructor.name;
		
		if (Runtime.rtl._classes==undefined) Runtime.rtl._classes = {};
		if (Runtime.rtl._classes[class_name]!=undefined) return Runtime.rtl._classes[class_name];
		
		var arr = class_name.split('.');
		var obj = window;
		
		for (var i=0; i<arr.length; i++){
			var key = arr[i];
			if (obj[key] == undefined)
				return null;
			obj = obj[key];
		}
		
		Runtime.rtl._classes[class_name] = obj;
		return obj;
		
		#case ifcode NODEJS then
		if (class_name instanceof Function)
			return class_name;
		
		return use(class_name);
		
		#endswitch
	}
	
	
	/**
	 * Is context
	 */
	static bool is_context()
	{
		#ifdef ENABLE_CONTEXT then
		return true;
		#endif
		return false;
	}
	
	
	/**
	 * Returns true if class instanceof class_name
	 * @return bool
	 */
	static bool is_instanceof(var obj, string class_name)
	{
		#switch
		#case ifcode PHP then
		
		$class_name = static::find_class($class_name);
		if ($obj == null) return false;
		if (gettype($obj) != "object") return false;
		if (is_subclass_of($obj, $class_name)){ return true;}
		return is_a($obj, $class_name);
	
		#case ifcode JAVASCRIPT then
		
		var c = this.find_class(class_name);
		if (c == null) return false;
		return c.prototype.isPrototypeOf(obj);
	
		#endswitch
	}
	
	
	
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	static bool is_implements(var obj, string interface_name)
	{
		#switch
		#case ifcode PHP then
	
		$class_name = get_class($obj);
		return static::class_implements($class_name, $interface_name);
	
		#case ifcode JAVASCRIPT then
		if (obj == undefined) return false;
		if (obj.constructor.__implements__ == undefined) return false;
		return obj.constructor.__implements__.indexOf(interface_name) != -1;
	
		#endswitch
	}
	
	
	
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	static bool class_exists(string class_name)
	{
		#switch
		#case ifcode PHP then
		$class_name = static::find_class($class_name);
		return class_exists($class_name);
		
		#case ifcode JAVASCRIPT then
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return false;
		return true;
		
		#endswitch
	}
	
	
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	static bool get_class_name(var obj)
	{
		if (static::isString(obj)) return obj;
		return obj::getClassName();
	}
	
	
	
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	static bool class_implements(string class_name, string interface_name)
	{
		#switch
		#case ifcode PHP then
		
		$class_name = static::find_class($class_name);
		$interface_name = static::find_class($interface_name);
		$arr = @class_implements($class_name, true);
		if ($arr == false){
			return false;
		}
		foreach ($arr as $name)
		{
			if ($name == $interface_name or "\\" . $name == $interface_name)
				return true;
		}
		return false;
		
		#case ifcode JAVASCRIPT then
		var obj = this.find_class(class_name);
		var obj2 = this.find_class(interface_name);
		
		while (obj != null){
			if (obj.__implements__){
				if (obj.__implements__.indexOf( obj2 ) > -1 ){
					return true;
				}
			}
			obj = obj.__proto__;
		}
		
		return false;
		
		#endswitch
	}
	
	
	
	/**
	 * Returns interface of class
	 * @param string class_name
	 * @return Collection<string>
	 */
	static Collection<string> getInterfaces(string class_name)
	{
		#switch
		#case ifcode PHP then
		$arr = array_values(class_implements(rtl::find_class($class_name)));
		$arr = array_map
		(
			function($s){ return str_replace("\\", ".", $s); },
			$arr
		);
		return \Runtime\Collection::from($arr);
		#case ifcode JAVASCRIPT then
		return this.find_class(class_name).__implements__;
		#endswitch
	}
	
	
	
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	static bool method_exists(string class_name, string method_name)
	{
		#switch
		#case ifcode PHP then
		
		if (gettype($class_name) == "object")
		{
			try
			{
				$r = new \ReflectionMethod(get_class($class_name),$method_name);
				if (!$r) return false;
				if ($r->isStatic()) return false;
				return true;
			}
			catch (\Exception $e) {}
			
			return false;
		}
		
		$class_name = static::find_class($class_name);
		if (!class_exists($class_name)) return false;
		
		try
		{
			$r = new \ReflectionMethod($class_name,$method_name);
			if (!$r) return false;
			if (!$r->isStatic()) return false;
			return true;
		}
		catch (\Exception $e) {}
		
		return false;
		
		#case ifcode JAVASCRIPT then
		
		if (typeof(class_name) == "object")
		{
			if (class_name[method_name] != undefined) return true;
			return false;
		}
		
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return false;
		if (this.exists(ctx, obj[method_name])) return true;
		return false;
	
		#endswitch
	}
	
	
	
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	static Object newInstance(string class_name, Collection<var> args = null)
	{
		#switch
		#case ifcode PHP then
		
		$class_name = static::find_class($class_name);
		if ($args == null)
			return new $class_name($ctx);
		$r = new \ReflectionClass($class_name);
		$arr = $args->_arr;
		if (isset( $ctx )) array_unshift($arr, $ctx);
		return $r->newInstanceArgs($arr);
		
		#case ifcode JAVASCRIPT then
		
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj) || !(obj instanceof Function))
			throw new Runtime.Exceptions.FileNotFound(class_name, "class name");
		if (args == undefined || args == null){ args = []; } else { args = args.toArray(); }
		args = args.slice(); 
		if (typeof ctx != "undefined") args.unshift(ctx);
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
		
		#endswitch
	}
	
	
	
	/**
	 * Returns callback
	 * @return fn
	 */
	static fn method(var obj, string method_name)
	{
		#switch
		#case ifcode PHP then
		
		return new \Runtime\Callback($obj, $method_name);
		
		#case ifcode JAVASCRIPT then
		
		var save = obj;
		if (!(obj instanceof Object))
		{
			var find_obj = this.find_class(obj);
			if (find_obj == null)
			{
				throw new Error("Object " + obj + " not found");
			}
			obj = find_obj;
		}
		
		if (obj[method_name] == null || obj[method_name] == "undefined")
		{
			var class_name = "";
			if (obj.getClassName != undefined)
			{
				class_name = obj.getClassName();
			}
			else if (obj.constructor.getClassName != undefined)
			{
				class_name = obj.constructor.getClassName();
			}
			else class_name = save;
			throw new Error("Method '" + method_name + "' not found in '" + class_name + "'");
		}
		
		return obj[method_name].bind(obj);
		return function(obj, method_name){ return function () {
			return obj[method_name].apply(obj, arguments);
		}}(obj, method_name);
		
		#endswitch
	}
	
	
	
	/**
	 * Returns callback
	 * @return fn
	 */
	static var apply(fn f, Collection args)
	{
		bool is_ctx = false;
		
		#ifdef ENABLE_CONTEXT then
		is_ctx = true;
		#endif
		
		#switch
		#case ifcode PHP then
		
		$arr = ($args != null) ?
			(($args instanceof \Runtime\Collection) ? $args->_getArr() : $args) : [];
		
		if ($is_ctx) array_unshift($arr, $ctx);
		if ($f instanceof \Runtime\Callback)
		{
			return $f->invokeArgs($arr);
		}
		if (gettype($f) == "string") $f = static::find_class($f);
		return call_user_func_array($f, $arr);
		
		#case ifcode JAVASCRIPT then
		
		var c = null;
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (typeof ctx != "undefined") args.unshift(ctx);
		if (this.isString(ctx, f))
		{
			var a = f.split("::");
			var c = a[0]; var m = a[1];
			c = this.find_class(c);
			f = c[m];
		}
		
		if (f instanceof Runtime.Callback)
		{
			return f.call(args);
		}
		else if (f.constructor.name == 'AsyncFunction')
		{
			res = null;
			(async () => {
				try
				{
					await f.apply(c, args);
				}
				catch (e)
				{
					Runtime.io.print_error(e);
				}
			})()
		}
		else
		{
			res = f.apply(c, args);
		}
		
		return res;
		#endswitch
	}
	
	
	
	/**
	 * Call await method
	 * @return fn
	 */
	static async var applyAsync(fn f, Collection args)
	{
		#switch
		#case ifcode PHP then
		
		$arr = ($args != null) ?
			(($args instanceof \Runtime\Collection) ? $args->_getArr() : $args) : []
		;
		if (isset( $ctx )) array_unshift($arr, $ctx);
		if ($f instanceof \Runtime\Callback)
		{
			return $f->invokeArgs($arr);
		}
		if (gettype($f) == "string") $f = static::find_class($f);
		return call_user_func_array($f, $arr);
		
		#case ifcode JAVASCRIPT then
		
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (f instanceof Runtime.Callback)
		{
			return await f.callAsync(args);
		}
		
		if (typeof ctx != "undefined") args.unshift(ctx);
		if (this.isString(ctx, f))
		{
			var a = f.split("::");
			var c = a[0]; var m = a[1];
			c = this.find_class(c);
			f = c[m];
			res = await f.apply(c, args);
		}
		else
		{
			res = await f.apply(null, args);
		}
		
		return res;
		
		#endswitch
	}
	
	
	
	/**
	 * Apply method
	 * @return var
	 */
	static var methodApply(string class_name, string method_name, Collection args = null)
	{
		fn f = rtl::method(class_name, method_name);
		return rtl::apply(f, args);
	}
	static var applyMethod(string class_name, string method_name, Collection args = null) =>
		static::methodApply(class_name, method_name, args);
	static var callMethod(string class_name, string method_name, Collection args = null) =>
		static::methodApply(class_name, method_name, args);
	
	
	/**
	 * Apply method async
	 * @return var
	 */
	static async var methodApplyAsync(string class_name, string method_name, Collection args = null)
	{
		fn f = rtl::method(class_name, method_name);
		return await rtl::applyAsync(f, args);
	}
	static async var applyAsyncMethod(string class_name, string method_name, Collection args = null) =>
		await static::methodApplyAsync(class_name, method_name, args);
	static async var applyMethodAsync(string class_name, string method_name, Collection args = null) =>
		await static::methodApplyAsync(class_name, method_name, args);
	static async var callAsyncMethod(string class_name, string method_name, Collection args = null) =>
		await static::methodApplyAsync(class_name, method_name, args);
	static async var callMethodAsync(string class_name, string method_name, Collection args = null) =>
		await static::methodApplyAsync(class_name, method_name, args);
	
	
	/**
	 * Returns value
	 */
	static var get(var item, string key, var def_val = null)
	{
		return static::attr(item, key, def_val)
	}
	
	
	
	/**
	 * Returns callback
	 * @return var
	 */
	static var attr(var item, Collection path, var def_val = null)
	{
		if (path === null) return def_val;
		#switch
		#case ifcode PHP then
		
		if ($item === null) return $def_val;
		if (gettype($path) == "array") $path = \Runtime\Collection::from($path);
		else if (static::isScalarValue($ctx, $path)) $path = \Runtime\Collection::from([$path]);
		if (!($path instanceof \Runtime\Collection)) return $def_val;
		if (count($path->_arr) == 0) 
		{
			return $item;
		}
		if (is_string($item)) return mb_substr($item, $path->_arr[0], 1);
		$key = $path->first($ctx);
		$path = $path->removeFirstIm($ctx);
		$val = $def_val;
		if ($item instanceof \Runtime\Dict or $item instanceof \Runtime\Collection)
		{
			$item = $item->get($ctx, $key, $def_val);
			$val = static::attr($ctx, $item, $path, $def_val);
			return $val;
		}
		else if ($item instanceof \Runtime\BaseStruct)
		{
			$item = $item->get($ctx, $key, $def_val);
			$val = static::attr($ctx, $item, $path, $def_val);
			return $val;
		}
		else if ($item instanceof \Runtime\BaseObject)
		{
			$item = $item->takeValue($ctx, $key, $def_val);
			$val = static::attr($ctx, $item, $path, $def_val);
			return $val;
		}
		return $def_val;
		
		#case ifcode JAVASCRIPT then
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseStruct = use("Runtime.BaseStruct");
		var BaseObject = use("Runtime.BaseObject");
		
		if (def_val == undefined) def_val = null;
		if (item === null) return def_val;
		if (item === undefined) return def_val;
		if (Array.isArray(path) && path.count == undefined) path = Collection.from(path);
		if (this.isScalarValue(ctx, path)) path = Collection.from([path]);
		if (!(path instanceof Collection)) return def_val;
		if (path.count(ctx) == 0)
		{
			return item;
		}
		if (typeof item == "string") return item.charAt(path[0]);
		var key = path.first(ctx);
		var path = path.removeFirstIm(ctx);
		var val = def_val;
		if (item instanceof Dict || item instanceof Collection)
		{
			var new_item = item.get(ctx, key, def_val);
			val = this.attr(ctx, new_item, path, def_val);
			return val;
		}
		else if (item instanceof BaseStruct)
		{
			var new_item = item.get(ctx, key, def_val);
			val = this.attr(ctx, new_item, path, def_val);
			return val;
		}
		else if (item instanceof BaseObject)
		{
			var new_item = item.takeValue(ctx, key, def_val);
			val = this.attr(ctx, new_item, path, def_val);
			return val;
		}
		else
		{
			var new_item = item[key] || def_val;
			val = this.attr(ctx, new_item, path, def_val);
			return val;
		}
		return def_val;
		
		#endswitch
	}
	
	
	
	/**
	 * Update current item
	 * @return var
	 */
	static var setAttr(var item, Collection attrs, var new_value)
	{
		if (attrs == null) return item;
		#switch
		#case ifcode PHP then
		if (gettype($attrs) == "string") $attrs = \Runtime\Collection::from([$attrs]);
		else if (gettype($attrs) == "array") $attrs = \Runtime\Collection::from($attrs);
		#case ifcode JAVASCRIPT then
		var Collection = use("Runtime.Collection");
		if (typeof attrs == "string") attrs = Collection.from([attrs]);
		else if (Array.isArray(attrs) && attrs.count == undefined) attrs = Collection.from(attrs);
		#endswitch
		
		fn f = var (Collection attrs, var data, var new_value, var f)
		{
			if (attrs.count() == 0) return new_value;
			if (data == null) data = {};
			
			var new_data = null;
			var attr_name = attrs.first();
			
			if (data instanceof BaseStruct)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				var d = (new Map()).setValue(attr_name, res);
				new_data = data.copy(d);
			}
			else if (data instanceof BaseObject)
			{
				var attr_data = data.takeValue(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				new_data = data;
				new_data.assignValue(attr_name, res);
			}
			else if (data instanceof Dict)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);			
				new_data = data.setIm( attr_name, res );
			}
			else if (data instanceof Collection)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);			
				new_data = data.setIm( attr_name, res );
			}
			
			return new_data;
		};
		
		var new_item = f(attrs, item, new_value, f);
		return new_item;
	}
	
	
	
	/**
	 * Returns value
	 * @param var value
	 * @param var def_val
	 * @param var obj
	 * @return var
	 */
	static var @to(var v, var o)
	{
		var ctx = null;
		var e = "";
		
		#switch
		#case ifcode PHP then
		$e = $o["e"];
		#case ifcode JAVSCRIPT then
		e = o.e;
		#endswitch
		
		if (e == "mixed" or e == "primitive" or e == "var" or e == "fn" or e == "callback") return v;
		if (e == "bool") return static::toBool(ctx, v);
		else if (e == "string") return static::toString(ctx, v);
		else if (e == "int") return static::toInt(ctx, v);
		else if (e == "float") return static::toFloat(ctx, v);
		else if (rtl::is_instanceof(ctx, v, e)) return v;
		return v;
	}
	
	
	
	/**
	 * Convert monad by type
	 */
	pure fn m_to(string type_value, var def_value = null) =>
		bool (Monad m) use (type_value, def_value) =>
			new Monad
			(
				m.err == null ? static::convert( m.val, type_value, def_value ) : def_value
			)
	;
	
	
	
	/**
	 * Convert monad to default value
	 */
	pure fn m_def(var def_value = null) =>
		bool (Monad m) use (def_value) =>
			(m.err != null or m.val === null) ? new Monad(def_value) : m
	;
	
	
	
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	static var convert(var v, string t, var d = null)
	{
		if (v === null) return d;
		if (t == "mixed" or t == "primitive" or t == "var" or t == "fn" or t == "callback") return v;
		if (t == "bool" or t == "boolean") return static::toBool(v);
		else if (t == "string") return static::toString(v);
		else if (t == "int") return static::toInt(v);
		else if (t == "float" or t == "double") return static::toFloat(v);
		else if (static::is_instanceof(v, t)) return v;
		return static::toObject(v, t, d);
	}
	
	
	
	/**
	 * Returns true if value instanceof tp
	 * @param var value
	 * @param string tp
	 * @return bool
	 */
	static var checkValue(var value, string tp)
	{
		if (tp == "int") return static::isInt(value);
		if (tp == "float" or tp == "double") return static::isDouble(value);
		if (tp == "string") return static::isString(value);
		if (tp == "bool" or tp == "boolean") return static::isBoolean(value);
		if (rtl::is_instanceof(value, tp)){ return true;}
		return false;
	}
	
	
	
	/**
	 * Return true if value is empty
	 * @param var value
	 * @return bool
	 */
	static bool isEmpty(var value)
	{
		return (not static::exists(value)) or
			value === null or
			value === "" or
			value === false or
			value === 0
		;
	}
	
	
	
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return bool
	 */
	static bool exists(var value)
	{
		#switch
		#case ifcode PHP then
		return isset($value);
		
		#case ifcode JAVASCRIPT then
		
		return (value != null) && (value != undefined);
		#endswitch
	}
	
	
	/**
	 * Returns true if value is scalar value
	 * @return bool
	 */
	static string getType(var value)
	{
		if (value == null) return "null";
		if (rtl::isString(value)) return "string";
		if (rtl::isNumber(value)) return "number";
		if (rtl::isBoolean(value)) return "boolean";
		if (rtl::isFn(value)) return "fn";
		if (value instanceof Collection) return "collection";
		if (value instanceof Dict) return "dict";
		if (value instanceof BaseObject) return "object";
		return "unknown";
	}
	
	
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	static bool isScalarValue(var value)
	{
		if (value == null) return true;
		if (rtl::isString(value)) return true;
		if (rtl::isNumber(value)) return true;
		if (rtl::isBoolean(value)) return true;
		return false;
	}
	
	
	
	/**
	 * Returns true if value is scalar array
	 * @return bool
	 */
	static bool isArray(var value)
	{
		if (value instanceof Collection) return true;
		#switch
		#case ifcode JAVASCRIPT then
		if (value instanceof Array) return true;
		#case ifcode PHP then
		if (is_array($value)) return true;
		#endswitch
		return false;
	}
	
	
	
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	static bool isBoolean(var value)
	{
		if (value === false or value === true) return true;
		return false;
	}
	
	
	
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	static bool isBool(var value) => static::isBoolean(value);
	
	
	
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	static bool isInt(var value)
	{
		#switch
		#case ifcode PHP then
		
		return is_int($value);
		
		#case ifcode JAVASCRIPT then
		
		if (typeof value != "number") return false;
		if (value % 1 !== 0) return false;
		return true;
		
		#endswitch
	}
	
	
	
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	static bool isDouble(var value)
	{
		#switch
		#case ifcode PHP then
		return is_int($value) or is_float($value);
		
		#case ifcode JAVASCRIPT then
		
		if (typeof value == "number") return true;
		return false;
		
		#endswitch
	}
	
	
	
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	static bool isNumber(var value)
	{
		#switch
		#case ifcode PHP then
		
		return is_int($value) or is_float($value);
		#case ifcode JAVASCRIPT then
		
		if (typeof value == "number") return true;
		return false;
		
		#endswitch
	}
	
	
	
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	static bool isString(var value)
	{
		#switch
		#case ifcode PHP then
		
		return is_string($value);
	
		#case ifcode JAVASCRIPT then
		
		if (typeof value == 'string') return true;
		else if (value instanceof String) return true;
		return false;
		
		#endswitch
	}
	
	
	
	/**
	 * Return true if value is function
	 * @param var value
	 * @return bool
	 */
	static bool isFn(var value)
	{
		#switch
		#case ifcode PHP then
		return is_callable($value);
		#case ifcode JAVASCRIPT then
		if (typeof(value) == 'function') return true;
		#endswitch
		
		return false;
	}
	
	
	
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	static string toString(var value)
	{
		#switch
		#case ifcode PHP then
		
		$t = gettype($value);
		if ($value === null) return "";
		if ($value instanceof \Runtime\RawString) return $value->toString();
		if ($value instanceof \Runtime\StringInterface) return $value->toString();
		if (is_int($value) or is_float($value) or is_string($value) or is_int($value))
			return (string)$value;
		if ($value === true) return "1";
		if ($value === false) return "";
		return (string)$value;
		
		#case ifcode JAVASCRIPT then
		
		var _StringInterface = use("Runtime.StringInterface");
		
		if (value === null) return "";
		if (typeof value == 'string') return value;
		if (value instanceof String) return "" + value;
		if (this.is_implements(null, value, _StringInterface)) return value.toString();
		return ""+value;
		
		#endswitch
	}
	
	
	
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	static string @toStr(var value)
	{
		#ifdef ENABLE_CONTEXT then
		return static::toString(null, value);
		#endif
		return static::toString(value);
	}
	
	
	
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	static int toInt(var val)
	{
		#switch
		#case ifcode PHP then
	
		$res = (int)$val;
		$s_res = (string)$res;
		$s_val = (string)$val;
		if ($s_res == $s_val)
			return $res;
		
		#case ifcode JAVASCRIPT then
		
		var res = parseInt(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		
		#endswitch
		return 0;
	}
	
	
	
	/**
	 * Convert value to boolean
	 * @param var value
	 * @return bool
	 */
	static bool toBool(var val)
	{
		#switch
		#case ifcode PHP then
		
		if ($val === false || $val === "false") return false;
		if ($val === true || $val === "true") return true;
		$res = (bool)$val;
		$s_res = (string)$res;
		$s_val = (string)$val;
		if ($s_res == $s_val)
			return $res;
		
		#case ifcode JAVASCRIPT then
		
		var res = false;
		if (val == false || val == 'false') return false;
		if (val == true || val == 'true') return true;
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		
		#endswitch
		return false;
	}
	
	
	
	/**
	 * Convert value to float
	 * @param var value
	 * @return float
	 */
	static bool toFloat(var val)
	{
		#switch
		#case ifcode PHP then
		
		$res = floatval($val);
		$s_res = (string)$res;
		$s_val = (string)$val;
		if ($s_res == $s_val)
			return $res;
		
		#case ifcode JAVASCRIPT then
		
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		
		#endswitch
		return 0;
	}
	
	
	
	/**
	 * Convert to object
	 */
	static var toObject(var v, string t, var d = null)
	{
		if (static::is_instanceof(v, t)) return v;
		if (t == "Runtime.Collection") return Collection::@from(v);
		if (t == "Runtime.Vector") return Vector::@from(v);
		if (t == "Runtime.Dict") return Dict::@from(v);
		if (t == "Runtime.Map") return Map::@from(v);
		try
		{
			fn newInstance = static::method(t, "newInstance");
			return newInstance(v);
		}
		catch (var e){}
		return d;
	}
	
	
	
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	static string ceil(double value)
	{
		#switch
		#case ifcode PHP then
		
		return ceil($value);
		
		#case ifcode JAVASCRIPT then
		
		return Math.ceil(value);
		
		#endswitch
	}
	
	
	
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	static string floor(double value)
	{
		#switch
		#case ifcode PHP then
		
		return floor($value);
		
		#case ifcode JAVASCRIPT then
		
		return Math.floor(value);
		
		#endswitch
	}
	
	
	
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	static string round(double value)
	{
		#switch
		#case ifcode PHP then
		
		return round($value);
		
		#case ifcode JAVASCRIPT then
		
		return Math.round(value);
		
		#endswitch
	}
	
	
	
	/* ====================== Assert ====================== */
	
	static void assert(bool expr, string message)
	{
		if (not expr)
		{
			throw new AssertException(message);
		}
	}
	
	
	/* ================ Memorize functions ================ */
	
	
	static var _memorize_cache = null;
	static var _memorize_not_found = null;
	static var _memorize_hkey = null;
	
	
	static bool @_memorizeValidHKey(var hkey, var key)
	{
		#switch
		#case ifcode PHP then
		if ( static::$_memorize_hkey == null ) static::$_memorize_hkey = [];
		if ( !isset(static::$_memorize_hkey[$hkey]) ) return false;
		if ( static::$_memorize_hkey[$hkey] == $key ) return true;
		return false;
		
		#case ifcode JAVASCRIPT then
		#endswitch
	}
	
	
	
	/**
	 * Clear memorize cache
	 */
	static void @_memorizeClear()
	{
		#switch
		#case ifcode JAVASCRIPT then
		this._memorize_cache = null;
		#case ifcode PHP then
		static::$_memorize_cache = [];
		static::$_memorize_hkey = [];
		#endswitch
	}
	
	
	
	/**
	 * Returns cached value
	 */
	static string @_memorizeValue(string name, var args)
	{
		#switch
		#case ifcode PHP then
		
		if (static::$_memorize_cache == null) return static::$_memorize_not_found;
		if (!isset(static::$_memorize_cache[$name])) return static::$_memorize_not_found;
		
		$arr = &static::$_memorize_cache[$name];
		$sz = count($args);
		for ($i=0; $i<$sz; $i++)
		{
			$key = &$args[$i];
			$hkey = null; 
			if (gettype($key) == 'object') $hkey = spl_object_hash($key); else $hkey = $key;
			if ($i == $sz - 1)
			{
				if (in_array($hkey, array_keys($arr)))
				{
					return $arr[$hkey];
				}
				return static::$_memorize_not_found;
			}
			else
			{
				if (!isset($arr[$hkey])) return static::$_memorize_not_found;
				$arr = &$arr[$hkey];
			}
		}
		
		return static::$_memorize_not_found;
		
		#case ifcode JAVASCRIPT then
		if (this._memorize_cache == null) return this._memorize_not_found;
		if (this._memorize_cache[name] == undefined) return this._memorize_not_found;
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else return this._memorize_not_found;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
			else hkey = key;
			if (i == sz - 1)
			{
				if (arr[hkey] == undefined) return this._memorize_not_found;
				return arr[hkey];
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
		
		return this._memorize_not_found;
		
		#endswitch
	}
	
	
	
	/**
	 * Returns cached value
	 */
	static string @_memorizeSave(string name, var args, var value)
	{
		#switch
		#case ifcode PHP then
		
		if (static::$_memorize_cache == null) static::$_memorize_cache = [];
		if (!isset(static::$_memorize_cache[$name])) static::$_memorize_cache[$name] = [];
		
		$arr = &static::$_memorize_cache[$name];
		$sz = count($args);
		for ($i=0; $i<$sz; $i++)
		{
			$key = &$args[$i];
			$hkey = null; 
			if (gettype($key) == 'object') $hkey = spl_object_hash($key); else $hkey = $key;
			if ($i == $sz - 1)
			{
				$arr[$hkey] = $value;
			}
			else
			{
				if (!isset($arr[$hkey])) $arr[$hkey] = [];
				else if (!static::_memorizeValidHKey($hkey, $key)) $arr[$hkey] = [];
				$arr = &$arr[$hkey];
			}
		}
		
		#case ifcode JAVASCRIPT then
		
		if (this._memorize_cache == null) this._memorize_cache = {};
		if (this._memorize_cache[name] == undefined) this._memorize_cache[name] = {};
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else hkey = null;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
			else hkey = key;
			if (i == sz - 1)
			{
				arr[hkey] = value;
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
		
		#endswitch
	}
	
	
	
	/* ================ Dirty functions ================ */
	
	
	/**
	 * Sleep in ms
	 */
	static async void sleep(int time)
	{
		#switch
		#case ifcode PHP then
		usleep( $time * 1000 );
		#case ifcode JAVASCRIPT then
		await new Promise((f, e) => setTimeout(f, time));
		#endswitch
	}
	
	
	
	/**
	 * Sleep in microseconds
	 */
	static async void usleep(int time)
	{
		#switch
		#case ifcode PHP then
		usleep($time);
		#case ifcode JAVASCRIPT then
		await new Promise((f, e) => setTimeout(f, Math.round(time / 1000)));
		#endswitch
	}
	
	
	
	/**
	 * Returns unique value
	 * @param bool flag If true returns as text. Default true
	 * @return string
	 */
	static string unique(bool flag = true)
	{
		#switch
		#case ifcode PHP then
		
		return uniqid();
		
		#case ifcode JAVASCRIPT then
		
		if (flag == undefined) flag = true;
		if (flag)
			return "" + (new Date).getTime() + Math.floor((Math.random() * 899999 + 100000));
		return Symbol();
		
		#endswitch
	}
	
	
	
	/**
	 * Generate uuid
	 */
	static string uid()
	{
		#switch
		#case ifcode PHP then
		
		$bytes = bin2hex(random_bytes(16));
		return substr($bytes, 0, 8) . "-" .
			substr($bytes, 8, 4) . "-" .
			substr($bytes, 12, 4) . "-" .
			substr($bytes, 16, 4) . "-" .
			substr($bytes, 20);
		
		#case ifcode JAVASCRIPT then
		
		#endswitch
	}
	
	
	
	/**
	 * Generate timestamp based uuid
	 */
	static string time_uid()
	{
		#switch
		#case ifcode PHP then
		
		$bytes = dechex(time()) . bin2hex(random_bytes(12));
		return substr($bytes, 0, 8) . "-" .
			substr($bytes, 8, 4) . "-" .
			substr($bytes, 12, 4) . "-" .
			substr($bytes, 16, 4) . "-" .
			substr($bytes, 20);
		
		#case ifcode JAVASCRIPT then
		
		#endswitch
	}
	
	
	/**
	 * Returns random value x, where 0 <= x < 1
	 * @return double
	 */
	static double urandom()
	{
		#switch
		#case ifcode PHP then
		
		return mt_rand() / (mt_getrandmax() + 1);
		
		#case ifcode JAVASCRIPT then
		
		if (
			window != undefined && window.crypto != undefined &&
			window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return s[0] / 4294967296;
		}
		
		return Math.random();
		
		#endswitch
	}
	
	
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	static int random(int a, int b)
	{
		#switch
		#case ifcode PHP then
		
		if (PHP_VERSION_ID < 70000) return mt_rand($a, $b);
		return random_int($a, $b);
		
		#case ifcode JAVASCRIPT then
		
		if (
			window != undefined && window.crypto != undefined &&
			window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return Math.floor(s[0] / 4294967296 * (b - a + 1) + a);
		}
		
		return Math.floor(Math.random() * (b - a + 1) + a);
			
		#endswitch
	}
	
	
	/**
	 * Generate random string
	 * @var len - string length
	 * @var spec
	 *   - a - alpha
	 *   - n - numberic
	 * @return string
	 */
	static string random_string(int len = 8, string spec = "aun")
	{
		string s = "";
		string res = "";
		int sz = rs::strlen(spec);
		
		for (int i=0; i<sz; i++)
		{
			string ch = spec[i];
			if (ch == "a")
			{
				s ~= "qwertyuiopasdfghjklzxcvbnm";
			}
			if (ch == "u")
			{
				s ~= "QWERTYUIOPASDFGHJKLZXCVBNM";
			}
			else if (ch == "n")
			{
				s ~= "0123456789";
			}
			else if (ch == "s")
			{
				s ~= "!@#$%^&*()-_+='\":;'.,<>?/|~";
			}
		}
		
		int sz_s = rs::strlen(s);
		for (int i=0; i<len; i++)
		{
			int code = static::random(0, sz_s - 1);
			res ~= s[code];
		}
		
		return res;
	}
	
	
	
	/**
	 * Returns current unix time in seconds
	 * @return int
	 */
	static int time()
	{
		#switch
		#case ifcode PHP then
		
		return time();
		
		#case ifcode JAVASCRIPT then
		
		return Math.round((new Date()).getTime() / 1000);
		
		#endswitch
	}
	
	
	
	/**
	 * Returns unix timestamp
	 */
	static int utime()
	{
		#switch
		#case ifcode PHP then
		return microtime(true);
		#case ifcode JAVASCRIPT then
		return (new Date()).getTime() * 1000;
		#endswitch
	}
	
	
	
	/**
	 * Debug
	 */
	void @trace()
	{
		#switch
		#case ifcode PHP then
		
		$trace = debug_backtrace();
		foreach ($trace as $index => $arr)
		{
			$file = isset($arr['file']) ? $arr['file'] : "";
			$line = isset($arr['line']) ? $arr['line'] : "";
			$function = isset($arr['function']) ? $arr['function'] : "";
			echo "${index}) ${file}:${line} ${function}\n";
		}
		
		#endswitch
	}
	
	
	/* ================================ Context Functions ================================ */
	
	protected static var _global_context = null;
	
	
	/**
	 * Returns global context
	 * @return Context
	 */
	public static var @getContext()
	{
		#switch
		#case ifcode PHP then
		if (!static::$_global_context) return new \Runtime\Context();
		return static::$_global_context;
		#case ifcode NODEJS then
		if (!rtl._global_context) return new use("Runtime.Context")();
		return rtl._global_context;
		#case ifcode ES6 then
		if (!Runtime.rtl._global_context) return new Runtime.Context();
		return Runtime.rtl._global_context;
		#endswitch
	}
	
	
	
	/**
	 * Set global context
	 * @param Context context
	 */
	public static var @setContext(var context)
	{
		#switch
		#case ifcode PHP then
		static::$_global_context = $context;
		#case ifcode JAVASCRIPT then
		use("Runtime.rtl")._global_context = context;
		#case ifcode ES6 then
		window['global_context'] = context;
		#endswitch
		return context;
	}
	
	
	
	/**
	 * Run context
	 * @param Dict d
	 */
	public static async int @createContext(var d)
	{
		var ctx = null;
		var context = Context::create(ctx, d);
		
		/* Init context */
		context = await context.init();
		
		/* Setup global context */
		static::setContext(context);
		
		return context;
	}
	
	
	
	/**
	 * Run application
	 * @param Dict d
	 */
	public static async int @runApp(string class_name, Collection<string> modules, Dict d = null)
	{
		if (d == null) d = {};
		
		#ifcode NODEJS then
		let ctx = null;
		#endif
		
		d <= entry_point <= class_name;
		d <= modules <= modules;
		
		#switch
		#case ifcode PHP then
		
		$context = static::createContext($d);
		$context->start($context);
		$code = $context->run($context);
		return $code;
		
		#case ifcode ES6 then
		
		try
		{
			let context = await Runtime.rtl.createContext(d);
			await context.start(context);
			await context.run(context);
		}
		catch (e)
		{
			console.log("\x1B[0;31m" + e.stack + "\x1B[0m\n");
		}
		
		#case ifcode NODEJS then
		
		let code = 0;
		
		try
		{
			let context = await Runtime.rtl.createContext(d);
			await context.start(context);
			code = await context.run(context);
		}
		catch (e)
		{
			process.stderr.write("\x1B[0;91m");
			process.stderr.write(e.stack);
			process.stderr.write("\x1B[0m\n");
		}
		
		return code;
		
		#endswitch
		
		return 0;
	}
	
	
	/* ============================= Runtime Utils Functions ============================= */
	
	
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	pure memorize Collection<string> getParents(string class_name)
	{
		Vector<string> res = new Vector();
		while (class_name != "")
		{
			res.pushValue(class_name);
			class_name = static::methodApply(class_name, "getParentClassName");
		}
		
		return res.toCollection();
	}
	
	
	
	/**
	 * Returns class annotations
	 */
	pure memorize Collection getClassAnnotations(string class_name, Collection res = null)
	{
		if (res == null) res = [];
		Dict info = static::methodApply(class_name, "getClassInfo");
		Collection arr = info["annotations"] |> default Collection [];
		return res.concat(arr);
	}
	
	
	
	/**
	 * Returns class annotations with parents
	 */
	pure memorize Collection getClassAnnotationsWithParents(string class_name)
	{
		Collection res = {};
		Collection<string> parents = static::getParents(class_name);
		for (int i=0; i<parents.count(); i++)
		{
			string parent_class_name = parents[i];
			res = static::getClassAnnotations(parent_class_name, res);
		}
		return res;
	}
	
	
	
	/**
	 * Returns field info
	 */
	pure memorize Dict getFieldInfo(string class_name, string field_name)
	{
		Dict res = static::methodApply(class_name, "getFieldInfoByName", [field_name]);
		return res;
	}
	
	
	
	/**
	 * Returns field info
	 */
	pure memorize Dict getFieldInfoWithParents(string class_name, string field_name)
	{
		Collection<string> parents = static::getParents(class_name);
		for (int i=0; i<parents.count(); i++)
		{
			string parent_class_name = parents[i];
			Dict res = static::methodApply(parent_class_name, "getFieldInfoByName", [field_name]);
			if (res != null) return res;
		}
		return null;
	}
	
	
	
	/**
	 * Returns fields of class
	 */
	pure memorize Collection getFields(string class_name, int flag = 255)
	{
		Vector<string> names = new Vector();
		Collection<string> parents = static::getParents(class_name);
		for (int i=0; i<parents.count(); i++)
		{
			string parent_class_name = parents[i];
			Collection<string> item_fields = static::methodApply
			(
				parent_class_name, "getFieldsList", [flag]
			);
			if (item_fields != null)
			{
				names.appendVector(item_fields);
			}
		}
		return names.toCollection().removeDuplicatesIm();
	}
	
	
	
	/**
	 * Returns fields annotations
	 */
	pure memorize Dict getFieldsAnnotations(string class_name, Dict res = null)
	{
		if (res == null) res = {};
		Collection<string> methods = static::methodApply(class_name, "getFieldsList", [255]);
		for (int i=0; i<methods.count(); i++)
		{
			string method_name = methods[i];
			Dict info = static::methodApply(class_name, "getFieldInfoByName", [method_name]);
			Collection annotations = info["annotations"];
			Collection arr = res[method_name] |> default Collection [];
			res <= { method_name } <= arr.concat(annotations);
		}
		return res;
	}
	
	
	
	/**
	 * Returns fields annotations with parents
	 */
	pure memorize Dict getFieldsAnnotationsWithParents(string class_name)
	{
		Dict res = {};
		Collection<string> parents = static::getParents(class_name);
		for (int i=0; i<parents.count(); i++)
		{
			string parent_class_name = parents[i];
			res = static::getFieldsAnnotations(parent_class_name, res);
		}
		return res;
	}
	
	
	
	/**
	 * Returns methods annotations
	 */
	pure memorize Dict getMethodsAnnotations(string class_name)
	{
		Dict res = {};
		Collection<string> methods = static::methodApply(class_name, "getMethodsList", [255]);
		for (int i=0; i<methods.count(); i++)
		{
			string method_name = methods[i];
			Dict info = static::methodApply(class_name, "getMethodInfoByName", [method_name]);
			Collection annotations = info["annotations"];
			Collection arr = res[method_name] |> default Collection [];
			res <= { method_name } <= arr.concat(annotations);
		}
		return res;
	}
	
	
	
	/**
	 * Returns methods annotations with parents
	 */
	pure memorize Dict getMethodsAnnotationsWithParents(string class_name)
	{
		Dict res = {};
		Collection<string> parents = static::getParents(class_name);
		for (int i=0; i<parents.count(); i++)
		{
			string parent_class_name = parents[i];
			res = res.concatIm( static::getMethodsAnnotations(parent_class_name) );
		}
		return res;
	}
	
	
	/* ============================= Serialization Functions ============================= */
	
	
	static var ObjectToNative(var value, bool force_class_name = true)
	{
		var value1 = static::ObjectToPrimitive(value, force_class_name);
		var value2 = static::PrimitiveToNative(value1);
		return value2;
	}
	static var NativeToObject(var value, bool allow_class_name = true)
	{
		var value1 = static::NativeToPrimitive(value);
		var value2 = static::PrimitiveToObject(value1, allow_class_name);
		return value2;
	}
	
	
	
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	public static var ObjectToPrimitive(var obj, bool force_class_name = true)
	{
	
		if (obj === null) return null;
		if (rtl::isScalarValue(obj)) return obj;
		
		if (obj instanceof Collection)
		{
			return obj.map(
				var (var value) use (force_class_name)
				{
					return static::ObjectToPrimitive( value, force_class_name );
				}
			);
		}
		
		if (obj instanceof Dict)
		{
			
			obj = obj.map(
				var (var value, string key) use (force_class_name)
				{
					return static::ObjectToPrimitive( value, force_class_name );
				}
			);
			
			return obj.toDict();
		}
		
		if (obj instanceof Date)
		{
			return obj;
		}
		if (obj instanceof DateTime)
		{
			return obj;
		}
		
		if (obj instanceof BaseStruct)
		{
			Map<var> values = new Map();
			Collection<string> names = rtl::getFields(obj::getClassName());
			
			for (int i=0; i<names.count(); i++)
			{
				string variable_name = names.item(i);
				var value = obj.get(variable_name, null);
				var value = static::ObjectToPrimitive( value, force_class_name );
				values.setValue(variable_name, value);
			}
			
			if (force_class_name)
			{
				values.setValue("__class_name__", obj::getClassName());
			}
			delete names;
			
			return values.toDict();
		}
		
		return null;
	}
	
	
	
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return var
	 */
	public static var PrimitiveToObject(var obj, bool allow_class_name = true)
	{
		if (obj === null) return null;
		if (rtl::isScalarValue(obj)) return obj;
		
		if (obj instanceof Collection)
		{
			Vector<var> res = new Vector();
			for (int i=0; i<obj.count(); i++)
			{
				var value = obj.item(i);
				value = static::PrimitiveToObject(value, allow_class_name);
				res.pushValue(value);
			}
			return res.toCollection();
		}
		
		if (obj instanceof Dict)
		{
			Map<var> res = new Map();
			Vector<string> keys = obj.keys();
		
			for (int i=0; i<keys.count(); i++)
			{
				string key = keys.item(i);
				var value = obj.item(key);
				value = static::PrimitiveToObject(value, allow_class_name);
				res.setValue(key, value);
			}
			
			delete keys;
			
			if ( !res.has("__class_name__") ) return res.toDict();
			if ( res.item("__class_name__") == "Runtime.Map" or
				res.item("__class_name__") == "Runtime.Dict"
			)
			{
				res.remove("__class_name__");
				return res.toDict();
			}
			
			if (not allow_class_name) return res.toDict();
			
			string class_name = res.item("__class_name__");
			if (not rtl::class_exists(class_name))
			{
				return null;
			}
			if (not rtl::class_implements(class_name, "Runtime.SerializeInterface"))
			{
				return null;
			}
			
			/* Assign values */
			Map<var> obj = new Map();
			Collection<string> names = rtl::getFields(class_name);
			for (int i=0; i<names.count(); i++)
			{
				string variable_name = names.item(i);
				if (variable_name != "__class_name__") 
				{
					var value = res.get(variable_name, null);
					obj.setValue(variable_name, value);
				}
			}
			
			/* New instance */
			var instance = rtl::newInstance(class_name, [obj]);
			
			delete res;
			delete obj;
			
			return instance;
		}
		
		if (obj instanceof Date)
		{
			return obj;
		}
		if (obj instanceof DateTime)
		{
			return obj;
		}
		
		return null;
	}
	
	
	static var NativeToPrimitive(var value)
	{
		#switch
		#case ifcode PHP then
		
		if ($value === null)
			return null;
			
		if (is_object($value))
		{
			if (isset($value->__class_name__) && $value->__class_name__ == "Runtime.Date")
			{
				$value = \Runtime\Dict::from($value);
				$res = new \Runtime\Date($ctx, $value);
				return $res;
			}
			else if (isset($value->__class_name__) && $value->__class_name__ == "Runtime.DateTime")
			{
				$value = \Runtime\Dict::from($value);
				$res = new \Runtime\DateTime($ctx, $value);
				return $res;
			}
			else
			{
				$res = \Runtime\Dict::from($value);
				$res = $res->map($ctx, function ($ctx, $val, $key){
					return static::NativeToPrimitive($ctx, $val);
				});
				return $res;
			}
		}
		
		if (is_array($value))
		{
			if ( isset($value['__class_name__']) )
			{
				if ($value['__class_name__'] == "Runtime.Date")
				{
					$res = \Runtime\Date::from($value);
					return $res;
				}
				else if ($value['__class_name__'] == "Runtime.DateTime")
				{
					$res = \Runtime\DateTime::from($value);
					return $res;
				}
				else
				{
					$res = \Runtime\Dict::from($value);
					$res = $res->map($ctx, function ($ctx, $val, $key){
						return static::NativeToPrimitive($ctx, $val);
					});
					return $res;
				}
			}
			$arr = array_values($value);
			$res = \Runtime\Collection::from($arr);
			$res = $res->map($ctx, function ($ctx, $item){
				return static::NativeToPrimitive($ctx, $item);
			});
			return $res;
		}
		
		return $value;
	
		#case ifcode JAVASCRIPT then
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Date = use("Runtime.Date");
		var _DateTime = use("Runtime.DateTime");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (Array.isArray(value))
		{
			var new_value = _Collection.from(value);
			new_value = new_value.map(ctx, (ctx, val)=>{
				return Runtime.rtl.NativeToPrimitive(ctx, val);
			});
			return new_value;
		}
		if (typeof value == 'object')
		{
			if (value["__class_name__"] == "Runtime.Date")
			{
				var new_value = new _Date(value);
				return new_value;
			}
			if (value["__class_name__"] == "Runtime.DateTime")
			{
				var new_value = new _DateTime(value);
				return new_value;
			}
			var new_value = _Dict.from(value);
			new_value = new_value.map(ctx, (ctx, val, key)=>{
				return Runtime.rtl.NativeToPrimitive(ctx, val);
			});
			return new_value;
		}
		
		return value;
		#endswitch
	}
	
	static var PrimitiveToNative(var value)
	{
		#switch
		
		#case ifcode PHP then
		
		if ($value === null)
			return null;
		
		if ($value instanceof \Runtime\Date)
		{
			$value = $value->toDict($ctx)->setIm($ctx, "__class_name__", "Runtime.Date");
		}
		else if ($value instanceof \Runtime\DateTime)
		{
			$value = $value->toDict($ctx)->setIm($ctx, "__class_name__", "Runtime.DateTime");
		}
		
		if ($value instanceof \Runtime\Collection)
		{
			$arr = [];
			$value->each($ctx,
				function ($ctx, $v) use (&$arr)
				{
					$arr[] = static::PrimitiveToNative($ctx, $v);
				}
			);
			return $arr;
		}
		
		if ($value instanceof \Runtime\Dict)
		{
			$arr = [];
			$value->each($ctx,
				function ($ctx, $v, $k) use (&$arr)
				{
					$arr[$k] = static::PrimitiveToNative($ctx, $v);
				}
			);
			return (object)$arr;
		}
		
		#case ifcode JAVASCRIPT then
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _DateTime = use("Runtime.DateTime");
		var _Date = use("Runtime.Date");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (value instanceof _Date)
		{
			value = value.toDict(ctx).setIm(ctx, "__class_name__", "Runtime.Date");
		}
		else if (value instanceof _DateTime)
		{
			value = value.toDict(ctx).setIm(ctx, "__class_name__", "Runtime.DateTime");
		}
		
		if (value instanceof _Collection)
		{
			var arr = [];
			value.each(ctx, (ctx, v)=>{
				arr.push( Runtime.rtl.PrimitiveToNative(ctx, v) );
			});
			return arr;
		}
		if (value instanceof _Dict)
		{
			var obj = {};
			value.each(ctx, (ctx, v, k)=>{
				obj[k] = Runtime.rtl.PrimitiveToNative(ctx, v);
			});
			return obj;
		}
		
		#endswitch
		
		return value;
	}
	
	
	
	static const int JSON_PRETTY = 1;
	
	
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	static string json_encode(var value, int flags = 0, bool convert = true)
	{
		#switch
		#case ifcode PHP then
		if ($convert){
			$value = static::ObjectToNative($ctx, $value);
		}
		$json_flags = JSON_UNESCAPED_UNICODE;
		if ( ($flags & 1) == 1 ) $json_flags = $json_flags | JSON_PRETTY_PRINT;
		return json_encode($value, $json_flags);
		
		#case ifcode JAVASCRIPT then
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		var _Date = use("Runtime.Date");
		var _DateTime = use("Runtime.DateTime");
		
		if (convert) value = _rtl.ObjectToPrimitive(ctx, value);
		return JSON.stringify(value, (key, value) => {
			if (value instanceof _Date) value = value.toDict().setIm("__class_name__", "Runtime.Date");
			if (value instanceof _DateTime) value = value.toDict().setIm("__class_name__", "Runtime.DateTime");
			if (value instanceof _Collection) return value;
			if (value instanceof _Dict) return value.toObject();
			if (_rtl.isScalarValue(value)) return value;
			return null;
		});
		#endswitch
	}
	
	
	
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var 
	 */
	static var json_decode(var obj, string allow_class_name = true)
	{
		#switch
		#case ifcode PHP then
	
		$res = @json_decode($obj, false);
		if ($res === null || $res === false)
			return null;
		return static::NativeToObject($ctx, $res, $allow_class_name);
	
		#case ifcode JAVASCRIPT then
		try{
			
			var _rtl = use("Runtime.rtl");
			var _Utils = use("Runtime.RuntimeUtils");
			var _Collection = use("Runtime.Collection");
			var _Dict = use("Runtime.Dict");
			var res = null;
			try
			{
				res = JSON.parse(obj, function (key, value){
					if (value == null) return value;
					if (Array.isArray(value)){
						return _Collection.from(value);
					}
					if (typeof value == 'object'){
						return _Dict.from(value);
					}
					return value;
				});
			}
			catch (e)
			{
				res = null;
			}
			return this.PrimitiveToObject(ctx, res, allow_class_name);
		}
		catch(e){
			throw e;
		}
		return null;
		#endswitch
	}
	
	
	#ifdef PHP then
	/**
	 * Register PHP error handler
	 */
	void set_default_exception_handler()
	{
		#ifcode PHP then
		
		set_exception_handler( function ($e){
		
			if (!$e) return;
			
			http_response_code(500);
			
			$message = "Fatal Error:\n";
			$message .= $e->getMessage() . "\n";
			$message .= "in file " . $e->getFile() . ":" . $e->getLine() . "\n";
			$message .= $e->getTraceAsString() . "\n";
			
			if (php_sapi_name() === 'cli')
			{
				$color = "0;91";
				echo chr(27) . "[" . $color . "m" . $message . chr(27) . "[0m";
			}
			else
			{
				echo nl2br($message);
			}
			
			exit (1);
		} );
		
		#endif
	}
	
	#endif
}


#switch
#case ifcode PHP then
rtl::$_memorize_not_found = (object) ['s' => 'memorize_key_not_found'];

#case ifcode ES6 then
var use = function(s){return Runtime.rtl.find_class(s);}

#case ifcode JAVASCRIPT then
if (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')
	Runtime.rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};

#case ifcode NODEJS then

#endswitch

/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.Collection;
use Runtime.Context;
use Runtime.BaseStruct;
use Runtime.Dict;
use Runtime.Map;
use Runtime.Monad;
use Runtime.rs;
use Runtime.rtl;
use Runtime.Vector;


/* Lambda Functions */
class lib
{
	
	/**
	 * Check object is istance
	 */
	pure fn isInstance(string class_name) =>
		bool (var item) use (class_name) => rtl::is_instanceof(item, class_name)
	;
	
	
	
	/**
	 * Check object is implements interface
	 */	
	pure fn isImplements(string class_name) =>
		bool (var item) use (class_name) => rtl::is_implements(item, class_name)
	;
	
	
	
	/**
	 * Check class is implements interface
	 */	
	pure fn classImplements(string class_name) =>
		bool (string item) use (class_name) => rtl::class_implements(item, class_name)
	;
	
	
	
	/**
	 * Create struct
	 */
	pure fn createStruct(string class_name) =>
		BaseStruct(Dict data) use (class_name) => rtl::newInstance(class_name, [data])
	;
	
	
	
	/**
	 * Equal two struct by key
	 */
	pure fn equal(var value)
		=> bool (var item) use (value)
			=> item == value
	;
	
	
	
	/**
	 * Equal two struct by key
	 */
	pure fn equalNot(var value)
		=> bool (var item) use (value)
			=> item != value
	;
	
	
	
	/**
	 * Equal two struct by key
	 */
	pure fn equalAttr(string key, var value)
		=> bool (BaseStruct item1) use (key, value)
			=> (item1 != null) ? rtl::attr(item1, key) == value : false
	;
	
	
	
	/**
	 * Equal two struct by key
	 */
	pure fn equalNotAttr(string key, var value)
		=> bool (BaseStruct item1) use (key, value)
			=> (item1 != null) ? rtl::attr(item1, key) != value : false
	;
	pure fn equalAttrNot(string key, var value) => static::equalNotAttr(key, value);
	
	
	
	/**
	 * Equal attrs
	 */
	pure fn equalAttrs(Dict search) =>
		bool (Dict item) use (search)
		{
			Collection fields = search.keys();
			for (int i=0; i<fields.count(); i++)
			{
				string field_name = fields[i];
				if (search[field_name] != item[field_name]) return false;
			}
			return true;
		}
	;
	
	
	
	/**
	 * Equal two struct by key
	 */
	pure fn equalMethod(string method_name, var value)
		=> bool (BaseStruct item1) use (method_name, value)
		{
			if (item1 == null) return false;
			fn f = rtl::@method(item1, method_name);
			return f() == value;
		}
	;
	
	
	
	/**
	 * Returns key value of obj
	 */
	pure fn get(string key, var def_value) =>
		var (var obj) use (key, def_value) =>
			rtl::attr(obj, [key], def_value)
	;
	
	
	
	/**
	 * Set value
	 */
	pure fn set(string key, var value) =>
		var (var obj) use (key, value) =>
			rtl::setAttr(obj, [key], value)
	;
	
	
	
	/**
	 * Returns attr of item
	 */
	pure fn attr(Collection<string> path, var def_value = null) =>
		var (var obj) use (path, def_value) =>
			rtl::attr(obj, path, def_value)
	;
	
	
	
	/**
	 * Set dict attr
	 */
	pure fn setAttr(Collection<string> path, var value) =>
		var (var obj) use (path, value) =>
			rtl::setAttr(obj, path, value)
	;
	
	
	
	/**
	 * Returns max id from items
	 */
	pure int getMaxIdFromItems(Collection<BaseStruct> items, int start = 0) =>
		items.reduce
		(
			int (int value, BaseStruct item) => item.id > value ? item.id : value,
			start
		)
	;
	
	
	
	/**
	 * Copy object
	 */
	pure fn copy(Dict d) =>
		bool (var item) use (d) => item.copy(d)
	;
	
	
	
	/**
	 * Take dict
	 */
	pure fn takeDict(Collection<string> fields) =>
		bool (var item) use (fields) => item.takeDict(fields)
	;
	
	
	
	/**
	 * Map
	 */
	pure fn map(fn f) =>
		var (var m) use (f) => m.map(f)
	;
	
	
	
	/**
	 * Filter
	 */
	pure fn filter(fn f) =>
		bool (var m) use (f) => m.filter(f)
	;
	
	
	
	/**
	 * Intersect
	 */
	pure fn intersect(Collection arr) =>
		bool (var m) use (arr) => m.intersect(arr)
	;
	
	
	
	/**
	 * Sort
	 */
	pure fn sort(fn f) =>
		bool (var m) use (f) => m.sortIm(f)
	;
	
	
	
	/**
	 * Transition
	 */
	pure fn transition(fn f) =>
		var (var m) use (f) => m.transition(f)
	;
	
	
	
	/**
	 * Concat
	 */
	pure fn concat(Collection arr) =>
		var (var m) use (arr) => m.concat(arr)
	;
	
	
	
	/**
	 * Sort asc
	 */
	pure int sortAsc(var a, var b) => (a > b) ? 1 : (a < b) ? -1 : 0;
	
	
	
	/**
	 * Sort desc
	 */
	pure int sortDesc(var a, var b) => (a > b) ? -1 : (a < b) ? 1 : 0;
	
	
	
	/**
	 * Sort attr
	 */
	pure fn sortAttr(string field_name, var f) =>
		int (Dict a, Dict b) use (field_name, f)
		{
			var a = a[field_name];
			var b = b[field_name];
			if (f == "asc") return (a > b) ? 1 : (a < b) ? -1 : 0;
			if (f == "desc") return (a > b) ? -1 : (a < b) ? 1 : 0;
			return f(a, b);
		}
	;
	
	
	
	/**
	 * Convert monad by type
	 */
	pure fn to(string type_value, var def_value = null) =>
		bool (Monad m) use (type_value, def_value) =>
			new Monad
			(
				m.err == null ? rtl::@convert( m.value(), type_value, def_value ) : def_value
			)
	;
	
	
	
	/**
	 * Convert monad by type
	 */
	pure fn default(var def_value = null) =>
		bool (Monad m) use (def_value) =>
			(m.err != null or m.val === null) ? new Monad(def_value) : m
	;
	
	
	
	/**
	 * Set monad new value
	 */
	pure fn newValue(var value = null, bool clear_error = false) =>
		Monad (Monad m) use (value, clear_error) =>
			clear_error == true ? new Monad(value) : m.err == null ? new Monad(value) : m
	;
	
	
	
	/**
	 * Clear error
	 */
	pure fn clearError() =>
		Monad (Monad m) => new Monad(m.val);
	
	
	
	/**
	 * Returns monad
	 */
	pure Monad monad(Monad m) => m;
	
	
	
	/**
	 * Get method from class
	 * @return fn
	 */
	pure fn method(string method_name) =>
		fn (string class_name) use (method_name) =>
			rtl::method(class_name, method_name)
	;
	
	
	
	/**
	 * Apply function
	 * @return fn
	 */
	pure fn applyMethod(string method_name, Collection args = null) =>
		var (string class_name) use (method_name, args)
		{
			fn f = rtl::method(class_name, method_name);
			return rtl::apply(f, args);
		}
	;
	
	
	
	/**
	 * Apply async function
	 * @return fn
	 */
	pure fn applyMethodAsync(string method_name, Collection args = null) =>
		async var (string class_name) use (method_name, args)
		{
			fn f = rtl::method(class_name, method_name);
			return await rtl::applyAsync(f, args);
		}
	;
	
	
	
	/**
	 * Apply function
	 * @return fn
	 */
	pure fn apply(fn f) =>
		var (var value) use (f) =>
			f(value)
	;
	
	
	
	/**
	 * Apply function
	 * @return fn
	 */
	pure fn applyAsync(fn f) =>
		async var (var value) use (f) =>
			await f(value)
	;
	
	
	
	/**
	 * Log message
	 * @return fn
	 */
	pure fn log(string message = "") =>
		var (var value) use (message)
		{
			if (message == "")
			{
				log(value);
			}
			else
			{
				log(message);
			}
			return value;
		}
	;
	
	
	
	/**
	 * Function or
	 */
	pure fn or(Collection<fn> arr) =>
		bool (var item) use (arr)
		{
			for (int i=0; i<arr.count(); i++)
			{
				fn f = arr[i];
				bool res = f(item);
				if (res) return true;
			}
			return false;
		}
	;
	
	
	
	/**
	 * Function and
	 */
	pure fn and(Collection<fn> arr) =>
		bool (var item) use (arr)
		{
			for (int i=0; i<arr.count(); i++)
			{
				fn f = arr[i];
				bool res = f(item);
				if (not res) return false;
			}
			return true;
		}
	;
	
	
	
	/**
	 * Join
	 */
	pure fn join(string ch) => string (Collection items) use (ch) => rs::join(ch, items);
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

/* Math Functions */
class math
{
	
	/**
	 * Round double
	 */
	pure int round(double a)
	{
		#switch
		#case ifcode PHP then
		
		return round($a);
		
		#case ifcode JAVASCRIPT then
		
		return Math.round(a);
		
		#endswitch
	}
	
	
	/**
	 * Floor double
	 */
	pure int floor(double a)
	{
		#switch
		#case ifcode PHP then
		
		return floor($a);
		
		#case ifcode JAVASCRIPT then
		
		return Math.floor(a);
		
		#endswitch
	}
	
	
	/**
	 * Floor ceil
	 */
	pure int ceil(double a)
	{
		#switch
		#case ifcode PHP then
		
		return ceil($a);
		
		#case ifcode JAVASCRIPT then
		
		return Math.ceil(a);
		
		#endswitch
	}
	
	
	
	/**
	 * Returns max
	 */
	pure var max(var a, var b)
	{
		if (a > b) return a;
		else return b;
	}
	
	
	/**
	 * Returns min
	 */
	pure var min(var a, var b)
	{
		if (a < b) return a;
		else return b;
	}
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;


class io
{
	
	/**
	 * Print message to output
	 */
	static void print(string message, bool new_line = true, string type="")
	{
		var output = @.provider("output");
		output.print(message, new_line, type);
	}
	
	
	/**
	 * Print error message to output
	 */
	static void print_error(string message)
	{
		var output = @.provider("output");
		output.print_error(message);
	}
	
	
	/**
	 * Color message to output
	 */
	static void color(string color, string message)
	{
		var output = @.provider("output");
		return output.color(color, message);
	}
	
	
	/**
	 * Log message
	 */
	static void log(string type, string message)
	{
		var p = @.provider("log");
		p.log(type, message);
	}
	
	
	/**
	 * Read line from input
	 */
	static void input()
	{
		var input = @.provider("input");
		return input.input();
	}
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.Vector;


class re
{
	
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение
	 * @return Collection<string>
	 */
	pure string split(string delimiter, string s, int limit = -1)
	{
		#switch
		#case ifcode PHP then
		
		$arr = preg_split("/" . $delimiter . "/", $s, $limit);
		return Collection::from($arr);
		
		#case ifcode JAVASCRIPT then
		
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp(delimiter, "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.from(arr);
		
		#endswitch
	}
	
	
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return bool
	 */
	static bool match(string r, string s, string pattern="")
	{
		#switch
		
		#case ifcode PHP then
		
		$matches = [];
		if (preg_match("/" . $r . "/" . $pattern, $s, $matches))
		{
			return $matches != null;
		}
		
		return false;
		
		#case ifcode JAVASCRIPT then
		
		pattern = "g" + pattern;
		return s.match( new RegExp(r, pattern) ) != null;
		
		#endswitch
	}
	
	
	
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return Vector result
	 */
	static Collection<string> matchAll(string r, string s, string pattern="")
	{
		#switch
		
		#case ifcode PHP then
		
		$matches = [];
		if (preg_match_all("/" . $r . "/" . $pattern, $s, $matches))
		{
			$res = [];
			foreach ($matches as $index1 => $obj1)
			{
				foreach ($obj1 as $index2 => $val)
				{
					if (!isset($res[$index2])) $res[$index2] = [];
					$res[$index2][$index1] = $val;
				}
			}
			$res = array_map
			(
				function ($item) { return Collection::from($item); },
				$res
			);
			return Collection::from($res);
		}
		
		return null;
		
		#case ifcode JAVASCRIPT then
		
		pattern = "g" + pattern;
		
		var arr = [];
		var r = new RegExp(r, pattern);
		
		if (s.matchAll == undefined)
		{
			while ((m = r.exec(s)) !== null)
			{
				arr.push(m);
			}
		}
		else arr = [...s.matchAll(r)];
		
		if (arr.length == 0) return null;
		return Runtime.Collection.from( arr.map( (v) => Runtime.Collection.from(v) ) );
		
		#endswitch
		
		return null;
	}
	
	
	
	/**
	 * Replace with regular expression
	 * @param string r - regular expression
	 * @param string replace - new value
	 * @param string s - replaceable string
	 * @return string
	 */
	static string replace(var r, string replace, string s, string pattern="")
	{
		#switch
		
		#case ifcode PHP then
		return preg_replace("/" . $r . "/" . $pattern, $replace, $s);
		
		#case ifcode ES6 then
		pattern = "g" + pattern;
		return s.replace(new RegExp(r, pattern), replace);
		
		#case ifcode NODEJS then
		pattern = "g" + pattern;
		return s.replace(new RegExp(r, pattern), replace);
		
		#endswitch
	}
	
	
	
	
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.re;
use Runtime.rtl;
use Runtime.lib;
use Runtime.math;
use Runtime.Collection;
use Runtime.Vector;


class rs
{
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	static int strlen(string s)
	{
		#switch
		#case ifcode PHP then
		
		if (gettype($s) != "string") return 0;
		return @mb_strlen($s);
		
		#case ifcode JAVASCRIPT then
		
		return use("Runtime.rtl").toStr(s).length;
		
		#endswitch
	}
	
	
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	static string substr(string s, int start, int length = null)
	{
		#switch
		#case ifcode PHP then
		
		if ($length === null)
		{
			return mb_substr($s, $start);
		}
		return mb_substr($s, $start, $length);
		
		#case ifcode JAVASCRIPT then
		
		var _rtl = use("Runtime.rtl");
		var _rs = use("Runtime.rs");
		if (start < 0) start = s.length + start;
		if (length === null){
			return _rtl.toStr(s).substring(start);
		}
		var end = start + length;
		if (length < 0){
			var sz = _rs.strlen(s);
			end = sz + length;
		}
		return _rtl.toStr(s).substring(start, end);
		
		#endswitch
	}
	
	
	/**
	 * Returns char from string at the position
	 * @param string s The string
	 * @param int pos The position
	 * @return string
	 */
	static string charAt(string s, int pos)
	{
		return static::substr(s, pos, 1);
	}
	
	
	/**
	 * Returns ASCII symbol by code
	 * @param int code
	 */
	static int chr(int code)
	{
		#switch
		#case ifcode PHP then
		
		return mb_chr($code);
		
		#case ifcode JAVASCRIPT then
		
		return String.fromCharCode(code);
		
		#endswitch
	}
	
	
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	static int ord(char ch)
	{
		#switch
		#case ifcode PHP then
		
		return mb_ord($ch);
		
		#case ifcode JAVASCRIPT then
		
		return use("Runtime.rtl").toStr(ch).charCodeAt(0);
		
		#endswitch
	}
	
	
	/**
	 * Convert string to lower case
	 * @param string s
	 * @return string
	 */
	static string strtolower(string s)
	{
		#switch
		#case ifcode PHP then
		
		return mb_strtolower($s);
		
		#case ifcode JAVASCRIPT then
		
		return use("Runtime.rtl").toStr(s).toLowerCase();
		
		#endswitch
	}
	
	
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	static string strtoupper(string s)
	{
		#switch
		#case ifcode PHP then
		
		return mb_strtoupper($s);
		
		#case ifcode JAVASCRIPT then
		
		return use("Runtime.rtl").toStr(s).toUpperCase();
		
		#endswitch
	}
	
	
	/**
	 * Convert string to lower case
	 * @param string s
	 * @return string
	 */
	static string lower(string s)
	{
		#switch
		#case ifcode PHP then
		
		return mb_strtolower($s);
		
		#case ifcode JAVASCRIPT then
		
		return use("Runtime.rtl").toStr(s).toLowerCase();
		
		#endswitch
	}
	
	
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	static string upper(string s)
	{
		#switch
		#case ifcode PHP then
		
		return mb_strtoupper($s);
		
		#case ifcode JAVASCRIPT then
		
		return use("Runtime.rtl").toStr(s).toUpperCase();
		
		#endswitch
	}
	
	
	/**
	 * Заменяет одну строку на другую
	 */
	static int replace(string search, string item, string s)
	{
		#switch
		#case ifcode PHP then
		
		return str_replace($search, $item, $s);
		
		#case ifcode JAVASCRIPT then
		
		return s.replace(new RegExp(search, "g"), item);
		
		#endswitch
	}
	
	
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	static string str_repeat(string s, int n)
	{
		#switch
		#case ifcode PHP then
		
		if ($n <= 0) return "";
		return str_repeat($s, $n);
		
		#case ifcode JAVASCRIPT then
		
		if (n <= 0) return "";
		var res = '';
		for (var i=0; i < n; i++){
			res += s;
		}
		return res;
		
		#endswitch
	}
	
	
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение
	 * @return Collection<string>
	 */
	pure string split(string delimiter, string s, int limit = -1)
	{
		#switch
		#case ifcode PHP then
		
		$arr = [];
		if ($limit < 0) $arr = explode($delimiter, $s);
		else $arr = explode($delimiter, $s, $limit);
		return Collection::from($arr);
		
		#case ifcode JAVASCRIPT then
		
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return _Collection.from(arr);
		
		#endswitch
	}
	
	
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Collection<string>
	 */
	pure Collection<string> splitArr(Collection<string> delimiters, string s, int limit = -1)
	{
		#switch
		#case ifcode PHP then
		
		$pattern = "[".implode("", $delimiters->_getArr())."]";
		$pattern = str_replace("/", "\/", $pattern);
		$arr = preg_split("/".$pattern."/", $s, $limit);
		return Collection::from($arr);
		
		#case ifcode JAVASCRIPT then
		
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp("[" + delimiters.join("") + "]", "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.from(arr);
		
		#endswitch
	}
	
	
	/**
	 * Соединяет строки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	static string join(string ch, Collection<string> arr)
	{
		#switch
		#case ifcode PHP then
		
		if ($arr == null) return "";
		return implode($ch, $arr->_getArr());
		
		#case ifcode JAVASCRIPT then
		
		if (arr == null) return "";
		return Array.prototype.join.call(arr, ch);
		
		#endswitch
	}
	
	
	/**
	 * Join
	 */
	static string join_path(Collection arr)
	{
		string path = static::join("/", arr);
		path = re::replace("\\/+", "/", path);
		path = re::replace("\\/\\.\\/", "/", path);
		path = re::replace("\\/+$", "", path);
		return path;
	}
	
	
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	static string trim(string s, string ch = "")
	{
		#switch
		#case ifcode PHP then
		
		if ($ch=="")
			return trim($s);
		return trim($s, $ch);
		
		#case ifcode JAVASCRIPT then
		
		if (ch == undefined) ch = "";
		
		s = use("Runtime.rtl").toStr(s);
		
		if (ch == ""){
			return s.trim();
		}
		return s.replace(new RegExp("^[" + ch + "]+", "g"),"")
			.replace(new RegExp("[" + ch + "]+$", "g"),"")
		;
		
		#endswitch
	}
	
	
	/**
	 * Escape HTML special chars
	 * @param string s
	 * @return string
	 */
	pure string htmlEscape(string s)
	{
		#switch
		#case ifcode PHP then
		
		if ($s instanceof \Runtime\Collection) return $s;
		return htmlspecialchars($s, ENT_QUOTES | ENT_HTML401);
		
		#case ifcode JAVASCRIPT then
		
		if (s instanceof Runtime.Collection) return s;
		var obj = {
			"<":"&lt;",
			">": "&gt;", 
			"&": "&amp;",
			'"': '&quot;',
			"'": '&#39;',
			'`': '&#x60;',
			'=': '&#x3D;'
		};
		return (new String(s)).replace(/[<>&"'`=]/g, function(v){ return obj[v]; });
		
		#endswitch
	}
	pure string escapeHtml(string s) => static::htmlEscape(s);
	
	
	/**
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
	static Dict pathinfo(string filepath)
	{
		Vector<string> arr1 = static::explode(".", filepath).toVector();
		Vector<string> arr2 = static::explode("/", filepath).toVector();
		
		string filepath = filepath;
		string extension = arr1.popValue();
		string basename = arr2.popValue();
		string dirname = static::join("/", arr2);
		
		int ext_length = static::strlen(extension);
		if (ext_length > 0) ext_length++;
		string filename = static::substr(basename, 0, -1*ext_length);
		
		delete arr1;
		delete arr2;
		
		return
		{
			"filepath": filepath,
			"extension": extension,
			"basename": basename,
			"dirname": dirname,
			"filename": filename,
		};
	}
	
	
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	static string filename(string filepath)
	{
		Dict ret = static::pathinfo(filepath);
		string res = ret["basename"];
		string ext = ret["extension"];
		if (ext != "")
		{
			int sz = 0 - rs::strlen(ext) - 1;
			res = rs::substr(res, 0, sz);
		}
		delete ret;
		return res;
	}
	
	
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	static string basename(string filepath)
	{
		Dict ret = static::pathinfo(filepath);
		string res = ret["basename"];
		delete ret;
		return res;
	}
	
	
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	static string extname(string filepath)
	{
		Dict ret = static::pathinfo(filepath);
		string res = ret["extension"];
		delete ret;
		return res;
	}
	
	
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	static string dirname(string filepath)
	{
		Dict ret = static::pathinfo(filepath);
		string res = ret["dirname"];
		delete ret;
		return res;
	}
	
	
	/**
	 * New line to br
	 */
	static string nl2br(string s)
	{
		return static::replace("\n", "<br/>", s);
	}
	
	
	/**
	 * Remove spaces
	 */
	static string spaceless(string s)
	{
		s = re::replace("\s+", " ", s);
		s = re::replace("\t", "", s);
		s = re::replace("\n", "", s);
		return s;
	}
	
	
	/**
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	static int indexOf(string s, string search, string offset = 0)
	{
		#switch
		#case ifcode PHP then
		
		if ($search == ""){
			return -1;
		}
		$res = mb_strpos($s, $search, $offset);
		if ($res === false)
			return -1;
		return $res;
		
		#case ifcode JAVASCRIPT then
		
		var _rtl = use("Runtime.rtl");
		
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toStr(s).indexOf(search);
		return res;
		
		#endswitch
	}
	static int strpos(string s, string search, string offset = 0)
		=> static::indexOf(s, search, offset);
	
	
	/**
	 * URL encode
	 * @param string s
	 * @return string
	 */
	static string url_encode(string s)
	{
		#switch
		#case ifcode PHP then
		return urlencode($s);
		#case ifcode JAVASCRIPT then
		return encodeURIComponent(s);
		#endswitch
	}
	
	
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	static string base64_encode(string s)
	{
		#switch
		#case ifcode PHP then
		return base64_encode($s);
		#case ifcode ES6 then
		return window.btoa(window.unescape(window.encodeURIComponent(s)));
		#case ifcode NODEJS then
		return Buffer.from(s).toString('base64');
		#endswitch
	}
	
	
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	static string base64_decode(string s)
	{
		#switch
		#case ifcode PHP then
		return base64_decode($s);
		#case ifcode ES6 then
		return window.decodeURIComponent(window.escape(window.atob(s)));
		#case ifcode NODEJS then
		return Buffer.from(s, 'base64').toString('ascii');
		#endswitch
	}
	
	
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	static string base64_encode_url(string s)
	{
		#switch
		#case ifcode PHP then
	
		$s = base64_encode($s);
		$s = str_replace('+', '-', $s);
		$s = str_replace('/', '_', $s);
		$s = str_replace('=', '', $s);
		return $s;
	
		#case ifcode ES6 then
		s = this.base64_encode(ctx, s)
			.replace(new RegExp('\\+', 'g'), '-')
			.replace(new RegExp('\\/', 'g'), '_')
			.replace(new RegExp('=', 'g'), '')
		;
		return s;
		#case ifcode NODEJS then
		return Buffer.from(s).toString('base64');
		#endswitch
	}
	
	
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	static string base64_decode_url(string s)
	{
		#switch
		#case ifcode PHP then
		$c = 4 - strlen($s) % 4;
		if ($c < 4 && $c > 0) $s .= str_repeat('=', $c);
		$s = str_replace('-', '+', $s);
		$s = str_replace('_', '/', $s);
		return base64_decode($s);
		#case ifcode ES6 then
		var c = 4 - s.length % 4;
		if (c < 4 && c > 0) s = s + '='.repeat(c);
		s = s.replace(new RegExp('-', 'g'), '+')
			.replace(new RegExp('_', 'g'), '/')
		;
		return this.base64_decode(ctx, s);
		#case ifcode NODEJS then
		return Buffer.from(s, 'base64').toString('ascii');
		#endswitch
	}
	
	
	/**
	 * Parser url
	 * @param string s The string
	 * @return int
	 */
	static Dict parse_url(string s)
	{
		int pos;
		string uri, query, hash;
		
		pos = static::strpos(s, "#");
		s = (pos >= 0) ? static::substr(s, 0, pos) : s;
		hash = (pos >= 0) ? static::substr(s, pos + 1) : "";
		pos = static::strpos(s, "?");
		uri = (pos >= 0) ? static::substr(s, 0, pos) : s;
		query = (pos >= 0) ? static::substr(s, pos + 1) : "";
		Collection arr = static::explode("&", query);
		
		Dict arr2 = arr
			.filter( bool (string s) => s != "" )
			.transition(
				list (string item)
				{
					Collection arr = static::explode("=", item);
					return [arr[1], arr[0]];
				}
			)
		;
		
		return {
			"uri": uri,
			"query": query,
			"query_arr": arr2,
			"hash": hash,
		};
	}
	
	
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	static string url_get_add(string s, string key, string value)
	{
		Dict r = static::parse_url(s);
		
		string s1 = r["uri"];
		string s2 = r["query"];
		bool find = false;
		
		Collection arr = static::explode("&", s2);
		arr = arr
			.map
			(
				string (string s) use (key, value, find)
				{
					Collection arr = static::explode("=", s);
					if (arr[0] == key)
					{
						find = true;
						if (value != "") return key ~ "=" ~ static::htmlEscape(value);
						return "";
					}
					return s;
				}
			)
			.filter( bool (string s) => s != "" )
		;
		
		if (not find and value != "")
		{
			arr = arr.appendIm(key ~ "=" ~ static::htmlEscape(value));
		}
		
		s = s1;
		s2 = static::join("&", arr);
		if (s2 != "") s = s ~ "?" ~ s2;
		
		return s;
	}
	
	
	/**
	 * Strip tags
	 */
	pure string strip_tags(string content, Collection<string> allowed_tags = null)
	{
		if (allowed_tags == null)
		{
			content = re::replace("<[^>]+>", "", content);
			content = rs::trim(rs::spaceless(content));
			return content;
		}
		
		Collection matches = re::matchAll("<[^>]+>", content, "i");
		if (matches)
		{
			for (int i=0; i<matches.count(); i++)
			{
				Collection match = matches[i];
				string tag_str = match[0];
				
				Collection tag_match = re::matchAll("<(\/|)([a-zA-Z]+)(|[^>]*)>", tag_str, "i");
				if (tag_match)
				{
					string tag_name = static::strtolower(tag_match[0][2]);
					if (allowed_tags.indexOf(tag_name) == -1)
					{
						content = static::replace(tag_str, "", content);
					}
				}
			}
		}
		
		content = rs::trim(rs::spaceless(content));
		return content;
	}
	
	
	/* =================== Deprecated =================== */
	
	
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	static Vector<string> explode(string delimiter, string s, int limit = -1)
	{
		#switch
		#case ifcode PHP then
		
		$arr = [];
		if ($limit < 0) $arr = explode($delimiter, $s);
		else $arr = explode($delimiter, $s, $limit);
		return Collection::from($arr);
		
		#case ifcode JAVASCRIPT then
		
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return _Collection.from(arr);
		
		#endswitch
	}
	
	
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	static string implode(string ch, Vector<string> arr)
	{
		#switch
		#case ifcode PHP then
		
		return implode($s, $arr->_getArr());
		
		#case ifcode JAVASCRIPT then
		
		return arr.join(ctx, ch);
		
		#endswitch
	}
	
	
	/**
	 * Returns relative path of the filepath
	 * @param string filepath
	 * @param string basepath
	 * @param string ch - Directory separator
	 * @return string relative path
	 */
	static string relativePath(string filepath, string basepath, string ch = "/")
	{
		Vector<string> source = rs::explode(ch, filepath);
		Vector<string> base = rs::explode(ch, basepath);
		
		source = source.filter(bool (string s){ return s != ""; });
		base = base.filter(bool (string s){ return s != ""; });
		
		int i=0;
		while (source.count() > 0 and base.count() > 0 and source.item(0) == base.item(0))
		{
			source.shift();
			base.shift();
		}
		
		base.each(
			void (string s) use (source)
			{
				source.unshift("..");
			}
		);
		
		return rs::implode(ch, source);
	}
	
	
	/**
	 * Return normalize path
	 * @param string filepath - File path
	 * @return string
	 */
	static string normalize(string filepath)
	{
		return filepath;
	}
	
	
	/**
	 * json encode scalar values
	 * @param {mixed} obj - объект
	 * @param {int} flags - Флаги
	 * @return {string} json строка
	 */
	static string json_encode_primitive(var s, int flags)
	{

		#switch
		#case ifcode PHP then
		
		$flags = $flags || JSON_UNESCAPED_UNICODE;
		return json_encode($s, JSON_UNESCAPED_UNICODE);
		
		#case ifcode JAVASCRIPT then
		
		if (flags & 128 == 128) 
			return JSON.stringify(obj, null, 2);
		return JSON.stringify(obj);
		
		#endswitch
	}
	
	
	/**
	 * Search 'search' in s.
	 */
	static int search(string s, string search, string offset = 0)
	{
		#switch
		#case ifcode PHP then
		
		if ($search == ""){
			return -1;
		}
		$res = mb_strpos($s, $search, $offset);
		if ($res === false)
			return -1;
		return $res;
		
		#case ifcode JAVASCRIPT then
		
		var _rtl = use("Runtime.rtl");
		var res = _rtl.toStr(s).indexOf(search);
		return res;
		
		#endswitch
	}
	
	
	/**
	 * Is start
	 */
	pure bool start(string s, string search) => static::search(s, search) == 0;
	
	
	/**
	 * Hex decode
	 */
	pure int hexdec(string s)
	{
		#switch
		
		#case ifcode PHP then
		return hexdec($s);
		
		#case ifcode JAVASCRIPT then
		return parseInt(s, 16);
		
		#endswitch
	}
	
	
	/**
	 * From rgb
	 */
	pure list rgbToInt(string color)
	{
		string ch = static::substr(color, 0, 1);
		if (ch == "#") color = static::substr(color, 1);
		
		string r = "";
		string g = "";
		string b = "";
		
		int sz = static::strlen(color);
		if (sz == 3)
		{
			r = rs::substr(color, 0, 1); r ~= r;
			g = rs::substr(color, 1, 1); g ~= g;
			b = rs::substr(color, 2, 1); b ~= b;
		}
		else if (sz == 6)
		{
			r = rs::substr(color, 0, 2);
			g = rs::substr(color, 2, 2);
			b = rs::substr(color, 4, 2);
		}
		
		r = static::hexdec(r);
		g = static::hexdec(g);
		b = static::hexdec(b);
		
		return [r, g, b];
	}
	
	
	/**
	 * From rgb
	 */
	pure string intToRgb(int r, int g, int b)
	{
		#switch
		
		#case ifcode PHP then
		return sprintf("%02x%02x%02x", $r, $g, $b);
		
		#case ifcode JAVASCRIPT then
		
		r = r.toString(16).padStart(2, '0');
		g = g.toString(16).padStart(2, '0');
		b = b.toString(16).padStart(2, '0');
		
		return r + g + b;
		
		#endswitch
	}
	
	
	/**
	 * Brightness
	 */
	static string brightness(string color, int percent)
	{
		Collection color = static::rgbToInt(color);
		
		int r = color[0];
		int g = color[1];
		int b = color[2];
		
		r = math::round(r + (r * percent / 100));
		g = math::round(g + (g * percent / 100));
		b = math::round(b + (b * percent / 100));
		
		if (r > 255) r = 255;
		if (g > 255) g = 255;
		if (b > 255) b = 255;
		if (r < 0) r = 0;
		if (g < 0) g = 0;
		if (b < 0) b = 0;
		
		return "#" ~ static::intToRgb(r,g,b);
	}
	
	
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	static memorize string hash(string s)
	{
		string r = "";
		string a = "1234567890abcdef";
		int sz = rs::strlen(s);
		int h = 0;
		for (int i=0; i<sz; i++)
		{
			int c = rs::ord( rs::substr(s, i, 1) );
			h = ((h << 2) + (h >> 14) + c) & 65535;
		}
		int p = 0;
		while (h != 0 or p < 4)
		{
			int c = h & 15;
			h = h >> 4;
			r ~= rs::substr(a, c, 1);
			p = p + 1;
		}
		return r;
	}
	
	
	/**
	 * Returns css hash
	 */
	pure memorize string getCssHash(string class_name) =>
		rtl::getParents(class_name)
			|> .filter
			(
				bool (string class_name) =>
					class_name != "Runtime.BaseObject" and
					class_name != "Runtime.Web.Component"
			)
			|> .map
			(
				string (string class_name) => "h-" ~ static::hash(class_name)
			)
			|> lib::join(" ")
		;
	
	
	/**
	 * Escape html
	 */
	pure string _escape_html(var s)
	{
		#switch
		#case ifcode PHP then
		if (gettype($s) == "array") return $s;
		if ($s instanceof \Runtime\RawString) return $s;
		#endswitch
		if (rtl::isString(s)) return rs::escapeHtml(s);
		if (s instanceof Collection) return rs::join("", s);
		return rs::escapeHtml( rtl::toString(s) );
	}
	
	
	/**
	 * To html
	 */
	pure string _to_html(var s)
	{
		return s;
	}
	
	
	/**
	 * Concat attr
	 */
	pure Dict _concat_attrs(Dict arr1, var arr2)
	{
		if (rtl::isString(arr2)) arr2 = [ arr2 ];
		return arr1 != null ? arr1.concat(arr2) : arr2;
	}
	
	
	/**
	 * Merge attrs
	 */
	pure Dict _merge_attrs(Dict res, Dict attr2)
	{
		if (not rtl::exists(attr2)) return res;
		#ifcode JAVASCRIPT then
		return Object.assign(res, attr2.toObject());
		#endif
		return res;
	}
	
	
	/**
	 * Join attrs to string
	 */
	pure string _join_attrs(Dict attrs) =>
		rtl::exists(attrs) ?
			rs::join
			(
				" ",
				attrs.map(
					string (string k, string v) => k ~ "= '" ~ static::_escape_attr(v) ~ "'"
				)
			) : ""
	;
	
	
	/**
	 * Escape attr
	 */
	pure string _escape_attr(var s)
	{
		if (s instanceof Dict)
		{
			s = s.reduce
			(
				string (string s, string val, string key) => s ~ key ~ ":" ~ val ~ ";",
				""
			);
		}
		return rs::escapeHtml(s);
	}
	
	
	#ifcode PHP then
	static function _p(&$arr1, $s)
	{
		if (gettype($s) == "string" || $s instanceof \Runtime\RawString)
		{
			$arr1[] = $s;
		}
		if (gettype($s) == "array")
		{
			foreach ($s as $v) $arr1[] = $v;
		}
	}
	#endif
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
 
namespace Runtime;

use Runtime.rtl;
use Runtime.Exceptions.IndexOutOfRange;
use Runtime.Exceptions.RuntimeException;


abstract class _Collection{}

#switch
#case ifcode JAVASCRIPT then
if (typeof Runtime == 'undefined') Runtime = {};
Runtime._Collection = function()
{
	Array.call(this);
	if (arguments.length > 0)
	{
		var start=1;
		if (!Runtime.rtl.is_context()) start=0;
		for (var i=start; i<arguments.length; i++)
		{
			Array.prototype.push.call(this, arguments[i]);
		}
	}
	this.__uq__ = Symbol();
}
Runtime._Collection.prototype = Object.create(Array.prototype);
Runtime._Collection.prototype.constructor = Runtime._Collection;
Object.assign(Runtime._Collection.prototype,
{
	toArray: function()
	{
		return Array.prototype.slice.call(this);
	},
	toStr: function(value)
	{
		return use("Runtime.rtl").toStr(value);
	}
});
Object.assign(Runtime._Collection,
{
	from: function(arr)
	{
		var res = this.Instance();
		if (arr == undefined && arr == null) return this.Instance();
		
		if (arr instanceof Array)
		{
			var new_arr = arr.slice();
			Object.setPrototypeOf(new_arr, this.prototype);
			return new_arr;
		}
		
		var res = this.Instance();
		if (
			arr instanceof Int8Array ||
			arr instanceof Uint8Array ||
			arr instanceof Int16Array ||
			arr instanceof Uint16Array ||
			arr instanceof Int32Array ||
			arr instanceof Uint32Array ||
			arr instanceof Float32Array ||
			arr instanceof Float64Array
		)
		{
			for (var i=0; i<arr.length; i++)
			{
				Array.prototype.push.call(res, arr[i]);
			}
		}
		
		return res;	
	},
	getNamespace: function(){ return "Runtime"; },
	getClassName: function(){ return "Runtime._Collection"; },
	getParentClassName: function(){ return ""; },
});
#case ifcode NODEJS then
use.add(Runtime._Collection);
#case ifcode PHP then
class _Collection implements \ArrayAccess, \JsonSerializable
{
	var $_arr = [];
	
	
	/**
	 * From
	 */
	static function from($arr)
	{
		$class_name = static::class;
		$res = new $class_name();
		if ($arr != null)
		{
			if ($arr instanceof \Runtime\Collection)
			{
				$res->_arr = $arr->_arr;
			}
			else if (gettype($arr) == 'array') $res->_arr = $arr;
		}
		return $res;	
	}
	
	
	/**
	 * JsonSerializable
	 */
	function jsonSerialize()
	{
		return $this->_arr;
	}
	
	
	/**
	 * Constructor
	 */
	function __construct()
	{
		$count = func_get_args();
		if ($count > 0)
		{
			$start = 1;
			if (!\Runtime\rtl::is_context()) $start = 0;
			$this->_arr = array_slice($count, $start);
		}
	}
	
	
	/**
	 * Destructor
	 */
	function __destruct()
	{
		unset($this->_arr);
	}
	
	
	/**
	 * Get array
	 */
	function _getArr()
	{
		return $this->_arr;
	}
	
	
	/**
	 * Get and set methods
	 */
	function __isset($k){return isset($this->_arr[$k]);}
	function __get($k){return $this->item(\Runtime\rtl::getContext(), $k);}
	function __set($k,$v){
		throw new \Runtime\Exceptions\AssignStructValueError(\Runtime\rtl::getContext(), $k);
	}
	function __unset($k){
		throw new \Runtime\Exceptions\AssignStructValueError(\Runtime\rtl::getContext(), $k);
	}
	function offsetExists($k){return isset($this->_arr[$k]);}
	function offsetGet($k){return $this->item(\Runtime\rtl::getContext(), $k);}
	function offsetSet($k,$v){
		throw new \Runtime\Exceptions\AssignStructValueError(\Runtime\rtl::getContext(), $k);
	}
	function offsetUnset($k){
		throw new \Runtime\Exceptions\AssignStructValueError(\Runtime\rtl::getContext(), $k);
	}
	
	
	/* Class name */
	static function getClassName(){return "Runtime._Collection";}
	static function getParentClassName(){return "";}
	
}

#endswitch


class Collection<T> extends _Collection
{
	
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static Collection<T> Instance()
	{
		return new Collection();
	}
	
	
	
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static Collection<T> create(var arr)
	{
		#switch
		#case ifcode JAVASCRIPT then
		return this.from(arr);
		#case ifcode PHP then
		return static::from($arr);
		#endswitch
	}
	
	
	
	/**
	 * Returns copy of Collection
	 * @param int pos - position
	 */
	Collection<T> cp()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = Array.prototype.slice.call(this);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
		#case ifcode PHP then
		$class_name = static::class;
		$arr2 = new $class_name();
		if ($this->_arr == null) $arr2->_arr = [];
		else $arr2->_arr = array_slice($this->_arr, 0);
		return $arr2;
		#endswitch
	}
	
	
	
	/**
	 * Convert to collection
	 */
	Collection<T> toCollection()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, Runtime.Collection.prototype);
		return obj;
		#case ifcode PHP then
		return \Runtime\Collection::from($this);
		#endswitch
	}
	
	
	
	/**
	 * Convert to vector
	 */
	Vector<T> toVector()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, use("Runtime.Vector").prototype);
		return obj;
		#case ifcode PHP then
		return \Runtime\Vector::from($this);
		#endswitch
	}
	
	
	
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	T get(int pos, T default_value = null)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (pos < 0 || pos >= this.length) return default_value;
		var val = this[pos];
		return val;
		#case ifcode PHP then
		if ($pos < 0 || $pos >= count($this->_arr)) return $default_value;
		$val = isset($this->_arr[$pos]) ? $this->_arr[$pos] : $default_value;
		return $val;
		#endswitch
	}
	
	
	
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	T item(int pos)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(ctx, pos);
		}
		return this[pos];
		#case ifcode PHP then
		if (!array_key_exists($pos, $this->_arr))
		{
			throw new \Runtime\Exceptions\IndexOutOfRange($ctx, $pos);
		}
		return $this->_arr[$pos];
		#endswitch
	}
	
	
	
	/**
	 * Returns count items in vector
	 */
	int count()
	{
		#switch
		#case ifcode JAVASCRIPT then
		return this.length;
		#case ifcode PHP then
		return count($this->_arr);
		#endswitch
	}
	
	
	
	/**
	 * Find value in array. Returns -1 if value not found.
	 * @param T value
	 * @return  int
	 */
	int indexOf(T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		for (var i=0; i<this.count(ctx); i++)
		{
			if (this[i] == value)
				return i;
		}
		return -1;
		#case ifcode PHP then
		$pos = array_search($value, $this->_arr, true);
		if ($pos === false) return -1;
		return $pos;
		#endswitch
	}
	
	
	
	/**
	 * Find value in array, and returns position. Returns -1 if value not found.
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return  int
	 */
	int indexOfRange(T value, int pos_begin, int pos_end)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var pos = Array.prototype.indexOf.call(this, value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
		#case ifcode PHP then
		$pos = $this->indexOf($ctx, $value);
		if ($pos == -1 or $pos > $pos_end or $pos < $pos_begin)
			return -1;
		return $pos;
		#endswitch
	}
	
	
	
	/**
	 * Get first item
	 */
	T first(T default_value = null)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (this.length == 0) return default_value;
		return this[0];
		#case ifcode PHP then
		$c = count($this->_arr);
		if ($c == 0) return $default_value;	
		return $this->_arr[0];
		#endswitch
	}
	
	
	
	/**
	 * Get last item
	 */
	T last(T default_value = null, int pos = -1)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (pos == undefined) pos = -1;
		if (this.length == 0) return default_value;
		if (this.length + pos + 1 == 0) return default_value;
		return this[this.length + pos];
		#case ifcode PHP then
		$c = count($this->_arr);
		if ($c == 0) return $default_value;
		if ($c + $pos + 1 == 0) return $default_value;
		return isset( $this->_arr[$c+$pos] ) ? $this->_arr[$c+$pos] : $default_value;
		#endswitch
	}
	
	
	
	/**
	 * Get last item
	 */
	T getLastItem(T default_value = null, int pos = -1)
	{
		return this.last(default_value, pos);
	}
	
	
	
	/**
	 * Append value to the end of the Collection and return new Collection
	 * @param T value
	 */
	Collection<T> pushIm(T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = this.cp();
		Array.prototype.push.call(arr, value);
		return arr;
		#case ifcode PHP then
		$res = $this->cp($ctx);
		$res->_arr[] = $value;
		return $res;
		#endswitch
	}
	Collection<T> push(T value)
	{
		throw new RuntimeException("Deprecated Collection push");
	}
	Collection<T> push1(T value) => this.pushIm(value);
	Collection<T> append1( T value) => this.push(value);
	Collection<T> appendIm(T value) => this.pushIm(value);
	
	
	
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	Collection<T> unshiftIm(T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = this.cp();
		Array.prototype.unshift.call(arr, value);
		return arr;
		#case ifcode PHP then
		$res = $this->cp($ctx);
		array_unshift($res->_arr, $value);
		return $res;
		#endswitch
	}
	Collection<T> unshift(T value)
	{
		throw new RuntimeException("Deprecated Collection unshift");
	}
	Collection<T> unshift1(T value) => this.unshiftIm(value);
	Collection<T> prepend1(T value) => this.unshift(value);
	Collection<T> prependIm(T value) => this.unshiftIm(value);
	Collection<T> prepend(T value) => this.unshiftIm(value);
	
	
	
	/**
	 * Extract last value from array
	 * @return T value
	 */
	Collection<T> removeLastIm()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = Array.prototype.slice.call(this, 0, -1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
		#case ifcode PHP then
		$res = $this->cp($ctx);
		array_pop($res->_arr);
		return $res;
		#endswitch
	}
	Collection<T> removeLast(T value) => this.removeLastIm(value);
	
	
	
	/**
	 * Extract first value from array
	 * @return T value
	 */
	Collection<T> removeFirstIm()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = Array.prototype.slice.call(this, 1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
		#case ifcode PHP then
		$res = $this->cp($ctx);
		array_shift($res->_arr);
		return $res;
		#endswitch
	}
	Collection<T> removeFirst(T value) => this.removeFirstIm(value);
	
	
	
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	Collection<T> insertIm(int pos, T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = this.cp(ctx);
		arr.splice(pos, 0, value);
		return arr;
		#case ifcode PHP then
		$res = $this->cp($ctx);
		array_splice($res->_arr, $pos, 0, [$value]);
		return $res;
		#endswitch
	}
	Collection<T> insert(T value) => this.insertIm(value);
	
	
	
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	Collection<T> removeIm(int pos, int count = 1)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (count == undefined) count = 1;
		var arr = this.cp(ctx);
		arr.splice(pos, count);
		return arr;
		#case ifcode PHP then
		$res = $this->cp($ctx);
		array_splice($res->_arr, $pos, $count);
		return $res;
		#endswitch
	}
	Collection<T> remove1(T value) => this.removeIm(value);
	
	
	
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	Collection<T> removeRangeIm(int pos_begin, int pos_end)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = this.cp(ctx);
		arr.splice(pos_begin, pos_end - pos_begin + 1);
		return arr;
		#case ifcode PHP then
		$res = $this->cp($ctx);
		$res->removeIm($pos_begin, $pos_end - $pos_begin + 1);
		return $res;
		#endswitch
	}
	Collection<T> removeRange(T value) => this.removeRangeIm(value);
	
	
	
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	Collection<T> setIm(int pos, T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(ctx, pos);
		}
		var arr = this.cp(ctx);
		arr[pos] = value;
		return arr;
		#case ifcode PHP then
		if (!array_key_exists($pos, $this->_arr))
			throw new \Runtime\Exceptions\IndexOutOfRange($ctx, $pos);
		$res = $this->cp($ctx);
		$res->_arr[$pos] = $value;
		return $res;
		#endswitch
	}
	Collection<T> set(T value)
	{
		throw new RuntimeException("Deprecated Collection set");
	}
	Collection<T> set1(T value) => this.setIm(value);
	
	
	
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	Collection<T> concatIm(Collection<T> arr)
	{
		if (arr == null) return this;
		if (not (rtl::isArray(arr))) arr = [ arr ];
		#switch
		#case ifcode JAVASCRIPT then
		if (arr.length == 0) return this;
		var res = this.cp(ctx);
		for (var i=0; i<arr.length; i++)
		{
			Array.prototype.push.call(res, arr[i]);
		}
		return res;
		#case ifcode PHP then
		if (!$arr) return $this;
		if (count($arr->_arr) == 0) return $this;
		$res = $this->cp($ctx);
		foreach ($arr->_arr as $item)
		{
			$res->_arr[] = $item;
		}
		return $res;
		#endswitch
	}
	Collection<T> appendCollection1(Collection<T> arr) => this.concatIm(arr);
	Collection<T> concat(Collection<T> arr) => this.concatIm(arr);
	
	
	
	/**
	 * Prepend vector to the begin of the vector
	 * @param Collection<T> arr
	 */
	Collection<T> prependCollectionIm(Collection<T> arr)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.cp(ctx);
		for (var i=arr.length-1; i>=0; i--)
		{
			Array.prototype.unshift.call(res, arr[i]);
		}
		return res;
		#case ifcode PHP then
		if (!$arr) return $this;
		$res = $this->cp($ctx);
		$sz = count($arr->_arr);
		for ($i=$sz-1; $i>=0; $i--)
		{
			array_unshift($res->_arr, $arr->_arr[$i]);
		}
		return $res;
		#endswitch
	}
	Collection<T> prependCollection1(Collection<T> arr) =>
		this.prependCollectionIm(arr)
	;
	
	
	
	/**
	 * Remove value
	 */
	Collection<T> removeItemIm(T value)
	{
		var index = this.indexOf(value);
		if (index != -1) return this.removeIm(index);
		return this;
	}
	Collection<T> removeItem(T value) => this.removeItemIm(value);
	
	
	
	/**
	 * Remove value
	 */
	Collection<T> removeItemsIm(Collection<T> values)
	{
		var res = this;
		for (var i=0; i<values.count(); i++)
		{
			res = res.removeItem( values.item(i) );
		}
		return res;
	}
	Collection<T> removeItems(Collection<T> values) => this.removeItemsIm(values);
	
	
	/**
	 * Find value and remove
	 */
	Collection<T> findAndRemove(fn f)
	{
		var index = this.find(f);
		if (index != -1) return this.removeIm(index);
		return this;
	}
	
	
	/**
	 * Map
	 * @param fn f
	 * @return Collection
	 */
	Collection<T> map(fn f)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = this.cp(ctx);
		for (var i=0; i<arr.length; i++)
		{
			if (f instanceof Runtime.Callback)
			{
				arr[i] = f.call(ctx, [arr[i], i]);
			}
			else arr[i] = f(ctx, arr[i], i);
		}
		return arr;
		#case ifcode PHP then
		$arr2 = $this->cp($ctx);
		foreach ($this->_arr as $key => $value)
		{
			$arr2->_arr[$key] = $f($ctx, $value, $key);
		}
		return $arr2;
		#endswitch
	}
	
	
	
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	Collection<T> filter(fn f)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var res = this.constructor.Instance(ctx);
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			var flag = (f instanceof Runtime.Callback)
				? f.call(ctx, [item, i])
				: f(ctx, item, i)
			;
			if (flag)
			{
				Array.prototype.push.call(res, item);
			}
		}
		return res;
		#case ifcode PHP then
		$arr2 = static::Instance($ctx);
		foreach ($this->_arr as $key => $value)
		{
			if ( $f($ctx, $value, $key) )
			{
				$arr2->_arr[] = $value;
			}
		}
		return $arr2;
		#endswitch
	}
	
	
	
	/**
	 * Transition Collection to Dict
	 * @param fn f
	 * @return Dict
	 */
	Collection<T> transition(fn f)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var Dict = use("Runtime.Dict");
		var d = new Dict(ctx);
		for (var i=0; i<this.length; i++)
		{
			var value = this[i];
			var p = f(ctx, value, i);
			d[p[1]] = p[0];
		}
		return d;
		#case ifcode PHP then
		$d = new \Runtime\Dict($ctx);
		foreach ($this->_arr as $key => $value)
		{
			$p = $f($ctx, $value, $key);
			$d->_map[$p->_arr[1]] = $p->_arr[0];
		}
		return $d;
		#endswitch
	}
	
	
	
	/**
	 * Reduce
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	var reduce(fn f, var init_value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			init_value = f(ctx, init_value, item, i);
		}
		return init_value;
		#case ifcode PHP then
		foreach ($this->_arr as $key => $value)
		{
			$init_value = $f($ctx, $init_value, $value, $key);
		}
		return $init_value;
		#endswitch
	}
	
	
	
	/**
	 * Call function for each item
	 * @param fn f
	 */
	Collection<T> each(fn f)
	{
		#switch
		#case ifcode JAVASCRIPT then
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			f(ctx, item, i);
		}
		#case ifcode PHP then
		foreach ($this->_arr as $key => $value)
		{
			$f($ctx, $value, $key);
		}
		#endswitch
	}
	
	
	/**
	 * flatten Collection
	 */
	Collection<T> flatten()
	{
		#switch
		#case ifcode JAVASCRIPT then
		let res = [];
		
		for (var i=0; i<this.length; i++)
		{
			let item = this[i];
			if (item instanceof Runtime.Collection)
			{
				item = item.flatten();
				res = res.concat( item );
			}
			else
			{
				res.push(item);
			}
		}
		
		Object.setPrototypeOf(res, this.constructor.prototype);
		return res;
		
		#case ifcode PHP then
		
		throw new \Exception("Flatten error");
		
		#endswitch
	}
	
	
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	Collection<T> intersect(Collection<T> arr)
	{
		return this.filter( bool (var item) use (arr) => arr.indexOf(item) >= 0 );
	}
	
	
	
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	Collection<T> slice(int offset, int length = null)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (offset == undefined) offset = 0;
		if (length == undefined)
		{
			if (offset <= 0) return this;
			var arr = Array.prototype.slice.call(this, offset);
			Object.setPrototypeOf(arr, this.constructor.prototype);
			return arr;
		}
		if (offset <= 0 && length == this.length) return this;
		if (length >= 0)
		{
			length = offset + length;
		}
		var arr = Array.prototype.slice.call(this, offset, length);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
		#case ifcode PHP then
		if ($offset <= 0) $offset = 0;
		$arr2 = static::Instance($ctx);
		$arr2->_arr = array_slice($this->_arr, $offset, $length);
		return $arr2;
		#endswitch
	}
	
	
	
	/**
	 * Reverse array
	 */
	Collection<T> reverseIm()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = this.cp(ctx);
		Array.prototype.reverse.call(arr);
		return arr;
		#case ifcode PHP then
		$arr2 = $this->cp($ctx);
		$arr2->_arr = array_reverse($arr2->_arr);
		return $arr2;
		#endswitch
	}
	Collection<T> reverse() => this.reverseIm();
	
	
	
	/**
	 * Sort vector
	 * @param fn f - Sort user function
	 */
	Collection<T> sortIm(fn f = null)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var arr = this.cp(ctx);
		if (f == undefined) Array.prototype.sort.call(arr);
		else
		{
			var f1 = (a, b) => { return f(ctx, a, b); };
			Array.prototype.sort.call(arr, f1);
		}
		return arr;
		#case ifcode PHP then
		$res = $this->cp($ctx);
		if ($f == null)
		{
			asort($res->_arr);
		}
		else
		{
			$f1 = function($a, $b) use ($ctx, $f){ return $f($ctx, $a, $b); };
			usort($res->_arr, $f1);
		}
		$res->_arr = array_values($res->_arr);
		return $res;
		#endswitch
	}
	Collection<T> sort(fn f = null) => this.sortIm(f);
	
	
	
	/**
	 * Remove dublicate values
	 */
	Collection<T> removeDuplicatesIm()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var res = this.constructor.Instance(ctx);
		for (var i=0; i<this.length; i++)
		{
			var p = res.indexOf(ctx, this[i]);
			if (p == -1)
			{
				Array.prototype.push.call(res, this[i]);
			}
		}
		return res;
		#case ifcode PHP then
		$arr = []; $sz = count($this->_arr);
		for ($i=0; $i<$sz; $i++)
		{			
			$value = $this->_arr[$i];
			$pos = array_search($value, $arr, true);
			if ($pos === false)
			{
				$arr[] = $value;
			}
		}
		$res = static::Instance($ctx);
		$res->_arr = $arr;
		return $res;
		#endswitch
	}
	Collection<T> removeDuplicates() => this.removeDuplicatesIm();
	
	
	
	/**
	 * Find item pos
	 * @param fn f - Find function
	 * @return int - position
	 */
	int find(fn f)
	{
		#switch
		#case ifcode JAVASCRIPT then
		for (var i=0; i<this.length; i++)
		{
			var flag = f(ctx, this[i]);
			if (flag) return i;
		}
		return -1;
		#case ifcode PHP then
		$sz = count($this->_arr);
		for ($i=0; $i<$sz; $i++)
		{
			$elem = $this->_arr[$i];
			if ( $f($ctx, $elem) )
			{
				return $i;
			}
		}
		return -1;
		#endswitch
	}
	
	
	
	/**
	 * Find item
	 * @param var item - Find function
	 * @param fn f - Find function
	 * @param T def_value - Find function
	 * @return item
	 */
	T findItem(fn f, T def_value = null)
	{
		int pos = this.find(f);
		return this.get(pos, def_value);
	}
	
	
	
	/**
	 * Join collection to string
	 */
	string join(string ch)
	{
		return rs::join(ch, this);
	}
}

/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
 
namespace Runtime;

use Runtime.rtl;
use Runtime.Collection;
use Runtime.Exceptions.KeyNotFound;


abstract class _Map{}

#switch
#case ifcode JAVASCRIPT then

if (typeof Runtime == 'undefined') Runtime = {};

Runtime._Map = function(ctx, map)
{
	this._map = {};
	if (map != undefined && typeof map == 'object')
	{
		if (map instanceof Runtime.Dict)
		{
			for (var i in map._map)
			{
				this._map[i] = map._map[i];
			}
		}
		else if (typeof map == "object" && !(map instanceof Runtime._Collection))
		{
			for (var i in map)
			{
				this._map["|" + i] = map[i];
			}
		}
	}
	this.__uq__ = Symbol();
	return this;
}
/*Runtime._Map.prototype = Object.create(Map.prototype);
Runtime._Map.prototype.constructor = Runtime._Map;*/
Object.assign(Runtime._Map.prototype,
{
	toStr: function(value)
	{ 
		return use("Runtime.rtl").toStr(value);
	},
	toObject: function()
	{
		var obj = {};
		for (var key in this._map)
		{
			obj[key.substring(1)] = this._map[key];
		}
		return obj;
	},
});
Object.assign(Runtime._Map,
{
	from: function(map)
	{
		var ctx = null;
		var res = this.Instance(ctx, map);
		return res;
	},
	getNamespace: function(){ return "Runtime"; },
	getClassName: function(){ return "Runtime._Map"; },
	getParentClassName: function(){ return ""; },
});
#case ifcode NODEJS then
use.add(Runtime._Map);
#case ifcode PHP then
class _Map implements \ArrayAccess, \JsonSerializable
{
	public $_map = [];
	
	
	/**
	 * From
	 */
	static function from($map)
	{
		$class_name = static::class;
		$res = new $class_name(null);
		if ($map != null && is_array($map))
		{
			foreach ($map as $key => $value)
			{
				$key = $res->toStr($key);
				$res->_map[$key] = $value;
			}
		}
		else if (is_object($map))
		{
			$values = get_object_vars($map);
			foreach ($values as $key => $value)
			{
				$key = $res->toStr($key);
				$res->_map[$key] = $value;
			}
		}
		return $res;	
	}
	
	
	/**
	 * JsonSerializable
	 */
	public function toStr($value)
	{
		return rtl::toStr($value);
	}
	
	
	/**
	 * JsonSerializable
	 */
	public function jsonSerialize()
	{
		return (object) $this->_map;
	}
	
	
	/**
	 * Constructor
	 */
	public function __construct($ctx, $map=null)
	{
		$this->_map = [];
		if ($map == null) {}
		else if ($map instanceof Dict)
		{
			foreach ($map->_map as $key => $value)
			{
				$key = $this->toStr($key);
				$this->_map[$key] = $value;
			}		
		}
		else if (is_array($map))
		{
			foreach ($map as $key => $value)
			{
				$key = $this->toStr($key);
				$this->_map[$key] = $value;
			}
		}
		else if (is_object($map))
		{
			$values = get_object_vars($map);
			foreach ($values as $key => $value)
			{
				$key = $this->toStr($key);
				$this->_map[$key] = $value;
			}
		}
	}
	
	
	/**
	 * Destructor
	 */
	public function __destruct()
	{
		unset($this->_map);
	}
	
	
	/**
	 * Get array
	 */
	public function _getArr()
	{
		return $this->_map;
	}
	
	
	/**
	 * Get and set methods
	 */
	function __isset($k){return $this->has(null, $k);}
	function __get($k){return $this->get(null, $k, null);}
	function __set($k,$v){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	function __unset($k){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	public function offsetExists($k){return $this->has(null, $k);}
	public function offsetGet($k){return $this->get(null, $k, "");}
	public function offsetSet($k,$v){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	public function offsetUnset($k){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	
	/* Class name */
	public static function getClassName(){return "Runtime._Map";}
	public static function getParentClassName(){return "";}
}

#endswitch



class Dict<T> extends _Map
{
	
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static Dict<T> Instance(var val = null)
	{
		return new Dict(val);
	}
	
	
	
	/**
	 * Copy instance
	 */
	protected Dict<T> cp()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var new_obj = this.constructor.Instance(ctx);
		new_obj._map = Object.assign({}, this._map);
		return new_obj;
		#case ifcode PHP then
		$new_obj = static::Instance($ctx);
		$new_obj->_map = $this->_map;
		return $new_obj;
		#endswitch
	}
	
	
	
	
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static Dict<T> create(var obj)
	{
		#switch
		#case ifcode JAVASCRIPT then
		return new (Function.prototype.bind.apply(this, [null, ctx, obj]));
		#case ifcode PHP then
		$class_name = static::class;
		return new $class_name($obj);
		#endswitch
	}
	
	
	
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return Dict<T>
	 */
	public Dict<T> clone(Collection fields = null)
	{
		if (fields == null) return this;
		
		#switch
		#case ifcode JAVASCRIPT then
		var new_obj = this.constructor.Instance(ctx);
		if (fields != null)
		{
			for (var key in fields)
			{
				if (typeof obj["|" + key] == undefined)
					new_obj._map["|" + key] = this._map["|" + key];
			}
		}
		return new_obj;
		#case ifcode PHP then
		$new_obj = static::Instance($ctx);
		if ($fields != null)
		{
			foreach ($fields->_map as $key)
			{
				if (isset($this->_map[$key]))
				{
					$new_obj->_map[$key] = $this->_map[$key];
				}
			}
		}
		return $new_obj;
		#endswitch
	}
	
	
	
	/**
	 * Returns copy of Dict
	 * @param int pos - position
	 */
	public Dict<T> copy(var obj = null)
	{
		if (obj == null) return this;
		
		#switch
		#case ifcode JAVASCRIPT then
		var new_obj = this.constructor.Instance(ctx);
		new_obj._map = Object.assign({}, this._map);
		if (obj != null)
		{
			var _Dict = use("Runtime.Dict");
			if (obj instanceof _Dict) 
			{
				obj = obj._map;
				for (var key in obj)
				{
					new_obj._map[key] = obj[key];
				}
			}
			else
			{
				for (var key in obj)
				{
					new_obj._map["|" + key] = obj[key];
				}
			}
		}
		return new_obj;
		#case ifcode PHP then
		$new_obj = static::Instance($ctx);
		$new_obj->_map = $this->_map;
		if ($obj != null)
		{
			if ($obj instanceof \Runtime\Dict) $obj = $obj->_map;
			$new_obj->_map = array_merge($new_obj->_map, $obj);
		}
		return $new_obj;
		#endswitch
	}
	
	
	
	/**
	 * Convert to dict
	 */
	Dict<T> toDict()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var Dict = use ("Runtime.Dict");
		return new Dict(ctx, this);
		#case ifcode PHP then
		return new \Runtime\Dict($ctx, $this);
		#endswitch
	}
	
	
	
	/**
	 * Convert to dict
	 */
	Dict<T> toMap()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var Map = use ("Runtime.Map");
		return new Map(ctx, this);
		#case ifcode PHP then
		return new \Runtime\Map($ctx, $this);
		#endswitch
	}
	
	
	
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	public bool contains(string key)
	{
		#switch
		#case ifcode JAVASCRIPT then
		key = this.toStr(key);
		return typeof this._map["|" + key] != "undefined";
		#case ifcode PHP then
		$key = $this->toStr($key);
		return array_key_exists($key, $this->_map);
		#endswitch
	}
	
	
	
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	public bool has(string key)
	{
		return this.contains(key);
	}
	
	
	
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	public T get(string key, T default_value = null)
	{
		#switch
		#case ifcode JAVASCRIPT then
		key = this.toStr(key);
		var val = this._map["|" + key];
		if (typeof val == "undefined") return default_value;
		return val;
		#case ifcode PHP then
		$key = $this->toStr($key);
		$val = isset($this->_map[$key]) ? $this->_map[$key] : $default_value;
		return $val;
		#endswitch
	}
	
	
	
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	public var attr(Collection items, T default_value)
	{
		return rtl::attr(this, items, default_value);
	}
	
	
	
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param string key - position
	 * @return T
	 */
	public T item( string key)
	{
		#switch
		#case ifcode JAVASCRIPT then
		key = this.toStr(key);
		if (typeof this._map["|" + key] == "undefined")
		{
			var _KeyNotFound = use("Runtime.Exceptions.KeyNotFound");
			throw new _KeyNotFound(ctx, key);
		}
		var val = this._map["|" + key];
		if (val === null || typeof val == "undefined") return null;
		return val;
		#case ifcode PHP then
		$key = $this->toStr($key);
		if (!array_key_exists($key, $this->_map))
		{
			throw new \Runtime\Exceptions\KeyNotFound($ctx, $key);
		}
		return $this->_map[$key];
		#endswitch
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	public Dict<T> setIm(string key, T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var res = this.cp(ctx);
		key = this.toStr(key);
		res._map["|" + key] = value;
		return res;
		#case ifcode PHP then
		$res = $this->cp($ctx);
		$key = $this->toStr($key);
		$res->_map[$key] = $value;
		return $res;
		#endswitch
	}
	public Dict<T> set1(string key, T value) => this.setIm(key, value);
	
	
	
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	public Dict<T> removeIm(string key)
	{
		#switch
		#case ifcode JAVASCRIPT then
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			var res = this.cp();
			delete res._map["|" + key];
			return res;
		}
		return this;
		#case ifcode PHP then
		$key = $this->toStr($key);
		if (array_key_exists($key, $this->_map))
		{
			$res = $this->cp($ctx);
			unset($res->_map[$key]);
			return $res;
		}
		return $this;
		#endswitch
	}
	public Dict<T> remove1(string key) => this.removeIm(key);
	
	
	
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	public Dict<T> removeKeys(Collection<string> keys) =>
		(keys != null) ? keys.reduce
		(
			Dict (Dict item, string key) => item.removeIm(key), this
		) : this
	;
	
	
	
	/**
	 * Returns vector of the keys
	 * @return Collection<string>
	 */
	public Collection<string> keys()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var res = new Runtime.Vector(ctx);
		for (var key in this._map) res.pushValue(ctx, key.substring(1));
		return res.toCollection();
		#case ifcode PHP then
		$keys = array_keys($this->_map);
		$res = \Runtime\Collection::from($keys);
		return $res;
		#endswitch
	}
	
	
	
	/**
	 * Returns vector of the values
	 * @return Collection<T>
	 */
	public Collection<T> values()
	{
		#switch
		#case ifcode JAVASCRIPT then
		var res = new Runtime.Vector(ctx);
		for (var key in this._map) res.pushValue( this._map[key] );
		return res.toCollection();
		#case ifcode PHP then
		$values = array_values($this->_map);
		$res = \Runtime\Collection::from($values);
		return $res;
		#endswitch
	}
	
	
	
	/**
	 * Call function map
	 * @param fn f
	 * @return Dict
	 */
	Dict map(fn f)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var obj = this.constructor.Instance(ctx);
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var new_val = f(ctx, this._map[key], new_key);
			obj._map[key] = new_val;
		}
		return obj;
		#case ifcode PHP then
		$map2 = static::Instance($ctx);
		foreach ($this->_map as $key => $value)
		{
			$new_val = $f($ctx, $value, $key);
			$map2->_map[$key] = $new_val;
		}
		return $map2;
		#endswitch
	}
	
	
	
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	Dict<T> filter(fn f)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var obj = this.constructor.Instance(ctx);
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			var flag = f(ctx, value, new_key);
			if (flag) obj._map[key] = value;
		}
		return obj;
		#case ifcode PHP then
		$map2 = static::Instance($ctx);
		foreach ($this->_map as $key => $value)
		{
			$flag = $f($ctx, $value, $key);
			if ($flag) $map2->_map[$key] = $value;
		}
		return $map2;
		#endswitch
	}
	
	
	
	/**
	 * Call function for each item
	 * @param fn f
	 */
	void each(fn f)
	{
		#switch
		#case ifcode JAVASCRIPT then
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			f(ctx, value, new_key);
		}
		#case ifcode PHP then
		foreach ($this->_map as $key => $value)
		{
			$f($ctx, $value, $key);
		}
		#endswitch
	}
	
	
	
	/**
	 * Transition Dict to Collection
	 * @param fn f
	 * @return Collection
	 */
	Collection<T> transition(fn f)
	{
		#switch
		#case ifcode JAVASCRIPT then
		var Collection = use("Runtime.Collection");
		var arr = new Collection(ctx);
		for (var key in this._map)
		{
			var new_value = f(ctx, this._map[key], key.substring(1));
			Array.prototype.push.call(arr, new_value);
		}
		return arr;
		#case ifcode PHP then
		$arr = new \Runtime\Collection($ctx);
		foreach ($this->_map as $key => $value)
		{
			$arr->_arr[] = $f($ctx, $value, $key);
		}
		return $arr;
		#endswitch
	}
	
	
	
	/**
	 * 	
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	var reduce(fn f, var init_value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		for (var key in this._map)
		{
			init_value = f(ctx, init_value, this._map[key], key.substring(1));
		}
		return init_value;
		#case ifcode PHP then
		foreach ($this->_map as $key => $value)
		{
			$init_value = $f($ctx, $init_value, $value, $key);
		}
		return $init_value;
		#endswitch
	}
	
	
	
	/**
	 * Add values from other map
	 * @param Dict<T> map
	 * @return self
	 */
	public Dict<T> concat(Dict<T> map = null)
	{
		if (map == null) return this;
		#switch
		#case ifcode JAVASCRIPT then
		var _map = {};
		var f = false;
		var Dict = use("Runtime.Dict");
		if (map == null) return this;
		if (map instanceof Dict) _map = map._map;
		else if (typeof map == "object") { _map = map; f = true; }
		var res = this.cp(ctx);
		for (var key in _map)
		{
			res._map[(f ? "|" : "") + key] = _map[key];
		}
		return res;
		#case ifcode PHP then
		$_map = [];
		if ($map == null) return $this;
		if ($map instanceof \Runtime\Dict) $_map = $map->_map;
		else if (gettype($map) == "array") $_map = $map;
		$res = $this->cp($ctx);
		foreach ($_map as $key => $value)
		{
			$res->_map[$key] = $value;
		}
		return $res;
		#endswitch
	}
	
	
	
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	public Dict intersect(Collection fields = null, bool skip_empty = true)
	{
		if (fields == null) return {};
		
		Map obj = new Map();
		fields.each
		(
			void (string field_name) use (skip_empty, obj)
			{
				if (skip_empty and not this.has(field_name)) return;
				obj.setValue(field_name, this.get(field_name, null));
			}
		);
		
		return obj.toDict();
	}
	
	
	
	/**
	 * Check equal
	 */
	public bool equal(Dict item)
	{
		if (item == null) return false;
		
		Collection keys = (new Collection)
			.concat(this.keys())
			.concat(item.keys())
			.removeDuplicatesIm()
		;
		for (int i=0; i<keys.count(); i++)
		{
			string key = keys[i];
			if (not this.has(key)) return false;
			if (not item.has(key)) return false;
			if (this.get(key) != item.get(key)) return false;
		}
		
		return true;
	}
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
 
namespace Runtime;

use Runtime.rtl;
use Runtime.Vector;
use Runtime.Exceptions.KeyNotFound;


class Map<T> extends Dict<T>
{

	/**
	 * Returns new Instance
	 * @return Object
	 */
	static Collection<T> Instance(var val = null)
	{
		return new Map(val);
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	public Map<T> setValue(string key, T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		key = this.toStr(key);
		this._map["|" + key] = value;
		return this;
		#case ifcode PHP then
		$key = rtl::toStr($key);
		$this->_map[$key] = $value;
		return $this;
		#endswitch
	}
	
	
	
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	public Map<T> removeValue(string key)
	{
		#switch
		#case ifcode JAVASCRIPT then
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			delete this._map["|" + key];
		}
		return this;
		#case ifcode PHP then
		$key = rtl::toStr($key);
		if (isset($this->_map[$key]))
			unset($this->_map[$key]);
		return $this;
		#endswitch
	}
	
	
	
	/**
	 * Clear all values from vector
	 * @return self
	 */
	public Map<T> clear()
	{
		#switch
		#case ifcode JAVASCRIPT then
		this._map = {};
		return this;
		#case ifcode PHP then
		$this->_map = [];
		return $this;
		#endswitch
	}
	
}


/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
 
namespace Runtime;

use Runtime.Exceptions.RuntimeException;


class Monad
{
	var val = null;
	var err = null;
	
	
	/** 
	 * Constructor
	 */
	public void constructor(var value, var err = null)
	{
		this.val = value;
		this.err = err;
	}
	
	
	
	/**
	 * Return attr of object
	 */
	public var attr(string attr_name)
	{
		if (this.val === null or this.err != null) return this;
		return new Monad( rtl::attr(this.val, [ attr_name ], null) );
	}
	
	
	
	/**
	 * Call function on value
	 */
	public var call(fn f)
	{
		if (this.val === null or this.err != null) return this;
		
		var res = null;
		var err = null;
		try
		{
			res = f(this.val);
		}
		catch (RuntimeException e)
		{
			res = null;
			err = e;
		}
		
		return new Monad( res, err );
	}
	
	
	
	/**
	 * Call async function on value
	 */
	public async var callAsync(fn f)
	{
		if (this.val === null or this.err != null) return this;
		
		var res = null;
		var err = null;
		try
		{
			res = await f(this.val);
		}
		catch (RuntimeException e)
		{
			res = null;
			err = e;
		}
		
		return new Monad( res, err );
	}
	
	
	
	/**
	 * Call method on value
	 */
	public var callMethod(fn f, Collection args = null)
	{
		if (this.val === null or this.err != null) return this;
		
		var res = null;
		var err = null;
		try
		{
			res = rtl::apply(f, args);
		}
		catch (RuntimeException e)
		{
			res = null;
			err = e;
		}
		
		return new Monad( res, err );
	}
	
	
	
	/**
	 * Call async method on value
	 */
	public async var callMethodAsync(fn f, Collection args = null)
	{
		if (this.val === null or this.err != null) return this;
		
		var res = null;
		var err = null;
		try
		{
			res = await rtl::applyAsync(f, args);
		}
		catch (RuntimeException e)
		{
			res = null;
			err = e;
		}
		
		return new Monad( res, err );
	}
	
	
	
	/**
	 * Call function on monad
	 */
	public var monad(fn f)
	{
		return f(this);
	}
	
	
	
	/**
	 * Returns value
	 */
	public var value()
	{
		if (this.err != null)
		{
			throw this.err;
		}
		if (this.val === null or this.err != null) return null;
		return this.val;
	}
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
 
namespace Runtime;

use Runtime.rtl;
use Runtime.Collection;
use Runtime.Exceptions.IndexOutOfRange;


class Vector<T> extends Collection
{
	
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static Collection<T> Instance()
	{
		return new Vector();
	}
	
	
	
	/**
	 * Returns new Vector
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	Collection<T> vectorSlice(int offset, int length = null)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (offset == undefined) offset = 0;
		if (length == undefined)
		{
			var arr = Array.prototype.slice.call(this, offset);
			Object.setPrototypeOf(arr, this.constructor.prototype);
			return arr;
		}
		if (length >= 0)
		{
			length = offset + length;
		}
		var arr = Array.prototype.slice.call(this, offset, length);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
		#case ifcode PHP then
		$arr2 = static::Instance($ctx);
		$arr2->_arr = array_slice($this->_arr, $offset, $length);
		return $arr2;
		#endswitch
	}
	
	
	
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	public Vector<T> appendValue(T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		Array.prototype.push.call(this, value);
		return this;
		#case ifcode PHP then
		$this->_arr[] = $value;
		return $this;
		#endswitch
	}
	public Collection<T> pushValue(T value) => this.appendValue(value);
	
	
	
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	public Vector<T> prependValue(T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		Array.prototype.unshift.call(this, value);
		return this;
		#case ifcode PHP then
		array_unshift($this->_arr, $value);
		return $this;
		#endswitch
	}
	public Collection<T> unshiftValue(T value) => this.prependValue(value);
	
	
	
	/**
	 * Extract last value from array
	 * @return T value
	 */
	public T popValue()
	{
		#switch
		#case ifcode JAVASCRIPT then
		return Array.prototype.pop.call(this);
		#case ifcode PHP then
		return array_pop($this->_arr);
		#endswitch
	}
	
	
	
	/**
	 * Extract first value from array
	 * @return T value
	 */
	public T shiftValue()
	{
		#switch
		#case ifcode JAVASCRIPT then
		return Array.prototype.shift.call(this);
		#case ifcode PHP then
		array_shift($this->_arr);
		return $this;
		#endswitch
	}
	
	
	
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	public Vector<T> insertValue(int pos, T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		Array.prototype.splice.call(this, pos, 0, value);
		return this;
		#case ifcode PHP then
		array_splice($this->_arr, $pos, 0, [$value]);
		return $this;
		#endswitch
	}
	
	
	
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	public Vector<T> removePosition(int pos, int count = 1)
	{
		#switch
		#case ifcode JAVASCRIPT then
		Array.prototype.splice.call(this, pos, count);
		return this;
		#case ifcode PHP then
		array_splice($this->_arr, $pos, $count);
		return $this;
		#endswitch
	}
	
	
	
	/**
	 * Remove value
	 */
	public Vector<T> removeValue(T value)
	{
		var index = this.indexOf(value);
		if (index != -1) this.removePosition(index, 1);
		return this;
	}
	
	
	
	/**
	 * Remove value
	 */
	public Vector<T> removeValues(Vector<T> values)
	{
		for (var i=0; i<values.count(); i++)
		{
			this.removeValue( values.item(i) );
		}
		return this;
	}
	
	
	
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	public Vector<T> removeRangeValues(int pos_begin, int pos_end)
	{
		#switch
		#case ifcode JAVASCRIPT then
		Array.prototype.splice.call(this, pos_begin, pos_end - pos_begin + 1);
		return this;
		#case ifcode PHP then
		$this->remove($pos_begin, $pos_end - $pos_begin + 1);
		return $this;
		#endswitch
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	public T setValue(int pos, T value)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (pos < 0 || pos >= this.length)
		{
			var IndexOutOfRange = use ("Runtime.Exceptions.IndexOutOfRange");
			throw new IndexOutOfRange(pos);
		}
		this[pos] = value;
		return this;
		#case ifcode PHP then
		if (!array_key_exists($pos, $this->_arr))
		{
			throw new \Runtime\Exceptions\IndexOutOfRange($pos);
		}
		$this->_arr[$pos] = $value;
		return $this;
		#endswitch
	}
	
	
	
	/**
	 * Clear all values from vector
	 */
	public Vector<T> clear()
	{
		#switch
		#case ifcode JAVASCRIPT then
		Array.prototype.splice.call(this, 0, this.length);
		return this;
		#case ifcode PHP then
		$this->_arr = [];
		return $this;
		#endswitch
	}
	
	
	
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	public Vector<T> appendVector(Collection<T> arr)
	{
		#switch
		#case ifcode JAVASCRIPT then
		if (!arr) return this;
		for (var i=0; i<arr.length; i++) Array.prototype.push.call(this, arr[i]);
		return this;
		#case ifcode PHP then
		if (!$arr) return $this;
		foreach ($arr->_arr as $key => $value)
		{
			$this->_arr[] = $value;
		}
		return $this;
		#endswitch
	}
	
	
	
	/**
	 * Prepend vector to the begin of the vector
	 * @param Vector<T> arr
	 */
	public Vector<T> prependVector(Vector<T> arr)
	{
		#switch
		#case ifcode JAVASCRIPT then
		for (var i=0; i<arr.length; i++) Array.prototype.unshift.call(this, arr[i]);
		return this;
		#case ifcode PHP then
		if (!$arr) return $this;
		foreach ($arr->_arr as $key => $value)
		{
			array_unshift($this->_arr, $value);
		}
		return $this;
		#endswitch
	}
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Exceptions;

use Runtime.rtl;


abstract class ClassException{}

#switch
#case ifcode JAVASCRIPT then
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ClassException = function(message, code, prev)
{
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
	this.message = message;
	this.code = code;
	this.prev = prev;
}
Runtime.Exceptions.ClassException.prototype = Object.create(Error.prototype);
Runtime.Exceptions.ClassException.prototype.constructor = Runtime.Exceptions.ClassException;
Object.assign(Runtime.Exceptions.ClassException.prototype,
{
	_init: function(ctx){},
});
Object.assign(Runtime.Exceptions.ClassException,
{
	getNamespace: function(){ return "Runtime.Exceptions"; },
	getClassName: function(){ return "Runtime.Exceptions.ClassException"; },
	getParentClassName: function(){ return ""; },
});
#case ifcode NODEJS then
use.add(Runtime.Exceptions.ClassException);
#case ifcode PHP then
class ClassException extends \Exception
{
	function __construct($ctx, $message="", $code=-1, $prev=null)
	{
		parent::__construct($message, (int)$code, $prev);
	}
	function _init($ctx){}
}
#endswitch


class RuntimeException extends ClassException
{
	protected Object prev = null;
	public string error_message = "";
	public string error_str = "";
	public int error_code = 0;
	public string error_file = "";
	public string error_line = "";
	public string error_pos = "";
	
	
	void constructor(string message = "", int code = -1, Object prev = null)
	{
		#switch
		#case ifcode JAVASCRIPT then
		Runtime.Exceptions.ClassException.call(this, message, code, prev);
		#case ifcode PHP then
		parent::__construct($ctx, $message, $code, $prev);
		#endswitch
		this._init();
		this.error_str = message;
		this.error_code = code;
		this.prev = prev;
		this.updateError();
	}
	
	public Object getPreviousException()
	{
		return this.prev;
	}
	
	public string getErrorMessage()
	{
		return this.error_str;
	}
	
	public string getErrorString()
	{
		return this.error_str;
	}
	
	public int getErrorCode()
	{
		return this.error_code;
	}
	
	public string getFileName()
	{
		#switch
		#case ifcode PHP then
		if ($this->error_file == "")
		{
			return $this->getFile();
		}
		#endswitch
		return this.error_file;
	}
	
	public string getErrorLine()
	{
		#switch
		#case ifcode PHP then
		if ($this->error_line == "")
		{
			return $this->getLine();
		}
		#endswitch
		return this.error_line;
	}
	
	public string getErrorPos()
	{
		return this.error_pos;
	}
	
	public string toString()
	{
		return this.buildMessage();
	}

	public string buildMessage()
	{
		return this.error_str;
	}
	
	void updateError()
	{
		this.error_message = this.buildMessage();
		#switch
		#case ifcode ES6 then
		this.message = this.error_message;
		#endswitch
	}
	
	
	/**
	 * Returns trace
	 */
	string getTraceStr()
	{
		#switch
		#case ifcode PHP then
		return $this->getTraceAsString();
		#endswitch
	}
	
	
	/**
	 * Returns trace
	 */
	Collection<string> getTraceCollection()
	{
		#switch
		#case ifcode PHP then
		$error_trace = $this->getTrace();
		$error_trace = array_map(
			function ($item){
				$prefix = "internal";
				if (isset($item["file"]))
					$prefix = $item["file"] . "(" . $item["line"] . ")";
				else if (isset($item["class"]))
					$prefix = $item["class"];
				return $prefix . ": " . $item["function"];
			},
			$error_trace
		);
		return \Runtime\Collection::from($error_trace);
		#endswitch
	}
	
}

/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Exceptions;

use Runtime.rtl;
use Runtime.RuntimeConstant;
use Runtime.Exceptions.RuntimeException;


class AssertException extends RuntimeException
{
    void constructor(string message)
	{
		parent(message);
	}
}
/*!
 *  Bayrell Runtime Library 
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Exceptions;

use Runtime.Exceptions.RuntimeException;


class ApiException extends RuntimeException
{
	var response = null;
	
	void constructor(string message = "", int code = -1, var response = null, Object prev = null)
	{
		parent(message, code, prev);
		this.response = response;
	}

}
/*!
 *  Bayrell Runtime Library 
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Exceptions;

use Runtime.rtl;
use Runtime.Exceptions.RuntimeException;


class AssignStructValueError extends RuntimeException
{
	
	void constructor(string name, Object prev = null)
	{
		parent
		(
			_("Runtime", "Can not set key '" ~ name ~ "' in immutable struct"), 
			rtl::ERROR_INDEX_OUT_OF_RANGE, 
			prev
		);
	}

}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Exceptions;

use Runtime.rtl;
use Runtime.RuntimeConstant;
use Runtime.Exceptions.RuntimeException;


class FileNotFound extends RuntimeException
{
	
	void constructor(string name, string object = "File", string code = -5, Object prev = null)
	{
		parent(
			_("Runtime", "%object% '%name%' not found", {"name": name, "object": object}),
			code,
			prev
		);
	}

}
/*!
 *  Bayrell Runtime Library 
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Exceptions;

use Runtime.rtl;
use Runtime.RuntimeConstant;
use Runtime.Exceptions.RuntimeException;


class IndexOutOfRange extends RuntimeException
{
	
	void constructor(int pos, Object prev = null)
	{
		parent( _("Runtime", "Index out of range. Pos: %pos%", {"pos":pos}), rtl::ERROR_INDEX_OUT_OF_RANGE, prev );
	}

}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Exceptions;

use Runtime.rtl;
use Runtime.RuntimeConstant;
use Runtime.Exceptions.RuntimeException;


class KeyNotFound extends RuntimeException{
	
	void constructor(string key, Object prev = null)
	{
		parent(
			_("Runtime", "Key '%key%' not found", {"key": key}),
			rtl::ERROR_KEY_NOT_FOUND,
			prev
		);
	}

}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Exceptions;

use Runtime.rtl;
use Runtime.RuntimeConstant;
use Runtime.Exceptions.RuntimeException;


class UnknownError extends RuntimeException
{
	
	void constructor(Object prev = null)
	{
		parent(
			_("Runtime", "Unknown error"),
			rtl::ERROR_UNKNOWN, 
			prev
		);
	}

}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
 
namespace Runtime;

use Runtime.CoreObject;
use Runtime.Map;
use Runtime.Vector;


interface SerializeInterface
{
	
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	public var get(string variable_name, var default_value = null);
	
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;


interface StringInterface
{
	
	/**
	 * Returns string
	 */
	public string toString();
	
}


/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.rtl;
use Runtime.Map;
use Runtime.Vector;


class BaseObject
{
	
	/** 
	 * Constructor
	 */
	public void constructor()
	{		
		/* Init object */
		this._init();
	}
	
	
	/**
	 * Init function
	 */
	protected void _init()
	{
	}
	
	
	/**
	 * Returns new instance
	 */
	pure BaseObject newInstance(Dict items) => null;
	
	
	/**
	 * Init struct data
	 */
	protected Dict _init_data(Dict obj) => obj;
	
	
	/**
	 * Assign new values
	 */
	protected void _assign_values(Dict obj = null)
	{
		#switch
		#case ifcode PHP then
		if (gettype($obj) == "array")
		{
			$obj = new \Runtime\Dict($obj);
		}
		#case ifcode JAVASCRIPT then
		if (typeof obj == 'object' && !(obj instanceof Runtime.Dict))
		{
			obj = new Runtime.Dict(obj);
		}
		#endswitch
		
		
		if (obj == null) return;
		if (obj.keys().count() == 0) return;
		
		bool check_types = false;
		string class_name = static::getClassName();
		
		obj = this._init_data(obj);
		
		
		#ifdef ENABLE_CHECK_TYPES then
		
		/* Enable check types */
		check_types = true;
		if (class_name == "Runtime.IntrospectionClass") check_types = false;
		if (class_name == "Runtime.IntrospectionInfo") check_types = false;
		
		#endif
		
		
		#switch
		#case ifcode PHP then
		
		if ($obj instanceof \Runtime\Dict) $obj = $obj->_map;
		if (gettype($obj) == "array")
		{
			foreach ($obj as $key => $value)
			{
				$k = $this->__getKey($key);
				if (property_exists($this, $k))
				{
					if ($check_types)
					{
						$info = \Runtime\rtl::getFieldInfoWithParents($ctx, $class_name, $key);
						if ($info)
						{
							$value = \Runtime\rtl::convert($ctx, $value, $info->t, null);
						}
					}
					$this->$k = $value;
				}
			}
		}
		
		#case ifcode JAVASCRIPT then
		
		var _Dict = use("Runtime.Dict");
		var rtl = use("Runtime.rtl");
		if (obj instanceof _Dict)
		{
			for (var key in obj._map)
			{
				var real_key = key.substring(1);
				var value = obj._map[key];
				if (check_types)
				{
					info = rtl.getFieldInfoWithParents(ctx, class_name, real_key);
					if (info)
					{
						value = rtl.convert(ctx, value, info.get(ctx, "t"), null);
					}
				}
				this[real_key] = value;
			}
		}
		else
		{
			for (var key in obj)
			{
				var value = obj[key];
				if (check_types)
				{
					info = rtl.getFieldInfoWithParents(ctx, class_name, key);
					if (info)
					{
						value = rtl.convert(ctx, value, info.get(ctx, "t"), null);
					}
				}
				this[key] = value;
			}
		}
		
		#endswitch
	}
	
	
	#switch
	#case ifcode PHP then
	function __getKey($k){return $k;}
	#endswitch
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.BaseObject;
use Runtime.Providers.HookProvider;


class BaseHook extends BaseObject
{
	HookProvider hook = null;
	
	
	/**
	 * Returns method name by hook name
	 */
	string getMethodName(string hook_name) => "";
	
	
	/**
	 * Register hook
	 */
	void register(string hook_name, int priority = 100)
	{
		string method_name = this.getMethodName(hook_name);
		if (method_name == "") return;
		
		this.hook.register(hook_name, this, method_name, priority);
	}
	
	
	/**
	 * Register hook
	 */
	void registerMethod(string hook_name, string method_name, int priority = 100)
	{
		this.hook.register(hook_name, this, method_name, priority);
	}
	
	
	/**
	 * Register hooks
	 */
	void register_hooks()
	{
		
	}
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.BaseObject;
use Runtime.Context;


class BaseProvider extends BaseObject
{
	bool started = false;
	
	/**
	 * Init provider
	 */
	async void init(Context c)
	{
		return c;
	}
	
	
	/**
	 * Start provider
	 */
	async void start()
	{
	}
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.BaseObject;
use Runtime.Dict;
use Runtime.Map;
use Runtime.rtl;
use Runtime.RuntimeUtils;
use Runtime.Vector;
use Runtime.SerializeInterface;


class BaseStruct extends BaseObject implements SerializeInterface
{	
	
	/** 
	 * Constructor
	 */
	public void constructor(Dict obj = null)
	{
		parent();
		
		this._assign_values(obj);
		
		#switch
		#case ifcode JAVASCRIPT then
		if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
		Object.freeze(this);
		#endswitch
	}
	
	
	
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	public BaseStruct copy(Dict obj = null)
	{
		if (obj == null) return this;
		
		#switch
		#case ifcode PHP then
		
		$item = clone $this;
		$item->_assign_values($ctx, $obj);
		return $item;
		
		#case ifcode JAVASCRIPT then
		
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto); /* item._init(); */
		item = Object.assign(item, this);
		
		item._assign_values(ctx, obj);
		
		Object.freeze(item);
		
		return item;
		
		#endswitch
		
		return this;
	}
	
	
	
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	public BaseStruct clone(Dict obj = null)
	{
		return this.copy(obj);
	}
	
	
	
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	public BaseStruct intersect(Collection fields = null)
	{
		if (fields == null) return {};
		
		Map obj = new Map();
		for (int i=0; i<fields.count(); i++)
		{
			string field_name = fields[i];
			obj.setValue(field_name, this.get(field_name));
		}
		
		/* Return object */
		BaseStruct res = rtl::newInstance( this.getClassName(), [ obj.toDict() ] );
		return res;
	}
	
	
	
	/**
	 * Returns new instance
	 */
	pure BaseStruct newInstance(Dict items)
	{
		#switch
		#case ifcode JAVASCRIPT then
		return new (
			Function.prototype.bind.apply(
				this,
				(typeof ctx != "undefined") ? [null, ctx, items] : [null, items]
			)
		);
		#case ifcode PHP then
		$class_name = static::class;
		return new $class_name($ctx, $items);
		#endswitch
	}
	
	
	
	/**
	 * Update struct
	 * @param Collection<string> path
	 * @param var value
	 * @return BaseStruct
	 */
	pure BaseStruct set(BaseStruct item, Collection<string> path, var value) =>
		rtl::setAttr(item, path, value)
	;
	
	
	
	/**
	 * Returns struct as Dict
	 * @return Dict
	 */
	Dict toDict()
	{
		Map<var> values = new Map();
		Collection<string> names = rtl::getFields(static::getClassName());
		
		for (int i=0; i<names.count(); i++)
		{
			string variable_name = names.item(i);
			var value = this.get(variable_name, null);
			values.setValue(variable_name, value);
		}
		
		delete names;
		return values.toDict();
	}
	
	
	
	#switch
	#case ifcode PHP then
	function get($ctx,$k,$v = null){$k="__".$k;return isset($this->$k)?$this->$k:$v;}
	function __get($k){$k="__".$k;return isset($this->$k)?$this->$k:null;}
	function __getKey($k){return "__".$k;}
	function __set($k,$v){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	function offsetExists($k){$k="__".$k;return isset($this->$k);}
	function offsetGet($k){$k="__".$k;return isset($this->$k)?$this->$k:null;}
	function offsetSet($k,$v){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	function offsetUnset($k){throw new \Runtime\Exceptions\AssignStructValueError(null, $k);}
	#endswitch
	
}

#ifcode JAVASCRIPT then
Runtime.BaseStruct.prototype.get = function(ctx, k, v)
{
	if (v == undefined) v = null;
	return this[k] != undefined ? this[k] : v;
};
#endif
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.BaseStruct;
use Runtime.Exceptions.RuntimeException;


struct Callback extends BaseStruct
{
	var obj;
	string name;
	var tag = null;
	
	
	/**
	 * Constructor
	 */
	public void constructor(Dict obj = null)
	{
		if (not(obj instanceof Dict))
		{
			Collection<string> args = null;
			
			#switch
			#case ifcode PHP then
			$args = \Runtime\Collection::from(func_get_args());
			#case ifcode ES6 then
			args = Runtime.Collection.from( [ ...arguments ] );
			#endswitch
			
			obj = {
				"obj": args.get(0),
				"name": args.get(1),
			}
		}
		
		parent(obj);
		
		this.checkExists();
	}
	
	
	/**
	 * Check if method exists
	 */
	void checkExists()
	{
		if (not rtl::method_exists(this.obj, this.name))
		{
			throw new RuntimeException("Method '" ~
				this.name ~ "' not found in " ~
				rtl::get_class_name(this.obj)
			);
		}
	}
	
	
	/**
	 * Call function
	 */
	var call(Collection args = null)
	{
		#switch
		
		#case ifcode PHP then
		
		$obj = $this->obj;
		
		if (gettype($obj) == "string")
		{
			$obj = \Runtime\rtl::find_class($obj);
		}
		
		if ($args instanceof \Runtime\Collection)
		{
			$args = $args->_arr;
		}
		
		if ($args == null) $args = [];
		
		return call_user_func_array([$obj, $this->name], $args);
		
		#case ifcode JAVASCRIPT then
		
		obj = this.obj;
		
		if (typeof(obj) == "string")
		{
			obj = Runtime.rtl.find_class(obj);
		}
		
		return Runtime.rtl.apply(obj[this.name].bind(obj), args);
		
		#endswitch
	}
	
	
	/**
	 * Call function
	 */
	async var callAsync(Collection args = null)
	{
		#switch
		
		#case ifcode PHP then
		
		$obj = $this->obj;
		
		if (gettype($obj) == "string")
		{
			$obj = \Runtime\rtl::find_class($obj);
		}
		
		if ($args instanceof \Runtime\Collection)
		{
			$args = $args->_arr;
		}
		
		if ($args == null) $args = [];
		
		return call_user_func_array([$obj, $this->name], $args);
		
		#case ifcode JAVASCRIPT then
		
		obj = this.obj;
		
		if (typeof(obj) == "string")
		{
			obj = Runtime.rtl.find_class(obj);
		}
		
		return await Runtime.rtl.applyAsync(obj[this.name].bind(obj), args);
		
		#endswitch
	}
	
	
	#ifcode PHP then
	
	function __invoke()
	{
		return $this->call(func_get_args());
	}
	
	function invokeArgs($args)
	{
		return $this->call($args);
	}
	
	#endif
}

/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
 
namespace Runtime;

use Runtime.rtl;
use Runtime.BaseStruct;
use Runtime.Dict;
use Runtime.StringInterface;


struct Date extends BaseStruct implements StringInterface
{
	public int y = 0;
	public int m = 0;
	public int d = 0;
	
	
	/**
	 * Return date
	 * @return string
	 */
	string getDate()
	{
		return this.y ~ "-" ~ this.m ~ "-" ~ this.d;
	}
	
	
	/**
	 * Normalize date time
	 */
	DateTime normalize() => this;
	
	
	/**
	 * Return db datetime
	 * @return string
	 */
	string toString()
	{
		return this.y ~ "-" ~ this.m ~ "-" ~ this.d;
	}
}


#ifcode JAVASCRIPT then
Runtime.Date.prototype.toObject = function(ctx)
{
	var dt = new Date(this.y, this.m - 1, this.d);
	return dt;
}
Runtime.Date.fromObject = function(ctx, dt)
{
	var Dict = use("Runtime.Dict");
	var y = Number(dt.getFullYear());
	var m = Number(dt.getMonth()) + 1;
	var d = Number(dt.getDate());
	var dt = new Runtime.Date( ctx, Dict.from({"y":y,"m":m,"d":d}) );
	return dt;
}
#endif
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
 
namespace Runtime;

use Runtime.rtl;
use Runtime.BaseStruct;
use Runtime.Dict;
use Runtime.StringInterface;


struct DateTime extends BaseStruct implements StringInterface
{
	public int y = 1970;
	public int m = 1;
	public int d = 1;
	public int h = 0;
	public int i = 0;
	public int s = 0;
	public int ms = 0;
	public string tz = "UTC";
	
	
	#ifcode PHP then
	
	private function toObject($ctx)
	{
		$dt = new \DateTime();
		$dt->setTimezone( new \DateTimeZone($this->tz) );
		$dt->setDate($this->y, $this->m, $this->d);
		$dt->setTime($this->h, $this->i, $this->s);
		return $dt;
	}
	
	public static function fromObject($ctx, $dt)
	{
		$y = (int)$dt->format("Y");
		$m = (int)$dt->format("m");
		$d = (int)$dt->format("d");
		$h = (int)$dt->format("H");
		$i = (int)$dt->format("i");
		$s = (int)$dt->format("s");
		$tz = $dt->getTimezone()->getName();
		return new \Runtime\DateTime($ctx,
			Dict::from(["y"=>$y,"m"=>$m,"d"=>$d,"h"=>$h,"i"=>$i,"s"=>$s,"tz"=>$tz])
		);
	}
	
	#endif
	
	
	/**
	 * Create date time from timestamp
	 */
	pure DateTime create(int time = -1, string tz = "UTC")
	{
		#switch
		#case ifcode PHP then
		if ($time == -1) $time = time();
		$dt = new \DateTime();
		$dt->setTimezone(new \DateTimeZone($tz));
		$dt->setTimestamp($time);
		return static::fromObject($ctx, $dt);
		
		#case ifcode JAVASCRIPT then
		var dt = null;
		if (time == -1) dt = new Date();
		else dt = new Date(time*1000);
		return this.fromObject(ctx, dt, tz);
		#endswitch
		
		return null;
	}
	
	
	/**
	 * Create date time from string
	 */
	pure DateTime from(string s, string tz = "UTC")
	{
		if (rs::strlen(s) < 19) return null;
		if (rs::strlen(s) > 19) tz = rs::substr(s, 19);
		return new DateTime{
			"y": (int)rs::substr(s, 0, 4),
			"m": (int)rs::substr(s, 5, 2),
			"d": (int)rs::substr(s, 8, 2),
			"h": (int)rs::substr(s, 11, 2),
			"i": (int)rs::substr(s, 14, 2),
			"s": (int)rs::substr(s, 17, 2),
			"tz": tz
		};
	}
	
	
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	pure DateTime now(string tz = "UTC") => static::create(-1, tz);
	
	
	/**
	 * Shift time
	 */
	DateTime shiftTime(int shift)
	{
		int timestamp = this.getTimestamp() + shift;
		DateTime dt = static::create(timestamp, this.tz);
		return dt;
	}
	
	
	/**
	 * Shift tz
	 */
	DateTime shift(string tz)
	{
		int timestamp = this.getTimestamp();
		DateTime dt = static::create(timestamp, tz);
		return dt;
	}
	
	
	/**
	 * Set week number
	 */
	DateTime setWeekNumber(int week)
	{
		#switch
		#case ifcode PHP then
		
		$dt = new \DateTime();
		$dt->setTimezone(new \DateTimeZone($this->tz));
		$dt->setISODate($this->y, $week);
		$dt->setTime(0, 0, 0);
		return static::fromObject($ctx, $dt);
		
		#case ifcode JAVASCRIPT then
		
		var dt = new Date(this.y, 0, 1, 0, 0, 0);
		var year_begin = Math.round(dt.getTime() / 1000) - dt.getTimezoneOffset() * 60;
		var day_begin = dt.getDay();
		var shift = (day_begin - 1) * 86400;
		var week_begin = year_begin - shift;
		week_begin = week_begin + week * 604800 + dt.getTimezoneOffset() * 60;
		return this.constructor.fromObject(ctx, new Date(week_begin*1000), this.tz, false);
		
		#endswitch
		
		return this;
	}
	
	
	/**
	 * Returns timestamp
	 * @return int
	 */
	int getTimestamp()
	{
		#switch
		
		#case ifcode PHP then
		$dt = $this->toObject($ctx);
		return $dt->getTimestamp();
		
		#case ifcode JAVASCRIPT then
		var dt = this.toObject(ctx);
		return Math.round(dt.getTime() / 1000);
		
		#endswitch
		
		return null;
	}
	int timestamp() => this.getTimestamp();
	
	
	/**
	 * Returns day of week
	 * @return int
	 */
	int getDayOfWeek()
	{
		#switch
		
		#case ifcode PHP then
		$dt = $this->toObject($ctx);
		return $dt->format("w");
		
		#case ifcode JAVASCRIPT then
		var dt = this.toObject(ctx);
		return dt.getDay();
		
		#endswitch
		
		return null;
	}
	
	
	/**
	 * Return db datetime
	 * @return string
	 */
	string toString(string tz = "")
	{
		if (tz == "") tz = @.tz;
		
		#switch
		
		#case ifcode PHP then
		$dt = $this->toObject($ctx);
		if ($tz != "") $dt->setTimezone( new \DateTimeZone($tz) );
		return $dt->format("Y-m-d H:i:s");
		
		#case ifcode JAVASCRIPT then
		
		var offset = 0;
		var dt = this.toObject(ctx);
		if (tz == "") tz = this.tz;
		
		offset = this.constructor.getTimezoneOffset(ctx, tz);
		offset = offset - dt.getTimezoneOffset();
		dt = this.constructor.shiftOffset(ctx, dt, -offset);
		
		var y = Number(dt.getFullYear());
		var m = Number(dt.getMonth()) + 1;
		var d = Number(dt.getDate());
		var h = Number(dt.getHours());
		var i = Number(dt.getMinutes());
		var s = Number(dt.getSeconds());
		
		var m = (m < 10) ? "0" + m : "" + m;
		var d = (d < 10) ? "0" + d : "" + d;
		var h = (h < 10) ? "0" + h : "" + h;
		var i = (i < 10) ? "0" + i : "" + i;
		var s = (s < 10) ? "0" + s : "" + s;
		return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
		
		#endswitch
		
		return "";
	}
	
	
	/**
	 * Returns database time by UTC
	 */
	string getDatabaseTime()
	{
		return this.toString("UTC");
	}
	
	
	/**
	 * Return datetime in RFC822
	 * @return string
	 */
	DateTime getRFC822()
	{
		#switch
		
		#case ifcode PHP then
		$dt = $this->toObject($ctx);
		return $dt->format(\DateTime::RFC822);
		
		#case ifcode JAVASCRIPT then
		
		var y = this.y, m = this.m, d = this.d, h = this.h, i = this.i, s = this.s;
		var dt = new Date(y, m - 1, d, h, i, s);
		
		y = (y < 10) ? "0" + y : "" + y;
		m = (m < 10) ? "0" + m : "" + m;
		d = (d < 10) ? "0" + d : "" + d;
		h = (h < 10) ? "0" + h : "" + h;
		i = (i < 10) ? "0" + i : "" + i;
		s = (s < 10) ? "0" + s : "" + s;
		
		var dow = dt.getDay();
		var dow_s = "";
		if (dow == 0) dow_s = "Sun";
		if (dow == 1) dow_s = "Mon";
		if (dow == 2) dow_s = "Tue";
		if (dow == 3) dow_s = "Wed";
		if (dow == 4) dow_s = "Thu";
		if (dow == 5) dow_s = "Fri";
		if (dow == 6) dow_s = "Sat";
		
		var m_s = "";
		if (m == 1) m_s = "Jan";
		if (m == 2) m_s = "Feb";
		if (m == 3) m_s = "Mar";
		if (m == 4) m_s = "Apr";
		if (m == 5) m_s = "May";
		if (m == 6) m_s = "Jun";
		if (m == 7) m_s = "Jul";
		if (m == 8) m_s = "Aug";
		if (m == 9) m_s = "Sep";
		if (m == 10) m_s = "Oct";
		if (m == 11) m_s = "Nov";
		if (m == 12) m_s = "Dec";
		
		return dow_s + ", " + d + " " + m_s + " " + y + " " + h + ":" + i + ":" + s + " " + this.tz;
		#endswitch
		
		return "";
	}
	
	
	/**
	 * Return datetime in ISO8601
	 * @return string
	 */
	DateTime getISO8601()
	{
		#switch
		
		#case ifcode PHP then
		$dt = $this->toObject($ctx);
		return $dt->format(\DateTime::ISO8601);
		
		#case ifcode JAVASCRIPT then
		var y = this.y, m = this.m, d = this.d, h = this.h, i = this.i, s = this.s;
		m = (m < 10) ? "0" + m : "" + m;
		d = (d < 10) ? "0" + d : "" + d;
		h = (h < 10) ? "0" + h : "" + h;
		i = (i < 10) ? "0" + i : "" + i;
		s = (s < 10) ? "0" + s : "" + s;
		var tz = Math.ceil(-this.constructor.getTimezoneOffset(ctx, this.tz) / 60);
		if (tz < 10 && tz >= 0) tz = "0" + tz;
		if (tz >= 0) tz = "+" + tz;
		return this.y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + tz + "00";
		
		#endswitch
		
		return "";
	}
	
	
	/**
	 * Normalize date time
	 */
	DateTime normalize() => this;
	
}


#ifcode JAVASCRIPT then

Runtime.DateTime.getTimezoneOffset = function(ctx, tz)
{
	if (tz == "UTC") return 0;
	if (tz == "GMT") return 0;
	if (tz == "GMT+1") return -60;
	if (tz == "GMT+2") return -120;
	if (tz == "GMT+3") return -180;
	if (tz == "GMT+4") return -240;
	if (tz == "GMT+5") return -300;
	if (tz == "GMT+6") return -360;
	if (tz == "GMT+7") return -420;
	if (tz == "GMT+8") return -480;
	if (tz == "GMT+9") return -540;
	if (tz == "GMT+10") return -600;
	if (tz == "GMT+11") return -660;
	if (tz == "GMT+13") return -780;
	if (tz == "GMT+14") return -840;
	if (tz == "GMT-1") return 60;
	if (tz == "GMT-2") return 120;
	if (tz == "GMT-3") return 180;
	if (tz == "GMT-4") return 240;
	if (tz == "GMT-5") return 300;
	if (tz == "GMT-6") return 360;
	if (tz == "GMT-7") return 420;
	if (tz == "GMT-8") return 480;
	if (tz == "GMT-9") return 540;
	if (tz == "GMT-10") return 600;
	if (tz == "GMT-11") return 660;
	if (tz == "GMT-12") return 720;
	return 0;
}

Runtime.DateTime.shiftOffset = function(ctx, dt, offset)
{
	var h = Math.floor(offset / 60);
	var m = offset % 60;
	dt.setMinutes(dt.getMinutes() + m);
	dt.setHours(dt.getHours() + h);
	return dt;
}

Runtime.DateTime.prototype.toObject = function(ctx)
{
	var dt = new Date(this.y, this.m - 1, this.d, this.h, this.i, this.s);
	var offset = this.constructor.getTimezoneOffset(ctx, this.tz);
	var offset = offset - dt.getTimezoneOffset();
	dt = this.constructor.shiftOffset(ctx, dt, offset);
	return dt;
}

Runtime.DateTime.fromObject = function(ctx, dt, tz, is_shift)
{
	if (is_shift == undefined) is_shift = true;
	var Dict = use("Runtime.Dict");
	if (is_shift)
	{
		var offset = this.getTimezoneOffset(ctx, tz);
		var offset = offset - dt.getTimezoneOffset();
		dt = this.shiftOffset(ctx, dt, -offset);
	}
	var y = Number(dt.getFullYear());
	var m = Number(dt.getMonth()) + 1;
	var d = Number(dt.getDate());
	var h = Number(dt.getHours());
	var i = Number(dt.getMinutes());
	var s = Number(dt.getSeconds());
	var dt = new Runtime.DateTime(ctx, Dict.from({"y":y,"m":m,"d":d,"h":h,"i":i,"s":s,"tz":tz}));
	return dt;
}

#endif
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.BaseObject;
use Runtime.BaseStruct;
use Runtime.Callback;
use Runtime.Reference;
use Runtime.Exceptions.FileNotFound;
use Runtime.Exceptions.RuntimeException;


class ModelProxy<T> extends BaseObject
{
	var container = null;
	Collection path = null;
	
	
	/**
	 * Constructor
	 */
	void constructor(BaseObject container, Collection path = null)
	{
		parent();
        
        if (container instanceof BaseStruct)
        {
            this.container = new Reference(container);
            this.path = ["ref"].concat(path);
        }
        else
        {
		    this.container = container;
		    this.path = path;
        }
	}
	
    
    /**
     * Returns path
     */
    Collection<string> getPath() => this.path ? this.path : [];
    
	
	/**
	 * Returns model data by path
	 */
	var data(Collection<string> model_path = null)
	{
		if (model_path == null) model_path = [];
		return rtl::attr(this.container, this.getPath().concat(model_path));
	}
	var attr(Collection<string> model_path = null) => this.data(model_path);
	var model(Collection<string> model_path = null) => this.data(model_path);
	
	
	/**
	 * Set new model
	 */
	void setNewModel(var new_model)
	{
		BaseStruct old_model = this.data();
		this.container = rtl::setAttr(this.container, this.getPath(), new_model);
        
        if (rtl::method_exists(this.container, "onUpdateModel"))
        {
		    this.container.onUpdateModel(this.getPath(), old_model, new_model);
        }
	}
	
	
	/**
	 * Call method name
	 */
	var call(string method_name)
	{
		Collection<string> args = null;
		BaseStruct old_model = this.data();
		var value = null;
		
		#switch
		#case ifcode PHP then
		$args = \Runtime\Collection::from(func_get_args())->slice(1);
		#case ifcode ES6 then
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		#endswitch
		
		if (old_model == null)
		{
			throw new RuntimeException("model is null");
		}
		
		string class_name = old_model::getClassName();
		
		if ( rtl::method_exists(old_model, method_name) )
		{
			fn f = rtl::method(old_model, method_name);
			value = rtl::apply(f, args);
		}
		elseif ( rtl::method_exists(class_name, method_name) )
		{
			fn f = rtl::method(class_name, method_name);
			args = args.prependIm(this);
			value = rtl::apply(f, args);
		}
		else
		{
			throw new FileNotFound(class_name ~ "::" ~ method_name, "Method");
		}
		
		return value;
	}
	
	
	/**
	 * Call method name
	 */
	async var callAsync(string method_name)
	{
		Collection<string> args = null;
		BaseStruct old_model = this.data();
		var value = null;
		
		#switch
		#case ifcode PHP then
		$args = \Runtime\Collection::from(func_get_args())->slice(1);
		#case ifcode ES6 then
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		#endswitch
		
		if (old_model == null)
		{
			throw new RuntimeException("model is null");
		}
		
		string class_name = old_model::getClassName();
		
		if ( rtl::method_exists(old_model, method_name) )
		{
			fn f = rtl::method(old_model, method_name);
			value = await rtl::applyAsync(f, args);
		}
		elseif ( rtl::method_exists(class_name, method_name) )
		{
			fn f = rtl::method(class_name, method_name);
			args = args.prependIm(this);
			value = await rtl::applyAsync(f, args);
		}
		else
		{
			throw new FileNotFound(class_name ~ "::" ~ method_name, "Method");
		}
		
		return value;
	}
	
	
	/**
	 * Commit model
	 */
	var commit(string method_name)
	{
		Collection<string> args = null;
		BaseStruct old_model = this.data();
		BaseStruct new_model = null;
		
		#switch
		#case ifcode PHP then
		$args = \Runtime\Collection::from(func_get_args())->slice(1);
		#case ifcode ES6 then
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		#endswitch
		
		if (old_model == null)
		{
			throw new RuntimeException("model is null");
		}
		
		string class_name = old_model::getClassName();
		
		if ( rtl::method_exists(old_model, method_name) )
		{
			fn f = new Callback{"obj": old_model, "name": method_name};
			new_model = f.call(args);
			this.setNewModel(new_model);
		}
		elseif ( rtl::method_exists(class_name, method_name) )
		{
			fn f = new Callback{"obj": class_name, "name": method_name};
			args = args.prependIm(this);
			new_model = f.call(args);
		}
		else
		{
			throw new FileNotFound(class_name ~ "::" ~ method_name, "Method");
		}
	}
	
	
	/**
	 * Commit model
	 */
	async var commitAsync(string method_name)
	{
		var res = null;
		Collection<string> args = null;
		BaseStruct model = this.data();
		string class_name = model::getClassName();
		
		#switch
		#case ifcode PHP then
		$args = \Runtime\Collection::from(func_get_args())->slice(1);
		#case ifcode ES6 then
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		#endswitch
		
		if ( rtl::method_exists(class_name, method_name) )
		{
			fn f = new Callback{"obj": class_name, "name": method_name};
			args = args.prependIm(this);
			res = await f.callAsync(args);
		}
		else
		{
			throw new FileNotFound(class_name ~ "::" ~ method_name, "Method");
		}
		
		return res;
	}
	
	
	/**
	 * Get child model
	 */
	ModelProxy proxy(Collection path)
	{
		if (rtl::isString(path)) path = [ path ];
		return new ModelProxy(this.container, this.getPath().concat(path));
	}
	
	
	/**
	 * Get parent proxy
	 */
	ModelProxy parentProxy()
	{
		return new ModelProxy(this.container, this.getPath().removeLastIm());
	}
	
	
	/**
	 * fork proxy
	 */
	ModelProxy fork(Collection path)
	{
		if (rtl::isString(path)) path = [ path ];
		return new ModelProxy(this.container, path);
	}
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.BaseObject;
use Runtime.rtl;


class Reference<T> extends BaseObject
{
	
	string uq = rtl::unique();
	T ref = null;
	
	
	/**
	 * Constructor
	 */
	public void constructor(T ref = null)
	{
		parent();
		this.ref = ref;
	}
	
	
	
	/**
	 * Assign and clone data from other object
	 * @param BaseObject obj
	 */
	void assignObject1(BaseObject obj)
	{
		if (obj instanceof Reference)
		{
			this.uq = obj.uq;
			this.ref = this.ref;
		}
		parent(obj);
	}
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.lib;
use Runtime.BaseObject;
use Runtime.BaseProvider;
use Runtime.BaseStruct;
use Runtime.Entity.Provider;
use Runtime.Exceptions.RuntimeException;
use Runtime.Hooks.RuntimeHook;


struct Context extends BaseStruct
{
	/* Struct data */
	var app = null;
	string base_path = "";
	string entry_point = "";
	Collection<string> start_modules = [];
	Collection<string> cli_args = [];
	Dict<string> environments = {};
	Collection<string> modules = [];
	Dict<BaseObject> providers = {};
	Collection<BaseStruct> entities = [];
	int start_time = 0;
	string tz = "UTC";
	bool initialized = false;
	
	
	/**
	 * Returns modules entities
	 */
	pure Collection<BaseStruct> getEntitiesFromModules(Collection<string> modules)
	{
		Vector<BaseStruct> entities = new Vector();
		for (int i=0; i<modules.count(); i++)
		{
			string module_class_name = modules.item(i) ~ ".ModuleDescription";
			if (rtl::method_exists(module_class_name, "entities"))
			{
				fn f = rtl::method(module_class_name, "entities");
				Collection<BaseStruct> arr = f();
				entities.appendVector(arr);
			}
		}
		return entities.removeDuplicates().toCollection();
	}
	
	
	/**
	 * Add provider
	 */
	Context addProvider(string provider_name, BaseProvider provider)
	{
		Context c = this;
		
		if (this.providers.has(provider_name))
		{
			throw new RuntimeException("Provider + '" + provider_name + "' already registered");
		}
		if (not(provider instanceof BaseProvider))
		{
			throw new RuntimeException("Provider + '" + provider_name +
				"' must be intstanceof BaseProvider");
		}
		
		c <= providers <= c.providers.setIm(provider_name, provider);
		
		return c;
	}
	
	
	/**
	 * Returns provider by name
	 */
	BaseObject provider(string provider_name)
	{
		if (not this.providers.has(provider_name))
		{
			throw new RuntimeException("Provider '" ~ provider_name ~ "' not found");
		}
		return this.providers.get(provider_name);
	}
	
	
	/**
	 * Return environment
	 */
	var env(string name)
	{
		var value = this.environments[name];
		
		Dict hook_res = this.callHook(RuntimeHook::ENV, {
			"name": name,
			"value": value,
		});
		
		return hook_res["value"];
	}
	
	
	/**
	 * Create context
	 */
	static void create(Dict d)
	{
		if (not (d instanceof Dict))
		{
			d = Dict::@from(d);
		}
		
		#switch
		
		#case ifcode PHP then
		
		
		#case ifcode JAVASCRIPT then
		
		if (!d.has(ctx, "start_time"))
		{
			d = d.setIm(ctx, "start_time", Date.now());
		}
		
		#case ifcode NODEJS then
		
		let Collection = use("Runtime.Collection");
		let Dict = use("Runtime.Dict");
		
		if (!d.has(ctx, "cli_args"))
		{
			d = d.setIm(ctx, "cli_args", Collection.from(process.argv.slice(1)));
		}
		if (!d.has(ctx, "base_path"))
		{
			d = d.setIm(ctx, "base_path", process.cwd());
		}
		if (!d.has(ctx, "environments"))
		{
			d = d.setIm(ctx, "environments", Dict.from(process.env));
		}
		
		#endswitch
		
		if (d.has("modules"))
		{
			var modules = d.get("modules");
			if (not(modules instanceof Collection))
			{
				d <= modules <= Collection::@from(modules);
			}
		}
		
		/* Setup default environments */
		if (not d.has("environments")) d <= environments <= new Dict();
		
		Dict env = d["environments"];
		if (not env.has("DEBUG")) env <= DEBUG <= false;
		if (not env.has("LOCALE")) env <= LOCALE <= "en_US";
		if (not env.has("LOCALE_CODE")) env <= LOCALE_CODE <= "en";
		d <= environments <= env;
		
		Context instance = rtl::newInstance(static::getClassName(), [ d ]);
		
		return instance;
	}
	
	
	/**
	 * Init
	 */
	async Context init()
	{
		var hook_res;
		
		Context c = this;
		
		if (c.initialized) return c;
		
		/* Create app */
		if (c.entry_point != "")
		{
			c <= app <= rtl::newInstance(c.entry_point);
		}
		
		/* Add start modules */
		c <= start_modules <= c.modules;
		
		/* Get modules */
		Collection<string> modules = c.modules;
		if (modules.indexOf("Runtime")) modules = modules.prependIm("Runtime");
		
		/* Extends modules */
		Collection<string> modules = static::getRequiredModules(modules);
		c <= modules <= modules;
		
		/* Extends app modules */
		if (c.app != null and rtl::method_exists(c.app, "modules"))
		{
			c = await c.app.modules(c);
		}
		
		/* Get modules entities */
		Collection<BaseStruct> entities = static::getEntitiesFromModules(c.modules);
		c <= entities <= entities;
		
		/* Create providers */
		Collection<Provider> providers = c.entities.filter( lib::isInstance(classof Provider) );
		for (int i=0; i<providers.count(); i++)
		{
			Provider info = providers[i];
			if (info.value)
			{
				BaseProvider provider = null;
				if (info.value instanceof BaseProvider)
				{
					provider = info.value;
				}
				else if (rtl::isString(info.value))
				{
					provider = rtl::newInstance(info.value);
				}
				if (provider)
				{
					c = c.addProvider(info.name, provider);
				}
				else if (info.value)
				{
					throw new RuntimeException("Wrong declare provider '" ~ info.name ~ "'");
				}
			}
		}
		
		/* Init providers */
		Collection<string> providers_names = c.providers.keys();
		for (int i=0; i<providers_names.count(); i++)
		{
			string provider_name = providers_names[i];
			BaseProvider provider = c.providers[provider_name];
			c = await provider.init(c);
		}
		
		/* Hook init app */
		hook_res = await c.callAsyncHook(RuntimeHook::INIT, { "context": c });
		c = hook_res["context"];
		
		/* Init app */
		if (c.app != null and rtl::method_exists(c.app, "init"))
		{
			c = await c.app.init(c);
		}
		
		/* Set initialized */
		c <= initialized <= true;
		
		return c;
	}
	
	
	/**
	 * Start context
	 */
	async void start()
	{
		/* Start providers */
		Collection<string> providers_names = this.providers.keys();
		for (int i=0; i<providers_names.count(); i++)
		{
			string provider_name = providers_names[i];
			BaseProvider provider = this.providers[provider_name];
			if (not provider.started)
			{
				await provider.start();
				provider.started = true;
			}
		}
		
		/* Hook start app */
		await this.callAsyncHook(RuntimeHook::START, {});
		
		/* Start app */
		if (this.app and rtl::method_exists(this.app, "start"))
		{
			await this.app.start();
		}
		
		/* Hook launched app */
		await this.callAsyncHook(RuntimeHook::LAUNCHED, {});
	}
	
	
	/**
	 * Run context
	 */
	async int run()
	{
		int code = 0;
		
		/* Run app */
		if (this.app == null)
			return;
		
		/* Run entry_point */
		if (rtl::method_exists(this.app, "main"))
		{
			/* Hook launched app */
			await this.callAsyncHook(RuntimeHook::RUN, {});
			
			code = await this.app.main();
		}
		
		return code;
	}
	
	
	/**
	 * Call hook
	 */
	Dict callHook(string hook_name, Dict d)
	{
		var hook = this.provider("hook");
		Collection<fn> methods_list = hook.getMethods(hook_name);
		
		for (int i=0; i<methods_list.count(); i++)
		{
			Dict info = methods_list[i];
			fn f = rtl::method(info["obj"], info["method_name"]);
			d = f(d);
		}
		
		return d;
	}
	
	
	/**
	 * Call async hook
	 */
	async Dict callAsyncHook(string hook_name, Dict d)
	{
		var hook = this.provider("hook");
		Collection<fn> methods_list = hook.getMethods(hook_name);
		
		for (int i=0; i<methods_list.count(); i++)
		{
			Dict info = methods_list[i];
			fn f = rtl::method(info["obj"], info["method_name"]);
			d = await f(d);
		}
		
		return d;
	}
	
	
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	pure void _getRequiredModules
	(
		Vector<string> res,
		Map<string> cache,
		Collection<string> modules,
		fn filter = null
	)
	{
		if (modules == null) return;
		if (filter) modules = modules.filter(filter);
		for (int i=0; i<modules.count(); i++)
		{
			string module_name = modules.item(i);
			if (cache.get(module_name, false) == false)
			{
				cache.setValue(module_name, true);
				fn f = rtl::method(module_name ~ ".ModuleDescription", "requiredModules");
				Dict<string> sub_modules = f();
				if (sub_modules != null)
				{
					Collection<string> sub_modules = sub_modules.keys();
					static::_getRequiredModules(res, cache, sub_modules);
				}
				res.pushValue(module_name);
			}
		}
	}
	
	
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	pure Collection<string> getRequiredModules(Collection<string> modules)
	{
		Vector<string> res = new Vector();
		Map<string> cache = new Map();
		static::_getRequiredModules(res, cache, modules);
		res = res.removeDuplicates();
		return res.toCollection();
	}
	
	
	/**
	 * Translate message
	 */
	string translate(string module, string s, Dict params = null)
	{
		if (params == null) return s;
		
		return this.format(s, params);
	}
	
	
	/**
	 * Format string
	 */
	string format(string s, Dict params = null)
	{
		if (params == null) return s;
		
		params.each(
			void (string value, string key) use (s)
			{
				s = rs::replace("%" ~ key ~ "%", value, s);
			}
		);
		
		return s;
	}
}

/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.rtl;
use Runtime.BaseStruct;


struct Entity extends BaseStruct
{
	/* Entity name */
	string name = "";
	
	/* Entity params */
	Dict params = {};
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime;

use Runtime.Entity.Provider;


static class ModuleDescription
{
	
	/**
	 * Returns module name
	 * @return string
	 */
	pure string getModuleName() => "Runtime";
	
	
	
	/**
	 * Returns module name
	 * @return string
	 */
	pure string getModuleVersion() => "0.11.4";
	
	
	
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	pure Map<string> requiredModules() => null;
	
	
	
	/**
	 * Returns enities
	 */
	pure Collection<Dict> entities() => 
	[
		new Provider("input", null),
		new Provider("output", "Runtime.Providers.OutputProvider"),
		new Provider("log", null),
		new Provider("hook", "Runtime.Providers.HookProvider"),
	];
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Entity;

use Runtime.rtl;
use Runtime.Entity;


struct Hook extends Entity
{
	void constructor(string name)
	{
		parent({
			"name": name,
		});
	}
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Entity;

use Runtime.Entity;


struct Provider extends Entity
{
	/* Provider class name */
	string value = "";
	
	void constructor(string name, string value)
	{
		parent({
			"name": name,
			"value": value,
		});
	}
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Hooks;

use Runtime.BaseHook;


class RuntimeHook extends BaseHook
{
	static const string INIT = "runtime::init";
	static const string START = "runtime::start";
	static const string LAUNCHED = "runtime::launched";
	static const string RUN = "runtime::run";
	static const string ENV = "runtime::env";
	
	
	/**
	 * Returns method name by hook name
	 */
	string getMethodName(string hook_name)
	{
		if (hook_name == static::INIT) return "init";
		if (hook_name == static::START) return "start";
		if (hook_name == static::LAUNCHED) return "launched";
		if (hook_name == static::RUN) return "run";
		if (hook_name == static::ENV) return "env";
		return "";
	}
	
	
	
	/**
	 * Init context
	 */
	async Dict init(Dict d)
	{
		return d;
	}
	
	
	
	/**
	 * Start context
	 */
	async Dict start(Dict d)
	{
		return d;
	}
	
	
	/**
	 * Launched context
	 */
	async Dict launched(Dict d)
	{
		return d;
	}
	
	
	/**
	 * Run entry point
	 */
	async Dict run(Dict d)
	{
		return d;
	}
	
	
	/**
	 * Init context
	 */
	Dict env(Dict d)
	{
		return d;
	}
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Providers;

use Runtime.lib;
use Runtime.BaseHook;
use Runtime.BaseProvider;
use Runtime.Context;
use Runtime.Entity.Hook;
use Runtime.Exceptions.RuntimeException;


class HookProvider extends BaseProvider
{
	Collection<BaseHook> base_hooks = [];
	Map<Map<Vector>> hooks = new Map();
	
	
	/**
	 * Init provider
	 */
	async void init(Context c)
	{
		Collection<Hook> hooks = c.entities.filter( lib::isInstance(classof Hook) );
		
		Vector<BaseHook> base_hooks = new Vector();
		for (int i=0; i<hooks.count(); i++)
		{
			Hook hook = hooks[i];
			BaseHook base_hook = rtl::newInstance(hook.name);
			base_hooks.pushValue(base_hook);
			base_hook.hook = this;
			base_hook.register_hooks();
			base_hooks.pushValue(base_hook);
		}
		
		this.base_hooks = base_hooks.toCollection();
		
		return c;
	}
	
	
	
	/**
	 * Start provider
	 */
	async void start()
	{
	}
	
	
	
	/**
	 * Register hook
	 */
	void register(string hook_name, var obj, string method_name, int priority = 0)
	{
		if (not this.hooks.has(hook_name)) this.hooks.setValue(hook_name, new Map());
		
		Map priorities = this.hooks[hook_name];
		if (not priorities.has(priority)) priorities.setValue(priority, new Vector());
		
		Vector methods_list = priorities.get(priority);
		methods_list.pushValue({
			"obj": obj,
			"method_name": method_name,
		});
	}
	
	
	
	/**
	 * Remove hook
	 */
	void remove(string hook_name, var obj, string method_name, int priority = 0)
	{
		if (not this.hooks.has(hook_name)) this.hooks.setValue(hook_name, new Map());
		
		Map priorities = this.hooks[hook_name];
		if (not priorities.has(priority)) priorities.setValue(priority, new Vector());
		
		Vector methods_list = priorities.get(priority);
		int index = methods_list.find(
			bool (Dict info) use (obj, method_name)
			{
				return info["obj"] == obj and info["method_name"] == method_name;
			}
		);
		if (index > -1)
		{
			methods_list.removePosition(index);
		}
	}
	
	
	
	/**
	 * Returns method list
	 */
	Collection<fn> getMethods(string hook_name)
	{
		if (not this.hooks.has(hook_name)) return [];
		
		Vector res = new Vector();
		
		Map priorities = this.hooks[hook_name];
		Collection priorities_keys = priorities.keys().sort();
		for (int i=0; i<priorities_keys.count(); i++)
		{
			int priority = priorities_keys[i];
			Vector methods_list = priorities.get(priority);
			
			res.appendVector(methods_list);
		}
		
		return res.toCollection();
	}
	
}
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2023 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace Runtime.Providers;

use Runtime.BaseProvider;
use Runtime.Exceptions.RuntimeException;


class OutputProvider extends BaseProvider
{
		
	void constructor()
	{
		parent();
		
		this.color_table = {
			
			"black": "0;30",
			"dark_red": "0;31",
			"green": "0;32",
			"brown": "0;33",
			"dark_blue": "0;34",
			"dark_purple": "0;35",
			"dark_cyan": "0;36",
			"gray": "0;37",
			"dark_gray": "0;90",
			"red": "0;91",
			"light_green": "0;92",
			"yellow": "0;93",
			"blue": "0;94",
			"purple": "0;95",
			"cyan": "0;96",
			"white": "0;97",
			
			/* Bold */
			"bold_black": "1;30",
			"bold_dark_red": "1;31",
			"bold_green": "1;32",
			"bold_brown": "1;33",
			"bold_dark_blue": "1;34",
			"bold_dark_purple": "1;35",
			"bold_dark_cyan": "1;36",
			"bold_gray": "1;37",
			"bold_dark_gray": "1;90",
			"bold_red": "1;91",
			"bold_light_green": "1;92",
			"bold_yellow": "1;93",
			"bold_blue": "1;94",
			"bold_purple": "1;95",
			"bold_cyan": "1;96",
			"bold_white": "1;97",
			
			/* Italic */
			"italic_black": "3;30",
			"italic_dark_red": "3;31",
			"italic_green": "3;32",
			"italic_brown": "3;33",
			"italic_dark_blue": "3;34",
			"italic_dark_purple": "3;35",
			"italic_dark_cyan": "3;36",
			"italic_gray": "3;37",
			"italic_dark_gray": "3;90",
			"italic_red": "3;91",
			"italic_light_green": "3;92",
			"italic_yellow": "3;93",
			"italic_blue": "3;94",
			"italic_purple": "3;95",
			"italic_cyan": "3;96",
			"italic_white": "3;97",
			
			/* Underline */
			"underline_black": "4;30",
			"underline_dark_red": "4;31",
			"underline_green": "4;32",
			"underline_brown": "4;33",
			"underline_dark_blue": "4;34",
			"underline_dark_purple": "4;35",
			"underline_dark_cyan": "4;36",
			"underline_gray": "4;37",
			"underline_dark_gray": "4;90",
			"underline_red": "4;91",
			"underline_light_green": "4;92",
			"underline_yellow": "4;93",
			"underline_blue": "4;94",
			"underline_purple": "4;95",
			"underline_cyan": "4;96",
			"underline_white": "4;97",
			
			/* Background */
			"bg_black": "0;40",
			"bg_dark_red": "0;41",
			"bg_green": "0;42",
			"bg_brown": "0;43",
			"bg_dark_blue": "0;44",
			"bg_dark_purple": "0;45",
			"bg_dark_cyan": "0;46",
			"bg_gray": "0;47",
			"bg_dark_gray": "0;100",
			"bg_red": "0;101",
			"bg_light_green": "0;102",
			"bg_yellow": "0;103",
			"bg_blue": "0;104",
			"bg_purple": "0;105",
			"bg_cyan": "0;106",
			"bg_white": "0;107",
			
			/* Background italic */
			"bg_italic_black": "3;40",
			"bg_italic_dark_red": "3;41",
			"bg_italic_green": "3;42",
			"bg_italic_brown": "3;43",
			"bg_italic_dark_blue": "3;44",
			"bg_italic_dark_purple": "3;45",
			"bg_italic_dark_cyan": "3;46",
			"bg_italic_gray": "3;47",
			"bg_italic_dark_gray": "3;100",
			"bg_italic_red": "3;101",
			"bg_italic_light_green": "3;102",
			"bg_italic_yellow": "3;103",
			"bg_italic_blue": "3;104",
			"bg_italic_purple": "3;105",
			"bg_italic_cyan": "3;106",
			"bg_italic_white": "3;107",
			
			/* Background underline */
			"bg_underline_black": "4;40",
			"bg_underline_dark_red": "4;41",
			"bg_underline_green": "4;42",
			"bg_underline_brown": "4;43",
			"bg_underline_dark_blue": "4;44",
			"bg_underline_dark_purple": "4;45",
			"bg_underline_dark_cyan": "4;46",
			"bg_underline_gray": "4;47",
			"bg_underline_dark_gray": "4;100",
			"bg_underline_red": "4;101",
			"bg_underline_light_green": "4;102",
			"bg_underline_yellow": "4;103",
			"bg_underline_blue": "4;104",
			"bg_underline_purple": "4;105",
			"bg_underline_cyan": "4;106",
			"bg_underline_white": "4;107",
		};
	}
	
	
	/**
	 * Print message to output
	 */
	void print(string message, bool new_line = true, string type="")
	{
		if (not rtl::isString(message))
			throw new RuntimeException("print message must be string");
		
		#switch
		#case ifcode PHP then
		
		echo $message;
		if ($new_line) echo "\n";
		
		#case ifcode NODEJS then
		
		var output = process.stdout;
		if (type == "error") output = process.stderr;
		
		output.write(message);
		if (new_line) output.write("\n");
		
		#case ifcode ES6 then
		
		console.log(message);
		
		#endswitch
	}
	
	
	/**
	 * Print error
	 */
	void print_error(string message)
	{
		#switch
		#case ifcode PHP then
		
		if (php_sapi_name() == "cli")
		{
			$this->print($ctx, $this->color($ctx, "red", $message), true, "err");
		}
		else
		{
			$this->print($ctx, nl2br($message), true, "err");
		}
		
		#case ifcode JAVASCRIPT then
		let text_color = "dark_red";
		let isNode = false;
		
		#case ifcode NODEJS then
		let text_color = "red";
		let isNode = true;
		
		#case ifcode JAVASCRIPT then
		
		if (message instanceof Error)
		{
			let color = this.getColor(ctx, text_color);
			let char_27 = String.fromCharCode(27);
			
			if (isNode)
			{
				this.print(ctx, char_27 + "[" + color + "m", false, "err");
				this.print(ctx, message.stack, false, "err");
				this.print(ctx, char_27 + "[0m", true, "err");
			}
			else
			{
				let s = char_27 + "[" + color + "m" + message.stack + char_27 + "[0m";
				this.print(ctx, s, true, "err");
			}
		}
		
		else
		{
			this.print(ctx, this.color(ctx, text_color, message), true, "err");
		}
		
		#endswitch
		
	}
	
	
	/**
	 * Format text by color
	 */
	string color(string color, string message)
	{
		color = this.getColor(color);
		message = rs::chr(27) ~ "[" ~ color ~ "m" ~ message;
		message = message ~ rs::chr(27) ~ "[0m";
		return message;
	}
	
	
	/**
	 * Returns bash console code
	 */
	string getColor(string color)
	{
		string color = rs::strtolower(color);
		
		if (this.color_table.has(color)) return this.color_table[color];
		if (rs::strlen(color) > 5) return "0";
		
		return color;
	}
	
}
