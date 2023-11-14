"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.Caret = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.Caret.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.Caret.prototype.constructor = Bayrell.Lang.Caret;
Object.assign(Bayrell.Lang.Caret.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.pos = 0;
		this.x = 0;
		this.y = 0;
	},
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.Caret)
		{
			this.pos = o.pos;
			this.x = o.x;
			this.y = o.y;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "pos")this.pos = v;
		else if (k == "x")this.x = v;
		else if (k == "y")this.y = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "pos")return this.pos;
		else if (k == "x")return this.x;
		else if (k == "y")return this.y;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.Caret, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.Caret,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Caret";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("pos");
		a.push("x");
		a.push("y");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "pos") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "x") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "y") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.Caret);
window["Bayrell.Lang.Caret"] = Bayrell.Lang.Caret;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.Caret;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.CoreParser = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.CoreParser.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.CoreParser.prototype.constructor = Bayrell.Lang.CoreParser;
Object.assign(Bayrell.Lang.CoreParser.prototype,
{
	/**
	 * Returns true if eof
	 */
	isEof: function()
	{
		return this.caret.pos >= this.content_sz;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.tab_size = 4;
		this.file_name = "";
		this.content = null;
		this.content_sz = 0;
		this.caret = null;
		this.find_ident = true;
	},
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.CoreParser)
		{
			this.tab_size = o.tab_size;
			this.file_name = o.file_name;
			this.content = o.content;
			this.content_sz = o.content_sz;
			this.caret = o.caret;
			this.find_ident = o.find_ident;
		}
		Runtime.BaseStruct.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "tab_size")this.tab_size = v;
		else if (k == "file_name")this.file_name = v;
		else if (k == "content")this.content = v;
		else if (k == "content_sz")this.content_sz = v;
		else if (k == "caret")this.caret = v;
		else if (k == "find_ident")this.find_ident = v;
		else Runtime.BaseStruct.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "tab_size")return this.tab_size;
		else if (k == "file_name")return this.file_name;
		else if (k == "content")return this.content;
		else if (k == "content_sz")return this.content_sz;
		else if (k == "caret")return this.caret;
		else if (k == "find_ident")return this.find_ident;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.CoreParser, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.CoreParser,
{
	/**
	 * Reset parser
	 */
	reset: function(parser)
	{
		return parser.copy(Runtime.Dict.from({"caret":new Bayrell.Lang.Caret(Runtime.Dict.from({})),"token":null}));
	},
	/**
	 * Set content
	 */
	setContent: function(parser, content)
	{
		return parser.copy(Runtime.Dict.from({"content":new Runtime.Reference(content),"content_sz":Runtime.rs.strlen(content)}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(parser, content)
	{
		parser = this.reset(parser);
		parser = this.setContent(parser, content);
		while (parser.caret.pos < parser.content_sz)
		{
			parser = parser.constructor.nextToken(parser);
		}
		return parser;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.CoreParser";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("tab_size");
		a.push("file_name");
		a.push("content");
		a.push("content_sz");
		a.push("caret");
		a.push("find_ident");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "tab_size") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "file_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return Dict.from({
			"t": "Runtime.Reference",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content_sz") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret") return Dict.from({
			"t": "Bayrell.Lang.Caret",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "find_ident") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isEof",
			"reset",
			"setContent",
			"parse",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.CoreParser);
window["Bayrell.Lang.CoreParser"] = Bayrell.Lang.CoreParser;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.CoreParser;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.CoreToken = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.CoreToken.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.CoreToken.prototype.constructor = Bayrell.Lang.CoreToken;
Object.assign(Bayrell.Lang.CoreToken.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.kind = "";
		this.content = "";
		this.caret_start = null;
		this.caret_end = null;
		this.eof = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "kind")return this.kind;
		else if (k == "content")return this.content;
		else if (k == "caret_start")return this.caret_start;
		else if (k == "caret_end")return this.caret_end;
		else if (k == "eof")return this.eof;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.CoreToken, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.CoreToken,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.CoreToken";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("kind");
		a.push("content");
		a.push("caret_start");
		a.push("caret_end");
		a.push("eof");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret_start") return Dict.from({
			"t": "Bayrell.Lang.Caret",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret_end") return Dict.from({
			"t": "Bayrell.Lang.Caret",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "eof") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.CoreToken);
window["Bayrell.Lang.CoreToken"] = Bayrell.Lang.CoreToken;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.CoreToken;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.CoreTranslator = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.CoreTranslator.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.CoreTranslator.prototype.constructor = Bayrell.Lang.CoreTranslator;
Object.assign(Bayrell.Lang.CoreTranslator.prototype,
{
	/**
	 * Find save op code
	 */
	findSaveOpCode: function(op_code)
	{
		return this.save_op_codes.findItem(Runtime.lib.equalAttr("op_code", op_code));
	},
	/**
	 * Increment indent level
	 */
	levelInc: function()
	{
		return this.copy(Runtime.Dict.from({"indent_level":this.indent_level + 1}));
	},
	/**
	 * Decrease indent level
	 */
	levelDec: function()
	{
		return this.copy(Runtime.Dict.from({"indent_level":this.indent_level - 1}));
	},
	/**
	 * Output content with indent
	 */
	s: function(s, content)
	{
		if (content == undefined) content = null;
		if (s == "")
		{
			return "";
		}
		if (content === "")
		{
			return s;
		}
		return this.crlf + Runtime.rtl.toStr(Runtime.rs.str_repeat(this.indent, this.indent_level)) + Runtime.rtl.toStr(s);
	},
	/**
	 * Output content with indent
	 */
	s2: function(s)
	{
		return this.crlf + Runtime.rtl.toStr(Runtime.rs.str_repeat(this.indent, this.indent_level)) + Runtime.rtl.toStr(s);
	},
	/**
	 * Output content with opcode level
	 */
	o: function(s, opcode_level_in, opcode_level_out)
	{
		if (opcode_level_in < opcode_level_out)
		{
			return "(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
		}
		return s;
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.current_namespace_name = "";
		this.current_class_name = "";
		this.current_class_full_name = "";
		this.current_class_extends_name = "";
		this.current_class = null;
		this.current_function = null;
		this.modules = null;
		this.vars = null;
		this.save_vars = null;
		this.save_op_codes = null;
		this.save_op_code_inc = 0;
		this.is_static_function = false;
		this.is_operation = false;
		this.opcode_level = 0;
		this.indent_level = 0;
		this.indent = "\t";
		this.crlf = "\n";
		this.flag_struct_check_types = false;
		this.preprocessor_flags = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "current_namespace_name")return this.current_namespace_name;
		else if (k == "current_class_name")return this.current_class_name;
		else if (k == "current_class_full_name")return this.current_class_full_name;
		else if (k == "current_class_extends_name")return this.current_class_extends_name;
		else if (k == "current_class")return this.current_class;
		else if (k == "current_function")return this.current_function;
		else if (k == "modules")return this.modules;
		else if (k == "vars")return this.vars;
		else if (k == "save_vars")return this.save_vars;
		else if (k == "save_op_codes")return this.save_op_codes;
		else if (k == "save_op_code_inc")return this.save_op_code_inc;
		else if (k == "is_static_function")return this.is_static_function;
		else if (k == "is_operation")return this.is_operation;
		else if (k == "opcode_level")return this.opcode_level;
		else if (k == "indent_level")return this.indent_level;
		else if (k == "indent")return this.indent;
		else if (k == "crlf")return this.crlf;
		else if (k == "flag_struct_check_types")return this.flag_struct_check_types;
		else if (k == "preprocessor_flags")return this.preprocessor_flags;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.CoreTranslator, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.CoreTranslator,
{
	/**
	 * Translate BaseOpCode
	 */
	translate: function(t, op_code)
	{
		return "";
	},
	/**
	 * Inc save op code
	 */
	nextSaveOpCode: function(t)
	{
		return "__v" + Runtime.rtl.toStr(t.save_op_code_inc);
	},
	/**
	 * Inc save op code
	 */
	incSaveOpCode: function(t)
	{
		var var_name = this.nextSaveOpCode(t);
		var save_op_code_inc = t.save_op_code_inc + 1;
		t = t.copy(Runtime.Dict.from({"save_op_code_inc":save_op_code_inc}));
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Add save op code
	 */
	addSaveOpCode: function(t, data)
	{
		var var_name = data.get("var_name", "");
		var content = data.get("content", "");
		var var_content = data.get("var_content", "");
		var save_op_code_inc = t.save_op_code_inc;
		if (var_name == "" && content == "")
		{
			var_name = this.nextSaveOpCode(t);
			data = data.setIm("var_name", var_name);
			save_op_code_inc += 1;
		}
		var s = new Bayrell.Lang.SaveOpCode(data);
		t = t.copy(Runtime.Dict.from({"save_op_codes":t.save_op_codes.pushIm(s),"save_op_code_inc":save_op_code_inc}));
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Clear save op code
	 */
	clearSaveOpCode: function(t)
	{
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), new Runtime.Collection());
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), 0);
		return t;
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		return "";
	},
	/**
	 * Call f and return result with save op codes
	 */
	saveOpCodeCall: function(t, f, args)
	{
		/* Clear save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		var res = Runtime.rtl.apply(f, args.unshiftIm(t));
		t = Runtime.rtl.get(res, 0);
		var value = Runtime.rtl.get(res, 1);
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		return Runtime.Collection.from([t,save,value]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("current_namespace_name");
		a.push("current_class_name");
		a.push("current_class_full_name");
		a.push("current_class_extends_name");
		a.push("current_class");
		a.push("current_function");
		a.push("modules");
		a.push("vars");
		a.push("save_vars");
		a.push("save_op_codes");
		a.push("save_op_code_inc");
		a.push("is_static_function");
		a.push("is_operation");
		a.push("opcode_level");
		a.push("indent_level");
		a.push("indent");
		a.push("crlf");
		a.push("flag_struct_check_types");
		a.push("preprocessor_flags");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "current_namespace_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_full_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_extends_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_function") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vars") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["bool"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_vars") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_op_codes") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.SaveOpCode"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_op_code_inc") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_static_function") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_operation") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "opcode_level") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "indent_level") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "indent") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "crlf") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flag_struct_check_types") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "preprocessor_flags") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["bool"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"findSaveOpCode",
			"levelInc",
			"levelDec",
			"s",
			"s2",
			"o",
			"translate",
			"nextSaveOpCode",
			"incSaveOpCode",
			"addSaveOpCode",
			"clearSaveOpCode",
			"outputSaveOpCode",
			"saveOpCodeCall",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.CoreTranslator);
window["Bayrell.Lang.CoreTranslator"] = Bayrell.Lang.CoreTranslator;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.CoreTranslator;
"use strict;"
/*!
 *  Bayrell Parser Library.  
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.LangConstant = function()
{
};
Object.assign(Bayrell.Lang.LangConstant.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangConstant)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangConstant,
{
	ERROR_PARSER: -1000,
	ERROR_PARSER_EOF: -1001,
	ERROR_PARSER_EXPECTED: -1002,
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangConstant";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangConstant);
window["Bayrell.Lang.LangConstant"] = Bayrell.Lang.LangConstant;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangConstant;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.LangUtils = function()
{
};
Object.assign(Bayrell.Lang.LangUtils.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangUtils)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangUtils,
{
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(parser, text)
	{
		var res = parser.constructor.parse(parser, text);
		return Runtime.rtl.get(res, 1);
	},
	/**
	 * Translate BaseOpCode to string
	 */
	translate: function(translator, op_code)
	{
		var res = translator.constructor.translate(translator, op_code);
		return Runtime.rtl.get(res, 1);
	},
	/**
	 * Create translator
	 */
	createTranslator: function(lang)
	{
		if (lang == undefined) lang = "";
		var t = null;
		if (lang == "php")
		{
			t = new Bayrell.Lang.LangPHP.TranslatorPHP();
		}
		if (lang == "es6")
		{
			t = new Bayrell.Lang.LangES6.TranslatorES6();
		}
		if (lang == "nodejs")
		{
			t = new Bayrell.Lang.LangNode.TranslatorNode();
		}
		return t;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangUtils";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"parse",
			"translate",
			"createTranslator",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangUtils);
window["Bayrell.Lang.LangUtils"] = Bayrell.Lang.LangUtils;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangUtils;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.SaveOpCode = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.SaveOpCode.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.SaveOpCode.prototype.constructor = Bayrell.Lang.SaveOpCode;
Object.assign(Bayrell.Lang.SaveOpCode.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.var_name = "";
		this.var_content = "";
		this.content = "";
		this.op_code = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "var_name")return this.var_name;
		else if (k == "var_content")return this.var_content;
		else if (k == "content")return this.content;
		else if (k == "op_code")return this.op_code;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.SaveOpCode, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.SaveOpCode,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.SaveOpCode";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("var_name");
		a.push("var_content");
		a.push("content");
		a.push("op_code");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "var_content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op_code") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.SaveOpCode);
window["Bayrell.Lang.SaveOpCode"] = Bayrell.Lang.SaveOpCode;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.SaveOpCode;
"use strict;"
/*!
 *  Bayrell Parser Library.
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.Exceptions == 'undefined') Bayrell.Lang.Exceptions = {};
Bayrell.Lang.Exceptions.ParserUnknownError = function(s, code, context, prev)
{
	if (prev == undefined) prev = null;
	if (code == -1)
	{
		code = Bayrell.Lang.LangConstant.ERROR_PARSER;
	}
	Runtime.Exceptions.RuntimeException.call(this, s, code, context, prev);
};
Bayrell.Lang.Exceptions.ParserUnknownError.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Bayrell.Lang.Exceptions.ParserUnknownError.prototype.constructor = Bayrell.Lang.Exceptions.ParserUnknownError;
Object.assign(Bayrell.Lang.Exceptions.ParserUnknownError.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.Exceptions.ParserUnknownError)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserUnknownError, Runtime.Exceptions.RuntimeException);
Object.assign(Bayrell.Lang.Exceptions.ParserUnknownError,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserUnknownError";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.Exceptions.ParserUnknownError);
window["Bayrell.Lang.Exceptions.ParserUnknownError"] = Bayrell.Lang.Exceptions.ParserUnknownError;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.Exceptions.ParserUnknownError;
"use strict;"
/*!
 *  Bayrell Parser Library.
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.Exceptions == 'undefined') Bayrell.Lang.Exceptions = {};
Bayrell.Lang.Exceptions.ParserError = function(s, caret, file, code, context, prev)
{
	if (file == undefined) file = "";
	if (prev == undefined) prev = null;
	Bayrell.Lang.Exceptions.ParserUnknownError.call(this, s, code, context, prev);
	this.error_line = caret.y + 1;
	this.error_pos = caret.x + 1;
	this.error_file = file;
};
Bayrell.Lang.Exceptions.ParserError.prototype = Object.create(Bayrell.Lang.Exceptions.ParserUnknownError.prototype);
Bayrell.Lang.Exceptions.ParserError.prototype.constructor = Bayrell.Lang.Exceptions.ParserError;
Object.assign(Bayrell.Lang.Exceptions.ParserError.prototype,
{
	buildMessage: function()
	{
		var error_str = this.error_str;
		var file = this.getFileName();
		var line = this.getErrorLine();
		var pos = this.getErrorPos();
		if (line != -1)
		{
			error_str += Runtime.rtl.toStr(" at Ln:" + Runtime.rtl.toStr(line) + Runtime.rtl.toStr(((pos != "") ? (", Pos:" + Runtime.rtl.toStr(pos)) : (""))));
		}
		if (file != "")
		{
			error_str += Runtime.rtl.toStr(" in file:'" + Runtime.rtl.toStr(file) + Runtime.rtl.toStr("'"));
		}
		return error_str;
	},
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.Exceptions.ParserError)
		{
		}
		Bayrell.Lang.Exceptions.ParserUnknownError.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Bayrell.Lang.Exceptions.ParserUnknownError.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Bayrell.Lang.Exceptions.ParserUnknownError.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserError, Bayrell.Lang.Exceptions.ParserUnknownError);
Object.assign(Bayrell.Lang.Exceptions.ParserError,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserError";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserUnknownError";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
			"buildMessage",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.Exceptions.ParserError);
window["Bayrell.Lang.Exceptions.ParserError"] = Bayrell.Lang.Exceptions.ParserError;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.Exceptions.ParserError;
"use strict;"
/*!
 *  Bayrell Parser Library.
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.Exceptions == 'undefined') Bayrell.Lang.Exceptions = {};
Bayrell.Lang.Exceptions.ParserEOF = function(context, prev)
{
	if (prev == undefined) prev = null;
	Bayrell.Lang.Exceptions.ParserUnknownError.call(this, "ERROR_PARSER_EOF", Bayrell.Lang.LangConstant.ERROR_PARSER_EOF, context, prev);
};
Bayrell.Lang.Exceptions.ParserEOF.prototype = Object.create(Bayrell.Lang.Exceptions.ParserUnknownError.prototype);
Bayrell.Lang.Exceptions.ParserEOF.prototype.constructor = Bayrell.Lang.Exceptions.ParserEOF;
Object.assign(Bayrell.Lang.Exceptions.ParserEOF.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.Exceptions.ParserEOF)
		{
		}
		Bayrell.Lang.Exceptions.ParserUnknownError.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Bayrell.Lang.Exceptions.ParserUnknownError.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Bayrell.Lang.Exceptions.ParserUnknownError.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserEOF, Bayrell.Lang.Exceptions.ParserUnknownError);
Object.assign(Bayrell.Lang.Exceptions.ParserEOF,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserEOF";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserUnknownError";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.Exceptions.ParserEOF);
window["Bayrell.Lang.Exceptions.ParserEOF"] = Bayrell.Lang.Exceptions.ParserEOF;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.Exceptions.ParserEOF;
"use strict;"
/*!
 *  Bayrell Parser Library.
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.Exceptions == 'undefined') Bayrell.Lang.Exceptions = {};
Bayrell.Lang.Exceptions.ParserExpected = function(s, caret, file, context, prev)
{
	if (file == undefined) file = "";
	if (prev == undefined) prev = null;
	Bayrell.Lang.Exceptions.ParserError.call(this, s + Runtime.rtl.toStr(" expected"), caret, file, Bayrell.Lang.LangConstant.ERROR_PARSER_EXPECTED, context, prev);
};
Bayrell.Lang.Exceptions.ParserExpected.prototype = Object.create(Bayrell.Lang.Exceptions.ParserError.prototype);
Bayrell.Lang.Exceptions.ParserExpected.prototype.constructor = Bayrell.Lang.Exceptions.ParserExpected;
Object.assign(Bayrell.Lang.Exceptions.ParserExpected.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.Exceptions.ParserExpected)
		{
		}
		Bayrell.Lang.Exceptions.ParserError.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Bayrell.Lang.Exceptions.ParserError.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Bayrell.Lang.Exceptions.ParserError.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserExpected, Bayrell.Lang.Exceptions.ParserError);
Object.assign(Bayrell.Lang.Exceptions.ParserExpected,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserExpected";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserError";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.Exceptions.ParserExpected);
window["Bayrell.Lang.Exceptions.ParserExpected"] = Bayrell.Lang.Exceptions.ParserExpected;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.Exceptions.ParserExpected;
"use strict;"
/*!
 *  Bayrell Parser Library.
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.Exceptions == 'undefined') Bayrell.Lang.Exceptions = {};
Bayrell.Lang.Exceptions.DeclaredClass = function(prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.RuntimeException.call(this, "Declared class", -1, prev);
};
Bayrell.Lang.Exceptions.DeclaredClass.prototype = Object.create(Runtime.Exceptions.RuntimeException.prototype);
Bayrell.Lang.Exceptions.DeclaredClass.prototype.constructor = Bayrell.Lang.Exceptions.DeclaredClass;
Object.assign(Bayrell.Lang.Exceptions.DeclaredClass.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.Exceptions.DeclaredClass)
		{
		}
		Runtime.Exceptions.RuntimeException.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.Exceptions.RuntimeException.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.Exceptions.RuntimeException.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.Exceptions.DeclaredClass, Runtime.Exceptions.RuntimeException);
Object.assign(Bayrell.Lang.Exceptions.DeclaredClass,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Exceptions.DeclaredClass";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"constructor",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.Exceptions.DeclaredClass);
window["Bayrell.Lang.Exceptions.DeclaredClass"] = Bayrell.Lang.Exceptions.DeclaredClass;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.Exceptions.DeclaredClass;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBay = function()
{
	Bayrell.Lang.CoreParser.apply(this, arguments);
};
Bayrell.Lang.LangBay.ParserBay.prototype = Object.create(Bayrell.Lang.CoreParser.prototype);
Bayrell.Lang.LangBay.ParserBay.prototype.constructor = Bayrell.Lang.LangBay.ParserBay;
Object.assign(Bayrell.Lang.LangBay.ParserBay.prototype,
{
	_init: function()
	{
		Bayrell.Lang.CoreParser.prototype._init.call(this);
		this.vars = null;
		this.uses = null;
		this.current_namespace = null;
		this.current_class = null;
		this.current_namespace_name = "";
		this.current_class_name = "";
		this.current_class_kind = "";
		this.current_class_abstract = false;
		this.current_class_declare = false;
		this.find_identifier = true;
		this.skip_comments = true;
		this.pipe_kind = "";
		this.is_pipe = false;
		this.is_html = false;
		this.is_local_css = false;
		this.parser_base = null;
		this.parser_expression = null;
		this.parser_html = null;
		this.parser_operator = null;
		this.parser_preprocessor = null;
		this.parser_program = null;
	},
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBay)
		{
			this.vars = o.vars;
			this.uses = o.uses;
			this.current_namespace = o.current_namespace;
			this.current_class = o.current_class;
			this.current_namespace_name = o.current_namespace_name;
			this.current_class_name = o.current_class_name;
			this.current_class_kind = o.current_class_kind;
			this.current_class_abstract = o.current_class_abstract;
			this.current_class_declare = o.current_class_declare;
			this.find_identifier = o.find_identifier;
			this.skip_comments = o.skip_comments;
			this.pipe_kind = o.pipe_kind;
			this.is_pipe = o.is_pipe;
			this.is_html = o.is_html;
			this.is_local_css = o.is_local_css;
			this.parser_base = o.parser_base;
			this.parser_expression = o.parser_expression;
			this.parser_html = o.parser_html;
			this.parser_operator = o.parser_operator;
			this.parser_preprocessor = o.parser_preprocessor;
			this.parser_program = o.parser_program;
		}
		Bayrell.Lang.CoreParser.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "vars")this.vars = v;
		else if (k == "uses")this.uses = v;
		else if (k == "current_namespace")this.current_namespace = v;
		else if (k == "current_class")this.current_class = v;
		else if (k == "current_namespace_name")this.current_namespace_name = v;
		else if (k == "current_class_name")this.current_class_name = v;
		else if (k == "current_class_kind")this.current_class_kind = v;
		else if (k == "current_class_abstract")this.current_class_abstract = v;
		else if (k == "current_class_declare")this.current_class_declare = v;
		else if (k == "find_identifier")this.find_identifier = v;
		else if (k == "skip_comments")this.skip_comments = v;
		else if (k == "pipe_kind")this.pipe_kind = v;
		else if (k == "is_pipe")this.is_pipe = v;
		else if (k == "is_html")this.is_html = v;
		else if (k == "is_local_css")this.is_local_css = v;
		else if (k == "parser_base")this.parser_base = v;
		else if (k == "parser_expression")this.parser_expression = v;
		else if (k == "parser_html")this.parser_html = v;
		else if (k == "parser_operator")this.parser_operator = v;
		else if (k == "parser_preprocessor")this.parser_preprocessor = v;
		else if (k == "parser_program")this.parser_program = v;
		else Bayrell.Lang.CoreParser.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "vars")return this.vars;
		else if (k == "uses")return this.uses;
		else if (k == "current_namespace")return this.current_namespace;
		else if (k == "current_class")return this.current_class;
		else if (k == "current_namespace_name")return this.current_namespace_name;
		else if (k == "current_class_name")return this.current_class_name;
		else if (k == "current_class_kind")return this.current_class_kind;
		else if (k == "current_class_abstract")return this.current_class_abstract;
		else if (k == "current_class_declare")return this.current_class_declare;
		else if (k == "find_identifier")return this.find_identifier;
		else if (k == "skip_comments")return this.skip_comments;
		else if (k == "pipe_kind")return this.pipe_kind;
		else if (k == "is_pipe")return this.is_pipe;
		else if (k == "is_html")return this.is_html;
		else if (k == "is_local_css")return this.is_local_css;
		else if (k == "parser_base")return this.parser_base;
		else if (k == "parser_expression")return this.parser_expression;
		else if (k == "parser_html")return this.parser_html;
		else if (k == "parser_operator")return this.parser_operator;
		else if (k == "parser_preprocessor")return this.parser_preprocessor;
		else if (k == "parser_program")return this.parser_program;
		return Bayrell.Lang.CoreParser.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBay, Bayrell.Lang.CoreParser);
Object.assign(Bayrell.Lang.LangBay.ParserBay,
{
	/**
	 * Reset parser
	 */
	reset: function(parser)
	{
		return parser.copy(Runtime.Dict.from({"vars":new Runtime.Dict(),"uses":new Runtime.Dict(),"caret":new Bayrell.Lang.Caret(Runtime.Dict.from({})),"token":null,"parser_base":new Bayrell.Lang.LangBay.ParserBayBase(),"parser_expression":new Bayrell.Lang.LangBay.ParserBayExpression(),"parser_html":new Bayrell.Lang.LangBay.ParserBayHtml(),"parser_operator":new Bayrell.Lang.LangBay.ParserBayOperator(),"parser_preprocessor":new Bayrell.Lang.LangBay.ParserBayPreprocessor(),"parser_program":new Bayrell.Lang.LangBay.ParserBayProgram()}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(parser, content)
	{
		parser = this.reset(parser);
		parser = this.setContent(parser, content);
		return parser.parser_program.constructor.readProgram(parser);
	},
	/**
	 * Find module name
	 */
	findModuleName: function(parser, module_name)
	{
		if (module_name == "Collection")
		{
			return "Runtime.Collection";
		}
		else if (module_name == "Dict")
		{
			return "Runtime.Dict";
		}
		else if (module_name == "Map")
		{
			return "Runtime.Map";
		}
		else if (module_name == "Vector")
		{
			return "Runtime.Vector";
		}
		else if (module_name == "rs")
		{
			return "Runtime.rs";
		}
		else if (module_name == "rtl")
		{
			return "Runtime.rtl";
		}
		else if (module_name == "ArrayInterface")
		{
			return "";
		}
		else if (parser.uses.has(module_name))
		{
			return parser.uses.item(module_name);
		}
		return module_name;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBay";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreParser";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("vars");
		a.push("uses");
		a.push("current_namespace");
		a.push("current_class");
		a.push("current_namespace_name");
		a.push("current_class_name");
		a.push("current_class_kind");
		a.push("current_class_abstract");
		a.push("current_class_declare");
		a.push("find_identifier");
		a.push("skip_comments");
		a.push("pipe_kind");
		a.push("is_pipe");
		a.push("is_html");
		a.push("is_local_css");
		a.push("parser_base");
		a.push("parser_expression");
		a.push("parser_html");
		a.push("parser_operator");
		a.push("parser_preprocessor");
		a.push("parser_program");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "vars") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["bool"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "uses") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_namespace") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpNamespace",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpDeclareClass",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_namespace_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_abstract") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_declare") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "find_identifier") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "skip_comments") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pipe_kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_pipe") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_local_css") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_base") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayBase",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_expression") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayExpression",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_html") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayHtml",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_operator") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayOperator",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_preprocessor") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayPreprocessor",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "parser_program") return Dict.from({
			"t": "Bayrell.Lang.LangBay.ParserBayProgram",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"reset",
			"parse",
			"findModuleName",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBay);
window["Bayrell.Lang.LangBay.ParserBay"] = Bayrell.Lang.LangBay.ParserBay;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangBay.ParserBay;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayBase = function()
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayBase.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayBase)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayBase,
{
	/**
	 * Return true if is char
	 * @param char ch
	 * @return boolean
	 */
	isChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos("qazwsxedcrfvtgbyhnujmikolp", Runtime.rs.strtolower(ch)) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	isNumber: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos("0123456789", ch) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isHexChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos("0123456789abcdef", Runtime.rs.strtolower(ch)) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	isStringOfNumbers: function(s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var sz = Runtime.rs.strlen(s);
		for (var i = 0;i < sz;i++)
		{
			if (!this.isNumber(Runtime.rs.charAt(s, i)))
			{
				var __memorize_value = false;
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = true;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Is system type
	 */
	isSystemType: function(name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (name == "var")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "void")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "bool")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "byte")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "int")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "double")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "float")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "char")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "string")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "list")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "scalar")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "primitive")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "html")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Error")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Object")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "DateTime")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Collection")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Dict")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Vector")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Map")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rs")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rtl")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "ArrayInterface")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if name is identifier
	 */
	isIdentifier: function(name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (name == "")
		{
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "@")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		if (this.isNumber(Runtime.rs.charAt(name, 0)))
		{
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var sz = Runtime.rs.strlen(name);
		for (var i = 0;i < sz;i++)
		{
			var ch = Runtime.rs.charAt(name, i);
			if (this.isChar(ch) || this.isNumber(ch) || ch == "_")
			{
				continue;
			}
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = true;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if reserved words
	 */
	isReserved: function(name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (name == "__async_t")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "__async_var")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		/*if (name == "__ctx") return true;*/
		/*if (name == "ctx") return true;*/
		if (Runtime.rs.substr(name, 0, 3) == "__v")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns kind of identifier or thrown Error
	 */
	findIdentifier: function(parser, name, caret)
	{
		var kind = "";
		if (parser.vars.has(name))
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE;
		}
		else if (parser.uses.has(name))
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASS;
		}
		else if (this.isSystemType(name))
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE;
		}
		else if (name == "log")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_FUNCTION;
		}
		else if (name == "window" || name == "document")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE;
		}
		else if (name == "null" || name == "true" || name == "false")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONSTANT;
		}
		else if (name == "fn")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_FUNCTION;
		}
		else if (name == "@" || name == "_")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT;
		}
		else if (name == "static" || name == "self" || name == "this" || name == "parent")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF;
		}
		return kind;
	},
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_", Runtime.rs.strtolower(ch)) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar: function(ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (Runtime.rs.ord(ch) <= 32)
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns next X
	 */
	nextX: function(parser, ch, x, direction)
	{
		if (direction == undefined) direction = 1;
		if (ch == "\t")
		{
			return x + parser.tab_size * direction;
		}
		if (ch == "\n")
		{
			return 0;
		}
		return x + direction;
	},
	/**
	 * Returns next Y
	 */
	nextY: function(parser, ch, y, direction)
	{
		if (direction == undefined) direction = 1;
		if (ch == "\n")
		{
			return y + direction;
		}
		return y;
	},
	/**
	 * Returns next
	 */
	next: function(parser, s, x, y, pos)
	{
		var sz = Runtime.rs.strlen(s);
		for (var i = 0;i < sz;i++)
		{
			var ch = Runtime.rs.substr(s, i, 1);
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
		}
		return Runtime.Collection.from([x,y,pos]);
	},
	/**
	 * Open comment
	 */
	isCommentOpen: function(parser, str)
	{
		return parser.skip_comments && ((parser.is_html) ? (str == "<!--") : (str == "/*"));
	},
	/**
	 * Close comment
	 */
	isCommentClose: function(parser, str)
	{
		return (parser.is_html) ? (str == "-->") : (str == "*/");
	},
	/**
	 * Skip char
	 */
	skipChar: function(parser, content, start_pos)
	{
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		var skip_comments = parser.skip_comments;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new Bayrell.Lang.Exceptions.ParserEOF()
		}
		var ch = Runtime.rs.charAt(content.ref, pos);
		var ch2 = Runtime.rs.substr(content.ref, pos, 2);
		var ch4 = Runtime.rs.substr(content.ref, pos, 4);
		while ((this.isSkipChar(ch) || this.isCommentOpen(parser, ch2) || this.isCommentOpen(parser, ch4)) && pos < parser.content_sz)
		{
			if (this.isCommentOpen(parser, ch2))
			{
				ch2 = Runtime.rs.substr(content.ref, pos, 2);
				while (!this.isCommentClose(parser, ch2) && pos < parser.content_sz)
				{
					x = this.nextX(parser, ch, x);
					y = this.nextY(parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					ch = Runtime.rs.charAt(content.ref, pos);
					ch2 = Runtime.rs.substr(content.ref, pos, 2);
				}
				if (this.isCommentClose(parser, ch2))
				{
					x = x + 2;
					pos = pos + 2;
				}
			}
			else if (this.isCommentOpen(parser, ch4))
			{
				var ch3 = Runtime.rs.substr(content.ref, pos, 3);
				while (!this.isCommentClose(parser, ch3) && pos < parser.content_sz)
				{
					x = this.nextX(parser, ch, x);
					y = this.nextY(parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					ch = Runtime.rs.charAt(content.ref, pos);
					ch3 = Runtime.rs.substr(content.ref, pos, 3);
				}
				if (this.isCommentClose(parser, ch3))
				{
					x = x + 3;
					pos = pos + 3;
				}
			}
			else
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= parser.content_sz)
			{
				break;
			}
			ch = Runtime.rs.charAt(content.ref, pos);
			ch2 = Runtime.rs.substr(content.ref, pos, 2);
			ch4 = Runtime.rs.substr(content.ref, pos, 4);
		}
		return new Bayrell.Lang.Caret(Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read special token
	 */
	readSpecialToken: function(parser, content, start_pos)
	{
		var pos = start_pos.pos;
		var s = "";
		s = Runtime.rs.substr(content.ref, pos, 10);
		if (s == "#endswitch")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 7);
		if (s == "#ifcode" || s == "#switch" || s == "#elseif" || s == "%render")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 6);
		if (s == "#endif" || s == "#ifdef" || s == "%while")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 5);
		if (s == "#case" || s == "%else")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 4);
		if (s == "@css" || s == "%for" || s == "%var" || s == "%set")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 3);
		if (s == "!--" || s == "!==" || s == "===" || s == "..." || s == "#if" || s == "%if")
		{
			return s;
		}
		s = Runtime.rs.substr(content.ref, pos, 2);
		if (s == "==" || s == "!=" || s == "<=" || s == ">=" || s == "=>" || s == "->" || s == "|>" || s == "::" || s == "+=" || s == "-=" || s == "~=" || s == "**" || s == "<<" || s == ">>" || s == "++" || s == "--")
		{
			return s;
		}
		return "";
	},
	/**
	 * Read next token and return caret end
	 */
	nextToken: function(parser, content, start_pos)
	{
		var is_first = true;
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new Bayrell.Lang.Exceptions.ParserEOF()
		}
		var s = this.readSpecialToken(parser, content, start_pos);
		if (s != "")
		{
			var sz = Runtime.rs.strlen(s);
			for (var i = 0;i < sz;i++)
			{
				var ch = Runtime.rs.charAt(s, i);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			return new Bayrell.Lang.Caret(Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
		}
		var ch = Runtime.rs.charAt(content.ref, pos);
		if (!this.isTokenChar(ch))
		{
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
		}
		else
		{
			while (this.isTokenChar(ch))
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = Runtime.rs.charAt(content.ref, pos);
			}
		}
		return new Bayrell.Lang.Caret(Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read back
	 */
	readBack: function(parser, search)
	{
		if (search == undefined) search = "";
		var content = parser.content;
		var caret = parser.caret;
		var x = caret.x;
		var y = caret.y;
		var pos = caret.pos;
		var search_sz = Runtime.rs.strlen(search);
		var s = "";
		while (pos >= 0)
		{
			var ch = Runtime.rs.charAt(content.ref, pos);
			x = this.nextX(parser, ch, x, -1);
			y = this.nextY(parser, ch, y, -1);
			pos--;
			s = Runtime.rs.substr(content.ref, pos, search_sz);
			if (s == search)
			{
				break;
			}
		}
		return parser.copy(Runtime.Dict.from({"caret":new Bayrell.Lang.Caret(Runtime.Dict.from({"pos":pos,"x":x,"y":y}))}));
	},
	/**
	 * Read next token
	 */
	readToken: function(parser)
	{
		var caret_start = null;
		var caret_end = null;
		var eof = false;
		try
		{
			caret_start = this.skipChar(parser, parser.content, parser.caret);
			caret_end = this.nextToken(parser, parser.content, caret_start);
		}
		catch (_ex)
		{
			if (_ex instanceof Bayrell.Lang.Exceptions.ParserEOF)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret;
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		return Runtime.Collection.from([parser.copy(Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.CoreToken(Runtime.Dict.from({"content":Runtime.rs.substr(parser.content.ref, caret_start.pos, caret_end.pos - caret_start.pos),"caret_start":caret_start,"caret_end":caret_end,"eof":eof}))]);
	},
	/**
	 * Look next token
	 */
	lookToken: function(parser, token)
	{
		var token_content = "";
		var content = parser.content;
		var caret_start = null;
		var caret_end = null;
		var sz = Runtime.rs.strlen(token);
		var eof = false;
		var find = false;
		try
		{
			caret_start = this.skipChar(parser, content, parser.caret);
			var pos = caret_start.pos;
			var x = caret_start.x;
			var y = caret_start.y;
			token_content = Runtime.rs.substr(content.ref, pos, sz);
			if (token_content == token)
			{
				find = true;
			}
			var res = this.next(parser, token_content, x, y, pos);
			x = Runtime.rtl.get(res, 0);
			y = Runtime.rtl.get(res, 1);
			pos = Runtime.rtl.get(res, 2);
			caret_end = new Bayrell.Lang.Caret(Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
		}
		catch (_ex)
		{
			if (_ex instanceof Bayrell.Lang.Exceptions.ParserEOF)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret;
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		return Runtime.Collection.from([parser.copy(Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.CoreToken(Runtime.Dict.from({"content":token_content,"caret_start":caret_start,"caret_end":caret_end,"eof":eof})),find]);
	},
	/**
	 * Match next token
	 */
	matchToken: function(parser, next_token)
	{
		var token = null;
		/* Look token */
		var res = this.lookToken(parser, next_token);
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var find = Runtime.rtl.get(res, 2);
		if (!find)
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(next_token, token.caret_start, parser.file_name)
		}
		return Runtime.Collection.from([parser,token]);
	},
	/**
	 * Match next string
	 */
	matchString: function(parser, str1)
	{
		var caret = parser.caret;
		var sz = Runtime.rs.strlen(str1);
		var str2 = Runtime.rs.substr(parser.content.ref, caret.pos, sz);
		if (str1 != str2)
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(str1, caret, parser.file_name)
		}
		var res = this.next(parser, str1, caret.x, caret.y, caret.pos);
		caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":Runtime.rtl.get(res, 0),"y":Runtime.rtl.get(res, 1),"pos":Runtime.rtl.get(res, 2)}));
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read number
	 */
	readNumber: function(parser)
	{
		var token = null;
		var start = parser;
		/* Read token */
		var res = this.readToken(parser);
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		if (token.content == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("Number", caret_start, parser.file_name)
		}
		if (!this.isStringOfNumbers(token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("Number", caret_start, parser.file_name)
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpNumber(Runtime.Dict.from({"value":token.content,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read string
	 */
	readUntilStringArr: function(parser, arr, flag_include)
	{
		if (flag_include == undefined) flag_include = true;
		var token = null;
		var look = null;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		/* Search next string in arr */
		var search = (pos) => 
		{
			for (var i = 0;i < arr.count();i++)
			{
				var item = arr.item(i);
				var sz = Runtime.rs.strlen(item);
				var str = Runtime.rs.substr(content.ref, pos, sz);
				if (str == item)
				{
					return i;
				}
			}
			return -1;
		};
		/* Start and end positionss */
		var start_pos = pos;
		var end_pos = pos;
		/* Read string value */
		var ch = "";
		var arr_pos = search(pos);
		while (pos < content_sz && arr_pos == -1)
		{
			ch = Runtime.rs.charAt(content.ref, pos);
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
			if (pos >= content_sz)
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(Runtime.rs.join(",", arr), new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			arr_pos = search(pos);
		}
		if (arr_pos == -1)
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("End of string", new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		if (!flag_include)
		{
			end_pos = pos;
		}
		else
		{
			var item = arr.item(arr_pos);
			var sz = Runtime.rs.strlen(item);
			for (var i = 0;i < sz;i++)
			{
				ch = Runtime.rs.charAt(content.ref, pos);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			end_pos = pos;
		}
		/* Return result */
		var caret_end = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":end_pos}));
		return Runtime.Collection.from([parser.copy(Runtime.Dict.from({"caret":caret_end})),Runtime.rs.substr(content.ref, start_pos, end_pos - start_pos)]);
	},
	/**
	 * Read string
	 */
	readString: function(parser)
	{
		var token = null;
		var look = null;
		/* Read token */
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var str_char = token.content;
		/* Read begin string char */
		if (str_char != "'" && str_char != "\"")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("String", caret_start, parser.file_name)
		}
		var content = look.content;
		var content_sz = look.content_sz;
		var pos = look.caret.pos;
		var x = look.caret.x;
		var y = look.caret.y;
		/* Read string value */
		var value_str = "";
		var ch = Runtime.rs.charAt(content.ref, pos);
		while (pos < content_sz && ch != str_char)
		{
			if (ch == "\\")
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= content_sz)
				{
					throw new Bayrell.Lang.Exceptions.ParserExpected("End of string", new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
				}
				var ch2 = Runtime.rs.charAt(content.ref, pos);
				if (ch2 == "n")
				{
					value_str += Runtime.rtl.toStr("\n");
				}
				else if (ch2 == "r")
				{
					value_str += Runtime.rtl.toStr("\r");
				}
				else if (ch2 == "t")
				{
					value_str += Runtime.rtl.toStr("\t");
				}
				else if (ch2 == "s")
				{
					value_str += Runtime.rtl.toStr(" ");
				}
				else if (ch2 == "\\")
				{
					value_str += Runtime.rtl.toStr("\\");
				}
				else if (ch2 == "'")
				{
					value_str += Runtime.rtl.toStr("'");
				}
				else if (ch2 == "\"")
				{
					value_str += Runtime.rtl.toStr("\"");
				}
				else
				{
					value_str += Runtime.rtl.toStr(ch + Runtime.rtl.toStr(ch2));
				}
				x = this.nextX(parser, ch2, x);
				y = this.nextY(parser, ch2, y);
				pos = pos + 1;
			}
			else
			{
				value_str += Runtime.rtl.toStr(ch);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= content_sz)
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected("End of string", new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			ch = Runtime.rs.charAt(content.ref, pos);
		}
		/* Read end string char */
		if (ch != "'" && ch != "\"")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("End of string", new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		x = this.nextX(parser, ch, x);
		y = this.nextY(parser, ch, y);
		pos = pos + 1;
		/* Return result */
		var caret_end = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		return Runtime.Collection.from([parser.copy(Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.OpCodes.OpString(Runtime.Dict.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
	},
	/**
	 * Read comment
	 */
	readComment: function(parser)
	{
		var start = parser;
		var token = null;
		var look = null;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = Bayrell.Lang.LangBay.ParserBayBase.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		if (token.content == "/")
		{
			parser = look;
			var content = look.content;
			var content_sz = look.content_sz;
			var pos = look.caret.pos;
			var x = look.caret.x;
			var y = look.caret.y;
			var pos_start = pos;
			var ch = Runtime.rs.charAt(content.ref, pos);
			var ch2 = Runtime.rs.substr(content.ref, pos, 2);
			while (!this.isCommentClose(parser, ch2) && pos < content_sz)
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = Runtime.rs.charAt(content.ref, pos);
				ch2 = Runtime.rs.substr(content.ref, pos, 2);
			}
			var pos_end = pos;
			if (this.isCommentClose(parser, ch2))
			{
				x = x + 2;
				pos = pos + 2;
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected("End of comment", new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos})), start.file_name)
			}
			/* Return result */
			var value_str = Runtime.rs.substr(content.ref, pos_start + 1, pos_end - pos_start - 1);
			var caret_end = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
			return Runtime.Collection.from([start.copy(Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.OpCodes.OpComment(Runtime.Dict.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		}
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read identifier
	 */
	readIdentifier: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var start = parser;
		var token = null;
		var look = null;
		var name = "";
		var res = Bayrell.Lang.LangBay.ParserBayBase.readToken(parser);
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("Identifier", token.caret_start, parser.file_name)
		}
		if (!this.isIdentifier(token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("Identifier", token.caret_start, parser.file_name)
		}
		if (this.isReserved(token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("Identifier " + Runtime.rtl.toStr(token.content) + Runtime.rtl.toStr(" is reserverd"), token.caret_start, parser.file_name)
		}
		name = token.content;
		var kind = this.findIdentifier(parser, name, token.caret_start);
		if (parser.find_ident && find_ident && kind == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserError("Unknown identifier '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("'"), token.caret_start, parser.file_name)
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpIdentifier(Runtime.Dict.from({"kind":kind,"value":name,"caret_start":token.caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read entity name
	 */
	readEntityName: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var ident = null;
		var names = new Runtime.Vector();
		var res = parser.parser_base.constructor.readIdentifier(parser, find_ident);
		parser = Runtime.rtl.get(res, 0);
		ident = Runtime.rtl.get(res, 1);
		var caret_start = ident.caret_start;
		var name = ident.value;
		names.pushValue(name);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && token.content == ".")
		{
			var res = parser.parser_base.constructor.matchToken(parser, ".");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			ident = Runtime.rtl.get(res, 1);
			name = ident.value;
			names.pushValue(name);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpEntityName(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"names":names.toCollection()}))]);
	},
	/**
	 * Read type identifier
	 */
	readTypeIdentifier: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var start = parser;
		var look = null;
		var token = null;
		var op_code = null;
		var entity_name = null;
		var template = null;
		var res = this.readEntityName(parser, find_ident);
		parser = Runtime.rtl.get(res, 0);
		entity_name = Runtime.rtl.get(res, 1);
		var caret_start = entity_name.caret_start;
		var flag_open_caret = false;
		var flag_end_caret = false;
		var res = this.lookToken(parser, "<");
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		flag_open_caret = Runtime.rtl.get(res, 2);
		if (flag_open_caret)
		{
			template = new Runtime.Vector();
			var res = this.matchToken(parser, "<");
			parser = Runtime.rtl.get(res, 0);
			var res = this.lookToken(parser, ">");
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			flag_end_caret = Runtime.rtl.get(res, 2);
			while (!token.eof && !flag_end_caret)
			{
				var parser_value = null;
				var res = this.readTypeIdentifier(parser);
				parser = Runtime.rtl.get(res, 0);
				parser_value = Runtime.rtl.get(res, 1);
				template.pushValue(parser_value);
				var res = this.lookToken(parser, ">");
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				flag_end_caret = Runtime.rtl.get(res, 2);
				if (!flag_end_caret)
				{
					var res = this.matchToken(parser, ",");
					parser = Runtime.rtl.get(res, 0);
					var res = this.lookToken(parser, ">");
					look = Runtime.rtl.get(res, 0);
					token = Runtime.rtl.get(res, 1);
					flag_end_caret = Runtime.rtl.get(res, 2);
				}
			}
			var res = this.matchToken(parser, ">");
			parser = Runtime.rtl.get(res, 0);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpTypeIdentifier(Runtime.Dict.from({"entity_name":entity_name,"template":(template) ? (template.toCollection()) : (null),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read collection
	 */
	readCollection: function(parser)
	{
		var start = parser;
		var look = null;
		var token = null;
		var values = new Runtime.Vector();
		var ifdef_condition = null;
		var flag_ifdef = false;
		var res = this.matchToken(parser, "[");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && token.content != "]")
		{
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "#ifdef")
			{
				parser = look;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.get(res, 0);
				ifdef_condition = Runtime.rtl.get(res, 1);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), true);
				var res = parser.parser_base.constructor.matchToken(parser, "then");
				parser = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				flag_ifdef = true;
			}
			var parser_value = null;
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			parser_value = Runtime.rtl.get(res, 1);
			var res = this.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == ",")
			{
				parser = look;
				var res = this.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
			}
			if (flag_ifdef)
			{
				parser_value = new Bayrell.Lang.OpCodes.OpPreprocessorIfDef(Runtime.Dict.from({"items":parser_value,"condition":ifdef_condition}));
			}
			values.pushValue(parser_value);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "#endif")
			{
				parser = look;
				flag_ifdef = false;
				ifdef_condition = null;
			}
			var res = this.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		var res = this.matchToken(parser, "]");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpCollection(Runtime.Dict.from({"values":values.toCollection(),"caret_start":caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read collection
	 */
	readDict: function(parser)
	{
		var look = null;
		var token = null;
		var values = new Runtime.Vector();
		var ifdef_condition = null;
		var flag_ifdef = false;
		var res = this.matchToken(parser, "{");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && token.content != "}")
		{
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "#ifdef")
			{
				parser = look;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.get(res, 0);
				ifdef_condition = Runtime.rtl.get(res, 1);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), true);
				var res = parser.parser_base.constructor.matchToken(parser, "then");
				parser = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				flag_ifdef = true;
			}
			var parser_value = null;
			var res = this.readString(parser);
			parser = Runtime.rtl.get(res, 0);
			parser_value = Runtime.rtl.get(res, 1);
			var key = parser_value.value;
			var res = this.matchToken(parser, ":");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			parser_value = Runtime.rtl.get(res, 1);
			var res = this.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == ",")
			{
				parser = look;
			}
			values.pushValue(new Bayrell.Lang.OpCodes.OpDictPair(Runtime.Dict.from({"key":key,"value":parser_value,"condition":ifdef_condition})));
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "#endif")
			{
				parser = look;
				flag_ifdef = false;
				ifdef_condition = null;
			}
			var res = this.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		var res = this.matchToken(parser, "}");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpDict(Runtime.Dict.from({"values":values.toCollection(),"caret_start":caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read fixed
	 */
	readFixed: function(parser)
	{
		var look = null;
		var token = null;
		var start = parser;
		var flag_negative = false;
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("Identifier", token.caret_start, look.file_name)
		}
		/* Negative number */
		if (token.content == "-")
		{
			flag_negative = true;
			var res = this.readToken(look);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		/* Read string */
		if (!flag_negative && (token.content == "'" || token.content == "\""))
		{
			return this.readString(parser);
		}
		/* Read Collection */
		if (!flag_negative && token.content == "[")
		{
			return this.readCollection(parser);
		}
		/* Read Dict */
		if (!flag_negative && token.content == "{")
		{
			return this.readDict(parser);
		}
		/* Read Number */
		if (this.isStringOfNumbers(token.content))
		{
			return Runtime.Collection.from([look,new Bayrell.Lang.OpCodes.OpNumber(Runtime.Dict.from({"value":token.content,"caret_start":token.caret_start,"caret_end":look.caret,"negative":flag_negative}))]);
		}
		return this.readIdentifier(parser, true);
	},
	/**
	 * Read call args
	 */
	readCallArgs: function(parser)
	{
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "{")
		{
			var res = this.readDict(parser);
			parser = Runtime.rtl.get(res, 0);
			var d = Runtime.rtl.get(res, 1);
			items = Runtime.Collection.from([d]);
		}
		else if (token.content == "(")
		{
			var res = this.matchToken(parser, "(");
			parser = Runtime.rtl.get(res, 0);
			var res = this.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			while (!token.eof && token.content != ")")
			{
				var parser_value = null;
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.get(res, 0);
				parser_value = Runtime.rtl.get(res, 1);
				items.pushValue(parser_value);
				var res = this.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				if (token.content == ",")
				{
					parser = look;
					var res = this.readToken(parser);
					look = Runtime.rtl.get(res, 0);
					token = Runtime.rtl.get(res, 1);
				}
			}
			var res = this.matchToken(parser, ")");
			parser = Runtime.rtl.get(res, 0);
		}
		return Runtime.Collection.from([parser,items.toCollection()]);
	},
	/**
	 * Read new instance
	 */
	readNew: function(parser, match_new)
	{
		if (match_new == undefined) match_new = true;
		var look = null;
		var token = null;
		var op_code = null;
		var caret_start = parser.caret;
		var args = Runtime.Collection.from([]);
		if (match_new)
		{
			var res = this.matchToken(parser, "new");
			parser = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			caret_start = token.caret_start;
		}
		var res = this.readTypeIdentifier(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var res = this.readToken(parser);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "(" || token.content == "{")
		{
			var res = this.readCallArgs(parser);
			parser = Runtime.rtl.get(res, 0);
			args = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpNew(Runtime.Dict.from({"args":args,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read method
	 */
	readMethod: function(parser, match)
	{
		if (match == undefined) match = true;
		var look = null;
		var token = null;
		var parser_value = null;
		var op_code = null;
		var value1 = "";
		var value2 = "";
		var kind = "";
		var caret_start = parser.caret;
		if (match)
		{
			var res = this.matchToken(parser, "method");
			parser = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		var save = parser;
		/* Read static method */
		try
		{
			var res = this.readIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
			var res = this.matchToken(parser, "::");
			parser = Runtime.rtl.get(res, 0);
			var res = this.readToken(parser);
			parser = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE)
			{
				kind = Bayrell.Lang.OpCodes.OpMethod.KIND_STATIC;
			}
			else
			{
				kind = Bayrell.Lang.OpCodes.OpMethod.KIND_CLASS;
			}
			value1 = op_code;
			value2 = token.content;
		}
		catch (_ex)
		{
			if (_ex instanceof Bayrell.Lang.Exceptions.ParserError)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
		/* Read instance method */
		if (kind == "")
		{
			parser = save;
			try
			{
				var res = this.readIdentifier(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				var res = this.matchToken(parser, ".");
				parser = Runtime.rtl.get(res, 0);
				var res = this.readToken(parser);
				parser = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				kind = Bayrell.Lang.OpCodes.OpMethod.KIND_ATTR;
				value1 = op_code;
				value2 = token.content;
			}
			catch (_ex)
			{
				if (_ex instanceof Bayrell.Lang.Exceptions.ParserError)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
		}
		/* Error */
		if (kind == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("'.' or '::'", parser.caret, parser.file_name)
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpMethod(Runtime.Dict.from({"value1":value1,"value2":value2,"kind":kind,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read curry
	 */
	readCurry: function(parser)
	{
		var look = null;
		var token = null;
		var obj = null;
		var args = new Runtime.Vector();
		var res = this.matchToken(parser, "curry");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var res = this.readDynamic(parser, 14);
		parser = Runtime.rtl.get(res, 0);
		obj = Runtime.rtl.get(res, 1);
		var res = this.matchToken(parser, "(");
		parser = Runtime.rtl.get(res, 0);
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && token.content != ")")
		{
			var arg = null;
			if (token.content == "?")
			{
				var pos = 0;
				parser = look;
				var res = this.readToken(look);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				if (this.isStringOfNumbers(token.content))
				{
					pos = Runtime.rtl.to(token.content, {"e":"int"});
					parser = look;
				}
				arg = new Bayrell.Lang.OpCodes.OpCurryArg(Runtime.Dict.from({"pos":pos}));
				args.pushValue(arg);
			}
			else
			{
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.get(res, 0);
				arg = Runtime.rtl.get(res, 1);
				args.pushValue(arg);
			}
			var res = this.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == ",")
			{
				parser = look;
				var res = this.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
			}
		}
		var res = this.matchToken(parser, ")");
		parser = Runtime.rtl.get(res, 0);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpCurry(Runtime.Dict.from({"obj":obj,"args":args}))]);
	},
	/**
	 * Read base item
	 */
	readBaseItem: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = look.caret;
		if (token.content == "new")
		{
			var res = this.readNew(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		else if (token.content == "method")
		{
			var res = this.readMethod(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		else if (token.content == "classof")
		{
			var res = this.readClassOf(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		else if (token.content == "classref")
		{
			var res = this.readClassRef(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		else if (token.content == "(")
		{
			var save_parser = parser;
			parser = look;
			/* Try to read OpTypeConvert */
			try
			{
				var res = this.readTypeIdentifier(parser);
				parser = Runtime.rtl.get(res, 0);
				var op_type = Runtime.rtl.get(res, 1);
				var res = this.readToken(parser);
				parser = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				if (token.content == ")")
				{
					var res = this.readDynamic(parser);
					parser = Runtime.rtl.get(res, 0);
					op_code = Runtime.rtl.get(res, 1);
					return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpTypeConvert(Runtime.Dict.from({"pattern":op_type,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
				}
			}
			catch (_ex)
			{
				if (_ex instanceof Bayrell.Lang.Exceptions.ParserError)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
			/* Read Expression */
			var res = this.matchToken(save_parser, "(");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
			var res = this.matchToken(parser, ")");
			parser = Runtime.rtl.get(res, 0);
		}
		else
		{
			var res = this.readFixed(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read classof
	 */
	readClassOf: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(parser, "classof");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = this.readEntityName(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpClassOf(Runtime.Dict.from({"entity_name":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read classref
	 */
	readClassRef: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(parser, "classref");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpClassRef(Runtime.Dict.from({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read dynamic
	 */
	readDynamic: function(parser, dynamic_flags)
	{
		if (dynamic_flags == undefined) dynamic_flags = -1;
		var look = null;
		var token = null;
		var parser_items = null;
		var op_code = null;
		var op_code_first = null;
		var is_await = false;
		var is_context_call = true;
		var caret_start = null;
		/* Dynamic flags */
		var flag_call = 1;
		var flag_attr = 2;
		var flag_static = 4;
		var flag_dynamic = 8;
		var f_next = (s) => 
		{
			if ((dynamic_flags & 1) == 1)
			{
				if (s == "{" || s == "(" || s == "@")
				{
					return true;
				}
			}
			if ((dynamic_flags & 2) == 2)
			{
				if (s == ".")
				{
					return true;
				}
			}
			if ((dynamic_flags & 4) == 4)
			{
				if (s == "::")
				{
					return true;
				}
			}
			if ((dynamic_flags & 8) == 8)
			{
				if (s == "[")
				{
					return true;
				}
			}
			return false;
		};
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "await")
		{
			caret_start = token.caret_start;
			is_await = true;
			parser = look;
		}
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "@")
		{
			var res = this.readToken(look);
			var look2 = Runtime.rtl.get(res, 0);
			var token2 = Runtime.rtl.get(res, 1);
			if (!f_next(token2.content))
			{
				if (this.isIdentifier(token2.content))
				{
					parser = look;
					is_context_call = false;
				}
			}
		}
		var res = this.readBaseItem(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		op_code_first = op_code;
		if (caret_start == null)
		{
			caret_start = op_code.caret_start;
		}
		if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT || op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_FUNCTION)
		{
			is_context_call = false;
		}
		var res = this.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (f_next(token.content))
		{
			if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
			{
				if (parser.find_ident && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_FUNCTION && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASS && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT)
				{
					throw new Bayrell.Lang.Exceptions.ParserExpected("Module or variable '" + Runtime.rtl.toStr(op_code.value) + Runtime.rtl.toStr("'"), op_code.caret_start, parser.file_name)
				}
			}
			else if (op_code instanceof Bayrell.Lang.OpCodes.OpNew || op_code instanceof Bayrell.Lang.OpCodes.OpCollection || op_code instanceof Bayrell.Lang.OpCodes.OpDict)
			{
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected("Module or variable", op_code.caret_start, parser.file_name)
			}
		}
		/* If is pipe */
		if (parser.is_pipe && op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			op_code = new Bayrell.Lang.OpCodes.OpAttr(Runtime.Dict.from({"kind":parser.pipe_kind,"obj":new Bayrell.Lang.OpCodes.OpIdentifier(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpIdentifier.KIND_PIPE,"caret_start":op_code.caret_start,"caret_end":op_code.caret_end})),"value":op_code,"caret_start":op_code.caret_start,"caret_end":op_code.caret_end}));
		}
		while (!token.eof && f_next(token.content))
		{
			var token_content = token.content;
			/* Static call */
			if (token_content == "(" || token_content == "{" || token_content == "@")
			{
				if ((dynamic_flags & flag_call) != flag_call)
				{
					throw new Bayrell.Lang.Exceptions.ParserError("Call are not allowed", token.caret_start, parser.file_name)
				}
				if (token_content == "@")
				{
					parser = look;
					is_context_call = false;
				}
				var res = this.readCallArgs(parser);
				parser = Runtime.rtl.get(res, 0);
				parser_items = Runtime.rtl.get(res, 1);
				op_code = new Bayrell.Lang.OpCodes.OpCall(Runtime.Dict.from({"obj":op_code,"args":parser_items,"caret_start":caret_start,"caret_end":parser.caret,"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "." || token_content == "::" || token_content == "[")
			{
				var kind = "";
				var look_values = null;
				var look_value = null;
				parser = look;
				is_context_call = true;
				if (token_content == ".")
				{
					kind = Bayrell.Lang.OpCodes.OpAttr.KIND_ATTR;
					if ((dynamic_flags & flag_attr) != flag_attr)
					{
						throw new Bayrell.Lang.Exceptions.ParserError("Attr are not allowed", token.caret_start, parser.file_name)
					}
				}
				else if (token_content == "::")
				{
					kind = Bayrell.Lang.OpCodes.OpAttr.KIND_STATIC;
					if ((dynamic_flags & flag_static) != flag_static)
					{
						throw new Bayrell.Lang.Exceptions.ParserError("Static attr are not allowed", token.caret_start, parser.file_name)
					}
				}
				else if (token_content == "[")
				{
					kind = Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC;
					if ((dynamic_flags & flag_dynamic) != flag_dynamic)
					{
						throw new Bayrell.Lang.Exceptions.ParserError("Dynamic attr are not allowed", token.caret_start, parser.file_name)
					}
				}
				if (token_content == "[")
				{
					var res = parser.parser_expression.constructor.readExpression(parser);
					parser = Runtime.rtl.get(res, 0);
					look_value = Runtime.rtl.get(res, 1);
					var res = this.readToken(parser);
					look = Runtime.rtl.get(res, 0);
					token = Runtime.rtl.get(res, 1);
					if (token.content == ",")
					{
						look_values = new Runtime.Vector();
						look_values.pushValue(look_value);
					}
					while (token.content == ",")
					{
						parser = look;
						var res = parser.parser_expression.constructor.readExpression(parser);
						parser = Runtime.rtl.get(res, 0);
						look_value = Runtime.rtl.get(res, 1);
						look_values.pushValue(look_value);
						var res = this.readToken(parser);
						look = Runtime.rtl.get(res, 0);
						token = Runtime.rtl.get(res, 1);
					}
					var res = this.matchToken(parser, "]");
					parser = Runtime.rtl.get(res, 0);
					if (look_values != null)
					{
						kind = Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC_ATTRS;
					}
				}
				else
				{
					var res = this.readToken(parser);
					look = Runtime.rtl.get(res, 0);
					token = Runtime.rtl.get(res, 1);
					if (token.content == "@")
					{
						parser = look;
						is_context_call = false;
					}
					var res = this.readIdentifier(parser);
					parser = Runtime.rtl.get(res, 0);
					look_value = Runtime.rtl.get(res, 1);
				}
				op_code = new Bayrell.Lang.OpCodes.OpAttr(Runtime.Dict.from({"kind":kind,"obj":op_code,"attrs":(look_values != null) ? (look_values.toCollection()) : (null),"value":(look_values == null) ? (look_value) : (null),"caret_start":caret_start,"caret_end":parser.caret}));
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected("Next attr", token.caret_start, parser.file_name)
			}
			var res = this.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr && op_code.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_PIPE && token.content != "(" && token.content != "{")
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected("Call", token.caret_start, parser.file_name)
			}
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayBase";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isChar",
			"isNumber",
			"isHexChar",
			"isStringOfNumbers",
			"isSystemType",
			"isIdentifier",
			"isReserved",
			"findIdentifier",
			"isTokenChar",
			"isSkipChar",
			"nextX",
			"nextY",
			"next",
			"isCommentOpen",
			"isCommentClose",
			"skipChar",
			"readSpecialToken",
			"nextToken",
			"readBack",
			"readToken",
			"lookToken",
			"matchToken",
			"matchString",
			"readNumber",
			"readUntilStringArr",
			"readString",
			"readComment",
			"readIdentifier",
			"readEntityName",
			"readTypeIdentifier",
			"readCollection",
			"readDict",
			"readFixed",
			"readCallArgs",
			"readNew",
			"readMethod",
			"readCurry",
			"readBaseItem",
			"readClassOf",
			"readClassRef",
			"readDynamic",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayBase);
window["Bayrell.Lang.LangBay.ParserBayBase"] = Bayrell.Lang.LangBay.ParserBayBase;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangBay.ParserBayBase;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayExpression = function()
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayExpression)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression,
{
	/**
	 * Read bit not
	 */
	readBitNot: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		if (token.content == "!")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.readDynamic(look);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
			return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"math":"!","caret_start":caret_start,"caret_end":parser.caret}))]);
		}
		return parser.parser_base.constructor.readDynamic(parser);
	},
	/**
	 * Read bit shift
	 */
	readBitShift: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitNot(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && (token.content == ">>" || token.content == "<<"))
		{
			math = token.content;
			var res = this.readBitNot(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read bit and
	 */
	readBitAnd: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitShift(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && token.content == "&")
		{
			math = token.content;
			var res = this.readBitShift(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read bit or
	 */
	readBitOr: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitAnd(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && (token.content == "|" || token.content == "xor"))
		{
			math = token.content;
			var res = this.readBitAnd(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read factor
	 */
	readFactor: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitOr(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && (token.content == "*" || token.content == "/" || token.content == "%" || token.content == "div" || token.content == "mod"))
		{
			math = token.content;
			var res = this.readBitOr(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read arithmetic
	 */
	readArithmetic: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readFactor(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && (token.content == "+" || token.content == "-"))
		{
			math = token.content;
			var res = this.readFactor(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read concat
	 */
	readConcat: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readArithmetic(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && token.content == "~")
		{
			math = token.content;
			var res = this.readArithmetic(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read compare
	 */
	readCompare: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readConcat(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var content = token.content;
		if (content == "===" || content == "!==" || content == "==" || content == "!=" || content == ">=" || content == "<=" || content == ">" || content == "<")
		{
			var math = token.content;
			var res = this.readConcat(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret}));
			parser = look;
		}
		else if (content == "is" || content == "implements" || content == "instanceof")
		{
			var math = token.content;
			var res = parser.parser_base.constructor.readTypeIdentifier(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret}));
			parser = look;
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read not
	 */
	readNot: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		if (token.content == "not")
		{
			var op_code = null;
			var start = parser;
			var res = this.readCompare(look);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
			return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"math":"not","caret_start":caret_start,"caret_end":parser.caret}))]);
		}
		return this.readCompare(parser);
	},
	/**
	 * Read and
	 */
	readAnd: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readNot(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && (token.content == "and" || token.content == "&&"))
		{
			math = token.content;
			var res = this.readNot(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":"and","caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read or
	 */
	readOr: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readAnd(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && (token.content == "or" || token.content == "||"))
		{
			math = token.content;
			var res = this.readAnd(look);
			look = Runtime.rtl.get(res, 0);
			look_value = Runtime.rtl.get(res, 1);
			op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":"or","caret_start":caret_start,"caret_end":look.caret}));
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read element
	 */
	readElement: function(parser)
	{
		/* Try to read function */
		if (parser.parser_operator.constructor.tryReadFunction(parser, false))
		{
			return parser.parser_operator.constructor.readDeclareFunction(parser, false);
		}
		return this.readOr(parser);
	},
	/**
	 * Read ternary operation
	 */
	readTernary: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var res = this.readElement(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "?")
		{
			condition = op_code;
			var res = this.readExpression(look);
			parser = Runtime.rtl.get(res, 0);
			if_true = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == ":")
			{
				var res = this.readExpression(look);
				parser = Runtime.rtl.get(res, 0);
				if_false = Runtime.rtl.get(res, 1);
			}
			op_code = new Bayrell.Lang.OpCodes.OpTernary(Runtime.Dict.from({"condition":condition,"if_true":if_true,"if_false":if_false,"caret_start":caret_start,"caret_end":parser.caret}));
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read pipe
	 */
	ExpressionPipe: function(parser)
	{
		var look = null;
		var look_token = null;
		var op_code = null;
		var is_next_attr = false;
		var save_is_pipe = parser.is_pipe;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_pipe"]), false);
		var res = this.readTernary(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_pipe"]), save_is_pipe);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		look_token = Runtime.rtl.get(res, 1);
		if (look_token.content == "|>")
		{
			while (look_token.content == "|>" || look_token.content == ",")
			{
				parser = look;
				var value = null;
				var kind = "";
				var is_async = false;
				var is_monad = false;
				if (look_token.content == ",")
				{
					is_next_attr = true;
				}
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				look_token = Runtime.rtl.get(res, 1);
				if (look_token.content == "await")
				{
					is_async = true;
					parser = look;
					var res = parser.parser_base.constructor.readToken(parser);
					look = Runtime.rtl.get(res, 0);
					look_token = Runtime.rtl.get(res, 1);
				}
				if (look_token.content == "monad")
				{
					is_monad = true;
					parser = look;
					var res = parser.parser_base.constructor.readToken(parser);
					look = Runtime.rtl.get(res, 0);
					look_token = Runtime.rtl.get(res, 1);
				}
				if (look_token.content == "attr")
				{
					parser = look;
					var res = this.readTernary(parser);
					parser = Runtime.rtl.get(res, 0);
					value = Runtime.rtl.get(res, 1);
					kind = Bayrell.Lang.OpCodes.OpPipe.KIND_ATTR;
				}
				else if (look_token.content == "\"" || look_token.content == "'")
				{
					var res = this.readTernary(parser);
					parser = Runtime.rtl.get(res, 0);
					value = Runtime.rtl.get(res, 1);
					kind = Bayrell.Lang.OpCodes.OpPipe.KIND_ATTR;
				}
				else if (look_token.content == "{")
				{
					parser = look;
					var res = this.readTernary(parser);
					parser = Runtime.rtl.get(res, 0);
					value = Runtime.rtl.get(res, 1);
					kind = Bayrell.Lang.OpCodes.OpPipe.KIND_ATTR;
					var res = parser.parser_base.constructor.matchToken(parser, "}");
					parser = Runtime.rtl.get(res, 0);
				}
				else if (is_next_attr)
				{
					throw new Bayrell.Lang.Exceptions.ParserExpected("|>", parser.caret, parser.file_name)
				}
				else if (look_token.content == "default")
				{
					var arg1;
					var arg2;
					kind = Bayrell.Lang.OpCodes.OpPipe.KIND_CALL;
					is_monad = true;
					try
					{
						var res = parser.parser_base.constructor.readIdentifier(look);
						parser = Runtime.rtl.get(res, 0);
						arg1 = Runtime.rtl.get(res, 1);
						var res = this.readTernary(parser);
						parser = Runtime.rtl.get(res, 0);
						arg2 = Runtime.rtl.get(res, 1);
						arg1 = new Bayrell.Lang.OpCodes.OpString(Runtime.Dict.from({"value":parser.constructor.findModuleName(parser, arg1.value),"caret_start":arg1.caret_start,"caret_end":arg1.caret_end}));
						value = new Bayrell.Lang.OpCodes.OpCall(Runtime.Dict.from({"args":Runtime.Collection.from([arg1,arg2]),"obj":new Bayrell.Lang.OpCodes.OpAttr(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpAttr.KIND_STATIC,"obj":new Bayrell.Lang.OpCodes.OpIdentifier(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE,"caret_start":caret_start,"caret_end":parser.caret,"value":"rtl"})),"value":new Bayrell.Lang.OpCodes.OpIdentifier(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value":"m_to"})),"caret_start":caret_start,"caret_end":parser.caret})),"caret_start":caret_start,"caret_end":parser.caret}));
					}
					catch (_ex)
					{
						if (_ex instanceof Bayrell.Lang.Exceptions.ParserError)
						{
							var err = _ex;
							
							value = null;
						}
						else
						{
							throw _ex;
						}
					}
					if (value == null)
					{
						var res = this.readTernary(look);
						parser = Runtime.rtl.get(res, 0);
						arg2 = Runtime.rtl.get(res, 1);
						value = new Bayrell.Lang.OpCodes.OpCall(Runtime.Dict.from({"args":Runtime.Collection.from([arg2]),"obj":new Bayrell.Lang.OpCodes.OpAttr(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpAttr.KIND_STATIC,"obj":new Bayrell.Lang.OpCodes.OpIdentifier(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE,"caret_start":caret_start,"caret_end":parser.caret,"value":"rtl"})),"value":new Bayrell.Lang.OpCodes.OpIdentifier(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value":"m_def"})),"caret_start":caret_start,"caret_end":parser.caret})),"caret_start":caret_start,"caret_end":parser.caret}));
					}
				}
				else if (look_token.content == "method" || look_token.content == "." || look_token.content == ":" || look_token.content == "::")
				{
					parser = look;
					kind = Bayrell.Lang.OpCodes.OpPipe.KIND_CALL;
					/* Set pipe */
					var save_find_ident = parser.find_ident;
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_pipe"]), true);
					if (look_token.content == ".")
					{
						kind = Bayrell.Lang.OpCodes.OpPipe.KIND_METHOD;
						parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["pipe_kind"]), Bayrell.Lang.OpCodes.OpAttr.KIND_ATTR);
					}
					else
					{
						parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["pipe_kind"]), Bayrell.Lang.OpCodes.OpAttr.KIND_STATIC);
					}
					var res = parser.parser_base.constructor.readDynamic(parser);
					parser = Runtime.rtl.get(res, 0);
					value = Runtime.rtl.get(res, 1);
					/* Restore parser */
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_pipe"]), false);
					parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), save_find_ident);
				}
				else if (look_token.content == "curry")
				{
					kind = Bayrell.Lang.OpCodes.OpPipe.KIND_CALL;
					var res = parser.parser_base.constructor.readCurry(parser);
					parser = Runtime.rtl.get(res, 0);
					value = Runtime.rtl.get(res, 1);
				}
				else
				{
					kind = Bayrell.Lang.OpCodes.OpPipe.KIND_CALL;
					var res = parser.parser_base.constructor.readDynamic(parser);
					parser = Runtime.rtl.get(res, 0);
					value = Runtime.rtl.get(res, 1);
				}
				op_code = new Bayrell.Lang.OpCodes.OpPipe(Runtime.Dict.from({"obj":op_code,"kind":kind,"value":value,"is_async":is_async,"is_monad":is_monad,"caret_start":caret_start,"caret_end":parser.caret}));
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				look_token = Runtime.rtl.get(res, 1);
				is_next_attr = false;
			}
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read expression
	 */
	readExpression: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "<")
		{
			return parser.parser_html.constructor.readHTML(parser);
		}
		else if (token.content == "curry")
		{
			return parser.parser_base.constructor.readCurry(parser);
		}
		else if (token.content == "@css")
		{
			return parser.parser_html.constructor.readCss(parser);
		}
		return this.ExpressionPipe(parser);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayExpression";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"readBitNot",
			"readBitShift",
			"readBitAnd",
			"readBitOr",
			"readFactor",
			"readArithmetic",
			"readConcat",
			"readCompare",
			"readNot",
			"readAnd",
			"readOr",
			"readElement",
			"readTernary",
			"ExpressionPipe",
			"readExpression",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayExpression);
window["Bayrell.Lang.LangBay.ParserBayExpression"] = Bayrell.Lang.LangBay.ParserBayExpression;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangBay.ParserBayExpression;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayHtml = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Bayrell.Lang.LangBay.ParserBayHtml.prototype = Object.create(Runtime.BaseObject.prototype);
Bayrell.Lang.LangBay.ParserBayHtml.prototype.constructor = Bayrell.Lang.LangBay.ParserBayHtml;
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayHtml)
		{
		}
		Runtime.BaseObject.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Runtime.BaseObject.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseObject.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml, Runtime.BaseObject);
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml,
{
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	getCssHash: function(s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayHtml.getCssHash", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var r = "";
		var a = "1234567890abcdef";
		var sz = Runtime.rs.strlen(s);
		var h = 0;
		for (var i = 0;i < sz;i++)
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
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayHtml.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Read css selector
	 */
	readCssSelector: function(parser)
	{
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var class_name = parser.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(parser.current_class_name);
		var ch = Runtime.rs.substr(content.ref, pos, 1);
		if (ch == "(")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
			var start_pos = pos;
			while (pos < content_sz && ch != ")")
			{
				pos = pos + 1;
				x = parser.parser_base.constructor.nextX(parser, ch, x);
				y = parser.parser_base.constructor.nextY(parser, ch, y);
				ch = Runtime.rs.substr(content.ref, pos, 1);
			}
			class_name = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
			if (parser.uses.has(class_name))
			{
				class_name = parser.uses.item(class_name);
			}
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
		}
		var start_pos = pos;
		ch = Runtime.rs.substr(content.ref, pos, 1);
		while (pos < content_sz && ch != " " && ch != "," && ch != "." && ch != ":" && ch != "[" && ch != "{")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
			ch = Runtime.rs.substr(content.ref, pos, 1);
		}
		var postfix = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
		var selector = "." + Runtime.rtl.toStr(postfix) + Runtime.rtl.toStr(".h-") + Runtime.rtl.toStr(this.getCssHash(class_name));
		var caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		return Runtime.Collection.from([parser,selector]);
	},
	/**
	 * Read css body
	 */
	readCssBody: function(parser, flags)
	{
		if (flags == undefined) flags = null;
		if (flags == null)
		{
			flags = Runtime.Dict.from({"expression":true,"css_selector":true});
		}
		else
		{
			var __v0 = new Runtime.Monad(Runtime.rtl.get(flags, "expression"));
			__v0 = __v0.monad(Runtime.rtl.m_to("bool", true));
			flags = Runtime.rtl.setAttr(flags, Runtime.Collection.from(["expression"]), __v0.value());
			var __v1 = new Runtime.Monad(Runtime.rtl.get(flags, "css_selector"));
			__v1 = __v1.monad(Runtime.rtl.m_to("bool", true));
			flags = Runtime.rtl.setAttr(flags, Runtime.Collection.from(["css_selector"]), __v1.value());
		}
		var caret_start = parser.caret;
		var caret_last = parser.caret;
		var is_first_selector = true;
		var op_code = null;
		var css_str = "";
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var bracket_level = 0;
		var start_pos = pos;
		var ch = Runtime.rs.substr(content.ref, pos, 1);
		var ch2 = Runtime.rs.substr(content.ref, pos, 2);
		var ch6 = Runtime.rs.substr(content.ref, pos, 6);
		while (pos < content_sz && (ch != "}" || ch == "}" && bracket_level > 0) && ch != "<")
		{
			/* Read expression */
			if (ch2 == "${")
			{
				var res = parser.parser_base.constructor.next(parser, ch2, x, y, pos);
				x = Runtime.rtl.get(res, 0);
				y = Runtime.rtl.get(res, 1);
				pos = Runtime.rtl.get(res, 2);
				/* Add value */
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos - 2);
				if (value != "")
				{
					css_str += Runtime.rtl.toStr(value);
				}
				/* Add css op code */
				css_str = Runtime.rs.replace("\t", "", css_str);
				css_str = Runtime.rs.replace("\n", "", css_str);
				if (css_str != "")
				{
					var css_str_op_code = new Bayrell.Lang.OpCodes.OpString(Runtime.Dict.from({"caret_start":caret_last,"caret_end":parser.caret,"value":css_str}));
					if (op_code == null)
					{
						op_code = css_str_op_code;
					}
					else
					{
						op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value1":op_code,"value2":css_str_op_code,"math":"~"}));
					}
				}
				/* Read CSS Selector */
				var caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = parser.parser_expression.constructor.ExpressionPipe(parser);
				parser = Runtime.rtl.get(res, 0);
				var expr = Runtime.rtl.get(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.get(res, 0);
				/* Add expr op code */
				if (expr != null)
				{
					if (op_code == null)
					{
						op_code = expr;
					}
					else
					{
						op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value1":op_code,"value2":expr,"math":"~"}));
					}
				}
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
				/* Set css str */
				css_str = "";
				caret_last = caret;
				is_first_selector = true;
			}
			else if (ch6 == "@media")
			{
				while (pos < content_sz && ch != "{")
				{
					x = parser.parser_base.constructor.nextX(parser, ch, x);
					y = parser.parser_base.constructor.nextY(parser, ch, y);
					pos = pos + 1;
					ch = Runtime.rs.substr(content.ref, pos, 1);
				}
				/* Add value */
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
				if (value != "")
				{
					css_str += Runtime.rtl.toStr(value);
				}
				css_str += Runtime.rtl.toStr("{");
				/* Add css op code */
				css_str = Runtime.rs.replace("\t", "", css_str);
				css_str = Runtime.rs.replace("\n", "", css_str);
				if (css_str != "")
				{
					var css_str_op_code = new Bayrell.Lang.OpCodes.OpString(Runtime.Dict.from({"caret_start":caret_last,"caret_end":parser.caret,"value":css_str}));
					if (op_code == null)
					{
						op_code = css_str_op_code;
					}
					else
					{
						op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value1":op_code,"value2":css_str_op_code,"math":"~"}));
					}
				}
				/* Read CSS Block */
				var caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.get(res, 0);
				var res = this.readCssBody(parser, Runtime.Dict.from({"css_selector":true}));
				parser = Runtime.rtl.get(res, 0);
				var expr = Runtime.rtl.get(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.get(res, 0);
				/* Add expr op code */
				if (expr != null)
				{
					if (op_code == null)
					{
						op_code = expr;
					}
					else
					{
						op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value1":op_code,"value2":expr,"math":"~"}));
					}
				}
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
				/* Set css str */
				css_str = "}";
				caret_last = caret;
				is_first_selector = true;
			}
			else if ((ch == "%" || parser.is_local_css && ch == "." && is_first_selector) && Runtime.rtl.get(flags, "css_selector") == true)
			{
				x = parser.parser_base.constructor.nextX(parser, ch, x);
				y = parser.parser_base.constructor.nextY(parser, ch, y);
				pos = pos + 1;
				/* Add value */
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos - 1);
				if (value != "")
				{
					css_str += Runtime.rtl.toStr(value);
				}
				/* Read CSS Selector */
				var caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readCssSelector(parser);
				parser = Runtime.rtl.get(res, 0);
				var s = Runtime.rtl.get(res, 1);
				css_str += Runtime.rtl.toStr(s);
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
				is_first_selector = false;
			}
			else if (ch == "{")
			{
				/* Add value */
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
				if (value != "")
				{
					css_str += Runtime.rtl.toStr(value);
				}
				css_str += Runtime.rtl.toStr("{");
				/* Add css op code */
				css_str = Runtime.rs.replace("\t", "", css_str);
				css_str = Runtime.rs.replace("\n", "", css_str);
				if (css_str != "")
				{
					var css_str_op_code = new Bayrell.Lang.OpCodes.OpString(Runtime.Dict.from({"caret_start":caret_last,"caret_end":parser.caret,"value":css_str}));
					if (op_code == null)
					{
						op_code = css_str_op_code;
					}
					else
					{
						op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value1":op_code,"value2":css_str_op_code,"math":"~"}));
					}
				}
				/* Read CSS Block */
				var caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.get(res, 0);
				var res = this.readCssBody(parser, Runtime.Dict.from({"css_selector":false}));
				parser = Runtime.rtl.get(res, 0);
				var expr = Runtime.rtl.get(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.get(res, 0);
				/* Add expr op code */
				if (expr != null)
				{
					if (op_code == null)
					{
						op_code = expr;
					}
					else
					{
						op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value1":op_code,"value2":expr,"math":"~"}));
					}
				}
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
				/* Set css str */
				css_str = "}";
				caret_last = caret;
				is_first_selector = true;
			}
			else
			{
				x = parser.parser_base.constructor.nextX(parser, ch, x);
				y = parser.parser_base.constructor.nextY(parser, ch, y);
				pos = pos + 1;
				if (ch == " " || ch == "," || ch == "{")
				{
					is_first_selector = true;
				}
			}
			ch = Runtime.rs.substr(content.ref, pos, 1);
			ch2 = Runtime.rs.substr(content.ref, pos, 2);
			ch6 = Runtime.rs.substr(content.ref, pos, 6);
		}
		/* Push item */
		var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
		var caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		if (value != "")
		{
			css_str += Runtime.rtl.toStr(value);
		}
		/* Add css op code */
		css_str = Runtime.rs.replace("\t", "", css_str);
		css_str = Runtime.rs.replace("\n", "", css_str);
		if (css_str != "")
		{
			var css_str_op_code = new Bayrell.Lang.OpCodes.OpString(Runtime.Dict.from({"caret_start":caret_last,"caret_end":parser.caret,"value":css_str}));
			if (op_code == null)
			{
				op_code = css_str_op_code;
			}
			else
			{
				op_code = new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value1":op_code,"value2":css_str_op_code,"math":"~"}));
			}
		}
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read css
	 */
	readCss: function(parser)
	{
		var caret_start = parser.caret;
		var res = parser.parser_base.constructor.matchToken(parser, "@css");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "{");
		parser = Runtime.rtl.get(res, 0);
		var res = this.readCssBody(parser);
		parser = Runtime.rtl.get(res, 0);
		var op_code = Runtime.rtl.get(res, 1);
		if (op_code == null)
		{
			op_code = new Bayrell.Lang.OpCodes.OpString(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"value":""}));
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read style
	 */
	readStyle: function(parser, item_attrs, items, caret_start)
	{
		/* Save vars */
		var save_vars = parser.vars;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm("vars", true));
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_local_css"]), true);
		/* Check if local css */
		var is_global = item_attrs.get("global", "");
		if (is_global == "true")
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_local_css"]), false);
		}
		/* Read css */
		var res = this.readCssBody(parser);
		parser = Runtime.rtl.get(res, 0);
		var css_op_code = Runtime.rtl.get(res, 1);
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		/* Read style footer */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "/");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "style");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.get(res, 0);
		var find_pos = -1;
		for (var items_i = 0;items_i < items.count();items_i++)
		{
			var f = Runtime.rtl.get(items, items_i);
			if (f instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
			{
				if (f.name == "css")
				{
					find_pos = items_i;
					break;
				}
			}
		}
		if (find_pos == -1)
		{
			var f = new Bayrell.Lang.OpCodes.OpDeclareFunction(Runtime.Dict.from({"args":Runtime.Collection.from([new Bayrell.Lang.OpCodes.OpDeclareFunctionArg(Runtime.Dict.from({"name":"vars","caret_start":caret_start,"caret_end":parser.caret}))]),"vars":Runtime.Collection.from([]),"flags":new Bayrell.Lang.OpCodes.OpFlags(Runtime.Dict.from({"p_static":true,"p_pure":true})),"name":"css","result_type":"html","expression":css_op_code,"items":null,"caret_start":caret_start,"caret_end":parser.caret}));
			return Runtime.Collection.from([parser,f,-1]);
		}
		var f = Runtime.rtl.get(items, find_pos);
		f = Runtime.rtl.setAttr(f, Runtime.Collection.from(["expression"]), new Bayrell.Lang.OpCodes.OpMath(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"math":"~","value1":f.expression,"value2":css_op_code})));
		return Runtime.Collection.from([parser,f,find_pos]);
	},
	/**
	 * Read html comment
	 */
	readHTMLComment: function(parser)
	{
		var start = parser;
		var token = null;
		var look = null;
		var caret_start = parser.caret;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "!--");
		parser = Runtime.rtl.get(res, 0);
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var pos_start = pos;
		var ch = Runtime.rs.charAt(content.ref, pos);
		var ch3 = Runtime.rs.substr(content.ref, pos, 3);
		while (ch3 != "-->" && pos < content_sz)
		{
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
			pos = pos + 1;
			if (pos >= parser.content_sz)
			{
				break;
			}
			ch = Runtime.rs.charAt(content.ref, pos);
			ch3 = Runtime.rs.substr(content.ref, pos, 3);
		}
		var pos_end = pos;
		if (ch3 == "-->")
		{
			x = x + 3;
			pos = pos + 3;
		}
		else
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected("End of comment", new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos})), start.file_name)
		}
		/* Return result */
		var value_str = Runtime.rs.substr(content.ref, pos_start, pos_end - pos_start);
		var caret_end = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		return Runtime.Collection.from([start.copy(Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.OpCodes.OpComment(Runtime.Dict.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read html value
	 */
	readHTMLValue: function(parser)
	{
		var item = null;
		var caret = parser.caret;
		var content = parser.content;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var ch = Runtime.rs.substr(content.ref, pos, 1);
		var ch2 = Runtime.rs.substr(content.ref, pos, 2);
		if (ch == "<")
		{
			var res = this.readHTMLTag(parser);
			parser = Runtime.rtl.get(res, 0);
			item = Runtime.rtl.get(res, 1);
		}
		else if (ch == "{")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.get(res, 0);
			/* Look token */
			var flag = false;
			var res = parser.parser_base.constructor.readToken(parser);
			var look = Runtime.rtl.get(res, 0);
			var token = Runtime.rtl.get(res, 1);
			if (token.content == "{")
			{
				flag = true;
				parser = look;
			}
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			item = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = Runtime.rtl.get(res, 0);
			if (flag)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.get(res, 0);
			}
		}
		else if (ch == "@")
		{
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
			pos = pos + 1;
			var ch3 = Runtime.rs.substr(content.ref, pos, 3);
			var ch4 = Runtime.rs.substr(content.ref, pos, 4);
			if (ch3 == "raw" || ch4 == "json" || ch4 == "html")
			{
				var res;
				if (ch3 == "raw")
				{
					res = parser.parser_base.constructor.next(parser, ch3, x, y, pos);
				}
				if (ch4 == "json")
				{
					res = parser.parser_base.constructor.next(parser, ch4, x, y, pos);
				}
				if (ch4 == "html")
				{
					res = parser.parser_base.constructor.next(parser, ch4, x, y, pos);
				}
				x = Runtime.rtl.get(res, 0);
				y = Runtime.rtl.get(res, 1);
				pos = Runtime.rtl.get(res, 2);
			}
			caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.get(res, 0);
			/* Look bracket */
			var res = parser.parser_base.constructor.lookToken(parser, "{");
			var look = Runtime.rtl.get(res, 0);
			var find_bracket = Runtime.rtl.get(res, 2);
			if (find_bracket)
			{
				parser = look;
			}
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			item = Runtime.rtl.get(res, 1);
			if (ch3 == "raw")
			{
				item = new Bayrell.Lang.OpCodes.OpHtmlValue(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW,"value":item,"caret_start":caret,"caret_end":parser.caret}));
			}
			else if (ch4 == "json")
			{
				item = new Bayrell.Lang.OpCodes.OpHtmlValue(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON,"value":item,"caret_start":caret,"caret_end":parser.caret}));
			}
			else if (ch4 == "html")
			{
				item = new Bayrell.Lang.OpCodes.OpHtmlValue(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpHtmlValue.KIND_HTML,"value":item,"caret_start":caret,"caret_end":parser.caret}));
			}
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = Runtime.rtl.get(res, 0);
			if (find_bracket)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.get(res, 0);
			}
		}
		return Runtime.Collection.from([parser,item]);
	},
	/**
	 * Read html attribute key
	 */
	readHTMLAttrKey: function(parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var key = "";
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "@")
		{
			parser = look;
			key = "@";
		}
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = Runtime.rtl.get(res, 0);
		ident = Runtime.rtl.get(res, 1);
		key += Runtime.rtl.toStr(ident.value);
		/* Read attr */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (token.content == "-")
		{
			var res = parser.parser_base.constructor.readIdentifier(look);
			parser = Runtime.rtl.get(res, 0);
			ident = Runtime.rtl.get(res, 1);
			key += Runtime.rtl.toStr("-" + Runtime.rtl.toStr(ident.value));
			/* Look next token */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == ":")
		{
			parser = look;
			key += Runtime.rtl.toStr(":");
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			ident = Runtime.rtl.get(res, 1);
			key += Runtime.rtl.toStr(ident.value);
		}
		return Runtime.Collection.from([parser,key]);
	},
	/**
	 * Read html attribute value
	 */
	readHTMLAttrValue: function(parser, attr_key)
	{
		var token = null;
		var look = null;
		var op_code = null;
		var ident = null;
		var pos = parser.caret.pos;
		var content = parser.content;
		var ch = Runtime.rs.substr(content.ref, pos, 1);
		var ch2 = Runtime.rs.substr(content.ref, pos, 2);
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (Runtime.rs.substr(attr_key, 0, 7) == "@event:")
		{
			/* Look token */
			var res = parser.parser_base.constructor.lookToken(parser, "{");
			var look = Runtime.rtl.get(res, 0);
			var token = Runtime.rtl.get(res, 1);
			var is_fn = Runtime.rtl.get(res, 2);
			if (is_fn)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.get(res, 0);
				/* Look token */
				var res = parser.parser_base.constructor.lookToken(parser, "{");
				var look = Runtime.rtl.get(res, 0);
				var token = Runtime.rtl.get(res, 1);
				var find = Runtime.rtl.get(res, 2);
				if (find)
				{
					parser = look;
				}
				/* Add msg to vars */
				var parser_vars = parser.vars;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.concat(Runtime.Dict.from({"component":true,"msg":true})));
				/* Read expression */
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				/* Restore vars */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser_vars);
				/* Parse brackets */
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.get(res, 0);
				if (find)
				{
					var res = parser.parser_base.constructor.matchToken(parser, "}");
					parser = Runtime.rtl.get(res, 0);
				}
			}
			else
			{
				var res = parser.parser_base.constructor.readString(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
			}
		}
		else if (ch == "{")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.get(res, 0);
			/* Look token */
			var res = parser.parser_base.constructor.lookToken(parser, "{");
			var look = Runtime.rtl.get(res, 0);
			var token = Runtime.rtl.get(res, 1);
			var find = Runtime.rtl.get(res, 2);
			if (find)
			{
				parser = look;
			}
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = Runtime.rtl.get(res, 0);
			if (find)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.get(res, 0);
			}
		}
		else if (token.content == "@")
		{
			var res = this.readHTMLValue(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		else if (token.content == "[")
		{
			var res = parser.parser_base.constructor.readCollection(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		else
		{
			var res = parser.parser_base.constructor.readString(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read html attributes
	 */
	readHTMLAttrs: function(parser)
	{
		var items = new Runtime.Vector();
		var token = null;
		var look = null;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
		var ch = Runtime.rs.substr(content.ref, caret.pos, 1);
		while (ch != "/" && ch != ">" && caret.pos < content_sz)
		{
			var caret_start = caret;
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "...")
			{
				var ident = null;
				var res = parser.parser_base.constructor.matchToken(parser, "...");
				parser = Runtime.rtl.get(res, 0);
				var res = parser.parser_base.constructor.readIdentifier(look);
				parser = Runtime.rtl.get(res, 0);
				ident = Runtime.rtl.get(res, 1);
				items.pushValue(new Bayrell.Lang.OpCodes.OpHtmlAttribute(Runtime.Dict.from({"value":ident,"is_spread":true,"caret_start":caret_start,"caret_end":parser.caret})));
			}
			else
			{
				var res = this.readHTMLAttrKey(parser);
				parser = Runtime.rtl.get(res, 0);
				var key = Runtime.rtl.get(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, "=");
				parser = Runtime.rtl.get(res, 0);
				var res = this.readHTMLAttrValue(parser, key);
				parser = Runtime.rtl.get(res, 0);
				var value = Runtime.rtl.get(res, 1);
				items.pushValue(new Bayrell.Lang.OpCodes.OpHtmlAttribute(Runtime.Dict.from({"key":key,"value":value,"caret_start":caret_start,"caret_end":parser.caret})));
			}
			caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
			ch = Runtime.rs.substr(content.ref, caret.pos, 1);
			var ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
			if (ch2 == "/>")
			{
				break;
			}
		}
		return Runtime.Collection.from([parser,items.toCollection()]);
	},
	/**
	 * Read html template
	 */
	readHTMLContent: function(parser, end_tag)
	{
		var items = new Runtime.Vector();
		var item = null;
		var token = null;
		var look = null;
		var caret = null;
		var caret_start = parser.caret;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var start_pos = pos;
		var end_tag_sz = Runtime.rs.strlen(end_tag);
		var ch_pos = Runtime.rs.substr(content.ref, pos, end_tag_sz);
		var flag_first = true;
		var first_html_tag = false;
		if (end_tag == "")
		{
			first_html_tag = true;
		}
		while ((end_tag == "" || end_tag != "" && ch_pos != end_tag) && pos < content_sz)
		{
			var ch = Runtime.rs.substr(content.ref, pos, 1);
			var ch2 = Runtime.rs.substr(content.ref, pos, 2);
			var ch3 = Runtime.rs.substr(content.ref, pos, 3);
			var ch4 = Runtime.rs.substr(content.ref, pos, 4);
			var ch6 = Runtime.rs.substr(content.ref, pos, 6);
			var ch7 = Runtime.rs.substr(content.ref, pos, 7);
			/* Html comment */
			if (ch4 == "<!--")
			{
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
				caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				value = Runtime.rs.trim(value, "\t\r\n");
				value = Runtime.rs.trim(value, " ");
				if (value != "")
				{
					item = new Bayrell.Lang.OpCodes.OpHtmlContent(Runtime.Dict.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.pushValue(item);
				}
				/* Read HTML Comment */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readHTMLComment(parser);
				parser = Runtime.rtl.get(res, 0);
				items.pushValue(Runtime.rtl.get(res, 1));
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch == "<" || ch2 == "{{" || ch == "@")
			{
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
				caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				value = Runtime.rs.trim(value, "\t\r\n");
				if (flag_first && first_html_tag)
				{
					value = Runtime.rs.trim(value, " ");
				}
				if (value != "")
				{
					item = new Bayrell.Lang.OpCodes.OpHtmlContent(Runtime.Dict.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.pushValue(item);
				}
				/* Read HTML Value */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readHTMLValue(parser);
				parser = Runtime.rtl.get(res, 0);
				item = Runtime.rtl.get(res, 1);
				items.pushValue(item);
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch3 == "%if" || ch4 == "%for" || ch4 == "%var" || ch4 == "%set" || ch6 == "%while" || ch7 == "%render")
			{
				var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
				caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				value = Runtime.rs.trim(value, "\t\r\n");
				value = Runtime.rs.trim(value, " ");
				if (value != "")
				{
					item = new Bayrell.Lang.OpCodes.OpHtmlContent(Runtime.Dict.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.pushValue(item);
				}
				/* Read HTML Operator */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["caret"]), caret);
				var res = this.readHTMLOperator(parser);
				parser = Runtime.rtl.get(res, 0);
				item = Runtime.rtl.get(res, 1);
				items.pushValue(item);
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				if (first_html_tag && ch != " " && ch != "\t" && ch != "\r" && ch != "\n")
				{
					break;
				}
				x = parser.parser_base.constructor.nextX(parser, ch, x);
				y = parser.parser_base.constructor.nextY(parser, ch, y);
				pos = pos + 1;
			}
			ch_pos = Runtime.rs.substr(content.ref, pos, end_tag_sz);
		}
		/* Push item */
		var value = Runtime.rs.substr(content.ref, start_pos, pos - start_pos);
		value = Runtime.rs.trim(value, "\t\r\n");
		caret = new Bayrell.Lang.Caret(Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		if (first_html_tag)
		{
			value = Runtime.rs.trim(value, " ");
		}
		if (value != "")
		{
			item = new Bayrell.Lang.OpCodes.OpHtmlContent(Runtime.Dict.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
			items.pushValue(item);
		}
		return Runtime.Collection.from([parser.copy(Runtime.Dict.from({"caret":caret})),items]);
	},
	/**
	 * Read html tag
	 */
	readHTMLTag: function(parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var caret_items_start = null;
		var caret_items_end = null;
		var caret_start = parser.caret;
		var items = null;
		var op_code_name = null;
		var is_single_flag = false;
		var op_code_flag = false;
		var tag_name = "";
		/* Tag start */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.get(res, 0);
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "{")
		{
			op_code_flag = true;
			var caret1 = parser.caret;
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code_name = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = Runtime.rtl.get(res, 0);
			var caret2 = parser.caret;
			tag_name = Runtime.rs.substr(parser.content.ref, caret1.pos, caret2.pos - caret1.pos);
		}
		else if (token.content == ">")
		{
			op_code_flag = true;
			tag_name = "";
		}
		else
		{
			var res = parser.parser_base.constructor.readIdentifier(parser, false);
			parser = Runtime.rtl.get(res, 0);
			ident = Runtime.rtl.get(res, 1);
			tag_name = ident.value;
		}
		var res = this.readHTMLAttrs(parser);
		parser = Runtime.rtl.get(res, 0);
		var attrs = Runtime.rtl.get(res, 1);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "/")
		{
			parser = look;
			is_single_flag = true;
		}
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.get(res, 0);
		if (!is_single_flag)
		{
			if (tag_name == "svg")
			{
				var res = parser.parser_base.constructor.readUntilStringArr(parser, Runtime.Collection.from(["</svg>"]), false);
				parser = Runtime.rtl.get(res, 0);
				var content = Runtime.rtl.get(res, 1);
				content = Runtime.re.replace("[\t\n]", "", content);
				var items = Runtime.Collection.from([new Bayrell.Lang.OpCodes.OpHtmlValue(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW,"value":new Bayrell.Lang.OpCodes.OpString(Runtime.Dict.from({"caret_start":parser.caret,"caret_end":parser.caret,"value":content})),"caret_start":caret_start,"caret_end":parser.caret}))]);
			}
			else
			{
				/* Read items */
				caret_items_start = parser.caret;
				var res = this.readHTMLContent(parser, "</" + Runtime.rtl.toStr(tag_name));
				parser = Runtime.rtl.get(res, 0);
				var items = Runtime.rtl.get(res, 1);
				caret_items_end = parser.caret;
			}
			/* Tag end */
			if (op_code_flag)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "<");
				parser = Runtime.rtl.get(res, 0);
				var res = parser.parser_base.constructor.matchToken(parser, "/");
				parser = Runtime.rtl.get(res, 0);
				if (tag_name)
				{
					var res = parser.parser_base.constructor.matchString(parser, tag_name);
					parser = Runtime.rtl.get(res, 0);
				}
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = Runtime.rtl.get(res, 0);
			}
			else
			{
				var res = parser.parser_base.constructor.matchToken(parser, "<");
				parser = Runtime.rtl.get(res, 0);
				var res = parser.parser_base.constructor.matchToken(parser, "/");
				parser = Runtime.rtl.get(res, 0);
				if (ident != null)
				{
					var res = parser.parser_base.constructor.matchToken(parser, tag_name);
					parser = Runtime.rtl.get(res, 0);
				}
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = Runtime.rtl.get(res, 0);
			}
		}
		var op_code = new Bayrell.Lang.OpCodes.OpHtmlTag(Runtime.Dict.from({"attrs":attrs,"tag_name":tag_name,"op_code_name":op_code_name,"caret_start":caret_start,"caret_end":parser.caret,"items":(items != null) ? (new Bayrell.Lang.OpCodes.OpHtmlItems(Runtime.Dict.from({"caret_start":caret_items_start,"caret_end":caret_items_end,"items":items.toCollection()}))) : (null)}));
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read html operator
	 */
	readHTMLOperator: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "%if")
		{
			return parser.parser_operator.constructor.readIf(parser);
		}
		else if (token.content == "%for")
		{
			return parser.parser_operator.constructor.readFor(parser);
		}
		else if (token.content == "%while")
		{
			return parser.parser_operator.constructor.readWhile(parser);
		}
		else if (token.content == "%var")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.matchToken(parser, "%var");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_operator.constructor.readAssign(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = Runtime.rtl.get(res, 0);
			return Runtime.Collection.from([parser,op_code]);
		}
		else if (token.content == "%set")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.matchToken(parser, "%set");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_operator.constructor.readAssign(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = Runtime.rtl.get(res, 0);
			return Runtime.Collection.from([parser,op_code]);
		}
		else if (token.content == "%render")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.matchToken(parser, "%render");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_base.constructor.readDynamic(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
			if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
			{
				op_code = Runtime.rtl.setAttr(op_code, Runtime.Collection.from(["is_html"]), true);
			}
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = Runtime.rtl.get(res, 0);
			return Runtime.Collection.from([parser,op_code]);
		}
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read html operator
	 */
	readHTML: function(parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "";
		var caret_start = parser.caret;
		/* Enable html flag */
		var save_is_html = parser.is_html;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_html"]), true);
		var res = this.readHTMLContent(parser, end_tag);
		parser = Runtime.rtl.get(res, 0);
		var items = Runtime.rtl.get(res, 1);
		var op_code = new Bayrell.Lang.OpCodes.OpHtmlItems(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"items":items}));
		/* Disable html flag */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_html"]), save_is_html);
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read html operator
	 */
	readHTMLTemplate: function(parser, item_attrs, caret_start)
	{
		var fn_name = item_attrs.get("name", "render");
		var fn_args_str = item_attrs.get("args", "");
		var parser2_vars = Runtime.Dict.from({});
		/*
		Collection<OpDeclareFunctionArg> fn_args =
		[
			new OpDeclareFunctionArg
			{
				"name": "component",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "layout",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "model_path",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "render_params",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "render_content",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
		];
		*/
		var fn_args = Runtime.Collection.from([]);
		if (item_attrs.has("args"))
		{
			var parser2 = parser.constructor.setContent(parser, fn_args_str);
			parser2 = Runtime.rtl.setAttr(parser2, Runtime.Collection.from(["caret"]), new Bayrell.Lang.Caret(Runtime.Dict.from({})));
			/* Parse args */
			var res = parser.parser_operator.constructor.readDeclareFunctionArgs(parser2, false, false);
			parser2 = Runtime.rtl.get(res, 0);
			var fn_args2 = Runtime.rtl.get(res, 1);
			parser2_vars = parser2.vars;
			fn_args = fn_args.concat(fn_args2);
		}
		/* Register variable in parser */
		parser2_vars = parser2_vars.setIm("layout", true).setIm("model", true).setIm("model_path", true).setIm("render_params", true).setIm("render_content", true);
		/* Read template content */
		var save_vars = parser.vars;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.concat(parser2_vars));
		var res = this.readHTML(parser, "</template");
		parser = Runtime.rtl.get(res, 0);
		var expression = Runtime.rtl.get(res, 1);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		/* Read template footer */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "/");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "template");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.get(res, 0);
		var f = new Bayrell.Lang.OpCodes.OpDeclareFunction(Runtime.Dict.from({"args":fn_args,"vars":Runtime.Collection.from([]),"flags":new Bayrell.Lang.OpCodes.OpFlags(Runtime.Dict.from({"p_static":true,"p_pure":true})),"name":fn_name,"result_type":"html","is_html":true,"expression":expression,"items":null,"caret_start":caret_start,"caret_end":parser.caret}));
		return Runtime.Collection.from([parser,f]);
	},
	/**
	 * Read html attributes
	 */
	readAttrs: function(parser)
	{
		var look = null;
		var op_code = null;
		var token = null;
		var look_token = null;
		var items = new Runtime.Map();
		var content = parser.content;
		var content_sz = parser.content_sz;
		var caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
		var ch = Runtime.rs.substr(content.ref, caret.pos, 1);
		while (ch != "/" && ch != ">" && caret.pos < content_sz)
		{
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "=");
			parser = Runtime.rtl.get(res, 0);
			var attr_name = token.content;
			/* Look token */
			var res = parser.parser_base.constructor.readToken(parser);
			look_token = Runtime.rtl.get(res, 1);
			if (look_token.content == "{")
			{
				var res = parser.parser_base.constructor.readDict(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				caret = parser.caret;
				items.setValue(attr_name, op_code);
			}
			else
			{
				var res = parser.parser_base.constructor.readString(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				items.setValue(attr_name, op_code.value);
			}
			caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
			ch = Runtime.rs.substr(content.ref, caret.pos, 1);
			var ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
			if (ch2 == "/>")
			{
				break;
			}
		}
		return Runtime.Collection.from([parser,items.toDict()]);
	},
	/**
	 * Read UI
	 */
	readUIClass: function(parser)
	{
		var items = new Runtime.Vector();
		var components = new Runtime.Vector();
		var class_caret_start = parser.caret;
		var token = null;
		var class_name = "";
		var class_extends = "";
		var class_version = "";
		var class_model = "";
		var item_name = "";
		var namespace_name = "";
		var short_name = "";
		var full_name = "";
		var is_component = "";
		var class_name_last = "";
		var class_annotations = new Runtime.Vector();
		/* Content */
		var content = parser.content;
		var content_sz = parser.content_sz;
		/* Read class header */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "class");
		parser = Runtime.rtl.get(res, 0);
		var res = this.readAttrs(parser);
		parser = Runtime.rtl.get(res, 0);
		var attrs = Runtime.rtl.get(res, 1);
		class_name = attrs.get("name", "");
		class_extends = attrs.get("extends", "Runtime.Web.Component");
		class_version = attrs.get("version", "1.0");
		class_model = attrs.get("model", "Runtime.Dict");
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.get(res, 0);
		var getClassShortName = (class_name) => 
		{
			var __v0 = new Runtime.Monad(class_name);
			var __v1 = (__varg0) => Runtime.rs.split("\\.", __varg0);
			__v0 = __v0.call(__v1);
			try{ __v0=(__v0.val!=null && __v0.err==null) ? new Runtime.Monad(__v0.val.last()) : __v0; } catch (err) { __v0=new Runtime.Monad(null, err); }
			return __v0.value();
		};
		if (class_name != "")
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(getClassShortName(class_name), class_name));
		}
		if (class_extends != "")
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(getClassShortName(class_extends), class_extends));
			if (class_extends != "Runtime.Web.Component")
			{
				components.pushValue(class_extends);
			}
		}
		if (class_model != "" && class_model != "Runtime.Dict")
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(getClassShortName(class_model), class_model));
		}
		var class_name_arr = Runtime.rs.split("\\.", class_name);
		class_name_last = class_name_arr.last();
		class_name_arr = class_name_arr.removeLastIm();
		namespace_name = Runtime.rs.join(".", class_name_arr);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_name"]), class_name_last);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_namespace_name"]), namespace_name);
		var class_extend_op_code = new Bayrell.Lang.OpCodes.OpTypeIdentifier(Runtime.Dict.from({"entity_name":new Bayrell.Lang.OpCodes.OpEntityName(Runtime.Dict.from({"caret_start":class_caret_start,"caret_end":parser.caret,"names":Runtime.rs.split("\\.", class_extends)})),"template":null,"caret_start":class_caret_start,"caret_end":parser.caret}));
		/* Read class body */
		var caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
		var ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
		while (ch2 != "</" && caret.pos < content_sz)
		{
			var parser_start = parser;
			var caret_start = parser.caret;
			var res = parser.parser_base.constructor.matchToken(parser, "<");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.get(res, 0);
			var item_token = Runtime.rtl.get(res, 1);
			item_name = item_token.content;
			/* Html comment */
			if (item_name == "!--")
			{
				var res = this.readHTMLComment(parser_start);
				parser = Runtime.rtl.get(res, 0);
				items.pushValue(Runtime.rtl.get(res, 1));
				caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
				ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
				continue;
			}
			var res = this.readAttrs(parser);
			parser = Runtime.rtl.get(res, 0);
			var item_attrs = Runtime.rtl.get(res, 1);
			if (item_name == "annotation")
			{
				var annotation_name = item_attrs.get("name", "");
				var annotation_op_code = item_attrs.get("value", null);
				class_annotations.pushValue(new Bayrell.Lang.OpCodes.OpAnnotation(Runtime.Dict.from({"name":new Bayrell.Lang.OpCodes.OpTypeIdentifier(Runtime.Dict.from({"entity_name":new Bayrell.Lang.OpCodes.OpEntityName(Runtime.Dict.from({"names":Runtime.rs.split("\\.", annotation_name)}))})),"params":annotation_op_code})));
			}
			else if (item_name == "use")
			{
				full_name = item_attrs.get("name", "");
				short_name = item_attrs.get("as", "");
				is_component = item_attrs.get("component", "false");
				if (short_name == "")
				{
					short_name = Runtime.rs.explode(".", full_name).last();
				}
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(short_name, full_name));
				if (is_component == "true" || is_component == "1")
				{
					components.pushValue(full_name);
				}
			}
			/* Read body */
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == ">")
			{
				if (item_name == "template")
				{
					var res = this.readHTMLTemplate(parser, item_attrs, caret_start);
					parser = Runtime.rtl.get(res, 0);
					var op_code = Runtime.rtl.get(res, 1);
					items.pushValue(op_code);
				}
				else if (item_name == "style")
				{
					var res = this.readStyle(parser, item_attrs, items, caret_start);
					parser = Runtime.rtl.get(res, 0);
					var op_code = Runtime.rtl.get(res, 1);
					var find_pos = Runtime.rtl.get(res, 2);
					if (find_pos == -1)
					{
						items.pushValue(op_code);
					}
					else
					{
						items.setValue(find_pos, op_code);
					}
				}
				else if (item_name == "script")
				{
					var res = parser.parser_program.constructor.readClassBody(parser, "</");
					parser = Runtime.rtl.get(res, 0);
					var arr = Runtime.rtl.get(res, 1);
					items.appendVector(arr);
					/* Read script footer */
					var res = parser.parser_base.constructor.matchToken(parser, "<");
					parser = Runtime.rtl.get(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, "/");
					parser = Runtime.rtl.get(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, "script");
					parser = Runtime.rtl.get(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, ">");
					parser = Runtime.rtl.get(res, 0);
				}
				else if (item_name == "meta")
				{
					var res = parser.parser_base.constructor.readDict(parser);
					parser = Runtime.rtl.get(res, 0);
					var arr = Runtime.rtl.get(res, 1);
					/* Read meta footer */
					var res = parser.parser_base.constructor.matchToken(parser, "<");
					parser = Runtime.rtl.get(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, "/");
					parser = Runtime.rtl.get(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, "meta");
					parser = Runtime.rtl.get(res, 0);
					var res = parser.parser_base.constructor.matchToken(parser, ">");
					parser = Runtime.rtl.get(res, 0);
				}
				else
				{
					throw new Bayrell.Lang.Exceptions.ParserError("Unknown identifier '" + Runtime.rtl.toStr(item_name) + Runtime.rtl.toStr("'"), item_token.caret_start, parser.file_name)
				}
			}
			else if (token.content == "/")
			{
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = Runtime.rtl.get(res, 0);
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserError("Unknown identifier '" + Runtime.rtl.toStr(token.content) + Runtime.rtl.toStr("'"), token.caret_start, parser.file_name)
			}
			caret = parser.parser_base.constructor.skipChar(parser, content, parser.caret);
			ch2 = Runtime.rs.substr(content.ref, caret.pos, 2);
		}
		/* Add components function */
		if (components.count() > 0)
		{
			var f = new Bayrell.Lang.OpCodes.OpDeclareFunction(Runtime.Dict.from({"args":Runtime.Collection.from([]),"vars":Runtime.Collection.from([]),"flags":new Bayrell.Lang.OpCodes.OpFlags(Runtime.Dict.from({"p_static":true,"p_pure":true})),"name":"components","result_type":"var","expression":new Bayrell.Lang.OpCodes.OpCollection(Runtime.Dict.from({"caret_start":parser.caret,"caret_end":parser.caret,"values":components.toCollection().map((class_name) => 
			{
				return new Bayrell.Lang.OpCodes.OpString(Runtime.Dict.from({"caret_start":parser.caret,"caret_end":parser.caret,"value":class_name}));
			})})),"items":null,"caret_start":parser.caret,"caret_end":parser.caret}));
			items.pushValue(f);
		}
		/* Read class footer */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "/");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "class");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = Runtime.rtl.get(res, 0);
		/* Analyze class body */
		var class_body = parser.parser_program.constructor.classBodyAnalyze(parser, items);
		return Runtime.Collection.from([parser,Runtime.Collection.from([new Bayrell.Lang.OpCodes.OpNamespace(Runtime.Dict.from({"name":namespace_name})),new Bayrell.Lang.OpCodes.OpDeclareClass(Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpDeclareClass.KIND_CLASS,"name":class_name_last,"is_static":true,"is_declare":false,"class_extends":class_extend_op_code,"class_implements":null,"annotations":Runtime.Collection.from([]),"template":null,"vars":class_body.item("vars"),"annotations":class_annotations.toCollection(),"functions":class_body.item("functions"),"fn_create":class_body.item("fn_create"),"fn_destroy":class_body.item("fn_destroy"),"items":items,"caret_start":class_caret_start,"caret_end":parser.caret}))])]);
	},
	/**
	 * Read UI
	 */
	readUI: function(parser)
	{
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		while (token.content == "<")
		{
			var parser_start = parser;
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "class")
			{
				var res = this.readUIClass(parser_start);
				parser = Runtime.rtl.get(res, 0);
				items.appendVector(Runtime.rtl.get(res, 1));
			}
			else if (token.content == "!--")
			{
				var res = this.readHTMLComment(parser_start);
				parser = Runtime.rtl.get(res, 0);
				items.pushValue(Runtime.rtl.get(res, 1));
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpModule(Runtime.Dict.from({"uses":parser.uses.toDict(),"items":items.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayHtml";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"getCssHash",
			"readCssSelector",
			"readCssBody",
			"readCss",
			"readStyle",
			"readHTMLComment",
			"readHTMLValue",
			"readHTMLAttrKey",
			"readHTMLAttrValue",
			"readHTMLAttrs",
			"readHTMLContent",
			"readHTMLTag",
			"readHTMLOperator",
			"readHTML",
			"readHTMLTemplate",
			"readAttrs",
			"readUIClass",
			"readUI",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayHtml);
window["Bayrell.Lang.LangBay.ParserBayHtml"] = Bayrell.Lang.LangBay.ParserBayHtml;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangBay.ParserBayHtml;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayOperator = function()
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayOperator.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayOperator)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayOperator,
{
	/**
	 * Read return
	 */
	readReturn: function(parser)
	{
		var token = null;
		var op_code = null;
		var look = null;
		var res = parser.parser_base.constructor.matchToken(parser, "return");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content != ";")
		{
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpReturn(Runtime.Dict.from({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read delete
	 */
	readDelete: function(parser)
	{
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(parser, "delete");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readDynamic(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpDelete(Runtime.Dict.from({"op_code":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read throw
	 */
	readThrow: function(parser)
	{
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(parser, "throw");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpThrow(Runtime.Dict.from({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read try
	 */
	readTry: function(parser)
	{
		var look = null;
		var token = null;
		var op_try = null;
		var items = new Runtime.Vector();
		var res = parser.parser_base.constructor.matchToken(parser, "try");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		/* Try */
		var res = this.readOperators(parser);
		parser = Runtime.rtl.get(res, 0);
		op_try = Runtime.rtl.get(res, 1);
		/* Catch */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && token.content == "catch")
		{
			parser = look;
			var op_catch = null;
			var var_op_code = null;
			var pattern = null;
			var item_caret_start = token.caret_start;
			/* Read ident */
			var res = parser.parser_base.constructor.matchToken(parser, "(");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_base.constructor.readTypeIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			pattern = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			var_op_code = Runtime.rtl.get(res, 1);
			var var_name = var_op_code.value;
			var res = parser.parser_base.constructor.matchToken(parser, ")");
			parser = Runtime.rtl.get(res, 0);
			/* Save vars */
			var save_vars = parser.vars;
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
			/* Catch operators */
			var res = this.readOperators(parser);
			parser = Runtime.rtl.get(res, 0);
			op_catch = Runtime.rtl.get(res, 1);
			/* Restore vars */
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
			var item = new Bayrell.Lang.OpCodes.OpTryCatchItem(Runtime.Dict.from({"name":var_name,"pattern":pattern,"value":op_catch,"caret_start":item_caret_start,"caret_end":parser.caret}));
			items.pushValue(item);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpTryCatch(Runtime.Dict.from({"op_try":op_try,"items":items.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read then
	 */
	readThen: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "then")
		{
			return Runtime.Collection.from([look,token]);
		}
		return Runtime.Collection.from([parser,token]);
	},
	/**
	 * Read do
	 */
	readDo: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "do")
		{
			return Runtime.Collection.from([look,token]);
		}
		return Runtime.Collection.from([parser,token]);
	},
	/**
	 * Read if
	 */
	readIf: function(parser)
	{
		var look = null;
		var look2 = null;
		var token = null;
		var token2 = null;
		var if_condition = null;
		var if_true = null;
		var if_false = null;
		var if_else = new Runtime.Vector();
		var res = parser.parser_base.constructor.matchToken(parser, (parser.is_html) ? ("%if") : ("if"));
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		/* Read expression */
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.get(res, 0);
		if_condition = Runtime.rtl.get(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = Runtime.rtl.get(res, 0);
		var res = this.readThen(parser);
		parser = Runtime.rtl.get(res, 0);
		/* If true */
		var res = this.readOperators(parser);
		parser = Runtime.rtl.get(res, 0);
		if_true = Runtime.rtl.get(res, 1);
		/* Else */
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && (parser.is_html && (token.content == "%else" || token.content == "%elseif") || !parser.is_html && (token.content == "else" || token.content == "elseif")))
		{
			var res = parser.parser_base.constructor.readToken(look);
			look2 = Runtime.rtl.get(res, 0);
			token2 = Runtime.rtl.get(res, 1);
			if (token.content == "%elseif" || token.content == "elseif" || token.content == "else" && token2.content == "if" || token.content == "%else" && token2.content == "if")
			{
				var ifelse_condition = null;
				var ifelse_block = null;
				if (token.content == "elseif")
				{
					parser = look;
				}
				else if (token2.content == "%elseif")
				{
					parser = look2;
				}
				else if (token2.content == "if")
				{
					parser = look2;
				}
				else if (token2.content == "%if")
				{
					parser = look2;
				}
				/* Read expression */
				var res = parser.parser_base.constructor.matchToken(parser, "(");
				parser = Runtime.rtl.get(res, 0);
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.get(res, 0);
				ifelse_condition = Runtime.rtl.get(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, ")");
				parser = Runtime.rtl.get(res, 0);
				var res = this.readThen(parser);
				parser = Runtime.rtl.get(res, 0);
				var res = this.readOperators(parser);
				parser = Runtime.rtl.get(res, 0);
				ifelse_block = Runtime.rtl.get(res, 1);
				if_else.pushValue(new Bayrell.Lang.OpCodes.OpIfElse(Runtime.Dict.from({"condition":ifelse_condition,"if_true":ifelse_block,"caret_start":token2.caret_start,"caret_end":parser.caret})));
			}
			else
			{
				var res = this.readOperators(look);
				parser = Runtime.rtl.get(res, 0);
				if_false = Runtime.rtl.get(res, 1);
				break;
			}
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpIf(Runtime.Dict.from({"condition":if_condition,"if_true":if_true,"if_false":if_false,"if_else":if_else.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read For
	 */
	readFor: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var expr1 = null;
		var expr2 = null;
		var expr3 = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.matchToken(parser, (parser.is_html) ? ("%for") : ("for"));
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var res = this.readAssign(parser);
		parser = Runtime.rtl.get(res, 0);
		expr1 = Runtime.rtl.get(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ";");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.get(res, 0);
		expr2 = Runtime.rtl.get(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ";");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var res = this.readOperator(parser);
		parser = Runtime.rtl.get(res, 0);
		expr3 = Runtime.rtl.get(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var res = this.readOperators(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpFor(Runtime.Dict.from({"expr1":expr1,"expr2":expr2,"expr3":expr3,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read While
	 */
	readWhile: function(parser)
	{
		var look = null;
		var token = null;
		var condition = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(parser, (parser.is_html) ? ("%while") : ("while"));
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.get(res, 0);
		condition = Runtime.rtl.get(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = Runtime.rtl.get(res, 0);
		var res = this.readDo(parser);
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var res = this.readOperators(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpWhile(Runtime.Dict.from({"condition":condition,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read While
	 */
	readSafe: function(parser)
	{
		var caret_start = parser.caret;
		var res = parser.parser_base.constructor.matchToken(parser, "safe");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = Runtime.rtl.get(res, 0);
		var res = parser.parser_base.constructor.readDynamic(parser);
		parser = Runtime.rtl.get(res, 0);
		var obj = Runtime.rtl.get(res, 1);
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = Runtime.rtl.get(res, 0);
		var res = this.readOperators(parser);
		parser = Runtime.rtl.get(res, 0);
		var items = Runtime.rtl.get(res, 1);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpSafe(Runtime.Dict.from({"obj":obj,"items":items,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read assign
	 */
	readAssign: function(parser)
	{
		var start = parser;
		var save = null;
		var look = null;
		var token = null;
		var pattern = null;
		var op_code = null;
		var reg_name = null;
		var expression = null;
		var names = null;
		var values = null;
		var kind = Bayrell.Lang.OpCodes.OpAssign.KIND_ASSIGN;
		var var_name = "";
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var_name = op_code.value;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "<=")
		{
			var arr = new Runtime.Vector();
			while (!token.eof && token.content == "<=")
			{
				var name = "";
				parser = look;
				save = parser;
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				if (token.content == "{")
				{
					var res = parser.parser_base.constructor.matchToken(parser, "{");
					parser = Runtime.rtl.get(res, 0);
					var res = parser.parser_expression.constructor.readExpression(parser);
					parser = Runtime.rtl.get(res, 0);
					name = Runtime.rtl.get(res, 1);
					var res = parser.parser_base.constructor.matchToken(parser, "}");
					parser = Runtime.rtl.get(res, 0);
				}
				else if (token.content == "\"" || token.content == "'")
				{
					var res = parser.parser_base.constructor.readString(parser);
					parser = Runtime.rtl.get(res, 0);
					name = Runtime.rtl.get(res, 1);
				}
				else
				{
					var res = parser.parser_base.constructor.readToken(parser);
					parser = Runtime.rtl.get(res, 0);
					token = Runtime.rtl.get(res, 1);
					name = token.content;
				}
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				if (token.content != "<=")
				{
					parser = save;
					break;
				}
				else
				{
					arr.pushValue(name);
				}
			}
			names = arr.toCollection();
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			expression = Runtime.rtl.get(res, 1);
			return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpAssignStruct(Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret,"expression":expression,"var_name":var_name,"names":names}))]);
		}
		if (token.content != "=" && token.content != "+=" && token.content != "-=" && token.content != "~=" && token.content != "." && token.content != "::" && token.content != "[")
		{
			var var_op_code = null;
			kind = Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE;
			values = new Runtime.Vector();
			parser = start;
			var res = parser.parser_base.constructor.readTypeIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			pattern = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			var_op_code = Runtime.rtl.get(res, 1);
			var_name = var_op_code.value;
			/* Read expression */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "=")
			{
				var res = parser.parser_expression.constructor.readExpression(look);
				parser = Runtime.rtl.get(res, 0);
				expression = Runtime.rtl.get(res, 1);
			}
			else
			{
				expression = null;
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
			values.pushValue(new Bayrell.Lang.OpCodes.OpAssignValue(Runtime.Dict.from({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start,"caret_end":parser.caret})));
			/* Look next token */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			while (!token.eof && token.content == ",")
			{
				var res = parser.parser_base.constructor.readIdentifier(look);
				parser = Runtime.rtl.get(res, 0);
				var_op_code = Runtime.rtl.get(res, 1);
				var_name = var_op_code.value;
				/* Read expression */
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				if (token.content == "=")
				{
					var res = parser.parser_expression.constructor.readExpression(look);
					parser = Runtime.rtl.get(res, 0);
					expression = Runtime.rtl.get(res, 1);
				}
				else
				{
					expression = null;
				}
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(var_name, true));
				values.pushValue(new Bayrell.Lang.OpCodes.OpAssignValue(Runtime.Dict.from({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start,"caret_end":parser.caret})));
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
			}
			var_name = "";
			expression = null;
		}
		else
		{
			parser = start;
			kind = Bayrell.Lang.OpCodes.OpAssign.KIND_ASSIGN;
			var op = "";
			var res = parser.parser_base.constructor.readDynamic(parser, 2 | 8);
			parser = Runtime.rtl.get(res, 0);
			var op_code = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.readToken(parser);
			parser = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "=" || token.content == "+=" || token.content == "-=" || token.content == "~=")
			{
				op = token.content;
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserError("Unknown operator " + Runtime.rtl.toStr(token.content), token.caret_start, parser.file_name)
			}
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			expression = Runtime.rtl.get(res, 1);
			values = Runtime.Collection.from([new Bayrell.Lang.OpCodes.OpAssignValue(Runtime.Dict.from({"op_code":op_code,"expression":expression,"op":op}))]);
			var_name = "";
			expression = null;
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpAssign(Runtime.Dict.from({"pattern":pattern,"values":(values != null) ? (values.toCollection()) : (null),"caret_start":caret_start,"caret_end":parser.caret,"expression":expression,"var_name":var_name,"names":names,"kind":kind}))]);
	},
	/**
	 * Read operator
	 */
	readInc: function(parser)
	{
		var look = null;
		var look1 = null;
		var look2 = null;
		var token = null;
		var token1 = null;
		var token2 = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look1 = Runtime.rtl.get(res, 0);
		token1 = Runtime.rtl.get(res, 1);
		var caret_start = token1.caret_start;
		var res = parser.parser_base.constructor.readToken(look1);
		look2 = Runtime.rtl.get(res, 0);
		token2 = Runtime.rtl.get(res, 1);
		var look1_content = token1.content;
		var look2_content = token2.content;
		if ((look1_content == "++" || look1_content == "--") && parser.parser_base.constructor.isIdentifier(look2_content))
		{
			parser = look2;
			var op_code = new Bayrell.Lang.OpCodes.OpIdentifier(Runtime.Dict.from({"value":look2_content,"caret_start":token2.caret_start,"caret_end":token2.caret_end}));
			op_code = new Bayrell.Lang.OpCodes.OpInc(Runtime.Dict.from({"kind":(look1_content == "++") ? (Bayrell.Lang.OpCodes.OpInc.KIND_PRE_INC) : (Bayrell.Lang.OpCodes.OpInc.KIND_PRE_DEC),"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}));
			return Runtime.Collection.from([parser,op_code]);
		}
		if ((look2_content == "++" || look2_content == "--") && parser.parser_base.constructor.isIdentifier(look1_content))
		{
			parser = look2;
			var op_code = new Bayrell.Lang.OpCodes.OpIdentifier(Runtime.Dict.from({"value":look1_content,"caret_start":token1.caret_start,"caret_end":token1.caret_end}));
			op_code = new Bayrell.Lang.OpCodes.OpInc(Runtime.Dict.from({"kind":(look2_content == "++") ? (Bayrell.Lang.OpCodes.OpInc.KIND_POST_INC) : (Bayrell.Lang.OpCodes.OpInc.KIND_POST_DEC),"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}));
			return Runtime.Collection.from([parser,op_code]);
		}
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read call function
	 */
	readCallFunction: function(parser)
	{
		var op_code = null;
		var res = parser.parser_base.constructor.readDynamic(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		if (op_code instanceof Bayrell.Lang.OpCodes.OpCall || op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			return Runtime.Collection.from([parser,op_code]);
		}
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read operator
	 */
	readOperator: function(parser)
	{
		var look = null;
		var token = null;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		if (token.content == "/")
		{
			return parser.parser_base.constructor.readComment(parser);
		}
		else if (token.content == "#switch" || token.content == "#ifcode")
		{
			return parser.parser_preprocessor.constructor.readPreprocessor(parser);
		}
		else if (token.content == "#ifdef")
		{
			return parser.parser_preprocessor.constructor.readPreprocessorIfDef(parser, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR);
		}
		else if (token.content == "break")
		{
			return Runtime.Collection.from([look,new Bayrell.Lang.OpCodes.OpBreak(Runtime.Dict.from({"caret_start":caret_start,"caret_end":look.caret}))]);
		}
		else if (token.content == "continue")
		{
			return Runtime.Collection.from([look,new Bayrell.Lang.OpCodes.OpContinue(Runtime.Dict.from({"caret_start":caret_start,"caret_end":look.caret}))]);
		}
		else if (token.content == "delete")
		{
			return this.readDelete(parser);
		}
		else if (token.content == "return")
		{
			return this.readReturn(parser);
		}
		else if (token.content == "throw")
		{
			return this.readThrow(parser);
		}
		else if (token.content == "try")
		{
			return this.readTry(parser);
		}
		else if (token.content == "if")
		{
			return this.readIf(parser);
		}
		else if (token.content == "for")
		{
			return this.readFor(parser);
		}
		else if (token.content == "while")
		{
			return this.readWhile(parser);
		}
		else if (token.content == "safe")
		{
			return this.readSafe(parser);
		}
		var op_code = null;
		/* Read op inc */
		var res = this.readInc(parser);
		look = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		if (op_code != null)
		{
			return res;
		}
		/* Read op call function */
		var res = this.readCallFunction(parser);
		look = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		if (op_code != null)
		{
			return res;
		}
		var save_parser = parser;
		/* Try to read pipe */
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var caret_start = op_code.caret_start;
		var var_name = op_code.value;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "|>")
		{
			return parser.parser_expression.constructor.ExpressionPipe(save_parser);
		}
		parser = save_parser;
		return this.readAssign(parser);
	},
	/**
	 * Read operators
	 */
	readOpItems: function(parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "}";
		var look = null;
		var token = null;
		var op_code = null;
		var arr = new Runtime.Vector();
		var caret_start = parser.caret;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		while (!token.eof && token.content != end_tag)
		{
			var parser_value = null;
			var res = this.readOperator(parser);
			parser = Runtime.rtl.get(res, 0);
			parser_value = Runtime.rtl.get(res, 1);
			if (parser_value != null)
			{
				arr.pushValue(parser_value);
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
			if (token.content == ";")
			{
				parser = look;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
			}
		}
		op_code = new Bayrell.Lang.OpCodes.OpItems(Runtime.Dict.from({"items":arr.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}));
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read operators
	 */
	readOperators: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		if (!parser.is_html)
		{
			if (token.content == "{")
			{
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.get(res, 0);
				var res = this.readOpItems(parser, "}");
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.get(res, 0);
			}
			else
			{
				var res = this.readOperator(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, ";");
				parser = Runtime.rtl.get(res, 0);
			}
		}
		else
		{
			if (token.content == "{")
			{
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = Runtime.rtl.get(res, 0);
				var res = parser.parser_html.constructor.readHTML(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = Runtime.rtl.get(res, 0);
			}
			else
			{
				var res = parser.parser_html.constructor.readHTML(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
			}
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read flags
	 */
	readFlags: function(parser)
	{
		var look = null;
		var token = null;
		var values = new Runtime.Map();
		var current_flags = Bayrell.Lang.OpCodes.OpFlags.getFlags();
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && current_flags.indexOf(token.content) >= 0)
		{
			var flag = token.content;
			values.setValue("p_" + Runtime.rtl.toStr(flag), true);
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpFlags(values)]);
	},
	/**
	 * Read function args
	 */
	readDeclareFunctionArgs: function(parser, find_ident, flag_match)
	{
		if (find_ident == undefined) find_ident = true;
		if (flag_match == undefined) flag_match = true;
		var res = null;
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		if (flag_match)
		{
			res = parser.parser_base.constructor.matchToken(parser, "(");
			parser = Runtime.rtl.get(res, 0);
		}
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (!token.eof && token.content != ")")
		{
			var arg_value = null;
			var arg_pattern = null;
			var arg_expression = null;
			var arg_start = parser;
			/* Arg type */
			var res = parser.parser_base.constructor.readTypeIdentifier(parser, find_ident);
			parser = Runtime.rtl.get(res, 0);
			arg_pattern = Runtime.rtl.get(res, 1);
			/* Arg name */
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			arg_value = Runtime.rtl.get(res, 1);
			var arg_name = arg_value.value;
			/* Arg expression */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "=")
			{
				parser = look;
				var save_vars = parser.vars;
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), new Runtime.Dict());
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = Runtime.rtl.get(res, 0);
				arg_expression = Runtime.rtl.get(res, 1);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
			}
			/* Register variable in parser */
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(arg_name, true));
			items.pushValue(new Bayrell.Lang.OpCodes.OpDeclareFunctionArg(Runtime.Dict.from({"pattern":arg_pattern,"name":arg_name,"expression":arg_expression,"caret_start":arg_pattern.caret_start,"caret_end":parser.caret})));
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == ",")
			{
				parser = look;
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
			}
		}
		if (flag_match)
		{
			res = parser.parser_base.constructor.matchToken(parser, ")");
			parser = Runtime.rtl.get(res, 0);
		}
		return Runtime.Collection.from([parser,items.toCollection()]);
	},
	/**
	 * Read function variables
	 */
	readDeclareFunctionUse: function(parser, vars, find_ident)
	{
		if (vars == undefined) vars = null;
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "use")
		{
			parser = look;
			var res = parser.parser_base.constructor.matchToken(parser, "(");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			while (!token.eof && token.content != ")")
			{
				var ident = null;
				var res = parser.parser_base.constructor.readIdentifier(parser);
				parser = Runtime.rtl.get(res, 0);
				ident = Runtime.rtl.get(res, 1);
				var name = ident.value;
				if (vars != null && find_ident)
				{
					if (!vars.has(name))
					{
						throw new Bayrell.Lang.Exceptions.ParserError("Unknown identifier '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("'"), ident.caret_start, parser.file_name)
					}
				}
				items.pushValue(name);
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				if (token.content == ",")
				{
					parser = look;
					var res = parser.parser_base.constructor.readToken(parser);
					look = Runtime.rtl.get(res, 0);
					token = Runtime.rtl.get(res, 1);
				}
			}
			var res = parser.parser_base.constructor.matchToken(parser, ")");
			parser = Runtime.rtl.get(res, 0);
		}
		return Runtime.Collection.from([parser,items.toCollection()]);
	},
	/**
	 * Read function
	 */
	readDeclareFunction: function(parser, has_name)
	{
		if (has_name == undefined) has_name = true;
		var look = null;
		var parser_value = null;
		var op_code = null;
		var token = null;
		var flags = null;
		/* Clear vars */
		var save_is_html = parser.is_html;
		var save_vars = parser.vars;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), new Runtime.Dict());
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_html"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "async")
		{
			parser = look;
			flags = new Bayrell.Lang.OpCodes.OpFlags(Runtime.Dict.from({"p_async":true}));
		}
		var res = parser.parser_base.constructor.readTypeIdentifier(parser);
		parser = Runtime.rtl.get(res, 0);
		parser_value = Runtime.rtl.get(res, 1);
		var caret_start = parser_value.caret_start;
		var result_type = parser_value;
		var expression = null;
		var is_context = true;
		var name = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "@")
		{
			is_context = false;
			parser = look;
		}
		if (has_name)
		{
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			parser_value = Runtime.rtl.get(res, 1);
			var name = parser_value.value;
		}
		/* Read function arguments */
		var args = null;
		var res = this.readDeclareFunctionArgs(parser);
		parser = Runtime.rtl.get(res, 0);
		args = Runtime.rtl.get(res, 1);
		/* Read function variables */
		var vars = null;
		var res = this.readDeclareFunctionUse(parser, save_vars);
		parser = Runtime.rtl.get(res, 0);
		vars = Runtime.rtl.get(res, 1);
		/* Add variables */
		vars.each((name) => 
		{
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.setIm(name, true));
		});
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "=>")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "=>");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			expression = Runtime.rtl.get(res, 1);
			op_code = null;
		}
		else if (token.content == "{")
		{
			var save = parser;
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = Runtime.rtl.get(res, 0);
			var res = this.readOperators(save);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
		}
		else if (token.content == ";")
		{
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = Runtime.rtl.get(res, 0);
			expression = null;
			op_code = null;
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["is_html"]), save_is_html);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpDeclareFunction(Runtime.Dict.from({"args":args,"vars":vars,"flags":flags,"name":name,"is_context":is_context,"result_type":result_type,"expression":expression,"items":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Returns true if next is function
	 */
	tryReadFunction: function(parser, has_name, flags)
	{
		if (has_name == undefined) has_name = true;
		if (flags == undefined) flags = null;
		var look = null;
		var parser_value = null;
		var token = null;
		/* Clear vars */
		var save_vars = parser.vars;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), new Runtime.Dict());
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
		var res = false;
		try
		{
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "async")
			{
				parser = look;
			}
			var res = parser.parser_base.constructor.readTypeIdentifier(parser, false);
			parser = Runtime.rtl.get(res, 0);
			parser_value = Runtime.rtl.get(res, 1);
			var caret_start = parser_value.caret_start;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "@")
			{
				parser = look;
			}
			if (has_name)
			{
				var res = parser.parser_base.constructor.readIdentifier(parser);
				parser = Runtime.rtl.get(res, 0);
			}
			var res = this.readDeclareFunctionArgs(parser, false);
			parser = Runtime.rtl.get(res, 0);
			var res = this.readDeclareFunctionUse(parser, null, false);
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (flags != null && flags.p_declare || parser.current_class_abstract || parser.current_class_declare || parser.current_class_kind == "interface")
			{
				if (token.content != ";")
				{
					throw new Bayrell.Lang.Exceptions.ParserExpected("Function", caret_start, parser.file_name)
				}
			}
			else if (token.content != "=>" && token.content != "{")
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected("Function", caret_start, parser.file_name)
			}
			res = true;
		}
		catch (_ex)
		{
			if (_ex instanceof Bayrell.Lang.Exceptions.ParserExpected)
			{
				var e = _ex;
				
				res = false;
			}
			else
			{
				throw _ex;
			}
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), true);
		return res;
	},
	/**
	 * Read annotation
	 */
	readAnnotation: function(parser)
	{
		var look = null;
		var token = null;
		var name = null;
		var params = null;
		var res = parser.parser_base.constructor.matchToken(parser, "@");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readTypeIdentifier(parser);
		parser = Runtime.rtl.get(res, 0);
		name = Runtime.rtl.get(res, 1);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.readDict(parser);
			parser = Runtime.rtl.get(res, 0);
			params = Runtime.rtl.get(res, 1);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpAnnotation(Runtime.Dict.from({"name":name,"params":params}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayOperator";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"readReturn",
			"readDelete",
			"readThrow",
			"readTry",
			"readThen",
			"readDo",
			"readIf",
			"readFor",
			"readWhile",
			"readSafe",
			"readAssign",
			"readInc",
			"readCallFunction",
			"readOperator",
			"readOpItems",
			"readOperators",
			"readFlags",
			"readDeclareFunctionArgs",
			"readDeclareFunctionUse",
			"readDeclareFunction",
			"tryReadFunction",
			"readAnnotation",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayOperator);
window["Bayrell.Lang.LangBay.ParserBayOperator"] = Bayrell.Lang.LangBay.ParserBayOperator;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangBay.ParserBayOperator;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayPreprocessor = function()
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayPreprocessor.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayPreprocessor)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayPreprocessor,
{
	/**
	 * Read namespace
	 */
	readPreprocessor: function(parser)
	{
		var start = parser;
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "#switch")
		{
			return this.readPreprocessorSwitch(start);
		}
		if (token.content == "#ifcode")
		{
			return this.readPreprocessorIfCode(start);
		}
		return null;
	},
	/**
	 * Read preprocessor switch
	 */
	readPreprocessorSwitch: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var items = new Runtime.Vector();
		/* Save vars */
		var save_vars = parser.vars;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), parser.vars.concat(Runtime.Dict.from({"ES6":true,"NODEJS":true,"JAVASCRIPT":true,"PHP":true,"PYTHON3":true})));
		var res = parser.parser_base.constructor.matchToken(parser, "#switch");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		while (token.content == "#case")
		{
			parser = look;
			/* Skip ifcode */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			if (token.content == "ifcode")
			{
				parser = look;
			}
			/* Read condition */
			var condition = null;
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			condition = Runtime.rtl.get(res, 1);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), true);
			/* Read then */
			var res = parser.parser_base.constructor.matchToken(parser, "then");
			parser = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			/* Read content */
			var content = "";
			var caret_content = parser.caret;
			var res = parser.parser_base.constructor.readUntilStringArr(parser, Runtime.Collection.from(["#case","#endswitch"]), false);
			parser = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
			/* Look content */
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			var ifcode = new Bayrell.Lang.OpCodes.OpPreprocessorIfCode(Runtime.Dict.from({"condition":condition,"content":content,"caret_start":caret_content,"caret_end":parser.caret}));
			items.pushValue(ifcode);
		}
		/* Restore vars */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["vars"]), save_vars);
		/* read endswitch */
		var res = parser.parser_base.constructor.matchToken(parser, "#endswitch");
		parser = Runtime.rtl.get(res, 0);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpPreprocessorSwitch(Runtime.Dict.from({"items":items.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read preprocessor ifcode
	 */
	readPreprocessorIfCode: function(parser)
	{
		var look = null;
		var token = null;
		var caret_start = parser.caret;
		var res = parser.parser_base.constructor.matchToken(parser, "#ifcode");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		/* Read condition */
		var condition = null;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.get(res, 0);
		condition = Runtime.rtl.get(res, 1);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), true);
		/* Read then */
		var res = parser.parser_base.constructor.matchToken(parser, "then");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		/* Read content */
		var content = "";
		var caret_content = parser.caret;
		var res = parser.parser_base.constructor.readUntilStringArr(parser, Runtime.Collection.from(["#endif"]), false);
		parser = Runtime.rtl.get(res, 0);
		content = Runtime.rtl.get(res, 1);
		/* Match endif */
		var res = parser.parser_base.constructor.matchToken(parser, "#endif");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var ifcode = new Bayrell.Lang.OpCodes.OpPreprocessorIfCode(Runtime.Dict.from({"condition":condition,"content":content,"caret_start":caret_content,"caret_end":parser.caret}));
		return Runtime.Collection.from([parser,ifcode]);
	},
	/**
	 * Read preprocessor ifdef
	 */
	readPreprocessorIfDef: function(parser, kind)
	{
		if (kind == undefined) kind = "";
		var items = null;
		var token = null;
		var caret_start = parser.caret;
		var res = parser.parser_base.constructor.matchToken(parser, "#ifdef");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		/* Read condition */
		var condition = null;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), false);
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = Runtime.rtl.get(res, 0);
		condition = Runtime.rtl.get(res, 1);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["find_ident"]), true);
		/* Read then */
		var res = parser.parser_base.constructor.matchToken(parser, "then");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_PROGRAM)
		{
			var res = parser.parser_program.constructor.readProgram(parser, "#endif");
			parser = Runtime.rtl.get(res, 0);
			items = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "#endif");
			parser = Runtime.rtl.get(res, 0);
		}
		else if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_CLASS_BODY)
		{
			var res = parser.parser_program.constructor.readClassBody(parser, "#endif");
			parser = Runtime.rtl.get(res, 0);
			items = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "#endif");
			parser = Runtime.rtl.get(res, 0);
			var d = parser.parser_program.constructor.classBodyAnalyze(parser, items);
			items = d.item("functions");
		}
		else if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR)
		{
			var res = parser.parser_operator.constructor.readOpItems(parser, "#endif");
			parser = Runtime.rtl.get(res, 0);
			items = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "#endif");
			parser = Runtime.rtl.get(res, 0);
		}
		else if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION)
		{
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = Runtime.rtl.get(res, 0);
			items = Runtime.rtl.get(res, 1);
			var res = parser.parser_base.constructor.matchToken(parser, "#endif");
			parser = Runtime.rtl.get(res, 0);
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpPreprocessorIfDef(Runtime.Dict.from({"items":items,"condition":condition,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayPreprocessor";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"readPreprocessor",
			"readPreprocessorSwitch",
			"readPreprocessorIfCode",
			"readPreprocessorIfDef",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayPreprocessor);
window["Bayrell.Lang.LangBay.ParserBayPreprocessor"] = Bayrell.Lang.LangBay.ParserBayPreprocessor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangBay.ParserBayPreprocessor;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayProgram = function()
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayProgram.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayProgram)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayProgram,
{
	/**
	 * Read namespace
	 */
	readNamespace: function(parser)
	{
		var token = null;
		var name = null;
		var res = parser.parser_base.constructor.matchToken(parser, "namespace");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readEntityName(parser, false);
		parser = Runtime.rtl.get(res, 0);
		name = Runtime.rtl.get(res, 1);
		var current_namespace_name = Runtime.rs.join(".", name.names);
		var current_namespace = new Bayrell.Lang.OpCodes.OpNamespace(Runtime.Dict.from({"name":current_namespace_name,"caret_start":caret_start,"caret_end":parser.caret}));
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_namespace"]), current_namespace);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_namespace_name"]), current_namespace_name);
		return Runtime.Collection.from([parser,current_namespace]);
	},
	/**
	 * Read use
	 */
	readUse: function(parser)
	{
		var look = null;
		var token = null;
		var name = null;
		var alias = "";
		var res = parser.parser_base.constructor.matchToken(parser, "use");
		parser = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readEntityName(parser, false);
		parser = Runtime.rtl.get(res, 0);
		name = Runtime.rtl.get(res, 1);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "as")
		{
			var parser_value = null;
			parser = look;
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = Runtime.rtl.get(res, 0);
			parser_value = Runtime.rtl.get(res, 1);
			alias = parser_value.value;
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpUse(Runtime.Dict.from({"name":Runtime.rs.join(".", name.names),"alias":alias,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read class body
	 */
	readClassBody: function(parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "}";
		var look = null;
		var token = null;
		var items = new Runtime.Vector();
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		while (!token.eof && token.content != end_tag)
		{
			var item = null;
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(parser);
				parser = Runtime.rtl.get(res, 0);
				item = Runtime.rtl.get(res, 1);
				if (item != null)
				{
					items.pushValue(item);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(parser);
				parser = Runtime.rtl.get(res, 0);
				item = Runtime.rtl.get(res, 1);
				items.pushValue(item);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				var res = parser.parser_preprocessor.constructor.readPreprocessor(parser);
				parser = Runtime.rtl.get(res, 0);
				item = Runtime.rtl.get(res, 1);
				if (item != null)
				{
					items.pushValue(item);
				}
			}
			else if (token.content == "#ifdef")
			{
				var res = parser.parser_preprocessor.constructor.readPreprocessorIfDef(parser, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_CLASS_BODY);
				parser = Runtime.rtl.get(res, 0);
				item = Runtime.rtl.get(res, 1);
				if (item != null)
				{
					items.pushValue(item);
				}
			}
			else if (token.content == "<")
			{
				break;
			}
			else
			{
				var flags = null;
				var res = parser.parser_operator.constructor.readFlags(parser);
				parser = Runtime.rtl.get(res, 0);
				flags = Runtime.rtl.get(res, 1);
				if (parser.parser_operator.constructor.tryReadFunction(parser, true, flags))
				{
					var res = parser.parser_operator.constructor.readDeclareFunction(parser, true);
					parser = Runtime.rtl.get(res, 0);
					item = Runtime.rtl.get(res, 1);
					if (item.expression != null)
					{
						var res = parser.parser_base.constructor.matchToken(parser, ";");
						parser = Runtime.rtl.get(res, 0);
					}
				}
				else
				{
					var res = parser.parser_operator.constructor.readAssign(parser);
					parser = Runtime.rtl.get(res, 0);
					item = Runtime.rtl.get(res, 1);
					var res = parser.parser_base.constructor.matchToken(parser, ";");
					parser = Runtime.rtl.get(res, 0);
				}
				item = Runtime.rtl.setAttr(item, Runtime.Collection.from(["flags"]), flags);
				if (item != null)
				{
					items.pushValue(item);
				}
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		}
		return Runtime.Collection.from([parser,items.toCollection()]);
	},
	/**
	 * Class body analyze
	 */
	classBodyAnalyze: function(parser, arr)
	{
		var names = new Runtime.Map();
		var vars = new Runtime.Vector();
		var functions = new Runtime.Vector();
		var items = new Runtime.Vector();
		var annotations = new Runtime.Vector();
		var comments = new Runtime.Vector();
		var fn_create = null;
		var fn_destroy = null;
		for (var i = 0;i < arr.count();i++)
		{
			var item = arr.item(i);
			if (item instanceof Bayrell.Lang.OpCodes.OpAnnotation)
			{
				annotations.pushValue(item);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpComment)
			{
				comments.pushValue(item);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpAssign)
			{
				for (var j = 0;j < item.values.count();j++)
				{
					var assign_value = item.values.item(j);
					var value_name = assign_value.var_name;
					if (names.has(value_name))
					{
						throw new Bayrell.Lang.Exceptions.ParserError("Dublicate identifier " + Runtime.rtl.toStr(value_name), assign_value.caret_start, parser.file_name)
					}
					names.setValue(value_name, true);
				}
				item = item.copy(Runtime.Dict.from({"annotations":annotations.toCollection(),"comments":comments.toCollection()}));
				vars.pushValue(item);
				annotations.clear();
				comments.clear();
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
			{
				item = item.copy(Runtime.Dict.from({"annotations":annotations.toCollection(),"comments":comments.toCollection()}));
				if (names.has(item.name))
				{
					throw new Bayrell.Lang.Exceptions.ParserError("Dublicate identifier " + Runtime.rtl.toStr(item.name), item.caret_start, parser.file_name)
				}
				names.setValue(item.name, true);
				if (item.name == "constructor")
				{
					fn_create = item;
				}
				else if (item.name == "destructor")
				{
					fn_destroy = item;
				}
				else
				{
					functions.pushValue(item);
				}
				annotations.clear();
				comments.clear();
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
			{
				var d = this.classBodyAnalyze(parser, item.items);
				var d_vars = Runtime.rtl.get(d, "vars");
				d_vars = d_vars.map((v) => 
				{
					v = Runtime.rtl.setAttr(v, Runtime.Collection.from(["condition"]), item.condition);
					return v;
				});
				vars.appendVector(d_vars);
			}
			else
			{
				items.pushValue(item);
			}
		}
		items.appendVector(comments);
		return Runtime.Dict.from({"annotations":annotations.toCollection(),"comments":comments.toCollection(),"functions":functions.toCollection(),"items":items.toCollection(),"vars":vars.toCollection(),"fn_create":fn_create,"fn_destroy":fn_destroy});
	},
	/**
	 * Read class
	 */
	readClass: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var template = null;
		var is_abstract = false;
		var is_declare = false;
		var is_static = false;
		var is_struct = false;
		var class_kind = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		if (token.content == "abstract")
		{
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			is_abstract = true;
		}
		if (token.content == "declare")
		{
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			is_declare = true;
		}
		if (token.content == "static")
		{
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			is_static = true;
		}
		if (token.content == "class")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "class");
			parser = Runtime.rtl.get(res, 0);
			class_kind = Bayrell.Lang.OpCodes.OpDeclareClass.KIND_CLASS;
		}
		else if (token.content == "struct")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "struct");
			parser = Runtime.rtl.get(res, 0);
			class_kind = Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT;
		}
		else if (token.content == "interface")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "interface");
			parser = Runtime.rtl.get(res, 0);
			class_kind = Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE;
		}
		else
		{
			var res = parser.parser_base.constructor.matchToken(parser, "class");
		}
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = Runtime.rtl.get(res, 0);
		op_code = Runtime.rtl.get(res, 1);
		var class_name = op_code.value;
		/* Set class name */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_abstract"]), is_abstract);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_declare"]), is_declare);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_name"]), class_name);
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["current_class_kind"]), class_kind);
		/* Register module in parser */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(class_name, parser.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(class_name)));
		var save_uses = parser.uses;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "<")
		{
			template = new Runtime.Vector();
			var res = parser.parser_base.constructor.matchToken(parser, "<");
			parser = Runtime.rtl.get(res, 0);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			while (!token.eof && token.content != ">")
			{
				var parser_value = null;
				var res = parser.parser_base.constructor.readIdentifier(parser);
				parser = Runtime.rtl.get(res, 0);
				parser_value = Runtime.rtl.get(res, 1);
				template.pushValue(parser_value);
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(parser_value.value, parser_value.value));
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
				if (token.content != ">")
				{
					var res = parser.parser_base.constructor.matchToken(parser, ",");
					parser = Runtime.rtl.get(res, 0);
					var res = parser.parser_base.constructor.readToken(parser);
					look = Runtime.rtl.get(res, 0);
					token = Runtime.rtl.get(res, 1);
				}
			}
			var res = parser.parser_base.constructor.matchToken(parser, ">");
			parser = Runtime.rtl.get(res, 0);
		}
		var class_extends = null;
		var class_implements = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "extends")
		{
			var res = parser.parser_base.constructor.readTypeIdentifier(look);
			parser = Runtime.rtl.get(res, 0);
			class_extends = Runtime.rtl.get(res, 1);
		}
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		if (token.content == "implements")
		{
			class_implements = new Runtime.Vector();
			var res = parser.parser_base.constructor.readTypeIdentifier(look);
			parser = Runtime.rtl.get(res, 0);
			op_code = Runtime.rtl.get(res, 1);
			class_implements.pushValue(op_code);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			while (!token.eof && token.content == ",")
			{
				parser = look;
				var res = parser.parser_base.constructor.readTypeIdentifier(look);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				class_implements.pushValue(op_code);
				var res = parser.parser_base.constructor.readToken(parser);
				look = Runtime.rtl.get(res, 0);
				token = Runtime.rtl.get(res, 1);
			}
		}
		var arr = null;
		var res = parser.parser_base.constructor.matchToken(parser, "{");
		parser = Runtime.rtl.get(res, 0);
		var res = this.readClassBody(parser);
		parser = Runtime.rtl.get(res, 0);
		arr = Runtime.rtl.get(res, 1);
		var d = this.classBodyAnalyze(parser, arr);
		var res = parser.parser_base.constructor.matchToken(parser, "}");
		parser = Runtime.rtl.get(res, 0);
		var current_class = new Bayrell.Lang.OpCodes.OpDeclareClass(Runtime.Dict.from({"kind":class_kind,"name":class_name,"is_abstract":is_abstract,"is_static":is_static,"is_declare":is_declare,"class_extends":class_extends,"class_implements":(class_implements != null) ? (class_implements.toCollection()) : (null),"template":(template != null) ? (template.toCollection()) : (null),"vars":d.item("vars"),"functions":d.item("functions"),"fn_create":d.item("fn_create"),"fn_destroy":d.item("fn_destroy"),"items":arr,"caret_start":caret_start,"caret_end":parser.caret}));
		/* Restore uses */
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), save_uses);
		return Runtime.Collection.from([parser.copy(Runtime.Dict.from({"current_class":current_class})),current_class]);
	},
	/**
	 * Read program
	 */
	readProgram: function(parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "";
		var look = null;
		var token = null;
		var op_code = null;
		var annotations = new Runtime.Vector();
		var comments = new Runtime.Vector();
		var items = new Runtime.Vector();
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
		var res = parser.parser_base.constructor.readToken(parser);
		look = Runtime.rtl.get(res, 0);
		token = Runtime.rtl.get(res, 1);
		var caret_start = token.caret_start;
		parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		if (token.eof)
		{
			return Runtime.Collection.from([parser,null]);
		}
		if (token.content == "<")
		{
			return parser.parser_html.constructor.readUI(parser);
		}
		while (!token.eof && (end_tag == "" || end_tag != "" && token.content == end_tag))
		{
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				if (op_code != null)
				{
					comments.pushValue(op_code);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				annotations.pushValue(op_code);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				/* Append comments */
				items.appendVector(comments);
				comments.clear();
				var res = parser.parser_preprocessor.constructor.readPreprocessor(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				if (op_code != null)
				{
					items.appendVector(comments);
					items.pushValue(op_code);
				}
			}
			else if (token.content == "#ifdef")
			{
				/* Append comments */
				items.appendVector(comments);
				comments.clear();
				var res = parser.parser_preprocessor.constructor.readPreprocessorIfDef(parser, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_PROGRAM);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				if (op_code != null)
				{
					items.appendVector(comments);
					items.pushValue(op_code);
				}
			}
			else if (token.content == "namespace")
			{
				/* Append comments */
				items.appendVector(comments);
				comments.clear();
				var res = this.readNamespace(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				items.pushValue(op_code);
				var res = parser.parser_base.constructor.matchToken(parser, ";");
				parser = Runtime.rtl.get(res, 0);
			}
			else if (token.content == "use")
			{
				/* Append comments */
				items.appendVector(comments);
				comments.clear();
				var res = this.readUse(parser);
				parser = Runtime.rtl.get(res, 0);
				op_code = Runtime.rtl.get(res, 1);
				var full_name = op_code.name;
				var short_name = "";
				if (op_code.alias == "")
				{
					short_name = Runtime.rs.explode(".", full_name).last();
				}
				else
				{
					short_name = op_code.alias;
				}
				/* Register module in parser */
				parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["uses"]), parser.uses.setIm(short_name, full_name));
				items.pushValue(op_code);
				var res = parser.parser_base.constructor.matchToken(parser, ";");
				parser = Runtime.rtl.get(res, 0);
			}
			else if (token.content == "class" || token.content == "struct" || token.content == "static" || token.content == "declare" || token.content == "interface" || token.content == "abstract")
			{
				var item = null;
				var res = this.readClass(parser);
				parser = Runtime.rtl.get(res, 0);
				item = Runtime.rtl.get(res, 1);
				item = item.copy(Runtime.Dict.from({"annotations":annotations.toCollection(),"comments":comments.toCollection()}));
				items.pushValue(item);
				annotations.clear();
				comments.clear();
			}
			else
			{
				break;
			}
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), false);
			var res = parser.parser_base.constructor.readToken(parser);
			look = Runtime.rtl.get(res, 0);
			token = Runtime.rtl.get(res, 1);
			parser = Runtime.rtl.setAttr(parser, Runtime.Collection.from(["skip_comments"]), true);
		}
		items.appendVector(comments);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpModule(Runtime.Dict.from({"uses":parser.uses.toDict(),"items":items.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayProgram";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"readNamespace",
			"readUse",
			"readClassBody",
			"classBodyAnalyze",
			"readClass",
			"readProgram",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayProgram);
window["Bayrell.Lang.LangBay.ParserBayProgram"] = Bayrell.Lang.LangBay.ParserBayProgram;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangBay.ParserBayProgram;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.AsyncAwait = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.LangES6.AsyncAwait.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.LangES6.AsyncAwait.prototype.constructor = Bayrell.Lang.LangES6.AsyncAwait;
Object.assign(Bayrell.Lang.LangES6.AsyncAwait.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.start_pos = "";
		this.end_pos = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "start_pos")return this.start_pos;
		else if (k == "end_pos")return this.end_pos;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangES6.AsyncAwait, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.LangES6.AsyncAwait,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.AsyncAwait";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("start_pos");
		a.push("end_pos");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "start_pos") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "end_pos") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangES6.AsyncAwait);
window["Bayrell.Lang.LangES6.AsyncAwait"] = Bayrell.Lang.LangES6.AsyncAwait;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangES6.AsyncAwait;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6 = function()
{
	Bayrell.Lang.CoreTranslator.apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6.prototype = Object.create(Bayrell.Lang.CoreTranslator.prototype);
Bayrell.Lang.LangES6.TranslatorES6.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6.prototype,
{
	/**
	 * Returns true if emulate async await
	 */
	isEmulateAsyncAwait: function()
	{
		return this.enable_async_await && this.emulate_async_await;
	},
	/**
	 * Returns true if async await
	 */
	isAsyncAwait: function()
	{
		return this.enable_async_await && !this.emulate_async_await;
	},
	_init: function()
	{
		Bayrell.Lang.CoreTranslator.prototype._init.call(this);
		this.is_pipe = false;
		this.is_call = false;
		this.pipe_var_name = "";
		this.html_var_name = "";
		this.is_html = false;
		this.async_await = null;
		this.expression = null;
		this.html = null;
		this.operator = null;
		this.program = null;
		this.frontend = true;
		this.backend = false;
		this.use_module_name = false;
		this.use_strict = true;
		this.enable_async_await = true;
		this.emulate_async_await = false;
		this.enable_context = false;
		this.enable_check_types = false;
		this.enable_introspection = true;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "is_pipe")return this.is_pipe;
		else if (k == "is_call")return this.is_call;
		else if (k == "pipe_var_name")return this.pipe_var_name;
		else if (k == "html_var_name")return this.html_var_name;
		else if (k == "is_html")return this.is_html;
		else if (k == "async_await")return this.async_await;
		else if (k == "expression")return this.expression;
		else if (k == "html")return this.html;
		else if (k == "operator")return this.operator;
		else if (k == "program")return this.program;
		else if (k == "frontend")return this.frontend;
		else if (k == "backend")return this.backend;
		else if (k == "use_module_name")return this.use_module_name;
		else if (k == "use_strict")return this.use_strict;
		else if (k == "enable_async_await")return this.enable_async_await;
		else if (k == "emulate_async_await")return this.emulate_async_await;
		else if (k == "enable_context")return this.enable_context;
		else if (k == "enable_check_types")return this.enable_check_types;
		else if (k == "enable_introspection")return this.enable_introspection;
		return Bayrell.Lang.CoreTranslator.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6, Bayrell.Lang.CoreTranslator);
Object.assign(Bayrell.Lang.LangES6.TranslatorES6,
{
	/**
	 * Reset translator
	 */
	reset: function(t)
	{
		return t.copy(Runtime.Dict.from({"value":"","current_namespace_name":"","modules":new Runtime.Dict(),"async_await":new Bayrell.Lang.LangES6.TranslatorES6AsyncAwait(),"expression":new Bayrell.Lang.LangES6.TranslatorES6Expression(),"html":new Bayrell.Lang.LangES6.TranslatorES6Html(),"operator":new Bayrell.Lang.LangES6.TranslatorES6Operator(),"program":new Bayrell.Lang.LangES6.TranslatorES6Program(),"save_vars":new Runtime.Collection(),"save_op_codes":new Runtime.Collection(),"save_op_code_inc":0,"preprocessor_flags":Runtime.Dict.from({"ES6":true,"JAVASCRIPT":true,"FRONTEND":t.frontend,"BACKEND":t.backend,"USE_MODULE_NAME":t.use_module_name,"USE_STRICT":t.use_strict,"ENABLE_ASYNC_AWAIT":t.enable_async_await,"EMULATE_ASYNC_AWAIT":t.emulate_async_await,"ENABLE_CONTEXT":t.enable_context,"ENABLE_CHECK_TYPES":t.enable_check_types})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(t, op_code)
	{
		t = this.reset(t);
		return t.program.constructor.translateProgram(t, op_code);
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		var content = "";
		for (var i = 0;i < t.save_op_codes.count();i++)
		{
			if (i < save_op_code_value)
			{
				continue;
			}
			var save = t.save_op_codes.item(i);
			var s = "";
			if (t.is_html)
			{
				s = (save.content == "") ? (t.s("let " + Runtime.rtl.toStr(save.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(save.var_content) + Runtime.rtl.toStr(";"))) : (save.content);
			}
			else
			{
				s = (save.content == "") ? (t.s("var " + Runtime.rtl.toStr(save.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(save.var_content) + Runtime.rtl.toStr(";"))) : (save.content);
			}
			content += Runtime.rtl.toStr(s);
		}
		return content;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("is_pipe");
		a.push("is_call");
		a.push("pipe_var_name");
		a.push("html_var_name");
		a.push("is_html");
		a.push("async_await");
		a.push("expression");
		a.push("html");
		a.push("operator");
		a.push("program");
		a.push("frontend");
		a.push("backend");
		a.push("use_module_name");
		a.push("use_strict");
		a.push("enable_async_await");
		a.push("emulate_async_await");
		a.push("enable_context");
		a.push("enable_check_types");
		a.push("enable_introspection");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "is_pipe") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_call") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pipe_var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html_var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "async_await") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Expression",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Html",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "operator") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Operator",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "program") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Program",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "frontend") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "backend") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "use_module_name") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "use_strict") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_async_await") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "emulate_async_await") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_context") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_check_types") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_introspection") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isEmulateAsyncAwait",
			"isAsyncAwait",
			"reset",
			"translate",
			"outputSaveOpCode",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6);
window["Bayrell.Lang.LangES6.TranslatorES6"] = Bayrell.Lang.LangES6.TranslatorES6;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangES6.TranslatorES6;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.async_stack = new Runtime.Collection();
		this.pos = Runtime.Collection.from([0]);
		this.async_t = "__async_t";
		this.async_var = "__async_var";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "async_stack")return this.async_stack;
		else if (k == "pos")return this.pos;
		else if (k == "async_t")return this.async_t;
		else if (k == "async_var")return this.async_var;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait,
{
	/**
	 * Returns current pos
	 */
	currentPos: function(t)
	{
		return t.expression.constructor.toString(Runtime.rs.join(".", t.async_await.pos));
	},
	/**
	 * Returns current pos
	 */
	nextPos: function(t)
	{
		var pos = t.async_await.pos;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "pos"]), pos.setIm(pos.count() - 1, pos.last() + 1));
		var res = t.expression.constructor.toString(Runtime.rs.join(".", t.async_await.pos));
		return Runtime.Collection.from([t,res]);
	},
	/**
	 * Returns push pos
	 */
	pushPos: function(t)
	{
		var pos = t.async_await.pos;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "pos"]), pos.setIm(pos.count() - 1, pos.last() + 1).pushIm(0));
		var res = t.expression.constructor.toString(Runtime.rs.join(".", t.async_await.pos));
		return Runtime.Collection.from([t,res]);
	},
	/**
	 * Returns inc pos
	 */
	levelIncPos: function(t)
	{
		var pos = t.async_await.pos;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "pos"]), pos.setIm(pos.count() - 1, pos.last()).pushIm(0));
		var res = t.expression.constructor.toString(Runtime.rs.join(".", t.async_await.pos));
		return Runtime.Collection.from([t,res]);
	},
	/**
	 * Returns pop pos
	 */
	popPos: function(t)
	{
		var pos = t.async_await.pos.removeLastIm();
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "pos"]), pos.setIm(pos.count() - 1, pos.last() + 1));
		var res = t.expression.constructor.toString(Runtime.rs.join(".", t.async_await.pos));
		return Runtime.Collection.from([t,res]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var s = "";
		var flag = false;
		if (s == "")
		{
			var res = t.expression.constructor.Dynamic(t, op_code.obj);
			t = Runtime.rtl.get(res, 0);
			s = Runtime.rtl.get(res, 1);
			if (s == "parent")
			{
				s = t.expression.constructor.useModuleName(t, t.current_class_extends_name);
				if (t.current_function.name != "constructor")
				{
					if (t.current_function.isStatic())
					{
						s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(t.current_function.name));
					}
					else
					{
						s += Runtime.rtl.toStr(".prototype." + Runtime.rtl.toStr(t.current_function.name));
					}
				}
				s += Runtime.rtl.toStr(".call(this");
				flag = true;
			}
			else
			{
				s += Runtime.rtl.toStr("(");
			}
		}
		var content = s;
		if (t.current_function.is_context && op_code.is_context)
		{
			content += Runtime.rtl.toStr("ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = t.expression.constructor.Expression(t, item);
			t = Runtime.rtl.get(res, 0);
			var s = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		var res = t.constructor.incSaveOpCode(t);
		t = Runtime.rtl.get(res, 0);
		var var_name = Runtime.rtl.get(res, 1);
		var res = this.nextPos(t);
		t = Runtime.rtl.get(res, 0);
		var next_pos = Runtime.rtl.get(res, 1);
		var async_t = t.async_await.async_t;
		content = t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(next_pos) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr(".call(") + Runtime.rtl.toStr(content) + Runtime.rtl.toStr(",") + Runtime.rtl.toStr(t.expression.constructor.toString(var_name)) + Runtime.rtl.toStr(");"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(next_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = Runtime.rtl.get(res, 0);
		if (is_expression)
		{
			return Runtime.Collection.from([t,async_t + Runtime.rtl.toStr(".getVar(") + Runtime.rtl.toStr(t.expression.constructor.toString(var_name)) + Runtime.rtl.toStr(")")]);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var content = "";
		var var_name = "";
		var flag = false;
		var res = t.expression.constructor.Expression(t, op_code.obj);
		t = Runtime.rtl.get(res, 0);
		var_name = Runtime.rtl.get(res, 1);
		if (op_code.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_METHOD)
		{
			content = var_name + Runtime.rtl.toStr(".constructor.") + Runtime.rtl.toStr(op_code.method_name.value);
		}
		else
		{
			var res = t.expression.constructor.OpTypeIdentifier(t, op_code.class_name);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(op_code.method_name.value);
		}
		var flag = false;
		content += Runtime.rtl.toStr("(");
		if (t.current_function.is_context && op_code.is_context)
		{
			content += Runtime.rtl.toStr("ctx");
			flag = true;
		}
		content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(var_name));
		flag = true;
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = t.expression.constructor.Expression(t, item);
			t = Runtime.rtl.get(res, 0);
			var s1 = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s1));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		var res = t.constructor.incSaveOpCode(t);
		t = Runtime.rtl.get(res, 0);
		var var_name = Runtime.rtl.get(res, 1);
		var res = this.nextPos(t);
		t = Runtime.rtl.get(res, 0);
		var next_pos = Runtime.rtl.get(res, 1);
		var async_t = t.async_await.async_t;
		content = t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(next_pos) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr(".call(") + Runtime.rtl.toStr(content) + Runtime.rtl.toStr(",") + Runtime.rtl.toStr(t.expression.constructor.toString(var_name)) + Runtime.rtl.toStr(");"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(next_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = Runtime.rtl.get(res, 0);
		if (is_expression)
		{
			return Runtime.Collection.from([t,async_t + Runtime.rtl.toStr(".getVar(") + Runtime.rtl.toStr(t.expression.constructor.toString(var_name)) + Runtime.rtl.toStr(")")]);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(t, op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var res = this.pushPos(t);
		t = Runtime.rtl.get(res, 0);
		var start_pos = Runtime.rtl.get(res, 1);
		var res = this.popPos(t);
		save_t = Runtime.rtl.get(res, 0);
		var end_pos = Runtime.rtl.get(res, 1);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "async_stack"]), t.async_await.async_stack.pushIm(new Bayrell.Lang.LangES6.AsyncAwait(Runtime.Dict.from({"start_pos":start_pos,"end_pos":end_pos}))));
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* Start Loop */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* Loop Assign */
		if (op_code.expr1 instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			var res = t.constructor.saveOpCodeCall(t, Runtime.rtl.method(t.operator.getClassName(), "OpAssign"), Runtime.Collection.from([op_code.expr1]));
			t = Runtime.rtl.get(res, 0);
			var save = Runtime.rtl.get(res, 1);
			var value = Runtime.rtl.get(res, 2);
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(value);
		}
		else
		{
			var res = t.constructor.saveOpCodeCall(t, Runtime.rtl.method(t.expression.getClassName(), "Expression"), Runtime.Collection.from([op_code.expr1]));
			t = Runtime.rtl.get(res, 0);
			var save = Runtime.rtl.get(res, 1);
			var value = Runtime.rtl.get(res, 2);
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(value);
		}
		/* Loop Expression */
		var res = this.nextPos(t);
		t = Runtime.rtl.get(res, 0);
		var loop_expression = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(loop_expression) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* Loop Expression */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(loop_expression) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(t, Runtime.rtl.method(t.expression.getClassName(), "Expression"), Runtime.Collection.from([op_code.expr2]));
		t = Runtime.rtl.get(res, 0);
		var save = Runtime.rtl.get(res, 1);
		var value = Runtime.rtl.get(res, 2);
		if (save != "")
		{
			content += Runtime.rtl.toStr(save);
		}
		/* Loop condition */
		content += Runtime.rtl.toStr(t.s("var " + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(";")));
		var res = this.nextPos(t);
		t = Runtime.rtl.get(res, 0);
		var start_loop = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr(t.s("if (" + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(start_loop) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		/* Start Loop */
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* Loop */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(start_loop) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = t.expression.constructor.Expression(t, op_code.expr3);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(t.s(Runtime.rtl.get(res, 1) + Runtime.rtl.toStr(";")));
		var res = t.operator.constructor.Operators(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* End Loop */
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(loop_expression) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* End Loop */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "async_stack"]), t.async_await.async_stack.removeLastIm());
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "pos"]), save_t.async_await.pos);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpIfBlock
	 */
	OpIfBlock: function(t, condition, op_code, end_pos)
	{
		var content = "";
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(t, Runtime.rtl.method(t.expression.getClassName(), "Expression"), Runtime.Collection.from([condition]));
		t = Runtime.rtl.get(res, 0);
		var save = Runtime.rtl.get(res, 1);
		var value = Runtime.rtl.get(res, 2);
		if (save != "")
		{
			content += Runtime.rtl.toStr(save);
		}
		var res = this.nextPos(t);
		t = Runtime.rtl.get(res, 0);
		var start_if = Runtime.rtl.get(res, 1);
		var res = this.nextPos(t);
		t = Runtime.rtl.get(res, 0);
		var next_if = Runtime.rtl.get(res, 1);
		/* If condition */
		content += Runtime.rtl.toStr(t.s("var " + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(";")));
		content += Runtime.rtl.toStr(t.s("if (" + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(start_if) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(next_if) + Runtime.rtl.toStr(");")));
		/* Start Loop */
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* If true */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(start_if) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = t.operator.constructor.Operators(t, op_code);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* End if */
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* Next If */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(next_if) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(t, op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var if_true_pos = "";
		var if_false_pos = "";
		var res = this.pushPos(t);
		t = Runtime.rtl.get(res, 0);
		var start_pos = Runtime.rtl.get(res, 1);
		var res = this.popPos(t);
		save_t = Runtime.rtl.get(res, 0);
		var end_pos = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* Start if */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* If true */
		var res = this.OpIfBlock(t, op_code.condition, op_code.if_true, end_pos);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* If else */
		for (var i = 0;i < op_code.if_else.count();i++)
		{
			var if_else = op_code.if_else.item(i);
			var res = this.OpIfBlock(t, if_else.condition, if_else.if_true, end_pos);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		/* Else */
		if (op_code.if_false)
		{
			content += Runtime.rtl.toStr(t.s("/* If false */"));
			var res = t.operator.constructor.Operators(t, op_code.if_false);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		/* End if */
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* End if */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "pos"]), save_t.async_await.pos);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(t, op_code)
	{
		var content = "";
		var s1 = "";
		if (op_code.expression)
		{
			var res = t.expression.constructor.Expression(t, op_code.expression);
			t = Runtime.rtl.get(res, 0);
			s1 = Runtime.rtl.get(res, 1);
		}
		else
		{
			s1 = "null";
		}
		var async_t = t.async_await.async_t;
		content = t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".ret(") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(");"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(t, op_code)
	{
		var save_t = null;
		var content = "";
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var res = this.nextPos(t);
		t = Runtime.rtl.get(res, 0);
		var start_pos = Runtime.rtl.get(res, 1);
		var res = this.nextPos(t);
		save_t = Runtime.rtl.get(res, 0);
		var end_pos = Runtime.rtl.get(res, 1);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "async_stack"]), t.async_await.async_stack.pushIm(new Bayrell.Lang.LangES6.AsyncAwait(Runtime.Dict.from({"start_pos":start_pos,"end_pos":end_pos}))));
		/* Start Try Catch */
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* Start Try */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.levelIncPos(t);
		t = Runtime.rtl.get(res, 0);
		var start_catch = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr(t.s(async_t + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".catch_push(") + Runtime.rtl.toStr(start_catch) + Runtime.rtl.toStr(");")));
		var res = t.operator.constructor.Operators(t, op_code.op_try);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* Start Catch */
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".catch_pop().jump(") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* Start Catch */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(start_catch) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("var _ex = " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".getErr();")));
		for (var i = 0;i < op_code.items.count();i++)
		{
			var s = "";
			var pattern = "";
			var item = op_code.items.item(i);
			var res = t.expression.constructor.OpTypeIdentifier(t, item.pattern);
			t = Runtime.rtl.get(res, 0);
			pattern += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			if (pattern != "var")
			{
				s = "if (_ex instanceof " + Runtime.rtl.toStr(pattern) + Runtime.rtl.toStr(")");
			}
			else
			{
				s = "if (true)";
			}
			s += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			s += Runtime.rtl.toStr((s != "") ? (t.s("var " + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = _ex;"))) : ("var " + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = _ex;")));
			var res = t.operator.constructor.Operators(t, item.value);
			t = Runtime.rtl.get(res, 0);
			s += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			t = t.levelDec();
			s += Runtime.rtl.toStr(t.s("}"));
			if (i != 0)
			{
				s = "else " + Runtime.rtl.toStr(s);
			}
			content += Runtime.rtl.toStr(t.s(s));
		}
		content += Runtime.rtl.toStr(t.s("else"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("throw _ex;"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		/* End Try Catch */
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* End Catch */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "async_stack"]), t.async_await.async_stack.removeLastIm());
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "pos"]), save_t.async_await.pos);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(t, op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var res = this.pushPos(t);
		t = Runtime.rtl.get(res, 0);
		var start_pos = Runtime.rtl.get(res, 1);
		var res = this.popPos(t);
		save_t = Runtime.rtl.get(res, 0);
		var end_pos = Runtime.rtl.get(res, 1);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "async_stack"]), t.async_await.async_stack.pushIm(new Bayrell.Lang.LangES6.AsyncAwait(Runtime.Dict.from({"start_pos":start_pos,"end_pos":end_pos}))));
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* Start while */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(t, Runtime.rtl.method(t.expression.getClassName(), "Expression"), Runtime.Collection.from([op_code.condition]));
		t = Runtime.rtl.get(res, 0);
		var save = Runtime.rtl.get(res, 1);
		var value = Runtime.rtl.get(res, 2);
		if (save != "")
		{
			content += Runtime.rtl.toStr(save);
		}
		/* Loop condition */
		content += Runtime.rtl.toStr(t.s("var " + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(";")));
		var res = this.nextPos(t);
		t = Runtime.rtl.get(res, 0);
		var start_loop = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr(t.s("if (" + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(start_loop) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		/* Start Loop */
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* Loop while */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(start_loop) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = t.operator.constructor.Operators(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* End Loop */
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("/* End while */"));
		content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "async_stack"]), t.async_await.async_stack.removeLastIm());
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["async_await", "pos"]), save_t.async_await.pos);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(t, f)
	{
		var save_t = t;
		/* Save op codes */
		var save_vars = t.save_vars;
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		t = t.constructor.clearSaveOpCode(t);
		var async_t = t.async_await.async_t;
		t = t.levelInc();
		var s1 = t.s("return (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(") =>"));
		s1 += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		s1 += Runtime.rtl.toStr(t.s("if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos() == ") + Runtime.rtl.toStr(this.currentPos(t)) + Runtime.rtl.toStr(")")));
		s1 += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		if (f.items)
		{
			var res = t.operator.constructor.Operators(t, f.items);
			t = Runtime.rtl.get(res, 0);
			s1 += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		else if (f.expression)
		{
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			var save_op_code_inc = t.save_op_code_inc;
			var res = t.expression.constructor.Expression(t, f.expression);
			t = Runtime.rtl.get(res, 0);
			var expr = Runtime.rtl.get(res, 1);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				s1 += Runtime.rtl.toStr(save);
			}
			/* Restore save op codes */
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			s1 += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".ret(") + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(");")));
		}
		t = t.levelDec();
		s1 += Runtime.rtl.toStr(t.s("}"));
		s1 += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".ret_void();")));
		t = t.levelDec();
		s1 += Runtime.rtl.toStr(t.s("};"));
		t = t.levelDec();
		/* Content */
		var content = "";
		content = t.s("{");
		t = t.levelInc();
		if (t.save_vars.count() > 0)
		{
			content += Runtime.rtl.toStr(t.s("var " + Runtime.rtl.toStr(Runtime.rs.join(",", t.save_vars)) + Runtime.rtl.toStr(";")));
		}
		content += Runtime.rtl.toStr(s1);
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_vars"]), save_vars);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		return Runtime.Collection.from([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("async_stack");
		a.push("pos");
		a.push("async_t");
		a.push("async_var");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "async_stack") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.LangES6.AsyncAwait"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pos") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["int"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "async_t") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "async_var") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"currentPos",
			"nextPos",
			"pushPos",
			"levelIncPos",
			"popPos",
			"OpCall",
			"OpPipe",
			"OpFor",
			"OpIfBlock",
			"OpIf",
			"OpReturn",
			"OpTryCatch",
			"OpWhile",
			"OpDeclareFunctionBody",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait);
window["Bayrell.Lang.LangES6.TranslatorES6AsyncAwait"] = Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Expression = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6Expression.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.LangES6.TranslatorES6Expression.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6Expression;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Expression.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Expression, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Expression,
{
	/**
	 * Returns string
	 */
	toString: function(s)
	{
		s = Runtime.re.replace("\\\\", "\\\\", s);
		s = Runtime.re.replace("\"", "\\\"", s);
		s = Runtime.re.replace("\n", "\\n", s);
		s = Runtime.re.replace("\r", "\\r", s);
		s = Runtime.re.replace("\t", "\\t", s);
		return "\"" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("\"");
	},
	/**
	 * To pattern
	 */
	toPattern: function(t, pattern)
	{
		var names = this.findModuleNames(t, pattern.entity_name.names);
		var e = Runtime.rs.join(".", names);
		var a = (pattern.template != null) ? (pattern.template.map((pattern) => 
		{
			return this.toPattern(t, pattern);
		})) : (null);
		var b = (a != null) ? (",\"t\":[" + Runtime.rtl.toStr(Runtime.rs.join(",", a)) + Runtime.rtl.toStr("]")) : ("");
		return "{\"e\":" + Runtime.rtl.toStr(this.toString(e)) + Runtime.rtl.toStr(b) + Runtime.rtl.toStr("}");
	},
	/**
	 * Returns string
	 */
	rtlToStr: function(t, s)
	{
		if (t.use_module_name)
		{
			return "use(\"Runtime.rtl\").toStr(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
		}
		var module_name = this.findModuleName(t, "rtl");
		return module_name + Runtime.rtl.toStr(".toStr(") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
	},
	/**
	 * Find module name
	 */
	findModuleName: function(t, module_name)
	{
		if (module_name == "Collection")
		{
			return "Runtime.Collection";
		}
		else if (module_name == "Dict")
		{
			return "Runtime.Dict";
		}
		else if (module_name == "Map")
		{
			return "Runtime.Map";
		}
		else if (module_name == "Vector")
		{
			return "Runtime.Vector";
		}
		else if (module_name == "rs")
		{
			return "Runtime.rs";
		}
		else if (module_name == "rtl")
		{
			return "Runtime.rtl";
		}
		else if (module_name == "ArrayInterface")
		{
			return "";
		}
		else if (t.modules.has(module_name))
		{
			return t.modules.item(module_name);
		}
		return module_name;
	},
	/**
	 * Returns module name
	 */
	findModuleNames: function(t, names)
	{
		if (names.count() > 0)
		{
			var module_name = names.first();
			module_name = this.findModuleName(t, module_name);
			if (module_name != "")
			{
				names = names.setIm(0, module_name);
			}
		}
		return names;
	},
	/**
	 * Use module name
	 */
	useModuleName: function(t, module_name)
	{
		module_name = this.findModuleName(t, module_name);
		if (t.use_module_name)
		{
			return "use(" + Runtime.rtl.toStr(this.toString(module_name)) + Runtime.rtl.toStr(")");
		}
		return module_name;
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(t, op_code)
	{
		var names = this.findModuleNames(t, op_code.entity_name.names);
		var s = Runtime.rs.join(".", names);
		return Runtime.Collection.from([t,s]);
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(t, op_code)
	{
		if (op_code.value == "@")
		{
			if (t.enable_context == false)
			{
				return Runtime.Collection.from([t,this.useModuleName(t, "rtl") + Runtime.rtl.toStr(".getContext()")]);
			}
			else
			{
				return Runtime.Collection.from([t,"ctx"]);
			}
		}
		if (op_code.value == "_")
		{
			if (t.enable_context == false)
			{
				return Runtime.Collection.from([t,this.useModuleName(t, "rtl") + Runtime.rtl.toStr(".getContext().translate")]);
			}
			else
			{
				return Runtime.Collection.from([t,"ctx.translate"]);
			}
		}
		if (op_code.value == "log")
		{
			return Runtime.Collection.from([t,"console.log"]);
		}
		if (t.modules.has(op_code.value) || op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.useModuleName(t, module_name);
			return Runtime.Collection.from([t,new_module_name]);
		}
		var content = op_code.value;
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpNumber
	 */
	OpNumber: function(t, op_code)
	{
		var content = op_code.value;
		if (op_code.negative)
		{
			content = "-" + Runtime.rtl.toStr(content);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 15);
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpString
	 */
	OpString: function(t, op_code)
	{
		return Runtime.Collection.from([t,this.toString(op_code.value)]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(t, op_code)
	{
		var content = "";
		var values = op_code.values.map((op_code) => 
		{
			var res = this.Expression(t, op_code);
			t = Runtime.rtl.get(res, 0);
			var s = Runtime.rtl.get(res, 1);
			return s;
		});
		values = values.filter((s) => 
		{
			return s != "";
		});
		var module_name = this.useModuleName(t, "Collection");
		content = module_name + Runtime.rtl.toStr(".from([") + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("])");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(t, op_code)
	{
		var content = "";
		var values = op_code.values.map((pair, key) => 
		{
			if (pair.condition != null && Runtime.rtl.get(t.preprocessor_flags, pair.condition.value) != true)
			{
				return "";
			}
			var res = this.Expression(t, pair.value);
			t = Runtime.rtl.get(res, 0);
			var s = Runtime.rtl.get(res, 1);
			return this.toString(pair.key) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(s);
		});
		values = values.filter((s) => 
		{
			return s != "";
		});
		var module_name = this.useModuleName(t, "Dict");
		content = module_name + Runtime.rtl.toStr(".from({") + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("})");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Dynamic
	 */
	Dynamic: function(t, op_code, is_call)
	{
		if (is_call == undefined) is_call = false;
		if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			return this.OpIdentifier(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
		{
			var attrs = new Runtime.Vector();
			var op_code_item = op_code;
			var op_code_first = op_code;
			var first_item = "";
			var prev_kind = "";
			var s = "";
			var first_item_complex = false;
			while (op_code_first instanceof Bayrell.Lang.OpCodes.OpAttr)
			{
				attrs.pushValue(op_code_first);
				op_code_item = op_code_first;
				op_code_first = op_code_first.obj;
			}
			attrs = attrs.reverseIm();
			if (op_code_first instanceof Bayrell.Lang.OpCodes.OpCall)
			{
				prev_kind = "var";
				var res = this.OpCall(t, op_code_first);
				t = Runtime.rtl.get(res, 0);
				s = Runtime.rtl.get(res, 1);
				first_item_complex = true;
			}
			else if (op_code_first instanceof Bayrell.Lang.OpCodes.OpNew)
			{
				prev_kind = "var";
				var res = this.OpNew(t, op_code_first);
				t = Runtime.rtl.get(res, 0);
				s = "(" + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
				first_item_complex = true;
			}
			else if (op_code_first instanceof Bayrell.Lang.OpCodes.OpCollection)
			{
				prev_kind = "var";
				var res = this.OpCollection(t, op_code_first);
				t = Runtime.rtl.get(res, 0);
				s = Runtime.rtl.get(res, 1);
				first_item_complex = true;
			}
			else if (op_code_first instanceof Bayrell.Lang.OpCodes.OpDict)
			{
				prev_kind = "var";
				var res = this.OpDict(t, op_code_first);
				t = Runtime.rtl.get(res, 0);
				s = Runtime.rtl.get(res, 1);
				first_item_complex = true;
			}
			else if (op_code_first instanceof Bayrell.Lang.OpCodes.OpIdentifier)
			{
				if (op_code_first.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF)
				{
					if (op_code_first.value == "static")
					{
						s = "this" + Runtime.rtl.toStr(((!t.is_static_function) ? (".constructor") : ("")));
						prev_kind = "static";
					}
					else if (op_code_first.value == "parent")
					{
						s = this.useModuleName(t, t.current_class_extends_name);
						prev_kind = "parent";
					}
					else if (op_code_first.value == "self")
					{
						prev_kind = "static";
						s = t.current_class_full_name;
					}
					else if (op_code_first.value == "this")
					{
						prev_kind = "var";
						s = "this";
					}
				}
				else if (op_code_first.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_PIPE)
				{
					prev_kind = "var";
					s = t.pipe_var_name + Runtime.rtl.toStr(".val");
				}
				else
				{
					var res = this.OpIdentifier(t, op_code_first);
					t = Runtime.rtl.get(res, 0);
					s = Runtime.rtl.get(res, 1);
					prev_kind = "var";
					if (t.modules.has(op_code_first.value) || op_code_first.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
					{
						prev_kind = "static";
					}
				}
			}
			first_item = s;
			if (first_item_complex && t.is_pipe)
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"var_content":first_item}));
				t = Runtime.rtl.get(res, 0);
				first_item = Runtime.rtl.get(res, 1);
				s = first_item;
			}
			var attrs_sz = attrs.count();
			for (var i = 0;i < attrs_sz;i++)
			{
				var attr = attrs.item(i);
				if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_ATTR)
				{
					s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(attr.value.value));
					/* Pipe */
					if (t.is_pipe && !is_call)
					{
						if (i == attrs_sz - 1)
						{
							s += Runtime.rtl.toStr(".bind(" + Runtime.rtl.toStr(first_item) + Runtime.rtl.toStr(")"));
						}
						else
						{
							first_item = s;
						}
					}
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_STATIC)
				{
					if (prev_kind == "var")
					{
						s += Runtime.rtl.toStr(".constructor." + Runtime.rtl.toStr(attr.value.value));
						first_item += Runtime.rtl.toStr(".constructor");
					}
					else if (prev_kind == "parent")
					{
						if (t.current_function.isStatic())
						{
							s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(attr.value.value) + Runtime.rtl.toStr(".bind(this)"));
						}
						else
						{
							s += Runtime.rtl.toStr(".prototype." + Runtime.rtl.toStr(attr.value.value) + Runtime.rtl.toStr(".bind(this)"));
						}
					}
					else
					{
						s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(attr.value.value));
					}
					/* Pipe */
					if (t.is_pipe && prev_kind != "parent" && !is_call)
					{
						if (i == attrs_sz - 1)
						{
							s += Runtime.rtl.toStr(".bind(" + Runtime.rtl.toStr(first_item) + Runtime.rtl.toStr(")"));
						}
						else
						{
							first_item = s;
						}
					}
					prev_kind = "static";
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC)
				{
					var res = this.Expression(t, attr.value);
					t = Runtime.rtl.get(res, 0);
					/* s ~= "[" ~ res[1] ~ "]"; */
					s = "Runtime.rtl.get(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC_ATTRS)
				{
					var items = new Runtime.Vector();
					if (attr.attrs != null)
					{
						for (var j = 0;j < attr.attrs.count();j++)
						{
							var res = this.Expression(t, Runtime.rtl.get(attr.attrs, j));
							t = Runtime.rtl.get(res, 0);
							items.pushValue(Runtime.rtl.get(res, 1));
						}
					}
					s = "Runtime.rtl.attr(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", [") + Runtime.rtl.toStr(Runtime.rs.join(", ", items)) + Runtime.rtl.toStr("])");
				}
			}
			return Runtime.Collection.from([t,s]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCurry)
		{
			var res = this.OpCurry(t, op_code);
			t = Runtime.rtl.get(res, 0);
			var content = Runtime.rtl.get(res, 1);
			var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"var_content":content}));
			t = Runtime.rtl.get(res, 0);
			var var_name = Runtime.rtl.get(res, 1);
			return Runtime.Collection.from([t,var_name]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			return this.OpCall(t, op_code);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * OpInc
	 */
	OpInc: function(t, op_code)
	{
		var content = "";
		var res = this.Expression(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		var s = Runtime.rtl.get(res, 1);
		if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_PRE_INC)
		{
			content = "++" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_PRE_DEC)
		{
			content = "--" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_POST_INC)
		{
			content = s + Runtime.rtl.toStr("++");
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_POST_DEC)
		{
			content = s + Runtime.rtl.toStr("--");
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpMath
	 */
	OpMath: function(t, op_code)
	{
		var res = this.Expression(t, op_code.value1);
		t = Runtime.rtl.get(res, 0);
		var opcode_level1 = Runtime.rtl.get(res, 0).opcode_level;
		var s1 = Runtime.rtl.get(res, 1);
		var op = "";
		var op_math = op_code.math;
		var opcode_level = 0;
		if (op_code.math == "!")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == ">>")
		{
			opcode_level = 12;
			op = ">>";
		}
		if (op_code.math == "<<")
		{
			opcode_level = 12;
			op = "<<";
		}
		if (op_code.math == "&")
		{
			opcode_level = 9;
			op = "&";
		}
		if (op_code.math == "xor")
		{
			opcode_level = 8;
			op = "^";
		}
		if (op_code.math == "|")
		{
			opcode_level = 7;
			op = "|";
		}
		if (op_code.math == "*")
		{
			opcode_level = 14;
			op = "*";
		}
		if (op_code.math == "/")
		{
			opcode_level = 14;
			op = "/";
		}
		if (op_code.math == "%")
		{
			opcode_level = 14;
			op = "%";
		}
		if (op_code.math == "div")
		{
			opcode_level = 14;
			op = "div";
		}
		if (op_code.math == "mod")
		{
			opcode_level = 14;
			op = "mod";
		}
		if (op_code.math == "+")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "-")
		{
			opcode_level = 13;
			op = "-";
		}
		if (op_code.math == "~")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "!")
		{
			opcode_level = 13;
			op = "!";
		}
		if (op_code.math == "===")
		{
			opcode_level = 10;
			op = "===";
		}
		if (op_code.math == "!==")
		{
			opcode_level = 10;
			op = "!==";
		}
		if (op_code.math == "==")
		{
			opcode_level = 10;
			op = "==";
		}
		if (op_code.math == "!=")
		{
			opcode_level = 10;
			op = "!=";
		}
		if (op_code.math == ">=")
		{
			opcode_level = 10;
			op = ">=";
		}
		if (op_code.math == "<=")
		{
			opcode_level = 10;
			op = "<=";
		}
		if (op_code.math == ">")
		{
			opcode_level = 10;
			op = ">";
		}
		if (op_code.math == "<")
		{
			opcode_level = 10;
			op = "<";
		}
		if (op_code.math == "is")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "instanceof")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "implements")
		{
			opcode_level = 10;
			op = "implements";
		}
		if (op_code.math == "not")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == "and")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "&&")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "or")
		{
			opcode_level = 5;
			op = "||";
		}
		if (op_code.math == "||")
		{
			opcode_level = 5;
			op = "||";
		}
		var content = "";
		if (op_code.math == "!" || op_code.math == "not")
		{
			content = op + Runtime.rtl.toStr(t.o(s1, opcode_level1, opcode_level));
		}
		else
		{
			var res = this.Expression(t, op_code.value2);
			t = Runtime.rtl.get(res, 0);
			var opcode_level2 = Runtime.rtl.get(res, 0).opcode_level;
			var s2 = Runtime.rtl.get(res, 1);
			var op1 = t.o(s1, opcode_level1, opcode_level);
			var op2 = t.o(s2, opcode_level2, opcode_level);
			if (op_math == "~")
			{
				content = op1 + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(this.rtlToStr(t, op2));
			}
			else if (op_math == "implements")
			{
				var rtl_name = this.findModuleName(t, "rtl");
				content = rtl_name + Runtime.rtl.toStr(".is_implements(") + Runtime.rtl.toStr(op1) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(op2) + Runtime.rtl.toStr(")");
			}
			else
			{
				content = op1 + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op2);
			}
		}
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), opcode_level);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpMethod
	 */
	OpMethod: function(t, op_code)
	{
		var content = "";
		var val1 = "";
		var val2 = op_code.value2;
		var prev_kind = "";
		if (op_code.value1.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF)
		{
			if (op_code.value1.value == "static")
			{
				val1 = "this" + Runtime.rtl.toStr(((!t.is_static_function) ? (".constructor") : ("")));
				prev_kind = "static";
			}
			else if (op_code.value1.value == "parent")
			{
				val1 = this.useModuleName(t, t.current_class_extends_name);
				prev_kind = "parent";
			}
			else if (op_code.value1.value == "self")
			{
				prev_kind = "static";
				val1 = t.current_class_full_name;
			}
			else if (op_code.value1.value == "this")
			{
				prev_kind = "var";
				val1 = "this";
			}
		}
		else
		{
			var res = this.OpIdentifier(t, op_code.value1);
			t = Runtime.rtl.get(res, 0);
			val1 = Runtime.rtl.get(res, 1);
			if (op_code.kind == Bayrell.Lang.OpCodes.OpMethod.KIND_STATIC)
			{
				val1 += Runtime.rtl.toStr(".constructor");
			}
		}
		content = val1 + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(val2) + Runtime.rtl.toStr(".bind(") + Runtime.rtl.toStr(val1) + Runtime.rtl.toStr(")");
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 0);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpNew
	 */
	OpNew: function(t, op_code)
	{
		var content = "new ";
		var res = this.OpTypeIdentifier(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		var flag = false;
		content += Runtime.rtl.toStr("(");
		if (t.current_function == null || t.current_function.is_context)
		{
			content += Runtime.rtl.toStr("ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = t.expression.constructor.Expression(t, item);
			t = Runtime.rtl.get(res, 0);
			var s = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpCurry
	 */
	OpCurry: function(t, op_code)
	{
		var content = "";
		var s = "";
		var args = op_code.args.filter((arg) => 
		{
			return arg instanceof Bayrell.Lang.OpCodes.OpCurryArg;
		}).sortIm((arg1, arg2) => 
		{
			return (arg1.pos > arg2.pos) ? (1) : ((arg1.pos < arg2.pos) ? (-1) : (0));
		});
		var args_sz = args.count();
		for (var i = 0;i < args_sz;i++)
		{
			var arg = args.item(i);
			if (args_sz - 1 == i)
			{
				content += Runtime.rtl.toStr("(__varg" + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(") => "));
			}
			else
			{
				content += Runtime.rtl.toStr("(__ctx" + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(", __varg") + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(") => "));
			}
		}
		var flag = false;
		var res = t.expression.constructor.Dynamic(t, op_code.obj, true);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		if (s == "parent")
		{
			content = this.useModuleName(t, t.current_class_extends_name);
			if (t.current_function.name != "constructor")
			{
				if (t.current_function.isStatic())
				{
					content += Runtime.rtl.toStr("." + Runtime.rtl.toStr(t.current_function.name));
				}
				else
				{
					content += Runtime.rtl.toStr(".prototype." + Runtime.rtl.toStr(t.current_function.name));
				}
			}
			content += Runtime.rtl.toStr(".call(this");
			flag = true;
		}
		else
		{
			content += Runtime.rtl.toStr("(ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count();i++)
		{
			s = "";
			var item = op_code.args.item(i);
			if (item instanceof Bayrell.Lang.OpCodes.OpCurryArg)
			{
				s += Runtime.rtl.toStr("__varg" + Runtime.rtl.toStr(item.pos));
			}
			else
			{
				var res = this.Expression(t, item);
				t = Runtime.rtl.get(res, 0);
				s = Runtime.rtl.get(res, 1);
			}
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(t, op_code)
	{
		var s = "";
		var flag = false;
		var res = t.expression.constructor.Dynamic(t, op_code.obj, true);
		t = Runtime.rtl.get(res, 0);
		s = Runtime.rtl.get(res, 1);
		if (s == "parent")
		{
			s = this.useModuleName(t, t.current_class_extends_name);
			if (t.current_function.name != "constructor")
			{
				if (t.current_function.isStatic())
				{
					s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(t.current_function.name));
				}
				else
				{
					s += Runtime.rtl.toStr(".prototype." + Runtime.rtl.toStr(t.current_function.name));
				}
			}
			s += Runtime.rtl.toStr(".call(this");
			flag = true;
		}
		else
		{
			s += Runtime.rtl.toStr("(");
		}
		var content = s;
		if (op_code.obj instanceof Bayrell.Lang.OpCodes.OpIdentifier && op_code.obj.value == "_")
		{
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("ctx"));
			flag = true;
		}
		else if (t.current_function.is_context && op_code.is_context)
		{
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("ctx"));
			flag = true;
		}
		if (op_code.is_html)
		{
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("component, render_params, render_content"));
			flag = true;
		}
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = t.expression.constructor.Expression(t, item);
			t = Runtime.rtl.get(res, 0);
			var s = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		if (t.current_function.isFlag("async") && op_code.is_await && t.isAsyncAwait())
		{
			content = "await " + Runtime.rtl.toStr(content);
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassOf
	 */
	OpClassOf: function(t, op_code)
	{
		var names = this.findModuleNames(t, op_code.entity_name.names);
		var s = Runtime.rs.join(".", names);
		return Runtime.Collection.from([t,this.toString(s)]);
	},
	/**
	 * OpTernary
	 */
	OpTernary: function(t, op_code)
	{
		var content = "";
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 100);
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = Runtime.rtl.get(res, 0);
		var condition = Runtime.rtl.get(res, 1);
		var res = t.expression.constructor.Expression(t, op_code.if_true);
		t = Runtime.rtl.get(res, 0);
		var if_true = Runtime.rtl.get(res, 1);
		var res = t.expression.constructor.Expression(t, op_code.if_false);
		t = Runtime.rtl.get(res, 0);
		var if_false = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr("(" + Runtime.rtl.toStr(condition) + Runtime.rtl.toStr(") ? (") + Runtime.rtl.toStr(if_true) + Runtime.rtl.toStr(") : (") + Runtime.rtl.toStr(if_false) + Runtime.rtl.toStr(")"));
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 0);
		/* OpTernary */
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var content = "";
		var var_name = "";
		var value = "";
		/* use Runtime.Monad */
		var monad_name = "Runtime.Monad";
		if (t.use_module_name)
		{
			var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"var_content":this.useModuleName(t, "Runtime.Monad")}));
			t = Runtime.rtl.get(res, 0);
			monad_name = Runtime.rtl.get(res, 1);
		}
		var res = t.constructor.incSaveOpCode(t);
		t = Runtime.rtl.get(res, 0);
		var_name = Runtime.rtl.get(res, 1);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["pipe_var_name"]), var_name);
		var items = new Runtime.Vector();
		var op_code_item = op_code;
		while (op_code_item instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			items.pushValue(op_code_item);
			op_code_item = op_code_item.obj;
		}
		items = items.reverseIm();
		/* First item */
		var res = t.expression.constructor.Expression(t, op_code_item);
		t = Runtime.rtl.get(res, 0);
		value = Runtime.rtl.get(res, 1);
		var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"content":t.s("var " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(" = new ") + Runtime.rtl.toStr(monad_name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(");"))}));
		t = Runtime.rtl.get(res, 0);
		/* Output items */
		for (var i = 0;i < items.count();i++)
		{
			var s1 = "";
			var s2 = "";
			var op_item = items.item(i);
			var args = new Runtime.Vector();
			if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_ATTR)
			{
				var res = this.Expression(t, op_item.value);
				t = Runtime.rtl.get(res, 0);
				value = Runtime.rtl.get(res, 1);
				s1 = var_name + Runtime.rtl.toStr(".attr(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
			}
			else if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_METHOD)
			{
				var res = this.Dynamic(t, op_item.value);
				t = Runtime.rtl.get(res, 0);
				value = Runtime.rtl.get(res, 1);
				s2 = "try{ ";
				s2 += Runtime.rtl.toStr(var_name + Runtime.rtl.toStr("=(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".val!=null && ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".err==null) ? new ") + Runtime.rtl.toStr(monad_name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(") : ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(";"));
				s2 += Runtime.rtl.toStr(" } catch (err) { ");
				s2 += Runtime.rtl.toStr(var_name + Runtime.rtl.toStr("=new ") + Runtime.rtl.toStr(monad_name) + Runtime.rtl.toStr("(null, err);"));
				s2 += Runtime.rtl.toStr(" }");
			}
			else if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_CALL)
			{
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), true);
				var args = "";
				/*
				bool is_instance_method = false;
				if (
					op_item.value instanceof OpCall and
					op_item.value.obj instanceof OpAttr and
					op_item.value.obj.kind == OpAttr::KIND_ATTR and
					op_item.value.obj.obj.value == ""
				)
				{
					string value1 = "";
					is_instance_method = true;
					if (op_item.value.obj.obj.value == "")
					{
						value1 = t.pipe_var_name ~ ".val";
					}
					else
					{
						list res = static::Expression(t, op_item.value.obj.obj);
						t = res[0]; value1 = res[1];
					}
					value = value1;
					value ~= "." ~ op_item.value.obj.value.value;
					value ~= ".bind(" ~ value1 ~ ")";
					bool flag = false;
					for (int j=0; j<op_item.value.args.count(); j++)
					{
						BaseOpCode item = op_item.value.args.item(j);
						list res = t.expression::Expression(t, item); t = res[0]; string s_arg = res[1];
						args ~= (flag ? ", " : "") ~ s_arg;
						flag = true;
					}
					args = ", [" ~ args ~ "]";
				}
				*/
				var res = this.Dynamic(t, op_item.value);
				t = Runtime.rtl.get(res, 0);
				value = Runtime.rtl.get(res, 1);
				if (!op_item.is_async || !t.enable_async_await)
				{
					if (op_item.is_monad)
					{
						s1 = var_name + Runtime.rtl.toStr(".monad(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
					}
					else
					{
						s1 = var_name + Runtime.rtl.toStr(".call(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")");
					}
				}
				else if (op_item.is_async && t.current_function.isFlag("async"))
				{
					if (t.isEmulateAsyncAwait())
					{
						if (op_item.is_monad)
						{
							s2 = var_name + Runtime.rtl.toStr(".monadAsync(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
						}
						else
						{
							s2 = var_name + Runtime.rtl.toStr(".callAsync(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")");
						}
					}
					else if (t.isAsyncAwait())
					{
						if (op_item.is_monad)
						{
							s1 = "await " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".monadAsync(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
						}
						else
						{
							s1 = "await " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".callAsync(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")");
						}
					}
				}
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), false);
			}
			if (s1 != "")
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"content":t.s(var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";"))}));
				t = Runtime.rtl.get(res, 0);
			}
			if (s2 != "")
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"content":t.s(s2)}));
				t = Runtime.rtl.get(res, 0);
			}
			/*
			if (s2 != "")
			{
				list res = t.async_await::nextPos(t); t = res[0]; string next_pos = res[1];
				string async_t = t.async_await.async_t;
				string s3 = t.s
				(
					"return " ~ async_t ~
					".jump(" ~ next_pos ~ ")" ~
					".call(" ~ s2 ~ "," ~ t.expression::toString(var_name) ~ ");"
				);
				t = t.levelDec();
				s3 ~= t.s("}");
				s3 ~= t.s("else if (" ~ async_t ~ ".pos() == " ~ next_pos ~ ")");
				s3 ~= t.s("{");
				t = t.levelInc();
				s3 ~= t.s(
					"var " ~ var_name ~ " = " ~ async_t ~ 
					".getVar(" ~ t.expression::toString(var_name) ~ ");"
				);
				list res = t::addSaveOpCode
				(
					t,
					{
						"content": s3,
					}
				);
				t = res[0];
			}
			*/
		}
		return Runtime.Collection.from([t,var_name + Runtime.rtl.toStr(".value()")]);
	},
	/**
	 * OpTypeConvert
	 */
	OpTypeConvert: function(t, op_code)
	{
		var content = "";
		var res = this.Expression(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		var value = Runtime.rtl.get(res, 1);
		content = this.useModuleName(t, "rtl") + Runtime.rtl.toStr(".to(") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(this.toPattern(t, op_code.pattern)) + Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction
	 */
	OpDeclareFunction: function(t, op_code)
	{
		var content = "";
		var is_async = "";
		if (op_code.isFlag("async") && t.isAsyncAwait())
		{
			is_async = "async ";
		}
		/* Set function name */
		var save_f = t.current_function;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code);
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code);
		var args = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr(is_async + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(") => "));
		var res = t.operator.constructor.OpDeclareFunctionBody(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* Restore function */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), save_f);
		/* OpTernary */
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Expression
	 */
	Expression: function(t, op_code)
	{
		var content = "";
		var save_is_pipe = t.is_pipe;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 100);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), false);
		if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			var res = this.OpIdentifier(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTypeIdentifier)
		{
			var res = this.OpTypeIdentifier(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpNumber)
		{
			var res = this.OpNumber(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpString)
		{
			var res = this.OpString(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCollection)
		{
			var res = this.OpCollection(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDict)
		{
			var res = this.OpDict(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpInc)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 16);
			var res = this.OpInc(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpMath)
		{
			var res = this.OpMath(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpMethod)
		{
			var res = this.OpMethod(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpNew)
		{
			var res = this.OpNew(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
		{
			var res = this.Dynamic(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			var res = this.OpCall(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpClassOf)
		{
			var res = this.OpClassOf(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCurry)
		{
			var res = this.OpCurry(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			var res = this.OpPipe(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTernary)
		{
			var res = this.OpTernary(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTypeConvert)
		{
			var res = this.OpTypeConvert(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			var res = this.OpDeclareFunction(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlItems)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), true);
			var res = t.html.constructor.OpHtmlItems(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), false);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			var res = t.operator.constructor.OpPreprocessorIfDef(t, op_code, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), save_is_pipe);
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Expression";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"toString",
			"toPattern",
			"rtlToStr",
			"findModuleName",
			"findModuleNames",
			"useModuleName",
			"OpTypeIdentifier",
			"OpIdentifier",
			"OpNumber",
			"OpString",
			"OpCollection",
			"OpDict",
			"Dynamic",
			"OpInc",
			"OpMath",
			"OpMethod",
			"OpNew",
			"OpCurry",
			"OpCall",
			"OpClassOf",
			"OpTernary",
			"OpPipe",
			"OpTypeConvert",
			"OpDeclareFunction",
			"Expression",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6Expression);
window["Bayrell.Lang.LangES6.TranslatorES6Expression"] = Bayrell.Lang.LangES6.TranslatorES6Expression;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangES6.TranslatorES6Expression;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Html = function()
{
};
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Html.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangES6.TranslatorES6Html)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Html,
{
	/**
	 * Is component
	 */
	isComponent: function(tag_name)
	{
		if (tag_name == "")
		{
			return false;
		}
		var ch1 = Runtime.rs.substr(tag_name, 0, 1);
		var ch2 = Runtime.rs.strtoupper(ch1);
		return ch1 == "{" || ch1 == ch2;
	},
	/**
	 * Translator html value
	 */
	OpHtmlAttr: function(t, attr, item_pos)
	{
		var op_code = attr.value;
		if (attr instanceof Bayrell.Lang.OpCodes.OpString)
		{
			return Runtime.Collection.from([t,t.expression.constructor.toString(op_code.value)]);
		}
		if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
		{
			if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(t, op_code.value);
				t = Runtime.rtl.get(res, 0);
				var value = Runtime.rtl.get(res, 1);
				return Runtime.Collection.from([t,value]);
			}
			else if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(t, op_code.value);
				t = Runtime.rtl.get(res, 0);
				var value = Runtime.rtl.get(res, 1);
				value = "Runtime.rtl.json_encode(" + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
				return Runtime.Collection.from([t,value]);
			}
		}
		var res = t.expression.constructor.Expression(t, op_code);
		t = Runtime.rtl.get(res, 0);
		var value = Runtime.rtl.get(res, 1);
		value = t.o(value, Runtime.rtl.get(res, 0).opcode_level, 13);
		return Runtime.Collection.from([t,value]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlAttrs: function(t, attrs, item_pos)
	{
		var attr_class = new Runtime.Vector();
		var attr_s = "null";
		var attr_key_value = "";
		var attr_elem_name = "";
		var has_attr_key = false;
		var res_attrs = new Runtime.Vector();
		for (var attrs_i = 0;attrs_i < attrs.count();attrs_i++)
		{
			var attr = Runtime.rtl.get(attrs, attrs_i);
			if (attr.is_spread)
			{
				continue;
			}
			var res = this.OpHtmlAttr(t, attr);
			t = Runtime.rtl.get(res, 0);
			var attr_value = Runtime.rtl.get(res, 1);
			var attr_key = attr.key;
			var ch = Runtime.rs.substr(attr_key, 0, 1);
			var is_event = Runtime.rs.substr(attr_key, 0, 7) == "@event:";
			var is_signal = Runtime.rs.substr(attr_key, 0, 8) == "@signal:";
			if (attr_key == "class")
			{
				attr_class.pushValue(attr_value);
				if (attr_elem_name == "" && attr.value instanceof Bayrell.Lang.OpCodes.OpString)
				{
					var arr = Runtime.rs.split(" ", attr.value.value);
					attr_elem_name = t.expression.constructor.toString(Runtime.rtl.get(arr, 0));
				}
				continue;
			}
			else if (attr_key == "@key")
			{
				var res = this.OpHtmlAttr(t, attr);
				t = Runtime.rtl.get(res, 0);
				attr_value = Runtime.rtl.get(res, 1);
				attr_key_value = attr_value;
				continue;
			}
			else if (is_event || is_signal)
			{
				var event_name = "";
				if (is_event)
				{
					event_name = Runtime.rs.substr(attr_key, 7);
				}
				else if (is_signal)
				{
					event_name = Runtime.rs.substr(attr_key, 8);
				}
				event_name = t.expression.constructor.findModuleName(t, event_name);
				if (is_event)
				{
					attr_key = "@event:" + Runtime.rtl.toStr(event_name);
				}
				else if (is_signal)
				{
					attr_key = "@signal:" + Runtime.rtl.toStr(event_name);
				}
				if (attr.value instanceof Bayrell.Lang.OpCodes.OpString)
				{
					attr_value = "[component," + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr("]");
				}
				else
				{
					attr_value = "[component,(msg)=>{" + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr("}]");
				}
			}
			else if (attr_key == "@ref" || attr_key == "@bind" || attr_key == "@model" || attr_key == "@name" || attr_key == "@watch")
			{
				/*res_attrs.push
				(
					t.expression::toString("@model_path") ~
						": this._concat_attrs(params, \"@model_path\", " ~
						attr_value ~ ")"
				);*/
				attr_value = "[component," + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr("]");
			}
			res_attrs.pushValue(t.expression.constructor.toString(attr_key) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(attr_value));
		}
		res_attrs = res_attrs.filter((s) => 
		{
			return s != "";
		});
		if (attr_class.count() > 0)
		{
			attr_class.pushValue("this.getCssHash()");
			/*attr_class.push( t.expression::toString("h-" ~ ParserBayHtml::getCssHash(t.current_class_full_name)) );*/
			res_attrs.pushValue("\"class\":" + Runtime.rtl.toStr("[") + Runtime.rtl.toStr(Runtime.rs.join(", ", attr_class)) + Runtime.rtl.toStr("].join(\" \")"));
		}
		if (attr_key_value != "")
		{
			res_attrs.pushValue("\"@key\":" + Runtime.rtl.toStr(attr_key_value));
		}
		if (attr_elem_name != "")
		{
			res_attrs.pushValue("\"@elem_name\":" + Runtime.rtl.toStr(attr_elem_name));
		}
		if (res_attrs.count() > 0)
		{
			attr_s = "{" + Runtime.rtl.toStr(Runtime.rs.join(",", res_attrs)) + Runtime.rtl.toStr("}");
		}
		else
		{
			attr_s = "{}";
		}
		/* Add spreads */
		for (var i = 0;i < attrs.count();i++)
		{
			var attr = Runtime.rtl.get(attrs, i);
			if (!attr.is_spread)
			{
				continue;
			}
			attr_s = "this._merge_attrs(" + Runtime.rtl.toStr(attr_s) + Runtime.rtl.toStr(",") + Runtime.rtl.toStr(attr.value.value) + Runtime.rtl.toStr(")");
		}
		return Runtime.Collection.from([t,attr_s]);
	},
	/**
	 * Returns class name
	 */
	getOpHtmlAttrsClassName: function(attrs)
	{
		var class_names = new Runtime.Vector();
		if (attrs != "")
		{
			for (var attrs_i = 0;attrs_i < attrs.count();attrs_i++)
			{
				var attr = Runtime.rtl.get(attrs, attrs_i);
				var attr_key = attr.key;
				if (attr_key == "class")
				{
					if (attr.value instanceof Bayrell.Lang.OpCodes.OpString)
					{
						class_names.pushValue(attr.value.value);
					}
				}
			}
		}
		return Runtime.rs.join(" ", class_names);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(t, op_code, item_pos, var_name)
	{
		var content = "";
		var content2 = "";
		var str_var_name = t.expression.constructor.toString(var_name);
		var new_var_name = "";
		var res = t.constructor.incSaveOpCode(t);
		t = Runtime.rtl.get(res, 0);
		new_var_name = Runtime.rtl.get(res, 1);
		if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlContent)
		{
			var item_value = t.expression.constructor.toString(op_code.value);
			content += Runtime.rtl.toStr(t.s("/* Text */"));
			content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"t\", \"\", null, ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(");")));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
		{
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			/*int save_op_code_inc = t.save_op_code_inc;*/
			var res = t.expression.constructor.Expression(t, op_code.value);
			t = Runtime.rtl.get(res, 0);
			var item_value = Runtime.rtl.get(res, 1);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			/* Restore op codes */
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
			{
				content += Runtime.rtl.toStr(t.s("/* Raw */"));
				content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"r\", \"\", null, ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(");")));
			}
			else if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_HTML)
			{
				content += Runtime.rtl.toStr(t.s("/* Html */"));
				content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"h\", \"\", null, ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(");")));
			}
			else if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
			{
				content += Runtime.rtl.toStr(t.s("/* Text */"));
				item_value = "Runtime.rtl.json_encode(" + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
				content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"t\", \"\", null, ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(");")));
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlTag)
		{
			var has_childs = op_code.items != null && op_code.items.items != null && op_code.items.items.count() > 0;
			var is_component = this.isComponent(op_code.tag_name);
			var op_code_attrs = op_code.attrs.filter((attr) => 
			{
				return attr.key != "@render";
			});
			var res = this.OpHtmlAttrs(t, op_code_attrs, item_pos);
			t = Runtime.rtl.get(res, 0);
			var attrs = Runtime.rtl.get(res, 1);
			if (op_code.tag_name == "")
			{
				content += Runtime.rtl.toStr(t.s("/* Items */"));
				content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"empty\");")));
			}
			else if (is_component)
			{
				var tag_name = "";
				if (op_code.op_code_name)
				{
					var res = t.expression.constructor.Expression(t, op_code.op_code_name);
					t = Runtime.rtl.get(res, 0);
					tag_name = Runtime.rtl.get(res, 1);
				}
				else
				{
					tag_name = t.expression.constructor.toString(t.expression.constructor.findModuleName(t, op_code.tag_name));
				}
				if (has_childs)
				{
					var res = this.OpHtmlItems(t, op_code.items);
					t = Runtime.rtl.get(res, 0);
					var f = Runtime.rtl.get(res, 1);
					content += Runtime.rtl.toStr(t.s("/* Component '" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr("' */")));
					content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"c\",") + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(attrs) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(f) + Runtime.rtl.toStr(");")));
					has_childs = false;
				}
				else
				{
					content += Runtime.rtl.toStr(t.s("/* Component '" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr("' */")));
					content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"c\", ") + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(attrs) + Runtime.rtl.toStr(");")));
				}
			}
			else
			{
				var render_attr = op_code.attrs.findItem((attr) => 
				{
					return attr.key == "@render";
				});
				if (render_attr)
				{
					var render_attrs = "";
					if (render_attr && render_attr.value instanceof Bayrell.Lang.OpCodes.OpString)
					{
						var render_attr_value = render_attr.value.value;
						render_attr_value = t.expression.constructor.toString(render_attr_value);
						render_attrs = "{\"@ref\":[component," + Runtime.rtl.toStr(render_attr_value) + Runtime.rtl.toStr("]}");
					}
					var new_op_code = op_code.copy(Runtime.Dict.from({"attrs":op_code_attrs}));
					var op_code_html_items = new Bayrell.Lang.OpCodes.OpHtmlItems(Runtime.Dict.from({"items":Runtime.Collection.from([new_op_code])}));
					var res = this.OpHtmlItems(t, op_code_html_items);
					t = Runtime.rtl.get(res, 0);
					var f = Runtime.rtl.get(res, 1);
					content += Runtime.rtl.toStr(t.s("/* Render function '" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr("' */")));
					content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"f\", \"\", ") + Runtime.rtl.toStr(render_attrs) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(f) + Runtime.rtl.toStr(");")));
					var res = t.constructor.incSaveOpCode(t);
					t = Runtime.rtl.get(res, 0);
					new_var_name = Runtime.rtl.get(res, 1);
					has_childs = false;
				}
				else
				{
					var tag_name = t.expression.constructor.toString(op_code.tag_name);
					var attr_class_name = this.getOpHtmlAttrsClassName(op_code_attrs);
					attr_class_name = Runtime.rs.replace(" ", ".", attr_class_name);
					if (attr_class_name != "")
					{
						attr_class_name = "." + Runtime.rtl.toStr(attr_class_name);
					}
					content += Runtime.rtl.toStr(t.s("/* Element '" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(attr_class_name) + Runtime.rtl.toStr("' */")));
					if (op_code.tag_name == "svg")
					{
						var __v0 = new Runtime.Monad(Runtime.rtl.attr(op_code, ["items", "items", 0, "value", "value"]));
						__v0 = __v0.monad(Runtime.rtl.m_to("string", ""));
						var svg_content = __v0.value();
						svg_content = t.expression.constructor.toString(svg_content);
						content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"e\", ") + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(attrs) + Runtime.rtl.toStr(");")));
						has_childs = false;
					}
					else
					{
						content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"e\", ") + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(attrs) + Runtime.rtl.toStr(");")));
					}
				}
			}
			if (has_childs)
			{
				content += Runtime.rtl.toStr(t.s2(""));
				var res = this.OpHtmlChilds(t, op_code.items, new_var_name);
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				content += Runtime.rtl.toStr(t.s(new_var_name + Runtime.rtl.toStr(".p();")));
			}
		}
		else
		{
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			/*int save_op_code_inc = t.save_op_code_inc;*/
			var item_value = "";
			if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
			{
				var res = t.expression.constructor.OpCall(t, op_code);
				t = Runtime.rtl.get(res, 0);
				item_value += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else
			{
				var res = t.expression.constructor.Expression(t, op_code);
				t = Runtime.rtl.get(res, 0);
				item_value = Runtime.rtl.get(res, 1);
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			/* Restore op codes */
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			content += Runtime.rtl.toStr(t.s("/* Text */"));
			content += Runtime.rtl.toStr(t.s("let " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(".e(\"t\", \"\", null, ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(");")));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlChilds: function(t, op_code, control_name)
	{
		if (op_code == null || op_code.items.count() == 0)
		{
			return Runtime.Collection.from([t,""]);
		}
		var save_control_name = t.html_var_name;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["html_var_name"]), control_name);
		var next_space = true;
		var content = "";
		for (var i = 0;i < op_code.items.count();i++)
		{
			var item = op_code.items.item(i);
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			/*int save_op_code_inc = t.save_op_code_inc;*/
			var op_content = "";
			if (i > 0 && next_space)
			{
				content += Runtime.rtl.toStr(t.s2(""));
			}
			if (!next_space)
			{
				next_space = true;
			}
			if (item instanceof Bayrell.Lang.OpCodes.OpAssign)
			{
				var res = t.operator.constructor.OpAssign(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpComment)
			{
				var res = t.operator.constructor.OpComment(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				next_space = false;
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpFor)
			{
				var res = t.operator.constructor.OpFor(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpIf)
			{
				var res = t.operator.constructor.OpIf(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpWhile)
			{
				var res = t.operator.constructor.OpWhile(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else
			{
				var res = this.OpHtmlTag(t, item, i, control_name);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			if (op_content != "")
			{
				content += Runtime.rtl.toStr(op_content);
			}
			/* Restore save op codes */
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			/*t <= save_op_code_inc <= save_op_code_inc;*/
		}
		/*
		if (control_name != "control" and patch_flag)
		{
			content ~= t.s("RenderDriver.p(" ~ control_name ~ ", " ~ control_name ~ "_childs);");
		}
		*/
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["html_var_name"]), save_control_name);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(t, op_code)
	{
		if (op_code == null || op_code.items.count() == 0)
		{
			return Runtime.Collection.from([t,""]);
		}
		/* Save op codes */
		var save_t = t;
		var save_op_codes = t.save_op_codes;
		/*int save_op_code_inc = t.save_op_code_inc;*/
		var content = "";
		content += Runtime.rtl.toStr("(__v) =>");
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("let layout = component.layout();"));
		content += Runtime.rtl.toStr(t.s("let model_path = component.model_path;"));
		content += Runtime.rtl.toStr(t.s("let model = component.model();"));
		/* content ~= t.s("var __vnull = null;"); */
		/* content ~= t.s("var __c_childs = [];"); */
		content += Runtime.rtl.toStr(t.s2(""));
		var res = this.OpHtmlChilds(t, op_code, "__v");
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/*content ~= t.s("RenderDriver.p(__c, __c_childs);");*/
		/* content ~= t.s2(""); */
		/* content ~= t.s("return __c_childs;"); */
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		/*t <= save_op_code_inc <= save_op_code_inc;*/
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translate html
	 */
	OpHtml: function(t, op_code)
	{
		var content = "";
		var res = this.OpHtmlItems(t, op_code);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Html";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isComponent",
			"OpHtmlAttr",
			"OpHtmlAttrs",
			"getOpHtmlAttrsClassName",
			"OpHtmlTag",
			"OpHtmlChilds",
			"OpHtmlItems",
			"OpHtml",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6Html);
window["Bayrell.Lang.LangES6.TranslatorES6Html"] = Bayrell.Lang.LangES6.TranslatorES6Html;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangES6.TranslatorES6Html;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Operator = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6Operator.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.LangES6.TranslatorES6Operator.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6Operator;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Operator.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Operator, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Operator,
{
	/**
	 * Returns true if op_code contains await
	 */
	isAwait: function(op_code)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (op_code == null)
		{
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
			return __memorize_value;
		}
		if (op_code instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_ASSIGN || op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
			{
				for (var i = 0;i < op_code.values.count();i++)
				{
					var item = op_code.values.item(i);
					var flag = this.isAwait(item.expression);
					if (flag)
					{
						var __memorize_value = true;
						Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
						return __memorize_value;
					}
				}
			}
			else if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_STRUCT)
			{
				var flag = this.isAwait(op_code.expression);
				if (flag)
				{
					var __memorize_value = true;
					Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
					return __memorize_value;
				}
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAssignStruct)
		{
			var flag = this.isAwait(op_code.expression);
			if (flag)
			{
				var __memorize_value = true;
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
		{
			var op_code_next = op_code;
			while (op_code_next instanceof Bayrell.Lang.OpCodes.OpAttr)
			{
				op_code_next = op_code_next.obj;
			}
			var __memorize_value = this.isAwait(op_code_next);
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
			return __memorize_value;
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			var __memorize_value = op_code.is_await;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
			return __memorize_value;
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			if (op_code.is_async)
			{
				var __memorize_value = true;
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
				return __memorize_value;
			}
			var __memorize_value = this.isAwait(op_code.value);
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
			return __memorize_value;
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpFor)
		{
			var __memorize_value = this.isAwait(op_code.expr2) || this.isAwait(op_code.value);
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
			return __memorize_value;
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpIf)
		{
			var flag = false;
			flag = this.isAwait(op_code.condition);
			if (flag)
			{
				var __memorize_value = true;
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
				return __memorize_value;
			}
			flag = this.isAwait(op_code.if_true);
			if (flag)
			{
				var __memorize_value = true;
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
				return __memorize_value;
			}
			flag = this.isAwait(op_code.if_false);
			if (flag)
			{
				var __memorize_value = true;
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
				return __memorize_value;
			}
			for (var i = 0;i < op_code.if_else.count();i++)
			{
				var if_else = op_code.if_else.item(i);
				flag = this.isAwait(if_else.condition);
				if (flag)
				{
					var __memorize_value = true;
					Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
					return __memorize_value;
				}
				flag = this.isAwait(if_else.if_true);
				if (flag)
				{
					var __memorize_value = true;
					Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
					return __memorize_value;
				}
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpItems)
		{
			for (var i = 0;i < op_code.items.count();i++)
			{
				var item = op_code.items.item(i);
				var flag = this.isAwait(item);
				if (flag)
				{
					var __memorize_value = true;
					Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
					return __memorize_value;
				}
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpMath)
		{
			if (op_code.math == "!" || op_code.math == "not")
			{
				var __memorize_value = this.isAwait(op_code.value1);
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
				return __memorize_value;
			}
			else
			{
				var __memorize_value = this.isAwait(op_code.value1) || this.isAwait(op_code.value2);
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpReturn)
		{
			var flag = this.isAwait(op_code.expression);
			if (flag)
			{
				var __memorize_value = true;
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTryCatch)
		{
			var __memorize_value = this.isAwait(op_code.op_try);
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
			return __memorize_value;
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpWhile)
		{
			var __memorize_value = this.isAwait(op_code.condition) || this.isAwait(op_code.value);
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangES6.TranslatorES6Operator.isAwait", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * OpAssign
	 */
	OpAssignStruct: function(t, op_code, pos)
	{
		if (pos == undefined) pos = 0;
		var content = "";
		var var_name = op_code.var_name;
		var res = t.expression.constructor.Expression(t, op_code.expression);
		t = Runtime.rtl.get(res, 0);
		var expr = Runtime.rtl.get(res, 1);
		var names = op_code.names.map((item) => 
		{
			if (item instanceof Bayrell.Lang.OpCodes.BaseOpCode)
			{
				var res = t.expression.constructor.Expression(t, item);
				t = Runtime.rtl.get(res, 0);
				return Runtime.rtl.get(res, 1);
			}
			return t.expression.constructor.toString(item);
		});
		content = "Runtime.rtl.setAttr(" + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", Runtime.Collection.from([") + Runtime.rtl.toStr(Runtime.rs.join(", ", names)) + Runtime.rtl.toStr("]), ") + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpAssign
	 */
	OpAssign: function(t, op_code, flag_indent)
	{
		if (flag_indent == undefined) flag_indent = true;
		var content = "";
		if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_ASSIGN || op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
		{
			for (var i = 0;i < op_code.values.count();i++)
			{
				var item = op_code.values.item(i);
				var s = "";
				var item_expression = "";
				var op = item.op;
				if (op == "")
				{
					op = "=";
				}
				if (item.expression != null)
				{
					var res = t.expression.constructor.Expression(t, item.expression);
					t = Runtime.rtl.get(res, 0);
					if (op == "~=")
					{
						item_expression = t.expression.constructor.rtlToStr(t, Runtime.rtl.get(res, 1));
					}
					else
					{
						item_expression = Runtime.rtl.get(res, 1);
					}
				}
				if (item.op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
				{
					var items = new Runtime.Vector();
					var items2 = new Runtime.Vector();
					var op_code_next = item.op_code;
					while (op_code_next instanceof Bayrell.Lang.OpCodes.OpAttr)
					{
						items.pushValue(op_code_next);
						op_code_next = op_code_next.obj;
					}
					items = items.reverseIm();
					var res = t.expression.constructor.OpIdentifier(t, op_code_next);
					t = Runtime.rtl.get(res, 0);
					var obj_s = Runtime.rtl.get(res, 1);
					for (var j = 0;j < items.count();j++)
					{
						var item_attr = Runtime.rtl.get(items, j);
						if (item_attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_ATTR)
						{
							obj_s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(item_attr.value.value));
							items2.pushValue(t.expression.constructor.toString(item_attr.value.value));
						}
						else if (item_attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC)
						{
							var res = t.expression.constructor.Expression(t, item_attr.value);
							t = Runtime.rtl.get(res, 0);
							obj_s += Runtime.rtl.toStr("[" + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr("]"));
							items2.pushValue(Runtime.rtl.get(res, 1));
						}
						else if (item_attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC_ATTRS)
						{
							if (item_attr.attrs != null)
							{
								for (var j = item_attr.attrs.count() - 1;j >= 0;j--)
								{
									var res = t.expression.constructor.Expression(t, Runtime.rtl.get(item_attr.attrs, j));
									t = Runtime.rtl.get(res, 0);
									obj_s += Runtime.rtl.toStr("[" + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr("]"));
									items2.pushValue(Runtime.rtl.get(res, 1));
								}
							}
						}
					}
					if (op == "~=" || op == "+=" || op == "-=")
					{
						var op2 = "+";
						if (op == "~=" || op == "+=")
						{
							op2 = "+";
						}
						else if (op == "-=")
						{
							op2 = "-";
						}
						item_expression = "Runtime.rtl.attr(" + Runtime.rtl.toStr(obj_s) + Runtime.rtl.toStr(", [") + Runtime.rtl.toStr(Runtime.rs.join(", ", items2)) + Runtime.rtl.toStr("]) ") + Runtime.rtl.toStr(op2) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(item_expression);
					}
					s = obj_s + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(item_expression);
				}
				else
				{
					if (item.op_code != null && item.op_code.value == "@" && t.enable_context == false)
					{
						s = t.expression.constructor.useModuleName(t, "rtl") + Runtime.rtl.toStr(".setContext(") + Runtime.rtl.toStr(item_expression) + Runtime.rtl.toStr(")");
					}
					else
					{
						if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
						{
							if (t.current_function.isFlag("async") && t.isEmulateAsyncAwait())
							{
								s = item.var_name;
							}
							else if (t.is_html)
							{
								s = "let " + Runtime.rtl.toStr(item.var_name);
							}
							else
							{
								s = "var " + Runtime.rtl.toStr(item.var_name);
							}
						}
						else
						{
							var res = t.expression.constructor.OpIdentifier(t, item.op_code);
							t = Runtime.rtl.get(res, 0);
							s = Runtime.rtl.get(res, 1);
						}
						if (item_expression != "")
						{
							if (op == "~=")
							{
								s += Runtime.rtl.toStr(" += " + Runtime.rtl.toStr(item_expression));
							}
							else
							{
								s += Runtime.rtl.toStr(" " + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(item_expression));
							}
						}
					}
				}
				if (t.current_function.isFlag("async") && t.isEmulateAsyncAwait())
				{
					if (item.expression == null)
					{
						s = "";
					}
					else if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						s = s + Runtime.rtl.toStr(";");
					}
				}
				else
				{
					s = s + Runtime.rtl.toStr(";");
				}
				if (s != "")
				{
					content += Runtime.rtl.toStr((flag_indent) ? (t.s(s)) : (s));
				}
				if (item.var_name != "" && t.save_vars.indexOf(item.var_name) == -1)
				{
					t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_vars"]), t.save_vars.pushIm(item.var_name));
				}
			}
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_STRUCT)
		{
			var s = op_code.var_name + Runtime.rtl.toStr(" = ");
			var res = this.OpAssignStruct(t, op_code, 0);
			t = Runtime.rtl.get(res, 0);
			content = t.s(s + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(";"));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDelete
	 */
	OpDelete: function(t, op_code)
	{
		var content = "";
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(t, op_code)
	{
		if (t.current_function.isFlag("async") && t.isEmulateAsyncAwait())
		{
			if (this.isAwait(op_code))
			{
				return t.async_await.constructor.OpFor(t, op_code);
			}
		}
		var content = "";
		var s1 = "";
		var s2 = "";
		var s3 = "";
		if (op_code.expr1 instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			var res = this.OpAssign(t, op_code.expr1, false);
			t = Runtime.rtl.get(res, 0);
			s1 = Runtime.rtl.get(res, 1);
		}
		else
		{
			var res = t.expression.constructor.Expression(t, op_code.expr1);
			t = Runtime.rtl.get(res, 0);
			s1 = Runtime.rtl.get(res, 1);
		}
		var res = t.expression.constructor.Expression(t, op_code.expr2);
		t = Runtime.rtl.get(res, 0);
		s2 = Runtime.rtl.get(res, 1);
		var res = t.expression.constructor.Expression(t, op_code.expr3);
		t = Runtime.rtl.get(res, 0);
		s3 = Runtime.rtl.get(res, 1);
		content = t.s("for (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(s2) + Runtime.rtl.toStr(";") + Runtime.rtl.toStr(s3) + Runtime.rtl.toStr(")"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(t, op_code)
	{
		if (t.current_function.isFlag("async") && t.isEmulateAsyncAwait())
		{
			if (this.isAwait(op_code))
			{
				return t.async_await.constructor.OpIf(t, op_code);
			}
		}
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = Runtime.rtl.get(res, 0);
		var s1 = Runtime.rtl.get(res, 1);
		content = t.s("if (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(")"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.if_true);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		for (var i = 0;i < op_code.if_else.count();i++)
		{
			var if_else = op_code.if_else.item(i);
			var res = t.expression.constructor.Expression(t, if_else.condition);
			t = Runtime.rtl.get(res, 0);
			var s2 = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(s2) + Runtime.rtl.toStr(")")));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, if_else.if_true);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
		}
		if (op_code.if_false != null)
		{
			content += Runtime.rtl.toStr(t.s("else"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, op_code.if_false);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(t, op_code)
	{
		if (t.current_function.isFlag("async") && t.isEmulateAsyncAwait())
		{
			return t.async_await.constructor.OpReturn(t, op_code);
		}
		var content = "";
		var s1 = "";
		if (op_code.expression)
		{
			var res = t.expression.constructor.Expression(t, op_code.expression);
			t = Runtime.rtl.get(res, 0);
			s1 = Runtime.rtl.get(res, 1);
		}
		if (t.current_function.flags != null && t.current_function.flags.isFlag("memorize"))
		{
			var content = t.s("var __memorize_value = " + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";"));
			content += Runtime.rtl.toStr(t.s(t.expression.constructor.useModuleName(t, "Runtime.rtl") + Runtime.rtl.toStr("._memorizeSave(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(t.current_function.name) + Runtime.rtl.toStr("\", arguments, __memorize_value);")));
			content += Runtime.rtl.toStr(t.s("return __memorize_value;"));
			return Runtime.Collection.from([t,content]);
		}
		if (t.current_function.isFlag("async") && t.isAsyncAwait())
		{
			content += Runtime.rtl.toStr(t.s("return Promise.resolve(" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(");")));
		}
		else
		{
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";")));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpThrow
	 */
	OpThrow: function(t, op_code)
	{
		var res = t.expression.constructor.Expression(t, op_code.expression);
		t = Runtime.rtl.get(res, 0);
		var content = t.s("throw " + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(t, op_code)
	{
		if (t.current_function.isFlag("async") && t.isEmulateAsyncAwait())
		{
			if (this.isAwait(op_code))
			{
				return t.async_await.constructor.OpTryCatch(t, op_code);
			}
		}
		var content = "";
		content += Runtime.rtl.toStr(t.s("try"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.op_try);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("catch (_ex)"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		for (var i = 0;i < op_code.items.count();i++)
		{
			var s = "";
			var pattern = "";
			var item = op_code.items.item(i);
			var res = t.expression.constructor.OpTypeIdentifier(t, item.pattern);
			t = Runtime.rtl.get(res, 0);
			pattern += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			if (pattern != "var")
			{
				s = "if (_ex instanceof " + Runtime.rtl.toStr(pattern) + Runtime.rtl.toStr(")");
			}
			else
			{
				s = "if (true)";
			}
			s += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			s += Runtime.rtl.toStr((s != "") ? (t.s("var " + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = _ex;"))) : ("var " + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = _ex;")));
			var res = t.operator.constructor.Operators(t, item.value);
			t = Runtime.rtl.get(res, 0);
			s += Runtime.rtl.toStr(t.s(Runtime.rtl.get(res, 1)));
			t = t.levelDec();
			s += Runtime.rtl.toStr(t.s("}"));
			if (i != 0)
			{
				s = "else " + Runtime.rtl.toStr(s);
			}
			content += Runtime.rtl.toStr(t.s(s));
		}
		content += Runtime.rtl.toStr(t.s("else"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("throw _ex;"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(t, op_code)
	{
		if (t.current_function.isFlag("async") && t.isEmulateAsyncAwait())
		{
			if (this.isAwait(op_code))
			{
				return t.async_await.constructor.OpWhile(t, op_code);
			}
		}
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = Runtime.rtl.get(res, 0);
		var s1 = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr(t.s("while (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpPreprocessorIfCode
	 */
	OpPreprocessorIfCode: function(t, op_code)
	{
		var content = "";
		if (Runtime.rtl.get(t.preprocessor_flags, op_code.condition.value) == true)
		{
			content = Runtime.rs.trim(op_code.content);
		}
		return Runtime.Collection.from([t,t.s(content)]);
	},
	/**
	 * OpPreprocessorIfDef
	 */
	OpPreprocessorIfDef: function(t, op_code, kind)
	{
		if (!(Runtime.rtl.get(t.preprocessor_flags, op_code.condition.value) == true))
		{
			return Runtime.Collection.from([t,""]);
		}
		if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR)
		{
			return this.Operators(t, op_code.items);
		}
		else if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION)
		{
			return t.expression.constructor.Expression(t, op_code.items);
		}
		var content = "";
		for (var i = 0;i < op_code.items.count();i++)
		{
			var item = op_code.items.item(i);
			if (item instanceof Bayrell.Lang.OpCodes.OpComment)
			{
				var res = t.operator.constructor.OpComment(t, item);
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
			{
				var res = t.program.constructor.OpDeclareFunction(t, item);
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpComment
	 */
	OpComment: function(t, op_code)
	{
		var content = t.s("/*" + Runtime.rtl.toStr(op_code.value) + Runtime.rtl.toStr("*/"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpComments
	 */
	OpComments: function(t, comments)
	{
		var content = "";
		for (var i = 0;i < comments.count();i++)
		{
			var res = this.OpComment(t, comments.item(i));
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpComments
	 */
	AddComments: function(t, comments, content)
	{
		if (comments && comments.count() > 0)
		{
			var res = this.OpComments(t, comments);
			var s = Runtime.rtl.get(res, 1);
			if (s != "")
			{
				content = s + Runtime.rtl.toStr(content);
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Operator
	 */
	Operator: function(t, op_code)
	{
		var content = "";
		/* Save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		if (op_code instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			var res = this.OpAssign(t, op_code);
			t = Runtime.rtl.get(res, 0);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content = save + Runtime.rtl.toStr(content);
			}
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			return Runtime.Collection.from([t,content]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAssignStruct)
		{
			var res = this.OpAssignStruct(t, op_code);
			t = Runtime.rtl.get(res, 0);
			var s1 = Runtime.rtl.get(res, 1);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content = save;
			}
			content += Runtime.rtl.toStr(t.s(op_code.var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";")));
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			return Runtime.Collection.from([t,content]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpBreak)
		{
			content = t.s("break;");
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			var res = t.expression.constructor.OpCall(t, op_code);
			t = Runtime.rtl.get(res, 0);
			if (Runtime.rtl.get(res, 1) != "")
			{
				content = t.s(Runtime.rtl.get(res, 1) + Runtime.rtl.toStr(";"));
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpContinue)
		{
			content = t.s("continue;");
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDelete)
		{
			var res = this.OpDelete(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpFor)
		{
			var res = this.OpFor(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpIf)
		{
			var res = this.OpIf(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			var res = t.expression.constructor.OpPipe(t, op_code, false);
			t = Runtime.rtl.get(res, 0);
			content = t.s(Runtime.rtl.get(res, 1) + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpReturn)
		{
			var res = this.OpReturn(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpThrow)
		{
			var res = this.OpThrow(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTryCatch)
		{
			var res = this.OpTryCatch(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpWhile)
		{
			var res = this.OpWhile(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpInc)
		{
			var res = t.expression.constructor.OpInc(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = t.s(Runtime.rtl.get(res, 1) + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
		{
			var res = this.OpPreprocessorIfCode(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			var res = this.OpPreprocessorIfDef(t, op_code, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorSwitch)
		{
			for (var i = 0;i < op_code.items.count();i++)
			{
				var res = this.OpPreprocessorIfCode(t, op_code.items.item(i));
				var s = Runtime.rtl.get(res, 1);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpComment)
		{
			var res = this.OpComment(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpSafe)
		{
			var res = this.Operators(t, op_code.items);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
		if (save != "")
		{
			content = save + Runtime.rtl.toStr(content);
		}
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		/*t <= save_op_code_inc <= save_op_code_inc;*/
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Operators
	 */
	Operators: function(t, op_code)
	{
		var content = "";
		if (op_code instanceof Bayrell.Lang.OpCodes.OpItems)
		{
			for (var i = 0;i < op_code.items.count();i++)
			{
				var item = op_code.items.item(i);
				var res = this.Operator(t, item);
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlItems)
		{
			var save_html_var_name = t.html_var_name;
			var save_is_html = t.is_html;
			/* Save op codes */
			/*
			Collection<SaveOpCode> save_op_codes = t.save_op_codes;
			int save_op_code_inc = t.save_op_code_inc;
			*/
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), true);
			var res = t.html.constructor.OpHtmlChilds(t, op_code, save_html_var_name, false);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
			/* Output save op code */
			/*
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content = save;
			*/
			/* Output content */
			/*
			content ~= t.s(save_html_var_name ~ "_childs.push(" ~ res[1] ~ ");");
			
			t <= save_op_codes <= save_op_codes;
			t <= save_op_code_inc <= save_op_code_inc;
			*/
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), save_is_html);
		}
		else
		{
			var res = this.Operator(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction Arguments
	 */
	OpDeclareFunctionArgs: function(t, f)
	{
		var content = "";
		if (f.args != null)
		{
			var flag = false;
			if (f.is_context)
			{
				content += Runtime.rtl.toStr("ctx");
				flag = true;
			}
			if (f.is_html)
			{
				flag = true;
				content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("component, render_params, render_content"));
			}
			for (var i = 0;i < f.args.count(i);i++)
			{
				var arg = f.args.item(i);
				var name = arg.name;
				content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(name));
				flag = true;
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(t, f)
	{
		var save_t = t;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), false);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), false);
		if (f.isFlag("async") && t.isEmulateAsyncAwait())
		{
			return t.async_await.constructor.OpDeclareFunctionBody(t, f);
		}
		/* Save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		var content = "";
		t = t.levelInc();
		if (f.args)
		{
			for (var i = 0;i < f.args.count();i++)
			{
				var arg = f.args.item(i);
				if (arg.expression == null)
				{
					continue;
				}
				var res = t.expression.constructor.Expression(t, arg.expression);
				t = Runtime.rtl.get(res, 0);
				var s = Runtime.rtl.get(res, 1);
				s = "if (" + Runtime.rtl.toStr(arg.name) + Runtime.rtl.toStr(" == undefined) ") + Runtime.rtl.toStr(arg.name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";");
				content += Runtime.rtl.toStr(t.s(s));
			}
		}
		if (f.items)
		{
			var res = t.operator.constructor.Operators(t, f.items);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		else if (f.expression)
		{
			var res = t.expression.constructor.Expression(t, f.expression);
			t = Runtime.rtl.get(res, 0);
			var expr = Runtime.rtl.get(res, 1);
			var s = "";
			if (f.flags != null && f.flags.isFlag("memorize"))
			{
				s = t.s("var __memorize_value = " + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(";"));
				s += Runtime.rtl.toStr(t.s(t.expression.constructor.useModuleName(t, "Runtime.rtl") + Runtime.rtl.toStr("._memorizeSave(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(f.name) + Runtime.rtl.toStr("\", arguments, __memorize_value);")));
				s += Runtime.rtl.toStr(t.s("return __memorize_value;"));
			}
			else
			{
				s = t.s("return " + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(";"));
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(s);
		}
		if (f.flags != null && f.flags.isFlag("memorize"))
		{
			var s = "";
			s += Runtime.rtl.toStr(t.s("var __memorize_value = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.rtl")) + Runtime.rtl.toStr("._memorizeValue(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(f.name) + Runtime.rtl.toStr("\", arguments);")));
			s += Runtime.rtl.toStr(t.s("if (__memorize_value != " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.rtl")) + Runtime.rtl.toStr("._memorize_not_found) return __memorize_value;")));
			content = s + Runtime.rtl.toStr(content);
		}
		t = t.levelDec();
		content = t.s("{") + Runtime.rtl.toStr(content);
		content += Runtime.rtl.toStr(t.s("}"));
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		return Runtime.Collection.from([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Operator";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isAwait",
			"OpAssignStruct",
			"OpAssign",
			"OpDelete",
			"OpFor",
			"OpIf",
			"OpReturn",
			"OpThrow",
			"OpTryCatch",
			"OpWhile",
			"OpPreprocessorIfCode",
			"OpPreprocessorIfDef",
			"OpComment",
			"OpComments",
			"AddComments",
			"Operator",
			"Operators",
			"OpDeclareFunctionArgs",
			"OpDeclareFunctionBody",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6Operator);
window["Bayrell.Lang.LangES6.TranslatorES6Operator"] = Bayrell.Lang.LangES6.TranslatorES6Operator;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangES6.TranslatorES6Operator;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Program = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6Program.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.LangES6.TranslatorES6Program.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6Program;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program.prototype,
{
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program,
{
	/**
	 * To pattern
	 */
	toPattern: function(t, pattern)
	{
		var names = t.expression.constructor.findModuleNames(t, pattern.entity_name.names);
		var e = Runtime.rs.join(".", names);
		var a = (pattern.template != null) ? (pattern.template.map((pattern) => 
		{
			return this.toPattern(t, pattern);
		})) : (null);
		var b = (a != null) ? (",\"t\":[" + Runtime.rtl.toStr(Runtime.rs.join(",", a)) + Runtime.rtl.toStr("]")) : ("");
		return "{\"e\":" + Runtime.rtl.toStr(t.expression.constructor.toString(e)) + Runtime.rtl.toStr(b) + Runtime.rtl.toStr("}");
	},
	/**
	 * OpNamespace
	 */
	OpNamespace: function(t, op_code)
	{
		var content = "";
		var name = "";
		var s = "";
		var arr = Runtime.rs.split("\\.", op_code.name);
		for (var i = 0;i < arr.count();i++)
		{
			name = name + Runtime.rtl.toStr(((i == 0) ? ("") : ("."))) + Runtime.rtl.toStr(arr.item(i));
			s = "if (typeof " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(" == 'undefined') ") + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(" = {};");
			content += Runtime.rtl.toStr(t.s(s));
		}
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_namespace_name"]), op_code.name);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction
	 */
	OpDeclareFunction: function(t, op_code)
	{
		var is_static_function = t.is_static_function;
		var is_static = op_code.isStatic();
		var content = "";
		if (op_code.isFlag("declare"))
		{
			return Runtime.Collection.from([t,""]);
		}
		if (!is_static && is_static_function || is_static && !is_static_function)
		{
			return Runtime.Collection.from([t,""]);
		}
		/* Set current function */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code);
		var is_async = "";
		if (op_code.isFlag("async") && t.isAsyncAwait())
		{
			is_async = "async ";
		}
		var s = "";
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code);
		var args = Runtime.rtl.get(res, 1);
		s += Runtime.rtl.toStr(op_code.name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(is_async) + Runtime.rtl.toStr("function(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
		var res = t.operator.constructor.OpDeclareFunctionBody(t, op_code);
		s += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		s += Runtime.rtl.toStr(",");
		/* Function comments */
		var res = t.operator.constructor.AddComments(t, op_code.comments, t.s(s));
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassConstructor: function(t, op_code)
	{
		var open = "";
		var content = "";
		var save_t = t;
		/* Set function name */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code.fn_create);
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(t);
		if (op_code.fn_create == null)
		{
			open += Runtime.rtl.toStr(t.current_class_full_name + Runtime.rtl.toStr(" = "));
			open += Runtime.rtl.toStr("function()");
			open = t.s(open) + Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			/* Call parent */
			if (t.current_class_extends_name != "")
			{
				content += Runtime.rtl.toStr(t.s(t.expression.constructor.useModuleName(t, t.current_class_extends_name) + Runtime.rtl.toStr(".apply(this, arguments);")));
			}
		}
		else
		{
			open += Runtime.rtl.toStr(t.current_class_full_name + Runtime.rtl.toStr(" = function("));
			var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code.fn_create);
			t = Runtime.rtl.get(res, 0);
			open += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			open += Runtime.rtl.toStr(")");
			open = t.s(open) + Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
		}
		/* Function body */
		if (op_code.fn_create != null)
		{
			if (op_code.fn_create.args)
			{
				for (var i = 0;i < op_code.fn_create.args.count();i++)
				{
					var arg = op_code.fn_create.args.item(i);
					if (arg.expression == null)
					{
						continue;
					}
					var res = t.expression.constructor.Expression(t, arg.expression);
					t = Runtime.rtl.get(res, 0);
					var s = Runtime.rtl.get(res, 1);
					s = "if (" + Runtime.rtl.toStr(arg.name) + Runtime.rtl.toStr(" == undefined) ") + Runtime.rtl.toStr(arg.name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";");
					content += Runtime.rtl.toStr(t.s(s));
				}
			}
			var res = t.operator.constructor.Operators(t, (op_code.fn_create.expression) ? (op_code.fn_create.expression) : (op_code.fn_create.items));
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		/* Constructor end */
		content = open + Runtime.rtl.toStr(content);
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("};"));
		return Runtime.Collection.from([save_t,content]);
	},
	/**
	 * OpDeclareClassBodyItem
	 */
	OpDeclareClassBodyItem: function(t, item)
	{
		var content = "";
		if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			var res = t.operator.constructor.OpPreprocessorIfDef(t, item, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_CLASS_BODY);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpFunctionAnnotations
	 */
	OpFunctionAnnotations: function(t, f)
	{
		var content = "";
		if (f.flags.isFlag("declare"))
		{
			return Runtime.Collection.from([t,content]);
		}
		if (!f.annotations)
		{
			return Runtime.Collection.from([t,content]);
		}
		if (f.annotations.count() == 0)
		{
			return Runtime.Collection.from([t,content]);
		}
		content += Runtime.rtl.toStr(t.s("if (field_name == " + Runtime.rtl.toStr(t.expression.constructor.toString(f.name)) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		var s1 = "";
		t = t.levelInc();
		s1 += Runtime.rtl.toStr(t.s("var Collection = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Collection")) + Runtime.rtl.toStr(";")));
		s1 += Runtime.rtl.toStr(t.s("var Dict = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Dict")) + Runtime.rtl.toStr(";")));
		s1 += Runtime.rtl.toStr(t.s("return Dict.from({"));
		t = t.levelInc();
		if (f.flags.isFlag("async"))
		{
			s1 += Runtime.rtl.toStr(t.s("\"async\": true,"));
		}
		s1 += Runtime.rtl.toStr(t.s("\"annotations\": Collection.from(["));
		t = t.levelInc();
		for (var j = 0;j < f.annotations.count();j++)
		{
			var annotation = f.annotations.item(j);
			var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
			t = Runtime.rtl.get(res, 0);
			var name = Runtime.rtl.get(res, 1);
			var res = t.expression.constructor.OpDict(t, annotation.params, true);
			t = Runtime.rtl.get(res, 0);
			var params = Runtime.rtl.get(res, 1);
			s1 += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
		}
		t = t.levelDec();
		s1 += Runtime.rtl.toStr(t.s("]),"));
		t = t.levelDec();
		s1 += Runtime.rtl.toStr(t.s("});"));
		var save = t.constructor.outputSaveOpCode(t);
		if (save != "")
		{
			content += Runtime.rtl.toStr(t.s(save));
		}
		content += Runtime.rtl.toStr(s1);
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassBodyItemMethodsList
	 */
	OpClassBodyItemMethodsList: function(t, item)
	{
		var content = "";
		if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			if (Runtime.rtl.get(t.preprocessor_flags, item.condition.value) == true)
			{
				for (var i = 0;i < item.items.count();i++)
				{
					var op_code = item.items.item(i);
					var res = this.OpClassBodyItemMethodsList(t, op_code);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
		}
		else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			if (!item.flags.isFlag("declare") && !item.flags.isFlag("protected") && !item.flags.isFlag("private"))
			{
				content += Runtime.rtl.toStr(t.s(t.expression.constructor.toString(item.name) + Runtime.rtl.toStr(",")));
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassBodyItemAnnotations
	 */
	OpClassBodyItemAnnotations: function(t, item)
	{
		var content = "";
		if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			if (Runtime.rtl.get(t.preprocessor_flags, item.condition.value) == true)
			{
				for (var i = 0;i < item.items.count();i++)
				{
					var op_code = item.items.item(i);
					var res = this.OpClassBodyItemAnnotations(t, op_code);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
		}
		else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			var res = this.OpFunctionAnnotations(t, item);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBodyStatic: function(t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		var current_class_extends_name = t.expression.constructor.findModuleName(t, t.current_class_extends_name);
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		t = t.constructor.clearSaveOpCode(t);
		/* Returns parent class name */
		var parent_class_name = "";
		if (op_code.class_extends != null)
		{
			var res = t.expression.constructor.OpTypeIdentifier(t, op_code.class_extends);
			parent_class_name = Runtime.rtl.get(res, 1);
		}
		if (current_class_extends_name != "")
		{
			content += Runtime.rtl.toStr(t.s("Object.assign(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, current_class_extends_name)) + Runtime.rtl.toStr(");")));
		}
		content += Runtime.rtl.toStr(t.s("Object.assign(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(",")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* Static variables */
		if (op_code.vars != null)
		{
			for (var i = 0;i < op_code.vars.count();i++)
			{
				var variable = op_code.vars.item(i);
				if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
				{
					continue;
				}
				var is_static = variable.flags.isFlag("static");
				if (!is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count();j++)
				{
					var value = variable.values.item(j);
					var res = t.expression.constructor.Expression(t, value.expression);
					var s = (value.expression != null) ? (Runtime.rtl.get(res, 1)) : ("null");
					content += Runtime.rtl.toStr(t.s(value.var_name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(",")));
				}
			}
		}
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			/* Static Functions */
			if (op_code.functions != null)
			{
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), true);
				for (var i = 0;i < op_code.functions.count();i++)
				{
					var f = op_code.functions.item(i);
					if (f.flags.isFlag("declare"))
					{
						continue;
					}
					if (!f.isStatic())
					{
						continue;
					}
					/* Set function name */
					t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), f);
					var is_async = "";
					if (f.isFlag("async") && t.isAsyncAwait())
					{
						is_async = "async ";
					}
					var s = "";
					var res = t.operator.constructor.OpDeclareFunctionArgs(t, f);
					var args = Runtime.rtl.get(res, 1);
					s += Runtime.rtl.toStr(f.name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(is_async) + Runtime.rtl.toStr("function(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
					var res = t.operator.constructor.OpDeclareFunctionBody(t, f);
					s += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
					s += Runtime.rtl.toStr(",");
					/* Function comments */
					var res = t.operator.constructor.AddComments(t, f.comments, t.s(s));
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
			/* Items */
			if (op_code.items != null)
			{
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), true);
				for (var i = 0;i < op_code.items.count();i++)
				{
					var item = op_code.items.item(i);
					var res = this.OpDeclareClassBodyItem(t, item);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
			content += Runtime.rtl.toStr(t.s("/* ======================= Class Init Functions ======================= */"));
			/* Get current namespace function */
			content += Runtime.rtl.toStr(t.s("getNamespace: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_namespace_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Get current class name function */
			content += Runtime.rtl.toStr(t.s("getClassName: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_class_full_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Get parent class name function */
			content += Runtime.rtl.toStr(t.s("getParentClassName: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(current_class_extends_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Class info */
			content += Runtime.rtl.toStr(t.s("getClassInfo: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			t = t.constructor.clearSaveOpCode(t);
			var s1 = "";
			s1 += Runtime.rtl.toStr(t.s("var Collection = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Collection")) + Runtime.rtl.toStr(";")));
			s1 += Runtime.rtl.toStr(t.s("var Dict = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Dict")) + Runtime.rtl.toStr(";")));
			s1 += Runtime.rtl.toStr(t.s("return Dict.from({"));
			t = t.levelInc();
			s1 += Runtime.rtl.toStr(t.s("\"annotations\": Collection.from(["));
			t = t.levelInc();
			for (var j = 0;j < op_code.annotations.count();j++)
			{
				var annotation = op_code.annotations.item(j);
				var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
				t = Runtime.rtl.get(res, 0);
				var name = Runtime.rtl.get(res, 1);
				if (annotation.params != null)
				{
					var res = t.expression.constructor.OpDict(t, annotation.params, true);
					t = Runtime.rtl.get(res, 0);
					var params = Runtime.rtl.get(res, 1);
					s1 += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
				}
				else
				{
					s1 += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(),")));
				}
			}
			t = t.levelDec();
			s1 += Runtime.rtl.toStr(t.s("]),"));
			t = t.levelDec();
			s1 += Runtime.rtl.toStr(t.s("});"));
			var save = t.constructor.outputSaveOpCode(t);
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(s1);
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Get fields list of the function */
			t = t.constructor.clearSaveOpCode(t);
			content += Runtime.rtl.toStr(t.s("getFieldsList: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("var a = [];"));
			if (op_code.vars != null)
			{
				var vars = new Runtime.Map();
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					var is_const = variable.flags.isFlag("const");
					var is_static = variable.flags.isFlag("static");
					var is_protected = variable.flags.isFlag("protected");
					var is_private = variable.flags.isFlag("private");
					var is_serializable = variable.flags.isFlag("serializable");
					var is_assignable = true;
					var has_annotation = variable.annotations != null && variable.annotations.count() > 0;
					if (is_const || is_static)
					{
						continue;
					}
					if (is_protected || is_private)
					{
						continue;
					}
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						content += Runtime.rtl.toStr(t.s("a.push(" + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(");")));
					}
				}
			}
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Collection")) + Runtime.rtl.toStr(".from(a);")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Get field info by name */
			content += Runtime.rtl.toStr(t.s("getFieldInfoByName: function(field_name)"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			if (op_code.vars != null)
			{
				content += Runtime.rtl.toStr(t.s("var Collection = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Collection")) + Runtime.rtl.toStr(";")));
				content += Runtime.rtl.toStr(t.s("var Dict = " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Dict")) + Runtime.rtl.toStr(";")));
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
					{
						continue;
					}
					var is_const = variable.flags.isFlag("const");
					var is_static = variable.flags.isFlag("static");
					var is_protected = variable.flags.isFlag("protected");
					var is_private = variable.flags.isFlag("private");
					if (is_const || is_static)
					{
						continue;
					}
					if (is_protected || is_private)
					{
						continue;
					}
					var v = variable.values.map((value) => 
					{
						return value.var_name;
					});
					v = v.map((var_name) => 
					{
						return "field_name == " + Runtime.rtl.toStr(t.expression.constructor.toString(var_name));
					});
					var var_type = Runtime.rs.join(".", t.expression.constructor.findModuleNames(t, variable.pattern.entity_name.names));
					var var_sub_types = (variable.pattern.template != null) ? (variable.pattern.template.map((op_code) => 
					{
						return Runtime.rs.join(".", t.expression.constructor.findModuleNames(t, op_code.entity_name.names));
					})) : (Runtime.Collection.from([]));
					var_sub_types = var_sub_types.map(t.expression.constructor.toString);
					t = t.constructor.clearSaveOpCode(t);
					var s1 = "";
					s1 += Runtime.rtl.toStr(t.s("if (" + Runtime.rtl.toStr(Runtime.rs.join(" or ", v)) + Runtime.rtl.toStr(") return Dict.from({")));
					t = t.levelInc();
					s1 += Runtime.rtl.toStr(t.s("\"t\": " + Runtime.rtl.toStr(t.expression.constructor.toString(var_type)) + Runtime.rtl.toStr(",")));
					if (var_sub_types.count() > 0)
					{
						s1 += Runtime.rtl.toStr(t.s("\"s\": [" + Runtime.rtl.toStr(Runtime.rs.join(", ", var_sub_types)) + Runtime.rtl.toStr("],")));
					}
					s1 += Runtime.rtl.toStr(t.s("\"annotations\": Collection.from(["));
					t = t.levelInc();
					for (var j = 0;j < variable.annotations.count();j++)
					{
						var annotation = variable.annotations.item(j);
						var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
						t = Runtime.rtl.get(res, 0);
						var name = Runtime.rtl.get(res, 1);
						var res = t.expression.constructor.OpDict(t, annotation.params, true);
						t = Runtime.rtl.get(res, 0);
						var params = Runtime.rtl.get(res, 1);
						s1 += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
					}
					t = t.levelDec();
					s1 += Runtime.rtl.toStr(t.s("]),"));
					t = t.levelDec();
					s1 += Runtime.rtl.toStr(t.s("});"));
					var save = t.constructor.outputSaveOpCode(t);
					if (save != "")
					{
						content += Runtime.rtl.toStr(save);
					}
					content += Runtime.rtl.toStr(s1);
				}
			}
			content += Runtime.rtl.toStr(t.s("return null;"));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Get methods list of the function */
			t = t.constructor.clearSaveOpCode(t);
			content += Runtime.rtl.toStr(t.s("getMethodsList: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("var a=["));
			t = t.levelInc();
			if (op_code.functions != null && false)
			{
				for (var i = 0;i < op_code.functions.count();i++)
				{
					var f = op_code.functions.item(i);
					if (f.flags.isFlag("declare"))
					{
						continue;
					}
					if (f.flags.isFlag("protected"))
					{
						continue;
					}
					if (f.flags.isFlag("private"))
					{
						continue;
					}
					if (f.annotations.count() == 0)
					{
						continue;
					}
					content += Runtime.rtl.toStr(t.s(t.expression.constructor.toString(f.name) + Runtime.rtl.toStr(",")));
				}
			}
			if (op_code.items != null)
			{
				for (var i = 0;i < op_code.items.count();i++)
				{
					var item = op_code.items.item(i);
					var res = this.OpClassBodyItemMethodsList(t, item);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("];"));
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, "Runtime.Collection")) + Runtime.rtl.toStr(".from(a);")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Get method info by name */
			t = t.constructor.clearSaveOpCode(t);
			content += Runtime.rtl.toStr(t.s("getMethodInfoByName: function(field_name)"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count();i++)
				{
					var f = op_code.functions.item(i);
					var res = this.OpFunctionAnnotations(t, f);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
			if (op_code.items != null)
			{
				for (var i = 0;i < op_code.items.count();i++)
				{
					var item = op_code.items.item(i);
					var res = this.OpClassBodyItemAnnotations(t, item);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
			content += Runtime.rtl.toStr(t.s("return null;"));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Add implements */
			if (op_code.class_implements != null && op_code.class_implements.count() > 0)
			{
				content += Runtime.rtl.toStr(t.s("__implements__:"));
				content += Runtime.rtl.toStr(t.s("["));
				t = t.levelInc();
				for (var i = 0;i < op_code.class_implements.count();i++)
				{
					var item = op_code.class_implements.item(i);
					var module_name = item.entity_name.names.first();
					var s = t.expression.constructor.useModuleName(t, module_name);
					if (s == "")
					{
						continue;
					}
					content += Runtime.rtl.toStr(t.s(s + Runtime.rtl.toStr(",")));
				}
				t = t.levelDec();
				content += Runtime.rtl.toStr(t.s("],"));
			}
		}
		else
		{
			/* Get current namespace function */
			content += Runtime.rtl.toStr(t.s("getNamespace: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_namespace_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
			/* Get current class name function */
			content += Runtime.rtl.toStr(t.s("getClassName: function()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_class_full_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("},"));
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("});"));
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBody: function(t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		content += Runtime.rtl.toStr(t.s("Object.assign(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".prototype,")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* Functions */
		if (op_code.functions != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), false);
			for (var i = 0;i < op_code.functions.count();i++)
			{
				var f = op_code.functions.item(i);
				if (f.flags.isFlag("declare"))
				{
					continue;
				}
				if (f.isStatic())
				{
					continue;
				}
				/* Set function name */
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), f);
				var is_async = "";
				if (f.isFlag("async") && t.isAsyncAwait())
				{
					is_async = "async ";
				}
				var s = "";
				var res = t.operator.constructor.OpDeclareFunctionArgs(t, f);
				var args = Runtime.rtl.get(res, 1);
				s += Runtime.rtl.toStr(f.name + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(is_async) + Runtime.rtl.toStr("function(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
				var res = t.operator.constructor.OpDeclareFunctionBody(t, f);
				s += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				s += Runtime.rtl.toStr(",");
				/* Function comments */
				var res = t.operator.constructor.AddComments(t, f.comments, t.s(s));
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
		}
		/* Items */
		if (op_code.items != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), false);
			for (var i = 0;i < op_code.items.count();i++)
			{
				var item = op_code.items.item(i);
				var res = this.OpDeclareClassBodyItem(t, item);
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
		}
		/* Init variables */
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE && op_code.vars != null)
		{
			var vars = op_code.vars.filter((variable) => 
			{
				return !variable.flags.isFlag("static");
			});
			if (t.current_class_full_name != "Runtime.BaseObject" && vars.count() > 0)
			{
				content += Runtime.rtl.toStr(t.s("_init: function()"));
				content += Runtime.rtl.toStr(t.s("{"));
				t = t.levelInc();
				/* Clear save op codes */
				var save_op_codes = t.save_op_codes;
				var save_op_code_inc = t.save_op_code_inc;
				if (t.current_class_extends_name != "")
				{
					content += Runtime.rtl.toStr(t.s(t.expression.constructor.useModuleName(t, t.current_class_extends_name) + Runtime.rtl.toStr(".prototype._init.call(this);")));
				}
				var s1 = "";
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					var is_static = variable.flags.isFlag("static");
					if (is_static)
					{
						continue;
					}
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
					{
						continue;
					}
					var prefix = "";
					if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
					{
						/* prefix = "__"; */
						prefix = "";
					}
					else if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_CLASS)
					{
						prefix = "";
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						var res = t.expression.constructor.Expression(t, value.expression);
						t = Runtime.rtl.get(res, 0);
						var s = (value.expression != null) ? (Runtime.rtl.get(res, 1)) : ("null");
						s1 += Runtime.rtl.toStr(t.s("this." + Runtime.rtl.toStr(prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";")));
					}
				}
				/* Output save op code */
				var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
				if (save != "")
				{
					content += Runtime.rtl.toStr(save);
				}
				/* Restore save op codes */
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
				/* Add content */
				content += Runtime.rtl.toStr(s1);
				t = t.levelDec();
				content += Runtime.rtl.toStr(t.s("},"));
			}
			/* Struct */
			if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT || t.enable_introspection)
			{
				var is_struct = class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT;
				var var_prefix = "";
				if (!is_struct)
				{
					/* Assign Object */
					content += Runtime.rtl.toStr(t.s("assignObject: function(o)"));
					content += Runtime.rtl.toStr(t.s("{"));
					t = t.levelInc();
					content += Runtime.rtl.toStr(t.s("if (o instanceof " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, t.current_class_full_name)) + Runtime.rtl.toStr(")")));
					content += Runtime.rtl.toStr(t.s("{"));
					t = t.levelInc();
					for (var i = 0;i < op_code.vars.count();i++)
					{
						var variable = op_code.vars.item(i);
						if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
						{
							continue;
						}
						if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
						{
							continue;
						}
						var is_const = variable.flags.isFlag("const");
						var is_static = variable.flags.isFlag("static");
						var is_protected = variable.flags.isFlag("protected");
						var is_private = variable.flags.isFlag("private");
						if (is_const || is_static)
						{
							continue;
						}
						if (is_protected || is_private)
						{
							continue;
						}
						for (var j = 0;j < variable.values.count();j++)
						{
							var value = variable.values.item(j);
							content += Runtime.rtl.toStr(t.s("this." + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = o.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
						}
					}
					t = t.levelDec();
					content += Runtime.rtl.toStr(t.s("}"));
					if (t.current_class_extends_name != "")
					{
						content += Runtime.rtl.toStr(t.s(t.expression.constructor.useModuleName(t, t.current_class_extends_name) + Runtime.rtl.toStr(".prototype.assignObject.call(this,o);")));
					}
					t = t.levelDec();
					content += Runtime.rtl.toStr(t.s("},"));
					/* Assign Value */
					content += Runtime.rtl.toStr(t.s("assignValue: function(k,v)"));
					content += Runtime.rtl.toStr(t.s("{"));
					t = t.levelInc();
					var flag = false;
					for (var i = 0;i < op_code.vars.count();i++)
					{
						var variable = op_code.vars.item(i);
						if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
						{
							continue;
						}
						if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
						{
							continue;
						}
						var is_const = variable.flags.isFlag("const");
						var is_static = variable.flags.isFlag("static");
						var is_protected = variable.flags.isFlag("protected");
						var is_private = variable.flags.isFlag("private");
						if (is_const || is_static)
						{
							continue;
						}
						if (is_protected || is_private)
						{
							continue;
						}
						for (var j = 0;j < variable.values.count();j++)
						{
							var value = variable.values.item(j);
							if (t.flag_struct_check_types)
							{
								content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("if (k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("this.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = Runtime.rtl.to(v, null, ") + Runtime.rtl.toStr(this.toPattern(t, variable.pattern)) + Runtime.rtl.toStr(");")));
							}
							else
							{
								content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("if (k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("this.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = v;")));
							}
							flag = true;
						}
					}
					if (t.current_class_extends_name != "")
					{
						content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + Runtime.rtl.toStr(".prototype.assignValue.call(this,k,v);")));
					}
					t = t.levelDec();
					content += Runtime.rtl.toStr(t.s("},"));
				}
				/* Take Value */
				content += Runtime.rtl.toStr(t.s("takeValue: function(k,d)"));
				content += Runtime.rtl.toStr(t.s("{"));
				t = t.levelInc();
				content += Runtime.rtl.toStr(t.s("if (d == undefined) d = null;"));
				var flag = false;
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
					{
						continue;
					}
					var is_const = variable.flags.isFlag("const");
					var is_static = variable.flags.isFlag("static");
					var is_protected = variable.flags.isFlag("protected");
					var is_private = variable.flags.isFlag("private");
					if (is_const || is_static)
					{
						continue;
					}
					if (is_protected || is_private)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("if (k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(")return this.") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
						flag = true;
					}
				}
				if (t.current_class_extends_name != "")
				{
					content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + Runtime.rtl.toStr(".prototype.takeValue.call(this,k,d);")));
				}
				t = t.levelDec();
				content += Runtime.rtl.toStr(t.s("},"));
			}
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("});"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(t, op_code)
	{
		var content = "";
		var rtl_module_name = t.expression.constructor.useModuleName(t, "Runtime.rtl");
		if (!t.use_module_name)
		{
			content += Runtime.rtl.toStr(t.s(rtl_module_name + Runtime.rtl.toStr(".defClass(") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(");")));
			content += Runtime.rtl.toStr(t.s("window[\"" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr("\"] = ") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(";")));
		}
		content += Runtime.rtl.toStr(t.s("if (typeof module != \"undefined\" && typeof module.exports != \"undefined\") " + Runtime.rtl.toStr("module.exports = ") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(";")));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClass: function(t, op_code)
	{
		if (op_code.is_abstract)
		{
			return Runtime.Collection.from([t,""]);
		}
		if (op_code.is_declare)
		{
			throw new Bayrell.Lang.Exceptions.DeclaredClass()
			return Runtime.Collection.from([t,""]);
		}
		var content = "";
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class"]), op_code);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_name"]), op_code.name);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_full_name"]), t.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(t.current_class_name));
		if (op_code.class_extends != null)
		{
			var extends_name = Runtime.rs.join(".", op_code.class_extends.entity_name.names);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_extends_name"]), extends_name);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_extends_name"]), "Runtime.BaseStruct");
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_extends_name"]), "");
		}
		/* Constructor */
		var res = this.OpDeclareClassConstructor(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* Extends */
		if (op_code.class_extends != null)
		{
			content += Runtime.rtl.toStr(t.s(t.current_class_full_name + Runtime.rtl.toStr(".prototype = Object.create(") + Runtime.rtl.toStr(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + Runtime.rtl.toStr(".prototype);")));
			content += Runtime.rtl.toStr(t.s(t.current_class_full_name + Runtime.rtl.toStr(".prototype.constructor = ") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(";")));
		}
		/* Class body */
		var res = this.OpDeclareClassBody(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* Class static functions */
		var res = this.OpDeclareClassBodyStatic(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* Class comments */
		var res = t.operator.constructor.AddComments(t, op_code.comments, content);
		content = Runtime.rtl.get(res, 1);
		/* Class footer */
		var res = this.OpDeclareClassFooter(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translate item
	 */
	translateItem: function(t, op_code)
	{
		if (op_code instanceof Bayrell.Lang.OpCodes.OpNamespace)
		{
			return this.OpNamespace(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDeclareClass)
		{
			return this.OpDeclareClass(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpComment)
		{
			return t.operator.constructor.OpComment(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
		{
			return t.operator.constructor.OpPreprocessorIfCode(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorSwitch)
		{
			var content = "";
			for (var i = 0;i < op_code.items.count();i++)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(t, op_code.items.item(i));
				var s = Runtime.rtl.get(res, 1);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
			return Runtime.Collection.from([t,content]);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * Translate program
	 */
	translateProgramHeader: function(t, op_code)
	{
		var content = "";
		if (t.use_strict)
		{
			content = t.s("\"use strict;\"");
		}
		/* content ~= t.s("var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')"~
			" ? Runtime.rtl.find_class : null;"); */
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translate program
	 */
	translateProgram: function(t, op_code)
	{
		var content = "";
		if (op_code == null)
		{
			return Runtime.Collection.from([t,content]);
		}
		if (op_code.uses != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["modules"]), op_code.uses);
		}
		if (op_code.items != null)
		{
			var res = this.translateProgramHeader(t, op_code);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			for (var i = 0;i < op_code.items.count();i++)
			{
				var item = op_code.items.item(i);
				var res = this.translateItem(t, item);
				t = Runtime.rtl.get(res, 0);
				var s = Runtime.rtl.get(res, 1);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
		}
		content = Runtime.rs.trim(content);
		/* Disable context */
		if (t.enable_context == false)
		{
			content = Runtime.rs.replace("\\(" + Runtime.rtl.toStr("ctx\\)"), "()", content);
			content = Runtime.rs.replace("\\(" + Runtime.rtl.toStr("ctx, "), "(", content);
			content = Runtime.rs.replace("\\(" + Runtime.rtl.toStr("ctx,"), "(", content);
			content = Runtime.rs.replace("," + Runtime.rtl.toStr("ctx,"), ",", content);
			content = Runtime.rs.replace("this," + Runtime.rtl.toStr("ctx"), "this", content);
			content = Runtime.rs.replace("this," + Runtime.rtl.toStr(" ctx"), "this", content);
		}
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"toPattern",
			"OpNamespace",
			"OpDeclareFunction",
			"OpDeclareClassConstructor",
			"OpDeclareClassBodyItem",
			"OpFunctionAnnotations",
			"OpClassBodyItemMethodsList",
			"OpClassBodyItemAnnotations",
			"OpDeclareClassBodyStatic",
			"OpDeclareClassBody",
			"OpDeclareClassFooter",
			"OpDeclareClass",
			"translateItem",
			"translateProgramHeader",
			"translateProgram",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6Program);
window["Bayrell.Lang.LangES6.TranslatorES6Program"] = Bayrell.Lang.LangES6.TranslatorES6Program;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangES6.TranslatorES6Program;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHP = function()
{
	Bayrell.Lang.CoreTranslator.apply(this, arguments);
};
Bayrell.Lang.LangPHP.TranslatorPHP.prototype = Object.create(Bayrell.Lang.CoreTranslator.prototype);
Bayrell.Lang.LangPHP.TranslatorPHP.prototype.constructor = Bayrell.Lang.LangPHP.TranslatorPHP;
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHP.prototype,
{
	_init: function()
	{
		Bayrell.Lang.CoreTranslator.prototype._init.call(this);
		this.is_pipe = false;
		this.pipe_var_name = "";
		this.html_var_name = "";
		this.is_html = false;
		this.expression = null;
		this.html = null;
		this.operator = null;
		this.program = null;
		this.frontend = false;
		this.backend = true;
		this.enable_context = false;
		this.enable_check_types = false;
		this.enable_introspection = true;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "is_pipe")return this.is_pipe;
		else if (k == "pipe_var_name")return this.pipe_var_name;
		else if (k == "html_var_name")return this.html_var_name;
		else if (k == "is_html")return this.is_html;
		else if (k == "expression")return this.expression;
		else if (k == "html")return this.html;
		else if (k == "operator")return this.operator;
		else if (k == "program")return this.program;
		else if (k == "frontend")return this.frontend;
		else if (k == "backend")return this.backend;
		else if (k == "enable_context")return this.enable_context;
		else if (k == "enable_check_types")return this.enable_check_types;
		else if (k == "enable_introspection")return this.enable_introspection;
		return Bayrell.Lang.CoreTranslator.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHP, Bayrell.Lang.CoreTranslator);
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHP,
{
	/**
	 * Reset translator
	 */
	reset: function(t)
	{
		return t.copy(Runtime.Dict.from({"value":"","current_namespace_name":"","modules":new Runtime.Dict(),"expression":new Bayrell.Lang.LangPHP.TranslatorPHPExpression(),"html":new Bayrell.Lang.LangPHP.TranslatorPHPHtml(),"operator":new Bayrell.Lang.LangPHP.TranslatorPHPOperator(),"program":new Bayrell.Lang.LangPHP.TranslatorPHPProgram(),"save_vars":new Runtime.Collection(),"save_op_codes":new Runtime.Collection(),"save_op_code_inc":0,"preprocessor_flags":Runtime.Dict.from({"PHP":true,"FRONTEND":t.frontend,"BACKEND":t.backend,"ENABLE_CONTEXT":t.enable_context,"ENABLE_CHECK_TYPES":t.enable_check_types})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(t, op_code)
	{
		t = this.reset(t);
		return t.program.constructor.translateProgram(t, op_code);
	},
	/**
	 * Inc save op code
	 */
	nextSaveOpCode: function(t)
	{
		return "$__v" + Runtime.rtl.toStr(t.save_op_code_inc);
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		var content = "";
		for (var i = 0;i < t.save_op_codes.count();i++)
		{
			if (i < save_op_code_value)
			{
				continue;
			}
			var save = t.save_op_codes.item(i);
			var s = (save.content == "") ? (t.s(save.var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(save.var_content) + Runtime.rtl.toStr(";"))) : (save.content);
			content += Runtime.rtl.toStr(s);
		}
		return content;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHP";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("is_pipe");
		a.push("pipe_var_name");
		a.push("html_var_name");
		a.push("is_html");
		a.push("expression");
		a.push("html");
		a.push("operator");
		a.push("program");
		a.push("frontend");
		a.push("backend");
		a.push("enable_context");
		a.push("enable_check_types");
		a.push("enable_introspection");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "is_pipe") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pipe_var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html_var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.LangPHP.TranslatorPHPExpression",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html") return Dict.from({
			"t": "Bayrell.Lang.LangPHP.TranslatorPHPHtml",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "operator") return Dict.from({
			"t": "Bayrell.Lang.LangPHP.TranslatorPHPOperator",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "program") return Dict.from({
			"t": "Bayrell.Lang.LangPHP.TranslatorPHPProgram",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "frontend") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "backend") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_context") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_check_types") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_introspection") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"reset",
			"translate",
			"nextSaveOpCode",
			"outputSaveOpCode",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHP);
window["Bayrell.Lang.LangPHP.TranslatorPHP"] = Bayrell.Lang.LangPHP.TranslatorPHP;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangPHP.TranslatorPHP;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPExpression = function()
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPExpression)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression,
{
	/**
	 * Returns string
	 */
	toString: function(s)
	{
		s = Runtime.re.replace("\\\\", "\\\\", s);
		s = Runtime.re.replace("\"", "\\\"", s);
		s = Runtime.re.replace("\n", "\\n", s);
		s = Runtime.re.replace("\r", "\\r", s);
		s = Runtime.re.replace("\t", "\\t", s);
		s = Runtime.re.replace("\\$", "\\$", s);
		return "\"" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("\"");
	},
	/**
	 * To pattern
	 */
	toPattern: function(t, pattern)
	{
		var names = this.findModuleNames(t, pattern.entity_name.names);
		var e = Runtime.rs.join(".", names);
		var a = (pattern.template != null) ? (pattern.template.map((pattern) => 
		{
			return this.toPattern(t, pattern);
		})) : (null);
		var b = (a != null) ? (",\"t\":[" + Runtime.rtl.toStr(Runtime.rs.join(",", a)) + Runtime.rtl.toStr("]")) : ("");
		return "[\"e\"=>" + Runtime.rtl.toStr(this.toString(e)) + Runtime.rtl.toStr(b) + Runtime.rtl.toStr("]");
	},
	/**
	 * Returns string
	 */
	rtlToStr: function(t, s)
	{
		var module_name = this.getModuleName(t, "rtl");
		return module_name + Runtime.rtl.toStr("::toStr(") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
	},
	/**
	 * Find module name
	 */
	findModuleName: function(t, module_name)
	{
		if (module_name == "Collection")
		{
			return "Runtime.Collection";
		}
		else if (module_name == "Dict")
		{
			return "Runtime.Dict";
		}
		else if (module_name == "Map")
		{
			return "Runtime.Map";
		}
		else if (module_name == "Vector")
		{
			return "Runtime.Vector";
		}
		else if (module_name == "rs")
		{
			return "Runtime.rs";
		}
		else if (module_name == "rtl")
		{
			return "Runtime.rtl";
		}
		else if (module_name == "ArrayInterface")
		{
			return "ArrayAccess";
		}
		else if (t.modules.has(module_name))
		{
			return t.modules.item(module_name);
		}
		return module_name;
	},
	/**
	 * Returns module name
	 */
	findModuleNames: function(t, names)
	{
		if (names.count() > 0)
		{
			var module_name = names.first();
			module_name = this.findModuleName(t, module_name);
			if (module_name != "")
			{
				names = names.removeFirstIm().prependCollectionIm(Runtime.rs.split("\\.", module_name));
			}
		}
		return names;
	},
	/**
	 * Return module name
	 */
	getModuleName: function(t, module_name)
	{
		module_name = this.findModuleName(t, module_name);
		module_name = Runtime.rs.replace("\\.", "\\", module_name);
		return "\\" + Runtime.rtl.toStr(module_name);
	},
	/**
	 * Return module name
	 */
	getModuleNames: function(t, names)
	{
		return "\\" + Runtime.rtl.toStr(Runtime.rs.join("\\", this.findModuleNames(t, names)));
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(t, op_code)
	{
		var names = this.findModuleNames(t, op_code.entity_name.names);
		var s = "\\" + Runtime.rtl.toStr(Runtime.rs.join("\\", names));
		return Runtime.Collection.from([t,s]);
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(t, op_code)
	{
		if (op_code.value == "@")
		{
			if (t.enable_context == false)
			{
				return Runtime.Collection.from([t,"\\Runtime\\rtl::getContext()"]);
			}
			else
			{
				return Runtime.Collection.from([t,"$ctx"]);
			}
		}
		if (op_code.value == "_")
		{
			if (t.enable_context == false)
			{
				return Runtime.Collection.from([t,"\\Runtime\\rtl::getContext()->translate"]);
			}
			else
			{
				return Runtime.Collection.from([t,"$ctx->translate"]);
			}
		}
		if (op_code.value == "@")
		{
			return Runtime.Collection.from([t,"$ctx"]);
		}
		if (op_code.value == "_")
		{
			return Runtime.Collection.from([t,"$ctx->translate"]);
		}
		if (op_code.value == "log")
		{
			return Runtime.Collection.from([t,"var_dump"]);
		}
		if (t.modules.has(op_code.value) || op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.getModuleName(t, module_name);
			return Runtime.Collection.from([t,new_module_name]);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE)
		{
			var content = op_code.value;
			return Runtime.Collection.from([t,"$" + Runtime.rtl.toStr(content)]);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF)
		{
			var content = op_code.value;
			if (content == "this")
			{
				content = "$this";
			}
			return Runtime.Collection.from([t,content]);
		}
		var content = op_code.value;
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpNumber
	 */
	OpNumber: function(t, op_code)
	{
		var content = op_code.value;
		if (op_code.negative)
		{
			content = "-" + Runtime.rtl.toStr(content);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 15);
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpString
	 */
	OpString: function(t, op_code)
	{
		return Runtime.Collection.from([t,this.toString(op_code.value)]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(t, op_code)
	{
		var content = "";
		var values = op_code.values.map((op_code) => 
		{
			var res = this.Expression(t, op_code);
			t = Runtime.rtl.get(res, 0);
			var s = Runtime.rtl.get(res, 1);
			return s;
		});
		values = values.filter((s) => 
		{
			return s != "";
		});
		var module_name = this.getModuleName(t, "Collection");
		content = module_name + Runtime.rtl.toStr("::from([") + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("])");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(t, op_code, flag_array)
	{
		if (flag_array == undefined) flag_array = false;
		var content = "";
		var values = op_code.values.map((pair, key) => 
		{
			if (pair.condition != null && Runtime.rtl.get(t.preprocessor_flags, pair.condition.value) != true)
			{
				return "";
			}
			var res = this.Expression(t, pair.value);
			t = Runtime.rtl.get(res, 0);
			var s = Runtime.rtl.get(res, 1);
			return this.toString(pair.key) + Runtime.rtl.toStr("=>") + Runtime.rtl.toStr(s);
		});
		values = values.filter((s) => 
		{
			return s != "";
		});
		var module_name = this.getModuleName(t, "Dict");
		if (!flag_array)
		{
			content = module_name + Runtime.rtl.toStr("::from([") + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("])");
		}
		else
		{
			content = "[" + Runtime.rtl.toStr(Runtime.rs.join(",", values)) + Runtime.rtl.toStr("]");
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Dynamic
	 */
	Dynamic: function(t, op_code, next_op_code)
	{
		if (next_op_code == undefined) next_op_code = null;
		if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			return this.OpIdentifier(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
		{
			var attrs = new Runtime.Vector();
			var op_code_item = op_code;
			var op_code_next = op_code;
			var prev_kind = "";
			var s = "";
			var first_item_complex = false;
			while (op_code_next instanceof Bayrell.Lang.OpCodes.OpAttr)
			{
				attrs.pushValue(op_code_next);
				op_code_item = op_code_next;
				op_code_next = op_code_next.obj;
			}
			attrs = attrs.reverseIm();
			if (op_code_next instanceof Bayrell.Lang.OpCodes.OpCall)
			{
				prev_kind = "var";
				var res = this.OpCall(t, op_code_next);
				t = Runtime.rtl.get(res, 0);
				s = Runtime.rtl.get(res, 1);
				first_item_complex = true;
			}
			else if (op_code_next instanceof Bayrell.Lang.OpCodes.OpNew)
			{
				prev_kind = "var";
				var res = this.OpNew(t, op_code_next);
				t = Runtime.rtl.get(res, 0);
				s = "(" + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
				first_item_complex = true;
			}
			else if (op_code_next instanceof Bayrell.Lang.OpCodes.OpCollection)
			{
				prev_kind = "var";
				var res = this.OpCollection(t, op_code_next);
				t = Runtime.rtl.get(res, 0);
				s = "(" + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
				first_item_complex = true;
			}
			else if (op_code_next instanceof Bayrell.Lang.OpCodes.OpDict)
			{
				prev_kind = "var";
				var res = this.OpDict(t, op_code_next);
				t = Runtime.rtl.get(res, 0);
				s = "(" + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
				first_item_complex = true;
			}
			else if (op_code_next instanceof Bayrell.Lang.OpCodes.OpIdentifier)
			{
				if (op_code_next.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF)
				{
					if (op_code_next.value == "static")
					{
						s = "static";
						prev_kind = "static";
					}
					else if (op_code_next.value == "parent")
					{
						s = "parent";
						prev_kind = "static";
					}
					else if (op_code_next.value == "self")
					{
						prev_kind = "static";
						s = this.getModuleName(t, t.current_class_full_name);
					}
					else if (op_code_next.value == "this")
					{
						prev_kind = "var";
						s = "$this";
					}
				}
				else if (op_code_next.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_PIPE)
				{
					prev_kind = "var";
					var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"var_content":t.pipe_var_name + Runtime.rtl.toStr("->val")}));
					t = Runtime.rtl.get(res, 0);
					s = Runtime.rtl.get(res, 1);
					prev_kind = "static";
				}
				else
				{
					var res = this.OpIdentifier(t, op_code_next);
					t = Runtime.rtl.get(res, 0);
					s = Runtime.rtl.get(res, 1);
					prev_kind = "var";
					if (t.modules.has(op_code_next.value) || op_code_next.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
					{
						prev_kind = "static";
					}
				}
			}
			if (first_item_complex && t.is_pipe)
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"var_content":s}));
				t = Runtime.rtl.get(res, 0);
				s = Runtime.rtl.get(res, 1);
			}
			var attrs_sz = attrs.count();
			for (var i = 0;i < attrs.count();i++)
			{
				var attr = attrs.item(i);
				var next_attr = attrs.get(i + 1, null);
				if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_ATTR)
				{
					/* Pipe */
					if (t.is_pipe && !(next_op_code instanceof Bayrell.Lang.OpCodes.OpCall))
					{
						if (i == attrs_sz - 1)
						{
							var val2 = this.toString(attr.value.value);
							s = "new \\Runtime\\Callback(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(val2) + Runtime.rtl.toStr(")");
						}
						else
						{
							s += Runtime.rtl.toStr("->" + Runtime.rtl.toStr(attr.value.value));
						}
					}
					else
					{
						s += Runtime.rtl.toStr("->" + Runtime.rtl.toStr(attr.value.value));
					}
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_STATIC)
				{
					if (prev_kind == "static")
					{
						var attr_val = attr.value.value;
						if (i == attrs_sz - 1 && next_op_code instanceof Bayrell.Lang.OpCodes.OpCall)
						{
							s += Runtime.rtl.toStr("::" + Runtime.rtl.toStr(attr_val));
						}
						else if (Runtime.rs.strtoupper(attr_val) == attr_val)
						{
							s += Runtime.rtl.toStr("::" + Runtime.rtl.toStr(attr_val));
						}
						else
						{
							var val1;
							if (s == "static")
							{
								val1 = "static::class";
							}
							else
							{
								val1 = s + Runtime.rtl.toStr("::class");
							}
							var val2 = this.toString(attr_val);
							s = "new \\Runtime\\Callback(" + Runtime.rtl.toStr(val1) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(val2) + Runtime.rtl.toStr(")");
						}
					}
					else
					{
						s = s + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(attr.value.value);
					}
					prev_kind = "static";
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC)
				{
					var res = this.Expression(t, attr.value);
					t = Runtime.rtl.get(res, 0);
					/* s ~= "[" ~ res[1] ~ "]"; */
					s = "\\Runtime\\rtl::get($ctx, " + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC_ATTRS)
				{
					var items = new Runtime.Vector();
					if (attr.attrs != null)
					{
						for (var j = 0;j < attr.attrs.count();j++)
						{
							var res = this.Expression(t, Runtime.rtl.get(attr.attrs, j));
							t = Runtime.rtl.get(res, 0);
							items.pushValue(Runtime.rtl.get(res, 1));
						}
					}
					s = "\\Runtime\\rtl::attr($ctx, " + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(", [") + Runtime.rtl.toStr(Runtime.rs.join(", ", items)) + Runtime.rtl.toStr("])");
				}
			}
			return Runtime.Collection.from([t,s]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCurry)
		{
			var res = this.OpCurry(t, op_code);
			t = Runtime.rtl.get(res, 0);
			var content = Runtime.rtl.get(res, 1);
			var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"var_content":content}));
			t = Runtime.rtl.get(res, 0);
			var var_name = Runtime.rtl.get(res, 1);
			return Runtime.Collection.from([t,var_name]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			return this.OpCall(t, op_code);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * OpInc
	 */
	OpInc: function(t, op_code)
	{
		var content = "";
		var res = this.Expression(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		var s = Runtime.rtl.get(res, 1);
		if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_PRE_INC)
		{
			content = "++$" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_PRE_DEC)
		{
			content = "--$" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_POST_INC)
		{
			content = "$" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("++");
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_POST_DEC)
		{
			content = "$" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("--");
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpMath
	 */
	OpMath: function(t, op_code)
	{
		var res = this.Expression(t, op_code.value1);
		t = Runtime.rtl.get(res, 0);
		var opcode_level1 = Runtime.rtl.get(res, 0).opcode_level;
		var s1 = Runtime.rtl.get(res, 1);
		var op = "";
		var op_math = op_code.math;
		var opcode_level = 0;
		if (op_code.math == "!")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == ">>")
		{
			opcode_level = 12;
			op = ">>";
		}
		if (op_code.math == "<<")
		{
			opcode_level = 12;
			op = "<<";
		}
		if (op_code.math == "&")
		{
			opcode_level = 9;
			op = "&";
		}
		if (op_code.math == "xor")
		{
			opcode_level = 8;
			op = "^";
		}
		if (op_code.math == "|")
		{
			opcode_level = 7;
			op = "|";
		}
		if (op_code.math == "*")
		{
			opcode_level = 14;
			op = "*";
		}
		if (op_code.math == "/")
		{
			opcode_level = 14;
			op = "/";
		}
		if (op_code.math == "%")
		{
			opcode_level = 14;
			op = "%";
		}
		if (op_code.math == "div")
		{
			opcode_level = 14;
			op = "div";
		}
		if (op_code.math == "mod")
		{
			opcode_level = 14;
			op = "mod";
		}
		if (op_code.math == "+")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "-")
		{
			opcode_level = 13;
			op = "-";
		}
		if (op_code.math == "~")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "!")
		{
			opcode_level = 13;
			op = "!";
		}
		if (op_code.math == "===")
		{
			opcode_level = 10;
			op = "===";
		}
		if (op_code.math == "!==")
		{
			opcode_level = 10;
			op = "!==";
		}
		if (op_code.math == "==")
		{
			opcode_level = 10;
			op = "==";
		}
		if (op_code.math == "!=")
		{
			opcode_level = 10;
			op = "!=";
		}
		if (op_code.math == ">=")
		{
			opcode_level = 10;
			op = ">=";
		}
		if (op_code.math == "<=")
		{
			opcode_level = 10;
			op = "<=";
		}
		if (op_code.math == ">")
		{
			opcode_level = 10;
			op = ">";
		}
		if (op_code.math == "<")
		{
			opcode_level = 10;
			op = "<";
		}
		if (op_code.math == "is")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "instanceof")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "implements")
		{
			opcode_level = 10;
			op = "implements";
		}
		if (op_code.math == "not")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == "and")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "&&")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "or")
		{
			opcode_level = 5;
			op = "||";
		}
		if (op_code.math == "||")
		{
			opcode_level = 5;
			op = "||";
		}
		var content = "";
		if (op_code.math == "!" || op_code.math == "not")
		{
			content = op + Runtime.rtl.toStr(t.o(s1, opcode_level1, opcode_level));
		}
		else
		{
			var res = this.Expression(t, op_code.value2);
			t = Runtime.rtl.get(res, 0);
			var opcode_level2 = Runtime.rtl.get(res, 0).opcode_level;
			var s2 = Runtime.rtl.get(res, 1);
			var op1 = t.o(s1, opcode_level1, opcode_level);
			var op2 = t.o(s2, opcode_level2, opcode_level);
			if (op_math == "~")
			{
				content = op1 + Runtime.rtl.toStr(" . ") + Runtime.rtl.toStr(this.rtlToStr(t, op2));
			}
			else if (op_math == "implements")
			{
				content = op1 + Runtime.rtl.toStr(" instanceof ") + Runtime.rtl.toStr(op2);
			}
			else
			{
				content = op1 + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op2);
			}
		}
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), opcode_level);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpMethod
	 */
	OpMethod: function(t, op_code)
	{
		var content = "";
		var res = this.OpIdentifier(t, op_code.value1);
		t = Runtime.rtl.get(res, 0);
		var val1 = Runtime.rtl.get(res, 1);
		var val2 = op_code.value2;
		if (op_code.kind == Bayrell.Lang.OpCodes.OpMethod.KIND_STATIC)
		{
			val1 = val1 + Runtime.rtl.toStr("->getClassName()");
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpMethod.KIND_CLASS)
		{
			val1 = val1 + Runtime.rtl.toStr("::class");
		}
		var content = "new \\Runtime\\Callback(" + Runtime.rtl.toStr(val1) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(this.toString(val2)) + Runtime.rtl.toStr(")");
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 0);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpNew
	 */
	OpNew: function(t, op_code)
	{
		var content = "new ";
		var res = this.OpTypeIdentifier(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		var flag = false;
		content += Runtime.rtl.toStr("(");
		if (t.current_function == null || t.current_function.is_context)
		{
			content += Runtime.rtl.toStr("$ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = t.expression.constructor.Expression(t, item);
			t = Runtime.rtl.get(res, 0);
			var s = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpCurry
	 */
	OpCurry: function(t, op_code)
	{
		var content = "";
		var s = "";
		var args_use = new Runtime.Vector();
		var args = op_code.args.filter((arg) => 
		{
			return arg instanceof Bayrell.Lang.OpCodes.OpCurryArg;
		}).sortIm((arg1, arg2) => 
		{
			return (arg1.pos > arg2.pos) ? (1) : ((arg1.pos < arg2.pos) ? (-1) : (0));
		});
		var use_obj_item = "";
		if (op_code.obj instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			if (op_code.obj.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE)
			{
				use_obj_item = "$" + Runtime.rtl.toStr(op_code.obj.value);
			}
		}
		var args_sz = op_code.args.count();
		for (var i = 0;i < args_sz;i++)
		{
			var arg = op_code.args.item(i);
			if (arg instanceof Bayrell.Lang.OpCodes.OpCurryArg)
			{
				continue;
			}
			if (arg instanceof Bayrell.Lang.OpCodes.OpIdentifier)
			{
				args_use.pushValue("$" + Runtime.rtl.toStr(arg.value));
			}
		}
		var args_sz = args.count();
		for (var i = 0;i < args_sz;i++)
		{
			var arg = args.item(i);
			var s_use = "";
			var arr_use = new Runtime.Vector();
			arr_use.appendVector(args_use);
			for (var j = 0;j < i;j++)
			{
				var arg_use = args.item(j);
				arr_use.pushValue("$__varg" + Runtime.rtl.toStr(arg_use.pos));
			}
			if (use_obj_item != "")
			{
				arr_use.pushValue(use_obj_item);
			}
			if (arr_use.count() > 0)
			{
				s_use = " use (" + Runtime.rtl.toStr(Runtime.rs.join(", ", arr_use)) + Runtime.rtl.toStr(")");
			}
			if (args_sz - 1 == i)
			{
				content += Runtime.rtl.toStr("function ($ctx, $__varg" + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr(s_use) + Runtime.rtl.toStr("{return "));
			}
			else
			{
				content += Runtime.rtl.toStr("function ($__ctx" + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(", $__varg") + Runtime.rtl.toStr(arg.pos) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr(s_use) + Runtime.rtl.toStr("{return "));
			}
		}
		var flag = false;
		var res = this.Dynamic(t, op_code.obj, op_code);
		t = Runtime.rtl.get(res, 0);
		s = Runtime.rtl.get(res, 1);
		if (s == "parent")
		{
			var f_name = t.current_function.name;
			if (f_name == "constructor")
			{
				f_name = "__construct";
			}
			s = "parent::" + Runtime.rtl.toStr(f_name);
			content += Runtime.rtl.toStr(s);
		}
		else
		{
			content += Runtime.rtl.toStr("(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")"));
		}
		content += Runtime.rtl.toStr("($ctx");
		flag = true;
		for (var i = 0;i < op_code.args.count();i++)
		{
			s = "";
			var item = op_code.args.item(i);
			if (item instanceof Bayrell.Lang.OpCodes.OpCurryArg)
			{
				s += Runtime.rtl.toStr("$__varg" + Runtime.rtl.toStr(item.pos));
			}
			else
			{
				var res = this.Expression(t, item);
				t = Runtime.rtl.get(res, 0);
				s = Runtime.rtl.get(res, 1);
			}
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		for (var i = 0;i < args_sz;i++)
		{
			content += Runtime.rtl.toStr(";}");
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(t, op_code)
	{
		var s = "";
		var flag = false;
		var res = this.Dynamic(t, op_code.obj, op_code);
		t = Runtime.rtl.get(res, 0);
		s = Runtime.rtl.get(res, 1);
		if (s == "parent")
		{
			var f_name = t.current_function.name;
			if (f_name == "constructor")
			{
				f_name = "__construct";
			}
			s = "parent::" + Runtime.rtl.toStr(f_name) + Runtime.rtl.toStr("(");
		}
		else
		{
			s += Runtime.rtl.toStr("(");
		}
		var content = s;
		if (op_code.obj instanceof Bayrell.Lang.OpCodes.OpIdentifier && op_code.obj.value == "_")
		{
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("$ctx"));
			flag = true;
		}
		else if ((t.current_function == null || t.current_function.is_context) && op_code.is_context)
		{
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("$ctx"));
			flag = true;
		}
		if (op_code.is_html)
		{
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("$layout, $model_path, $render_params, $render_content"));
			flag = true;
		}
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = this.Expression(t, item);
			t = Runtime.rtl.get(res, 0);
			var s = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassOf
	 */
	OpClassOf: function(t, op_code)
	{
		var names = this.findModuleNames(t, op_code.entity_name.names);
		var s = Runtime.rs.join(".", names);
		return Runtime.Collection.from([t,this.toString(s)]);
	},
	/**
	 * OpTernary
	 */
	OpTernary: function(t, op_code)
	{
		var content = "";
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 100);
		var res = this.Expression(t, op_code.condition);
		t = Runtime.rtl.get(res, 0);
		var condition = Runtime.rtl.get(res, 1);
		var res = this.Expression(t, op_code.if_true);
		t = Runtime.rtl.get(res, 0);
		var if_true = Runtime.rtl.get(res, 1);
		var res = this.Expression(t, op_code.if_false);
		t = Runtime.rtl.get(res, 0);
		var if_false = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr("(" + Runtime.rtl.toStr(condition) + Runtime.rtl.toStr(") ? (") + Runtime.rtl.toStr(if_true) + Runtime.rtl.toStr(") : (") + Runtime.rtl.toStr(if_false) + Runtime.rtl.toStr(")"));
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 0);
		/* OpTernary */
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var content = "";
		var var_name = "";
		var value = "";
		var res = t.constructor.incSaveOpCode(t);
		t = Runtime.rtl.get(res, 0);
		var_name = Runtime.rtl.get(res, 1);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["pipe_var_name"]), var_name);
		var items = new Runtime.Vector();
		var op_code_item = op_code;
		while (op_code_item instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			items.pushValue(op_code_item);
			op_code_item = op_code_item.obj;
		}
		items = items.reverseIm();
		/* First item */
		var res = t.expression.constructor.Expression(t, op_code_item);
		t = Runtime.rtl.get(res, 0);
		value = Runtime.rtl.get(res, 1);
		var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"content":t.s(var_name + Runtime.rtl.toStr(" = new \\Runtime\\Monad($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(");"))}));
		t = Runtime.rtl.get(res, 0);
		/* Output items */
		for (var i = 0;i < items.count();i++)
		{
			var s1 = "";
			var s2 = "";
			var op_item = items.item(i);
			if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_ATTR)
			{
				var res = this.Expression(t, op_item.value);
				t = Runtime.rtl.get(res, 0);
				value = Runtime.rtl.get(res, 1);
				s1 = var_name + Runtime.rtl.toStr("->attr($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
			}
			else if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_METHOD)
			{
				var res = this.Dynamic(t, op_item.value);
				t = Runtime.rtl.get(res, 0);
				value = Runtime.rtl.get(res, 1);
				s2 = "try{ ";
				s2 += Runtime.rtl.toStr(var_name + Runtime.rtl.toStr("=(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("->val!=null && ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("->err==null) ? new \\Runtime\\Monad($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(") : ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(";"));
				s2 += Runtime.rtl.toStr(" } catch (\\Exception $err) { ");
				s2 += Runtime.rtl.toStr(var_name + Runtime.rtl.toStr("=new \\Runtime\\Monad($ctx, null, $err);"));
				s2 += Runtime.rtl.toStr(" }");
			}
			else if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_CALL)
			{
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), true);
				var args = "";
				/*
				bool is_instance_method = false;
				if (
					op_item.value instanceof OpCall and
					op_item.value.obj instanceof OpAttr and
					op_item.value.obj.kind == OpAttr::KIND_ATTR
				)
				{
					is_instance_method = true;
					value = "new \\Runtime\\Callback("
					if (op_item.value.obj.obj.value == "")
					{
						value ~= t.pipe_var_name ~ "->val";
					}
					else
					{
						list res = static::Expression(t, op_item.value.obj.obj);
						t = res[0]; value ~= res[1];
					}
					value ~= ",";
					value ~= static::toString(op_item.value.obj.value.value);
					value ~= ")";
					bool flag = false;
					for (int j=0; j<op_item.value.args.count(); j++)
					{
						BaseOpCode item = op_item.value.args.item(j);
						list res = t.expression::Expression(t, item); t = res[0]; string s_arg = res[1];
						args ~= (flag ? ", " : "") ~ s_arg;
						flag = true;
					}
					args = ", [" ~ args ~ "]";
				}
				*/
				/*
				if (op_item.value instanceof OpAttr)
				{
					value = "new \\Runtime\\Callback("
					if (op_item.value.kind == OpAttr::KIND_ATTR and op_item.value.obj.value == "")
					{
						value ~= t.pipe_var_name ~ "->val";
					}
					else if (op_item.value.kind == OpAttr::KIND_STATIC and op_item.value.obj.value == "")
					{
						value ~= "static::class";
					}
					else
					{
						list res = static::Expression(t, op_item.value.obj);
						t = res[0]; value ~= res[1];
					}
					value ~= ",";
					value ~= static::toString(op_item.value.value.value);
					value ~= ")";
				}
				else
				{
					list res = static::Dynamic(t, op_item.value); t = res[0]; value = res[1];
				}
				*/
				var res = this.Dynamic(t, op_item.value);
				t = Runtime.rtl.get(res, 0);
				value = Runtime.rtl.get(res, 1);
				if (!op_item.is_async || !t.enable_async_await)
				{
					if (op_item.is_monad)
					{
						s1 = var_name + Runtime.rtl.toStr("->monad($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
					}
					else
					{
						s1 = var_name + Runtime.rtl.toStr("->call($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")");
					}
				}
				else if (op_item.is_async && t.current_function.isFlag("async"))
				{
					if (op_item.is_monad)
					{
						s1 = var_name + Runtime.rtl.toStr("->monadAsync($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
					}
					else
					{
						s1 = var_name + Runtime.rtl.toStr("->callAsync($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")");
					}
				}
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), false);
			}
			if (s1 != "")
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"content":t.s(var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";"))}));
				t = Runtime.rtl.get(res, 0);
			}
			if (s2 != "")
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"content":t.s(s2)}));
				t = Runtime.rtl.get(res, 0);
			}
		}
		return Runtime.Collection.from([t,var_name + Runtime.rtl.toStr("->value($ctx)")]);
	},
	/**
	 * OpTypeConvert
	 */
	OpTypeConvert: function(t, op_code)
	{
		var content = "";
		var res = this.Expression(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		var value = Runtime.rtl.get(res, 1);
		content = "\\Runtime\\rtl::to(" + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(this.toPattern(t, op_code.pattern)) + Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction
	 */
	OpDeclareFunction: function(t, op_code)
	{
		var content = "";
		/* Set function name */
		var save_f = t.current_function;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code);
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code);
		var args = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr("function (" + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
		if (op_code.vars != null && op_code.vars.count() > 0)
		{
			var vars = op_code.vars.map((s) => 
			{
				return "&$" + Runtime.rtl.toStr(s);
			});
			content += Runtime.rtl.toStr(" use (" + Runtime.rtl.toStr(Runtime.rs.join(",", vars)) + Runtime.rtl.toStr(")"));
		}
		var res = t.operator.constructor.OpDeclareFunctionBody(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* Restore function */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), save_f);
		/* OpTernary */
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Expression
	 */
	Expression: function(t, op_code)
	{
		var content = "";
		var save_is_pipe = t.is_pipe;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 100);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), false);
		if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			var res = this.OpIdentifier(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTypeIdentifier)
		{
			var res = this.OpTypeIdentifier(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpNumber)
		{
			var res = this.OpNumber(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpString)
		{
			var res = this.OpString(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCollection)
		{
			var res = this.OpCollection(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDict)
		{
			var res = this.OpDict(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpInc)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 16);
			var res = this.OpInc(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpMath)
		{
			var res = this.OpMath(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpMethod)
		{
			var res = this.OpMethod(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpNew)
		{
			var res = this.OpNew(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
		{
			var res = this.Dynamic(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			var res = this.OpCall(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpClassOf)
		{
			var res = this.OpClassOf(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCurry)
		{
			var res = this.OpCurry(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			return this.OpPipe(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTernary)
		{
			var res = this.OpTernary(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTypeConvert)
		{
			var res = this.OpTypeConvert(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			var res = this.OpDeclareFunction(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlItems)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), true);
			var res = t.html.constructor.OpHtmlItems(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), false);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			var res = t.operator.constructor.OpPreprocessorIfDef(t, op_code, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), save_is_pipe);
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPExpression";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"toString",
			"toPattern",
			"rtlToStr",
			"findModuleName",
			"findModuleNames",
			"getModuleName",
			"getModuleNames",
			"OpTypeIdentifier",
			"OpIdentifier",
			"OpNumber",
			"OpString",
			"OpCollection",
			"OpDict",
			"Dynamic",
			"OpInc",
			"OpMath",
			"OpMethod",
			"OpNew",
			"OpCurry",
			"OpCall",
			"OpClassOf",
			"OpTernary",
			"OpPipe",
			"OpTypeConvert",
			"OpDeclareFunction",
			"Expression",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPExpression);
window["Bayrell.Lang.LangPHP.TranslatorPHPExpression"] = Bayrell.Lang.LangPHP.TranslatorPHPExpression;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangPHP.TranslatorPHPExpression;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPHtml = function()
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPHtml)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml,
{
	/**
	 * Is component
	 */
	isComponent: function(tag_name)
	{
		var ch1 = Runtime.rs.substr(tag_name, 0, 1);
		var ch2 = Runtime.rs.strtoupper(ch1);
		return tag_name != "" && (ch1 == "{" || ch1 == ch2);
	},
	/**
	 * Is single tag
	 */
	isSingleTag: function(tag_name)
	{
		var tokens = Runtime.Collection.from(["img","meta","input","link","br"]);
		if (tokens.indexOf(tag_name) == -1)
		{
			return false;
		}
		return true;
	},
	/**
	 * Translator html component
	 */
	OpHtmlComponent: function(t, op_code)
	{
		var res = t.constructor.incSaveOpCode(t);
		t = Runtime.rtl.get(res, 0);
		var var_name = Runtime.rtl.get(res, 1);
		var content = "";
		var v_model = "null";
		var tag_name = op_code.tag_name;
		var module_name = "";
		if (op_code.op_code_name)
		{
			var res = t.expression.constructor.Expression(t, op_code.op_code_name);
			t = Runtime.rtl.get(res, 0);
			module_name = Runtime.rtl.get(res, 1);
		}
		else
		{
			module_name = t.expression.constructor.toString(t.expression.constructor.findModuleName(t, op_code.tag_name));
		}
		content += Runtime.rtl.toStr(t.s("/* Component '" + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr("' */")));
		content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr("_params = [];")));
		var attr_name = op_code.attrs.findItem(Runtime.lib.equalAttr("key", "@name"));
		var attr_bind = op_code.attrs.findItem(Runtime.lib.equalAttr("key", "@bind"));
		var attr_model = op_code.attrs.findItem(Runtime.lib.equalAttr("key", "@model"));
		var attr_model_path = op_code.attrs.findItem(Runtime.lib.equalAttr("key", "@model_path"));
		if (attr_name)
		{
			var res = t.expression.constructor.Expression(t, attr_name.value);
			t = Runtime.rtl.get(res, 0);
			v_model = "static::_concat_attrs($ctx, $model_path, " + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
		}
		else if (attr_bind)
		{
			var res = t.expression.constructor.Expression(t, attr_bind.value);
			t = Runtime.rtl.get(res, 0);
			v_model = "static::_concat_attrs($ctx, $model_path, " + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
		}
		else if (attr_model)
		{
			var res = t.expression.constructor.Expression(t, attr_model.value);
			t = Runtime.rtl.get(res, 0);
			v_model = "static::_concat_attrs($ctx, $model_path, " + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
		}
		else if (attr_model_path)
		{
			var res = t.expression.constructor.Expression(t, attr_model_path.value);
			t = Runtime.rtl.get(res, 0);
			v_model = "static::_concat_attrs($ctx, [], " + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(")");
		}
		for (var i = 0;i < op_code.attrs.count();i++)
		{
			var attr = op_code.attrs.item(i);
			if (attr.key == "@bind")
			{
				continue;
			}
			if (attr.key == "@name")
			{
				continue;
			}
			if (attr.key == "@model")
			{
				continue;
			}
			if (attr.key == "@model_path")
			{
				continue;
			}
			if (attr.key == "@ref")
			{
				continue;
			}
			if (attr.is_spread)
			{
				content += Runtime.rtl.toStr(t.s("if($" + Runtime.rtl.toStr(attr.value.value) + Runtime.rtl.toStr("!=null)") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_params = array_merge(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_params,$") + Runtime.rtl.toStr(attr.value.value) + Runtime.rtl.toStr("->_map);")));
			}
			else
			{
				var res = this.OpHtmlAttr(t, attr);
				t = Runtime.rtl.get(res, 0);
				var attr_value = Runtime.rtl.get(res, 1);
				content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr("_params[") + Runtime.rtl.toStr(t.expression.constructor.toString(attr.key)) + Runtime.rtl.toStr("] = ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(";")));
			}
		}
		content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr("_content = [];")));
		var f = Runtime.rtl.method(this.getClassName(), "OpHtmlItems");
		var res = t.constructor.saveOpCodeCall(t, f, Runtime.Collection.from([op_code.items,var_name + Runtime.rtl.toStr("_content")]));
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		if (op_code.op_code_name)
		{
			content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr("_name = \\Runtime\\rtl::find_class(") + Runtime.rtl.toStr(module_name) + Runtime.rtl.toStr(");")));
			content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr(" = [") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_name::render($ctx, $layout,") + Runtime.rtl.toStr(v_model) + Runtime.rtl.toStr(",\\Runtime\\Dict::from(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_params),") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_content)];")));
		}
		else
		{
			content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr("_name = \\Runtime\\rtl::find_class(") + Runtime.rtl.toStr(module_name) + Runtime.rtl.toStr(");")));
			content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr(" = [") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_name::render($ctx, $layout,") + Runtime.rtl.toStr(v_model) + Runtime.rtl.toStr(",\\Runtime\\Dict::from(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_params),") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_content)];")));
		}
		var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = Runtime.rtl.get(res, 0);
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Translator html attr
	 */
	OpHtmlAttr: function(t, attr)
	{
		if (attr.value instanceof Bayrell.Lang.OpCodes.OpString)
		{
			return Runtime.Collection.from([t,t.expression.constructor.toString(attr.value.value)]);
		}
		if (attr.value instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
		{
			if (attr.value.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(t, attr.value.value);
				t = Runtime.rtl.get(res, 0);
				return Runtime.Collection.from([t,Runtime.rtl.get(res, 1)]);
			}
			else if (attr.value.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(t, attr.value.value);
				t = Runtime.rtl.get(res, 0);
				var value = Runtime.rtl.get(res, 1);
				value = "\\Runtime\\rtl::json_encode($ctx, " + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
				return Runtime.Collection.from([t,value]);
			}
		}
		var res = t.expression.constructor.Expression(t, attr.value);
		t = Runtime.rtl.get(res, 0);
		var value = Runtime.rtl.get(res, 1);
		value = t.o(value, Runtime.rtl.get(res, 0).opcode_level, 13);
		return Runtime.Collection.from([t,value]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlAttrs: function(t, attrs)
	{
		var attr_class = new Runtime.Vector();
		var attr_s = "";
		var attr_key_value = "";
		var has_attr_key = false;
		var res_attrs = attrs.map((attr) => 
		{
			if (attr.is_spread)
			{
				return "";
			}
			var attr_key = attr.key;
			var attr_value = "";
			/*
				if (attr_key == "@class")
				{
					list res = static::OpHtmlAttr(t, attr); t = res[0]; attr_value = res[1];
					attr_class.pushValue( "static::_get_css_name($ctx, " ~
						attr_value ~ ")" );
					
					if (not has_attr_key and attr.value instanceof OpString)
					{
						var arr = rs::split(" ", attr.value.value);
						attr_key_value = t.expression::toString(arr[0]);
						has_attr_key = true;
					}
					
					return "";
				}
				*/
			if (attr_key == "class")
			{
				t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["opcode_level"]), 1000);
				var res = this.OpHtmlAttr(t, attr);
				t = Runtime.rtl.get(res, 0);
				attr_value = Runtime.rtl.get(res, 1);
				attr_class.pushValue(attr_value);
				if (!has_attr_key && attr.value instanceof Bayrell.Lang.OpCodes.OpString)
				{
					var arr = Runtime.rs.split(" ", attr.value.value);
					attr_key_value = t.expression.constructor.toString(Runtime.rtl.get(arr, 0));
					has_attr_key = true;
				}
				return "";
			}
			else if (attr_key == "@key")
			{
				has_attr_key = true;
				var res = this.OpHtmlAttr(t, attr);
				t = Runtime.rtl.get(res, 0);
				attr_value = Runtime.rtl.get(res, 1);
				attr_key_value = attr_value;
				return "";
			}
			if (attr_key == "@bind" || attr_key == "@name")
			{
				attr_key = "value";
				var res = t.expression.constructor.Expression(t, attr.value);
				t = Runtime.rtl.get(res, 0);
				attr_value = "\\Runtime\\rtl::attr($ctx, $model, " + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(", null)");
			}
			var ch = Runtime.rs.substr(attr_key, 0, 1);
			if (ch == "@")
			{
				return "";
			}
			if (attr_value == "")
			{
				var res = this.OpHtmlAttr(t, attr);
				t = Runtime.rtl.get(res, 0);
				attr_value = Runtime.rtl.get(res, 1);
			}
			return attr_key + Runtime.rtl.toStr("=\"'.static::_escape_attr($ctx, ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(").'\"");
		});
		res_attrs = res_attrs.filter((s) => 
		{
			return s != "";
		});
		if (attr_class.count() > 0)
		{
			attr_class.pushValue("static::getCssHash($ctx)");
			/*attr_class.pushValue( t.expression::toString("h-" ~
				ParserBayHtml::getCssHash(t.current_class_full_name)) );*/
			res_attrs = res_attrs.pushIm("class=" + Runtime.rtl.toStr("\"'.") + Runtime.rtl.toStr(Runtime.rs.join(".\" \".", attr_class)) + Runtime.rtl.toStr(".'\""));
		}
		if (res_attrs.count() > 0)
		{
			attr_s = " " + Runtime.rtl.toStr(Runtime.rs.join(" ", res_attrs));
		}
		/* Add spreads */
		for (var i = 0;i < attrs.count();i++)
		{
			var attr = Runtime.rtl.get(attrs, i);
			if (!attr.is_spread)
			{
				continue;
			}
			attr_s += Runtime.rtl.toStr(" ' . static::_join_attrs($ctx, $" + Runtime.rtl.toStr(attr.value.value) + Runtime.rtl.toStr(") . '"));
		}
		return Runtime.Collection.from([t,attr_s]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(t, op_code)
	{
		if (this.isComponent(op_code.tag_name))
		{
			return this.OpHtmlComponent(t, op_code);
		}
		/* Output attrs */
		var res = this.OpHtmlAttrs(t, op_code.attrs);
		t = Runtime.rtl.get(res, 0);
		var attr_s = Runtime.rtl.get(res, 1);
		var res = t.constructor.incSaveOpCode(t);
		t = Runtime.rtl.get(res, 0);
		var var_name = Runtime.rtl.get(res, 1);
		var content = "";
		if (op_code.tag_name != "")
		{
			content += Runtime.rtl.toStr(t.s("/* Element '" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr("' */")));
		}
		if (this.isSingleTag(op_code.tag_name))
		{
			content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr(" = ['<") + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(attr_s) + Runtime.rtl.toStr(" />'];")));
		}
		else
		{
			if (op_code.tag_name != "")
			{
				content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr(" = ['<") + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(attr_s) + Runtime.rtl.toStr(">'];")));
			}
			else
			{
				content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr(" = [];")));
			}
			var flag_value = false;
			if (!flag_value)
			{
				var f = Runtime.rtl.method(this.getClassName(), "OpHtmlItems");
				var res = t.constructor.saveOpCodeCall(t, f, Runtime.Collection.from([op_code.items,var_name]));
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			if (op_code.tag_name != "")
			{
				content += Runtime.rtl.toStr(t.s("static::_p(" + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", '</") + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(">');")));
			}
		}
		var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = Runtime.rtl.get(res, 0);
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(t, op_code, var_name)
	{
		if (var_name == undefined) var_name = "";
		if (op_code == null || op_code.items.count() == 0)
		{
			return Runtime.Collection.from([t,""]);
		}
		var items_count = op_code.items.count();
		var content = "";
		if (var_name == "")
		{
			var res = t.constructor.incSaveOpCode(t);
			t = Runtime.rtl.get(res, 0);
			var var_name = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(t.s(var_name + Runtime.rtl.toStr(" = [];")));
		}
		var save_html_var_name = t.html_var_name;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["html_var_name"]), var_name);
		for (var i = 0;i < op_code.items.count();i++)
		{
			var item = op_code.items.item(i);
			var item_value = "";
			var op_content = "";
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			var save_op_code_inc = t.save_op_code_inc;
			if (item instanceof Bayrell.Lang.OpCodes.OpHtmlContent)
			{
				item_value = t.expression.constructor.toString(item.value);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpHtmlTag)
			{
				var res = this.OpHtmlTag(t, item);
				t = Runtime.rtl.get(res, 0);
				item_value = Runtime.rtl.get(res, 1);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
			{
				if (item.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(t, item.value);
					t = Runtime.rtl.get(res, 0);
					item_value = Runtime.rtl.get(res, 1);
				}
				else if (item.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_HTML)
				{
					var res = t.expression.constructor.Expression(t, item.value);
					t = Runtime.rtl.get(res, 0);
					item_value = Runtime.rtl.get(res, 1);
					item_value = "static::_to_html($ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
				}
				else if (item.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(t, item.value);
					t = Runtime.rtl.get(res, 0);
					item_value = Runtime.rtl.get(res, 1);
					item_value = "\\Runtime\\rtl::json_encode($ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
				}
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpAssign)
			{
				var res = t.operator.constructor.OpAssign(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpComment)
			{
				var res = t.operator.constructor.OpComment(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpFor)
			{
				var res = t.operator.constructor.OpFor(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpIf)
			{
				var res = t.operator.constructor.OpIf(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpWhile)
			{
				var res = t.operator.constructor.OpWhile(t, item);
				t = Runtime.rtl.get(res, 0);
				op_content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpCall)
			{
				var res = t.expression.constructor.OpCall(t, item);
				t = Runtime.rtl.get(res, 0);
				item_value = Runtime.rtl.get(res, 1);
				item_value = "static::_escape_html($ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
			}
			else
			{
				var res = t.expression.constructor.Expression(t, item);
				t = Runtime.rtl.get(res, 0);
				item_value = Runtime.rtl.get(res, 1);
				item_value = "static::_escape_html($ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			if (op_content != "")
			{
				content += Runtime.rtl.toStr(op_content);
			}
			/* Restore save op codes */
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			if (item_value != "")
			{
				content += Runtime.rtl.toStr(t.s("static::_p(" + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(");")));
			}
		}
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["html_var_name"]), save_html_var_name);
		var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = Runtime.rtl.get(res, 0);
		return Runtime.Collection.from([t,"new \\Runtime\\RawString(" + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(")")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPHtml";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isComponent",
			"isSingleTag",
			"OpHtmlComponent",
			"OpHtmlAttr",
			"OpHtmlAttrs",
			"OpHtmlTag",
			"OpHtmlItems",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPHtml);
window["Bayrell.Lang.LangPHP.TranslatorPHPHtml"] = Bayrell.Lang.LangPHP.TranslatorPHPHtml;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangPHP.TranslatorPHPHtml;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPOperator = function()
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPOperator.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPOperator)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPOperator,
{
	/**
	 * OpAssign
	 */
	OpAssignStruct: function(t, op_code, pos)
	{
		if (pos == undefined) pos = 0;
		var content = "";
		var var_name = op_code.var_name;
		var res = t.expression.constructor.Expression(t, op_code.expression);
		t = Runtime.rtl.get(res, 0);
		var expr = Runtime.rtl.get(res, 1);
		var names = op_code.names.map((item) => 
		{
			if (item instanceof Bayrell.Lang.OpCodes.BaseOpCode)
			{
				var res = t.expression.constructor.Expression(t, item);
				t = Runtime.rtl.get(res, 0);
				return Runtime.rtl.get(res, 1);
			}
			return t.expression.constructor.toString(item);
		});
		content = "\\Runtime\\rtl::setAttr($ctx, $" + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", [") + Runtime.rtl.toStr(Runtime.rs.join(", ", names)) + Runtime.rtl.toStr("], ") + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpAssign
	 */
	OpAssign: function(t, op_code, flag_indent)
	{
		if (flag_indent == undefined) flag_indent = true;
		var content = "";
		if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_ASSIGN || op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
		{
			for (var i = 0;i < op_code.values.count();i++)
			{
				var item = op_code.values.item(i);
				var index_s = "";
				var s = "";
				var op = item.op;
				if (op == "")
				{
					op = "=";
				}
				if (item.expression == null)
				{
					continue;
				}
				/* Expression */
				var item_expression = "";
				var res = t.expression.constructor.Expression(t, item.expression);
				t = Runtime.rtl.get(res, 0);
				if (op == "~=")
				{
					item_expression = t.expression.constructor.rtlToStr(t, Runtime.rtl.get(res, 1));
				}
				else
				{
					item_expression = Runtime.rtl.get(res, 1);
				}
				if (item.op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
				{
					var items = new Runtime.Vector();
					var items2 = new Runtime.Vector();
					var op_code_next = item.op_code;
					while (op_code_next instanceof Bayrell.Lang.OpCodes.OpAttr)
					{
						items.pushValue(op_code_next);
						op_code_next = op_code_next.obj;
					}
					items = items.reverseIm();
					var res = t.expression.constructor.OpIdentifier(t, op_code_next);
					t = Runtime.rtl.get(res, 0);
					var obj_s = Runtime.rtl.get(res, 1);
					for (var j = 0;j < items.count();j++)
					{
						var item = Runtime.rtl.get(items, j);
						if (item.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_ATTR)
						{
							obj_s += Runtime.rtl.toStr("->" + Runtime.rtl.toStr(item.value.value));
							items2.pushValue(t.expression.constructor.toString(item.value.value));
						}
						else if (item.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC)
						{
							var res = t.expression.constructor.Expression(t, item.value);
							t = Runtime.rtl.get(res, 0);
							obj_s += Runtime.rtl.toStr("[" + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr("]"));
							items2.pushValue(Runtime.rtl.get(res, 1));
						}
						else if (item.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC_ATTRS)
						{
							if (item.attrs != null)
							{
								for (var j = item.attrs.count() - 1;j >= 0;j--)
								{
									var res = t.expression.constructor.Expression(t, Runtime.rtl.get(item.attrs, j));
									t = Runtime.rtl.get(res, 0);
									obj_s += Runtime.rtl.toStr("[" + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr("]"));
									items2.pushValue(Runtime.rtl.get(res, 1));
								}
							}
						}
					}
					if (op == "~=" || op == "+=" || op == "-=")
					{
						var op2 = "+";
						if (op == "~=" || op == "+=")
						{
							op2 = "+";
						}
						else if (op == "-=")
						{
							op2 = "-";
						}
						item_expression = "\\Runtime\\rtl\\attr($ctx, " + Runtime.rtl.toStr(obj_s) + Runtime.rtl.toStr(", [") + Runtime.rtl.toStr(Runtime.rs.join(", ", items2)) + Runtime.rtl.toStr("]) ") + Runtime.rtl.toStr(op2) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(item_expression);
					}
					index_s = obj_s + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(item_expression) + Runtime.rtl.toStr(";");
				}
				else
				{
					if (item.op_code != null && item.op_code.value == "@" && t.enable_context == false)
					{
						index_s = "\\Runtime\\rtl::setContext(" + Runtime.rtl.toStr(item_expression) + Runtime.rtl.toStr(");");
					}
					else
					{
						if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
						{
							s = "$" + Runtime.rtl.toStr(item.var_name);
						}
						else
						{
							var res = t.expression.constructor.OpIdentifier(t, item.op_code);
							t = Runtime.rtl.get(res, 0);
							s = Runtime.rtl.get(res, 1);
						}
						if (item_expression != "")
						{
							if (op == "~=")
							{
								s += Runtime.rtl.toStr(" .= " + Runtime.rtl.toStr(item_expression));
							}
							else
							{
								s += Runtime.rtl.toStr(" " + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(item_expression));
							}
							index_s = s + Runtime.rtl.toStr(";");
						}
					}
				}
				if (item.var_name != "" && t.save_vars.indexOf(item.var_name) == -1)
				{
					t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_vars"]), t.save_vars.pushIm(item.var_name));
				}
				if (index_s != "")
				{
					content += Runtime.rtl.toStr((flag_indent) ? (t.s(index_s)) : (index_s));
				}
			}
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_STRUCT)
		{
			var s = "$" + Runtime.rtl.toStr(op_code.var_name) + Runtime.rtl.toStr(" = ");
			var res = this.OpAssignStruct(t, op_code, 0);
			t = Runtime.rtl.get(res, 0);
			content = t.s(s + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(";"));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDelete
	 */
	OpDelete: function(t, op_code)
	{
		var content = "";
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(t, op_code)
	{
		var content = "";
		var s1 = "";
		var s2 = "";
		var s3 = "";
		if (op_code.expr1 instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			var res = this.OpAssign(t, op_code.expr1, false);
			t = Runtime.rtl.get(res, 0);
			s1 = Runtime.rtl.get(res, 1);
		}
		else
		{
			var res = t.expression.constructor.Expression(t, op_code.expr1);
			t = Runtime.rtl.get(res, 0);
			s1 = Runtime.rtl.get(res, 1);
		}
		var res = t.expression.constructor.Expression(t, op_code.expr2);
		t = Runtime.rtl.get(res, 0);
		s2 = Runtime.rtl.get(res, 1);
		var res = t.expression.constructor.Expression(t, op_code.expr3);
		t = Runtime.rtl.get(res, 0);
		s3 = Runtime.rtl.get(res, 1);
		content = t.s("for (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(s2) + Runtime.rtl.toStr(";") + Runtime.rtl.toStr(s3) + Runtime.rtl.toStr(")"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(t, op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = Runtime.rtl.get(res, 0);
		var s1 = Runtime.rtl.get(res, 1);
		content = t.s("if (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(")"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.if_true);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		for (var i = 0;i < op_code.if_else.count();i++)
		{
			var if_else = op_code.if_else.item(i);
			var res = t.expression.constructor.Expression(t, if_else.condition);
			t = Runtime.rtl.get(res, 0);
			var s2 = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(t.s("else if (" + Runtime.rtl.toStr(s2) + Runtime.rtl.toStr(")")));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, if_else.if_true);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
		}
		if (op_code.if_false != null)
		{
			content += Runtime.rtl.toStr(t.s("else"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, op_code.if_false);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(t, op_code)
	{
		var content = "";
		var s1 = "";
		if (op_code.expression)
		{
			var res = t.expression.constructor.Expression(t, op_code.expression);
			t = Runtime.rtl.get(res, 0);
			s1 = Runtime.rtl.get(res, 1);
		}
		if (t.current_function.flags != null && t.current_function.flags.isFlag("memorize"))
		{
			var content = t.s("$__memorize_value = " + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";"));
			content += Runtime.rtl.toStr(t.s(t.expression.constructor.getModuleName(t, "Runtime.rtl") + Runtime.rtl.toStr("::_memorizeSave(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(t.current_function.name) + Runtime.rtl.toStr("\", func_get_args(), $__memorize_value);")));
			content += Runtime.rtl.toStr(t.s("return $__memorize_value;"));
			return Runtime.Collection.from([t,content]);
		}
		content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";")));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpThrow
	 */
	OpThrow: function(t, op_code)
	{
		var res = t.expression.constructor.Expression(t, op_code.expression);
		t = Runtime.rtl.get(res, 0);
		var content = t.s("throw " + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(";"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(t, op_code)
	{
		var content = "";
		content += Runtime.rtl.toStr(t.s("try"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.op_try);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(t.s(Runtime.rtl.get(res, 1)));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		content += Runtime.rtl.toStr(t.s("catch (\\Exception $_ex)"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		for (var i = 0;i < op_code.items.count();i++)
		{
			var s = "";
			var pattern = "";
			var item = op_code.items.item(i);
			var res = t.expression.constructor.OpTypeIdentifier(t, item.pattern);
			t = Runtime.rtl.get(res, 0);
			pattern += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			if (pattern != "\\var")
			{
				s = "if ($_ex instanceof " + Runtime.rtl.toStr(pattern) + Runtime.rtl.toStr(")");
			}
			else
			{
				s = "if (true)";
			}
			s += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			s += Runtime.rtl.toStr((s != "") ? (t.s("$" + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = $_ex;"))) : ("$" + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = $_ex;")));
			var res = this.Operators(t, item.value);
			t = Runtime.rtl.get(res, 0);
			s += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			t = t.levelDec();
			s += Runtime.rtl.toStr(t.s("}"));
			if (i != 0)
			{
				s = "else " + Runtime.rtl.toStr(s);
			}
			content += Runtime.rtl.toStr(t.s(s));
		}
		content += Runtime.rtl.toStr(t.s("else"));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("throw $_ex;"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(t, op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = Runtime.rtl.get(res, 0);
		var s1 = Runtime.rtl.get(res, 1);
		content += Runtime.rtl.toStr(t.s("while (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpPreprocessorIfCode
	 */
	OpPreprocessorIfCode: function(t, op_code)
	{
		var content = "";
		if (Runtime.rtl.get(t.preprocessor_flags, op_code.condition.value) == true)
		{
			content = Runtime.rs.trim(op_code.content);
		}
		return Runtime.Collection.from([t,t.s(content)]);
	},
	/**
	 * OpPreprocessorIfDef
	 */
	OpPreprocessorIfDef: function(t, op_code, kind)
	{
		if (!(Runtime.rtl.get(t.preprocessor_flags, op_code.condition.value) == true))
		{
			return Runtime.Collection.from([t,""]);
		}
		if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR)
		{
			return this.Operators(t, op_code.items);
		}
		else if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION)
		{
			return t.expression.constructor.Expression(t, op_code.items);
		}
		var content = "";
		for (var i = 0;i < op_code.items.count();i++)
		{
			var item = op_code.items.item(i);
			if (item instanceof Bayrell.Lang.OpCodes.OpComment)
			{
				var res = t.operator.constructor.OpComment(t, item);
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
			{
				var res = t.program.constructor.OpDeclareFunction(t, item);
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpComment
	 */
	OpComment: function(t, op_code)
	{
		var content = t.s("/*" + Runtime.rtl.toStr(op_code.value) + Runtime.rtl.toStr("*/"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpComments
	 */
	OpComments: function(t, comments)
	{
		var content = "";
		for (var i = 0;i < comments.count();i++)
		{
			var res = this.OpComment(t, comments.item(i));
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpComments
	 */
	AddComments: function(t, comments, content)
	{
		if (comments && comments.count() > 0)
		{
			var res = this.OpComments(t, comments);
			var s = Runtime.rtl.get(res, 1);
			if (s != "")
			{
				content = s + Runtime.rtl.toStr(content);
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Operator
	 */
	Operator: function(t, op_code)
	{
		var content = "";
		/* Save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		if (op_code instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			var res = this.OpAssign(t, op_code);
			t = Runtime.rtl.get(res, 0);
			var content = Runtime.rtl.get(res, 1);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content = save + Runtime.rtl.toStr(content);
			}
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			return Runtime.Collection.from([t,content]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAssignStruct)
		{
			var res = this.OpAssignStruct(t, op_code);
			t = Runtime.rtl.get(res, 0);
			var s1 = Runtime.rtl.get(res, 1);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content = save;
			}
			content += Runtime.rtl.toStr(t.s("$" + Runtime.rtl.toStr(op_code.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";")));
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			return Runtime.Collection.from([t,content]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpBreak)
		{
			content = t.s("break;");
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			var res = t.expression.constructor.OpCall(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = t.s(Runtime.rtl.get(res, 1) + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpContinue)
		{
			content = t.s("continue;");
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDelete)
		{
			var res = this.OpDelete(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpFor)
		{
			var res = this.OpFor(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpIf)
		{
			var res = this.OpIf(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			var res = t.expression.constructor.OpPipe(t, op_code, false);
			t = Runtime.rtl.get(res, 0);
			content = t.s(Runtime.rtl.get(res, 1) + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpReturn)
		{
			var res = this.OpReturn(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpThrow)
		{
			var res = this.OpThrow(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTryCatch)
		{
			var res = this.OpTryCatch(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpWhile)
		{
			var res = this.OpWhile(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpInc)
		{
			var res = t.expression.constructor.OpInc(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = t.s(Runtime.rtl.get(res, 1) + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
		{
			var res = this.OpPreprocessorIfCode(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			var res = this.OpPreprocessorIfDef(t, op_code, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorSwitch)
		{
			for (var i = 0;i < op_code.items.count();i++)
			{
				var res = this.OpPreprocessorIfCode(t, op_code.items.item(i));
				var s = Runtime.rtl.get(res, 1);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpComment)
		{
			var res = this.OpComment(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpSafe)
		{
			var res = this.Operators(t, op_code.items);
			t = Runtime.rtl.get(res, 0);
			content = Runtime.rtl.get(res, 1);
		}
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
		if (save != "")
		{
			content = save + Runtime.rtl.toStr(content);
		}
		/* Restore save op codes */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Operators
	 */
	Operators: function(t, op_code)
	{
		var content = "";
		var f1 = (op_code) => 
		{
			return op_code instanceof Bayrell.Lang.OpCodes.OpBreak || op_code instanceof Bayrell.Lang.OpCodes.OpCall || op_code instanceof Bayrell.Lang.OpCodes.OpContinue || op_code instanceof Bayrell.Lang.OpCodes.OpReturn || op_code instanceof Bayrell.Lang.OpCodes.OpThrow;
		};
		if (op_code instanceof Bayrell.Lang.OpCodes.OpItems)
		{
			for (var i = 0;i < op_code.items.count();i++)
			{
				var item = op_code.items.item(i);
				var res = this.Operator(t, item);
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlItems)
		{
			var save_html_var_name = t.html_var_name;
			var save_is_html = t.is_html;
			/* Save op codes */
			var save_op_codes = t.save_op_codes;
			var save_op_code_inc = t.save_op_code_inc;
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), true);
			var res = t.html.constructor.OpHtmlItems(t, op_code);
			t = Runtime.rtl.get(res, 0);
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content = save;
			}
			/* Output content */
			if (Runtime.rtl.get(res, 1) != "")
			{
				content += Runtime.rtl.toStr(t.s("static::_p(" + Runtime.rtl.toStr(save_html_var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(Runtime.rtl.get(res, 1)) + Runtime.rtl.toStr(");")));
			}
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_codes"]), save_op_codes);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["save_op_code_inc"]), save_op_code_inc);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), save_is_html);
		}
		else
		{
			var res = this.Operator(t, op_code);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction Arguments
	 */
	OpDeclareFunctionArgs: function(t, f)
	{
		var content = "";
		if (f.args != null)
		{
			var flag = false;
			if (f.is_context)
			{
				content += Runtime.rtl.toStr("$ctx");
				flag = true;
			}
			if (f.is_html)
			{
				flag = true;
				content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("$layout, $model_path, $render_params, $render_content"));
			}
			for (var i = 0;i < f.args.count(i);i++)
			{
				var arg = f.args.item(i);
				var name = arg.name;
				var expr = "";
				if (arg.expression != null)
				{
					var res = t.expression.constructor.Expression(t, arg.expression);
					t = Runtime.rtl.get(res, 0);
					expr = Runtime.rtl.get(res, 1);
				}
				content += Runtime.rtl.toStr(((flag) ? (", ") : ("")) + Runtime.rtl.toStr("$") + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(((expr != "") ? ("=" + Runtime.rtl.toStr(expr)) : (""))));
				flag = true;
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(t, f)
	{
		var save_t = t;
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_pipe"]), false);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_html"]), false);
		var content = "";
		t = t.levelInc();
		if (f.is_html)
		{
			content += Runtime.rtl.toStr(t.s("$model = \\Runtime\\rtl::attr($layout, $model_path);"));
		}
		if (f.items)
		{
			var res = t.operator.constructor.Operators(t, f.items);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		else if (f.expression)
		{
			/* Clear save op codes */
			t = t.constructor.clearSaveOpCode(t);
			var res = t.expression.constructor.Expression(t, f.expression);
			t = Runtime.rtl.get(res, 0);
			var expr = Runtime.rtl.get(res, 1);
			var s = "";
			if (f.flags != null && f.flags.isFlag("memorize"))
			{
				s = "$__memorize_value = " + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(";");
				s += Runtime.rtl.toStr(t.s(t.expression.constructor.getModuleName(t, "Runtime.rtl") + Runtime.rtl.toStr("::_memorizeSave(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(f.name) + Runtime.rtl.toStr("\", func_get_args(), $__memorize_value);")));
				s += Runtime.rtl.toStr(t.s("return $__memorize_value;"));
			}
			else
			{
				s = t.s("return " + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(";"));
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t);
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(s);
		}
		if (f.flags != null && f.flags.isFlag("memorize"))
		{
			var s = "";
			s += Runtime.rtl.toStr(t.s("$__memorize_value = " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(t, "Runtime.rtl")) + Runtime.rtl.toStr("::_memorizeValue(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(f.name) + Runtime.rtl.toStr("\", func_get_args());")));
			s += Runtime.rtl.toStr(t.s("if ($__memorize_value != " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(t, "Runtime.rtl")) + Runtime.rtl.toStr("::$_memorize_not_found) return $__memorize_value;")));
			content = s + Runtime.rtl.toStr(content);
		}
		t = t.levelDec();
		content = t.s("{") + Runtime.rtl.toStr(content);
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPOperator";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"OpAssignStruct",
			"OpAssign",
			"OpDelete",
			"OpFor",
			"OpIf",
			"OpReturn",
			"OpThrow",
			"OpTryCatch",
			"OpWhile",
			"OpPreprocessorIfCode",
			"OpPreprocessorIfDef",
			"OpComment",
			"OpComments",
			"AddComments",
			"Operator",
			"Operators",
			"OpDeclareFunctionArgs",
			"OpDeclareFunctionBody",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPOperator);
window["Bayrell.Lang.LangPHP.TranslatorPHPOperator"] = Bayrell.Lang.LangPHP.TranslatorPHPOperator;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangPHP.TranslatorPHPOperator;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPProgram = function()
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPProgram.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPProgram)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPProgram,
{
	/**
	 * OpNamespace
	 */
	OpNamespace: function(t, op_code)
	{
		var arr = Runtime.rs.split("\\.", op_code.name);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_namespace_name"]), op_code.name);
		return Runtime.Collection.from([t,t.s("namespace " + Runtime.rtl.toStr(Runtime.rs.join("\\", arr)) + Runtime.rtl.toStr(";"))]);
	},
	/**
	 * OpDeclareFunction
	 */
	OpDeclareFunction: function(t, op_code)
	{
		if (op_code.isFlag("declare"))
		{
			return Runtime.Collection.from([t,""]);
		}
		var content = "";
		/* Set current function */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code);
		var s1 = "";
		var s2 = "";
		if (op_code.isStatic())
		{
			s1 += Runtime.rtl.toStr("static ");
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), true);
		}
		else
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["is_static_function"]), false);
		}
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code);
		var args = Runtime.rtl.get(res, 1);
		s1 += Runtime.rtl.toStr("function " + Runtime.rtl.toStr(op_code.name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
		if (t.current_class.kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			var res = t.operator.constructor.OpDeclareFunctionBody(t, op_code);
			s2 += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		else
		{
			s2 += Runtime.rtl.toStr(";");
		}
		s1 = t.s(s1);
		/* Function comments */
		var res = t.operator.constructor.AddComments(t, op_code.comments, s1 + Runtime.rtl.toStr(s2));
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpFunctionAnnotations
	 */
	OpFunctionAnnotations: function(t, f)
	{
		var content = "";
		if (f.flags.isFlag("declare"))
		{
			return Runtime.Collection.from([t,content]);
		}
		if (!f.annotations)
		{
			return Runtime.Collection.from([t,content]);
		}
		if (f.annotations.count() == 0)
		{
			return Runtime.Collection.from([t,content]);
		}
		content += Runtime.rtl.toStr(t.s("if ($field_name == " + Runtime.rtl.toStr(t.expression.constructor.toString(f.name)) + Runtime.rtl.toStr(")")));
		t = t.levelInc();
		content += Runtime.rtl.toStr(t.s("return \\Runtime\\Dict::from(["));
		t = t.levelInc();
		if (f.flags.isFlag("async"))
		{
			content += Runtime.rtl.toStr(t.s("\"async\"=>true,"));
		}
		content += Runtime.rtl.toStr(t.s("\"annotations\"=>\\Runtime\\Collection::from(["));
		t = t.levelInc();
		for (var j = 0;j < f.annotations.count();j++)
		{
			var annotation = f.annotations.item(j);
			var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
			t = Runtime.rtl.get(res, 0);
			var name = Runtime.rtl.get(res, 1);
			var res = t.expression.constructor.OpDict(t, annotation.params, true);
			t = Runtime.rtl.get(res, 0);
			var params = Runtime.rtl.get(res, 1);
			content += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("($ctx, ") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("]),"));
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("]);"));
		t = t.levelDec();
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassBodyItemMethodsList
	 */
	OpClassBodyItemMethodsList: function(t, item)
	{
		var content = "";
		if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			if (Runtime.rtl.get(t.preprocessor_flags, item.condition.value) == true)
			{
				for (var i = 0;i < item.items.count();i++)
				{
					var op_code = item.items.item(i);
					var res = this.OpClassBodyItemMethodsList(t, op_code);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
		}
		else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			if (!item.flags.isFlag("declare") && !item.flags.isFlag("protected") && !item.flags.isFlag("private"))
			{
				content += Runtime.rtl.toStr(t.s(t.expression.constructor.toString(item.name) + Runtime.rtl.toStr(",")));
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassBodyItemAnnotations
	 */
	OpClassBodyItemAnnotations: function(t, item)
	{
		var content = "";
		if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			if (Runtime.rtl.get(t.preprocessor_flags, item.condition.value) == true)
			{
				for (var i = 0;i < item.items.count();i++)
				{
					var op_code = item.items.item(i);
					var res = this.OpClassBodyItemAnnotations(t, op_code);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
		}
		else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			var res = this.OpFunctionAnnotations(t, item);
			t = Runtime.rtl.get(res, 0);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassConstructor: function(t, op_code)
	{
		if (op_code.fn_create == null)
		{
			return Runtime.Collection.from([t,""]);
		}
		var open = "";
		var content = "";
		var save_t = t;
		/* Set function name */
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_function"]), op_code.fn_create);
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(t);
		open += Runtime.rtl.toStr(t.s("function __construct("));
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code.fn_create);
		t = Runtime.rtl.get(res, 0);
		open += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		open += Runtime.rtl.toStr(")");
		open += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* Function body */
		var res = t.operator.constructor.Operators(t, (op_code.fn_create.expression) ? (op_code.fn_create.expression) : (op_code.fn_create.items));
		t = Runtime.rtl.get(res, 0);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* Constructor end */
		var save = t.constructor.outputSaveOpCode(t);
		if (save != "")
		{
			content = open + Runtime.rtl.toStr(t.s(save + Runtime.rtl.toStr(content)));
		}
		else
		{
			content = open + Runtime.rtl.toStr(content);
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([save_t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBody: function(t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		t = t.constructor.clearSaveOpCode(t);
		content += Runtime.rtl.toStr(t.s("{"));
		t = t.levelInc();
		/* Static variables */
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE && op_code.vars != null)
		{
			for (var i = 0;i < op_code.vars.count();i++)
			{
				var variable = op_code.vars.item(i);
				if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
				{
					continue;
				}
				var is_static = variable.flags.isFlag("static");
				var is_const = variable.flags.isFlag("const");
				for (var j = 0;j < variable.values.count();j++)
				{
					var value = variable.values.item(j);
					var res = t.expression.constructor.Expression(t, value.expression);
					var s = (value.expression != null) ? (Runtime.rtl.get(res, 1)) : ("null");
					if (is_static && is_const)
					{
						content += Runtime.rtl.toStr(t.s("const " + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";")));
					}
					else if (is_static)
					{
						content += Runtime.rtl.toStr(t.s("static $" + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";")));
					}
					else if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
					{
						content += Runtime.rtl.toStr(t.s("public $__" + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
					}
					else
					{
						content += Runtime.rtl.toStr(t.s("public $" + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
					}
				}
			}
		}
		/* Constructor */
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			var res = this.OpDeclareClassConstructor(t, op_code);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		}
		/* Functions */
		if (op_code.functions != null)
		{
			for (var i = 0;i < op_code.functions.count();i++)
			{
				var f = op_code.functions.item(i);
				var res = this.OpDeclareFunction(t, f);
				t = Runtime.rtl.get(res, 0);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
		}
		/* Class items */
		for (var i = 0;i < op_code.items.count();i++)
		{
			var item = op_code.items.item(i);
			if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(t, item);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
			{
				var res = t.operator.constructor.OpPreprocessorIfDef(t, item, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_CLASS_BODY);
				content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorSwitch)
			{
				for (var j = 0;j < item.items.count();j++)
				{
					var res = t.operator.constructor.OpPreprocessorIfCode(t, item.items.item(j));
					var s = Runtime.rtl.get(res, 1);
					if (s == "")
					{
						continue;
					}
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
		}
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			content += Runtime.rtl.toStr(t.s("/* ======================= Class Init Functions ======================= */"));
		}
		/* Init variables */
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE && op_code.vars != null)
		{
			var vars = op_code.vars.filter((variable) => 
			{
				return !variable.flags.isFlag("static");
			});
			if (t.current_class_full_name != "Runtime.BaseObject" && vars.count() > 0)
			{
				content += Runtime.rtl.toStr(t.s("function _init($ctx)"));
				content += Runtime.rtl.toStr(t.s("{"));
				t = t.levelInc();
				if (t.current_class_extends_name != "")
				{
					content += Runtime.rtl.toStr(t.s("parent::_init($ctx);"));
				}
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					var is_static = variable.flags.isFlag("static");
					if (is_static)
					{
						continue;
					}
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
					{
						continue;
					}
					var prefix = "";
					if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
					{
						prefix = "__";
					}
					else if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_CLASS)
					{
						prefix = "";
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						var res = t.expression.constructor.Expression(t, value.expression);
						var s = (value.expression != null) ? (Runtime.rtl.get(res, 1)) : ("null");
						content += Runtime.rtl.toStr(t.s("$this->" + Runtime.rtl.toStr(prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";")));
					}
				}
				t = t.levelDec();
				content += Runtime.rtl.toStr(t.s("}"));
			}
			/* Struct */
			if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT || t.enable_introspection)
			{
				var is_struct = class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT;
				var var_prefix = (is_struct) ? ("__") : ("");
				if (!is_struct)
				{
					/* Assign Object */
					content += Runtime.rtl.toStr(t.s("function assignObject($ctx,$o)"));
					content += Runtime.rtl.toStr(t.s("{"));
					t = t.levelInc();
					content += Runtime.rtl.toStr(t.s("if ($o instanceof \\" + Runtime.rtl.toStr(Runtime.rs.replace("\\.", "\\", t.current_class_full_name)) + Runtime.rtl.toStr(")")));
					content += Runtime.rtl.toStr(t.s("{"));
					t = t.levelInc();
					for (var i = 0;i < op_code.vars.count();i++)
					{
						var variable = op_code.vars.item(i);
						if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
						{
							continue;
						}
						if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
						{
							continue;
						}
						var is_const = variable.flags.isFlag("const");
						var is_static = variable.flags.isFlag("static");
						var is_protected = variable.flags.isFlag("protected");
						var is_private = variable.flags.isFlag("private");
						if (is_const || is_static)
						{
							continue;
						}
						if (is_protected || is_private)
						{
							continue;
						}
						for (var j = 0;j < variable.values.count();j++)
						{
							var value = variable.values.item(j);
							content += Runtime.rtl.toStr(t.s("$this->" + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = $o->") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
						}
					}
					t = t.levelDec();
					content += Runtime.rtl.toStr(t.s("}"));
					if (t.current_class.extend_name)
					{
						content += Runtime.rtl.toStr(t.s("parent::assignObject($ctx,$o);"));
					}
					t = t.levelDec();
					content += Runtime.rtl.toStr(t.s("}"));
					/* Assign Value */
					content += Runtime.rtl.toStr(t.s("function assignValue($ctx,$k,$v)"));
					content += Runtime.rtl.toStr(t.s("{"));
					t = t.levelInc();
					var flag = false;
					for (var i = 0;i < op_code.vars.count();i++)
					{
						var variable = op_code.vars.item(i);
						if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
						{
							continue;
						}
						if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
						{
							continue;
						}
						var is_const = variable.flags.isFlag("const");
						var is_static = variable.flags.isFlag("static");
						var is_protected = variable.flags.isFlag("protected");
						var is_private = variable.flags.isFlag("private");
						if (is_const || is_static)
						{
							continue;
						}
						if (is_protected || is_private)
						{
							continue;
						}
						for (var j = 0;j < variable.values.count();j++)
						{
							var value = variable.values.item(j);
							if (t.flag_struct_check_types)
							{
								content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("if ($k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("$this->") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = Runtime.rtl.to($v, null, ") + Runtime.rtl.toStr(this.toPattern(t, variable.pattern)) + Runtime.rtl.toStr(");")));
							}
							else
							{
								content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("if ($k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("$this->") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = $v;")));
							}
							flag = true;
						}
					}
					if (t.current_class.extend_name)
					{
						content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("parent::assignValue($ctx,$k,$v);")));
					}
					t = t.levelDec();
					content += Runtime.rtl.toStr(t.s("}"));
				}
				/* Take Value */
				content += Runtime.rtl.toStr(t.s("function takeValue($ctx,$k,$d=null)"));
				content += Runtime.rtl.toStr(t.s("{"));
				t = t.levelInc();
				var flag = false;
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
					{
						continue;
					}
					var is_const = variable.flags.isFlag("const");
					var is_static = variable.flags.isFlag("static");
					var is_protected = variable.flags.isFlag("protected");
					var is_private = variable.flags.isFlag("private");
					if (is_const || is_static)
					{
						continue;
					}
					if (is_protected || is_private)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						content += Runtime.rtl.toStr(t.s(((flag) ? ("else ") : ("")) + Runtime.rtl.toStr("if ($k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(")return $this->") + Runtime.rtl.toStr(var_prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
						flag = true;
					}
				}
				if (t.current_class.extend_name)
				{
					content += Runtime.rtl.toStr(t.s("return parent::takeValue($ctx,$k,$d);"));
				}
				t = t.levelDec();
				content += Runtime.rtl.toStr(t.s("}"));
			}
		}
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			/* Get current namespace function */
			content += Runtime.rtl.toStr(t.s("static function getNamespace()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_namespace_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
			/* Get current class name function */
			content += Runtime.rtl.toStr(t.s("static function getClassName()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.current_class_full_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
			/* Get parent class name function */
			content += Runtime.rtl.toStr(t.s("static function getParentClassName()"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.toString(t.expression.constructor.findModuleName(t, t.current_class_extends_name))) + Runtime.rtl.toStr(";")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
			/* Class info */
			content += Runtime.rtl.toStr(t.s("static function getClassInfo($ctx)"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			t = t.constructor.clearSaveOpCode(t);
			content += Runtime.rtl.toStr(t.s("return \\Runtime\\Dict::from(["));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("\"annotations\"=>\\Runtime\\Collection::from(["));
			t = t.levelInc();
			for (var j = 0;j < op_code.annotations.count();j++)
			{
				var annotation = op_code.annotations.item(j);
				var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
				t = Runtime.rtl.get(res, 0);
				var name = Runtime.rtl.get(res, 1);
				if (annotation.params != null)
				{
					var res = t.expression.constructor.OpDict(t, annotation.params, true);
					t = Runtime.rtl.get(res, 0);
					var params = Runtime.rtl.get(res, 1);
					content += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("($ctx, ") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
				}
				else
				{
					content += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("($ctx),")));
				}
			}
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("]),"));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("]);"));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
			/* Get fields list of the function */
			content += Runtime.rtl.toStr(t.s("static function getFieldsList($ctx)"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("$a = [];"));
			if (op_code.vars != null)
			{
				var vars = new Runtime.Map();
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					var is_const = variable.flags.isFlag("const");
					var is_static = variable.flags.isFlag("static");
					var is_protected = variable.flags.isFlag("protected");
					var is_private = variable.flags.isFlag("private");
					var has_annotation = variable.annotations != null && variable.annotations.count() > 0;
					if (is_const || is_static)
					{
						continue;
					}
					if (is_protected || is_private)
					{
						continue;
					}
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						content += Runtime.rtl.toStr(t.s("$a[]=" + Runtime.rtl.toStr(t.expression.constructor.toString(value.var_name)) + Runtime.rtl.toStr(";")));
					}
				}
			}
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(t, "Runtime.Collection")) + Runtime.rtl.toStr("::from($a);")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
			/* Get field info by name */
			content += Runtime.rtl.toStr(t.s("static function getFieldInfoByName($ctx,$field_name)"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			if (op_code.vars != null)
			{
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (variable.condition && Runtime.rtl.get(t.preprocessor_flags, variable.condition.value) != true)
					{
						continue;
					}
					var is_const = variable.flags.isFlag("const");
					var is_static = variable.flags.isFlag("static");
					var is_protected = variable.flags.isFlag("protected");
					var is_private = variable.flags.isFlag("private");
					if (is_const || is_static)
					{
						continue;
					}
					if (is_protected || is_private)
					{
						continue;
					}
					var v = variable.values.map((value) => 
					{
						return value.var_name;
					});
					v = v.map((var_name) => 
					{
						return "$field_name == " + Runtime.rtl.toStr(t.expression.constructor.toString(var_name));
					});
					var var_type = Runtime.rs.join(".", t.expression.constructor.findModuleNames(t, variable.pattern.entity_name.names));
					var var_sub_types = (variable.pattern.template != null) ? (variable.pattern.template.map((op_code) => 
					{
						return Runtime.rs.join(".", t.expression.constructor.findModuleNames(t, op_code.entity_name.names));
					})) : (Runtime.Collection.from([]));
					var_sub_types = var_sub_types.map(t.expression.constructor.toString);
					t = t.constructor.clearSaveOpCode(t);
					content += Runtime.rtl.toStr(t.s("if (" + Runtime.rtl.toStr(Runtime.rs.join(" or ", v)) + Runtime.rtl.toStr(") ") + Runtime.rtl.toStr("return \\Runtime\\Dict::from([")));
					t = t.levelInc();
					content += Runtime.rtl.toStr(t.s("\"t\"=>" + Runtime.rtl.toStr(t.expression.constructor.toString(var_type)) + Runtime.rtl.toStr(",")));
					if (var_sub_types.count() > 0)
					{
						content += Runtime.rtl.toStr(t.s("\"s\"=> [" + Runtime.rtl.toStr(Runtime.rs.join(", ", var_sub_types)) + Runtime.rtl.toStr("],")));
					}
					content += Runtime.rtl.toStr(t.s("\"annotations\"=>\\Runtime\\Collection::from(["));
					t = t.levelInc();
					for (var j = 0;j < variable.annotations.count();j++)
					{
						var annotation = variable.annotations.item(j);
						var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
						t = Runtime.rtl.get(res, 0);
						var name = Runtime.rtl.get(res, 1);
						var res = t.expression.constructor.OpDict(t, annotation.params, true);
						t = Runtime.rtl.get(res, 0);
						var params = Runtime.rtl.get(res, 1);
						content += Runtime.rtl.toStr(t.s("new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("($ctx, ") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
					}
					t = t.levelDec();
					content += Runtime.rtl.toStr(t.s("]),"));
					t = t.levelDec();
					content += Runtime.rtl.toStr(t.s("]);"));
				}
			}
			content += Runtime.rtl.toStr(t.s("return null;"));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
			/* Get methods list of the function */
			content += Runtime.rtl.toStr(t.s("static function getMethodsList($ctx)"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			content += Runtime.rtl.toStr(t.s("$a=["));
			t = t.levelInc();
			if (op_code.functions != null && false)
			{
				for (var i = 0;i < op_code.functions.count();i++)
				{
					var f = op_code.functions.item(i);
					if (f.flags.isFlag("declare"))
					{
						continue;
					}
					if (f.flags.isFlag("protected"))
					{
						continue;
					}
					if (f.flags.isFlag("private"))
					{
						continue;
					}
					if (f.annotations.count() == 0)
					{
						continue;
					}
					content += Runtime.rtl.toStr(t.s(t.expression.constructor.toString(f.name) + Runtime.rtl.toStr(",")));
				}
			}
			if (op_code.items != null)
			{
				for (var i = 0;i < op_code.items.count();i++)
				{
					var item = op_code.items.item(i);
					var res = this.OpClassBodyItemMethodsList(t, item);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("];"));
			content += Runtime.rtl.toStr(t.s("return " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(t, "Runtime.Collection")) + Runtime.rtl.toStr("::from($a);")));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
			/* Get method info by name */
			content += Runtime.rtl.toStr(t.s("static function getMethodInfoByName($ctx,$field_name)"));
			content += Runtime.rtl.toStr(t.s("{"));
			t = t.levelInc();
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count();i++)
				{
					var f = op_code.functions.item(i);
					var res = this.OpFunctionAnnotations(t, f);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
			if (op_code.items != null)
			{
				for (var i = 0;i < op_code.items.count();i++)
				{
					var item = op_code.items.item(i);
					var res = this.OpClassBodyItemAnnotations(t, item);
					t = Runtime.rtl.get(res, 0);
					content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
				}
			}
			content += Runtime.rtl.toStr(t.s("return null;"));
			t = t.levelDec();
			content += Runtime.rtl.toStr(t.s("}"));
		}
		t = t.levelDec();
		content += Runtime.rtl.toStr(t.s("}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(t, op_code)
	{
		var content = "";
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClass: function(t, op_code)
	{
		if (op_code.is_abstract)
		{
			return Runtime.Collection.from([t,""]);
		}
		if (op_code.is_declare)
		{
			throw new Bayrell.Lang.Exceptions.DeclaredClass()
			return Runtime.Collection.from([t,""]);
		}
		var content = "";
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class"]), op_code);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_name"]), op_code.name);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_full_name"]), t.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(t.current_class_name));
		if (op_code.class_extends != null)
		{
			var extends_name = Runtime.rs.join(".", op_code.class_extends.entity_name.names);
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_extends_name"]), extends_name);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_extends_name"]), "Runtime.BaseStruct");
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["current_class_extends_name"]), "");
		}
		if (op_code.kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			if (op_code.class_extends != null)
			{
				content = "class " + Runtime.rtl.toStr(t.current_class_name) + Runtime.rtl.toStr(" extends ") + Runtime.rtl.toStr(t.expression.constructor.getModuleName(t, t.current_class_extends_name));
			}
			else
			{
				content = "class " + Runtime.rtl.toStr(t.current_class_name);
			}
		}
		else
		{
			content = "interface " + Runtime.rtl.toStr(t.current_class_name);
		}
		/* Add implements */
		if (op_code.class_implements != null && op_code.class_implements.count() > 0)
		{
			var arr = op_code.class_implements.map((item) => 
			{
				return t.expression.constructor.getModuleNames(t, item.entity_name.names);
			});
			var s1 = Runtime.rs.join(", ", arr);
			content += Runtime.rtl.toStr(" implements " + Runtime.rtl.toStr(s1));
		}
		/* Class body */
		var res = this.OpDeclareClassBody(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		/* Class comments */
		var res = t.operator.constructor.AddComments(t, op_code.comments, content);
		content = Runtime.rtl.get(res, 1);
		/* Class footer */
		var res = this.OpDeclareClassFooter(t, op_code);
		content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
		return Runtime.Collection.from([t,t.s(content)]);
	},
	/**
	 * Translate item
	 */
	translateItem: function(t, op_code)
	{
		if (op_code instanceof Bayrell.Lang.OpCodes.OpNamespace)
		{
			return this.OpNamespace(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDeclareClass)
		{
			return this.OpDeclareClass(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpComment)
		{
			return t.operator.constructor.OpComment(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
		{
			return t.operator.constructor.OpPreprocessorIfCode(t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorSwitch)
		{
			var content = "";
			for (var i = 0;i < op_code.items.count();i++)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(t, op_code.items.item(i));
				var s = Runtime.rtl.get(res, 1);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
			return Runtime.Collection.from([t,content]);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * Translate program
	 */
	translateProgramHeader: function(t, op_code)
	{
		var content = "<?php";
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translate program
	 */
	translateProgram: function(t, op_code)
	{
		var content = "";
		if (op_code == null)
		{
			return Runtime.Collection.from([t,content]);
		}
		if (op_code.uses != null)
		{
			t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["modules"]), op_code.uses);
		}
		if (op_code.items != null)
		{
			var res = this.translateProgramHeader(t, op_code);
			content += Runtime.rtl.toStr(Runtime.rtl.get(res, 1));
			for (var i = 0;i < op_code.items.count();i++)
			{
				var item = op_code.items.item(i);
				var res = this.translateItem(t, item);
				t = Runtime.rtl.get(res, 0);
				var s = Runtime.rtl.get(res, 1);
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
		}
		content = Runtime.rs.trim(content);
		/* Disable context */
		if (t.enable_context == false)
		{
			content = Runtime.rs.replace("\\(\\$ctx\\)", "()", content);
			content = Runtime.rs.replace("\\(\\$ctx, ", "(", content);
			content = Runtime.rs.replace("\\(\\$ctx,", "(", content);
			content = Runtime.rs.replace("\\,\\$ctx,", ",", content);
		}
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPProgram";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"OpNamespace",
			"OpDeclareFunction",
			"OpFunctionAnnotations",
			"OpClassBodyItemMethodsList",
			"OpClassBodyItemAnnotations",
			"OpDeclareClassConstructor",
			"OpDeclareClassBody",
			"OpDeclareClassFooter",
			"OpDeclareClass",
			"translateItem",
			"translateProgramHeader",
			"translateProgram",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPProgram);
window["Bayrell.Lang.LangPHP.TranslatorPHPProgram"] = Bayrell.Lang.LangPHP.TranslatorPHPProgram;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangPHP.TranslatorPHPProgram;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.BaseOpCode = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.OpCodes.BaseOpCode.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.OpCodes.BaseOpCode.prototype.constructor = Bayrell.Lang.OpCodes.BaseOpCode;
Object.assign(Bayrell.Lang.OpCodes.BaseOpCode.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.caret_start = null;
		this.caret_end = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "caret_start")return this.caret_start;
		else if (k == "caret_end")return this.caret_end;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.BaseOpCode, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.OpCodes.BaseOpCode,
{
	op: "",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("caret_start");
		a.push("caret_end");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "caret_start") return Dict.from({
			"t": "Bayrell.Lang.Caret",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret_end") return Dict.from({
			"t": "Bayrell.Lang.Caret",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.BaseOpCode);
window["Bayrell.Lang.OpCodes.BaseOpCode"] = Bayrell.Lang.OpCodes.BaseOpCode;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.BaseOpCode;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpAnnotation = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAnnotation.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpAnnotation.prototype.constructor = Bayrell.Lang.OpCodes.OpAnnotation;
Object.assign(Bayrell.Lang.OpCodes.OpAnnotation.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_annotation";
		this.name = null;
		this.params = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "name")return this.name;
		else if (k == "params")return this.params;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAnnotation, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpAnnotation,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAnnotation";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("name");
		a.push("params");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "params") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpDict",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpAnnotation);
window["Bayrell.Lang.OpCodes.OpAnnotation"] = Bayrell.Lang.OpCodes.OpAnnotation;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpAnnotation;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpAssign = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssign.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpAssign.prototype.constructor = Bayrell.Lang.OpCodes.OpAssign;
Object.assign(Bayrell.Lang.OpCodes.OpAssign.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.kind = "";
		this.var_name = "";
		this.flags = null;
		this.pattern = null;
		this.annotations = null;
		this.comments = null;
		this.values = null;
		this.names = null;
		this.expression = null;
		this.condition = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "kind")return this.kind;
		else if (k == "var_name")return this.var_name;
		else if (k == "flags")return this.flags;
		else if (k == "pattern")return this.pattern;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "values")return this.values;
		else if (k == "names")return this.names;
		else if (k == "expression")return this.expression;
		else if (k == "condition")return this.condition;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAssign, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpAssign,
{
	KIND_ASSIGN: "assign",
	KIND_DECLARE: "declare",
	KIND_STRUCT: "struct",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAssign";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("kind");
		a.push("var_name");
		a.push("flags");
		a.push("pattern");
		a.push("annotations");
		a.push("comments");
		a.push("values");
		a.push("names");
		a.push("expression");
		a.push("condition");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flags") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpFlags",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pattern") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpTypeIdentifier",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpAnnotation"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comments") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpComment"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "values") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpAssignValue"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "names") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "condition") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpAssign);
window["Bayrell.Lang.OpCodes.OpAssign"] = Bayrell.Lang.OpCodes.OpAssign;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpAssign;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpAssignStruct = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssignStruct.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpAssignStruct.prototype.constructor = Bayrell.Lang.OpCodes.OpAssignStruct;
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.var_name = "";
		this.annotations = null;
		this.comments = null;
		this.names = null;
		this.expression = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "var_name")return this.var_name;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "names")return this.names;
		else if (k == "expression")return this.expression;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpAssignStruct,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAssignStruct";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("var_name");
		a.push("annotations");
		a.push("comments");
		a.push("names");
		a.push("expression");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpAnnotation"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comments") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpComment"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "names") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["var"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpAssignStruct);
window["Bayrell.Lang.OpCodes.OpAssignStruct"] = Bayrell.Lang.OpCodes.OpAssignStruct;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpAssignStruct;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpAssignValue = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssignValue.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpAssignValue.prototype.constructor = Bayrell.Lang.OpCodes.OpAssignValue;
Object.assign(Bayrell.Lang.OpCodes.OpAssignValue.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "";
		this.var_name = "";
		this.op_code = null;
		this.expression = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "var_name")return this.var_name;
		else if (k == "op_code")return this.op_code;
		else if (k == "expression")return this.expression;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAssignValue, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpAssignValue,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAssignValue";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("var_name");
		a.push("op_code");
		a.push("expression");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "var_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op_code") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpAssignValue);
window["Bayrell.Lang.OpCodes.OpAssignValue"] = Bayrell.Lang.OpCodes.OpAssignValue;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpAssignValue;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpAttr = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAttr.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpAttr.prototype.constructor = Bayrell.Lang.OpCodes.OpAttr;
Object.assign(Bayrell.Lang.OpCodes.OpAttr.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_attr";
		this.kind = "";
		this.obj = null;
		this.value = null;
		this.attrs = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "kind")return this.kind;
		else if (k == "obj")return this.obj;
		else if (k == "value")return this.value;
		else if (k == "attrs")return this.attrs;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAttr, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpAttr,
{
	KIND_ATTR: "attr",
	KIND_STATIC: "static",
	KIND_DYNAMIC: "dynamic",
	KIND_DYNAMIC_ATTRS: "dynamic_attrs",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAttr";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("kind");
		a.push("obj");
		a.push("value");
		a.push("attrs");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "obj") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "attrs") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpAttr);
window["Bayrell.Lang.OpCodes.OpAttr"] = Bayrell.Lang.OpCodes.OpAttr;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpAttr;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpBreak = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpBreak.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpBreak.prototype.constructor = Bayrell.Lang.OpCodes.OpBreak;
Object.assign(Bayrell.Lang.OpCodes.OpBreak.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_break";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpBreak, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpBreak,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpBreak";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpBreak);
window["Bayrell.Lang.OpCodes.OpBreak"] = Bayrell.Lang.OpCodes.OpBreak;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpBreak;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpCall = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpCall.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpCall.prototype.constructor = Bayrell.Lang.OpCodes.OpCall;
Object.assign(Bayrell.Lang.OpCodes.OpCall.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_call";
		this.obj = null;
		this.args = null;
		this.is_await = false;
		this.is_context = true;
		this.is_html = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "obj")return this.obj;
		else if (k == "args")return this.args;
		else if (k == "is_await")return this.is_await;
		else if (k == "is_context")return this.is_context;
		else if (k == "is_html")return this.is_html;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpCall, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpCall,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpCall";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("obj");
		a.push("args");
		a.push("is_await");
		a.push("is_context");
		a.push("is_html");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "obj") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "args") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_await") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_context") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpCall);
window["Bayrell.Lang.OpCodes.OpCall"] = Bayrell.Lang.OpCodes.OpCall;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpCall;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpClassOf = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpClassOf.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpClassOf.prototype.constructor = Bayrell.Lang.OpCodes.OpClassOf;
Object.assign(Bayrell.Lang.OpCodes.OpClassOf.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_classof";
		this.entity_name = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "entity_name")return this.entity_name;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpClassOf, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpClassOf,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpClassOf";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("entity_name");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entity_name") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpEntityName",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpClassOf);
window["Bayrell.Lang.OpCodes.OpClassOf"] = Bayrell.Lang.OpCodes.OpClassOf;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpClassOf;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpClassRef = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpClassRef.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpClassRef.prototype.constructor = Bayrell.Lang.OpCodes.OpClassRef;
Object.assign(Bayrell.Lang.OpCodes.OpClassRef.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_classref";
		this.value = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpClassRef, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpClassRef,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpClassRef";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpClassRef);
window["Bayrell.Lang.OpCodes.OpClassRef"] = Bayrell.Lang.OpCodes.OpClassRef;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpClassRef;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpCollection = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpCollection.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpCollection.prototype.constructor = Bayrell.Lang.OpCodes.OpCollection;
Object.assign(Bayrell.Lang.OpCodes.OpCollection.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_collection";
		this.values = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "values")return this.values;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpCollection, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpCollection,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpCollection";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("values");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "values") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpCollection);
window["Bayrell.Lang.OpCodes.OpCollection"] = Bayrell.Lang.OpCodes.OpCollection;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpCollection;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpComment = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpComment.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpComment.prototype.constructor = Bayrell.Lang.OpCodes.OpComment;
Object.assign(Bayrell.Lang.OpCodes.OpComment.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_comment";
		this.value = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpComment, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpComment,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpComment";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpComment);
window["Bayrell.Lang.OpCodes.OpComment"] = Bayrell.Lang.OpCodes.OpComment;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpComment;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpContinue = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpContinue.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpContinue.prototype.constructor = Bayrell.Lang.OpCodes.OpContinue;
Object.assign(Bayrell.Lang.OpCodes.OpContinue.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_continue";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpContinue, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpContinue,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpContinue";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpContinue);
window["Bayrell.Lang.OpCodes.OpContinue"] = Bayrell.Lang.OpCodes.OpContinue;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpContinue;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpCurry = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpCurry.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpCurry.prototype.constructor = Bayrell.Lang.OpCodes.OpCurry;
Object.assign(Bayrell.Lang.OpCodes.OpCurry.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_curry";
		this.obj = null;
		this.args = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "obj")return this.obj;
		else if (k == "args")return this.args;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpCurry, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpCurry,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpCurry";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("obj");
		a.push("args");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "obj") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "args") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpCurry);
window["Bayrell.Lang.OpCodes.OpCurry"] = Bayrell.Lang.OpCodes.OpCurry;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpCurry;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpCurryArg = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpCurryArg.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpCurryArg.prototype.constructor = Bayrell.Lang.OpCodes.OpCurryArg;
Object.assign(Bayrell.Lang.OpCodes.OpCurryArg.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_curry";
		this.pos = 0;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "pos")return this.pos;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpCurryArg, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpCurryArg,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpCurryArg";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("pos");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pos") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpCurryArg);
window["Bayrell.Lang.OpCodes.OpCurryArg"] = Bayrell.Lang.OpCodes.OpCurryArg;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpCurryArg;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpDeclareClass = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareClass.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpDeclareClass.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareClass;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_class";
		this.kind = "";
		this.name = "";
		this.extend_name = "";
		this.annotations = null;
		this.comments = null;
		this.template = null;
		this.flags = null;
		this.fn_create = null;
		this.fn_destroy = null;
		this.class_extends = null;
		this.class_implements = null;
		this.vars = null;
		this.functions = null;
		this.items = null;
		this.is_abstract = false;
		this.is_static = false;
		this.is_declare = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "kind")return this.kind;
		else if (k == "name")return this.name;
		else if (k == "extend_name")return this.extend_name;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "template")return this.template;
		else if (k == "flags")return this.flags;
		else if (k == "fn_create")return this.fn_create;
		else if (k == "fn_destroy")return this.fn_destroy;
		else if (k == "class_extends")return this.class_extends;
		else if (k == "class_implements")return this.class_implements;
		else if (k == "vars")return this.vars;
		else if (k == "functions")return this.functions;
		else if (k == "items")return this.items;
		else if (k == "is_abstract")return this.is_abstract;
		else if (k == "is_static")return this.is_static;
		else if (k == "is_declare")return this.is_declare;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass,
{
	KIND_CLASS: "class",
	KIND_STRUCT: "struct",
	KIND_INTERFACE: "interface",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareClass";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("kind");
		a.push("name");
		a.push("extend_name");
		a.push("annotations");
		a.push("comments");
		a.push("template");
		a.push("flags");
		a.push("fn_create");
		a.push("fn_destroy");
		a.push("class_extends");
		a.push("class_implements");
		a.push("vars");
		a.push("functions");
		a.push("items");
		a.push("is_abstract");
		a.push("is_static");
		a.push("is_declare");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "extend_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpAnnotation"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comments") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpComment"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "template") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpTypeIdentifier"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flags") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpFlags",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "fn_create") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "fn_destroy") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_extends") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpTypeIdentifier",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "class_implements") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpTypeIdentifier"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vars") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpAssign"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "functions") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpDeclareFunction"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_abstract") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_static") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_declare") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpDeclareClass);
window["Bayrell.Lang.OpCodes.OpDeclareClass"] = Bayrell.Lang.OpCodes.OpDeclareClass;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpDeclareClass;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpDeclareFunction = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareFunction.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpDeclareFunction.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareFunction;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction.prototype,
{
	/**
	 * Returns true if static function
	 */
	isStatic: function()
	{
		return this.flags != null && (this.flags.isFlag("static") || this.flags.isFlag("lambda") || this.flags.isFlag("pure"));
	},
	/**
	 * Returns true if is flag
	 */
	isFlag: function(flag_name)
	{
		return this.flags != null && this.flags.isFlag(flag_name);
	},
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_function";
		this.name = "";
		this.annotations = null;
		this.comments = null;
		this.args = null;
		this.vars = null;
		this.result_type = null;
		this.expression = null;
		this.items = null;
		this.flags = null;
		this.is_context = true;
		this.is_html = false;
		this.is_html_default_args = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "name")return this.name;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "args")return this.args;
		else if (k == "vars")return this.vars;
		else if (k == "result_type")return this.result_type;
		else if (k == "expression")return this.expression;
		else if (k == "items")return this.items;
		else if (k == "flags")return this.flags;
		else if (k == "is_context")return this.is_context;
		else if (k == "is_html")return this.is_html;
		else if (k == "is_html_default_args")return this.is_html_default_args;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunction";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("name");
		a.push("annotations");
		a.push("comments");
		a.push("args");
		a.push("vars");
		a.push("result_type");
		a.push("expression");
		a.push("items");
		a.push("flags");
		a.push("is_context");
		a.push("is_html");
		a.push("is_html_default_args");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpAnnotation"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comments") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpComment"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "args") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpDeclareFunctionArg"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vars") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "result_type") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flags") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpFlags",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_context") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html_default_args") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isStatic",
			"isFlag",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpDeclareFunction);
window["Bayrell.Lang.OpCodes.OpDeclareFunction"] = Bayrell.Lang.OpCodes.OpDeclareFunction;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpDeclareFunction;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpDeclareFunctionArg = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareFunctionArg.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpDeclareFunctionArg.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunctionArg.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_function_arg";
		this.pattern = null;
		this.name = "";
		this.expression = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "pattern")return this.pattern;
		else if (k == "name")return this.name;
		else if (k == "expression")return this.expression;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunctionArg, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunctionArg,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunctionArg";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("pattern");
		a.push("name");
		a.push("expression");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pattern") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpDeclareFunctionArg);
window["Bayrell.Lang.OpCodes.OpDeclareFunctionArg"] = Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpDelete = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDelete.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpDelete.prototype.constructor = Bayrell.Lang.OpCodes.OpDelete;
Object.assign(Bayrell.Lang.OpCodes.OpDelete.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_delete";
		this.op_code = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "op_code")return this.op_code;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDelete, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpDelete,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDelete";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("op_code");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op_code") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpDelete);
window["Bayrell.Lang.OpCodes.OpDelete"] = Bayrell.Lang.OpCodes.OpDelete;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpDelete;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpDict = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDict.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpDict.prototype.constructor = Bayrell.Lang.OpCodes.OpDict;
Object.assign(Bayrell.Lang.OpCodes.OpDict.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_dict";
		this.values = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "values")return this.values;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDict, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpDict,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDict";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("values");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "values") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpDict);
window["Bayrell.Lang.OpCodes.OpDict"] = Bayrell.Lang.OpCodes.OpDict;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpDict;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpDictPair = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDictPair.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.OpCodes.OpDictPair.prototype.constructor = Bayrell.Lang.OpCodes.OpDictPair;
Object.assign(Bayrell.Lang.OpCodes.OpDictPair.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.key = "";
		this.value = null;
		this.condition = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "key")return this.key;
		else if (k == "value")return this.value;
		else if (k == "condition")return this.condition;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDictPair, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.OpCodes.OpDictPair,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDictPair";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("key");
		a.push("value");
		a.push("condition");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "key") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "condition") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpDictPair);
window["Bayrell.Lang.OpCodes.OpDictPair"] = Bayrell.Lang.OpCodes.OpDictPair;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpDictPair;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpEntityName = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpEntityName.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpEntityName.prototype.constructor = Bayrell.Lang.OpCodes.OpEntityName;
Object.assign(Bayrell.Lang.OpCodes.OpEntityName.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_entity_name";
		this.names = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "names")return this.names;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpEntityName, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpEntityName,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpEntityName";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("names");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "names") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpEntityName);
window["Bayrell.Lang.OpCodes.OpEntityName"] = Bayrell.Lang.OpCodes.OpEntityName;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpEntityName;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpFlags = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpFlags.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.OpCodes.OpFlags.prototype.constructor = Bayrell.Lang.OpCodes.OpFlags;
Object.assign(Bayrell.Lang.OpCodes.OpFlags.prototype,
{
	/**
	 * Read is Flag
	 */
	isFlag: function(name)
	{
		if (!Bayrell.Lang.OpCodes.OpFlags.hasFlag(name))
		{
			return false;
		}
		return this.takeValue("p_" + Runtime.rtl.toStr(name));
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.p_async = false;
		this.p_export = false;
		this.p_static = false;
		this.p_const = false;
		this.p_public = false;
		this.p_private = false;
		this.p_protected = false;
		this.p_declare = false;
		this.p_serializable = false;
		this.p_cloneable = false;
		this.p_assignable = false;
		this.p_memorize = false;
		this.p_lambda = false;
		this.p_pure = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "p_async")return this.p_async;
		else if (k == "p_export")return this.p_export;
		else if (k == "p_static")return this.p_static;
		else if (k == "p_const")return this.p_const;
		else if (k == "p_public")return this.p_public;
		else if (k == "p_private")return this.p_private;
		else if (k == "p_protected")return this.p_protected;
		else if (k == "p_declare")return this.p_declare;
		else if (k == "p_serializable")return this.p_serializable;
		else if (k == "p_cloneable")return this.p_cloneable;
		else if (k == "p_assignable")return this.p_assignable;
		else if (k == "p_memorize")return this.p_memorize;
		else if (k == "p_lambda")return this.p_lambda;
		else if (k == "p_pure")return this.p_pure;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpFlags, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.OpCodes.OpFlags,
{
	/**
	 * Get flags
	 */
	getFlags: function()
	{
		return Runtime.Collection.from(["async","export","static","const","public","private","declare","protected","serializable","cloneable","assignable","memorize","pure"]);
	},
	/**
	 * Get flags
	 */
	hasFlag: function(flag_name)
	{
		if (flag_name == "async" || flag_name == "export" || flag_name == "static" || flag_name == "const" || flag_name == "public" || flag_name == "private" || flag_name == "declare" || flag_name == "protected" || flag_name == "serializable" || flag_name == "cloneable" || flag_name == "assignable" || flag_name == "memorize" || flag_name == "lambda" || flag_name == "pure")
		{
			return true;
		}
		return false;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpFlags";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("p_async");
		a.push("p_export");
		a.push("p_static");
		a.push("p_const");
		a.push("p_public");
		a.push("p_private");
		a.push("p_protected");
		a.push("p_declare");
		a.push("p_serializable");
		a.push("p_cloneable");
		a.push("p_assignable");
		a.push("p_memorize");
		a.push("p_lambda");
		a.push("p_pure");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "p_async") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_export") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_static") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_const") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_public") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_private") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_protected") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_declare") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_serializable") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_cloneable") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_assignable") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_memorize") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_lambda") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_pure") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"isFlag",
			"getFlags",
			"hasFlag",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpFlags);
window["Bayrell.Lang.OpCodes.OpFlags"] = Bayrell.Lang.OpCodes.OpFlags;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpFlags;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpFor = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpFor.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpFor.prototype.constructor = Bayrell.Lang.OpCodes.OpFor;
Object.assign(Bayrell.Lang.OpCodes.OpFor.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_for";
		this.expr1 = null;
		this.expr2 = null;
		this.expr3 = null;
		this.value = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "expr1")return this.expr1;
		else if (k == "expr2")return this.expr2;
		else if (k == "expr3")return this.expr3;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpFor, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpFor,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpFor";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("expr1");
		a.push("expr2");
		a.push("expr3");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expr1") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expr2") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expr3") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpFor);
window["Bayrell.Lang.OpCodes.OpFor"] = Bayrell.Lang.OpCodes.OpFor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpFor;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpHtmlAttribute = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpHtmlAttribute.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpHtmlAttribute.prototype.constructor = Bayrell.Lang.OpCodes.OpHtmlAttribute;
Object.assign(Bayrell.Lang.OpCodes.OpHtmlAttribute.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_html_attr";
		this.key = "";
		this.value = "";
		this.is_spread = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "key")return this.key;
		else if (k == "value")return this.value;
		else if (k == "is_spread")return this.is_spread;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpHtmlAttribute, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpHtmlAttribute,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpHtmlAttribute";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("key");
		a.push("value");
		a.push("is_spread");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "key") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_spread") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpHtmlAttribute);
window["Bayrell.Lang.OpCodes.OpHtmlAttribute"] = Bayrell.Lang.OpCodes.OpHtmlAttribute;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpHtmlAttribute;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpHtmlContent = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpHtmlContent.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpHtmlContent.prototype.constructor = Bayrell.Lang.OpCodes.OpHtmlContent;
Object.assign(Bayrell.Lang.OpCodes.OpHtmlContent.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_html_content";
		this.value = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpHtmlContent, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpHtmlContent,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpHtmlContent";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpHtmlContent);
window["Bayrell.Lang.OpCodes.OpHtmlContent"] = Bayrell.Lang.OpCodes.OpHtmlContent;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpHtmlContent;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpHtmlItems = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpHtmlItems.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpHtmlItems.prototype.constructor = Bayrell.Lang.OpCodes.OpHtmlItems;
Object.assign(Bayrell.Lang.OpCodes.OpHtmlItems.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_html";
		this.items = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "items")return this.items;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpHtmlItems, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpHtmlItems,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpHtmlItems";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("items");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpHtmlItems);
window["Bayrell.Lang.OpCodes.OpHtmlItems"] = Bayrell.Lang.OpCodes.OpHtmlItems;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpHtmlItems;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpHtmlTag = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpHtmlTag.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpHtmlTag.prototype.constructor = Bayrell.Lang.OpCodes.OpHtmlTag;
Object.assign(Bayrell.Lang.OpCodes.OpHtmlTag.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_html_tag";
		this.tag_name = "";
		this.op_code_name = null;
		this.attrs = null;
		this.spreads = null;
		this.items = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "tag_name")return this.tag_name;
		else if (k == "op_code_name")return this.op_code_name;
		else if (k == "attrs")return this.attrs;
		else if (k == "spreads")return this.spreads;
		else if (k == "items")return this.items;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpHtmlTag, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpHtmlTag,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpHtmlTag";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("tag_name");
		a.push("op_code_name");
		a.push("attrs");
		a.push("spreads");
		a.push("items");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tag_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op_code_name") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "attrs") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpHtmlAttribute"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "spreads") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["primitive"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpHtmlItems",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpHtmlTag);
window["Bayrell.Lang.OpCodes.OpHtmlTag"] = Bayrell.Lang.OpCodes.OpHtmlTag;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpHtmlTag;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpHtmlValue = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpHtmlValue.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpHtmlValue.prototype.constructor = Bayrell.Lang.OpCodes.OpHtmlValue;
Object.assign(Bayrell.Lang.OpCodes.OpHtmlValue.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_html_value";
		this.kind = "";
		this.value = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "kind")return this.kind;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpHtmlValue, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpHtmlValue,
{
	KIND_RAW: "raw",
	KIND_JSON: "json",
	KIND_HTML: "html",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpHtmlValue";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("kind");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpHtmlValue);
window["Bayrell.Lang.OpCodes.OpHtmlValue"] = Bayrell.Lang.OpCodes.OpHtmlValue;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpHtmlValue;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpIdentifier = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpIdentifier.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpIdentifier.prototype.constructor = Bayrell.Lang.OpCodes.OpIdentifier;
Object.assign(Bayrell.Lang.OpCodes.OpIdentifier.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_identifier";
		this.value = "";
		this.kind = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "value")return this.value;
		else if (k == "kind")return this.kind;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpIdentifier, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpIdentifier,
{
	KIND_PIPE: "pipe",
	KIND_VARIABLE: "var",
	KIND_SYS_TYPE: "sys",
	KIND_SYS_FUNCTION: "sys_fn",
	KIND_FUNCTION: "fn",
	KIND_CONTEXT: "ctx",
	KIND_CONSTANT: "const",
	KIND_CLASS: "class",
	KIND_CLASSREF: "classref",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpIdentifier";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("value");
		a.push("kind");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpIdentifier);
window["Bayrell.Lang.OpCodes.OpIdentifier"] = Bayrell.Lang.OpCodes.OpIdentifier;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpIdentifier;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpIf = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpIf.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpIf.prototype.constructor = Bayrell.Lang.OpCodes.OpIf;
Object.assign(Bayrell.Lang.OpCodes.OpIf.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_if";
		this.condition = null;
		this.if_true = null;
		this.if_false = null;
		this.if_else = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "condition")return this.condition;
		else if (k == "if_true")return this.if_true;
		else if (k == "if_false")return this.if_false;
		else if (k == "if_else")return this.if_else;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpIf, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpIf,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpIf";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("condition");
		a.push("if_true");
		a.push("if_false");
		a.push("if_else");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "condition") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "if_true") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "if_false") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "if_else") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpIfElse"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpIf);
window["Bayrell.Lang.OpCodes.OpIf"] = Bayrell.Lang.OpCodes.OpIf;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpIf;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpIfElse = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpIfElse.prototype = Object.create(Runtime.BaseStruct.prototype);
Bayrell.Lang.OpCodes.OpIfElse.prototype.constructor = Bayrell.Lang.OpCodes.OpIfElse;
Object.assign(Bayrell.Lang.OpCodes.OpIfElse.prototype,
{
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.condition = null;
		this.if_true = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "condition")return this.condition;
		else if (k == "if_true")return this.if_true;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpIfElse, Runtime.BaseStruct);
Object.assign(Bayrell.Lang.OpCodes.OpIfElse,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpIfElse";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("condition");
		a.push("if_true");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "condition") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "if_true") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpIfElse);
window["Bayrell.Lang.OpCodes.OpIfElse"] = Bayrell.Lang.OpCodes.OpIfElse;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpIfElse;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpInc = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpInc.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpInc.prototype.constructor = Bayrell.Lang.OpCodes.OpInc;
Object.assign(Bayrell.Lang.OpCodes.OpInc.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_inc";
		this.kind = "";
		this.value = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "kind")return this.kind;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpInc, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpInc,
{
	KIND_PRE_INC: "pre_inc",
	KIND_PRE_DEC: "pre_dec",
	KIND_POST_INC: "post_inc",
	KIND_POST_DEC: "post_dec",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpInc";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("kind");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpInc);
window["Bayrell.Lang.OpCodes.OpInc"] = Bayrell.Lang.OpCodes.OpInc;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpInc;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpItems = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpItems.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpItems.prototype.constructor = Bayrell.Lang.OpCodes.OpItems;
Object.assign(Bayrell.Lang.OpCodes.OpItems.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_items";
		this.items = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "items")return this.items;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpItems, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpItems,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpItems";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("items");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpItems);
window["Bayrell.Lang.OpCodes.OpItems"] = Bayrell.Lang.OpCodes.OpItems;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpItems;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpMath = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpMath.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpMath.prototype.constructor = Bayrell.Lang.OpCodes.OpMath;
Object.assign(Bayrell.Lang.OpCodes.OpMath.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_math";
		this.value1 = null;
		this.value2 = null;
		this.math = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "value1")return this.value1;
		else if (k == "value2")return this.value2;
		else if (k == "math")return this.math;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpMath, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpMath,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpMath";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("value1");
		a.push("value2");
		a.push("math");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value1") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value2") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "math") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpMath);
window["Bayrell.Lang.OpCodes.OpMath"] = Bayrell.Lang.OpCodes.OpMath;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpMath;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpMethod = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpMethod.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpMethod.prototype.constructor = Bayrell.Lang.OpCodes.OpMethod;
Object.assign(Bayrell.Lang.OpCodes.OpMethod.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_method";
		this.value1 = null;
		this.value2 = null;
		this.kind = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "value1")return this.value1;
		else if (k == "value2")return this.value2;
		else if (k == "kind")return this.kind;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpMethod, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpMethod,
{
	KIND_ATTR: "attr",
	KIND_STATIC: "static",
	KIND_CLASS: "class",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpMethod";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("value1");
		a.push("value2");
		a.push("kind");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value1") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value2") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpMethod);
window["Bayrell.Lang.OpCodes.OpMethod"] = Bayrell.Lang.OpCodes.OpMethod;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpMethod;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpModule = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpModule.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpModule.prototype.constructor = Bayrell.Lang.OpCodes.OpModule;
Object.assign(Bayrell.Lang.OpCodes.OpModule.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.uses = null;
		this.items = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "uses")return this.uses;
		else if (k == "items")return this.items;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpModule, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpModule,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpModule";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("uses");
		a.push("items");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "uses") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpModule);
window["Bayrell.Lang.OpCodes.OpModule"] = Bayrell.Lang.OpCodes.OpModule;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpModule;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpNamespace = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpNamespace.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpNamespace.prototype.constructor = Bayrell.Lang.OpCodes.OpNamespace;
Object.assign(Bayrell.Lang.OpCodes.OpNamespace.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_namespace";
		this.name = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "name")return this.name;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpNamespace, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpNamespace,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpNamespace";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("name");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpNamespace);
window["Bayrell.Lang.OpCodes.OpNamespace"] = Bayrell.Lang.OpCodes.OpNamespace;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpNamespace;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpNew = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpNew.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpNew.prototype.constructor = Bayrell.Lang.OpCodes.OpNew;
Object.assign(Bayrell.Lang.OpCodes.OpNew.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_new";
		this.args = null;
		this.value = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "args")return this.args;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpNew, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpNew,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpNew";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("args");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "args") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpTypeIdentifier",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpNew);
window["Bayrell.Lang.OpCodes.OpNew"] = Bayrell.Lang.OpCodes.OpNew;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpNew;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpNumber = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpNumber.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpNumber.prototype.constructor = Bayrell.Lang.OpCodes.OpNumber;
Object.assign(Bayrell.Lang.OpCodes.OpNumber.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_number";
		this.value = 0;
		this.negative = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "value")return this.value;
		else if (k == "negative")return this.negative;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpNumber, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpNumber,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpNumber";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("value");
		a.push("negative");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "negative") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpNumber);
window["Bayrell.Lang.OpCodes.OpNumber"] = Bayrell.Lang.OpCodes.OpNumber;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpNumber;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpPipe = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpPipe.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpPipe.prototype.constructor = Bayrell.Lang.OpCodes.OpPipe;
Object.assign(Bayrell.Lang.OpCodes.OpPipe.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_pipe";
		this.kind = "";
		this.obj = null;
		this.value = null;
		this.is_async = false;
		this.is_monad = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "kind")return this.kind;
		else if (k == "obj")return this.obj;
		else if (k == "value")return this.value;
		else if (k == "is_async")return this.is_async;
		else if (k == "is_monad")return this.is_monad;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpPipe, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpPipe,
{
	KIND_ATTR: "attr",
	KIND_CALL: "call",
	KIND_METHOD: "method",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpPipe";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("kind");
		a.push("obj");
		a.push("value");
		a.push("is_async");
		a.push("is_monad");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "obj") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_async") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_monad") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpPipe);
window["Bayrell.Lang.OpCodes.OpPipe"] = Bayrell.Lang.OpCodes.OpPipe;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpPipe;
"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpPreprocessorIfCode = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpPreprocessorIfCode.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpPreprocessorIfCode.prototype.constructor = Bayrell.Lang.OpCodes.OpPreprocessorIfCode;
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorIfCode.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_preprocessor_ifcode";
		this.condition = null;
		this.content = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "condition")return this.condition;
		else if (k == "content")return this.content;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorIfCode, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorIfCode,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpPreprocessorIfCode";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("condition");
		a.push("content");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "condition") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpPreprocessorIfCode);
window["Bayrell.Lang.OpCodes.OpPreprocessorIfCode"] = Bayrell.Lang.OpCodes.OpPreprocessorIfCode;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpPreprocessorIfCode;
"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpPreprocessorIfDef = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpPreprocessorIfDef.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpPreprocessorIfDef.prototype.constructor = Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorIfDef.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_preprocessor_ifdef";
		this.condition = null;
		this.items = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "condition")return this.condition;
		else if (k == "items")return this.items;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorIfDef, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorIfDef,
{
	KIND_PROGRAM: "program",
	KIND_CLASS_BODY: "class_body",
	KIND_OPERATOR: "operator",
	KIND_EXPRESSION: "expression",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpPreprocessorIfDef";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("condition");
		a.push("items");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "condition") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.BaseOpCode"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpPreprocessorIfDef);
window["Bayrell.Lang.OpCodes.OpPreprocessorIfDef"] = Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpPreprocessorSwitch = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpPreprocessorSwitch.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpPreprocessorSwitch.prototype.constructor = Bayrell.Lang.OpCodes.OpPreprocessorSwitch;
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorSwitch.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_preprocessor_switch";
		this.items = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "items")return this.items;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorSwitch, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorSwitch,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpPreprocessorSwitch";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("items");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpPreprocessorIfCode"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpPreprocessorSwitch);
window["Bayrell.Lang.OpCodes.OpPreprocessorSwitch"] = Bayrell.Lang.OpCodes.OpPreprocessorSwitch;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpPreprocessorSwitch;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpReturn = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpReturn.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpReturn.prototype.constructor = Bayrell.Lang.OpCodes.OpReturn;
Object.assign(Bayrell.Lang.OpCodes.OpReturn.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_return";
		this.expression = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "expression")return this.expression;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpReturn, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpReturn,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpReturn";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("expression");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpReturn);
window["Bayrell.Lang.OpCodes.OpReturn"] = Bayrell.Lang.OpCodes.OpReturn;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpReturn;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpSafe = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpSafe.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpSafe.prototype.constructor = Bayrell.Lang.OpCodes.OpSafe;
Object.assign(Bayrell.Lang.OpCodes.OpSafe.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_safe";
		this.obj = null;
		this.items = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "obj")return this.obj;
		else if (k == "items")return this.items;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpSafe, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpSafe,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpSafe";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("obj");
		a.push("items");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "obj") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpSafe);
window["Bayrell.Lang.OpCodes.OpSafe"] = Bayrell.Lang.OpCodes.OpSafe;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpSafe;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpString = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpString.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpString.prototype.constructor = Bayrell.Lang.OpCodes.OpString;
Object.assign(Bayrell.Lang.OpCodes.OpString.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_string";
		this.value = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpString, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpString,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpString";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpString);
window["Bayrell.Lang.OpCodes.OpString"] = Bayrell.Lang.OpCodes.OpString;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpString;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpTernary = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpTernary.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpTernary.prototype.constructor = Bayrell.Lang.OpCodes.OpTernary;
Object.assign(Bayrell.Lang.OpCodes.OpTernary.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_ternary";
		this.condition = null;
		this.if_true = null;
		this.if_false = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "condition")return this.condition;
		else if (k == "if_true")return this.if_true;
		else if (k == "if_false")return this.if_false;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpTernary, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpTernary,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpTernary";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("condition");
		a.push("if_true");
		a.push("if_false");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "condition") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "if_true") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "if_false") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpTernary);
window["Bayrell.Lang.OpCodes.OpTernary"] = Bayrell.Lang.OpCodes.OpTernary;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpTernary;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpThrow = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpThrow.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpThrow.prototype.constructor = Bayrell.Lang.OpCodes.OpThrow;
Object.assign(Bayrell.Lang.OpCodes.OpThrow.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_throw";
		this.expression = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "expression")return this.expression;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpThrow, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpThrow,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpThrow";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("expression");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpThrow);
window["Bayrell.Lang.OpCodes.OpThrow"] = Bayrell.Lang.OpCodes.OpThrow;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpThrow;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpTryCatch = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpTryCatch.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpTryCatch.prototype.constructor = Bayrell.Lang.OpCodes.OpTryCatch;
Object.assign(Bayrell.Lang.OpCodes.OpTryCatch.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_try_catch";
		this.op_try = null;
		this.items = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "op_try")return this.op_try;
		else if (k == "items")return this.items;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpTryCatch, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpTryCatch,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpTryCatch";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("op_try");
		a.push("items");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "op_try") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "items") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpTryCatchItem"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpTryCatch);
window["Bayrell.Lang.OpCodes.OpTryCatch"] = Bayrell.Lang.OpCodes.OpTryCatch;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpTryCatch;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpTryCatchItem = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpTryCatchItem.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpTryCatchItem.prototype.constructor = Bayrell.Lang.OpCodes.OpTryCatchItem;
Object.assign(Bayrell.Lang.OpCodes.OpTryCatchItem.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_try_catch_item";
		this.name = "";
		this.pattern = null;
		this.value = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "name")return this.name;
		else if (k == "pattern")return this.pattern;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpTryCatchItem, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpTryCatchItem,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpTryCatchItem";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("name");
		a.push("pattern");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pattern") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpTypeIdentifier",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpTryCatchItem);
window["Bayrell.Lang.OpCodes.OpTryCatchItem"] = Bayrell.Lang.OpCodes.OpTryCatchItem;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpTryCatchItem;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpTypeConvert = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpTypeConvert.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpTypeConvert.prototype.constructor = Bayrell.Lang.OpCodes.OpTypeConvert;
Object.assign(Bayrell.Lang.OpCodes.OpTypeConvert.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_type_convert";
		this.pattern = null;
		this.value = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "pattern")return this.pattern;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpTypeConvert, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpTypeConvert,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpTypeConvert";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("pattern");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pattern") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpTypeIdentifier",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpTypeConvert);
window["Bayrell.Lang.OpCodes.OpTypeConvert"] = Bayrell.Lang.OpCodes.OpTypeConvert;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpTypeConvert;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpTypeIdentifier = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpTypeIdentifier.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpTypeIdentifier.prototype.constructor = Bayrell.Lang.OpCodes.OpTypeIdentifier;
Object.assign(Bayrell.Lang.OpCodes.OpTypeIdentifier.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_type_identifier";
		this.entity_name = null;
		this.template = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "entity_name")return this.entity_name;
		else if (k == "template")return this.template;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpTypeIdentifier, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpTypeIdentifier,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpTypeIdentifier";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("entity_name");
		a.push("template");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entity_name") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.OpEntityName",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "template") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Bayrell.Lang.OpCodes.OpTypeIdentifier"],
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpTypeIdentifier);
window["Bayrell.Lang.OpCodes.OpTypeIdentifier"] = Bayrell.Lang.OpCodes.OpTypeIdentifier;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpTypeIdentifier;
"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpUse = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpUse.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpUse.prototype.constructor = Bayrell.Lang.OpCodes.OpUse;
Object.assign(Bayrell.Lang.OpCodes.OpUse.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_use";
		this.alias = "";
		this.name = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "alias")return this.alias;
		else if (k == "name")return this.name;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpUse, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpUse,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpUse";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("alias");
		a.push("name");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "alias") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpUse);
window["Bayrell.Lang.OpCodes.OpUse"] = Bayrell.Lang.OpCodes.OpUse;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpUse;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpWhile = function()
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpWhile.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpWhile.prototype.constructor = Bayrell.Lang.OpCodes.OpWhile;
Object.assign(Bayrell.Lang.OpCodes.OpWhile.prototype,
{
	_init: function()
	{
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this);
		this.op = "op_while";
		this.condition = null;
		this.value = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "condition")return this.condition;
		else if (k == "value")return this.value;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpWhile, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpWhile,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpWhile";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("op");
		a.push("condition");
		a.push("value");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "op") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "condition") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return Dict.from({
			"t": "Bayrell.Lang.OpCodes.BaseOpCode",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpWhile);
window["Bayrell.Lang.OpCodes.OpWhile"] = Bayrell.Lang.OpCodes.OpWhile;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.OpCodes.OpWhile;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNode = function()
{
	Bayrell.Lang.LangES6.TranslatorES6.apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNode.prototype = Object.create(Bayrell.Lang.LangES6.TranslatorES6.prototype);
Bayrell.Lang.LangNode.TranslatorNode.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNode;
Object.assign(Bayrell.Lang.LangNode.TranslatorNode.prototype,
{
	_init: function()
	{
		Bayrell.Lang.LangES6.TranslatorES6.prototype._init.call(this);
		this.async_await = null;
		this.expression = null;
		this.html = null;
		this.operator = null;
		this.program = null;
		this.use_module_name = true;
		this.enable_async_await = true;
		this.emulate_async_await = false;
		this.enable_introspection = false;
		this.enable_context = true;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "async_await")return this.async_await;
		else if (k == "expression")return this.expression;
		else if (k == "html")return this.html;
		else if (k == "operator")return this.operator;
		else if (k == "program")return this.program;
		else if (k == "use_module_name")return this.use_module_name;
		else if (k == "enable_async_await")return this.enable_async_await;
		else if (k == "emulate_async_await")return this.emulate_async_await;
		else if (k == "enable_introspection")return this.enable_introspection;
		else if (k == "enable_context")return this.enable_context;
		return Bayrell.Lang.LangES6.TranslatorES6.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNode, Bayrell.Lang.LangES6.TranslatorES6);
Object.assign(Bayrell.Lang.LangNode.TranslatorNode,
{
	/**
	 * Reset translator
	 */
	reset: function(t)
	{
		t = Bayrell.Lang.LangES6.TranslatorES6.reset.bind(this)(t);
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["expression"]), new Bayrell.Lang.LangNode.TranslatorNodeExpression());
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["program"]), new Bayrell.Lang.LangNode.TranslatorNodeProgram());
		t = Runtime.rtl.setAttr(t, Runtime.Collection.from(["preprocessor_flags"]), t.preprocessor_flags.copy(Runtime.Dict.from({"BACKEND":true,"NODEJS":true,"ES6":false})));
		return t;
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(t, op_code)
	{
		t = this.reset(t);
		return t.program.constructor.translateProgram(t, op_code);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNode";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		a.push("async_await");
		a.push("expression");
		a.push("html");
		a.push("operator");
		a.push("program");
		a.push("use_module_name");
		a.push("enable_async_await");
		a.push("emulate_async_await");
		a.push("enable_introspection");
		a.push("enable_context");
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "async_await") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Expression",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Html",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "operator") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Operator",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "program") return Dict.from({
			"t": "Bayrell.Lang.LangES6.TranslatorES6Program",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "use_module_name") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_async_await") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "emulate_async_await") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_introspection") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enable_context") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"reset",
			"translate",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangNode.TranslatorNode);
window["Bayrell.Lang.LangNode.TranslatorNode"] = Bayrell.Lang.LangNode.TranslatorNode;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangNode.TranslatorNode;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNodeExpression = function()
{
	Bayrell.Lang.LangES6.TranslatorES6Expression.apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype = Object.create(Bayrell.Lang.LangES6.TranslatorES6Expression.prototype);
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNodeExpression;
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangNode.TranslatorNodeExpression)
		{
		}
		Bayrell.Lang.LangES6.TranslatorES6Expression.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Bayrell.Lang.LangES6.TranslatorES6Expression.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Bayrell.Lang.LangES6.TranslatorES6Expression.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression, Bayrell.Lang.LangES6.TranslatorES6Expression);
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression,
{
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(t, op_code)
	{
		if (op_code.value == "@")
		{
			return Runtime.Collection.from([t,"ctx"]);
		}
		if (op_code.value == "_")
		{
			return Runtime.Collection.from([t,"ctx.constructor.translate"]);
		}
		if (op_code.value == "log")
		{
			return Runtime.Collection.from([t,"console.log"]);
		}
		if (t.modules.has(op_code.value) || op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.findModuleName(t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"op_code":op_code,"var_content":this.useModuleName(t, module_name)}));
				t = Runtime.rtl.get(res, 0);
				var var_name = Runtime.rtl.get(res, 1);
				return Runtime.Collection.from([t,var_name]);
			}
		}
		return Runtime.Collection.from([t,op_code.value]);
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(t, op_code)
	{
		var var_name = "";
		if (op_code.entity_name.names.count() > 0)
		{
			var module_name = op_code.entity_name.names.first();
			var new_module_name = this.findModuleName(t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(t, Runtime.Dict.from({"var_content":this.useModuleName(t, module_name)}));
				t = Runtime.rtl.get(res, 0);
				var_name = Runtime.rtl.get(res, 1);
			}
		}
		if (var_name == "")
		{
			var_name = Runtime.rs.join(".", op_code.entity_name.names);
		}
		return Runtime.Collection.from([t,var_name]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeExpression";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Expression";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"OpIdentifier",
			"OpTypeIdentifier",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangNode.TranslatorNodeExpression);
window["Bayrell.Lang.LangNode.TranslatorNodeExpression"] = Bayrell.Lang.LangNode.TranslatorNodeExpression;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangNode.TranslatorNodeExpression;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNodeProgram = function()
{
	Bayrell.Lang.LangES6.TranslatorES6Program.apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNodeProgram.prototype = Object.create(Bayrell.Lang.LangES6.TranslatorES6Program.prototype);
Bayrell.Lang.LangNode.TranslatorNodeProgram.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNodeProgram;
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeProgram.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.LangNode.TranslatorNodeProgram)
		{
		}
		Bayrell.Lang.LangES6.TranslatorES6Program.prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		Bayrell.Lang.LangES6.TranslatorES6Program.prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Bayrell.Lang.LangES6.TranslatorES6Program.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeProgram, Bayrell.Lang.LangES6.TranslatorES6Program);
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeProgram,
{
	/**
	 * Translate program
	 */
	translateProgramHeader: function(t, op_code)
	{
		var content = "\"use strict;\"";
		content += Runtime.rtl.toStr(t.s("var use = require('bay-lang').use;"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(t, op_code)
	{
		var content = "";
		var name = "";
		content += Runtime.rtl.toStr("use.add(" + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(");"));
		/*
		content ~= t.s("if (module.exports == undefined) module.exports = {};");
		Collection<string> arr = rs::split("\\.", t.current_namespace_name);
		for (int i=0; i<arr.count(); i++)
		{
			name = name ~ ((i == 0) ? "" : ".") ~ arr.item(i);
			string s = "if (module.exports." ~ name ~ " == undefined) module.exports." ~ name ~ " = {};";
			content ~= (content == 0) ? s : t.s(s);
		}
		
		content ~= t.s("module.exports." ~
			t.current_class_full_name ~ " = " ~ t.current_class_full_name ~ ";");
		*/
		content += Runtime.rtl.toStr(t.s("module.exports = " + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(";")));
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeProgram";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
			"translateProgramHeader",
			"OpDeclareClassFooter",
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.LangNode.TranslatorNodeProgram);
window["Bayrell.Lang.LangNode.TranslatorNodeProgram"] = Bayrell.Lang.LangNode.TranslatorNodeProgram;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.LangNode.TranslatorNodeProgram;
"use strict;"
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.ModuleDescription = function()
{
};
Object.assign(Bayrell.Lang.ModuleDescription.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof Bayrell.Lang.ModuleDescription)
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
});
Object.assign(Bayrell.Lang.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Bayrell.Lang";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.11.6";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return Runtime.Dict.from({"Runtime":">=0.11 <1.0"});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
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
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.ModuleDescription);
window["Bayrell.Lang.ModuleDescription"] = Bayrell.Lang.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Bayrell.Lang.ModuleDescription;
