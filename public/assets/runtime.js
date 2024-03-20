"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.rtl = function()
{
};
Object.assign(Runtime.rtl.prototype,
{
	/**
	 * Debug
	 */
	trace: function()
	{
	},
});
Object.assign(Runtime.rtl,
{
	LOG_FATAL: 0,
	LOG_CRITICAL: 2,
	LOG_ERROR: 4,
	LOG_WARNING: 6,
	LOG_INFO: 8,
	LOG_DEBUG: 10,
	LOG_DEBUG2: 12,
	STATUS_PLAN: 0,
	STATUS_DONE: 1,
	STATUS_PROCESS: 100,
	STATUS_FAIL: -1,
	ERROR_NULL: 0,
	ERROR_OK: 1,
	ERROR_PROCCESS: 100,
	ERROR_FALSE: -100,
	ERROR_UNKNOWN: -1,
	ERROR_INDEX_OUT_OF_RANGE: -2,
	ERROR_KEY_NOT_FOUND: -3,
	ERROR_STOP_ITERATION: -4,
	ERROR_FILE_NOT_FOUND: -5,
	ERROR_ITEM_NOT_FOUND: -5,
	ERROR_OBJECT_DOES_NOT_EXISTS: -5,
	ERROR_OBJECT_ALLREADY_EXISTS: -6,
	ERROR_ASSERT: -7,
	ERROR_REQUEST: -8,
	ERROR_RESPONSE: -9,
	ERROR_CSRF_TOKEN: -10,
	ERROR_RUNTIME: -11,
	ERROR_VALIDATION: -12,
	ERROR_PARSE_SERIALIZATION_ERROR: -14,
	ERROR_ASSIGN_DATA_STRUCT_VALUE: -15,
	ERROR_AUTH: -16,
	ERROR_DUPLICATE: -17,
	ERROR_API_NOT_FOUND: -18,
	ERROR_API_WRONG_FORMAT: -19,
	ERROR_API_WRONG_APP_NAME: -20,
	ERROR_API_ERROR: -21,
	ERROR_FATAL: -99,
	ERROR_HTTP_CONTINUE: -100,
	ERROR_HTTP_SWITCH: -101,
	ERROR_HTTP_PROCESSING: -102,
	ERROR_HTTP_OK: -200,
	ERROR_HTTP_BAD_GATEWAY: -502,
	ERROR_USER: -10000,
	_memorize_cache: null,
	_memorize_not_found: null,
	_memorize_hkey: null,
	_global_context: null,
	JSON_PRETTY: 1,
	/**
	 * Define class
	 */
	defClass: function(obj)
	{
		if (Runtime.rtl._classes == undefined) Runtime.rtl._classes = {};
		Runtime.rtl._classes[obj.getClassName()] = obj;
	},
	/**
	 * Find class instance by name. If class does not exists return null.
	 * @return var - class instance
	 */
	find_class: function(class_name)
	{
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
	},
	/**
	 * Is context
	 */
	is_context: function()
	{
		return false;
	},
	/**
	 * Returns true if class instanceof class_name
	 * @return bool
	 */
	is_instanceof: function(obj, class_name)
	{
		var c = this.find_class(class_name);
		if (c == null) return false;
		return c.prototype.isPrototypeOf(obj);
	},
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	is_implements: function(obj, interface_name)
	{
		if (obj == undefined) return false;
		if (obj.constructor.__implements__ == undefined) return false;
		return obj.constructor.__implements__.indexOf(interface_name) != -1;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_exists: function(class_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		return true;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	get_class_name: function(obj)
	{
		if (this.isString(obj))
		{
			return obj;
		}
		return obj.constructor.getClassName();
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_implements: function(class_name, interface_name)
	{
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
	},
	/**
	 * Returns interface of class
	 * @param string class_name
	 * @return Collection<string>
	 */
	getInterfaces: function(class_name)
	{
		return this.find_class(class_name).__implements__;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	method_exists: function(class_name, method_name)
	{
		if (typeof(class_name) == "object")
		{
			if (class_name[method_name] != undefined) return true;
			return false;
		}
		
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		if (this.exists(obj[method_name])) return true;
		return false;
	},
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	newInstance: function(class_name, args)
	{
		if (args == undefined) args = null;
		var obj = this.find_class(class_name);
		if (!this.exists(obj) || !(obj instanceof Function))
			throw new Runtime.Exceptions.FileNotFound(class_name, "class name");
		if (args == undefined || args == null){ args = []; } else { args = args.toArray(); }
		args = args.slice(); 
		if (typeof ctx != "undefined") args.unshift();
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	method: function(obj, method_name)
	{
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
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	apply: function(f, args)
	{
		var is_ctx = false;
		var c = null;
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (typeof ctx != "undefined") args.unshift();
		if (this.isString(f))
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
	},
	/**
	 * Call await method
	 * @return fn
	 */
	applyAsync: async function(f, args)
	{
		var res;
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		if (f instanceof Runtime.Callback)
		{
			return await f.callAsync(args);
		}
		
		if (typeof ctx != "undefined") args.unshift();
		if (this.isString(f))
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
	},
	/**
	 * Apply method
	 * @return var
	 */
	methodApply: function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		var f = Runtime.rtl.method(class_name, method_name);
		return Runtime.rtl.apply(f, args);
	},
	applyMethod: function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return this.methodApply(class_name, method_name, args);
	},
	callMethod: function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return this.methodApply(class_name, method_name, args);
	},
	/**
	 * Apply method async
	 * @return var
	 */
	methodApplyAsync: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		var f = Runtime.rtl.method(class_name, method_name);
		return Promise.resolve(await Runtime.rtl.applyAsync(f, args));
	},
	applyAsyncMethod: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return await this.methodApplyAsync(class_name, method_name, args);
	},
	applyMethodAsync: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return await this.methodApplyAsync(class_name, method_name, args);
	},
	callAsyncMethod: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return await this.methodApplyAsync(class_name, method_name, args);
	},
	callMethodAsync: async function(class_name, method_name, args)
	{
		if (args == undefined) args = null;
		return await this.methodApplyAsync(class_name, method_name, args);
	},
	/**
	 * Returns value
	 */
	get: function(item, key, def_val)
	{
		if (def_val == undefined) def_val = null;
		return this.attr(item, key, def_val);
	},
	/**
	 * Returns callback
	 * @return var
	 */
	attr: function(item, path, def_val)
	{
		if (def_val == undefined) def_val = null;
		if (path === null)
		{
			return def_val;
		}
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var BaseStruct = use("Runtime.BaseStruct");
		var BaseObject = use("Runtime.BaseObject");
		
		if (def_val == undefined) def_val = null;
		if (item === null) return def_val;
		if (item === undefined) return def_val;
		if (Array.isArray(path) && path.count == undefined) path = Collection.from(path);
		if (this.isScalarValue(path)) path = Collection.from([path]);
		if (!(path instanceof Collection)) return def_val;
		if (path.count() == 0)
		{
			return item;
		}
		if (typeof item == "string") return item.charAt(path[0]);
		var key = path.first();
		var path = path.removeFirstIm();
		var val = def_val;
		if (item instanceof Dict || item instanceof Collection)
		{
			var new_item = item.get(key, def_val);
			val = this.attr(new_item, path, def_val);
			return val;
		}
		else if (item instanceof BaseStruct)
		{
			var new_item = item.get(key, def_val);
			val = this.attr(new_item, path, def_val);
			return val;
		}
		else if (item instanceof BaseObject)
		{
			var new_item = item.takeValue(key, def_val);
			val = this.attr(new_item, path, def_val);
			return val;
		}
		else
		{
			var new_item = item[key] || def_val;
			val = this.attr(new_item, path, def_val);
			return val;
		}
		return def_val;
	},
	/**
	 * Update current item
	 * @return var
	 */
	setAttr: function(item, attrs, new_value)
	{
		if (attrs == null)
		{
			return item;
		}
		var Collection = use("Runtime.Collection");
		if (typeof attrs == "string") attrs = Collection.from([attrs]);
		else if (Array.isArray(attrs) && attrs.count == undefined) attrs = Collection.from(attrs);
		var f = (attrs, data, new_value, f) => 
		{
			if (attrs.count() == 0)
			{
				return new_value;
			}
			if (data == null)
			{
				data = Runtime.Map.from({});
			}
			var new_data = null;
			var attr_name = attrs.first();
			if (data instanceof Runtime.BaseStruct)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				var d = (new Runtime.Map()).setValue(attr_name, res);
				new_data = data.copy(d);
			}
			else if (data instanceof Runtime.BaseObject)
			{
				var attr_data = data.takeValue(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				new_data = data;
				new_data.assignValue(attr_name, res);
			}
			else if (data instanceof Runtime.Dict)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				new_data = data.setIm(attr_name, res);
			}
			else if (data instanceof Runtime.Collection)
			{
				var attr_data = data.get(attr_name, null);
				var res = f(attrs.removeFirstIm(), attr_data, new_value, f);
				new_data = data.setIm(attr_name, res);
			}
			return new_data;
		};
		var new_item = f(attrs, item, new_value, f);
		return new_item;
	},
	/**
	 * Returns value
	 * @param var value
	 * @param var def_val
	 * @param var obj
	 * @return var
	 */
	to: function(v, o)
	{
		var ctx = null;
		var e = "";
		if (e == "mixed" || e == "primitive" || e == "var" || e == "fn" || e == "callback")
		{
			return v;
		}
		if (e == "bool")
		{
			return this.toBool(v);
		}
		else if (e == "string")
		{
			return this.toString(v);
		}
		else if (e == "int")
		{
			return this.toInt(v);
		}
		else if (e == "float")
		{
			return this.toFloat(v);
		}
		else if (Runtime.rtl.is_instanceof(v, e))
		{
			return v;
		}
		return v;
	},
	/**
	 * Convert monad by type
	 */
	m_to: function(type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			return new Runtime.Monad((m.err == null) ? (this.convert(m.val, type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad to default value
	 */
	m_def: function(def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			return (m.err != null || m.val === null) ? (new Runtime.Monad(def_value)) : (m);
		};
	},
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	convert: function(v, t, d)
	{
		if (d == undefined) d = null;
		if (v === null)
		{
			return d;
		}
		if (t == "mixed" || t == "primitive" || t == "var" || t == "fn" || t == "callback")
		{
			return v;
		}
		if (t == "bool" || t == "boolean")
		{
			return this.toBool(v);
		}
		else if (t == "string")
		{
			return this.toString(v);
		}
		else if (t == "int")
		{
			return this.toInt(v);
		}
		else if (t == "float" || t == "double")
		{
			return this.toFloat(v);
		}
		else if (this.is_instanceof(v, t))
		{
			return v;
		}
		return this.toObject(v, t, d);
	},
	/**
	 * Returns true if value instanceof tp
	 * @param var value
	 * @param string tp
	 * @return bool
	 */
	checkValue: function(value, tp)
	{
		if (tp == "int")
		{
			return this.isInt(value);
		}
		if (tp == "float" || tp == "double")
		{
			return this.isDouble(value);
		}
		if (tp == "string")
		{
			return this.isString(value);
		}
		if (tp == "bool" || tp == "boolean")
		{
			return this.isBoolean(value);
		}
		if (Runtime.rtl.is_instanceof(value, tp))
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is empty
	 * @param var value
	 * @return bool
	 */
	isEmpty: function(value)
	{
		return !this.exists(value) || value === null || value === "" || value === false || value === 0;
	},
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return bool
	 */
	exists: function(value)
	{
		return (value != null) && (value != undefined);
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool
	 */
	getType: function(value)
	{
		if (value == null)
		{
			return "null";
		}
		if (Runtime.rtl.isString(value))
		{
			return "string";
		}
		if (Runtime.rtl.isNumber(value))
		{
			return "number";
		}
		if (Runtime.rtl.isBoolean(value))
		{
			return "boolean";
		}
		if (Runtime.rtl.isFn(value))
		{
			return "fn";
		}
		if (value instanceof Runtime.Collection)
		{
			return "collection";
		}
		if (value instanceof Runtime.Dict)
		{
			return "dict";
		}
		if (value instanceof Runtime.BaseObject)
		{
			return "object";
		}
		return "unknown";
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	isScalarValue: function(value)
	{
		if (value == null)
		{
			return true;
		}
		if (Runtime.rtl.isString(value))
		{
			return true;
		}
		if (Runtime.rtl.isNumber(value))
		{
			return true;
		}
		if (Runtime.rtl.isBoolean(value))
		{
			return true;
		}
		return false;
	},
	/**
	 * Returns true if value is scalar array
	 * @return bool
	 */
	isArray: function(value)
	{
		if (value instanceof Runtime.Collection)
		{
			return true;
		}
		if (value instanceof Array) return true;
		return false;
	},
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	isBoolean: function(value)
	{
		if (value === false || value === true)
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	isBool: function(value)
	{
		return this.isBoolean(value);
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isInt: function(value)
	{
		if (typeof value != "number") return false;
		if (value % 1 !== 0) return false;
		return true;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isDouble: function(value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isNumber: function(value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	isString: function(value)
	{
		if (typeof value == 'string') return true;
		else if (value instanceof String) return true;
		return false;
	},
	/**
	 * Return true if value is function
	 * @param var value
	 * @return bool
	 */
	isFn: function(value)
	{
		if (typeof(value) == 'function') return true;
		return false;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toString: function(value)
	{
		var _StringInterface = use("Runtime.StringInterface");
		
		if (value === null) return "";
		if (typeof value == 'string') return value;
		if (value instanceof String) return "" + value;
		if (this.is_implements(null, value, _StringInterface)) return value.toString();
		return ""+value;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toStr: function(value)
	{
		return this.toString(value);
	},
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	toInt: function(val)
	{
		var res = parseInt(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Convert value to boolean
	 * @param var value
	 * @return bool
	 */
	toBool: function(val)
	{
		var res = false;
		if (val == false || val == 'false') return false;
		if (val == true || val == 'true') return true;
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return false;
	},
	/**
	 * Convert value to float
	 * @param var value
	 * @return float
	 */
	toFloat: function(val)
	{
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Convert to object
	 */
	toObject: function(v, t, d)
	{
		if (d == undefined) d = null;
		if (this.is_instanceof(v, t))
		{
			return v;
		}
		if (t == "Runtime.Collection")
		{
			return Runtime.Collection.from(v);
		}
		if (t == "Runtime.Vector")
		{
			return Runtime.Vector.from(v);
		}
		if (t == "Runtime.Dict")
		{
			return Runtime.Dict.from(v);
		}
		if (t == "Runtime.Map")
		{
			return Runtime.Map.from(v);
		}
		try
		{
			var newInstance = this.method(t, "newInstance");
			return newInstance(v);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
		return d;
	},
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	ceil: function(value)
	{
		return Math.ceil(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	floor: function(value)
	{
		return Math.floor(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	round: function(value)
	{
		return Math.round(value);
	},
	/* ====================== Assert ====================== */
	assert: function(expr, message)
	{
		if (!expr)
		{
			throw new Runtime.Exceptions.AssertException(message)
		}
	},
	_memorizeValidHKey: function(hkey, key)
	{
	},
	/**
	 * Clear memorize cache
	 */
	_memorizeClear: function()
	{
		this._memorize_cache = null;
	},
	/**
	 * Returns cached value
	 */
	_memorizeValue: function(name, args)
	{
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
	},
	/**
	 * Returns cached value
	 */
	_memorizeSave: function(name, args, value)
	{
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
	},
	/* ================ Dirty functions ================ */
	/**
	 * Sleep in ms
	 */
	sleep: async function(time)
	{
		await new Promise((f, e) => setTimeout(f, time));
	},
	/**
	 * Sleep in microseconds
	 */
	usleep: async function(time)
	{
		await new Promise((f, e) => setTimeout(f, Math.round(time / 1000)));
	},
	/**
	 * Returns unique value
	 * @param bool flag If true returns as text. Default true
	 * @return string
	 */
	unique: function(flag)
	{
		if (flag == undefined) flag = true;
		if (flag == undefined) flag = true;
		if (flag)
			return "" + (new Date).getTime() + Math.floor((Math.random() * 899999 + 100000));
		return Symbol();
	},
	/**
	 * Generate uuid
	 */
	uid: function()
	{
	},
	/**
	 * Generate timestamp based uuid
	 */
	time_uid: function()
	{
	},
	/**
	 * Returns random value x, where 0 <= x < 1
	 * @return double
	 */
	urandom: function()
	{
		if (
			window != undefined && window.crypto != undefined &&
			window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return s[0] / 4294967296;
		}
		
		return Math.random();
	},
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	random: function(a, b)
	{
		if (
			window != undefined && window.crypto != undefined &&
			window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return Math.floor(s[0] / 4294967296 * (b - a + 1) + a);
		}
		
		return Math.floor(Math.random() * (b - a + 1) + a);
	},
	/**
	 * Generate random string
	 * @var len - string length
	 * @var spec
	 *   - a - alpha
	 *   - n - numberic
	 * @return string
	 */
	random_string: function(len, spec)
	{
		if (len == undefined) len = 8;
		if (spec == undefined) spec = "aun";
		var s = "";
		var res = "";
		var sz = Runtime.rs.strlen(spec);
		for (var i = 0; i < sz; i++)
		{
			var ch = Runtime.rtl.get(spec, i);
			if (ch == "a")
			{
				s += Runtime.rtl.toStr("qwertyuiopasdfghjklzxcvbnm");
			}
			if (ch == "u")
			{
				s += Runtime.rtl.toStr("QWERTYUIOPASDFGHJKLZXCVBNM");
			}
			else if (ch == "n")
			{
				s += Runtime.rtl.toStr("0123456789");
			}
			else if (ch == "s")
			{
				s += Runtime.rtl.toStr("!@#$%^&*()-_+='\":;'.,<>?/|~");
			}
		}
		var sz_s = Runtime.rs.strlen(s);
		for (var i = 0; i < len; i++)
		{
			var code = this.random(0, sz_s - 1);
			res += Runtime.rtl.toStr(Runtime.rtl.get(s, code));
		}
		return res;
	},
	/**
	 * Returns current unix time in seconds
	 * @return int
	 */
	time: function()
	{
		return Math.round((new Date()).getTime() / 1000);
	},
	/**
	 * Returns unix timestamp
	 */
	utime: function()
	{
		return (new Date()).getTime() * 1000;
	},
	/**
	 * Returns global context
	 * @return Context
	 */
	getContext: function()
	{
		if (!Runtime.rtl._global_context) return new Runtime.Context();
		return Runtime.rtl._global_context;
	},
	/**
	 * Set global context
	 * @param Context context
	 */
	setContext: function(context)
	{
		use("Runtime.rtl")._global_context = context;
		window['global_context'] = context;
		return context;
	},
	/**
	 * Run context
	 * @param Dict d
	 */
	createContext: async function(d)
	{
		var ctx = null;
		var context = Runtime.Context.create(d);
		/* Init context */
		context = await context.init();
		/* Setup global context */
		this.setContext(context);
		return Promise.resolve(context);
	},
	/**
	 * Run application
	 * @param Dict d
	 */
	runApp: async function(class_name, modules, d)
	{
		if (d == undefined) d = null;
		if (d == null)
		{
			d = Runtime.Map.from({});
		}
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["entry_point"]), class_name);
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["modules"]), modules);
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
		return Promise.resolve(0);
	},
	/* ============================= Runtime Utils Functions ============================= */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	getParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = new Runtime.Vector();
		while (class_name != "")
		{
			res.pushValue(class_name);
			class_name = this.methodApply(class_name, "getParentClassName");
		}
		var __memorize_value = res.toCollection();
		Runtime.rtl._memorizeSave("Runtime.rtl.getParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns class annotations
	 */
	getClassAnnotations: function(class_name, res)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getClassAnnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = Runtime.Vector.from([]);
		}
		var info = this.methodApply(class_name, "getClassInfo");
		var __v0 = new Runtime.Monad(Runtime.rtl.get(info, "annotations"));
		__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
		var arr = __v0.value();
		var __memorize_value = res.concat(arr);
		Runtime.rtl._memorizeSave("Runtime.rtl.getClassAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns class annotations with parents
	 */
	getClassAnnotationsWithParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getClassAnnotationsWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Map.from({});
		var parents = this.getParents(class_name);
		for (var i = 0; i < parents.count(); i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			res = this.getClassAnnotations(parent_class_name, res);
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getClassAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns field info
	 */
	getFieldInfo: function(class_name, field_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldInfo", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = this.methodApply(class_name, "getFieldInfoByName", Runtime.Vector.from([field_name]));
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldInfo", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns field info
	 */
	getFieldInfoWithParents: function(class_name, field_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldInfoWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var parents = this.getParents(class_name);
		for (var i = 0; i < parents.count(); i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			var res = this.methodApply(parent_class_name, "getFieldInfoByName", Runtime.Vector.from([field_name]));
			if (res != null)
			{
				var __memorize_value = res;
				Runtime.rtl._memorizeSave("Runtime.rtl.getFieldInfoWithParents", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = null;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldInfoWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields of class
	 */
	getFields: function(class_name, flag)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFields", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (flag == undefined) flag = 255;
		var names = new Runtime.Vector();
		var parents = this.getParents(class_name);
		for (var i = 0; i < parents.count(); i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			var item_fields = this.methodApply(parent_class_name, "getFieldsList", Runtime.Vector.from([flag]));
			if (item_fields != null)
			{
				names.appendVector(item_fields);
			}
		}
		var __memorize_value = names.toCollection().removeDuplicatesIm();
		Runtime.rtl._memorizeSave("Runtime.rtl.getFields", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields annotations
	 */
	getFieldsAnnotations: function(class_name, res)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldsAnnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (res == undefined) res = null;
		if (res == null)
		{
			res = Runtime.Map.from({});
		}
		var methods = this.methodApply(class_name, "getFieldsList", Runtime.Vector.from([255]));
		for (var i = 0; i < methods.count(); i++)
		{
			var method_name = Runtime.rtl.get(methods, i);
			var info = this.methodApply(class_name, "getFieldInfoByName", Runtime.Vector.from([method_name]));
			var annotations = Runtime.rtl.get(info, "annotations");
			var __v0 = new Runtime.Monad(Runtime.rtl.get(res, method_name));
			__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
			var arr = __v0.value();
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from([method_name]), arr.concat(annotations));
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldsAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns fields annotations with parents
	 */
	getFieldsAnnotationsWithParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getFieldsAnnotationsWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Map.from({});
		var parents = this.getParents(class_name);
		for (var i = 0; i < parents.count(); i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			res = this.getFieldsAnnotations(parent_class_name, res);
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getFieldsAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods annotations
	 */
	getMethodsAnnotations: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getMethodsAnnotations", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Map.from({});
		var methods = this.methodApply(class_name, "getMethodsList", Runtime.Vector.from([255]));
		for (var i = 0; i < methods.count(); i++)
		{
			var method_name = Runtime.rtl.get(methods, i);
			var info = this.methodApply(class_name, "getMethodInfoByName", Runtime.Vector.from([method_name]));
			var annotations = Runtime.rtl.get(info, "annotations");
			var __v0 = new Runtime.Monad(Runtime.rtl.get(res, method_name));
			__v0 = __v0.monad(Runtime.rtl.m_to("Runtime.Collection", Runtime.Vector.from([])));
			var arr = __v0.value();
			res = Runtime.rtl.setAttr(res, Runtime.Collection.from([method_name]), arr.concat(annotations));
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getMethodsAnnotations", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods annotations with parents
	 */
	getMethodsAnnotationsWithParents: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rtl.getMethodsAnnotationsWithParents", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var res = Runtime.Map.from({});
		var parents = this.getParents(class_name);
		for (var i = 0; i < parents.count(); i++)
		{
			var parent_class_name = Runtime.rtl.get(parents, i);
			res = res.concatIm(this.getMethodsAnnotations(parent_class_name));
		}
		var __memorize_value = res;
		Runtime.rtl._memorizeSave("Runtime.rtl.getMethodsAnnotationsWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ============================= Serialization Functions ============================= */
	ObjectToNative: function(value, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		var value1 = this.ObjectToPrimitive(value, force_class_name);
		var value2 = this.PrimitiveToNative(value1);
		return value2;
	},
	NativeToObject: function(value, allow_class_name)
	{
		if (allow_class_name == undefined) allow_class_name = true;
		var value1 = this.NativeToPrimitive(value);
		var value2 = this.PrimitiveToObject(value1, allow_class_name);
		return value2;
	},
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	ObjectToPrimitive: function(obj, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		if (obj === null)
		{
			return null;
		}
		if (Runtime.rtl.isScalarValue(obj))
		{
			return obj;
		}
		if (obj instanceof Runtime.Collection)
		{
			return obj.map((value) => 
			{
				return this.ObjectToPrimitive(value, force_class_name);
			});
		}
		if (obj instanceof Runtime.Dict)
		{
			obj = obj.map((value, key) => 
			{
				return this.ObjectToPrimitive(value, force_class_name);
			});
			return obj.toDict();
		}
		if (obj instanceof Runtime.Date)
		{
			return obj;
		}
		if (obj instanceof Runtime.DateTime)
		{
			return obj;
		}
		if (obj instanceof Runtime.BaseStruct)
		{
			var values = new Runtime.Map();
			var names = Runtime.rtl.getFields(obj.constructor.getClassName());
			for (var i = 0; i < names.count(); i++)
			{
				var variable_name = names.item(i);
				var value = obj.get(variable_name, null);
				var value = this.ObjectToPrimitive(value, force_class_name);
				values.setValue(variable_name, value);
			}
			if (force_class_name)
			{
				values.setValue("__class_name__", obj.constructor.getClassName());
			}
			return values.toDict();
		}
		return null;
	},
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return var
	 */
	PrimitiveToObject: function(obj, allow_class_name)
	{
		if (allow_class_name == undefined) allow_class_name = true;
		if (obj === null)
		{
			return null;
		}
		if (Runtime.rtl.isScalarValue(obj))
		{
			return obj;
		}
		if (obj instanceof Runtime.Collection)
		{
			var res = new Runtime.Vector();
			for (var i = 0; i < obj.count(); i++)
			{
				var value = obj.item(i);
				value = this.PrimitiveToObject(value, allow_class_name);
				res.pushValue(value);
			}
			return res.toCollection();
		}
		if (obj instanceof Runtime.Dict)
		{
			var res = new Runtime.Map();
			var keys = obj.keys();
			for (var i = 0; i < keys.count(); i++)
			{
				var key = keys.item(i);
				var value = obj.item(key);
				value = this.PrimitiveToObject(value, allow_class_name);
				res.setValue(key, value);
			}
			if (!res.has("__class_name__"))
			{
				return res.toDict();
			}
			if (res.item("__class_name__") == "Runtime.Map" || res.item("__class_name__") == "Runtime.Dict")
			{
				res.remove("__class_name__");
				return res.toDict();
			}
			if (!allow_class_name)
			{
				return res.toDict();
			}
			var class_name = res.item("__class_name__");
			if (!Runtime.rtl.class_exists(class_name))
			{
				return null;
			}
			if (!Runtime.rtl.class_implements(class_name, "Runtime.SerializeInterface"))
			{
				return null;
			}
			/* Assign values */
			var obj = new Runtime.Map();
			var names = Runtime.rtl.getFields(class_name);
			for (var i = 0; i < names.count(); i++)
			{
				var variable_name = names.item(i);
				if (variable_name != "__class_name__")
				{
					var value = res.get(variable_name, null);
					obj.setValue(variable_name, value);
				}
			}
			/* New instance */
			var instance = Runtime.rtl.newInstance(class_name, Runtime.Vector.from([obj]));
			return instance;
		}
		if (obj instanceof Runtime.Date)
		{
			return obj;
		}
		if (obj instanceof Runtime.DateTime)
		{
			return obj;
		}
		return null;
	},
	NativeToPrimitive: function(value)
	{
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
			new_value = new_value.map((val)=>{
				return Runtime.rtl.NativeToPrimitive(val);
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
			new_value = new_value.map((val, key)=>{
				return Runtime.rtl.NativeToPrimitive(val);
			});
			return new_value;
		}
		
		return value;
	},
	PrimitiveToNative: function(value)
	{
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
			value = value.toDict().setIm("__class_name__", "Runtime.Date");
		}
		else if (value instanceof _DateTime)
		{
			value = value.toDict().setIm("__class_name__", "Runtime.DateTime");
		}
		
		if (value instanceof _Collection)
		{
			var arr = [];
			value.each((v)=>{
				arr.push( Runtime.rtl.PrimitiveToNative(v) );
			});
			return arr;
		}
		if (value instanceof _Dict)
		{
			var obj = {};
			value.each((v, k)=>{
				obj[k] = Runtime.rtl.PrimitiveToNative(v);
			});
			return obj;
		}
		return value;
	},
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	json_encode: function(value, flags, convert)
	{
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		var _Date = use("Runtime.Date");
		var _DateTime = use("Runtime.DateTime");
		
		if (convert) value = _rtl.ObjectToPrimitive(value);
		return JSON.stringify(value, (key, value) => {
			if (value instanceof _Date) value = value.toDict().setIm("__class_name__", "Runtime.Date");
			if (value instanceof _DateTime) value = value.toDict().setIm("__class_name__", "Runtime.DateTime");
			if (value instanceof _Collection) return value;
			if (value instanceof _Dict) return value.toObject();
			if (_rtl.isScalarValue(value)) return value;
			return null;
		});
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var 
	 */
	json_decode: function(obj, allow_class_name)
	{
		if (allow_class_name == undefined) allow_class_name = true;
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
			return this.PrimitiveToObject(res, allow_class_name);
		}
		catch(e){
			throw e;
		}
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.rtl";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"defClass",
			"find_class",
			"is_context",
			"is_instanceof",
			"is_implements",
			"class_exists",
			"get_class_name",
			"class_implements",
			"getInterfaces",
			"method_exists",
			"newInstance",
			"method",
			"apply",
			"applyAsync",
			"methodApply",
			"applyMethod",
			"callMethod",
			"methodApplyAsync",
			"applyAsyncMethod",
			"applyMethodAsync",
			"callAsyncMethod",
			"callMethodAsync",
			"get",
			"attr",
			"setAttr",
			"to",
			"m_to",
			"m_def",
			"convert",
			"checkValue",
			"isEmpty",
			"exists",
			"getType",
			"isScalarValue",
			"isArray",
			"isBoolean",
			"isBool",
			"isInt",
			"isDouble",
			"isNumber",
			"isString",
			"isFn",
			"toString",
			"toStr",
			"toInt",
			"toBool",
			"toFloat",
			"toObject",
			"ceil",
			"floor",
			"round",
			"assert",
			"_memorizeValidHKey",
			"_memorizeClear",
			"_memorizeValue",
			"_memorizeSave",
			"sleep",
			"usleep",
			"unique",
			"uid",
			"time_uid",
			"urandom",
			"random",
			"random_string",
			"time",
			"utime",
			"trace",
			"getContext",
			"setContext",
			"createContext",
			"runApp",
			"getParents",
			"getClassAnnotations",
			"getClassAnnotationsWithParents",
			"getFieldInfo",
			"getFieldInfoWithParents",
			"getFields",
			"getFieldsAnnotations",
			"getFieldsAnnotationsWithParents",
			"getMethodsAnnotations",
			"getMethodsAnnotationsWithParents",
			"ObjectToNative",
			"NativeToObject",
			"ObjectToPrimitive",
			"PrimitiveToObject",
			"NativeToPrimitive",
			"PrimitiveToNative",
			"json_encode",
			"json_decode",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.rtl);
window["Runtime.rtl"] = Runtime.rtl;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.rtl;
var use = function(s){return Runtime.rtl.find_class(s);}
if (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')
	Runtime.rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
/* Lambda Functions */
Runtime.lib = function()
{
};
Object.assign(Runtime.lib.prototype,
{
});
Object.assign(Runtime.lib,
{
	/**
	 * Check object is istance
	 */
	isInstance: function(class_name)
	{
		return (item) => 
		{
			return Runtime.rtl.is_instanceof(item, class_name);
		};
	},
	/**
	 * Check object is implements interface
	 */
	isImplements: function(class_name)
	{
		return (item) => 
		{
			return Runtime.rtl.is_implements(item, class_name);
		};
	},
	/**
	 * Check class is implements interface
	 */
	classImplements: function(class_name)
	{
		return (item) => 
		{
			return Runtime.rtl.class_implements(item, class_name);
		};
	},
	/**
	 * Create struct
	 */
	createStruct: function(class_name)
	{
		return (data) => 
		{
			return Runtime.rtl.newInstance(class_name, Runtime.Vector.from([data]));
		};
	},
	/**
	 * Equal two struct by key
	 */
	equal: function(value)
	{
		return (item) => 
		{
			return item == value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNot: function(value)
	{
		return (item) => 
		{
			return item != value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalAttr: function(key, value)
	{
		return (item1) => 
		{
			return (item1 != null) ? (Runtime.rtl.attr(item1, key) == value) : (false);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNotAttr: function(key, value)
	{
		return (item1) => 
		{
			return (item1 != null) ? (Runtime.rtl.attr(item1, key) != value) : (false);
		};
	},
	equalAttrNot: function(key, value)
	{
		return this.equalNotAttr(key, value);
	},
	/**
	 * Equal attrs
	 */
	equalAttrs: function(search)
	{
		return (item) => 
		{
			var fields = search.keys();
			for (var i = 0; i < fields.count(); i++)
			{
				var field_name = Runtime.rtl.get(fields, i);
				if (Runtime.rtl.get(search, field_name) != Runtime.rtl.get(item, field_name))
				{
					return false;
				}
			}
			return true;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalMethod: function(method_name, value)
	{
		return (item1) => 
		{
			if (item1 == null)
			{
				return false;
			}
			var f = Runtime.rtl.method(item1, method_name);
			return f() == value;
		};
	},
	/**
	 * Returns key value of obj
	 */
	get: function(key, def_value)
	{
		return (obj) => 
		{
			return Runtime.rtl.attr(obj, Runtime.Vector.from([key]), def_value);
		};
	},
	/**
	 * Set value
	 */
	set: function(key, value)
	{
		return (obj) => 
		{
			return Runtime.rtl.setAttr(obj, Runtime.Vector.from([key]), value);
		};
	},
	/**
	 * Returns attr of item
	 */
	attr: function(path, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (obj) => 
		{
			return Runtime.rtl.attr(obj, path, def_value);
		};
	},
	/**
	 * Set dict attr
	 */
	setAttr: function(path, value)
	{
		return (obj) => 
		{
			return Runtime.rtl.setAttr(obj, path, value);
		};
	},
	/**
	 * Returns max id from items
	 */
	getMaxIdFromItems: function(items, start)
	{
		if (start == undefined) start = 0;
		return items.reduce((value, item) => 
		{
			return (item.id > value) ? (item.id) : (value);
		}, start);
	},
	/**
	 * Copy object
	 */
	copy: function(d)
	{
		return (item) => 
		{
			return item.copy(d);
		};
	},
	/**
	 * Take dict
	 */
	takeDict: function(fields)
	{
		return (item) => 
		{
			return item.takeDict(fields);
		};
	},
	/**
	 * Map
	 */
	map: function(f)
	{
		return (m) => 
		{
			return m.map(f);
		};
	},
	/**
	 * Filter
	 */
	filter: function(f)
	{
		return (m) => 
		{
			return m.filter(f);
		};
	},
	/**
	 * Intersect
	 */
	intersect: function(arr)
	{
		return (m) => 
		{
			return m.intersect(arr);
		};
	},
	/**
	 * Sort
	 */
	sort: function(f)
	{
		return (m) => 
		{
			return m.sortIm(f);
		};
	},
	/**
	 * Transition
	 */
	transition: function(f)
	{
		return (m) => 
		{
			return m.transition(f);
		};
	},
	/**
	 * Concat
	 */
	concat: function(arr)
	{
		return (m) => 
		{
			return m.concat(arr);
		};
	},
	/**
	 * Sort asc
	 */
	sortAsc: function(a, b)
	{
		return (a > b) ? (1) : ((a < b) ? (-1) : (0));
	},
	/**
	 * Sort desc
	 */
	sortDesc: function(a, b)
	{
		return (a > b) ? (-1) : ((a < b) ? (1) : (0));
	},
	/**
	 * Sort attr
	 */
	sortAttr: function(field_name, f)
	{
		return (a, b) => 
		{
			var a = Runtime.rtl.get(a, field_name);
			var b = Runtime.rtl.get(b, field_name);
			if (f == "asc")
			{
				return (a > b) ? (1) : ((a < b) ? (-1) : (0));
			}
			if (f == "desc")
			{
				return (a > b) ? (-1) : ((a < b) ? (1) : (0));
			}
			return f(a, b);
		};
	},
	/**
	 * Convert monad by type
	 */
	to: function(type_value, def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			return new Runtime.Monad((m.err == null) ? (Runtime.rtl.convert(m.value(), type_value, def_value)) : (def_value));
		};
	},
	/**
	 * Convert monad by type
	 */
	default: function(def_value)
	{
		if (def_value == undefined) def_value = null;
		return (m) => 
		{
			return (m.err != null || m.val === null) ? (new Runtime.Monad(def_value)) : (m);
		};
	},
	/**
	 * Set monad new value
	 */
	newValue: function(value, clear_error)
	{
		if (value == undefined) value = null;
		if (clear_error == undefined) clear_error = false;
		return (m) => 
		{
			return (clear_error == true) ? (new Runtime.Monad(value)) : ((m.err == null) ? (new Runtime.Monad(value)) : (m));
		};
	},
	/**
	 * Clear error
	 */
	clearError: function()
	{
		return (m) => 
		{
			return new Runtime.Monad(m.val);
		};
	},
	/**
	 * Returns monad
	 */
	monad: function(m)
	{
		return m;
	},
	/**
	 * Get method from class
	 * @return fn
	 */
	method: function(method_name)
	{
		return (class_name) => 
		{
			return Runtime.rtl.method(class_name, method_name);
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	applyMethod: function(method_name, args)
	{
		if (args == undefined) args = null;
		return (class_name) => 
		{
			var f = Runtime.rtl.method(class_name, method_name);
			return Runtime.rtl.apply(f, args);
		};
	},
	/**
	 * Apply async function
	 * @return fn
	 */
	applyMethodAsync: function(method_name, args)
	{
		if (args == undefined) args = null;
		return async (class_name) => 
		{
			var f = Runtime.rtl.method(class_name, method_name);
			return Promise.resolve(await Runtime.rtl.applyAsync(f, args));
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	apply: function(f)
	{
		return (value) => 
		{
			return f(value);
		};
	},
	/**
	 * Apply function
	 * @return fn
	 */
	applyAsync: function(f)
	{
		return async (value) => 
		{
			return await f(value);
		};
	},
	/**
	 * Log message
	 * @return fn
	 */
	log: function(message)
	{
		if (message == undefined) message = "";
		return (value) => 
		{
			if (message == "")
			{
				console.log(value);
			}
			else
			{
				console.log(message);
			}
			return value;
		};
	},
	/**
	 * Function or
	 */
	or: function(arr)
	{
		return (item) => 
		{
			for (var i = 0; i < arr.count(); i++)
			{
				var f = Runtime.rtl.get(arr, i);
				var res = f(item);
				if (res)
				{
					return true;
				}
			}
			return false;
		};
	},
	/**
	 * Function and
	 */
	and: function(arr)
	{
		return (item) => 
		{
			for (var i = 0; i < arr.count(); i++)
			{
				var f = Runtime.rtl.get(arr, i);
				var res = f(item);
				if (!res)
				{
					return false;
				}
			}
			return true;
		};
	},
	/**
	 * Join
	 */
	join: function(ch)
	{
		return (items) => 
		{
			return Runtime.rs.join(ch, items);
		};
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.lib";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isInstance",
			"isImplements",
			"classImplements",
			"createStruct",
			"equal",
			"equalNot",
			"equalAttr",
			"equalNotAttr",
			"equalAttrNot",
			"equalAttrs",
			"equalMethod",
			"get",
			"set",
			"attr",
			"setAttr",
			"getMaxIdFromItems",
			"copy",
			"takeDict",
			"map",
			"filter",
			"intersect",
			"sort",
			"transition",
			"concat",
			"sortAsc",
			"sortDesc",
			"sortAttr",
			"to",
			"default",
			"newValue",
			"clearError",
			"monad",
			"method",
			"applyMethod",
			"applyMethodAsync",
			"apply",
			"applyAsync",
			"log",
			"or",
			"and",
			"join",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.lib);
window["Runtime.lib"] = Runtime.lib;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.lib;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
/* Math Functions */
Runtime.math = function()
{
};
Object.assign(Runtime.math.prototype,
{
});
Object.assign(Runtime.math,
{
	/**
	 * Round double
	 */
	round: function(a)
	{
		return Math.round(a);
	},
	/**
	 * Floor double
	 */
	floor: function(a)
	{
		return Math.floor(a);
	},
	/**
	 * Floor ceil
	 */
	ceil: function(a)
	{
		return Math.ceil(a);
	},
	/**
	 * Returns max
	 */
	max: function(a, b)
	{
		if (a > b)
		{
			return a;
		}
		else
		{
			return b;
		}
	},
	/**
	 * Returns min
	 */
	min: function(a, b)
	{
		if (a < b)
		{
			return a;
		}
		else
		{
			return b;
		}
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.math";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"round",
			"floor",
			"ceil",
			"max",
			"min",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.math);
window["Runtime.math"] = Runtime.math;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.math;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.io = function()
{
};
Object.assign(Runtime.io.prototype,
{
});
Object.assign(Runtime.io,
{
	/**
	 * Print message to output
	 */
	print: function(message, new_line, type)
	{
		if (new_line == undefined) new_line = true;
		if (type == undefined) type = "";
		var output = Runtime.rtl.getContext().provider("output");
		output.print(message, new_line, type);
	},
	/**
	 * Print error message to output
	 */
	print_error: function(message)
	{
		var output = Runtime.rtl.getContext().provider("output");
		output.print_error(message);
	},
	/**
	 * Color message to output
	 */
	color: function(color, message)
	{
		var output = Runtime.rtl.getContext().provider("output");
		return output.color(color, message);
	},
	/**
	 * Log message
	 */
	log: function(type, message)
	{
		var p = Runtime.rtl.getContext().provider("log");
		p.log(type, message);
	},
	/**
	 * Read line from input
	 */
	input: function()
	{
		var input = Runtime.rtl.getContext().provider("input");
		return input.input();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.io";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"print",
			"print_error",
			"color",
			"log",
			"input",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.io);
window["Runtime.io"] = Runtime.io;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.io;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.re = function()
{
};
Object.assign(Runtime.re.prototype,
{
});
Object.assign(Runtime.re,
{
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение
	 * @return Collection<string>
	 */
	split: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
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
	},
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return bool
	 */
	match: function(r, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		return s.match( new RegExp(r, pattern) ) != null;
	},
	/**
	 * Search regular expression
	 * @param string r regular expression
	 * @param string s string
	 * @return Vector result
	 */
	matchAll: function(r, s, pattern)
	{
		if (pattern == undefined) pattern = "";
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
		return null;
	},
	/**
	 * Replace with regular expression
	 * @param string r - regular expression
	 * @param string replace - new value
	 * @param string s - replaceable string
	 * @return string
	 */
	replace: function(r, replace, s, pattern)
	{
		if (pattern == undefined) pattern = "";
		pattern = "g" + pattern;
		return s.replace(new RegExp(r, pattern), replace);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.re";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"split",
			"match",
			"matchAll",
			"replace",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.re);
window["Runtime.re"] = Runtime.re;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.re;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.rs = function()
{
};
Object.assign(Runtime.rs.prototype,
{
});
Object.assign(Runtime.rs,
{
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	strlen: function(s)
	{
		return use("Runtime.rtl").toStr(s).length;
	},
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	substr: function(s, start, length)
	{
		if (length == undefined) length = null;
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
	},
	/**
	 * Returns char from string at the position
	 * @param string s The string
	 * @param int pos The position
	 * @return string
	 */
	charAt: function(s, pos)
	{
		return this.substr(s, pos, 1);
	},
	/**
	 * Returns ASCII symbol by code
	 * @param int code
	 */
	chr: function(code)
	{
		return String.fromCharCode(code);
	},
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	ord: function(ch)
	{
		return use("Runtime.rtl").toStr(ch).charCodeAt(0);
	},
	/**
	 * Convert string to lower case
	 * @param string s
	 * @return string
	 */
	strtolower: function(s)
	{
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	strtoupper: function(s)
	{
		return use("Runtime.rtl").toStr(s).toUpperCase();
	},
	/**
	 * Convert string to lower case
	 * @param string s
	 * @return string
	 */
	lower: function(s)
	{
		return use("Runtime.rtl").toStr(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	upper: function(s)
	{
		return use("Runtime.rtl").toStr(s).toUpperCase();
	},
	/**
	 * Заменяет одну строку на другую
	 */
	replace: function(search, item, s)
	{
		return s.replace(new RegExp(search, "g"), item);
	},
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	str_repeat: function(s, n)
	{
		if (n <= 0) return "";
		var res = '';
		for (var i=0; i < n; i++){
			res += s;
		}
		return res;
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение
	 * @return Collection<string>
	 */
	split: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return _Collection.from(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Collection<string>
	 */
	splitArr: function(delimiters, s, limit)
	{
		if (limit == undefined) limit = -1;
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
	},
	/**
	 * Соединяет строки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	join: function(ch, arr)
	{
		if (arr == null) return "";
		return Array.prototype.join.call(arr, ch);
	},
	/**
	 * Join
	 */
	join_path: function(arr)
	{
		var path = this.join("/", arr);
		path = Runtime.re.replace("\\/+", "/", path);
		path = Runtime.re.replace("\\/\\.\\/", "/", path);
		path = Runtime.re.replace("\\/+$", "", path);
		return path;
	},
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	trim: function(s, ch)
	{
		if (ch == undefined) ch = "";
		if (ch == undefined) ch = "";
		
		s = use("Runtime.rtl").toStr(s);
		
		if (ch == ""){
			return s.trim();
		}
		return s.replace(new RegExp("^[" + ch + "]+", "g"),"")
			.replace(new RegExp("[" + ch + "]+$", "g"),"")
		;
	},
	/**
	 * Escape HTML special chars
	 * @param string s
	 * @return string
	 */
	htmlEscape: function(s)
	{
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
	},
	escapeHtml: function(s)
	{
		return this.htmlEscape(s);
	},
	/**
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
	pathinfo: function(filepath)
	{
		var arr1 = this.explode(".", filepath).toVector();
		var arr2 = this.explode("/", filepath).toVector();
		var filepath = filepath;
		var extension = arr1.popValue();
		var basename = arr2.popValue();
		var dirname = this.join("/", arr2);
		var ext_length = this.strlen(extension);
		if (ext_length > 0)
		{
			ext_length++;
		}
		var filename = this.substr(basename, 0, -1 * ext_length);
		return Runtime.Map.from({"filepath":filepath,"extension":extension,"basename":basename,"dirname":dirname,"filename":filename});
	},
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	filename: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "basename");
		var ext = Runtime.rtl.get(ret, "extension");
		if (ext != "")
		{
			var sz = 0 - Runtime.rs.strlen(ext) - 1;
			res = Runtime.rs.substr(res, 0, sz);
		}
		return res;
	},
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	basename: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "basename");
		return res;
	},
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	extname: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "extension");
		return res;
	},
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	dirname: function(filepath)
	{
		var ret = this.pathinfo(filepath);
		var res = Runtime.rtl.get(ret, "dirname");
		return res;
	},
	/**
	 * New line to br
	 */
	nl2br: function(s)
	{
		return this.replace("\n", "<br/>", s);
	},
	/**
	 * Remove spaces
	 */
	spaceless: function(s)
	{
		s = Runtime.re.replace(" +", " ", s);
		s = Runtime.re.replace("\t", "", s);
		s = Runtime.re.replace("\n", "", s);
		return s;
	},
	/**
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	indexOf: function(s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	strpos: function(s, search, offset)
	{
		if (offset == undefined) offset = 0;
		return this.indexOf(s, search, offset);
	},
	/**
	 * URL encode
	 * @param string s
	 * @return string
	 */
	url_encode: function(s)
	{
		return encodeURIComponent(s);
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode: function(s)
	{
		return window.btoa(window.unescape(window.encodeURIComponent(s)));
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode: function(s)
	{
		return window.decodeURIComponent(window.escape(window.atob(s)));
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string
	 */
	base64_encode_url: function(s)
	{
		s = this.base64_encode(s)
			.replace(new RegExp('\\+', 'g'), '-')
			.replace(new RegExp('\\/', 'g'), '_')
			.replace(new RegExp('=', 'g'), '')
		;
		return s;
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string
	 */
	base64_decode_url: function(s)
	{
		var c = 4 - s.length % 4;
		if (c < 4 && c > 0) s = s + '='.repeat(c);
		s = s.replace(new RegExp('-', 'g'), '+')
			.replace(new RegExp('_', 'g'), '/')
		;
		return this.base64_decode(s);
	},
	/**
	 * Parser url
	 * @param string s The string
	 * @return int
	 */
	parse_url: function(s)
	{
		var pos;
		var uri;
		var query;
		var hash;
		pos = this.strpos(s, "#");
		s = (pos >= 0) ? (this.substr(s, 0, pos)) : (s);
		hash = (pos >= 0) ? (this.substr(s, pos + 1)) : ("");
		pos = this.strpos(s, "?");
		uri = (pos >= 0) ? (this.substr(s, 0, pos)) : (s);
		query = (pos >= 0) ? (this.substr(s, pos + 1)) : ("");
		var arr = this.explode("&", query);
		var arr2 = arr.filter((s) => 
		{
			return s != "";
		}).transition((item) => 
		{
			var arr = this.explode("=", item);
			return Runtime.Vector.from([Runtime.rtl.get(arr, 1),Runtime.rtl.get(arr, 0)]);
		});
		return Runtime.Map.from({"uri":uri,"query":query,"query_arr":arr2,"hash":hash});
	},
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	url_get_add: function(s, key, value)
	{
		var r = this.parse_url(s);
		var s1 = Runtime.rtl.get(r, "uri");
		var s2 = Runtime.rtl.get(r, "query");
		var find = false;
		var arr = this.explode("&", s2);
		arr = arr.map((s) => 
		{
			var arr = this.explode("=", s);
			if (Runtime.rtl.get(arr, 0) == key)
			{
				find = true;
				if (value != "")
				{
					return key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(value));
				}
				return "";
			}
			return s;
		}).filter((s) => 
		{
			return s != "";
		});
		if (!find && value != "")
		{
			arr = arr.appendIm(key + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(this.htmlEscape(value)));
		}
		s = s1;
		s2 = this.join("&", arr);
		if (s2 != "")
		{
			s = s + Runtime.rtl.toStr("?") + Runtime.rtl.toStr(s2);
		}
		return s;
	},
	/**
	 * Strip tags
	 */
	strip_tags: function(content, allowed_tags)
	{
		if (allowed_tags == undefined) allowed_tags = null;
		if (allowed_tags == null)
		{
			content = Runtime.re.replace("<[^>]+>", "", content);
			content = Runtime.rs.trim(Runtime.rs.spaceless(content));
			return content;
		}
		var matches = Runtime.re.matchAll("<[^>]+>", content, "i");
		if (matches)
		{
			for (var i = 0; i < matches.count(); i++)
			{
				var match = Runtime.rtl.get(matches, i);
				var tag_str = Runtime.rtl.get(match, 0);
				var tag_match = Runtime.re.matchAll("<(\\/|)([a-zA-Z]+)(|[^>]*)>", tag_str, "i");
				if (tag_match)
				{
					var tag_name = this.strtolower(Runtime.rtl.get(Runtime.rtl.get(tag_match, 0), 2));
					if (allowed_tags.indexOf(tag_name) == -1)
					{
						content = this.replace(tag_str, "", content);
					}
				}
			}
		}
		content = Runtime.rs.trim(Runtime.rs.spaceless(content));
		return content;
	},
	/* =================== Deprecated =================== */
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	explode: function(delimiter, s, limit)
	{
		if (limit == undefined) limit = -1;
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return _Collection.from(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	implode: function(ch, arr)
	{
		return arr.join(ch);
	},
	/**
	 * Returns relative path of the filepath
	 * @param string filepath
	 * @param string basepath
	 * @param string ch - Directory separator
	 * @return string relative path
	 */
	relativePath: function(filepath, basepath, ch)
	{
		if (ch == undefined) ch = "/";
		var source = Runtime.rs.explode(ch, filepath);
		var base = Runtime.rs.explode(ch, basepath);
		source = source.filter((s) => 
		{
			return s != "";
		});
		base = base.filter((s) => 
		{
			return s != "";
		});
		var i = 0;
		while (source.count() > 0 && base.count() > 0 && source.item(0) == base.item(0))
		{
			source.shift();
			base.shift();
		}
		base.each((s) => 
		{
			source.unshift("..");
		});
		return Runtime.rs.implode(ch, source);
	},
	/**
	 * Return normalize path
	 * @param string filepath - File path
	 * @return string
	 */
	normalize: function(filepath)
	{
		return filepath;
	},
	/**
	 * json encode scalar values
	 * @param {mixed} obj - объект
	 * @param {int} flags - Флаги
	 * @return {string} json строка
	 */
	json_encode_primitive: function(s, flags)
	{
		if (flags & 128 == 128) 
			return JSON.stringify(obj, null, 2);
		return JSON.stringify(obj);
	},
	/**
	 * Search 'search' in s.
	 */
	search: function(s, search, offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		var res = _rtl.toStr(s).indexOf(search);
		return res;
	},
	/**
	 * Is start
	 */
	start: function(s, search)
	{
		return this.search(s, search) == 0;
	},
	/**
	 * Hex decode
	 */
	hexdec: function(s)
	{
		return parseInt(s, 16);
	},
	/**
	 * From rgb
	 */
	rgbToInt: function(color)
	{
		var ch = this.substr(color, 0, 1);
		if (ch == "#")
		{
			color = this.substr(color, 1);
		}
		var r = "";
		var g = "";
		var b = "";
		var sz = this.strlen(color);
		if (sz == 3)
		{
			r = Runtime.rs.substr(color, 0, 1);
			r += Runtime.rtl.toStr(r);
			g = Runtime.rs.substr(color, 1, 1);
			g += Runtime.rtl.toStr(g);
			b = Runtime.rs.substr(color, 2, 1);
			b += Runtime.rtl.toStr(b);
		}
		else if (sz == 6)
		{
			r = Runtime.rs.substr(color, 0, 2);
			g = Runtime.rs.substr(color, 2, 2);
			b = Runtime.rs.substr(color, 4, 2);
		}
		r = this.hexdec(r);
		g = this.hexdec(g);
		b = this.hexdec(b);
		return Runtime.Vector.from([r,g,b]);
	},
	/**
	 * From rgb
	 */
	intToRgb: function(r, g, b)
	{
		r = r.toString(16).padStart(2, '0');
		g = g.toString(16).padStart(2, '0');
		b = b.toString(16).padStart(2, '0');
		
		return r + g + b;
	},
	/**
	 * Brightness
	 */
	brightness: function(color, percent)
	{
		var color = this.rgbToInt(color);
		var r = Runtime.rtl.get(color, 0);
		var g = Runtime.rtl.get(color, 1);
		var b = Runtime.rtl.get(color, 2);
		r = Runtime.math.round(r + r * percent / 100);
		g = Runtime.math.round(g + g * percent / 100);
		b = Runtime.math.round(b + b * percent / 100);
		if (r > 255)
		{
			r = 255;
		}
		if (g > 255)
		{
			g = 255;
		}
		if (b > 255)
		{
			b = 255;
		}
		if (r < 0)
		{
			r = 0;
		}
		if (g < 0)
		{
			g = 0;
		}
		if (b < 0)
		{
			b = 0;
		}
		return "#" + Runtime.rtl.toStr(this.intToRgb(r, g, b));
	},
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	hash: function(s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rs.hash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var r = "";
		var a = "1234567890abcdef";
		var sz = Runtime.rs.strlen(s);
		var h = 0;
		for (var i = 0; i < sz; i++)
		{
			var c = Runtime.rs.ord(Runtime.rs.substr(s, i, 1));
			h = (h << 2) + (h >> 14) + c & 65535;
		}
		var p = 0;
		while (h != 0 || p < 4)
		{
			var c = h & 15;
			h = h >> 4;
			r += Runtime.rtl.toStr(Runtime.rs.substr(a, c, 1));
			p = p + 1;
		}
		var __memorize_value = r;
		Runtime.rtl._memorizeSave("Runtime.rs.hash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns css hash
	 */
	getCssHash: function(class_name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Runtime.rs.getCssHash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __v0 = new Runtime.Monad(Runtime.rtl.getParents(class_name));
		__v0 = __v0.callMethod("filter", [(class_name) => 
		{
			return class_name != "Runtime.BaseObject" && class_name != "Runtime.Web.Component";
		}]);
		__v0 = __v0.callMethod("map", [(class_name) => 
		{
			return "h-" + Runtime.rtl.toStr(this.hash(class_name));
		}]);
		__v0 = __v0.call(Runtime.lib.join(" "));
		var __memorize_value = __v0.value();
		Runtime.rtl._memorizeSave("Runtime.rs.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Escape html
	 */
	_escape_html: function(s)
	{
		if (Runtime.rtl.isString(s))
		{
			return Runtime.rs.escapeHtml(s);
		}
		if (s instanceof Runtime.Collection)
		{
			return Runtime.rs.join("", s);
		}
		return Runtime.rs.escapeHtml(Runtime.rtl.toString(s));
	},
	/**
	 * To html
	 */
	_to_html: function(s)
	{
		return s;
	},
	/**
	 * Concat attr
	 */
	_concat_attrs: function(arr1, arr2)
	{
		if (Runtime.rtl.isString(arr2))
		{
			arr2 = Runtime.Vector.from([arr2]);
		}
		return (arr1 != null) ? (arr1.concat(arr2)) : (arr2);
	},
	/**
	 * Merge attrs
	 */
	_merge_attrs: function(res, attr2)
	{
		if (!Runtime.rtl.exists(attr2))
		{
			return res;
		}
		return Object.assign(res, attr2.toObject());
		return res;
	},
	/**
	 * Join attrs to string
	 */
	_join_attrs: function(attrs)
	{
		return (Runtime.rtl.exists(attrs)) ? (Runtime.rs.join(" ", attrs.map((k, v) => 
		{
			return k + Runtime.rtl.toStr("= '") + Runtime.rtl.toStr(this._escape_attr(v)) + Runtime.rtl.toStr("'");
		}))) : ("");
	},
	/**
	 * Escape attr
	 */
	_escape_attr: function(s)
	{
		if (s instanceof Runtime.Dict)
		{
			s = s.reduce((s, val, key) => 
			{
				return s + Runtime.rtl.toStr(key) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(val) + Runtime.rtl.toStr(";");
			}, "");
		}
		return Runtime.rs.escapeHtml(s);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.rs";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"strlen",
			"substr",
			"charAt",
			"chr",
			"ord",
			"strtolower",
			"strtoupper",
			"lower",
			"upper",
			"replace",
			"str_repeat",
			"split",
			"splitArr",
			"join",
			"join_path",
			"trim",
			"htmlEscape",
			"escapeHtml",
			"pathinfo",
			"filename",
			"basename",
			"extname",
			"dirname",
			"nl2br",
			"spaceless",
			"indexOf",
			"strpos",
			"url_encode",
			"base64_encode",
			"base64_decode",
			"base64_encode_url",
			"base64_decode_url",
			"parse_url",
			"url_get_add",
			"strip_tags",
			"explode",
			"implode",
			"relativePath",
			"normalize",
			"json_encode_primitive",
			"search",
			"start",
			"hexdec",
			"rgbToInt",
			"intToRgb",
			"brightness",
			"hash",
			"getCssHash",
			"_escape_html",
			"_to_html",
			"_concat_attrs",
			"_merge_attrs",
			"_join_attrs",
			"_escape_attr",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.rs);
window["Runtime.rs"] = Runtime.rs;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.rs;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
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
Runtime.Collection = function()
{
	Runtime._Collection.apply(this, arguments);
};
Runtime.Collection.prototype = Object.create(Runtime._Collection.prototype);
Runtime.Collection.prototype.constructor = Runtime.Collection;
Object.assign(Runtime.Collection.prototype,
{
	/**
	 * Returns copy of Collection
	 * @param int pos - position
	 */
	cp: function()
	{
		var arr = Array.prototype.slice.call(this);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Convert to collection
	 */
	toCollection: function()
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, Runtime.Collection.prototype);
		return obj;
	},
	/**
	 * Convert to vector
	 */
	toVector: function()
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, use("Runtime.Vector").prototype);
		return obj;
	},
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get: function(pos, default_value)
	{
		if (default_value == undefined) default_value = null;
		if (pos < 0 || pos >= this.length) return default_value;
		var val = this[pos];
		return val;
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item: function(pos)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(pos);
		}
		return this[pos];
	},
	/**
	 * Returns count items in vector
	 */
	count: function()
	{
		return this.length;
	},
	/**
	 * Find value in array. Returns -1 if value not found.
	 * @param T value
	 * @return  int
	 */
	indexOf: function(value)
	{
		for (var i=0; i<this.count(); i++)
		{
			if (this[i] == value)
				return i;
		}
		return -1;
	},
	/**
	 * Find value in array, and returns position. Returns -1 if value not found.
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return  int
	 */
	indexOfRange: function(value, pos_begin, pos_end)
	{
		var pos = Array.prototype.indexOf.call(this, value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	},
	/**
	 * Get first item
	 */
	first: function(default_value)
	{
		if (default_value == undefined) default_value = null;
		if (this.length == 0) return default_value;
		return this[0];
	},
	/**
	 * Get last item
	 */
	last: function(default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		if (pos == undefined) pos = -1;
		if (this.length == 0) return default_value;
		if (this.length + pos + 1 == 0) return default_value;
		return this[this.length + pos];
	},
	/**
	 * Get last item
	 */
	getLastItem: function(default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		return this.last(default_value, pos);
	},
	/**
	 * Append value to the end of the Collection and return new Collection
	 * @param T value
	 */
	pushIm: function(value)
	{
		var arr = this.cp();
		Array.prototype.push.call(arr, value);
		return arr;
	},
	push: function(value)
	{
		throw new Runtime.Exceptions.RuntimeException("Deprecated Collection push")
	},
	push1: function(value)
	{
		return this.pushIm(value);
	},
	append1: function(value)
	{
		return this.push(value);
	},
	appendIm: function(value)
	{
		return this.pushIm(value);
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshiftIm: function(value)
	{
		var arr = this.cp();
		Array.prototype.unshift.call(arr, value);
		return arr;
	},
	unshift: function(value)
	{
		throw new Runtime.Exceptions.RuntimeException("Deprecated Collection unshift")
	},
	unshift1: function(value)
	{
		return this.unshiftIm(value);
	},
	prepend1: function(value)
	{
		return this.unshift(value);
	},
	prependIm: function(value)
	{
		return this.unshiftIm(value);
	},
	prepend: function(value)
	{
		return this.unshiftIm(value);
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	removeLastIm: function()
	{
		var arr = Array.prototype.slice.call(this, 0, -1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	removeLast: function(value)
	{
		return this.removeLastIm(value);
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	removeFirstIm: function()
	{
		var arr = Array.prototype.slice.call(this, 1);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	removeFirst: function(value)
	{
		return this.removeFirstIm(value);
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insertIm: function(pos, value)
	{
		var arr = this.cp();
		arr.splice(pos, 0, value);
		return arr;
	},
	insert: function(value)
	{
		return this.insertIm(value);
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	removeIm: function(pos, count)
	{
		if (count == undefined) count = 1;
		if (count == undefined) count = 1;
		var arr = this.cp();
		arr.splice(pos, count);
		return arr;
	},
	remove1: function(value)
	{
		return this.removeIm(value);
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRangeIm: function(pos_begin, pos_end)
	{
		var arr = this.cp();
		arr.splice(pos_begin, pos_end - pos_begin + 1);
		return arr;
	},
	removeRange: function(value)
	{
		return this.removeRangeIm(value);
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setIm: function(pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange(pos);
		}
		var arr = this.cp();
		arr[pos] = value;
		return arr;
	},
	set: function(value)
	{
		throw new Runtime.Exceptions.RuntimeException("Deprecated Collection set")
	},
	set1: function(value)
	{
		return this.setIm(value);
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	concatIm: function(arr)
	{
		if (arr == null)
		{
			return this;
		}
		if (!Runtime.rtl.isArray(arr))
		{
			arr = Runtime.Vector.from([arr]);
		}
		if (arr.length == 0) return this;
		var res = this.cp();
		for (var i=0; i<arr.length; i++)
		{
			Array.prototype.push.call(res, arr[i]);
		}
		return res;
	},
	appendCollection1: function(arr)
	{
		return this.concatIm(arr);
	},
	concat: function(arr)
	{
		return this.concatIm(arr);
	},
	/**
	 * Prepend vector to the begin of the vector
	 * @param Collection<T> arr
	 */
	prependCollectionIm: function(arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.cp();
		for (var i=arr.length-1; i>=0; i--)
		{
			Array.prototype.unshift.call(res, arr[i]);
		}
		return res;
	},
	prependCollection1: function(arr)
	{
		return this.prependCollectionIm(arr);
	},
	/**
	 * Remove value
	 */
	removeItemIm: function(value)
	{
		var index = this.indexOf(value);
		if (index != -1)
		{
			return this.removeIm(index);
		}
		return this;
	},
	removeItem: function(value)
	{
		return this.removeItemIm(value);
	},
	/**
	 * Remove value
	 */
	removeItemsIm: function(values)
	{
		var res = this;
		for (var i = 0; i < values.count(); i++)
		{
			res = res.removeItem(values.item(i));
		}
		return res;
	},
	removeItems: function(values)
	{
		return this.removeItemsIm(values);
	},
	/**
	 * Find value and remove
	 */
	findAndRemove: function(f)
	{
		var index = this.find(f);
		if (index != -1)
		{
			return this.removeIm(index);
		}
		return this;
	},
	/**
	 * Map
	 * @param fn f
	 * @return Collection
	 */
	map: function(f)
	{
		var arr = this.cp();
		var Callback = use("Runtime.Callback");
		for (var i=0; i<arr.length; i++)
		{
			if (f instanceof Callback)
			{
				arr[i] = f.call([arr[i], i]);
			}
			else arr[i] = f(arr[i], i);
		}
		return arr;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(f)
	{
		var res = this.constructor.Instance();
		var Callback = use("Runtime.Callback");
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			var flag = (f instanceof Callback)
				? f.call([item, i])
				: f(item, i)
			;
			if (flag)
			{
				Array.prototype.push.call(res, item);
			}
		}
		return res;
	},
	/**
	 * Transition Collection to Dict
	 * @param fn f
	 * @return Dict
	 */
	transition: function(f)
	{
		var Dict = use("Runtime.Dict");
		var d = new Dict();
		for (var i=0; i<this.length; i++)
		{
			var value = this[i];
			var p = f(value, i);
			d[p[1]] = p[0];
		}
		return d;
	},
	/**
	 * Reduce
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(f, init_value)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			init_value = f(init_value, item, i);
		}
		return init_value;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(f)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			f(item, i);
		}
	},
	/**
	 * flatten Collection
	 */
	flatten: function()
	{
		let res = [];
		var Callback = use("Runtime.Callback");
		
		for (var i=0; i<this.length; i++)
		{
			let item = this[i];
			if (item instanceof Collection)
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
	},
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	intersect: function(arr)
	{
		return this.filter((item) => 
		{
			return arr.indexOf(item) >= 0;
		});
	},
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	slice: function(offset, length)
	{
		if (length == undefined) length = null;
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
	},
	/**
	 * Reverse array
	 */
	reverseIm: function()
	{
		var arr = this.cp();
		Array.prototype.reverse.call(arr);
		return arr;
	},
	reverse: function()
	{
		return this.reverseIm();
	},
	/**
	 * Sort vector
	 * @param fn f - Sort user function
	 */
	sortIm: function(f)
	{
		if (f == undefined) f = null;
		var arr = this.cp();
		if (f == undefined) Array.prototype.sort.call(arr);
		else
		{
			var f1 = (a, b) => { return f(a, b); };
			Array.prototype.sort.call(arr, f1);
		}
		return arr;
	},
	sort: function(f)
	{
		if (f == undefined) f = null;
		return this.sortIm(f);
	},
	/**
	 * Remove dublicate values
	 */
	removeDuplicatesIm: function()
	{
		var res = this.constructor.Instance();
		for (var i=0; i<this.length; i++)
		{
			var p = res.indexOf(this[i]);
			if (p == -1)
			{
				Array.prototype.push.call(res, this[i]);
			}
		}
		return res;
	},
	removeDuplicates: function()
	{
		return this.removeDuplicatesIm();
	},
	/**
	 * Find item pos
	 * @param fn f - Find function
	 * @return int - position
	 */
	find: function(f)
	{
		for (var i=0; i<this.length; i++)
		{
			var flag = f(this[i]);
			if (flag) return i;
		}
		return -1;
	},
	/**
	 * Find item
	 * @param var item - Find function
	 * @param fn f - Find function
	 * @param T def_value - Find function
	 * @return item
	 */
	findItem: function(f, def_value)
	{
		if (def_value == undefined) def_value = null;
		var pos = this.find(f);
		return this.get(pos, def_value);
	},
	/**
	 * Join collection to string
	 */
	join: function(ch)
	{
		return Runtime.rs.join(ch, this);
	},
});
Object.assign(Runtime.Collection, Runtime._Collection);
Object.assign(Runtime.Collection,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function()
	{
		return new Runtime.Collection();
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(arr)
	{
		return this.from(arr);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Collection";
	},
	getParentClassName: function()
	{
		return "Runtime._Collection";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"Instance",
			"create",
			"cp",
			"toCollection",
			"toVector",
			"get",
			"item",
			"count",
			"indexOf",
			"indexOfRange",
			"first",
			"last",
			"getLastItem",
			"pushIm",
			"push",
			"push1",
			"append1",
			"appendIm",
			"unshiftIm",
			"unshift",
			"unshift1",
			"prepend1",
			"prependIm",
			"prepend",
			"removeLastIm",
			"removeLast",
			"removeFirstIm",
			"removeFirst",
			"insertIm",
			"insert",
			"removeIm",
			"remove1",
			"removeRangeIm",
			"removeRange",
			"setIm",
			"set",
			"set1",
			"concatIm",
			"appendCollection1",
			"concat",
			"prependCollectionIm",
			"prependCollection1",
			"removeItemIm",
			"removeItem",
			"removeItemsIm",
			"removeItems",
			"findAndRemove",
			"map",
			"filter",
			"transition",
			"reduce",
			"each",
			"flatten",
			"intersect",
			"slice",
			"reverseIm",
			"reverse",
			"sortIm",
			"sort",
			"removeDuplicatesIm",
			"removeDuplicates",
			"find",
			"findItem",
			"join",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Collection);
window["Runtime.Collection"] = Runtime.Collection;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Collection;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime == 'undefined') Runtime = {};

Runtime._Map = function(map)
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
		var res = this.Instance(map);
		return res;
	},
	getNamespace: function(){ return "Runtime"; },
	getClassName: function(){ return "Runtime._Map"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Dict = function()
{
	Runtime._Map.apply(this, arguments);
};
Runtime.Dict.prototype = Object.create(Runtime._Map.prototype);
Runtime.Dict.prototype.constructor = Runtime.Dict;
Object.assign(Runtime.Dict.prototype,
{
	/**
	 * Copy instance
	 */
	cp: function()
	{
		var new_obj = this.constructor.Instance();
		new_obj._map = Object.assign({}, this._map);
		return new_obj;
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return Dict<T>
	 */
	clone: function(fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return this;
		}
		var new_obj = this.constructor.Instance();
		if (fields != null)
		{
			for (var key in fields)
			{
				if (typeof obj["|" + key] == undefined)
					new_obj._map["|" + key] = this._map["|" + key];
			}
		}
		return new_obj;
	},
	/**
	 * Returns copy of Dict
	 * @param int pos - position
	 */
	copy: function(obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var new_obj = this.constructor.Instance();
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
	},
	/**
	 * Convert to dict
	 */
	toDict: function()
	{
		var Dict = use ("Runtime.Dict");
		return new Dict(this);
	},
	/**
	 * Convert to dict
	 */
	toMap: function()
	{
		var Map = use ("Runtime.Map");
		return new Map(this);
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	contains: function(key)
	{
		key = this.toStr(key);
		return typeof this._map["|" + key] != "undefined";
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	has: function(key)
	{
		return this.contains(key);
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	get: function(key, default_value)
	{
		if (default_value == undefined) default_value = null;
		key = this.toStr(key);
		var val = this._map["|" + key];
		if (typeof val == "undefined") return default_value;
		return val;
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	attr: function(items, default_value)
	{
		return Runtime.rtl.attr(this, items, default_value);
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param string key - position
	 * @return T
	 */
	item: function(key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] == "undefined")
		{
			var _KeyNotFound = use("Runtime.Exceptions.KeyNotFound");
			throw new _KeyNotFound(key);
		}
		var val = this._map["|" + key];
		if (val === null || typeof val == "undefined") return null;
		return val;
	},
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	setIm: function(key, value)
	{
		var res = this.cp();
		key = this.toStr(key);
		res._map["|" + key] = value;
		return res;
	},
	set1: function(key, value)
	{
		return this.setIm(key, value);
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeIm: function(key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			var res = this.cp();
			delete res._map["|" + key];
			return res;
		}
		return this;
	},
	remove1: function(key)
	{
		return this.removeIm(key);
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeKeys: function(keys)
	{
		return (keys != null) ? (keys.reduce((item, key) => 
		{
			return item.removeIm(key);
		}, this)) : (this);
	},
	/**
	 * Returns vector of the keys
	 * @return Collection<string>
	 */
	keys: function()
	{
		var res = new Runtime.Vector();
		for (var key in this._map) res.pushValue(key.substring(1));
		return res.toCollection();
	},
	/**
	 * Returns vector of the values
	 * @return Collection<T>
	 */
	values: function()
	{
		var res = new Runtime.Vector();
		for (var key in this._map) res.pushValue( this._map[key] );
		return res.toCollection();
	},
	/**
	 * Call function map
	 * @param fn f
	 * @return Dict
	 */
	map: function(f)
	{
		var obj = this.constructor.Instance();
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var new_val = f(this._map[key], new_key);
			obj._map[key] = new_val;
		}
		return obj;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(f)
	{
		var obj = this.constructor.Instance();
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			var flag = f(value, new_key);
			if (flag) obj._map[key] = value;
		}
		return obj;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(f)
	{
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			f(value, new_key);
		}
	},
	/**
	 * Transition Dict to Collection
	 * @param fn f
	 * @return Collection
	 */
	transition: function(f)
	{
		var Collection = use("Runtime.Collection");
		var arr = new Collection();
		for (var key in this._map)
		{
			var new_value = f(this._map[key], key.substring(1));
			Array.prototype.push.call(arr, new_value);
		}
		return arr;
	},
	/**
	 * 	
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(f, init_value)
	{
		for (var key in this._map)
		{
			init_value = f(init_value, this._map[key], key.substring(1));
		}
		return init_value;
	},
	/**
	 * Add values from other map
	 * @param Dict<T> map
	 * @return self
	 */
	concat: function(map)
	{
		if (map == undefined) map = null;
		if (map == null)
		{
			return this;
		}
		var _map = {};
		var f = false;
		var Dict = use("Runtime.Dict");
		if (map == null) return this;
		if (map instanceof Dict) _map = map._map;
		else if (typeof map == "object") { _map = map; f = true; }
		var res = this.cp();
		for (var key in _map)
		{
			res._map[(f ? "|" : "") + key] = _map[key];
		}
		return res;
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(fields, skip_empty)
	{
		if (fields == undefined) fields = null;
		if (skip_empty == undefined) skip_empty = true;
		if (fields == null)
		{
			return Runtime.Map.from({});
		}
		var obj = new Runtime.Map();
		fields.each((field_name) => 
		{
			if (skip_empty && !this.has(field_name))
			{
				return ;
			}
			obj.setValue(field_name, this.get(field_name, null));
		});
		return obj.toDict();
	},
	/**
	 * Check equal
	 */
	equal: function(item)
	{
		if (item == null)
		{
			return false;
		}
		var keys = (new Runtime.Collection()).concat(this.keys()).concat(item.keys()).removeDuplicatesIm();
		for (var i = 0; i < keys.count(); i++)
		{
			var key = Runtime.rtl.get(keys, i);
			if (!this.has(key))
			{
				return false;
			}
			if (!item.has(key))
			{
				return false;
			}
			if (this.get(key) != item.get(key))
			{
				return false;
			}
		}
		return true;
	},
});
Object.assign(Runtime.Dict, Runtime._Map);
Object.assign(Runtime.Dict,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(val)
	{
		if (val == undefined) val = null;
		return new Runtime.Dict(val);
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(obj)
	{
		return new (Function.prototype.bind.apply(this, [null, ctx, obj]));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Dict";
	},
	getParentClassName: function()
	{
		return "Runtime._Map";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"Instance",
			"create",
			"clone",
			"copy",
			"toDict",
			"toMap",
			"contains",
			"has",
			"get",
			"attr",
			"item",
			"setIm",
			"set1",
			"removeIm",
			"remove1",
			"removeKeys",
			"keys",
			"values",
			"map",
			"filter",
			"each",
			"transition",
			"reduce",
			"concat",
			"intersect",
			"equal",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Dict);
window["Runtime.Dict"] = Runtime.Dict;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Dict;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Map = function()
{
	Runtime.Dict.apply(this, arguments);
};
Runtime.Map.prototype = Object.create(Runtime.Dict.prototype);
Runtime.Map.prototype.constructor = Runtime.Map;
Object.assign(Runtime.Map.prototype,
{
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	setValue: function(key, value)
	{
		key = this.toStr(key);
		this._map["|" + key] = value;
		return this;
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeValue: function(key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			delete this._map["|" + key];
		}
		return this;
	},
	/**
	 * Clear all values from vector
	 * @return self
	 */
	clear: function()
	{
		this._map = {};
		return this;
	},
});
Object.assign(Runtime.Map, Runtime.Dict);
Object.assign(Runtime.Map,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(val)
	{
		if (val == undefined) val = null;
		return new Runtime.Map(val);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Map";
	},
	getParentClassName: function()
	{
		return "Runtime.Dict";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"Instance",
			"setValue",
			"removeValue",
			"clear",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Map);
window["Runtime.Map"] = Runtime.Map;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Map;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Monad = function(value, err)
{
	if (err == undefined) err = null;
	this.val = value;
	this.err = err;
};
Object.assign(Runtime.Monad.prototype,
{
	/**
	 * Return attr of object
	 */
	attr: function(attr_name)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		return new Runtime.Monad(Runtime.rtl.attr(this.val, Runtime.Vector.from([attr_name]), null));
	},
	/**
	 * Call function on value
	 */
	call: function(f)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		try
		{
			res = f(this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return new Runtime.Monad(res, err);
	},
	/**
	 * Call async function on value
	 */
	callAsync: async function(f)
	{
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		var res = null;
		var err = null;
		try
		{
			res = await f(this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(new Runtime.Monad(res, err));
	},
	/**
	 * Call method on value
	 */
	callMethod: function(method_name, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		try
		{
			var f = Runtime.rtl.method(this.val, method_name);
			res = Runtime.rtl.apply(f, args);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return new Runtime.Monad(res, err);
	},
	/**
	 * Call async method on value
	 */
	callMethodAsync: async function(method_name, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		var res = null;
		var err = null;
		try
		{
			var f = Runtime.rtl.method(this.val, method_name);
			res = await Runtime.rtl.applyAsync(f, args);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(new Runtime.Monad(res, err));
	},
	/**
	 * Call function on monad
	 */
	monad: function(f)
	{
		return f(this);
	},
	/**
	 * Returns value
	 */
	value: function()
	{
		if (this.err != null)
		{
			throw this.err
		}
		if (this.val === null || this.err != null)
		{
			return null;
		}
		return this.val;
	},
	_init: function()
	{
		this.val = null;
		this.err = null;
	},
});
Object.assign(Runtime.Monad,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Monad";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("val");
		a.push("err");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "val") return Map.from({
			"t": "var",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "err") return Map.from({
			"t": "var",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"attr",
			"call",
			"callAsync",
			"callMethod",
			"callMethodAsync",
			"monad",
			"value",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Monad);
window["Runtime.Monad"] = Runtime.Monad;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Monad;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Vector = function()
{
	Runtime.Collection.apply(this, arguments);
};
Runtime.Vector.prototype = Object.create(Runtime.Collection.prototype);
Runtime.Vector.prototype.constructor = Runtime.Vector;
Object.assign(Runtime.Vector.prototype,
{
	/**
	 * Returns new Vector
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	vectorSlice: function(offset, length)
	{
		if (length == undefined) length = null;
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
	},
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	appendValue: function(value)
	{
		Array.prototype.push.call(this, value);
		return this;
	},
	pushValue: function(value)
	{
		return this.appendValue(value);
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	prependValue: function(value)
	{
		Array.prototype.unshift.call(this, value);
		return this;
	},
	unshiftValue: function(value)
	{
		return this.prependValue(value);
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	popValue: function()
	{
		return Array.prototype.pop.call(this);
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	shiftValue: function()
	{
		return Array.prototype.shift.call(this);
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insertValue: function(pos, value)
	{
		Array.prototype.splice.call(this, pos, 0, value);
		return this;
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	removePosition: function(pos, count)
	{
		if (count == undefined) count = 1;
		Array.prototype.splice.call(this, pos, count);
		return this;
	},
	/**
	 * Remove value
	 */
	removeValue: function(value)
	{
		var index = this.indexOf(value);
		if (index != -1)
		{
			this.removePosition(index, 1);
		}
		return this;
	},
	/**
	 * Remove value
	 */
	removeValues: function(values)
	{
		for (var i = 0; i < values.count(); i++)
		{
			this.removeValue(values.item(i));
		}
		return this;
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRangeValues: function(pos_begin, pos_end)
	{
		Array.prototype.splice.call(this, pos_begin, pos_end - pos_begin + 1);
		return this;
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setValue: function(pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var IndexOutOfRange = use ("Runtime.Exceptions.IndexOutOfRange");
			throw new IndexOutOfRange(pos);
		}
		this[pos] = value;
		return this;
	},
	/**
	 * Clear all values from vector
	 */
	clear: function()
	{
		Array.prototype.splice.call(this, 0, this.length);
		return this;
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	appendVector: function(arr)
	{
		if (!arr) return this;
		for (var i=0; i<arr.length; i++) Array.prototype.push.call(this, arr[i]);
		return this;
	},
	/**
	 * Prepend vector to the begin of the vector
	 * @param Vector<T> arr
	 */
	prependVector: function(arr)
	{
		for (var i=0; i<arr.length; i++) Array.prototype.unshift.call(this, arr[i]);
		return this;
	},
});
Object.assign(Runtime.Vector, Runtime.Collection);
Object.assign(Runtime.Vector,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function()
	{
		return new Runtime.Vector();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Vector";
	},
	getParentClassName: function()
	{
		return "Runtime.Collection";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"Instance",
			"vectorSlice",
			"appendValue",
			"pushValue",
			"prependValue",
			"unshiftValue",
			"popValue",
			"shiftValue",
			"insertValue",
			"removePosition",
			"removeValue",
			"removeValues",
			"removeRangeValues",
			"setValue",
			"clear",
			"appendVector",
			"prependVector",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Vector);
window["Runtime.Vector"] = Runtime.Vector;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Vector;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
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
	_init: function(){},
});
Object.assign(Runtime.Exceptions.ClassException,
{
	getNamespace: function(){ return "Runtime.Exceptions"; },
	getClassName: function(){ return "Runtime.Exceptions.ClassException"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Exceptions.RuntimeException = function(message, code, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.ClassException.call(this, message, code, prev);
	this._init();
	this.error_str = message;
	this.error_code = code;
	this.prev = prev;
	this.updateError();
};
Runtime.Exceptions.RuntimeException.prototype = Object.create(Runtime.Exceptions.ClassException.prototype);
Runtime.Exceptions.RuntimeException.prototype.constructor = Runtime.Exceptions.RuntimeException;
Object.assign(Runtime.Exceptions.RuntimeException.prototype,
{
	getPreviousException: function()
	{
		return this.prev;
	},
	getErrorMessage: function()
	{
		return this.error_str;
	},
	getErrorString: function()
	{
		return this.error_str;
	},
	getErrorCode: function()
	{
		return this.error_code;
	},
	getFileName: function()
	{
		return this.error_file;
	},
	getErrorLine: function()
	{
		return this.error_line;
	},
	getErrorPos: function()
	{
		return this.error_pos;
	},
	toString: function()
	{
		return this.buildMessage();
	},
	buildMessage: function()
	{
		return this.error_str;
	},
	updateError: function()
	{
		this.error_message = this.buildMessage();
		this.message = this.error_message;
	},
	/**
	 * Returns trace
	 */
	getTraceStr: function()
	{
	},
	/**
	 * Returns trace
	 */
	getTraceCollection: function()
	{
	},
	_init: function()
	{
		Runtime.Exceptions.ClassException.prototype._init.call(this);
		this.prev = null;
		this.error_message = "";
		this.error_str = "";
		this.error_code = 0;
		this.error_file = "";
		this.error_line = "";
		this.error_pos = "";
	},
});
Object.assign(Runtime.Exceptions.RuntimeException, Runtime.Exceptions.ClassException);
Object.assign(Runtime.Exceptions.RuntimeException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.ClassException";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("error_message");
		a.push("error_str");
		a.push("error_code");
		a.push("error_file");
		a.push("error_line");
		a.push("error_pos");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "error_message") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "error_str") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "error_code") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "error_file") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "error_line") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "error_pos") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"getPreviousException",
			"getErrorMessage",
			"getErrorString",
			"getErrorCode",
			"getFileName",
			"getErrorLine",
			"getErrorPos",
			"toString",
			"buildMessage",
			"updateError",
			"getTraceStr",
			"getTraceCollection",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.RuntimeException);
window["Runtime.Exceptions.RuntimeException"] = Runtime.Exceptions.RuntimeException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.RuntimeException;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.AssertException = function(message)
{
	Runtime.Exceptions.RuntimeException.call(this, message);
};
Runtime.Exceptions.AssertException.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.AssertException.prototype.constructor = Runtime.Exceptions.AssertException;
Object.assign(Runtime.Exceptions.AssertException.prototype,
{
});
Object.assign(Runtime.Exceptions.AssertException, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.AssertException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.AssertException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.AssertException);
window["Runtime.Exceptions.AssertException"] = Runtime.Exceptions.AssertException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.AssertException;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ApiException = function(message, code, response, prev)
{
	if (message == undefined) message = "";
	if (code == undefined) code = -1;
	if (response == undefined) response = null;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, message, code, prev);
	this.response = response;
};
Runtime.Exceptions.ApiException.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.ApiException.prototype.constructor = Runtime.Exceptions.ApiException;
Object.assign(Runtime.Exceptions.ApiException.prototype,
{
	_init: function()
	{
		Runtime.Exceptions.RuntimeException.prototype._init.call(this);
		this.response = null;
	},
});
Object.assign(Runtime.Exceptions.ApiException, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.ApiException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.ApiException";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("response");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "response") return Map.from({
			"t": "var",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.ApiException);
window["Runtime.Exceptions.ApiException"] = Runtime.Exceptions.ApiException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.ApiException;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.AssignStructValueError = function(name, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "Can not set key '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("' in immutable struct")), Runtime.rtl.ERROR_INDEX_OUT_OF_RANGE, prev);
};
Runtime.Exceptions.AssignStructValueError.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.AssignStructValueError.prototype.constructor = Runtime.Exceptions.AssignStructValueError;
Object.assign(Runtime.Exceptions.AssignStructValueError.prototype,
{
});
Object.assign(Runtime.Exceptions.AssignStructValueError, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.AssignStructValueError,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.AssignStructValueError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.AssignStructValueError);
window["Runtime.Exceptions.AssignStructValueError"] = Runtime.Exceptions.AssignStructValueError;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.AssignStructValueError;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.FileNotFound = function(name, object, code, prev)
{
	if (object == undefined) object = "File";
	if (code == undefined) code = -5;
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "%object% '%name%' not found", Runtime.Map.from({"name":name,"object":object})), code, prev);
};
Runtime.Exceptions.FileNotFound.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.FileNotFound.prototype.constructor = Runtime.Exceptions.FileNotFound;
Object.assign(Runtime.Exceptions.FileNotFound.prototype,
{
});
Object.assign(Runtime.Exceptions.FileNotFound, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.FileNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.FileNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.FileNotFound);
window["Runtime.Exceptions.FileNotFound"] = Runtime.Exceptions.FileNotFound;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.FileNotFound;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.IndexOutOfRange = function(pos, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "Index out of range. Pos: %pos%", Runtime.Map.from({"pos":pos})), Runtime.rtl.ERROR_INDEX_OUT_OF_RANGE, prev);
};
Runtime.Exceptions.IndexOutOfRange.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.IndexOutOfRange.prototype.constructor = Runtime.Exceptions.IndexOutOfRange;
Object.assign(Runtime.Exceptions.IndexOutOfRange.prototype,
{
});
Object.assign(Runtime.Exceptions.IndexOutOfRange, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.IndexOutOfRange,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.IndexOutOfRange";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.IndexOutOfRange);
window["Runtime.Exceptions.IndexOutOfRange"] = Runtime.Exceptions.IndexOutOfRange;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.IndexOutOfRange;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.KeyNotFound = function(key, prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "Key '%key%' not found", Runtime.Map.from({"key":key})), Runtime.rtl.ERROR_KEY_NOT_FOUND, prev);
};
Runtime.Exceptions.KeyNotFound.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.KeyNotFound.prototype.constructor = Runtime.Exceptions.KeyNotFound;
Object.assign(Runtime.Exceptions.KeyNotFound.prototype,
{
});
Object.assign(Runtime.Exceptions.KeyNotFound, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.KeyNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.KeyNotFound);
window["Runtime.Exceptions.KeyNotFound"] = Runtime.Exceptions.KeyNotFound;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.KeyNotFound;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.UnknownError = function(prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, Runtime.rtl.getContext().translate("Runtime", "Unknown error"), Runtime.rtl.ERROR_UNKNOWN, prev);
};
Runtime.Exceptions.UnknownError.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Runtime.Exceptions.UnknownError.prototype.constructor = Runtime.Exceptions.UnknownError;
Object.assign(Runtime.Exceptions.UnknownError.prototype,
{
});
Object.assign(Runtime.Exceptions.UnknownError, Runtime.Exceptions.RuntimeException);
Object.assign(Runtime.Exceptions.UnknownError,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.UnknownError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Exceptions.UnknownError);
window["Runtime.Exceptions.UnknownError"] = Runtime.Exceptions.UnknownError;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Exceptions.UnknownError;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.SerializeInterface = function()
{
};
Object.assign(Runtime.SerializeInterface.prototype,
{
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	get: function(variable_name, default_value)
	{
		if (default_value == undefined) default_value = null;
	},
});
Object.assign(Runtime.SerializeInterface,
{
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.SerializeInterface";
	},
});
Runtime.rtl.defClass(Runtime.SerializeInterface);
window["Runtime.SerializeInterface"] = Runtime.SerializeInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.SerializeInterface;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.StringInterface = function()
{
};
Object.assign(Runtime.StringInterface.prototype,
{
	/**
	 * Returns string
	 */
	toString: function()
	{
	},
});
Object.assign(Runtime.StringInterface,
{
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.StringInterface";
	},
});
Runtime.rtl.defClass(Runtime.StringInterface);
window["Runtime.StringInterface"] = Runtime.StringInterface;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.StringInterface;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.BaseObject = function()
{
	/* Init object */
	this._init();
};
Object.assign(Runtime.BaseObject.prototype,
{
	/**
	 * Init function
	 */
	_init: function()
	{
	},
	/**
	 * Init struct data
	 */
	_init_data: function(obj)
	{
		return obj;
	},
	/**
	 * Assign new values
	 */
	_assign_values: function(obj)
	{
		if (obj == undefined) obj = null;
		if (typeof obj == 'object' && !(obj instanceof Runtime.Dict))
		{
			obj = new Runtime.Dict(obj);
		}
		if (obj == null)
		{
			return ;
		}
		if (obj.keys().count() == 0)
		{
			return ;
		}
		var check_types = false;
		var class_name = this.constructor.getClassName();
		obj = this._init_data(obj);
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
					info = rtl.getFieldInfoWithParents(class_name, real_key);
					if (info)
					{
						value = rtl.convert(value, info.get("t"), null);
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
					info = rtl.getFieldInfoWithParents(class_name, key);
					if (info)
					{
						value = rtl.convert(value, info.get("t"), null);
					}
				}
				this[key] = value;
			}
		}
	},
});
Object.assign(Runtime.BaseObject,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(items)
	{
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.BaseObject);
window["Runtime.BaseObject"] = Runtime.BaseObject;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseObject;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.BaseHook = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.BaseHook.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseHook.prototype.constructor = Runtime.BaseHook;
Object.assign(Runtime.BaseHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		return "";
	},
	/**
	 * Register hook
	 */
	register: function(hook_name, priority)
	{
		if (priority == undefined) priority = 100;
		var method_name = this.getMethodName(hook_name);
		if (method_name == "")
		{
			return ;
		}
		this.hook.register(hook_name, this, method_name, priority);
	},
	/**
	 * Register hook
	 */
	registerMethod: function(hook_name, method_name, priority)
	{
		if (priority == undefined) priority = 100;
		this.hook.register(hook_name, this, method_name, priority);
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.hook = null;
	},
});
Object.assign(Runtime.BaseHook, Runtime.BaseObject);
Object.assign(Runtime.BaseHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("hook");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "hook") return Map.from({
			"t": "Runtime.Providers.HookProvider",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getMethodName",
			"register",
			"registerMethod",
			"register_hooks",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.BaseHook);
window["Runtime.BaseHook"] = Runtime.BaseHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseHook;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.BaseProvider = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.BaseProvider.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseProvider.prototype.constructor = Runtime.BaseProvider;
Object.assign(Runtime.BaseProvider.prototype,
{
	/**
	 * Init provider
	 */
	init: async function(c)
	{
		return Promise.resolve(c);
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.started = false;
	},
});
Object.assign(Runtime.BaseProvider, Runtime.BaseObject);
Object.assign(Runtime.BaseProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("started");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "started") return Map.from({
			"t": "bool",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"init",
			"start",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.BaseProvider);
window["Runtime.BaseProvider"] = Runtime.BaseProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseProvider;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.BaseStruct = function(obj)
{
	if (obj == undefined) obj = null;
	Runtime.BaseObject.call(this);
	this._assign_values(obj);
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
		Object.freeze(this);
};
Runtime.BaseStruct.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.BaseStruct.prototype.constructor = Runtime.BaseStruct;
Object.assign(Runtime.BaseStruct.prototype,
{
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	copy: function(obj)
	{
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		var proto = Object.getPrototypeOf(this);
		var item = Object.create(proto); /* item._init(); */
		item = Object.assign(item, this);
		
		item._assign_values(obj);
		
		Object.freeze(item);
		
		return item;
		return this;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	clone: function(obj)
	{
		if (obj == undefined) obj = null;
		return this.copy(obj);
	},
	/**
	 * Clone this struct with fields
	 * @param Collection fields = null
	 * @return BaseStruct
	 */
	intersect: function(fields)
	{
		if (fields == undefined) fields = null;
		if (fields == null)
		{
			return Runtime.Map.from({});
		}
		var obj = new Runtime.Map();
		for (var i = 0; i < fields.count(); i++)
		{
			var field_name = Runtime.rtl.get(fields, i);
			obj.setValue(field_name, this.get(field_name));
		}
		/* Return object */
		var res = Runtime.rtl.newInstance(this.getClassName(), Runtime.Vector.from([obj.toDict()]));
		return res;
	},
	/**
	 * Returns struct as Dict
	 * @return Dict
	 */
	toDict: function()
	{
		var values = new Runtime.Map();
		var names = Runtime.rtl.getFields(this.constructor.getClassName());
		for (var i = 0; i < names.count(); i++)
		{
			var variable_name = names.item(i);
			var value = this.get(variable_name, null);
			values.setValue(variable_name, value);
		}
		return values.toDict();
	},
});
Object.assign(Runtime.BaseStruct, Runtime.BaseObject);
Object.assign(Runtime.BaseStruct,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(items)
	{
		return new (
			Function.prototype.bind.apply(
				this,
				(typeof ctx != "undefined") ? [null, ctx, items] : [null, items]
			)
		);
	},
	/**
	 * Update struct
	 * @param Collection<string> path
	 * @param var value
	 * @return BaseStruct
	 */
	set: function(item, path, value)
	{
		return Runtime.rtl.setAttr(item, path, value);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"copy",
			"clone",
			"intersect",
			"newInstance",
			"set",
			"toDict",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.BaseStruct);
window["Runtime.BaseStruct"] = Runtime.BaseStruct;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.BaseStruct;
Runtime.BaseStruct.prototype.get = function(k, v)
{
	if (v == undefined) v = null;
	return this[k] != undefined ? this[k] : v;
};
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Callback = function(obj)
{
	if (obj == undefined) obj = null;
	if (!(obj instanceof Runtime.Dict))
	{
		var args = null;
		args = Runtime.Collection.from( [ ...arguments ] );
		obj = Runtime.Map.from({"obj":args.get(0),"name":args.get(1)});
	}
	Runtime.BaseStruct.call(this, obj);
	this.checkExists();
};
Runtime.Callback.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Callback.prototype.constructor = Runtime.Callback;
Object.assign(Runtime.Callback.prototype,
{
	/**
	 * Check if method exists
	 */
	checkExists: function()
	{
		if (!Runtime.rtl.method_exists(this.obj, this.name))
		{
			throw new Runtime.Exceptions.RuntimeException("Method '" + Runtime.rtl.toStr(this.name) + Runtime.rtl.toStr("' not found in ") + Runtime.rtl.toStr(Runtime.rtl.get_class_name(this.obj)))
		}
	},
	/**
	 * Call function
	 */
	call: function(args)
	{
		if (args == undefined) args = null;
		obj = this.obj;
		
		if (typeof(obj) == "string")
		{
			obj = Runtime.rtl.find_class(obj);
		}
		
		return Runtime.rtl.apply(obj[this.name].bind(obj), args);
	},
	/**
	 * Call function
	 */
	callAsync: async function(args)
	{
		if (args == undefined) args = null;
		obj = this.obj;
		
		if (typeof(obj) == "string")
		{
			obj = Runtime.rtl.find_class(obj);
		}
		
		return await Runtime.rtl.applyAsync(obj[this.name].bind(obj), args);
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.obj = null;
		this.name = null;
		this.tag = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "obj")return this.obj;
		else if (k == "name")return this.name;
		else if (k == "tag")return this.tag;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Callback, Runtime.BaseStruct);
Object.assign(Runtime.Callback,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Callback";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("obj");
		a.push("name");
		a.push("tag");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "obj") return Map.from({
			"t": "var",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "name") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "tag") return Map.from({
			"t": "var",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"checkExists",
			"call",
			"callAsync",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Callback);
window["Runtime.Callback"] = Runtime.Callback;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Callback;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Date = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Date.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Date.prototype.constructor = Runtime.Date;
Object.assign(Runtime.Date.prototype,
{
	/**
	 * Return date
	 * @return string
	 */
	getDate: function()
	{
		return this.y + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.m) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.d);
	},
	/**
	 * Normalize date time
	 */
	normalize: function()
	{
		return this;
	},
	/**
	 * Return db datetime
	 * @return string
	 */
	toString: function()
	{
		return this.y + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.m) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(this.d);
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.y = 0;
		this.m = 0;
		this.d = 0;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "y")return this.y;
		else if (k == "m")return this.m;
		else if (k == "d")return this.d;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Date, Runtime.BaseStruct);
Object.assign(Runtime.Date,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Date";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("y");
		a.push("m");
		a.push("d");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "y") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "m") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "d") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getDate",
			"normalize",
			"toString",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
	__implements__:
	[
		Runtime.StringInterface,
	],
});
Runtime.rtl.defClass(Runtime.Date);
window["Runtime.Date"] = Runtime.Date;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Date;
Runtime.Date.prototype.toObject = function()
{
	var dt = new Date(this.y, this.m - 1, this.d);
	return dt;
}
Runtime.Date.fromObject = function(dt)
{
	var Dict = use("Runtime.Dict");
	var y = Number(dt.getFullYear());
	var m = Number(dt.getMonth()) + 1;
	var d = Number(dt.getDate());
	var dt = new Runtime.Date( ctx, Dict.from({"y":y,"m":m,"d":d}) );
	return dt;
}
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.DateTime = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.DateTime.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.DateTime.prototype.constructor = Runtime.DateTime;
Object.assign(Runtime.DateTime.prototype,
{
	/**
	 * Shift time
	 */
	shiftTime: function(shift)
	{
		var timestamp = this.getTimestamp() + shift;
		var dt = this.constructor.create(timestamp, this.tz);
		return dt;
	},
	/**
	 * Shift tz
	 */
	shift: function(tz)
	{
		var timestamp = this.getTimestamp();
		var dt = this.constructor.create(timestamp, tz);
		return dt;
	},
	/**
	 * Set week number
	 */
	setWeekNumber: function(week)
	{
		var dt = new Date(this.y, 0, 1, 0, 0, 0);
		var year_begin = Math.round(dt.getTime() / 1000) - dt.getTimezoneOffset() * 60;
		var day_begin = dt.getDay();
		var shift = (day_begin - 1) * 86400;
		var week_begin = year_begin - shift;
		week_begin = week_begin + week * 604800 + dt.getTimezoneOffset() * 60;
		return this.constructor.fromObject(new Date(week_begin*1000), this.tz, false);
		return this;
	},
	/**
	 * Returns timestamp
	 * @return int
	 */
	getTimestamp: function()
	{
		var dt = this.toObject();
		return Math.round(dt.getTime() / 1000);
		return null;
	},
	timestamp: function()
	{
		return this.getTimestamp();
	},
	/**
	 * Returns day of week
	 * @return int
	 */
	getDayOfWeek: function()
	{
		var dt = this.toObject();
		return dt.getDay();
		return null;
	},
	/**
	 * Return db datetime
	 * @return string
	 */
	toString: function(tz)
	{
		if (tz == undefined) tz = "";
		if (tz == "")
		{
			tz = Runtime.rtl.getContext().tz;
		}
		var offset = 0;
		var dt = this.toObject();
		if (tz == "") tz = this.tz;
		
		offset = this.constructor.getTimezoneOffset(tz);
		offset = offset - dt.getTimezoneOffset();
		dt = this.constructor.shiftOffset(dt, -offset);
		
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
		return "";
	},
	/**
	 * Returns database time by UTC
	 */
	getDatabaseTime: function()
	{
		return this.toString("UTC");
	},
	/**
	 * Return datetime in RFC822
	 * @return string
	 */
	getRFC822: function()
	{
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
		return "";
	},
	/**
	 * Return datetime in ISO8601
	 * @return string
	 */
	getISO8601: function()
	{
		var y = this.y, m = this.m, d = this.d, h = this.h, i = this.i, s = this.s;
		m = (m < 10) ? "0" + m : "" + m;
		d = (d < 10) ? "0" + d : "" + d;
		h = (h < 10) ? "0" + h : "" + h;
		i = (i < 10) ? "0" + i : "" + i;
		s = (s < 10) ? "0" + s : "" + s;
		var tz = Math.ceil(-this.constructor.getTimezoneOffset(this.tz) / 60);
		if (tz < 10 && tz >= 0) tz = "0" + tz;
		if (tz >= 0) tz = "+" + tz;
		return this.y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + tz + "00";
		return "";
	},
	/**
	 * Normalize date time
	 */
	normalize: function()
	{
		return this;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.y = 1970;
		this.m = 1;
		this.d = 1;
		this.h = 0;
		this.i = 0;
		this.s = 0;
		this.ms = 0;
		this.tz = "UTC";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "y")return this.y;
		else if (k == "m")return this.m;
		else if (k == "d")return this.d;
		else if (k == "h")return this.h;
		else if (k == "i")return this.i;
		else if (k == "s")return this.s;
		else if (k == "ms")return this.ms;
		else if (k == "tz")return this.tz;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.DateTime, Runtime.BaseStruct);
Object.assign(Runtime.DateTime,
{
	/**
	 * Create date time from timestamp
	 */
	create: function(time, tz)
	{
		if (time == undefined) time = -1;
		if (tz == undefined) tz = "UTC";
		var dt = null;
		if (time == -1) dt = new Date();
		else dt = new Date(time*1000);
		return this.fromObject(dt, tz);
		return null;
	},
	/**
	 * Create date time from string
	 */
	from: function(s, tz)
	{
		if (tz == undefined) tz = "UTC";
		if (Runtime.rs.strlen(s) < 19)
		{
			return null;
		}
		if (Runtime.rs.strlen(s) > 19)
		{
			tz = Runtime.rs.substr(s, 19);
		}
		return new Runtime.DateTime(Runtime.Map.from({"y":Runtime.rtl.to(Runtime.rs.substr(s, 0, 4), {"e":"int"}),"m":Runtime.rtl.to(Runtime.rs.substr(s, 5, 2), {"e":"int"}),"d":Runtime.rtl.to(Runtime.rs.substr(s, 8, 2), {"e":"int"}),"h":Runtime.rtl.to(Runtime.rs.substr(s, 11, 2), {"e":"int"}),"i":Runtime.rtl.to(Runtime.rs.substr(s, 14, 2), {"e":"int"}),"s":Runtime.rtl.to(Runtime.rs.substr(s, 17, 2), {"e":"int"}),"tz":tz}));
	},
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	now: function(tz)
	{
		if (tz == undefined) tz = "UTC";
		return this.create(-1, tz);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.DateTime";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("y");
		a.push("m");
		a.push("d");
		a.push("h");
		a.push("i");
		a.push("s");
		a.push("ms");
		a.push("tz");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "y") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "m") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "d") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "h") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "i") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "s") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "ms") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "tz") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"create",
			"from",
			"now",
			"shiftTime",
			"shift",
			"setWeekNumber",
			"getTimestamp",
			"timestamp",
			"getDayOfWeek",
			"toString",
			"getDatabaseTime",
			"getRFC822",
			"getISO8601",
			"normalize",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
	__implements__:
	[
		Runtime.StringInterface,
	],
});
Runtime.rtl.defClass(Runtime.DateTime);
window["Runtime.DateTime"] = Runtime.DateTime;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.DateTime;
Runtime.DateTime.getTimezoneOffset = function(tz)
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

Runtime.DateTime.shiftOffset = function(dt, offset)
{
	var h = Math.floor(offset / 60);
	var m = offset % 60;
	dt.setMinutes(dt.getMinutes() + m);
	dt.setHours(dt.getHours() + h);
	return dt;
}

Runtime.DateTime.prototype.toObject = function()
{
	var dt = new Date(this.y, this.m - 1, this.d, this.h, this.i, this.s);
	var offset = this.constructor.getTimezoneOffset(this.tz);
	var offset = offset - dt.getTimezoneOffset();
	dt = this.constructor.shiftOffset(dt, offset);
	return dt;
}

Runtime.DateTime.fromObject = function(dt, tz, is_shift)
{
	if (is_shift == undefined) is_shift = true;
	var Dict = use("Runtime.Dict");
	if (is_shift)
	{
		var offset = this.getTimezoneOffset(tz);
		var offset = offset - dt.getTimezoneOffset();
		dt = this.shiftOffset(dt, -offset);
	}
	var y = Number(dt.getFullYear());
	var m = Number(dt.getMonth()) + 1;
	var d = Number(dt.getDate());
	var h = Number(dt.getHours());
	var i = Number(dt.getMinutes());
	var s = Number(dt.getSeconds());
	var dt = new Runtime.DateTime(Dict.from({"y":y,"m":m,"d":d,"h":h,"i":i,"s":s,"tz":tz}));
	return dt;
}
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.ModelProxy = function(container, path)
{
	if (path == undefined) path = null;
	Runtime.BaseObject.call(this);
	if (container instanceof Runtime.BaseStruct)
	{
		this.container = new Runtime.Reference(container);
		this.path = Runtime.Vector.from(["ref"]).concat(path);
	}
	else
	{
		this.container = container;
		this.path = path;
	}
};
Runtime.ModelProxy.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ModelProxy.prototype.constructor = Runtime.ModelProxy;
Object.assign(Runtime.ModelProxy.prototype,
{
	/**
     * Returns path
     */
	getPath: function()
	{
		return (this.path) ? (this.path) : (Runtime.Vector.from([]));
	},
	/**
	 * Returns model data by path
	 */
	data: function(model_path)
	{
		if (model_path == undefined) model_path = null;
		if (model_path == null)
		{
			model_path = Runtime.Vector.from([]);
		}
		return Runtime.rtl.attr(this.container, this.getPath().concat(model_path));
	},
	attr: function(model_path)
	{
		if (model_path == undefined) model_path = null;
		return this.data(model_path);
	},
	model: function(model_path)
	{
		if (model_path == undefined) model_path = null;
		return this.data(model_path);
	},
	/**
	 * Set new model
	 */
	setNewModel: function(new_model)
	{
		var old_model = this.data();
		this.container = Runtime.rtl.setAttr(this.container, this.getPath(), new_model);
		if (Runtime.rtl.method_exists(this.container, "onUpdateModel"))
		{
			this.container.onUpdateModel(this.getPath(), old_model, new_model);
		}
	},
	/**
	 * Call method name
	 */
	call: function(method_name)
	{
		var args = null;
		var old_model = this.data();
		var value = null;
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		if (old_model == null)
		{
			throw new Runtime.Exceptions.RuntimeException("model is null")
		}
		var class_name = old_model.constructor.getClassName();
		if (Runtime.rtl.method_exists(old_model, method_name))
		{
			var f = Runtime.rtl.method(old_model, method_name);
			value = Runtime.rtl.apply(f, args);
		}
		else if (Runtime.rtl.method_exists(class_name, method_name))
		{
			var f = Runtime.rtl.method(class_name, method_name);
			args = args.prependIm(this);
			value = Runtime.rtl.apply(f, args);
		}
		else
		{
			throw new Runtime.Exceptions.FileNotFound(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name), "Method")
		}
		return value;
	},
	/**
	 * Call method name
	 */
	callAsync: async function(method_name)
	{
		var args = null;
		var old_model = this.data();
		var value = null;
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		if (old_model == null)
		{
			throw new Runtime.Exceptions.RuntimeException("model is null")
		}
		var class_name = old_model.constructor.getClassName();
		if (Runtime.rtl.method_exists(old_model, method_name))
		{
			var f = Runtime.rtl.method(old_model, method_name);
			value = await Runtime.rtl.applyAsync(f, args);
		}
		else if (Runtime.rtl.method_exists(class_name, method_name))
		{
			var f = Runtime.rtl.method(class_name, method_name);
			args = args.prependIm(this);
			value = await Runtime.rtl.applyAsync(f, args);
		}
		else
		{
			throw new Runtime.Exceptions.FileNotFound(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name), "Method")
		}
		return Promise.resolve(value);
	},
	/**
	 * Commit model
	 */
	commit: function(method_name)
	{
		var args = null;
		var old_model = this.data();
		var new_model = null;
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		if (old_model == null)
		{
			throw new Runtime.Exceptions.RuntimeException("model is null")
		}
		var class_name = old_model.constructor.getClassName();
		if (Runtime.rtl.method_exists(old_model, method_name))
		{
			var f = new Runtime.Callback(Runtime.Map.from({"obj":old_model,"name":method_name}));
			new_model = f.call(args);
			this.setNewModel(new_model);
		}
		else if (Runtime.rtl.method_exists(class_name, method_name))
		{
			var f = new Runtime.Callback(Runtime.Map.from({"obj":class_name,"name":method_name}));
			args = args.prependIm(this);
			new_model = f.call(args);
		}
		else
		{
			throw new Runtime.Exceptions.FileNotFound(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name), "Method")
		}
	},
	/**
	 * Commit model
	 */
	commitAsync: async function(method_name)
	{
		var res = null;
		var args = null;
		var model = this.data();
		var class_name = model.constructor.getClassName();
		args = Runtime.Collection.from( [ ...arguments ].slice(1) );
		if (Runtime.rtl.method_exists(class_name, method_name))
		{
			var f = new Runtime.Callback(Runtime.Map.from({"obj":class_name,"name":method_name}));
			args = args.prependIm(this);
			res = await f.callAsync(args);
		}
		else
		{
			throw new Runtime.Exceptions.FileNotFound(class_name + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(method_name), "Method")
		}
		return Promise.resolve(res);
	},
	/**
	 * Get child model
	 */
	proxy: function(path)
	{
		if (Runtime.rtl.isString(path))
		{
			path = Runtime.Vector.from([path]);
		}
		return new Runtime.ModelProxy(this.container, this.getPath().concat(path));
	},
	/**
	 * Get parent proxy
	 */
	parentProxy: function()
	{
		return new Runtime.ModelProxy(this.container, this.getPath().removeLastIm());
	},
	/**
	 * fork proxy
	 */
	fork: function(path)
	{
		if (Runtime.rtl.isString(path))
		{
			path = Runtime.Vector.from([path]);
		}
		return new Runtime.ModelProxy(this.container, path);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.container = null;
		this.path = null;
	},
});
Object.assign(Runtime.ModelProxy, Runtime.BaseObject);
Object.assign(Runtime.ModelProxy,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.ModelProxy";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("container");
		a.push("path");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "container") return Map.from({
			"t": "var",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "path") return Map.from({
			"t": "Runtime.Collection",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"getPath",
			"data",
			"attr",
			"model",
			"setNewModel",
			"call",
			"callAsync",
			"commit",
			"commitAsync",
			"proxy",
			"parentProxy",
			"fork",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.ModelProxy);
window["Runtime.ModelProxy"] = Runtime.ModelProxy;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ModelProxy;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Reference = function(ref)
{
	if (ref == undefined) ref = null;
	Runtime.BaseObject.call(this);
	this.ref = ref;
};
Runtime.Reference.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Reference.prototype.constructor = Runtime.Reference;
Object.assign(Runtime.Reference.prototype,
{
	/**
	 * Assign and clone data from other object
	 * @param BaseObject obj
	 */
	assignObject1: function(obj)
	{
		if (obj instanceof Runtime.Reference)
		{
			this.uq = obj.uq;
			this.ref = this.ref;
		}
		Runtime.BaseObject.prototype.assignObject1.call(this, obj);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.uq = Runtime.rtl.unique();
		this.ref = null;
	},
});
Object.assign(Runtime.Reference, Runtime.BaseObject);
Object.assign(Runtime.Reference,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Reference";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("uq");
		a.push("ref");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "uq") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "ref") return Map.from({
			"t": "T",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"assignObject1",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Reference);
window["Runtime.Reference"] = Runtime.Reference;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Reference;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Context = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Context.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Add provider
	 */
	addProvider: function(provider_name, provider)
	{
		var c = this;
		if (this.providers.has(provider_name))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider + '" + provider_name + "' already registered")
		}
		if (!(provider instanceof Runtime.BaseProvider))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider + '" + provider_name + "' must be intstanceof BaseProvider")
		}
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["providers"]), c.providers.setIm(provider_name, provider));
		return c;
	},
	/**
	 * Returns provider by name
	 */
	provider: function(provider_name)
	{
		if (!this.providers.has(provider_name))
		{
			throw new Runtime.Exceptions.RuntimeException("Provider '" + Runtime.rtl.toStr(provider_name) + Runtime.rtl.toStr("' not found"))
		}
		return this.providers.get(provider_name);
	},
	/**
	 * Return environment
	 */
	env: function(name)
	{
		var value = Runtime.rtl.get(this.environments, name);
		var hook_res = this.callHook(Runtime.Hooks.RuntimeHook.ENV, Runtime.Map.from({"name":name,"value":value}));
		return Runtime.rtl.get(hook_res, "value");
	},
	/**
	 * Init
	 */
	init: async function()
	{
		var hook_res;
		var c = this;
		if (c.initialized)
		{
			return Promise.resolve(c);
		}
		/* Create app */
		if (c.entry_point != "")
		{
			c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["app"]), Runtime.rtl.newInstance(c.entry_point));
		}
		/* Add start modules */
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["start_modules"]), c.modules);
		/* Get modules */
		var modules = c.modules;
		if (modules.indexOf("Runtime"))
		{
			modules = modules.prependIm("Runtime");
		}
		/* Extends modules */
		var modules = this.constructor.getRequiredModules(modules);
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["modules"]), modules);
		/* Extends app modules */
		if (c.app != null && Runtime.rtl.method_exists(c.app, "modules"))
		{
			c = await c.app.modules(c);
		}
		/* Get modules entities */
		var entities = this.constructor.getEntitiesFromModules(c.modules);
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["entities"]), entities);
		/* Create providers */
		var providers = c.entities.filter(Runtime.lib.isInstance("Runtime.Entity.Provider"));
		for (var i = 0; i < providers.count(); i++)
		{
			var info = Runtime.rtl.get(providers, i);
			if (info.value)
			{
				var provider = null;
				if (info.value instanceof Runtime.BaseProvider)
				{
					provider = info.value;
				}
				else if (Runtime.rtl.isString(info.value))
				{
					provider = Runtime.rtl.newInstance(info.value);
				}
				if (provider)
				{
					c = c.addProvider(info.name, provider);
				}
				else if (info.value)
				{
					throw new Runtime.Exceptions.RuntimeException("Wrong declare provider '" + Runtime.rtl.toStr(info.name) + Runtime.rtl.toStr("'"))
				}
			}
		}
		/* Init providers */
		var providers_names = c.providers.keys();
		for (var i = 0; i < providers_names.count(); i++)
		{
			var provider_name = Runtime.rtl.get(providers_names, i);
			var provider = Runtime.rtl.get(c.providers, provider_name);
			c = await provider.init(c);
		}
		/* Hook init app */
		hook_res = await c.callAsyncHook(Runtime.Hooks.RuntimeHook.INIT, Runtime.Map.from({"context":c}));
		c = Runtime.rtl.get(hook_res, "context");
		/* Init app */
		if (c.app != null && Runtime.rtl.method_exists(c.app, "init"))
		{
			c = await c.app.init(c);
		}
		/* Set initialized */
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["initialized"]), true);
		return Promise.resolve(c);
	},
	/**
	 * Start context
	 */
	start: async function()
	{
		/* Start providers */
		var providers_names = this.providers.keys();
		for (var i = 0; i < providers_names.count(); i++)
		{
			var provider_name = Runtime.rtl.get(providers_names, i);
			var provider = Runtime.rtl.get(this.providers, provider_name);
			if (!provider.started)
			{
				await provider.start();
				provider.started = true;
			}
		}
		/* Hook start app */
		await this.callAsyncHook(Runtime.Hooks.RuntimeHook.START, Runtime.Map.from({}));
		/* Start app */
		if (this.app && Runtime.rtl.method_exists(this.app, "start"))
		{
			await this.app.start();
		}
		/* Hook launched app */
		await this.callAsyncHook(Runtime.Hooks.RuntimeHook.LAUNCHED, Runtime.Map.from({}));
	},
	/**
	 * Run context
	 */
	run: async function()
	{
		var code = 0;
		/* Run app */
		if (this.app == null)
		{
			return Promise.resolve();
		}
		/* Run entry_point */
		if (Runtime.rtl.method_exists(this.app, "main"))
		{
			/* Hook launched app */
			await this.callAsyncHook(Runtime.Hooks.RuntimeHook.RUN, Runtime.Map.from({}));
			code = await this.app.main();
		}
		return Promise.resolve(code);
	},
	/**
	 * Call hook
	 */
	callHook: function(hook_name, d)
	{
		var hook = this.provider("hook");
		var methods_list = hook.getMethods(hook_name);
		for (var i = 0; i < methods_list.count(); i++)
		{
			var info = Runtime.rtl.get(methods_list, i);
			var f = Runtime.rtl.method(Runtime.rtl.get(info, "obj"), Runtime.rtl.get(info, "method_name"));
			d = f(d);
		}
		return d;
	},
	/**
	 * Call async hook
	 */
	callAsyncHook: async function(hook_name, d)
	{
		var hook = this.provider("hook");
		var methods_list = hook.getMethods(hook_name);
		for (var i = 0; i < methods_list.count(); i++)
		{
			var info = Runtime.rtl.get(methods_list, i);
			var f = Runtime.rtl.method(Runtime.rtl.get(info, "obj"), Runtime.rtl.get(info, "method_name"));
			d = await f(d);
		}
		return Promise.resolve(d);
	},
	/**
	 * Translate message
	 */
	translate: function(module, s, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return s;
		}
		return this.format(s, params);
	},
	/**
	 * Format string
	 */
	format: function(s, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			return s;
		}
		params.each((value, key) => 
		{
			s = Runtime.rs.replace("%" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("%"), value, s);
		});
		return s;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.app = null;
		this.base_path = "";
		this.entry_point = "";
		this.start_modules = Runtime.Vector.from([]);
		this.cli_args = Runtime.Vector.from([]);
		this.environments = Runtime.Map.from({});
		this.modules = Runtime.Vector.from([]);
		this.providers = Runtime.Map.from({});
		this.entities = Runtime.Vector.from([]);
		this.start_time = 0;
		this.tz = "UTC";
		this.initialized = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "app")return this.app;
		else if (k == "base_path")return this.base_path;
		else if (k == "entry_point")return this.entry_point;
		else if (k == "start_modules")return this.start_modules;
		else if (k == "cli_args")return this.cli_args;
		else if (k == "environments")return this.environments;
		else if (k == "modules")return this.modules;
		else if (k == "providers")return this.providers;
		else if (k == "entities")return this.entities;
		else if (k == "start_time")return this.start_time;
		else if (k == "tz")return this.tz;
		else if (k == "initialized")return this.initialized;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Context, Runtime.BaseStruct);
Object.assign(Runtime.Context,
{
	/**
	 * Returns modules entities
	 */
	getEntitiesFromModules: function(modules)
	{
		var entities = new Runtime.Vector();
		for (var i = 0; i < modules.count(); i++)
		{
			var module_class_name = modules.item(i) + Runtime.rtl.toStr(".ModuleDescription");
			if (Runtime.rtl.method_exists(module_class_name, "entities"))
			{
				var f = Runtime.rtl.method(module_class_name, "entities");
				var arr = f();
				entities.appendVector(arr);
			}
		}
		return entities.removeDuplicates().toCollection();
	},
	/**
	 * Create context
	 */
	create: function(d)
	{
		if (!(d instanceof Runtime.Dict))
		{
			d = Runtime.Dict.from(d);
		}
		if (!d.has("start_time"))
		{
			d = d.setIm("start_time", Date.now());
		}
		if (d.has("modules"))
		{
			var modules = d.get("modules");
			if (!(modules instanceof Runtime.Collection))
			{
				d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["modules"]), Runtime.Collection.from(modules));
			}
		}
		/* Setup default environments */
		if (!d.has("environments"))
		{
			d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["environments"]), new Runtime.Dict());
		}
		var env = Runtime.rtl.get(d, "environments");
		if (!env.has("DEBUG"))
		{
			env = Runtime.rtl.setAttr(env, Runtime.Collection.from(["DEBUG"]), false);
		}
		if (!env.has("LOCALE"))
		{
			env = Runtime.rtl.setAttr(env, Runtime.Collection.from(["LOCALE"]), "en_US");
		}
		if (!env.has("LOCALE_CODE"))
		{
			env = Runtime.rtl.setAttr(env, Runtime.Collection.from(["LOCALE_CODE"]), "en");
		}
		d = Runtime.rtl.setAttr(d, Runtime.Collection.from(["environments"]), env);
		var instance = Runtime.rtl.newInstance(this.getClassName(), Runtime.Vector.from([d]));
		return instance;
	},
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(res, cache, modules, filter)
	{
		if (filter == undefined) filter = null;
		if (modules == null)
		{
			return ;
		}
		if (filter)
		{
			modules = modules.filter(filter);
		}
		for (var i = 0; i < modules.count(); i++)
		{
			var module_name = modules.item(i);
			if (cache.get(module_name, false) == false)
			{
				cache.setValue(module_name, true);
				var f = Runtime.rtl.method(module_name + Runtime.rtl.toStr(".ModuleDescription"), "requiredModules");
				var sub_modules = f();
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys();
					this._getRequiredModules(res, cache, sub_modules);
				}
				res.pushValue(module_name);
			}
		}
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(modules)
	{
		var res = new Runtime.Vector();
		var cache = new Runtime.Map();
		this._getRequiredModules(res, cache, modules);
		res = res.removeDuplicates();
		return res.toCollection();
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Context";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("app");
		a.push("base_path");
		a.push("entry_point");
		a.push("start_modules");
		a.push("cli_args");
		a.push("environments");
		a.push("modules");
		a.push("providers");
		a.push("entities");
		a.push("start_time");
		a.push("tz");
		a.push("initialized");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "app") return Map.from({
			"t": "var",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "base_path") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "entry_point") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "start_modules") return Map.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Vector.from([
			]),
		});
		if (field_name == "cli_args") return Map.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Vector.from([
			]),
		});
		if (field_name == "environments") return Map.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Vector.from([
			]),
		});
		if (field_name == "modules") return Map.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Vector.from([
			]),
		});
		if (field_name == "providers") return Map.from({
			"t": "Runtime.Dict",
			"s": ["Runtime.BaseObject"],
			"annotations": Vector.from([
			]),
		});
		if (field_name == "entities") return Map.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.BaseStruct"],
			"annotations": Vector.from([
			]),
		});
		if (field_name == "start_time") return Map.from({
			"t": "int",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "tz") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "initialized") return Map.from({
			"t": "bool",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getEntitiesFromModules",
			"addProvider",
			"provider",
			"env",
			"create",
			"init",
			"start",
			"run",
			"callHook",
			"callAsyncHook",
			"_getRequiredModules",
			"getRequiredModules",
			"translate",
			"format",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Context);
window["Runtime.Context"] = Runtime.Context;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Context;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Entity = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Entity.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Entity.prototype.constructor = Runtime.Entity;
Object.assign(Runtime.Entity.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.name = "";
		this.params = Runtime.Map.from({});
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "params")return this.params;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity, Runtime.BaseStruct);
Object.assign(Runtime.Entity,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Entity";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("name");
		a.push("params");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "name") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		if (field_name == "params") return Map.from({
			"t": "Runtime.Dict",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Entity);
window["Runtime.Entity"] = Runtime.Entity;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.ModuleDescription = function()
{
};
Object.assign(Runtime.ModuleDescription.prototype,
{
});
Object.assign(Runtime.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.11.8";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return null;
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Entity.Provider("input", null),new Runtime.Entity.Provider("output", "Runtime.Providers.OutputProvider"),new Runtime.Entity.Provider("log", null),new Runtime.Entity.Provider("hook", "Runtime.Providers.HookProvider")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getModuleName",
			"getModuleVersion",
			"requiredModules",
			"entities",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.ModuleDescription);
window["Runtime.ModuleDescription"] = Runtime.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ModuleDescription;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Hook = function(name)
{
	Runtime.Entity.call(this, Runtime.Map.from({"name":name}));
};
Runtime.Entity.Hook.prototype = Object.create(Runtime.Entity.prototype);
Runtime.Entity.Hook.prototype.constructor = Runtime.Entity.Hook;
Object.assign(Runtime.Entity.Hook.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Hook, Runtime.Entity);
Object.assign(Runtime.Entity.Hook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Hook";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Entity.Hook);
window["Runtime.Entity.Hook"] = Runtime.Entity.Hook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Hook;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Provider = function(name, value)
{
	Runtime.Entity.call(this, Runtime.Map.from({"name":name,"value":value}));
};
Runtime.Entity.Provider.prototype = Object.create(Runtime.Entity.prototype);
Runtime.Entity.Provider.prototype.constructor = Runtime.Entity.Provider;
Object.assign(Runtime.Entity.Provider.prototype,
{
	_init: function()
	{
		Runtime.Entity.prototype._init.call(this);
		this.value = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "value")return this.value;
		return Runtime.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Provider, Runtime.Entity);
Object.assign(Runtime.Entity.Provider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Provider";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("value");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "value") return Map.from({
			"t": "string",
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Entity.Provider);
window["Runtime.Entity.Provider"] = Runtime.Entity.Provider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Provider;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Hooks == 'undefined') Runtime.Hooks = {};
Runtime.Hooks.RuntimeHook = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
Runtime.Hooks.RuntimeHook.prototype = Object.create(Runtime.BaseHook.prototype);
Runtime.Hooks.RuntimeHook.prototype.constructor = Runtime.Hooks.RuntimeHook;
Object.assign(Runtime.Hooks.RuntimeHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.INIT)
		{
			return "init";
		}
		if (hook_name == this.constructor.START)
		{
			return "start";
		}
		if (hook_name == this.constructor.LAUNCHED)
		{
			return "launched";
		}
		if (hook_name == this.constructor.RUN)
		{
			return "run";
		}
		if (hook_name == this.constructor.ENV)
		{
			return "env";
		}
		return "";
	},
	/**
	 * Init context
	 */
	init: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Start context
	 */
	start: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Launched context
	 */
	launched: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Run entry point
	 */
	run: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Init context
	 */
	env: function(d)
	{
		return d;
	},
});
Object.assign(Runtime.Hooks.RuntimeHook, Runtime.BaseHook);
Object.assign(Runtime.Hooks.RuntimeHook,
{
	INIT: "runtime::init",
	START: "runtime::start",
	LAUNCHED: "runtime::launched",
	RUN: "runtime::run",
	ENV: "runtime::env",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Hooks.RuntimeHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseHook";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getMethodName",
			"init",
			"start",
			"launched",
			"run",
			"env",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Hooks.RuntimeHook);
window["Runtime.Hooks.RuntimeHook"] = Runtime.Hooks.RuntimeHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Hooks.RuntimeHook;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Providers == 'undefined') Runtime.Providers = {};
Runtime.Providers.HookProvider = function()
{
	Runtime.BaseProvider.apply(this, arguments);
};
Runtime.Providers.HookProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Providers.HookProvider.prototype.constructor = Runtime.Providers.HookProvider;
Object.assign(Runtime.Providers.HookProvider.prototype,
{
	/**
	 * Init provider
	 */
	init: async function(c)
	{
		var hooks = c.entities.filter(Runtime.lib.isInstance("Runtime.Entity.Hook"));
		var base_hooks = new Runtime.Vector();
		for (var i = 0; i < hooks.count(); i++)
		{
			var hook = Runtime.rtl.get(hooks, i);
			var base_hook = Runtime.rtl.newInstance(hook.name);
			base_hooks.pushValue(base_hook);
			base_hook.hook = this;
			base_hook.register_hooks();
			base_hooks.pushValue(base_hook);
		}
		this.base_hooks = base_hooks.toCollection();
		return Promise.resolve(c);
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
	},
	/**
	 * Register hook
	 */
	register: function(hook_name, obj, method_name, priority)
	{
		if (priority == undefined) priority = 0;
		if (!this.hooks.has(hook_name))
		{
			this.hooks.setValue(hook_name, new Runtime.Map());
		}
		var priorities = Runtime.rtl.get(this.hooks, hook_name);
		if (!priorities.has(priority))
		{
			priorities.setValue(priority, new Runtime.Vector());
		}
		var methods_list = priorities.get(priority);
		methods_list.pushValue(Runtime.Map.from({"obj":obj,"method_name":method_name}));
	},
	/**
	 * Remove hook
	 */
	remove: function(hook_name, obj, method_name, priority)
	{
		if (priority == undefined) priority = 0;
		if (!this.hooks.has(hook_name))
		{
			this.hooks.setValue(hook_name, new Runtime.Map());
		}
		var priorities = Runtime.rtl.get(this.hooks, hook_name);
		if (!priorities.has(priority))
		{
			priorities.setValue(priority, new Runtime.Vector());
		}
		var methods_list = priorities.get(priority);
		var index = methods_list.find((info) => 
		{
			return Runtime.rtl.get(info, "obj") == obj && Runtime.rtl.get(info, "method_name") == method_name;
		});
		if (index > -1)
		{
			methods_list.removePosition(index);
		}
	},
	/**
	 * Returns method list
	 */
	getMethods: function(hook_name)
	{
		if (!this.hooks.has(hook_name))
		{
			return Runtime.Vector.from([]);
		}
		var res = new Runtime.Vector();
		var priorities = Runtime.rtl.get(this.hooks, hook_name);
		var priorities_keys = priorities.keys().sort();
		for (var i = 0; i < priorities_keys.count(); i++)
		{
			var priority = Runtime.rtl.get(priorities_keys, i);
			var methods_list = priorities.get(priority);
			res.appendVector(methods_list);
		}
		return res.toCollection();
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.base_hooks = Runtime.Vector.from([]);
		this.hooks = new Runtime.Map();
	},
});
Object.assign(Runtime.Providers.HookProvider, Runtime.BaseProvider);
Object.assign(Runtime.Providers.HookProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Providers";
	},
	getClassName: function()
	{
		return "Runtime.Providers.HookProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("base_hooks");
		a.push("hooks");
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		if (field_name == "base_hooks") return Map.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.BaseHook"],
			"annotations": Vector.from([
			]),
		});
		if (field_name == "hooks") return Map.from({
			"t": "Runtime.Map",
			"s": ["Runtime.Map"],
			"annotations": Vector.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"init",
			"start",
			"register",
			"remove",
			"getMethods",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Providers.HookProvider);
window["Runtime.Providers.HookProvider"] = Runtime.Providers.HookProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Providers.HookProvider;
"use strict;"
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Providers == 'undefined') Runtime.Providers = {};
Runtime.Providers.OutputProvider = function()
{
	Runtime.BaseProvider.call(this);
	this.color_table = Runtime.Map.from({"black":"0;30","dark_red":"0;31","green":"0;32","brown":"0;33","dark_blue":"0;34","dark_purple":"0;35","dark_cyan":"0;36","gray":"0;37","dark_gray":"0;90","red":"0;91","light_green":"0;92","yellow":"0;93","blue":"0;94","purple":"0;95","cyan":"0;96","white":"0;97","bold_black":"1;30","bold_dark_red":"1;31","bold_green":"1;32","bold_brown":"1;33","bold_dark_blue":"1;34","bold_dark_purple":"1;35","bold_dark_cyan":"1;36","bold_gray":"1;37","bold_dark_gray":"1;90","bold_red":"1;91","bold_light_green":"1;92","bold_yellow":"1;93","bold_blue":"1;94","bold_purple":"1;95","bold_cyan":"1;96","bold_white":"1;97","italic_black":"3;30","italic_dark_red":"3;31","italic_green":"3;32","italic_brown":"3;33","italic_dark_blue":"3;34","italic_dark_purple":"3;35","italic_dark_cyan":"3;36","italic_gray":"3;37","italic_dark_gray":"3;90","italic_red":"3;91","italic_light_green":"3;92","italic_yellow":"3;93","italic_blue":"3;94","italic_purple":"3;95","italic_cyan":"3;96","italic_white":"3;97","underline_black":"4;30","underline_dark_red":"4;31","underline_green":"4;32","underline_brown":"4;33","underline_dark_blue":"4;34","underline_dark_purple":"4;35","underline_dark_cyan":"4;36","underline_gray":"4;37","underline_dark_gray":"4;90","underline_red":"4;91","underline_light_green":"4;92","underline_yellow":"4;93","underline_blue":"4;94","underline_purple":"4;95","underline_cyan":"4;96","underline_white":"4;97","bg_black":"0;40","bg_dark_red":"0;41","bg_green":"0;42","bg_brown":"0;43","bg_dark_blue":"0;44","bg_dark_purple":"0;45","bg_dark_cyan":"0;46","bg_gray":"0;47","bg_dark_gray":"0;100","bg_red":"0;101","bg_light_green":"0;102","bg_yellow":"0;103","bg_blue":"0;104","bg_purple":"0;105","bg_cyan":"0;106","bg_white":"0;107","bg_italic_black":"3;40","bg_italic_dark_red":"3;41","bg_italic_green":"3;42","bg_italic_brown":"3;43","bg_italic_dark_blue":"3;44","bg_italic_dark_purple":"3;45","bg_italic_dark_cyan":"3;46","bg_italic_gray":"3;47","bg_italic_dark_gray":"3;100","bg_italic_red":"3;101","bg_italic_light_green":"3;102","bg_italic_yellow":"3;103","bg_italic_blue":"3;104","bg_italic_purple":"3;105","bg_italic_cyan":"3;106","bg_italic_white":"3;107","bg_underline_black":"4;40","bg_underline_dark_red":"4;41","bg_underline_green":"4;42","bg_underline_brown":"4;43","bg_underline_dark_blue":"4;44","bg_underline_dark_purple":"4;45","bg_underline_dark_cyan":"4;46","bg_underline_gray":"4;47","bg_underline_dark_gray":"4;100","bg_underline_red":"4;101","bg_underline_light_green":"4;102","bg_underline_yellow":"4;103","bg_underline_blue":"4;104","bg_underline_purple":"4;105","bg_underline_cyan":"4;106","bg_underline_white":"4;107"});
};
Runtime.Providers.OutputProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Providers.OutputProvider.prototype.constructor = Runtime.Providers.OutputProvider;
Object.assign(Runtime.Providers.OutputProvider.prototype,
{
	/**
	 * Print message to output
	 */
	print: function(message, new_line, type)
	{
		if (new_line == undefined) new_line = true;
		if (type == undefined) type = "";
		if (!Runtime.rtl.isString(message))
		{
			throw new Runtime.Exceptions.RuntimeException("print message must be string")
		}
		console.log(message);
	},
	/**
	 * Print error
	 */
	print_error: function(message)
	{
		let text_color = "dark_red";
		let isNode = false;
		if (message instanceof Error)
		{
			let color = this.getColor(text_color);
			let char_27 = String.fromCharCode(27);
			
			if (isNode)
			{
				this.print(char_27 + "[" + color + "m", false, "err");
				this.print(message.stack, false, "err");
				this.print(char_27 + "[0m", true, "err");
			}
			else
			{
				let s = char_27 + "[" + color + "m" + message.stack + char_27 + "[0m";
				this.print(s, true, "err");
			}
		}
		
		else
		{
			this.print(this.color(text_color, message), true, "err");
		}
	},
	/**
	 * Format text by color
	 */
	color: function(color, message)
	{
		color = this.getColor(color);
		message = Runtime.rs.chr(27) + Runtime.rtl.toStr("[") + Runtime.rtl.toStr(color) + Runtime.rtl.toStr("m") + Runtime.rtl.toStr(message);
		message = message + Runtime.rtl.toStr(Runtime.rs.chr(27)) + Runtime.rtl.toStr("[0m");
		return message;
	},
	/**
	 * Returns bash console code
	 */
	getColor: function(color)
	{
		var color = Runtime.rs.strtolower(color);
		if (this.color_table.has(color))
		{
			return Runtime.rtl.get(this.color_table, color);
		}
		if (Runtime.rs.strlen(color) > 5)
		{
			return "0";
		}
		return color;
	},
});
Object.assign(Runtime.Providers.OutputProvider, Runtime.BaseProvider);
Object.assign(Runtime.Providers.OutputProvider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Providers";
	},
	getClassName: function()
	{
		return "Runtime.Providers.OutputProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"print",
			"print_error",
			"color",
			"getColor",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Providers.OutputProvider);
window["Runtime.Providers.OutputProvider"] = Runtime.Providers.OutputProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Providers.OutputProvider;
