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

namespace Bayrell.Lang;

use Runtime.BaseStruct;
use Runtime.FakeStruct;


class Caret extends BaseStruct
{
	
	/**
	 * Caret pos in file
	 */
	int pos = 0;
	
	
	/**
	 * Caret pos X
	 */
	int x = 0;
	
	
	
	/**
	 * Caret pos Y
	 */
	int y = 0;
	
}
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

namespace Bayrell.Lang;

use Runtime.BaseStruct;
use Runtime.FakeStruct;
use Runtime.lib;
use Runtime.rs;
use Runtime.Reference;
use Runtime.Interfaces.ContextInterface;
use Bayrell.Lang.Caret;
use Bayrell.Lang.CoreToken;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.Exceptions.ParserExpected;
use Bayrell.Lang.OpCodes.BaseOpCode;


class CoreParser extends BaseStruct
{
	/* Settings */
	int tab_size = 4;
	
	/* Content */
	string file_name = "";
	Reference content = null;
	/*string content = "";*/
	int content_sz = 0;
	
	/* Work */
	Caret caret = null;
	bool find_ident = true;
	
	
	/**
	 * Returns true if eof
	 */
	bool isEof() => this.caret.pos >= this.content_sz;
	
	
	
	/**
	 * Reset parser
	 */
	pure CoreParser reset(CoreParser parser) =>
		parser.copy({
			"caret": new Caret{},
			"token": null,
		})
	;
	
	
	
	/**
	 * Set content
	 */
	pure CoreParser setContent(CoreParser parser, string content) =>
		parser.copy({
			"content": new Reference(content), "content_sz": rs::strlen(content)
		})
	;
	
	
	
	/**
	 * Parse file and convert to BaseOpCode
	 */
	pure CoreParser parse(CoreParser parser, string content)
	{
		parser = static::reset(parser);
		parser = static::setContent(parser, content);
		while ( parser.caret.pos < parser.content_sz )
		{
			parser = parser::nextToken(parser);
		}
		return parser;
	}
	
}
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

namespace Bayrell.Lang;

use Runtime.BaseStruct;
use Runtime.rs;
use Bayrell.Lang.Caret;
use Bayrell.Lang.Exceptions.ParserEOF;
use Bayrell.Lang.Exceptions.ParserExpected;


struct CoreToken extends BaseStruct
{
	
	/**
	 * Token type
	 */
	string kind = "";
	
	
	
	/**
	 * Token content
	 */
	string content = "";
	
	
	
	/**
	 * Start pos of the token
	 */
	Caret caret_start = null;
	
	
	
	/**
	 * End pos of the token
	 */
	Caret caret_end = null;
	
	
	
	/**
	 * Is eof
	 */
	bool eof = false;
	
}
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

namespace Bayrell.Lang;

use Runtime.lib;
use Runtime.BaseStruct;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpDeclareClass;
use Bayrell.Lang.OpCodes.OpDeclareFunction;


struct CoreTranslator extends BaseStruct
{
	
	/* State */
	string current_namespace_name = "";
	string current_class_name = "";
	string current_class_full_name = "";
	string current_class_extends_name = "";
	OpDeclareClass current_class = null;
	OpDeclareFunction current_function = null;
	Dict<string> modules = null;
	Dict<bool> vars = null;
	Collection<string> save_vars = null;
	Collection<SaveOpCode> save_op_codes = null;
	int save_op_code_inc = 0;
	
	/* Work */
	bool is_static_function = false;
	bool is_operation = false;
	int opcode_level = 0;
	int indent_level = 0;
	string indent = "\t";
	string crlf = "\n";
	
	/* Flags */
	bool flag_struct_check_types = false;
	Dict<bool> preprocessor_flags = null;
	
	
	/**
	 * Find save op code
	 */
	SaveOpCode findSaveOpCode(BaseOpCode op_code) =>
		this.save_op_codes.findItem( lib::equalAttr("op_code", op_code) )
	;
	
	
	/**
	 * Increment indent level
	 */
	CoreTranslator levelInc() => this.copy({ "indent_level": this.indent_level + 1 });
	
	
	/**
	 * Decrease indent level
	 */
	CoreTranslator levelDec() => this.copy({ "indent_level": this.indent_level - 1 });
	
	
	
	/**
	 * Output content with indent
	 */
	string s(string s, var content = null)
	{
		if (s == "") return "";
		if (content === "") return s;
		return this.crlf ~ rs::str_repeat(this.indent, this.indent_level) ~ s;
	}
	
	
	
	/**
	 * Output content with indent
	 */
	string s2(string s)
	{
		return this.crlf ~ rs::str_repeat(this.indent, this.indent_level) ~ s;
	}
	
	
	
	/**
	 * Output content with opcode level
	 */
	string o(string s, int opcode_level_in, int opcode_level_out)
	{
		if (opcode_level_in < opcode_level_out) return "("~s~")";
		return s;
	}
	
	
	
	/**
	 * Translate BaseOpCode
	 */
	pure list<CoreTranslator, string> translate(CoreTranslator t, BaseOpCode op_code)
	{
		return "";
	}
	
	
	
	/**
	 * Inc save op code
	 */
	pure CoreTranslator nextSaveOpCode(CoreTranslator t)
	{
		return "__v" ~ t.save_op_code_inc;
	}
	
	
	
	/**
	 * Inc save op code
	 */
	pure CoreTranslator incSaveOpCode(CoreTranslator t)
	{
		string var_name = static::nextSaveOpCode(t);
		int save_op_code_inc = t.save_op_code_inc + 1;
		t = t.copy({
			"save_op_code_inc": save_op_code_inc,
		});
		return [t, var_name];
	}
	
	
	
	/**
	 * Add save op code
	 */
	pure CoreTranslator addSaveOpCode(CoreTranslator t, Dict data)
	{
		string var_name = data.get("var_name", "");
		string content = data.get("content", "");
		string var_content = data.get("var_content", "");
		int save_op_code_inc = t.save_op_code_inc;
		
		if (var_name == "" and content == "")
		{
			var_name = static::nextSaveOpCode(t);
			data = data.setIm("var_name", var_name);
			save_op_code_inc += 1;
		}
		
		SaveOpCode s = new SaveOpCode(data);
		t = t.copy({
			"save_op_codes": t.save_op_codes.pushIm(s),
			"save_op_code_inc": save_op_code_inc,
		});
		return [t, var_name];
	}
	
	
	
	/**
	 * Clear save op code
	 */
	pure CoreTranslator clearSaveOpCode(CoreTranslator t)
	{
		t <= save_op_codes <= new Collection<SaveOpCode>();
		t <= save_op_code_inc <= 0;
		return t;
	}
	
	
	
	/**
	 * Output save op code content
	 */
	pure string outputSaveOpCode(CoreTranslator t, int save_op_code_value = 0)
	{
		return "";
	}
	
	
	
	/**
	 * Call f and return result with save op codes
	 */
	pure string saveOpCodeCall(CoreTranslator t, fn f, Collection args)
	{
		/* Clear save op codes */
		Collection<SaveOpCode> save_op_codes = t.save_op_codes;
		int save_op_code_inc = t.save_op_code_inc;
		
		list res = rtl::apply(f, args.unshiftIm(t)); t = res[0];
		string value = res[1];
		
		/* Output save op code */
		string save = t::outputSaveOpCode(t, save_op_codes.count());
		
		/* Restore save op codes */
		t <= save_op_codes <= save_op_codes;
		t <= save_op_code_inc <= save_op_code_inc;
		
		return [t, save, value];
	}
	
}
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

namespace Bayrell.Lang;

use Runtime.RuntimeConstant;


static class LangConstant
{
	static const int ERROR_PARSER = -1000;
	static const int ERROR_PARSER_EOF = -1001;
	static const int ERROR_PARSER_EXPECTED = -1002;	
}

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

namespace Bayrell.Lang;

use Runtime.CoreParser;
use Runtime.Interfaces.ContextInterface;
use Bayrell.Lang.LangES6.TranslatorES6;
use Bayrell.Lang.LangNode.TranslatorNode;
use Bayrell.Lang.LangPHP.TranslatorPHP;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.CoreTranslator;


static class LangUtils
{
	
	/**
	 * Parse file and convert to BaseOpCode
	 */
	static BaseOpCode parse(CoreParser parser, string text)
	{
		list res = parser :: parse(parser, text);
		return res[1];
	}
	
	
	
	/**
	 * Translate BaseOpCode to string
	 */
	static string translate(CoreParser translator, BaseOpCode op_code)
	{
		list res = translator :: translate(translator, op_code);
		return res[1];
	}
	
	
	
	/**
	 * Create translator
	 */
	static CoreTranslator createTranslator(string lang = "")
	{
		CoreTranslator t = null;
		
		if (lang == "php")
		{
			t = new TranslatorPHP();
		}
		if (lang == "es6")
		{
			t = new TranslatorES6();
		}
		if (lang == "nodejs")
		{
			t = new TranslatorNode();
		}
		
		return t;
	}
}
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

namespace Bayrell.Lang;

use Runtime.BaseStruct;
use Bayrell.Lang.OpCodes.BaseOpCode;


struct SaveOpCode extends BaseStruct
{
	string var_name = "";
	string var_content = "";
	string content = "";
	BaseOpCode op_code = null;
}
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

namespace Bayrell.Lang.Exceptions;

use Runtime.Context;
use Runtime.RuntimeUtils;
use Runtime.Exceptions.RuntimeException;
use Bayrell.Lang.LangConstant;


class ParserUnknownError extends RuntimeException
{
	
	void constructor(string s, int code, Context context, Object prev = null)
	{
		if (code == -1)
		{
			code = LangConstant::ERROR_PARSER;
		}
		parent(s, code, context, prev);
		
	}
	
}
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

namespace Bayrell.Lang.Exceptions;

use Runtime.Context;
use Runtime.RuntimeUtils;
use Bayrell.Lang.Caret;
use Bayrell.Lang.Exceptions.ParserUnknownError;


class ParserError extends ParserUnknownError
{
	
	void constructor
	(
		string s, Caret caret, string file="", 
		int code, Context context, Object prev = null
	){
		parent(s, code, context, prev);
		this.error_line = caret.y + 1;
		this.error_pos = caret.x + 1;
		this.error_file = file;
	}
	
	
	public string buildMessage()
	{
		string error_str = this.error_str;
		string file = this.getFileName();
		string line = this.getErrorLine();
		string pos = this.getErrorPos();
		
		if (line != -1)
		{
			error_str ~= " at Ln:" ~ line ~ ( (pos != "") ? ", Pos:" ~ pos : "" );
		}
		if (file != "")
		{
			error_str ~= " in file:'" ~ file ~ "'";
		}
		
		return error_str;
	}
	
}
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

namespace Bayrell.Lang.Exceptions;

use Runtime.Context;
use Runtime.RuntimeUtils;
use Bayrell.Lang.Exceptions.ParserUnknownError;
use Bayrell.Lang.LangConstant;


class ParserEOF extends ParserUnknownError
{
	
	void constructor(Context context, Object prev = null)
	{
		parent(
			"ERROR_PARSER_EOF",
			LangConstant::ERROR_PARSER_EOF,
			context,
			prev
		);
	}
	
}
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

namespace Bayrell.Lang.Exceptions;

use Runtime.Context;
use Runtime.RuntimeUtils;
use Bayrell.Lang.Caret;
use Bayrell.Lang.LangConstant;
use Bayrell.Lang.Exceptions.ParserError;


class ParserExpected extends ParserError
{
	
	void constructor
	(
		string s, Caret caret, string file = "", 
		Context context, Object prev = null
	){
		parent(
			s ~ " expected",
			caret, file,
			LangConstant::ERROR_PARSER_EXPECTED,
			context,
			prev
		);
	}
	
}
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

namespace Bayrell.Lang.Exceptions;

use Runtime.Exceptions.RuntimeException;


class DeclaredClass extends RuntimeException
{
	
	void constructor(Object prev = null)
	{
		parent("Declared class", -1, prev);
	}
	
}
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

namespace Bayrell.Lang.LangBay;

use Runtime.BaseStruct;
use Bayrell.Lang.Caret;
use Bayrell.Lang.CoreParser;
use Bayrell.Lang.CoreToken;
use Bayrell.Lang.LangBay.ParserBayBase;
use Bayrell.Lang.LangBay.ParserBayExpression;
use Bayrell.Lang.LangBay.ParserBayHtml;
use Bayrell.Lang.LangBay.ParserBayOperator;
use Bayrell.Lang.LangBay.ParserBayPreprocessor;
use Bayrell.Lang.LangBay.ParserBayProgram;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpDeclareClass;
use Bayrell.Lang.OpCodes.OpNamespace;
use Bayrell.Lang.OpCodes.OpFlags;


class ParserBay extends CoreParser
{
	/* Work */
	Dict<bool> vars = null;
	Dict<string> uses = null;
	OpNamespace current_namespace = null;
	OpDeclareClass current_class = null;
	string current_namespace_name = "";
	string current_class_name = "";
	string current_class_kind = "";
	bool current_class_abstract = false;
	bool current_class_declare = false;
	bool find_identifier = true;
	bool skip_comments = true;
	string pipe_kind = "";
	bool is_pipe = false;
	bool is_html = false;
	bool is_local_css = false;
	
	
	/* Parsers */
	ParserBayBase parser_base = null;
	ParserBayExpression parser_expression = null;
	ParserBayHtml parser_html = null;
	ParserBayOperator parser_operator = null;
	ParserBayPreprocessor parser_preprocessor = null;
	ParserBayProgram parser_program = null;
	
	
	/**
	 * Reset parser
	 */
	pure ParserBay reset(ParserBay parser) =>
		parser.copy({
			"vars": new Dict<string>(),
			"uses": new Dict<string>(),
			"caret": new Caret{},
			"token": null,
			"parser_base": new ParserBayBase(),
			"parser_expression": new ParserBayExpression(),
			"parser_html": new ParserBayHtml(),
			"parser_operator": new ParserBayOperator(),
			"parser_preprocessor": new ParserBayPreprocessor(),
			"parser_program": new ParserBayProgram(),
		})
	;
	
	
	
	/**
	 * Parse file and convert to BaseOpCode
	 */
	pure list<ParserBay, BaseOpCode> parse(ParserBay parser, string content)
	{
		parser = static::reset(parser);
		parser = static::setContent(parser, content);
		return parser.parser_program::readProgram(parser);
	}
	
	
	
	/**
	 * Find module name
	 */
	pure string findModuleName(ParserBay parser, string module_name)
	{
		if (module_name == "Collection") return "Runtime.Collection";
		else if (module_name == "Dict") return "Runtime.Dict";
		else if (module_name == "Map") return "Runtime.Map";
		else if (module_name == "Vector") return "Runtime.Vector";
		else if (module_name == "rs") return "Runtime.rs";
		else if (module_name == "rtl") return "Runtime.rtl";
		else if (module_name == "ArrayInterface") return "";
		else if (parser.uses.has(module_name)) return parser.uses.item(module_name);
		return module_name;
	}
}
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

namespace Bayrell.Lang.LangBay;

use Runtime.Reference;
use Bayrell.Lang.Caret;
use Bayrell.Lang.CoreToken;
use Bayrell.Lang.Exceptions.ParserEOF;
use Bayrell.Lang.Exceptions.ParserError;
use Bayrell.Lang.Exceptions.ParserExpected;
use Bayrell.Lang.LangBay.ParserBay;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAttr;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpClassOf;
use Bayrell.Lang.OpCodes.OpClassRef;
use Bayrell.Lang.OpCodes.OpCollection;
use Bayrell.Lang.OpCodes.OpCurry;
use Bayrell.Lang.OpCodes.OpCurryArg;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
use Bayrell.Lang.OpCodes.OpDict;
use Bayrell.Lang.OpCodes.OpDictPair;
use Bayrell.Lang.OpCodes.OpEntityName;
use Bayrell.Lang.OpCodes.OpIdentifier;
use Bayrell.Lang.OpCodes.OpMethod;
use Bayrell.Lang.OpCodes.OpNew;
use Bayrell.Lang.OpCodes.OpNumber;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpString;
use Bayrell.Lang.OpCodes.OpTypeConvert;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


class ParserBayBase
{
	
	/**
	 * Return true if is char
	 * @param char ch
	 * @return boolean
	 */
	pure memorize bool isChar (char ch) =>
		rs::strpos('qazwsxedcrfvtgbyhnujmikolp', rs::strtolower(ch)) !== -1
	;	
	
	
	
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	pure memorize bool isNumber (char ch) =>
		rs::strpos('0123456789', ch) !== -1
	;
	
	
	
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	pure memorize bool isHexChar (char ch) =>
		rs::strpos('0123456789abcdef', rs::strtolower(ch)) !== -1;
	
	
	
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	pure memorize bool isStringOfNumbers (string s)
	{
		int sz = rs::strlen(s);
		for (int i=0; i<sz; i++)
		{
			if (not static::isNumber( rs::charAt(s, i) )) return false;
		}
		return true;
	}
	
	
	
	/**
	 * Is system type
	 */
	pure memorize bool isSystemType (string name)
	{
		if (name == "var") return true;
		if (name == "void") return true;
		if (name == "bool") return true;
		if (name == "byte") return true;
		if (name == "int") return true;
		if (name == "double") return true;
		if (name == "float") return true;
		if (name == "char") return true;
		if (name == "string") return true;
		if (name == "list") return true;
		if (name == "scalar") return true;
		if (name == "primitive") return true;
		if (name == "html") return true;
		if (name == "Error") return true;
		if (name == "Object") return true;
		if (name == "DateTime") return true;
		if (name == "Collection") return true;
		if (name == "Dict") return true;
		if (name == "Vector") return true;
		if (name == "Map") return true;
		if (name == "rs") return true;
		if (name == "rtl") return true;
		if (name == "ArrayInterface") return true;
		return false;
	}
	
	
	
	/**
	 * Returns true if name is identifier
	 */
	pure memorize bool isIdentifier(string name)
	{
		if (name == "") return false;
		if (name == "@") return true;
		if (static::isNumber( rs::charAt(name, 0) )) return false;
		int sz = rs::strlen(name);
		for (int i=0; i<sz; i++)
		{
			string ch = rs::charAt(name, i);
			if (static::isChar(ch) or static::isNumber(ch) or ch == "_") continue;
			return false;
		}
		return true;
	}
	
	
	
	/**
	 * Returns true if reserved words
	 */
	pure memorize bool isReserved(string name)
	{
		if (name == "__async_t") return true;
		if (name == "__async_var") return true;
		/*if (name == "__ctx") return true;*/
		/*if (name == "ctx") return true;*/
		if (rs::substr(name, 0, 3) == "__v") return true;
		return false;
	}
	
	
	
	/**
	 * Returns kind of identifier or thrown Error
	 */
	pure string findIdentifier(ParserBay parser, string name, Caret caret)
	{
		string kind = "";
		if (parser.vars.has(name))
		{
			kind = OpIdentifier::KIND_VARIABLE;
		}
		else if (parser.uses.has(name))
		{
			kind = OpIdentifier::KIND_CLASS;
		}
		else if (static::isSystemType(name))
		{
			kind = OpIdentifier::KIND_SYS_TYPE;
		}
		else if (name == "log")
		{
			kind = OpIdentifier::KIND_SYS_FUNCTION;
		}
		else if (name == "window" or name == "document")
		{
			kind = OpIdentifier::KIND_VARIABLE;
		}
		else if (name == "null" or name == "true" or name == "false")
		{
			kind = OpIdentifier::KIND_CONSTANT;
		}
		else if (name == "fn")
		{
			kind = OpIdentifier::KIND_FUNCTION;
		}
		else if (name == "@" or name == "_")
		{
			kind = OpIdentifier::KIND_CONTEXT;
		}
		else if (name == "static" or name == "self" or name == "this" or name == "parent")
		{
			kind = OpIdentifier::KIND_CLASSREF;
		}
		return kind;
	}
	
	
	
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	pure memorize bool isTokenChar(char ch)
	{
		return rs::strpos('qazwsxedcrfvtgbyhnujmikolp0123456789_', rs::strtolower(ch)) !== -1;
	}
	
	
	
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	pure memorize bool isSkipChar (char ch)
	{
		if (rs::ord(ch) <= 32) return true;
		return false;
	}
	
	
	
	/**
	 * Returns next X
	 */
	pure int nextX(ParserBay parser, char ch, int x, int direction = 1)
	{
		if (ch == "\t") return x + parser.tab_size * direction;
		if (ch == "\n") return 0;
		return x + direction;
	}
	
	
	
	/**
	 * Returns next Y
	 */
	pure int nextY(ParserBay parser, char ch, int y, int direction = 1)
	{
		if (ch == "\n") return y + direction;
		return y;
	}
	
	
	/**
	 * Returns next
	 */
	pure list<int, int, int> next(ParserBay parser, string s, int x, int y, int pos)
	{
		int sz = rs::strlen(s);
		for (int i=0; i<sz; i++)
		{
			string ch = rs::substr(s, i, 1);
			x = static::nextX(parser, ch, x);
			y = static::nextY(parser, ch, y);
			pos = pos + 1;
		}
		return [x, y, pos];
	}
	
	
	
	/**
	 * Open comment
	 */
	pure bool isCommentOpen(ParserBay parser, string str) =>
		parser.skip_comments and
			( parser.is_html ? str == "<!--" : str == "/*" )
		;
	
	
	
	/**
	 * Close comment
	 */
	pure bool isCommentClose(ParserBay parser, string str) =>
		parser.is_html ? str == "-->" : str == "*/"
	;
	
	
	
	/**
	 * Skip char
	 */
	pure Caret skipChar(ParserBay parser, Reference<string> content, Caret start_pos)
	{
		int x = start_pos.x;
		int y = start_pos.y;
		int pos = start_pos.pos;
		bool skip_comments = parser.skip_comments;
		
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new ParserEOF();
		}
		
		string ch = rs::charAt(content.ref, pos);
		string ch2 = rs::substr(content.ref, pos, 2);
		string ch4 = rs::substr(content.ref, pos, 4);
		while
		(
			(
				static::isSkipChar(ch) or
				static::isCommentOpen(parser, ch2) or
				static::isCommentOpen(parser, ch4)
			) and pos < parser.content_sz
		)
		{
			if (static::isCommentOpen(parser, ch2))
			{
				ch2 = rs::substr(content.ref, pos, 2);
				while (not static::isCommentClose(parser, ch2) and pos < parser.content_sz)
				{
					x = static::nextX(parser, ch, x);
					y = static::nextY(parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					ch = rs::charAt(content.ref, pos);
					ch2 = rs::substr(content.ref, pos, 2);
				}
				if (static::isCommentClose(parser, ch2))
				{
					x = x + 2;
					pos = pos + 2;
				}
			}
			
			else if (static::isCommentOpen(parser, ch4))
			{
				string ch3 = rs::substr(content.ref, pos, 3);
				while (not static::isCommentClose(parser, ch3) and pos < parser.content_sz)
				{
					x = static::nextX(parser, ch, x);
					y = static::nextY(parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					ch = rs::charAt(content.ref, pos);
					ch3 = rs::substr(content.ref, pos, 3);
				}
				if (static::isCommentClose(parser, ch3))
				{
					x = x + 3;
					pos = pos + 3;
				}
			}
			
			else
			{
				x = static::nextX(parser, ch, x);
				y = static::nextY(parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= parser.content_sz)
			{
				break;
			}
			ch = rs::charAt(content.ref, pos);
			ch2 = rs::substr(content.ref, pos, 2);
			ch4 = rs::substr(content.ref, pos, 4);
		}
		return new Caret{ "pos": pos, "x": x, "y": y };
	}
	
	
	
	/**
	 * Read special token
	 */
	pure string readSpecialToken(ParserBay parser, Reference<string> content, Caret start_pos)
	{
		int pos = start_pos.pos;
		string s = "";
		
		s = rs::substr(content.ref, pos, 10);
		if (s == "#endswitch") return s;
		
		s = rs::substr(content.ref, pos, 7);
		if (s == "#ifcode" or s == "#switch" or s == "#elseif" or s == "%render") return s;
		
		s = rs::substr(content.ref, pos, 6);
		if (s == "#endif" or s == "#ifdef" or s == "%while") return s;
		
		s = rs::substr(content.ref, pos, 5);
		if (s == "#case" or s == "%else") return s;
		
		s = rs::substr(content.ref, pos, 4);
		if (s == "@css" or s == "%for" or s == "%var" or s == "%set") return s;
		
		s = rs::substr(content.ref, pos, 3);
		if (
			s == "!--" or
			s == "!==" or
			s == "===" or
			s == "..." or
			s == "#if" or
			s == "%if"
		)
			return s;
		
		s = rs::substr(content.ref, pos, 2);
		if (
			s == "==" or
			s == "!=" or
			s == "<=" or
			s == ">=" or
			s == "=>" or
			s == "->" or
			s == "|>" or
			s == "::" or
			s == "+=" or
			s == "-=" or
			s == "~=" or
			s == "**" or
			s == "<<" or
			s == ">>" or
			s == "++" or
			s == "--"
		)
			return s;
			
		return "";
		
	}
	
	
	
	/**
	 * Read next token and return caret end
	 */
	pure Caret nextToken(ParserBay parser, Reference<string> content, Caret start_pos)
	{
		bool is_first = true;
		int x = start_pos.x;
		int y = start_pos.y;
		int pos = start_pos.pos;
		
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new ParserEOF();
		}
		
		string s = static::readSpecialToken(parser, content, start_pos);
		if (s != "")
		{
			int sz = rs::strlen(s);
			for (int i=0; i<sz; i++)
			{
				char ch = rs::charAt(s, i);
				x = static::nextX(parser, ch, x);
				y = static::nextY(parser, ch, y);
				pos = pos + 1;
			}
			return new Caret{ "pos": pos, "x": x, "y": y };
		}
		
		char ch = rs::charAt(content.ref, pos);
		if ( not static::isTokenChar(ch) )
		{
			x = static::nextX(parser, ch, x);
			y = static::nextY(parser, ch, y);
			pos = pos + 1;
		}
		else
		{
			while (static::isTokenChar(ch))
			{
				x = static::nextX(parser, ch, x);
				y = static::nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = rs::charAt(content.ref, pos);
			}
		}
		return new Caret{ "pos": pos, "x": x, "y": y };
	}
	
	
	
	/**
	 * Read back
	 */
	pure ParserBay readBack(ParserBay parser, string search = "")
	{
		Reference<string> content = parser.content;
		Caret caret = parser.caret;
		int x = caret.x;
		int y = caret.y;
		int pos = caret.pos;
		int search_sz = rs::strlen(search);
		string s = "";
		
		while (pos >= 0)
		{
			char ch = rs::charAt(content.ref, pos);
			x = static::nextX(parser, ch, x, -1);
			y = static::nextY(parser, ch, y, -1);
			pos--;
			
			s = rs::substr(content.ref, pos, search_sz);
			if (s == search)
			{
				break;
			}
		}
		
		return parser.copy{ "caret": new Caret{ "pos": pos, "x": x, "y": y } };
	}
	
	
	
	/**
	 * Read next token
	 */
	pure list<ParserBay, CoreToken> readToken(ParserBay parser)
	{
		Caret caret_start = null;
		Caret caret_end = null;
		bool eof = false;
		
		try
		{
			caret_start = static::skipChar(parser, parser.content, parser.caret);
			caret_end = static::nextToken(parser, parser.content, caret_start);
		}
		catch (ParserEOF e)
		{
			if (caret_start == null) caret_start = parser.caret;
			if (caret_end == null) caret_end = caret_start;
			eof = true;
		}
		catch (var e)
		{
			throw e;
		}
		
		return 
		[
			parser.copy({ "caret": caret_end }),
			new CoreToken
			{
				"content": rs::substr(parser.content.ref, caret_start.pos, caret_end.pos - caret_start.pos),
				"caret_start": caret_start,
				"caret_end": caret_end,
				"eof": eof,
			}
		];
	}
	
	
	
	/**
	 * Look next token
	 */
	pure list<ParserBay, bool> lookToken(ParserBay parser, string token)
	{
		string token_content = "";
		Reference<string> content = parser.content;
		Caret caret_start = null;
		Caret caret_end = null;
		int sz = rs::strlen(token);
		bool eof = false;
		bool find = false;
		
		try
		{
			caret_start = static::skipChar(parser, content, parser.caret);
			int pos = caret_start.pos;
			int x = caret_start.x;
			int y = caret_start.y;
			token_content = rs::substr(content.ref, pos, sz);
			if (token_content == token) find = true;
			list res = static::next(parser, token_content, x, y, pos);
			x = res[0]; y = res[1]; pos = res[2];
			caret_end = new Caret{ "pos": pos, "x": x, "y": y }
		}
		catch (ParserEOF e)
		{
			if (caret_start == null) caret_start = parser.caret;
			if (caret_end == null) caret_end = caret_start;
			eof = true;
		}
		catch (var e)
		{
			throw e;
		}
		
		return 
		[
			parser.copy({ "caret": caret_end }),
			new CoreToken
			{
				"content": token_content,
				"caret_start": caret_start,
				"caret_end": caret_end,
				"eof": eof,
			},
			find
		];
	}
	
	
	
	/**
	 * Match next token
	 */
	pure list<ParserBay, CoreToken> matchToken(ParserBay parser, string next_token)
	{
		CoreToken token = null;
		
		/* Look token */
		list res = static::lookToken(parser, next_token); parser = res[0]; token = res[1]; bool find = res[2];
		if (not find)
		{
			throw new ParserExpected(next_token, token.caret_start, parser.file_name);
		}
		
		return [parser, token];
	}
	
	
	
	/**
	 * Match next string
	 */
	pure list<ParserBay, CoreToken> matchString(ParserBay parser, string str1)
	{
		Caret caret = parser.caret;
		int sz = rs::strlen(str1);
		string str2 = rs::substr(parser.content.ref, caret.pos, sz);
		
		if (str1 != str2)
		{
			throw new ParserExpected(str1, caret, parser.file_name);
		}
		
		list res = static::next(parser, str1, caret.x, caret.y, caret.pos);
		caret = new Caret{ "x": res[0], "y": res[1], "pos": res[2] };
		
		parser <= caret <= caret;
		
		return [parser, null];
	}
	
	
	
	/**
	 * Read number
	 */
	pure list<ParserBay, OpNumber> readNumber(ParserBay parser)
	{
		CoreToken token = null;
		ParserBay start = parser;
		
		/* Read token */
		list res = static::readToken(parser); parser = res[0]; token = res[1];
		
		Caret caret_start = token.caret_start;
		if (token.content == "")
		{
			throw new ParserExpected("Number", caret_start, parser.file_name);
		}
		if (not static::isStringOfNumbers(token.content))
		{
			throw new ParserExpected("Number", caret_start, parser.file_name);
		}
		
		return 
		[
			parser,
			new OpNumber
			{
				"value": token.content,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read string
	 */
	pure list<ParserBay, OpString> readUntilStringArr
	(
		ParserBay parser, Collection arr, bool flag_include = true
	)
	{
		CoreToken token = null;
		ParserBay look = null;
		Reference<string> content = parser.content;
		int content_sz = parser.content_sz;
		int pos = parser.caret.pos;
		int x = parser.caret.x;
		int y = parser.caret.y;
		
		/* Search next string in arr */
		fn<int, int> search = int (int pos) use (content, arr)
		{
			for (int i=0; i<arr.count(); i++)
			{
				string item = arr.item(i);
				int sz = rs::strlen(item);
				string str = rs::substr(content.ref, pos, sz);
				if (str == item)
				{
					return i;
				}
			}
			return -1;
		};
		
		/* Start and end positionss */
		int start_pos = pos;
		int end_pos = pos;
		
		/* Read string value */
		string ch = "";
		int arr_pos = search(pos);
		while ( pos < content_sz and arr_pos == -1 )
		{
			ch = rs::charAt(content.ref, pos);
			x = static::nextX(parser, ch, x);
			y = static::nextY(parser, ch, y);
			pos = pos + 1;
			
			if (pos >= content_sz)
			{
				throw new ParserExpected
				(
					rs::join(",", arr),
					new Caret{ "x": x, "y": y, "pos": pos },
					parser.file_name
				);
			}
			
			arr_pos = search(pos);
		}
		
		if (arr_pos == -1)
		{
			throw new ParserExpected
			(
				"End of string",
				new Caret{ "x": x, "y": y, "pos": pos },
				parser.file_name
			);
		}
		
		if (not flag_include) end_pos = pos;
		else
		{
			string item = arr.item(arr_pos);
			int sz = rs::strlen(item);
			for (int i=0; i<sz; i++)
			{
				ch = rs::charAt(content.ref, pos);
				x = static::nextX(parser, ch, x);
				y = static::nextY(parser, ch, y);
				pos = pos + 1;
			}
			end_pos = pos;
		}
		
		/* Return result */
		Caret caret_end = new Caret{ "x": x, "y": y, "pos": end_pos };
		return 
		[
			parser.copy({ "caret": caret_end }),
			rs::substr(content.ref, start_pos, end_pos - start_pos),
		];
	}
	
	
	
	/**
	 * Read string
	 */
	pure list<ParserBay, OpString> readString(ParserBay parser)
	{
		CoreToken token = null;
		ParserBay look = null;
		
		/* Read token */
		list res = static::readToken(parser); look = res[0]; token = res[1];
		
		Caret caret_start = token.caret_start;
		string str_char = token.content;
		
		/* Read begin string char */
		if (str_char != "'" and str_char != '"')
		{
			throw new ParserExpected("String", caret_start, parser.file_name);
		}
		string content = look.content;
		int content_sz = look.content_sz;
		int pos = look.caret.pos;
		int x = look.caret.x;
		int y = look.caret.y;
		
		/* Read string value */
		string value_str = "";
		string ch = rs::charAt(content.ref, pos);
		while ( pos < content_sz and ch != str_char )
		{
			if (ch == "\\")
			{
				x = static::nextX(parser, ch, x);
				y = static::nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= content_sz)
				{
					throw new ParserExpected
					(
						"End of string",
						new Caret{ "x": x, "y": y, "pos": pos },
						parser.file_name
					);
				}
				
				string ch2 = rs::charAt(content.ref, pos);
				if (ch2 == "n") value_str ~= "\n";
				else if (ch2 == "r") value_str ~= "\r";
				else if (ch2 == "t") value_str ~= "\t";
				else if (ch2 == "s") value_str ~= " ";
				else if (ch2 == "\\") value_str ~= "\\";
				else if (ch2 == "'") value_str ~= "'";
				else if (ch2 == '"') value_str ~= '"';
				else value_str ~= ch ~ ch2;
				x = static::nextX(parser, ch2, x);
				y = static::nextY(parser, ch2, y);
				pos = pos + 1;
			}
			else
			{
				value_str ~= ch;
				x = static::nextX(parser, ch, x);
				y = static::nextY(parser, ch, y);
				pos = pos + 1;
			}
			
			if (pos >= content_sz)
			{
				throw new ParserExpected
				(
					"End of string",
					new Caret{ "x": x, "y": y, "pos": pos },
					parser.file_name
				);
			}
			ch = rs::charAt(content.ref, pos);
		}
		
		/* Read end string char */
		if (ch != "'" and ch != '"')
		{
			throw new ParserExpected
			(
				"End of string",
				new Caret{ "x": x, "y": y, "pos": pos },
				parser.file_name
			);
		}
		x = static::nextX(parser, ch, x);
		y = static::nextY(parser, ch, y);
		pos = pos + 1;
		
		/* Return result */
		Caret caret_end = new Caret{ "x": x, "y": y, "pos": pos };
		return 
		[
			parser.copy({ "caret": caret_end }),
			new OpString
			{
				"value": value_str,
				"caret_start": caret_start,
				"caret_end": caret_end,
			}
		];
	}
	
	
	
	/**
	 * Read comment
	 */
	pure list<ParserBay, OpComment> readComment(ParserBay parser)
	{
		ParserBay start = parser;
		CoreToken token = null;
		ParserBay look = null;
		
		parser <= skip_comments <= false;
		list res = ParserBayBase::readToken(parser); look = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		parser <= skip_comments <= true;
		
		if (token.content == "/") /* */
		{
			parser = look;
			string content = look.content;
			int content_sz = look.content_sz;
			int pos = look.caret.pos;
			int x = look.caret.x;
			int y = look.caret.y;
			int pos_start = pos;
			
			string ch = rs::charAt(content.ref, pos);
			string ch2 = rs::substr(content.ref, pos, 2);
			while (not static::isCommentClose(parser, ch2) and pos < content_sz)
			{
				x = static::nextX(parser, ch, x);
				y = static::nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = rs::charAt(content.ref, pos);
				ch2 = rs::substr(content.ref, pos, 2);
			}
			
			int pos_end = pos;
			if (static::isCommentClose(parser, ch2))
			{
				x = x + 2;
				pos = pos + 2;
			}
			else
			{
				throw new ParserExpected
				(
					"End of comment",
					new Caret{ "x": x, "y": y, "pos": pos },
					start.file_name
				);
			}
			
			/* Return result */
			string value_str = rs::substr(content.ref, pos_start + 1, pos_end - pos_start - 1);
			Caret caret_end = new Caret{ "x": x, "y": y, "pos": pos };
			
			return
			[
				start.copy({ "caret": caret_end }),
				new OpComment
				{
					"value": value_str,
					"caret_start": caret_start,
					"caret_end": caret_end,
				}
			];
		}
		
		return [parser, null];
	}
	
	
	
	/**
	 * Read identifier
	 */
	pure list<ParserBay, OpIdentifier> readIdentifier(ParserBay parser, bool find_ident = false)
	{
		ParserBay start = parser;
		CoreToken token = null;
		ParserBay look = null;
		string name = "";
		
		list res = ParserBayBase::readToken(parser); parser = res[0]; token = res[1];
		if (token.content == "")
		{
			throw new ParserExpected("Identifier", token.caret_start, parser.file_name);
		}
		if (not static::isIdentifier(token.content))
		{
			throw new ParserExpected("Identifier", token.caret_start, parser.file_name);
		}
		if (static::isReserved(token.content))
		{
			throw new ParserExpected
			(
				"Identifier " ~ token.content ~ " is reserverd",
				token.caret_start, parser.file_name
			);
		}
		
		name = token.content;
		bool kind = static::findIdentifier(parser, name, token.caret_start);
		
		if (parser.find_ident and find_ident and kind == "")
		{
			throw new ParserError(
				"Unknown identifier '" ~ name ~ "'",
				token.caret_start, parser.file_name
			);
		}
		
		return 
		[
			parser,
			new OpIdentifier
			{
				"kind": kind,
				"value": name,
				"caret_start": token.caret_start,
				"caret_end": token.caret_end,
			}
		];
	}
	
	
	
	/**
	 * Read entity name
	 */
	pure list<ParserBay, OpEntityName> readEntityName(ParserBay parser, bool find_ident = true)
	{
		ParserBay look = null;
		CoreToken token = null;
		OpIdentifier ident = null;
		Vector<string> names = new Vector();
		
		list res = parser.parser_base::readIdentifier(parser, find_ident);
		parser = res[0]; ident = res[1];
		Caret caret_start = ident.caret_start;
		
		string name = ident.value;
		names.pushValue(name);
		
		list res = parser.parser_base::readToken(parser);
		look = res[0]; token = res[1];
		
		while (not token.eof and token.content == ".")
		{
			list res = parser.parser_base::matchToken(parser, "."); parser = res[0];
			list res = parser.parser_base::readIdentifier(parser); 
			parser = res[0]; ident = res[1];
			
			name = ident.value;
			names.pushValue(name);
			
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return 
		[
			parser,
			new OpEntityName
			{
				"caret_start": caret_start,
				"caret_end": parser.caret,
				"names": names.toCollection(),
			}
		];
	}
	
	
	
	/**
	 * Read type identifier
	 */
	pure list<ParserBay, BaseOpCode> readTypeIdentifier(ParserBay parser, bool find_ident = true)
	{
		ParserBay start = parser;
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode entity_name = null;
		Vector<OpTypeIdentifier> template = null;
		
		list res = static::readEntityName(parser, find_ident);
		parser = res[0]; entity_name = res[1];
		Caret caret_start = entity_name.caret_start;
		
		bool flag_open_caret = false;
		bool flag_end_caret = false;
		list res = static::lookToken(parser, "<");
		look = res[0]; token = res[1]; flag_open_caret = res[2];
		if (flag_open_caret)
		{
			template = new Vector<OpTypeIdentifier>();
			list res = static::matchToken(parser, "<"); parser = res[0];
			list res = static::lookToken(parser, ">");
			look = res[0]; token = res[1]; flag_end_caret = res[2];
			
			while (not token.eof and not flag_end_caret)
			{
				BaseOpCode parser_value = null;
				list res = static::readTypeIdentifier(parser);
				parser = res[0]; parser_value = res[1];
				
				template.pushValue(parser_value);
				
				list res = static::lookToken(parser, ">");
				look = res[0]; token = res[1]; flag_end_caret = res[2];
				if (not flag_end_caret)
				{
					list res = static::matchToken(parser, ","); parser = res[0];
					list res = static::lookToken(parser, ">");
					look = res[0]; token = res[1]; flag_end_caret = res[2];
				}
			}
			list res = static::matchToken(parser, ">"); parser = res[0];
		}
		
		return
		[
			parser,
			new OpTypeIdentifier
			{
				"entity_name": entity_name,
				"template": template ? template.toCollection() : null,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read collection
	 */
	pure list<ParserBay, BaseOpCode> readCollection(ParserBay parser)
	{
		ParserBay start = parser;
		ParserBay look = null;
		CoreToken token = null;
		Vector<BaseOpCode> values = new Vector();
		BaseOpCode ifdef_condition = null;
		bool flag_ifdef = false;
		
		list res = static::matchToken(parser, "["); parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = static::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and token.content != "]")
		{
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "#ifdef")
			{
				parser = look;
				parser <= find_ident <= false;
				list res = parser.parser_expression::readExpression(parser);
				parser = res[0]; ifdef_condition = res[1];
				parser <= find_ident <= true;
				list res = parser.parser_base::matchToken(parser, "then");
				parser = res[0]; token = res[1];
				flag_ifdef = true;
			}
			
			BaseOpCode parser_value = null;
			list res = parser.parser_expression::readExpression(parser); parser = res[0]; parser_value = res[1];
			
			list res = static::readToken(parser); look = res[0]; token = res[1];
			if (token.content == ",")
			{
				parser = look;
				list res = static::readToken(parser); look = res[0]; token = res[1];
			}
			
			if (flag_ifdef)
			{
				parser_value = new OpPreprocessorIfDef
				{
					"items": parser_value,
					"condition": ifdef_condition,
				}
			}
			values.pushValue(parser_value);
			
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "#endif")
			{
				parser = look;
				flag_ifdef = false;
				ifdef_condition = null;
			}
			
			list res = static::readToken(parser); look = res[0]; token = res[1];
		}
		
		list res = static::matchToken(parser, "]"); parser = res[0]; token = res[1];
		return 
		[
			parser,
			new OpCollection
			{
				"values": values.toCollection(),
				"caret_start": caret_start,
				"caret_end": token.caret_end,
			}
		];
	}
	
	
	
	/**
	 * Read collection
	 */
	pure list<ParserBay, BaseOpCode> readDict(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		Vector<BaseOpCode> values = new Vector();
		BaseOpCode ifdef_condition = null;
		bool flag_ifdef = false;
		
		list res = static::matchToken(parser, "{"); parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = static::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and token.content != "}")
		{
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "#ifdef")
			{
				parser = look;
				parser <= find_ident <= false;
				list res = parser.parser_expression::readExpression(parser);
				parser = res[0]; ifdef_condition = res[1];
				parser <= find_ident <= true;
				list res = parser.parser_base::matchToken(parser, "then"); parser = res[0]; token = res[1];
				flag_ifdef = true;
			}
			
			BaseOpCode parser_value = null;
			list res = static::readString(parser); parser = res[0]; parser_value = res[1];
			string key = parser_value.value;
			
			list res = static::matchToken(parser, ":"); parser = res[0];
			list res = parser.parser_expression::readExpression(parser);
			parser = res[0]; parser_value = res[1];
			
			list res = static::readToken(parser); look = res[0]; token = res[1];
			if (token.content == ",")
			{
				parser = look;
			}
			
			values.pushValue(
				new OpDictPair{
					"key": key,
					"value": parser_value,
					"condition": ifdef_condition
				}
			);
			
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "#endif")
			{
				parser = look;
				flag_ifdef = false;
				ifdef_condition = null;
			}
			
			list res = static::readToken(parser); look = res[0]; token = res[1];
		}
		
		list res = static::matchToken(parser, "}"); parser = res[0]; token = res[1];
		return 
		[
			parser,
			new OpDict
			{
				"values": values.toCollection(),
				"caret_start": caret_start,
				"caret_end": token.caret_end,
			}
		];
	}
	
	
	
	/**
	 * Read fixed
	 */
	pure list<ParserBay, BaseOpCode> readFixed(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		ParserBay start = parser;
		bool flag_negative = false;
		
		list res = static::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "")
		{
			throw new ParserExpected("Identifier", token.caret_start, look.file_name);
		}
		
		/* Negative number */
		if (token.content == "-")
		{
			flag_negative = true;
			list res = static::readToken(look); look = res[0]; token = res[1];
		}
		
		/* Read string */
		if (not flag_negative and (token.content == "'" or token.content == '"'))
		{
			return static::readString(parser);
		}
		
		/* Read Collection */
		if (not flag_negative and token.content == "[")
		{
			return static::readCollection(parser);
		}
		
		/* Read Dict */
		if (not flag_negative and token.content == "{")
		{
			return static::readDict(parser);
		}
		
		/* Read Number */
		if (static::isStringOfNumbers(token.content))
		{
			return 
			[
				look,
				new OpNumber
				{
					"value": token.content,
					"caret_start": token.caret_start,
					"caret_end": look.caret,
					"negative": flag_negative,
				}
			];
		}
		
		return static::readIdentifier(parser, true);
	}
	
	
	
	/**
	 * Read call args
	 */
	pure list<ParserBay, Collection> readCallArgs(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		Vector<BaseOpCode> items = new Vector();
		
		list res = static::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "{")
		{
			list res = static::readDict(parser); parser = res[0]; OpDict d = res[1];
			items = [ d ];
		}
		else if (token.content == "(")
		{
			list res = static::matchToken(parser, "("); parser = res[0];
			list res = static::readToken(parser); look = res[0]; token = res[1];
			while (not token.eof and token.content != ")")
			{
				ParserBay parser_value = null;
				list res = parser.parser_expression::readExpression(parser);
				parser = res[0]; parser_value = res[1];
				items.pushValue(parser_value);
				
				list res = static::readToken(parser); look = res[0]; token = res[1];
				if (token.content == ",")
				{
					parser = look;
					list res = static::readToken(parser); look = res[0]; token = res[1];
				}
			}
			
			list res = static::matchToken(parser, ")"); parser = res[0];
		}
		
		return [parser, items.toCollection()];
	}
	
	
	
	/**
	 * Read new instance
	 */
	pure list<ParserBay, BaseOpCode> readNew(ParserBay parser, bool match_new = true)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		Caret caret_start = parser.caret;
		
		Collection<BaseOpCode> args = [];
		if (match_new)
		{
			list res = static::matchToken(parser, "new"); parser = res[0]; token = res[1];
			caret_start = token.caret_start;
		}
		list res = static::readTypeIdentifier(parser); parser = res[0]; op_code = res[1];
		
		list res = static::readToken(parser); token = res[1];
		if (token.content == "(" or token.content == "{")
		{
			list res = static::readCallArgs(parser); parser = res[0]; args = res[1];
		}
		
		return 
		[
			parser,
			new OpNew
			{
				"args": args,
				"value": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read method
	 */
	pure list<ParserBay, BaseOpCode> readMethod(ParserBay parser, bool match = true)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode parser_value = null;
		BaseOpCode op_code = null;
		BaseOpCode value1 = "";
		string value2 = "";
		string kind = "";
		
		Caret caret_start = parser.caret;
		if (match)
		{
			list res = static::matchToken(parser, "method"); parser = res[0]; token = res[1];
		}
		
		ParserBay save = parser;
		
		/* Read static method */
		try
		{
			list res = static::readIdentifier(parser); parser = res[0]; op_code = res[1];
			list res = static::matchToken(parser, "::"); parser = res[0];
			list res = static::readToken(parser); parser = res[0]; token = res[1];
			if (op_code.kind == OpIdentifier::KIND_VARIABLE) kind = OpMethod::KIND_STATIC;
			else kind = OpMethod::KIND_CLASS;
			value1 = op_code;
			value2 = token.content;
		}
		catch (ParserError e)
		{
		}
		
		/* Read instance method */
		if (kind == "")
		{
			parser = save;
			try
			{
				list res = static::readIdentifier(parser); parser = res[0]; op_code = res[1];
				list res = static::matchToken(parser, "."); parser = res[0];
				list res = static::readToken(parser); parser = res[0]; token = res[1];
				kind = OpMethod::KIND_ATTR;
				value1 = op_code;
				value2 = token.content;
			}
			catch (ParserError e)
			{
			}
		}
		
		/* Error */
		if (kind == "")
		{
			throw new ParserExpected("'.' or '::'", parser.caret, parser.file_name);
		}
		
		return 
		[
			parser,
			new OpMethod
			{
				"value1": value1,
				"value2": value2,
				"kind": kind,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read curry
	 */
	pure list<ParserBay, BaseOpCode> readCurry(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode obj = null;
		Vector<BaseOpCode> args = new Vector();
		
		list res = static::matchToken(parser, "curry"); parser = res[0]; token = res[1];
		list res = static::readDynamic(parser, 14); parser = res[0]; obj = res[1];
		list res = static::matchToken(parser, "("); parser = res[0];
		list res = static::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and token.content != ")")
		{
			BaseOpCode arg = null;
			if (token.content == "?")
			{
				int pos = 0;
				parser = look;
				list res = static::readToken(look); look = res[0]; token = res[1];
				if (static::isStringOfNumbers(token.content))
				{
					pos = (int)token.content;
					parser = look;
				}
				arg = new OpCurryArg
				{
					"pos": pos,
				};
				args.pushValue(arg);
			}
			else
			{
				list res = parser.parser_expression::readExpression(parser);
				parser = res[0]; arg = res[1];
				args.pushValue(arg);
			}
			
			list res = static::readToken(parser); look = res[0]; token = res[1];
			if (token.content == ",")
			{
				parser = look;
				list res = static::readToken(parser); look = res[0]; token = res[1];
			}
		}
		
		list res = static::matchToken(parser, ")"); parser = res[0];
		
		return
		[
			parser,
			new OpCurry
			{
				"obj": obj,
				"args": args,
			}
		];
	}
	
	
	
	/**
	 * Read base item
	 */
	pure list<ParserBay, BaseOpCode> readBaseItem(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		
		list res = static::readToken(parser); look = res[0]; token = res[1];
		Caret caret_start = look.caret;
		if (token.content == "new")
		{
			list res = static::readNew(parser); parser = res[0]; op_code = res[1];
		}
		else if (token.content == "method")
		{
			list res = static::readMethod(parser); parser = res[0]; op_code = res[1];
		}
		else if (token.content == "classof")
		{
			list res = static::readClassOf(parser); parser = res[0]; op_code = res[1];
		}
		else if (token.content == "classref")
		{
			list res = static::readClassRef(parser); parser = res[0]; op_code = res[1];
		}
		else if (token.content == "(")
		{
			ParserBay save_parser = parser; parser = look;
			
			/* Try to read OpTypeConvert */
			try
			{
				list res = static::readTypeIdentifier(parser);
				parser = res[0]; OpTypeIdentifier op_type = res[1];
				
				list res = static::readToken(parser); parser = res[0]; token = res[1];
				if (token.content == ")")
				{
					list res = static::readDynamic(parser); parser = res[0]; op_code = res[1];
					return
					[
						parser,
						new OpTypeConvert
						{
							"pattern": op_type,
							"value": op_code,
							"caret_start": caret_start,
							"caret_end": parser.caret,
						}
					];
				}
			}
			catch (ParserError e)
			{
			}			
			
			/* Read Expression */
			list res = static::matchToken(save_parser, "("); parser = res[0];
			list res = parser.parser_expression::readExpression(parser);
			parser = res[0]; op_code = res[1];
			list res = static::matchToken(parser, ")"); parser = res[0];
		}
		else
		{
			list res = static::readFixed(parser); parser = res[0]; op_code = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read classof
	 */
	pure list<ParserBay, BaseOpCode> readClassOf(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		
		list res = static::matchToken(parser, "classof"); parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = static::readEntityName(parser); parser = res[0]; op_code = res[1];
		return 
		[
			parser,
			new OpClassOf
			{
				"entity_name": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read classref
	 */
	pure list<ParserBay, BaseOpCode> readClassRef(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		
		list res = static::matchToken(parser, "classref");
		parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = parser.parser_expression::readExpression(parser);
		parser = res[0]; op_code = res[1];
		
		return 
		[
			parser, 
			new OpClassRef
			{
				"value": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read dynamic
	 */
	pure list<ParserBay, BaseOpCode> readDynamic(ParserBay parser, int dynamic_flags = -1)
	{
		ParserBay look = null;
		CoreToken token = null;
		Collection<BaseOpCode> parser_items = null;
		BaseOpCode op_code = null
		BaseOpCode op_code_first = null;
		bool is_await = false;
		bool is_context_call = true;
		Caret caret_start = null;
		
		/* Dynamic flags */
		int flag_call = 1;
		int flag_attr = 2;
		int flag_static = 4;
		int flag_dynamic = 8;
		
		fn f_next = bool (string s) use (dynamic_flags)
		{
			if (dynamic_flags & 1 == 1)
			{
				if (s == "{" or s == "(" or s == "@") return true;
			}
			if (dynamic_flags & 2 == 2)
			{
				if (s == ".") return true;
			}
			if (dynamic_flags & 4 == 4)
			{
				if (s == "::") return true;
			}
			if (dynamic_flags & 8 == 8)
			{
				if (s == "[") return true;
			}
			return false;
		}
		
		list res = static::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "await")
		{
			caret_start = token.caret_start;
			is_await = true;
			parser = look;
		}
		list res = static::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "@")
		{
			list res = static::readToken(look);
			ParserBay look2 = res[0]; CoreToken token2 = res[1];
			if (not f_next(token2.content))
			{
				if (static::isIdentifier(token2.content))
				{
					parser = look;
					is_context_call = false;
				}
			}
		}
		list res = static::readBaseItem(parser); parser = res[0]; op_code = res[1];
		
		op_code_first = op_code;
		if (caret_start == null) caret_start = op_code.caret_start;		
		if (op_code.kind == OpIdentifier::KIND_CONTEXT or op_code.kind == OpIdentifier::KIND_SYS_FUNCTION)
		{
			is_context_call = false;
		}
		
		list res = static::readToken(parser); look = res[0]; token = res[1];
		if (f_next(token.content))
		{
			if (op_code instanceof OpIdentifier)
			{
				if (
					parser.find_ident and
					op_code.kind != OpIdentifier::KIND_SYS_TYPE and
					op_code.kind != OpIdentifier::KIND_SYS_FUNCTION and
					op_code.kind != OpIdentifier::KIND_VARIABLE and
					op_code.kind != OpIdentifier::KIND_CLASS and
					op_code.kind != OpIdentifier::KIND_CLASSREF and
					op_code.kind != OpIdentifier::KIND_CONTEXT
				)
				{
					throw new ParserExpected
					(
						"Module or variable '" ~ op_code.value ~ "'",
						op_code.caret_start, parser.file_name
					);
				}
			}
			else if (op_code instanceof OpNew or op_code instanceof OpCollection or op_code instanceof OpDict){}
			else
			{
				throw new ParserExpected
				(
					"Module or variable",
					op_code.caret_start
					parser.file_name
				);
			}
		}
		
		/* If is pipe */
		if (parser.is_pipe and op_code instanceof OpIdentifier)
		{
			op_code = new OpAttr
			{
				"kind": parser.pipe_kind,
				"obj": new OpIdentifier
				{
					"kind": OpIdentifier::KIND_PIPE,
					"caret_start": op_code.caret_start,
					"caret_end": op_code.caret_end,
				},
				"value": op_code,
				"caret_start": op_code.caret_start,
				"caret_end": op_code.caret_end,
			};
		}
		
		while (not token.eof and f_next(token.content))
		{
			string token_content = token.content;
			
			/* Static call */
			if (token_content == "(" or token_content == "{" or token_content == "@")
			{
				if (dynamic_flags & flag_call != flag_call)
				{
					throw new ParserError
					(
						"Call are not allowed",
						token.caret_start, parser.file_name
					);
				}
				
				if (token_content == "@")
				{
					parser = look;
					is_context_call = false;
				}
				
				list res = static::readCallArgs(parser); parser = res[0]; parser_items = res[1];
				op_code = new OpCall
				{
					"obj": op_code,
					"args": parser_items,
					"caret_start": caret_start,
					"caret_end": parser.caret,
					"is_await": is_await,
					"is_context": is_context_call,
				};
				is_context_call = true;
			}
			
			/* Object access */
			else if (token_content == "." or token_content == "::" or token_content == "[")
			{
				string kind = "";
				Vector<BaseOpCode> look_values = null;
				BaseOpCode look_value = null;
				parser = look;
				is_context_call = true;
				
				if (token_content == ".")
				{
					kind = OpAttr::KIND_ATTR;
					if (dynamic_flags & flag_attr != flag_attr)
					{
						throw new ParserError
						(
							"Attr are not allowed",
							token.caret_start, parser.file_name
						);
					}
				}
				else if (token_content == "::")
				{
					kind = OpAttr::KIND_STATIC;
					if (dynamic_flags & flag_static != flag_static)
					{
						throw new ParserError
						(
							"Static attr are not allowed",
							token.caret_start, parser.file_name
						);
					}
				}
				else if (token_content == "[")
				{
					kind = OpAttr::KIND_DYNAMIC;
					if (dynamic_flags & flag_dynamic != flag_dynamic)
					{
						throw new ParserError
						(
							"Dynamic attr are not allowed",
							token.caret_start, parser.file_name
						);
					}
				}
				
				if (token_content == "[")
				{
					list res = parser.parser_expression::readExpression(parser);
					parser = res[0]; look_value = res[1];
					
					list res = static::readToken(parser); look = res[0]; token = res[1];
					if (token.content == ",")
					{
						look_values = new Vector();
						look_values.pushValue(look_value);
					}
					while (token.content == ",")
					{
						parser = look;
						list res = parser.parser_expression::readExpression(parser);
						parser = res[0]; look_value = res[1];
						look_values.pushValue(look_value);
						list res = static::readToken(parser); look = res[0]; token = res[1];
					}
					
					list res = static::matchToken(parser, "]"); parser = res[0];
					if (look_values != null)
					{
						kind = OpAttr::KIND_DYNAMIC_ATTRS;
					}
				}
				else
				{
					list res = static::readToken(parser); look = res[0]; token = res[1];
					if (token.content == "@")
					{
						parser = look;
						is_context_call = false;
					}
					list res = static::readIdentifier(parser); parser = res[0]; look_value = res[1];
				}
				
				op_code = new OpAttr
				{
					"kind": kind,
					"obj": op_code,
					"attrs": look_values != null ? look_values.toCollection() : null,
					"value": look_values == null ? look_value : null,
					"caret_start": caret_start,
					"caret_end": parser.caret,
				};
			}
			else
			{
				throw new ParserExpected("Next attr", token.caret_start, parser.file_name);
			}
			
			list res = static::readToken(parser); look = res[0]; token = res[1];
			if 
			(
				op_code instanceof OpAttr and op_code.kind == OpAttr::KIND_PIPE and
				token.content != "(" and token.content != "{"
			)
			{
				throw new ParserExpected("Call", token.caret_start, parser.file_name);
			}
			
		}
		
		return [parser, op_code];
	}
	
}
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

namespace Bayrell.Lang.LangBay;

use Bayrell.Lang.Caret;
use Bayrell.Lang.CoreToken;
use Bayrell.Lang.Exceptions.ParserError;
use Bayrell.Lang.Exceptions.ParserExpected;
use Bayrell.Lang.LangBay.ParserBay;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAttr;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpIdentifier;
use Bayrell.Lang.OpCodes.OpInc;
use Bayrell.Lang.OpCodes.OpMath;
use Bayrell.Lang.OpCodes.OpMethod;
use Bayrell.Lang.OpCodes.OpPipe;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpString;
use Bayrell.Lang.OpCodes.OpTernary;


static class ParserBayExpression
{
	
	/**
	 * Read bit not
	 */
	pure list<ParserBay, BaseOpCode> readBitNot(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		if (token.content == "!")
		{
			BaseOpCode op_code = null;
			list res = parser.parser_base::readDynamic(look); parser = res[0]; op_code = res[1];
			return 
			[
				parser,
				new OpMath
				{
					"value1": op_code,
					"math": "!",
					"caret_start": caret_start,
					"caret_end": parser.caret,
				}
			];
		}
		return parser.parser_base::readDynamic(parser);
	}
	
	
	
	/**
	 * Read bit shift
	 */
	pure list<ParserBay, BaseOpCode> readBitShift(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode look_value = null;
		
		list res = static::readBitNot(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		string math = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (
			not token.eof and (
				token.content == ">>" or
				token.content == "<<" 
			)
		)
		{
			math = token.content;
			list res = static::readBitNot(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": math,
				"caret_start": caret_start,
				"caret_end": look.caret,
			};
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read bit and
	 */
	pure list<ParserBay, BaseOpCode> readBitAnd(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode look_value = null;
		
		list res = static::readBitShift(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		string math = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and token.content == "&")
		{
			math = token.content;
			list res = static::readBitShift(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": math,
				"caret_start": caret_start,
				"caret_end": look.caret,
			};
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read bit or
	 */
	pure list<ParserBay, BaseOpCode> readBitOr(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode look_value = null;
		
		list res = static::readBitAnd(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		string math = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and (token.content == "|" or token.content == "xor"))
		{
			math = token.content;
			list res = static::readBitAnd(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": math,
				"caret_start": caret_start,
				"caret_end": look.caret,
			};
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read factor
	 */
	pure list<ParserBay, BaseOpCode> readFactor(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode look_value = null;
		
		list res = static::readBitOr(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		string math = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (
			not token.eof and (
				token.content == "*" or
				token.content == "/" or 
				token.content == "%" or
				token.content == "div" or
				token.content == "mod"
			)
		)
		{
			math = token.content;
			list res = static::readBitOr(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": math,
				"caret_start": caret_start,
				"caret_end": look.caret,
			};
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read arithmetic
	 */
	pure list<ParserBay, BaseOpCode> readArithmetic(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode look_value = null;
		
		list res = static::readFactor(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		string math = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and (token.content == "+" or token.content == "-"))
		{
			math = token.content;
			list res = static::readFactor(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": math,
				"caret_start": caret_start,
				"caret_end": look.caret,
			};
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read concat
	 */
	pure list<ParserBay, BaseOpCode> readConcat(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode look_value = null;
		
		list res = static::readArithmetic(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		string math = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and token.content == "~")
		{
			math = token.content;
			list res = static::readArithmetic(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": math,
				"caret_start": caret_start,
				"caret_end": look.caret,
			};
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read compare
	 */
	pure list<ParserBay, BaseOpCode> readCompare(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode look_value = null;
		
		list res = static::readConcat(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		string content = token.content;
		if (
			content == "===" or content == "!==" or content == "==" or
			content == "!=" or content == ">=" or content == "<=" or
			content == ">" or content == "<"
		)
		{
			string math = token.content;
			list res = static::readConcat(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": math,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			};
			parser = look;
		}
		else if (content == "is" or content == "implements" or content == "instanceof")
		{
			string math = token.content;
			list res = parser.parser_base::readTypeIdentifier(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": math,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			};
			parser = look;
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read not
	 */
	pure list<ParserBay, BaseOpCode> readNot(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		if (token.content == "not")
		{
			BaseOpCode op_code = null;
			ParserBay start = parser;
			list res = static::readCompare(look); parser = res[0]; op_code = res[1];
			return 
			[
				parser,
				new OpMath
				{
					"value1": op_code,
					"math": "not",
					"caret_start": caret_start,
					"caret_end": parser.caret,
				}
			];
		}
		return static::readCompare(parser);
	}
	
	
	
	/**
	 * Read and
	 */
	pure list<ParserBay, BaseOpCode> readAnd(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode look_value = null;
		
		list res = static::readNot(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		string math = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and (token.content == "and" or token.content == "&&"))
		{
			math = token.content;
			list res = static::readNot(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": "and",
				"caret_start": caret_start,
				"caret_end": look.caret,
			};
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read or
	 */
	pure list<ParserBay, BaseOpCode> readOr(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode look_value = null;
		
		list res = static::readAnd(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		string math = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and (token.content == "or" or token.content == "||"))
		{
			math = token.content;
			list res = static::readAnd(look); look = res[0]; look_value = res[1];
			op_code = new OpMath
			{
				"value1": op_code,
				"value2": look_value,
				"math": "or",
				"caret_start": caret_start,
				"caret_end": look.caret,
			};
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read element
	 */
	pure list<ParserBay, BaseOpCode> readElement(ParserBay parser)
	{
		/* Try to read function */
		if (parser.parser_operator::tryReadFunction(parser, false))
		{
			return parser.parser_operator::readDeclareFunction(parser, false);
		}
		return static::readOr(parser);
	}
	
	
	
	/**
	 * Read ternary operation
	 */
	pure list<ParserBay, BaseOpCode> readTernary(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode condition = null;
		BaseOpCode if_true = null;
		BaseOpCode if_false = null;
		
		list res = static::readElement(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == '?')
		{
			condition = op_code;
			list res = static::readExpression(look); parser = res[0]; if_true = res[1];
			
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == ':')
			{
				list res = static::readExpression(look); parser = res[0]; if_false = res[1];
			}
			
			op_code = new OpTernary({
				"condition": condition,
				"if_true": if_true,
				"if_false": if_false,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			});
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read pipe
	 */
	pure list<ParserBay, BaseOpCode> ExpressionPipe(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken look_token = null;
		BaseOpCode op_code = null;
		bool is_next_attr = false;
		
		bool save_is_pipe = parser.is_pipe;
		parser <= is_pipe <= false;
		list res = static::readTernary(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		parser <= is_pipe <= save_is_pipe;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; look_token = res[1];
		if (look_token.content == '|>')
		{
			while (look_token.content == '|>' or look_token.content == ',')
			{
				parser = look;
				BaseOpCode value = null;
				string kind = "";
				bool is_async = false;
				bool is_monad = false;
				
				if (look_token.content == ',')
				{
					is_next_attr = true;
				}
				
				list res = parser.parser_base::readToken(parser); look = res[0]; look_token = res[1];
				if (look_token.content == 'await')
				{
					is_async = true;
					parser = look;
					list res = parser.parser_base::readToken(parser); look = res[0]; look_token = res[1];
				}
				if (look_token.content == 'monad')
				{
					is_monad = true;
					parser = look;
					list res = parser.parser_base::readToken(parser); look = res[0]; look_token = res[1];
				}
				
				if (look_token.content == 'attr')
				{
					parser = look;
					list res = static::readTernary(parser); parser = res[0]; value = res[1];
					kind = OpPipe::KIND_ATTR;
				}
				else if (look_token.content == '"' or look_token.content == "'")
				{
					list res = static::readTernary(parser); parser = res[0]; value = res[1];
					kind = OpPipe::KIND_ATTR;
				}
				else if (look_token.content == '{')
				{
					parser = look;
					list res = static::readTernary(parser); parser = res[0]; value = res[1];
					kind = OpPipe::KIND_ATTR;
					list res = parser.parser_base::matchToken(parser, '}'); parser = res[0];
				}
				else if (is_next_attr)
				{
					throw new ParserExpected("|>", parser.caret, parser.file_name);
				}
				else if (look_token.content == 'default')
				{
					BaseOpCode arg1, arg2;
					kind = OpPipe::KIND_CALL;
					is_monad = true;
					
					try
					{
						list res = parser.parser_base::readIdentifier(look); parser = res[0]; arg1 = res[1];
						list res = static::readTernary(parser); parser = res[0]; arg2 = res[1];
						
						arg1 = new OpString
						{
							"value": parser::findModuleName(parser, arg1.value),
							"caret_start": arg1.caret_start,
							"caret_end": arg1.caret_end,
						};
						
						value = new OpCall
						{
							"args":
							[
								arg1,
								arg2
							],
							"obj": new OpAttr
							{
								"kind": OpAttr::KIND_STATIC,
								"obj": new OpIdentifier
								{
									"kind": OpIdentifier::KIND_SYS_TYPE,
									"caret_start": caret_start,
									"caret_end": parser.caret,
									"value": "rtl",
								},
								"value": new OpIdentifier
								{
									"caret_start": caret_start,
									"caret_end": parser.caret,
									"value": "m_to",
								},
								"caret_start": caret_start,
								"caret_end": parser.caret,
							},
							"caret_start": caret_start,
							"caret_end": parser.caret,
						}
					}
					catch (ParserError err)
					{
						value = null;
					}
					
					if (value == null)
					{
						list res = static::readTernary(look); parser = res[0]; arg2 = res[1];
						
						value = new OpCall
						{
							"args":
							[
								arg2
							],
							"obj": new OpAttr
							{
								"kind": OpAttr::KIND_STATIC,
								"obj": new OpIdentifier
								{
									"kind": OpIdentifier::KIND_SYS_TYPE,
									"caret_start": caret_start,
									"caret_end": parser.caret,
									"value": "rtl",
								},
								"value": new OpIdentifier
								{
									"caret_start": caret_start,
									"caret_end": parser.caret,
									"value": "m_def",
								},
								"caret_start": caret_start,
								"caret_end": parser.caret,
							},
							"caret_start": caret_start,
							"caret_end": parser.caret,
						}
					}
					
				}
				else if
				(
					look_token.content == 'method' or look_token.content == '.' or
					look_token.content == ':' or look_token.content == '::'
				)
				{
					parser = look;
					kind = OpPipe::KIND_CALL;
					
					/* Set pipe */
					bool save_find_ident = parser.find_ident;
					parser <= find_ident <= false;
					parser <= is_pipe <= true;
					
					if (look_token.content == '.')
					{
						kind = OpPipe::KIND_METHOD;
						parser <= pipe_kind <= OpAttr::KIND_ATTR;
					}
					else
					{
						parser <= pipe_kind <= OpAttr::KIND_STATIC;
					}
					
					list res = parser.parser_base::readDynamic(parser); parser = res[0]; value = res[1];
					
					/* Restore parser */
					parser <= is_pipe <= false;
					parser <= find_ident <= save_find_ident;
				}
				else if (look_token.content == 'curry')
				{
					kind = OpPipe::KIND_CALL;
					list res = parser.parser_base::readCurry(parser); parser = res[0]; value = res[1];
				}
				else
				{
					kind = OpPipe::KIND_CALL;
					list res = parser.parser_base::readDynamic(parser); parser = res[0]; value = res[1];
				}
				
				op_code = new OpPipe
				{
					"obj": op_code,
					"kind": kind,
					"value": value,
					"is_async": is_async,
					"is_monad": is_monad,
					"caret_start": caret_start,
					"caret_end": parser.caret,
				};
				
				list res = parser.parser_base::readToken(parser); look = res[0]; look_token = res[1];
				is_next_attr = false;
			}
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read expression
	 */
	pure list<ParserBay, BaseOpCode> readExpression(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "<")
		{
			return parser.parser_html::readHTML(parser);
		}
		else if (token.content == "curry")
		{
			return parser.parser_base::readCurry(parser);
		}
		else if (token.content == "@css")
		{
			return parser.parser_html::readCss(parser);
		}
		return static::ExpressionPipe(parser);
	}
}
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

namespace Bayrell.Lang.LangBay;

use Runtime.re;
use Runtime.BaseObject;
use Runtime.BaseStruct;
use Runtime.Reference;
use Runtime.RuntimeUtils;
use Bayrell.Lang.Caret;
use Bayrell.Lang.CoreParser;
use Bayrell.Lang.CoreToken;
use Bayrell.Lang.Exceptions.ParserError;
use Bayrell.Lang.Exceptions.ParserExpected;
use Bayrell.Lang.LangBay.ParserBay;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpCollection;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpDeclareClass;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
use Bayrell.Lang.OpCodes.OpEntityName;
use Bayrell.Lang.OpCodes.OpFlags;
use Bayrell.Lang.OpCodes.OpHtmlAttribute;
use Bayrell.Lang.OpCodes.OpHtmlContent;
use Bayrell.Lang.OpCodes.OpHtmlItems;
use Bayrell.Lang.OpCodes.OpHtmlTag;
use Bayrell.Lang.OpCodes.OpHtmlValue;
use Bayrell.Lang.OpCodes.OpIdentifier;
use Bayrell.Lang.OpCodes.OpMath;
use Bayrell.Lang.OpCodes.OpModule;
use Bayrell.Lang.OpCodes.OpNamespace;
use Bayrell.Lang.OpCodes.OpString;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;
use Bayrell.Lang.OpCodes.OpUse;


class ParserBayHtml extends BaseObject
{
	
	
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	static memorize string getCssHash(string s)
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
	 * Read css selector
	 */
	pure list<ParserBay, string> readCssSelector(ParserBay parser)
	{
		Reference<string> content = parser.content;
		int content_sz = parser.content_sz;
		int pos = parser.caret.pos;
		int x = parser.caret.x;
		int y = parser.caret.y;
		string class_name = parser.current_namespace_name ~ "." ~ parser.current_class_name;
		string ch = rs::substr(content.ref, pos, 1);
		if (ch == "(")
		{
			pos = pos + 1;
			x = parser.parser_base::nextX(parser, ch, x);
			y = parser.parser_base::nextY(parser, ch, y);
			int start_pos = pos;
			while (pos < content_sz and ch != ")")
			{
				pos = pos + 1;
				x = parser.parser_base::nextX(parser, ch, x);
				y = parser.parser_base::nextY(parser, ch, y);
				ch = rs::substr(content.ref, pos, 1);
			}
			class_name = rs::substr(content.ref, start_pos, pos - start_pos);
			if (parser.uses.has(class_name))
			{
				class_name = parser.uses.item(class_name);
			}
			pos = pos + 1;
			x = parser.parser_base::nextX(parser, ch, x);
			y = parser.parser_base::nextY(parser, ch, y);
		}
		
		int start_pos = pos;
		ch = rs::substr(content.ref, pos, 1);
		while (
			pos < content_sz and ch != " " and ch != "," and 
			ch != "." and ch != ":" and ch != "[" and ch != "{"
		)
		{
			pos = pos + 1;
			x = parser.parser_base::nextX(parser, ch, x);
			y = parser.parser_base::nextY(parser, ch, y);
			ch = rs::substr(content.ref, pos, 1);
		}
		string postfix = rs::substr(content.ref, start_pos, pos - start_pos);
		string selector = "." ~ postfix ~ ".h-" ~ static::getCssHash(class_name);
		Caret caret = new Caret{ "x": x, "y": y, "pos": pos };
		parser <= caret <= caret;
		return [parser, selector];
	}
	
	
	
	/**
	 * Read css body
	 */
	pure list<ParserBay, BaseOpCode> readCssBody(ParserBay parser, Dict flags = null)
	{
		if (flags == null)
		{
			flags =
			{
				"expression": true,
				"css_selector": true,
			};
		}
		else
		{
			flags <= expression <= ( flags["expression"] |> default bool true );
			flags <= css_selector <= ( flags["css_selector"] |> default bool true );
		}
		Caret caret_start = parser.caret;
		Caret caret_last = parser.caret;
		
		bool is_first_selector = true;
		BaseOpCode op_code = null;
		string css_str = "";
		Reference<string> content = parser.content;
		int content_sz = parser.content_sz;
		int pos = parser.caret.pos;
		int x = parser.caret.x;
		int y = parser.caret.y;
		int bracket_level = 0;
		int start_pos = pos;
		
		string ch = rs::substr(content.ref, pos, 1);
		string ch2 = rs::substr(content.ref, pos, 2);
		string ch6 = rs::substr(content.ref, pos, 6);
		while (pos < content_sz and (ch != "}" or ch == "}" and bracket_level > 0) and ch != "<")
		{
			/* Read expression */
			if (ch2 == "${")
			{
				list res = parser.parser_base::next(parser, ch2, x, y, pos);
				x = res[0]; y = res[1]; pos = res[2];
				
				/* Add value */
				string value = rs::substr(content.ref, start_pos, pos - start_pos - 2);
				if (value != "") css_str ~= value;
				
				/* Add css op code */
				css_str = rs::replace("\t", "", css_str);
				css_str = rs::replace("\n", "", css_str);
				if (css_str != "")
				{
					OpString css_str_op_code = new OpString
					{
						"caret_start": caret_last,
						"caret_end": parser.caret,
						"value": css_str,
					};
					if (op_code == null) op_code = css_str_op_code;
					else op_code = new OpMath
					{
						"caret_start": caret_start,
						"caret_end": parser.caret,
						"value1": op_code,
						"value2": css_str_op_code,
						"math": "~",
					};
				}
				
				/* Read CSS Selector */
				Caret caret = new Caret{ "x": x, "y": y, "pos": pos };
				parser <= caret <= caret;
				list res = parser.parser_expression::ExpressionPipe(parser);
				parser = res[0]; BaseOpCode expr = res[1];
				list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
				
				/* Add expr op code */
				if (expr != null)
				{
					if (op_code == null) op_code = expr;
					else op_code = new OpMath
					{
						"caret_start": caret_start,
						"caret_end": parser.caret,
						"value1": op_code,
						"value2": expr,
						"math": "~",
					};
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
			
			/* Read media css */
			else if (ch6 == "@media")
			{
				while (pos < content_sz and ch != "{")
				{
					x = parser.parser_base::nextX(parser, ch, x);
					y = parser.parser_base::nextY(parser, ch, y);
					pos = pos + 1;
					ch = rs::substr(content.ref, pos, 1);
				}
				
				/* Add value */
				string value = rs::substr(content.ref, start_pos, pos - start_pos);
				if (value != "") css_str ~= value;
				css_str ~= "{";
				
				/* Add css op code */
				css_str = rs::replace("\t", "", css_str);
				css_str = rs::replace("\n", "", css_str);
				if (css_str != "")
				{
					OpString css_str_op_code = new OpString
					{
						"caret_start": caret_last,
						"caret_end": parser.caret,
						"value": css_str,
					};
					if (op_code == null) op_code = css_str_op_code;
					else op_code = new OpMath
					{
						"caret_start": caret_start,
						"caret_end": parser.caret,
						"value1": op_code,
						"value2": css_str_op_code,
						"math": "~",
					};
				}
				
				/* Read CSS Block */
				Caret caret = new Caret{ "x": x, "y": y, "pos": pos };
				parser <= caret <= caret;
				list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
				list res = static::readCssBody
				(
					parser,
					{
						"css_selector": true,
					}
				);
				parser = res[0]; BaseOpCode expr = res[1];
				list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
				
				/* Add expr op code */
				if (expr != null)
				{
					if (op_code == null) op_code = expr;
					else op_code = new OpMath
					{
						"caret_start": caret_start,
						"caret_end": parser.caret,
						"value1": op_code,
						"value2": expr,
						"math": "~",
					};
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
			
			/* If html or tag */
			else if (
				(ch == "%" or (parser.is_local_css and ch == "." and is_first_selector)) and
				flags["css_selector"] == true
			)
			{
				x = parser.parser_base::nextX(parser, ch, x);
				y = parser.parser_base::nextY(parser, ch, y);
				pos = pos + 1;
				
				/* Add value */
				string value = rs::substr(content.ref, start_pos, pos - start_pos - 1);
				if (value != "") css_str ~= value;
				
				/* Read CSS Selector */
				Caret caret = new Caret{ "x": x, "y": y, "pos": pos };
				parser <= caret <= caret;
				list res = static::readCssSelector(parser);
				parser = res[0]; string s = res[1];
				css_str ~= s;
				
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
				is_first_selector = false;
			}
			
			/* Read css block */
			else if (ch == "{")
			{
				/* Add value */
				string value = rs::substr(content.ref, start_pos, pos - start_pos);
				if (value != "") css_str ~= value;
				css_str ~= "{";
				
				/* Add css op code */
				css_str = rs::replace("\t", "", css_str);
				css_str = rs::replace("\n", "", css_str);
				if (css_str != "")
				{
					OpString css_str_op_code = new OpString
					{
						"caret_start": caret_last,
						"caret_end": parser.caret,
						"value": css_str,
					};
					if (op_code == null) op_code = css_str_op_code;
					else op_code = new OpMath
					{
						"caret_start": caret_start,
						"caret_end": parser.caret,
						"value1": op_code,
						"value2": css_str_op_code,
						"math": "~",
					};
				}
				
				/* Read CSS Block */
				Caret caret = new Caret{ "x": x, "y": y, "pos": pos };
				parser <= caret <= caret;
				list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
				list res = static::readCssBody
				(
					parser,
					{
						"css_selector": false,
					}
				);
				parser = res[0]; BaseOpCode expr = res[1];
				list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
				
				/* Add expr op code */
				if (expr != null)
				{
					if (op_code == null) op_code = expr;
					else op_code = new OpMath
					{
						"caret_start": caret_start,
						"caret_end": parser.caret,
						"value1": op_code,
						"value2": expr,
						"math": "~",
					};
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
				x = parser.parser_base::nextX(parser, ch, x);
				y = parser.parser_base::nextY(parser, ch, y);
				pos = pos + 1;
				if (ch == " " or ch == "," or ch == "{") is_first_selector = true;
			}
			
			ch = rs::substr(content.ref, pos, 1);
			ch2 = rs::substr(content.ref, pos, 2);
			ch6 = rs::substr(content.ref, pos, 6);
		}
		
		/* Push item */
		string value = rs::substr(content.ref, start_pos, pos - start_pos);
		Caret caret = new Caret{ "x": x, "y": y, "pos": pos };
		if (value != "") css_str ~= value;
		
		/* Add css op code */
		css_str = rs::replace("\t", "", css_str);
		css_str = rs::replace("\n", "", css_str);
		if (css_str != "")
		{
			OpString css_str_op_code = new OpString
			{
				"caret_start": caret_last,
				"caret_end": parser.caret,
				"value": css_str,
			};
			if (op_code == null) op_code = css_str_op_code;
			else op_code = new OpMath
			{
				"caret_start": caret_start,
				"caret_end": parser.caret,
				"value1": op_code,
				"value2": css_str_op_code,
				"math": "~",
			};
		}
		
		parser <= caret <= caret;
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read css
	 */
	pure list<ParserBay, BaseOpCode> readCss(ParserBay parser)
	{
		Caret caret_start = parser.caret;
		
		list res = parser.parser_base::matchToken(parser, "@css"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
		
		list res = static::readCssBody(parser);
		parser = res[0]; BaseOpCode op_code = res[1];
		
		if (op_code == null)
		{
			op_code = new OpString
			{
				"caret_start": caret_start,
				"caret_end": parser.caret,
				"value": "",
			};
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read style
	 */
	pure list<ParserBay, BaseOpCode> readStyle(
		ParserBay parser, Dict item_attrs, Vector<BaseOpCode> items, Caret caret_start
	)
	{
		/* Save vars */
		Dict<bool> save_vars = parser.vars;
		parser <= vars <= parser.vars.setIm("vars", true);
		parser <= is_local_css <= true;
		
		/* Check if local css */
		string is_global = item_attrs.get("global", "");
		if (is_global == "true")
		{
			parser <= is_local_css <= false;
		}
		
		/* Read css */
		list res = static::readCssBody(parser);
		parser = res[0]; BaseOpCode css_op_code = res[1];
		
		/* Restore vars */
		parser <= vars <= save_vars;
		
		/* Read style footer */
		list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "/"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "style"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
		
		int find_pos = -1;
		for (int items_i=0; items_i<items.count(); items_i++)
		{
			OpDeclareFunction f = items[items_i];
			if (f instanceof OpDeclareFunction)
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
			OpDeclareFunction f = new OpDeclareFunction
			{
				"args":
				[
					new OpDeclareFunctionArg
					{
						"name": "vars",
						"caret_start": caret_start,
						"caret_end": parser.caret,
					},
				],
				"vars": [],
				"flags": new OpFlags
				{
					"p_static": true,
					"p_pure": true,
				},
				"name": "css",
				"result_type": "html",
				"expression": css_op_code,
				"items": null,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			};
			
			return [parser, f, -1];
		}
		
		OpDeclareFunction f = items[find_pos];
		
		f <= expression <= new OpMath
		{
			"caret_start": caret_start,
			"caret_end": parser.caret,
			"math": "~",
			"value1": f.expression,
			"value2": css_op_code,
		};
		
		return [parser, f, find_pos];
	}
	
	
	
	/**
	 * Read html comment
	 */
	pure list<ParserBay, OpComment> readHTMLComment(ParserBay parser)
	{
		ParserBay start = parser;
		CoreToken token = null;
		ParserBay look = null;
		Caret caret_start = parser.caret;
		
		parser <= skip_comments <= false;
		list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "!--"); parser = res[0];
		
		string content = parser.content;
		int content_sz = parser.content_sz;
		int pos = parser.caret.pos;
		int x = parser.caret.x;
		int y = parser.caret.y;
		int pos_start = pos;
		
		string ch = rs::charAt(content.ref, pos);
		string ch3 = rs::substr(content.ref, pos, 3);
		while (ch3 != "-->" and pos < content_sz)
		{
			x = parser.parser_base::nextX(parser, ch, x);
			y = parser.parser_base::nextY(parser, ch, y);
			pos = pos + 1;
			if (pos >= parser.content_sz)
			{
				break;
			}
			ch = rs::charAt(content.ref, pos);
			ch3 = rs::substr(content.ref, pos, 3);
		}
		
		int pos_end = pos;
		if (ch3 == "-->")
		{
			x = x + 3;
			pos = pos + 3;
		}
		else
		{
			throw new ParserExpected
			(
				"End of comment",
				new Caret{ "x": x, "y": y, "pos": pos },
				start.file_name
			);
		}
		
		/* Return result */
		string value_str = rs::substr(content.ref, pos_start, pos_end - pos_start);
		Caret caret_end = new Caret{ "x": x, "y": y, "pos": pos };
		
		parser <= skip_comments <= true;
		
		return
		[
			start.copy({ "caret": caret_end }),
			new OpComment
			{
				"value": value_str,
				"caret_start": caret_start,
				"caret_end": caret_end,
			}
		];
		
		
		return [parser, null];
	}
	
	
	/**
	 * Read html value
	 */
	pure list<ParserBay, BaseOpCode> readHTMLValue(ParserBay parser)
	{
		BaseOpCode item = null;
		Caret caret = parser.caret;
		Reference<string> content = parser.content;
		int pos = parser.caret.pos;
		int x = parser.caret.x;
		int y = parser.caret.y;
		string ch = rs::substr(content.ref, pos, 1);
		string ch2 = rs::substr(content.ref, pos, 2);
		if (ch == "<")
		{
			list res = static::readHTMLTag(parser);
			parser = res[0]; item = res[1];
		}
		else if (ch == "{")
		{
			list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
			
			/* Look token */
			bool flag = false;
			list res = parser.parser_base::readToken(parser);
			ParserBay look = res[0]; CoreToken token = res[1];
			
			if (token.content == "{")
			{
				flag = true;
				parser = look;
			}
			
			list res = parser.parser_expression::readExpression(parser);
			parser = res[0]; item = res[1];
			list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
			
			if (flag)
			{
				list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
			}
		}
		else if (ch == "@")
		{
			x = parser.parser_base::nextX(parser, ch, x);
			y = parser.parser_base::nextY(parser, ch, y);
			pos = pos + 1;
			
			string ch3 = rs::substr(content.ref, pos, 3);
			string ch4 = rs::substr(content.ref, pos, 4);
			if (ch3 == "raw" or ch4 == "json" or ch4 == "html")
			{
				list res;
				if (ch3 == "raw") res = parser.parser_base::next(parser, ch3, x, y, pos);
				if (ch4 == "json") res = parser.parser_base::next(parser, ch4, x, y, pos);
				if (ch4 == "html") res = parser.parser_base::next(parser, ch4, x, y, pos);
				x = res[0]; y = res[1]; pos = res[2];
			}
			
			caret = new Caret{ "x": x, "y": y, "pos": pos };
			parser <= caret <= caret;
			list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
			
			/* Look bracket */
			list res = parser.parser_base::lookToken(parser, "{");
			ParserBay look = res[0]; bool find_bracket = res[2];
			if (find_bracket) parser = look;
			
			list res = parser.parser_expression::readExpression(parser);
			parser = res[0]; item = res[1];
			
			if (ch3 == "raw")
			{
				item = new OpHtmlValue
				{
					"kind": OpHtmlValue::KIND_RAW,
					"value": item,
					"caret_start": caret,
					"caret_end": parser.caret,
				};
			}
			else if (ch4 == "json")
			{
				item = new OpHtmlValue
				{
					"kind": OpHtmlValue::KIND_JSON,
					"value": item,
					"caret_start": caret,
					"caret_end": parser.caret,
				};
			}
			else if (ch4 == "html")
			{
				item = new OpHtmlValue
				{
					"kind": OpHtmlValue::KIND_HTML,
					"value": item,
					"caret_start": caret,
					"caret_end": parser.caret,
				};
			}
			
			list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
			if (find_bracket)
			{
				list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
			}
		}
		
		return [parser, item];
	}
	
	
	
	/**
	 * Read html attribute key
	 */
	pure list<ParserBay, string> readHTMLAttrKey(ParserBay parser)
	{
		CoreToken token = null;
		ParserBay look = null;
		OpIdentifier ident = null;
		string key = "";
		
		/* Look token */
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "@")
		{
			parser = look;
			key = "@";
		}
		
		list res = parser.parser_base::readIdentifier(parser); parser = res[0]; ident = res[1];
		key ~= ident.value;
		
		/* Read attr */
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (token.content == "-")
		{
			list res = parser.parser_base::readIdentifier(look); parser = res[0]; ident = res[1];
			key ~= "-" ~ ident.value;
			
			/* Look next token */
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		/* Look token */
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == ":")
		{
			parser = look;
			key ~= ":";
			list res = parser.parser_base::readIdentifier(parser); parser = res[0]; ident = res[1];
			key ~= ident.value;
		}
		
		return [parser, key];
	}
	
	
	
	/**
	 * Read html attribute value
	 */
	pure list<ParserBay, BaseOpCode> readHTMLAttrValue(ParserBay parser, string attr_key)
	{
		CoreToken token = null;
		ParserBay look = null;
		BaseOpCode op_code = null;
		OpIdentifier ident = null;
		
		int pos = parser.caret.pos;
		Reference<string> content = parser.content;
		string ch = rs::substr(content.ref, pos, 1);
		string ch2 = rs::substr(content.ref, pos, 2);
		
		/* Look token */
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (rs::substr(attr_key, 0, 7) == "@event:")
		{
			/* Look token */
			list res = parser.parser_base::lookToken(parser, "{");
			ParserBay look = res[0]; CoreToken token = res[1]; bool is_fn = res[2];
			
			if (is_fn)
			{
				list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
				
				/* Look token */
				list res = parser.parser_base::lookToken(parser, "{");
				ParserBay look = res[0]; CoreToken token = res[1]; bool find = res[2];
				if (find)
				{
					parser = look;
				}
				
				/* Add msg to vars */
				Dict<bool> parser_vars = parser.vars;
				parser <= vars <= parser.vars.concat({
					"component": true,
					"msg": true,
				});
				
				/* Read expression */
				list res = parser.parser_expression::readExpression(parser);
				parser = res[0]; op_code = res[1];
				
				/* Restore vars */
				parser <= vars <= parser_vars;
				
				/* Parse brackets */
				list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
				if (find)
				{
					list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
				}
			}
			else
			{
				list res = parser.parser_base::readString(parser);
				parser = res[0]; op_code = res[1];
			}
		}
		else if (ch == "{")
		{
			list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
			
			/* Look token */
			list res = parser.parser_base::lookToken(parser, "{");
			ParserBay look = res[0]; CoreToken token = res[1]; bool find = res[2];
			if (find)
			{
				parser = look;
			}
			
			list res = parser.parser_expression::readExpression(parser);
			parser = res[0]; op_code = res[1];
			list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
			
			if (find)
			{
				list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
			}
		}
		else if (token.content == "@")
		{
			list res = static::readHTMLValue(parser);
			parser = res[0]; op_code = res[1];
		}
		else if (token.content == "[")
		{
			list res = parser.parser_base::readCollection(parser);
			parser = res[0]; op_code = res[1];
		}
		else
		{
			list res = parser.parser_base::readString(parser);
			parser = res[0]; op_code = res[1];
		}
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read html attributes
	 */
	pure list<ParserBay, BaseOpCode> readHTMLAttrs(ParserBay parser)
	{
		Vector<OpHtmlAttribute> items = new Vector();
		
		CoreToken token = null;
		ParserBay look = null;
		Reference<string> content = parser.content;
		int content_sz = parser.content_sz;
		Caret caret = parser.parser_base::skipChar(parser, content, parser.caret);
		string ch = rs::substr(content.ref, caret.pos, 1);
		while (ch != "/" and ch != ">" and caret.pos < content_sz)
		{
			Caret caret_start = caret;
			parser <= caret <= caret;
			
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "...")
			{
				OpIdentifier ident = null;
				list res = parser.parser_base::matchToken(parser, "..."); parser = res[0];
				list res = parser.parser_base::readIdentifier(look); parser = res[0]; ident = res[1];
				items.pushValue
				(
					new OpHtmlAttribute
					{
						"value": ident,
						"is_spread": true,
						"caret_start": caret_start,
						"caret_end": parser.caret,
					}
				);
			}
			else
			{
				list res = static::readHTMLAttrKey(parser); parser = res[0]; string key = res[1];
				list res = parser.parser_base::matchToken(parser, "="); parser = res[0];
				list res = static::readHTMLAttrValue(parser, key);
				parser = res[0]; BaseOpCode value = res[1];
				items.pushValue
				(
					new OpHtmlAttribute
					{
						"key": key,
						"value": value,
						"caret_start": caret_start,
						"caret_end": parser.caret,
					}
				);
			}
			caret = parser.parser_base::skipChar(parser, content, parser.caret);
			ch = rs::substr(content.ref, caret.pos, 1);
			string ch2 = rs::substr(content.ref, caret.pos, 2);
			if (ch2 == "/>") break;
		}
		
		return [parser, items.toCollection()];
	}
	
	
	
	/**
	 * Read html template
	 */
	pure list<ParserBay, Collection> readHTMLContent(ParserBay parser, string end_tag)
	{
		Vector<BaseOpCode> items = new Vector();
		BaseOpCode item = null;
		CoreToken token = null;
		ParserBay look = null;
		Caret caret = null;
		Caret caret_start = parser.caret;
		Reference<string> content = parser.content;
		int content_sz = parser.content_sz;
		int pos = parser.caret.pos;
		int x = parser.caret.x;
		int y = parser.caret.y;
		int start_pos = pos;
		int end_tag_sz = rs::strlen(end_tag);
		string ch_pos = rs::substr(content.ref, pos, end_tag_sz);
		bool flag_first = true;
		bool first_html_tag = false;
		if (end_tag == "") first_html_tag = true;
		while ( ( end_tag == "" or (end_tag != "" and ch_pos != end_tag) ) and pos < content_sz)
		{
			string ch = rs::substr(content.ref, pos, 1);
			string ch2 = rs::substr(content.ref, pos, 2);
			string ch3 = rs::substr(content.ref, pos, 3);
			string ch4 = rs::substr(content.ref, pos, 4);
			string ch6 = rs::substr(content.ref, pos, 6);
			string ch7 = rs::substr(content.ref, pos, 7);
			
			/* Html comment */
			if (ch4 == "<!--")
			{
				string value = rs::substr(content.ref, start_pos, pos - start_pos);
				caret = new Caret{ "x": x, "y": y, "pos": pos };
				value = rs::trim(value, "\t\r\n");
				value = rs::trim(value, " ");
				if (value != "")
				{
					item = new OpHtmlContent
					{
						"value": value,
						"caret_start": caret_start,
						"caret_end": caret,
					}
					items.pushValue(item);
				}
				
				/* Read HTML Comment */
				parser <= caret <= caret;
				list res = static::readHTMLComment(parser);
				parser = res[0]; items.pushValue( res[1] );
				
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			
			/* If html or tag */
			else if (ch == "<" or ch2 == "{{" or ch == "@")
			{
				string value = rs::substr(content.ref, start_pos, pos - start_pos);
				caret = new Caret{ "x": x, "y": y, "pos": pos };
				value = rs::trim(value, "\t\r\n");
				
				if (flag_first and first_html_tag) value = rs::trim(value, " ");
				if (value != "")
				{
					item = new OpHtmlContent
					{
						"value": value,
						"caret_start": caret_start,
						"caret_end": caret,
					}
					items.pushValue(item);
				}
				
				/* Read HTML Value */
				parser <= caret <= caret;
				list res = static::readHTMLValue(parser);
				parser = res[0]; item = res[1];
				items.pushValue(item);
				
				/* Set pos, x, y */
				caret_start = parser.caret;
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			
			/* If html operator */
			else if (
				ch3 == "%if" or ch4 == "%for" or ch4 == "%var" or
				ch4 == "%set" or ch6 == "%while" or ch7 == "%render"
			)
			{
				string value = rs::substr(content.ref, start_pos, pos - start_pos);
				caret = new Caret{ "x": x, "y": y, "pos": pos };
				value = rs::trim(value, "\t\r\n");
				value = rs::trim(value, " ");
				if (value != "")
				{
					item = new OpHtmlContent
					{
						"value": value,
						"caret_start": caret_start,
						"caret_end": caret,
					}
					items.pushValue(item);
				}
				
				/* Read HTML Operator */
				parser <= caret <= caret;
				list res = static::readHTMLOperator(parser);
				parser = res[0]; item = res[1];
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
				if (first_html_tag and ch != " " and ch != "\t" and ch != "\r" and ch != "\n")
				{
					break;
				}
				x = parser.parser_base::nextX(parser, ch, x);
				y = parser.parser_base::nextY(parser, ch, y);
				pos = pos + 1;
			}
			ch_pos = rs::substr(content.ref, pos, end_tag_sz);
		}
		
		/* Push item */
		string value = rs::substr(content.ref, start_pos, pos - start_pos);
		value = rs::trim(value, "\t\r\n");
		caret = new Caret{ "x": x, "y": y, "pos": pos };
		if (first_html_tag) value = rs::trim(value, " ");
		if (value != "")
		{
			item = new OpHtmlContent
			{
				"value": value,
				"caret_start": caret_start,
				"caret_end": caret,
			}
			items.pushValue(item);
		}
		
		return [ parser.copy{ "caret": caret }, items ];
	}
	
	
	
	/**
	 * Read html tag
	 */
	pure list<ParserBay, BaseOpCode> readHTMLTag(ParserBay parser)
	{
		CoreToken token = null;
		ParserBay look = null;
		OpIdentifier ident = null;
		Caret caret_items_start = null, caret_items_end = null;
		Caret caret_start = parser.caret;
		Collection<BaseOpCode> items = null;
		BaseOpCode op_code_name = null;
		bool is_single_flag = false;
		bool op_code_flag = false;
		string tag_name = "";
		
		/* Tag start */
		list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
		
		/* Look token */
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "{")
		{
			op_code_flag = true;
			Caret caret1 = parser.caret;
			list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
			list res = parser.parser_expression::readExpression(parser);
			parser = res[0]; op_code_name = res[1];
			list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
			Caret caret2 = parser.caret;
			tag_name = rs::substr(parser.content.ref, caret1.pos, caret2.pos - caret1.pos);
		}
		else if (token.content == ">")
		{
			op_code_flag = true;
			tag_name = "";
		}
		else
		{
			list res = parser.parser_base::readIdentifier(parser, false);
			parser = res[0]; ident = res[1];
			tag_name = ident.value;
		}
		
		list res = static::readHTMLAttrs(parser);
		parser = res[0]; Collection<OpHtmlAttribute> attrs = res[1];
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "/")
		{
			parser = look;
			is_single_flag = true;
		}
		list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
		
		if (not is_single_flag)
		{
			if (tag_name == "svg")
			{
				list res = parser.parser_base::readUntilStringArr(parser, ["</svg>"], false);
				parser = res[0];
				string content = res[1];
				content = re::replace("[\t\n]", "", content);
				
				Collection<BaseOpCode> items =
				[
					new OpHtmlValue
					{
						"kind": OpHtmlValue::KIND_RAW,
						"value": new OpString
						{
							"caret_start": parser.caret,
							"caret_end": parser.caret,
							"value": content,
						},
						"caret_start": caret_start,
						"caret_end": parser.caret,
					}
				];
				
			}
			else
			{
				/* Read items */
				caret_items_start = parser.caret;
				list res = static::readHTMLContent(parser, "</" ~ tag_name);
				parser = res[0]; Collection<BaseOpCode> items = res[1];
				caret_items_end = parser.caret;
			}
			
			/* Tag end */
			if (op_code_flag)
			{
				list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
				list res = parser.parser_base::matchToken(parser, "/"); parser = res[0];
				if (tag_name)
				{
					list res = parser.parser_base::matchString(parser, tag_name); parser = res[0];
				}
				list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
			}
			else
			{
				list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
				list res = parser.parser_base::matchToken(parser, "/"); parser = res[0];
				if (ident != null)
				{
					list res = parser.parser_base::matchToken(parser, tag_name); parser = res[0];
				}
				list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
			}
		}
		
		OpHtmlTag op_code = new OpHtmlTag
		{
			"attrs": attrs,
			"tag_name": tag_name,
			"op_code_name": op_code_name,
			"caret_start": caret_start,
			"caret_end": parser.caret,
			"items": (items != null) ? new OpHtmlItems
			{
				"caret_start": caret_items_start,
				"caret_end": caret_items_end,
				"items": items.toCollection()
			} : null,
		};
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read html operator
	 */
	pure list<ParserBay, BaseOpCode> readHTMLOperator(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		
		if (token.content == "%if")
		{
			return parser.parser_operator::readIf(parser);
		}
		else if (token.content == "%for")
		{
			return parser.parser_operator::readFor(parser);
		}
		else if (token.content == "%while")
		{
			return parser.parser_operator::readWhile(parser);
		}
		else if (token.content == "%var")
		{
			BaseOpCode op_code = null;
			list res = parser.parser_base::matchToken(parser, "%var"); parser = res[0];
			list res = parser.parser_operator::readAssign(parser); parser = res[0]; op_code = res[1];
			list res = parser.parser_base::matchToken(parser, ";"); parser = res[0];
			return [parser, op_code];
		}
		else if (token.content == "%set")
		{
			BaseOpCode op_code = null;
			list res = parser.parser_base::matchToken(parser, "%set"); parser = res[0];
			list res = parser.parser_operator::readAssign(parser); parser = res[0]; op_code = res[1];
			list res = parser.parser_base::matchToken(parser, ";"); parser = res[0];
			return [parser, op_code];
		}
		else if (token.content == "%render")
		{
			BaseOpCode op_code = null;
			list res = parser.parser_base::matchToken(parser, "%render"); parser = res[0];
			list res = parser.parser_base::readDynamic(parser);
			parser = res[0]; op_code = res[1];
			if (op_code instanceof OpCall)
			{
				op_code <= is_html <= true;
			}
			list res = parser.parser_base::matchToken(parser, ";"); parser = res[0];
			return [parser, op_code];
		}
		
		return [parser, null];
	}
	
	
	
	/**
	 * Read html operator
	 */
	pure list<ParserBay, BaseOpCode> readHTML(ParserBay parser, string end_tag = "")
	{
		Caret caret_start = parser.caret;
		
		/* Enable html flag */
		bool save_is_html = parser.is_html;
		parser <= is_html <= true;
		
		list res = static::readHTMLContent(parser, end_tag);
		parser = res[0]; Collection<BaseOpCode> items = res[1];
		
		OpHtmlItems op_code = new OpHtmlItems
		{
			"caret_start": caret_start,
			"caret_end": parser.caret,
			"items": items,
		}
		
		/* Disable html flag */
		parser <= is_html <= save_is_html;
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read html operator
	 */
	pure list<ParserBay, BaseOpCode> readHTMLTemplate(
		ParserBay parser, Dict item_attrs, Caret caret_start
	)
	{
		string fn_name = item_attrs.get("name", "render");
		string fn_args_str = item_attrs.get("args", "");
		Dict<bool> parser2_vars = {};
		
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
		Collection<OpDeclareFunctionArg> fn_args = [];
		
		if (item_attrs.has("args"))
		{
			ParserBay parser2 = parser::setContent(parser, fn_args_str);
			parser2 <= caret <= new Caret{};
			
			/* Parse args */
			list res = parser.parser_operator::readDeclareFunctionArgs(parser2, false, false);
			parser2 = res[0]; Collection<OpDeclareFunctionArg> fn_args2 = res[1];
			parser2_vars = parser2.vars;
			
			fn_args = fn_args.concat(fn_args2);
		}
		
		/* Register variable in parser */
		parser2_vars = parser2_vars
			.setIm("layout", true)
			.setIm("model", true)
			.setIm("model_path", true)
			.setIm("render_params", true)
			.setIm("render_content", true)
		;
		
		/* Read template content */
		Dict<bool> save_vars = parser.vars;
		parser <= vars <= parser.vars.concat(parser2_vars);
		list res = static::readHTML(parser, "</template"); parser = res[0];
		BaseOpCode expression = res[1];
		parser <= vars <= save_vars;
		
		/* Read template footer */
		list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "/"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "template"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
		
		OpDeclareFunction f = new OpDeclareFunction
		{
			"args": fn_args,
			"vars": [],
			"flags": new OpFlags
			{
				"p_static": true,
				"p_pure": true,
			},
			"name": fn_name,
			"result_type": "html",
			"is_html": true,
			"expression": expression,
			"items": null,
			"caret_start": caret_start,
			"caret_end": parser.caret,
		};
		
		return [parser, f];
	}
	
	
	/**
	 * Read html attributes
	 */
	pure list<ParserBay, Dict> readAttrs(ParserBay parser)
	{
		ParserBay look = null;
		BaseOpCode op_code = null;
		CoreToken token = null;
		CoreToken look_token = null;
		Map items = new Map();
		Reference<string> content = parser.content;
		int content_sz = parser.content_sz
		Caret caret = parser.parser_base::skipChar(parser, content, parser.caret);
		string ch = rs::substr(content.ref, caret.pos, 1);
		while (ch != "/" and ch != ">" and caret.pos < content_sz)
		{
			list res = parser.parser_base::readToken(parser);
			parser = res[0]; token = res[1];
			
			list res = parser.parser_base::matchToken(parser, "="); parser = res[0];
			string attr_name = token.content;
			
			/* Look token */
			list res = parser.parser_base::readToken(parser); look_token = res[1];
			if (look_token.content == "{")
			{
				list res = parser.parser_base::readDict(parser);
				parser = res[0]; op_code = res[1];
				
				caret = parser.caret;
				items.setValue(attr_name, op_code);
			}
			else
			{
				list res = parser.parser_base::readString(parser);
				parser = res[0]; op_code = res[1];
				
				items.setValue(attr_name, op_code.value);
			}
			
			caret = parser.parser_base::skipChar(parser, content, parser.caret);
			ch = rs::substr(content.ref, caret.pos, 1);
			string ch2 = rs::substr(content.ref, caret.pos, 2);
			if (ch2 == "/>") break;
		}
		return [parser, items.toDict()];
	}
	
	
	
	/**
	 * Read UI
	 */
	pure list<ParserBay, BaseOpCode> readUIClass(ParserBay parser)
	{
		Vector<BaseOpCode> items = new Vector();
		Vector<string> components = new Vector();
		Caret class_caret_start = parser.caret;
		CoreToken token = null;
		
		string class_name = "", class_extends = "", class_version = "", class_model = "",
			item_name = "", namespace_name = "";
		string short_name = "", full_name = "", is_component = "", class_name_last = "";
		Vector class_annotations = new Vector();
		
		/* Content */
		Reference<string> content = parser.content;
		int content_sz = parser.content_sz;
		
		/* Read class header */
		list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "class"); parser = res[0];
		list res = static::readAttrs(parser); parser = res[0]; Dict attrs = res[1];
		class_name = attrs.get("name", "");
		class_extends = attrs.get("extends", "Runtime.Web.Component");
		class_version = attrs.get("version", "1.0");
		class_model = attrs.get("model", "Runtime.Dict");
		list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
		
		fn getClassShortName = string (string class_name) =>
			class_name |>
			curry rs::split("\\.", ?) |>
			.last()
		;
		
		if (class_name != "")
		{
			parser <= uses <= parser.uses.setIm( getClassShortName(class_name), class_name );
		}
		if (class_extends != "")
		{
			parser <= uses <= parser.uses.setIm( getClassShortName(class_extends), class_extends );
			if (class_extends != "Runtime.Web.Component") components.pushValue(class_extends);
		}
		if (class_model != "" and class_model != "Runtime.Dict")
		{
			parser <= uses <= parser.uses.setIm( getClassShortName(class_model), class_model );
		}
		
		Collection class_name_arr = rs::split("\\.", class_name);
		class_name_last = class_name_arr.last();
		class_name_arr = class_name_arr.removeLastIm();
		namespace_name = rs::join(".", class_name_arr);
		
		parser <= current_class_name <= class_name_last;
		parser <= current_namespace_name <= namespace_name;
		
		OpTypeIdentifier class_extend_op_code = new OpTypeIdentifier
		{
			"entity_name": new OpEntityName
			{
				"caret_start": class_caret_start,
				"caret_end": parser.caret,
				"names": rs::split("\\.", class_extends),
			},
			"template": null,
			"caret_start": class_caret_start,
			"caret_end": parser.caret,
		}
		
		/* Read class body */
		Caret caret = parser.parser_base::skipChar(parser, content, parser.caret);
		string ch2 = rs::substr(content.ref, caret.pos, 2);
		while (ch2 != "</" and caret.pos < content_sz)
		{
			ParserBay parser_start = parser;
			Caret caret_start = parser.caret;
			list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
			list res = parser.parser_base::readToken(parser); parser = res[0]; CoreToken item_token = res[1];
			item_name = item_token.content;
			
			/* Html comment */
			if (item_name == "!--")
			{
				list res = static::readHTMLComment(parser_start);
				parser = res[0]; items.pushValue( res[1] );
				caret = parser.parser_base::skipChar(parser, content, parser.caret);
				ch2 = rs::substr(content.ref, caret.pos, 2);
				continue;
			}
			
			list res = static::readAttrs(parser);
			parser = res[0]; Dict item_attrs = res[1];
			
			if (item_name == "annotation")
			{
				string annotation_name = item_attrs.get("name", "");
				BaseOpCode annotation_op_code = item_attrs.get("value", null);
				class_annotations.pushValue
				(
					new OpAnnotation
					{
						"name": new OpTypeIdentifier
						{
							"entity_name": new OpEntityName
							{
								"names": rs::split("\\.", annotation_name),
							},
						},
						"params": annotation_op_code,
					}
				);
			}
			else if (item_name == "use")
			{
				full_name = item_attrs.get("name", "");
				short_name = item_attrs.get("as", "");
				is_component = item_attrs.get("component", "false");
				if (short_name == "") short_name = rs::explode(".", full_name).last();
				parser <= uses <= parser.uses.setIm(short_name, full_name);
				if (is_component == "true" or is_component == "1")
				{
					components.pushValue(full_name);
				}
			}
			
			/* Read body */
			list res = parser.parser_base::readToken(parser); parser = res[0]; token = res[1];
			if (token.content == ">")
			{
				if (item_name == "template")
				{
					list res = static::readHTMLTemplate(parser, item_attrs, caret_start);
					parser = res[0]; BaseOpCode op_code = res[1];
					items.pushValue(op_code);
				}
				else if (item_name == "style")
				{
					list res = static::readStyle(parser, item_attrs, items, caret_start);
					parser = res[0]; BaseOpCode op_code = res[1]; int find_pos = res[2];
					
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
					list res = parser.parser_program::readClassBody(parser, "</");
					parser = res[0]; Collection<BaseOpCode> arr = res[1];
					items.appendVector(arr);
					
					/* Read script footer */
					list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
					list res = parser.parser_base::matchToken(parser, "/"); parser = res[0];
					list res = parser.parser_base::matchToken(parser, "script"); parser = res[0];
					list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
				}
				
				else if (item_name == "meta")
				{
					list res = parser.parser_base::readDict(parser);
					parser = res[0]; BaseOpCode arr = res[1];
					
					/* Read meta footer */
					list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
					list res = parser.parser_base::matchToken(parser, "/"); parser = res[0];
					list res = parser.parser_base::matchToken(parser, "meta"); parser = res[0];
					list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
				}
				
				else
				{
					throw new ParserError
					(
						"Unknown identifier '" ~ item_name ~ "'",
						item_token.caret_start, parser.file_name
					);
				}
			}
			
			else if (token.content == "/")
			{
				list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
			}
			else
			{
				throw new ParserError
				(
					"Unknown identifier '" ~ token.content ~ "'",
					token.caret_start, parser.file_name
				);
			}
			
			caret = parser.parser_base::skipChar(parser, content, parser.caret);
			ch2 = rs::substr(content.ref, caret.pos, 2);
		}
		
		/* Add components function */
		if (components.count() > 0)
		{
			OpDeclareFunction f = new OpDeclareFunction
			{
				"args": [],
				"vars": [],
				"flags": new OpFlags
				{
					"p_static": true,
					"p_pure": true,
				},
				"name": "components",
				"result_type": "var",
				"expression": new OpCollection
				{
					"caret_start": parser.caret,
					"caret_end": parser.caret,
					"values":
						components
							.toCollection()
							.map
							(
								OpString (string class_name) use (parser) =>
									new OpString
									{
										"caret_start": parser.caret,
										"caret_end": parser.caret,
										"value": class_name,
									}
							)
					,
				},
				"items": null,
				"caret_start": parser.caret,
				"caret_end": parser.caret,
			};
			
			items.pushValue(f);
		}
		
		/* Read class footer */
		list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "/"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "class"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
		
		/* Analyze class body */
		Dict class_body = parser.parser_program::classBodyAnalyze(parser, items);
		
		return
		[
			parser,
			[
				new OpNamespace
				{
					"name": namespace_name,
				},
				new OpDeclareClass
				{
					"kind": OpDeclareClass::KIND_CLASS,
					"name": class_name_last,
					"is_static": true,
					"is_declare": false,
					"class_extends": class_extend_op_code,
					"class_implements": null,
					"annotations": [],
					"template": null,
					"vars": class_body.item("vars"),
					"annotations": class_annotations.toCollection(),
					"functions": class_body.item("functions"),
					"fn_create": class_body.item("fn_create"),
					"fn_destroy": class_body.item("fn_destroy"),
					"items": items,
					"caret_start": class_caret_start,
					"caret_end": parser.caret,
				}
			]
		];
	}
	
	
	
	/**
	 * Read UI
	 */
	pure list<ParserBay, BaseOpCode> readUI(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		Vector<BaseOpCode> items = new Vector();
		
		parser <= skip_comments <= false;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		parser <= skip_comments <= true;
		
		while (token.content == "<")
		{
			ParserBay parser_start = parser;
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			
			if (token.content == "class")
			{
				list res = static::readUIClass(parser_start);
				parser = res[0];
				items.appendVector( res[1] );
			}
			else if (token.content == "!--")
			{
				list res = static::readHTMLComment(parser_start);
				parser = res[0];
				items.pushValue( res[1] );
			}
			
			parser <= skip_comments <= false;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			parser <= skip_comments <= true;
		}
		
		
		return
		[
			parser,
			new OpModule
			{
				"uses": parser.uses.toDict(),
				"items": items.toCollection(),
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
}

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

namespace Bayrell.Lang.LangBay;

use Runtime.Reference;
use Bayrell.Lang.Caret;
use Bayrell.Lang.CoreToken;
use Bayrell.Lang.Exceptions.ParserError;
use Bayrell.Lang.Exceptions.ParserExpected;
use Bayrell.Lang.LangBay.ParserBay;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpAssignStruct;
use Bayrell.Lang.OpCodes.OpAssignValue;
use Bayrell.Lang.OpCodes.OpAttr;
use Bayrell.Lang.OpCodes.OpBreak;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpContinue;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
use Bayrell.Lang.OpCodes.OpDelete;
use Bayrell.Lang.OpCodes.OpFlags;
use Bayrell.Lang.OpCodes.OpFor;
use Bayrell.Lang.OpCodes.OpIdentifier;
use Bayrell.Lang.OpCodes.OpIf;
use Bayrell.Lang.OpCodes.OpIfElse;
use Bayrell.Lang.OpCodes.OpInc;
use Bayrell.Lang.OpCodes.OpItems;
use Bayrell.Lang.OpCodes.OpPipe;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpReturn;
use Bayrell.Lang.OpCodes.OpSafe;
use Bayrell.Lang.OpCodes.OpThrow;
use Bayrell.Lang.OpCodes.OpTryCatch;
use Bayrell.Lang.OpCodes.OpTryCatchItem;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;
use Bayrell.Lang.OpCodes.OpWhile;


static class ParserBayOperator
{
	
	
	/**
	 * Read return
	 */
	pure list<ParserBay, BaseOpCode> readReturn(ParserBay parser)
	{
		CoreToken token = null;
		BaseOpCode op_code = null;
		ParserBay look = null;
		
		list res = parser.parser_base::matchToken(parser, "return"); parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content != ";")
		{
			list res = parser.parser_expression::readExpression(parser); parser = res[0]; op_code = res[1];
		}		
		
		return
		[
			parser,
			new OpReturn
			{
				"expression": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read delete
	 */
	pure list<ParserBay, BaseOpCode> readDelete(ParserBay parser)
	{
		CoreToken token = null;
		BaseOpCode op_code = null;
		
		list res = parser.parser_base::matchToken(parser, "delete"); parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = parser.parser_base::readDynamic(parser); parser = res[0]; op_code = res[1];
		
		return
		[
			parser,
			new OpDelete
			{
				"op_code": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read throw
	 */
	pure list<ParserBay, BaseOpCode> readThrow(ParserBay parser)
	{
		CoreToken token = null;
		BaseOpCode op_code = null;
		
		list res = parser.parser_base::matchToken(parser, "throw"); parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = parser.parser_expression::readExpression(parser); parser = res[0]; op_code = res[1];
		
		return
		[
			parser,
			new OpThrow
			{
				"expression": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read try
	 */
	pure list<ParserBay, BaseOpCode> readTry(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_try = null;
		Vector<OpTryCatchItem> items = new Vector();
		
		list res = parser.parser_base::matchToken(parser, "try"); parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		/* Try */
		list res = static::readOperators(parser); parser = res[0]; op_try = res[1];
		
		/* Catch */
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and token.content == "catch")
		{
			parser = look;
			
			BaseOpCode op_catch = null;
			BaseOpCode var_op_code = null;
			OpTypeIdentifier pattern = null;
			Caret item_caret_start = token.caret_start;
			
			/* Read ident */
			list res = parser.parser_base::matchToken(parser, "("); parser = res[0];
			list res = parser.parser_base::readTypeIdentifier(parser); parser = res[0]; pattern = res[1];
			list res = parser.parser_base::readIdentifier(parser); parser = res[0]; var_op_code = res[1];
			string var_name = var_op_code.value;
			list res = parser.parser_base::matchToken(parser, ")"); parser = res[0];
			
			/* Save vars */
			Dict<bool> save_vars = parser.vars;
			parser <= vars <= parser.vars.setIm(var_name, true);
			
			/* Catch operators */
			list res = static::readOperators(parser); parser = res[0]; op_catch = res[1];
			
			/* Restore vars */
			parser <= vars <= save_vars;
			
			OpTryCatchItem item = new OpTryCatchItem
			{
				"name": var_name,
				"pattern": pattern,
				"value": op_catch,
				"caret_start": item_caret_start,
				"caret_end": parser.caret,
			};
			items.pushValue(item);
			
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return
		[
			parser,
			new OpTryCatch
			{
				"op_try": op_try,
				"items": items.toCollection(),
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read then
	 */
	pure list<ParserBay, CoreToken> readThen(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "then")
		{
			return [look, token];
		}
		return [parser, token];
	}
	
	
	
	/**
	 * Read do
	 */
	pure list<ParserBay, CoreToken> readDo(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "do")
		{
			return [look, token];
		}
		return [parser, token];
	}
	
	
	
	/**
	 * Read if
	 */
	pure list<ParserBay, BaseOpCode> readIf(ParserBay parser)
	{
		ParserBay look = null;
		ParserBay look2 = null;
		CoreToken token = null;
		CoreToken token2 = null;
		
		BaseOpCode if_condition = null;
		BaseOpCode if_true = null;
		BaseOpCode if_false = null;
		Vector<OpIfElse> if_else = new Vector();
		
		list res = parser.parser_base::matchToken(parser, parser.is_html ? "%if" : "if");
		parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		/* Read expression */
		list res = parser.parser_base::matchToken(parser, "("); parser = res[0];
		list res = parser.parser_expression::readExpression(parser); parser = res[0]; if_condition = res[1];
		list res = parser.parser_base::matchToken(parser, ")"); parser = res[0];
		list res = static::readThen(parser); parser = res[0];
		
		/* If true */
		list res = static::readOperators(parser); parser = res[0]; if_true = res[1];
		
		/* Else */
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while
			(
			not token.eof and
			(
				parser.is_html and (token.content == "%else" or token.content == "%elseif") or
				not parser.is_html and (token.content == "else" or token.content == "elseif")
			)
		)
		{
			list res = parser.parser_base::readToken(look); look2 = res[0]; token2 = res[1];
			if (
				token.content == "%elseif" or token.content == "elseif" or
				(token.content == "else" and token2.content == "if") or
				(token.content == "%else" and token2.content == "if")
			)
			{
				BaseOpCode ifelse_condition = null;
				BaseOpCode ifelse_block = null;
				
				if (token.content == "elseif") parser = look;
				else if (token2.content == "%elseif") parser = look2;
				else if (token2.content == "if") parser = look2;
				else if (token2.content == "%if") parser = look2;
				
				/* Read expression */
				list res = parser.parser_base::matchToken(parser, "("); parser = res[0];
				list res = parser.parser_expression::readExpression(parser); 
				parser = res[0]; ifelse_condition = res[1];
				list res = parser.parser_base::matchToken(parser, ")"); parser = res[0];
				
				list res = static::readThen(parser); parser = res[0];
				list res = static::readOperators(parser); parser = res[0]; ifelse_block = res[1];
				
				if_else.pushValue
				(
					new OpIfElse
					{
						"condition": ifelse_condition,
						"if_true": ifelse_block,
						"caret_start": token2.caret_start,
						"caret_end": parser.caret,
					}
				);
			}
			else
			{
				list res = static::readOperators(look); parser = res[0]; if_false = res[1];
				break;
			}
			
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return 
		[
			parser,
			new OpIf
			{
				"condition": if_condition,
				"if_true": if_true,
				"if_false": if_false,
				"if_else": if_else.toCollection(),
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read For
	 */
	pure list<ParserBay, BaseOpCode> readFor(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		BaseOpCode expr1 = null;
		BaseOpCode expr2 = null;
		BaseOpCode expr3 = null;
		
		/* Save vars */
		Dict<bool> save_vars = parser.vars;
		
		list res = parser.parser_base::matchToken(parser, parser.is_html ? "%for" : "for");
		parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = parser.parser_base::matchToken(parser, "("); parser = res[0]; token = res[1];
		list res = static::readAssign(parser); parser = res[0]; expr1 = res[1];
		
		list res = parser.parser_base::matchToken(parser, ";"); parser = res[0]; token = res[1];
		list res = parser.parser_expression::readExpression(parser); parser = res[0]; expr2 = res[1];
		
		list res = parser.parser_base::matchToken(parser, ";"); parser = res[0]; token = res[1];
		list res = static::readOperator(parser); parser = res[0]; expr3 = res[1];
		
		list res = parser.parser_base::matchToken(parser, ")"); parser = res[0]; token = res[1];
		list res = static::readOperators(parser); parser = res[0]; op_code = res[1];
		
		/* Restore vars */
		parser <= vars <= save_vars;
		
		return
		[
			parser,
			new OpFor
			{
				"expr1": expr1,
				"expr2": expr2,
				"expr3": expr3,
				"value": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read While
	 */
	pure list<ParserBay, BaseOpCode> readWhile(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode condition = null;
		BaseOpCode op_code = null;
		
		list res = parser.parser_base::matchToken(parser, parser.is_html ? "%while" : "while");
		parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = parser.parser_base::matchToken(parser, "("); parser = res[0];
		list res = parser.parser_expression::readExpression(parser); parser = res[0]; condition = res[1];
		list res = parser.parser_base::matchToken(parser, ")"); parser = res[0];
		
		list res = static::readDo(parser); parser = res[0]; token = res[1];
		list res = static::readOperators(parser); parser = res[0]; op_code = res[1];
		
		return
		[
			parser,
			new OpWhile
			{
				"condition": condition,
				"value": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read While
	 */
	pure list<ParserBay, BaseOpCode> readSafe(ParserBay parser)
	{
		Caret caret_start = parser.caret;
		list res = parser.parser_base::matchToken(parser, "safe"); parser = res[0];
		list res = parser.parser_base::matchToken(parser, "("); parser = res[0];
		list res = parser.parser_base::readDynamic(parser); parser = res[0]; BaseOpCode obj = res[1];
		list res = parser.parser_base::matchToken(parser, ")"); parser = res[0];
		list res = static::readOperators(parser); parser = res[0]; BaseOpCode items = res[1];
		
		return
		[
			parser,
			new OpSafe
			{
				"obj": obj,
				"items": items,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read assign
	 */
	pure list<ParserBay, BaseOpCode> readAssign(ParserBay parser)
	{
		ParserBay start = parser;
		ParserBay save = null;
		ParserBay look = null;
		CoreToken token = null;
		OpTypeIdentifier pattern = null;
		BaseOpCode op_code = null;
		BaseOpCode reg_name = null;
		BaseOpCode expression = null;
		Collection<var> names = null;
		Vector<OpAssignValue> values = null;
		string kind = OpAssign::KIND_ASSIGN;
		string var_name = "";
		
		list res = parser.parser_base::readIdentifier(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		var_name = op_code.value;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "<=")
		{
			Vector<string> arr = new Vector();
			
			while (not token.eof and token.content == "<=")
			{
				var name = "";
				parser = look; save = parser;
				
				list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
				if (token.content == "{")
				{
					list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
					list res = parser.parser_expression::readExpression(parser);
					parser = res[0]; name = res[1];
					list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
				}
				else if (token.content == '"' or token.content == "'")
				{
					list res = parser.parser_base::readString(parser); parser = res[0]; name = res[1];
				}
				else
				{
					list res = parser.parser_base::readToken(parser); parser = res[0]; token = res[1];
					name = token.content;
				}
				
				list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
				if (token.content != "<=")
				{
					parser = save;
					break;
				}
				else
				{
					arr.pushValue( name );
				}
			}
			
			names = arr.toCollection();
			list res = parser.parser_expression::readExpression(parser); parser = res[0]; expression = res[1];
			return 
			[
				parser,
				new OpAssignStruct
				{
					"caret_start": caret_start,
					"caret_end": parser.caret,
					"expression": expression,
					"var_name": var_name,
					"names": names,
				}
			];
		}
		
		if 
		(
			token.content != "=" and token.content != "+=" and token.content != "-=" and
			token.content != "~=" and token.content != "." and token.content != "::" and token.content != "["
		)
		{
			BaseOpCode var_op_code = null;
			kind = OpAssign::KIND_DECLARE;
			values = new Vector<OpAssignValue>();
			parser = start;
			
			list res = parser.parser_base::readTypeIdentifier(parser);
			parser = res[0]; pattern = res[1];
			
			list res = parser.parser_base::readIdentifier(parser);
			parser = res[0]; var_op_code = res[1];
			
			var_name = var_op_code.value;
			
			/* Read expression */
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "=")
			{
				list res = parser.parser_expression::readExpression(look);
				parser = res[0]; expression = res[1];					
			}
			else
			{
				expression = null;
			}
			
			parser <= vars <= parser.vars.setIm(var_name, true);
			values.pushValue
			(
				new OpAssignValue
				{
					"var_name": var_name,
					"expression": expression,
					"caret_start": var_op_code.caret_start,
					"caret_end": parser.caret,
				}
			);
			
			
			/* Look next token */
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			while (not token.eof and token.content == ",")
			{
				list res = parser.parser_base::readIdentifier(look); parser = res[0]; var_op_code = res[1];
				var_name = var_op_code.value;
				
				/* Read expression */
				list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
				if (token.content == "=")
				{
					list res = parser.parser_expression::readExpression(look);
					parser = res[0]; expression = res[1];					
				}
				else
				{
					expression = null;
				}
				
				parser <= vars <= parser.vars.setIm(var_name, true);
				values.pushValue
				(
					new OpAssignValue
					{
						"var_name": var_name,
						"expression": expression,
						"caret_start": var_op_code.caret_start,
						"caret_end": parser.caret,
					}
				);
				
				list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			}
			
			var_name = "";
			expression = null;
		}
		else
		{
			parser = start;
			kind = OpAssign::KIND_ASSIGN;
			string op = "";
			
			list res = parser.parser_base::readDynamic(parser, 2 | 8);
			parser = res[0]; BaseOpCode op_code = res[1];
			
			list res = parser.parser_base::readToken(parser); parser = res[0]; token = res[1];
			if 
			(
				token.content == "=" or token.content == "+=" or token.content == "-=" or
				token.content == "~="
			)
			{
				op = token.content;
			}
			else
			{
				throw new ParserError
				(
					"Unknown operator " ~ token.content, token.caret_start, parser.file_name
				);
			}
			
			list res = parser.parser_expression::readExpression(parser);
			parser = res[0]; expression = res[1];
			
			values = [ new OpAssignValue{ "op_code": op_code, "expression": expression, "op": op } ];
			
			var_name = "";
			expression = null;
		}
		
		return 
		[
			parser,
			new OpAssign
			{
				"pattern": pattern,
				"values": (values != null) ? values.toCollection() : null,
				"caret_start": caret_start,
				"caret_end": parser.caret,
				"expression": expression,
				"var_name": var_name,
				"names": names,
				"kind": kind,
			}
		];
	}
	
	
	
	/**
	 * Read operator
	 */
	pure list<ParserBay, BaseOpCode> readInc(ParserBay parser)
	{
		ParserBay look = null;
		ParserBay look1 = null;
		ParserBay look2 = null;
		CoreToken token = null;
		CoreToken token1 = null;
		CoreToken token2 = null;
		
		list res = parser.parser_base::readToken(parser); look1 = res[0]; token1 = res[1];
		Caret caret_start = token1.caret_start;
		
		list res = parser.parser_base::readToken(look1); look2 = res[0]; token2 = res[1];
		
		string look1_content = token1.content;
		string look2_content = token2.content;
		
		if ((look1_content == "++" or look1_content == "--") and parser.parser_base::isIdentifier(look2_content))
		{
			parser = look2;
			BaseOpCode op_code = new OpIdentifier
			{
				"value": look2_content,
				"caret_start": token2.caret_start,
				"caret_end": token2.caret_end,
			};
			op_code = new OpInc
			{
				"kind": (look1_content == "++") ? OpInc::KIND_PRE_INC : OpInc::KIND_PRE_DEC,
				"value": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			};
			return [parser, op_code];
		}
		
		if ((look2_content == "++" or look2_content == "--") and parser.parser_base::isIdentifier(look1_content))
		{
			parser = look2;
			BaseOpCode op_code = new OpIdentifier
			{
				"value": look1_content,
				"caret_start": token1.caret_start,
				"caret_end": token1.caret_end,
			};
			op_code = new OpInc
			{
				"kind": (look2_content == "++") ? OpInc::KIND_POST_INC : OpInc::KIND_POST_DEC,
				"value": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			};
			return [parser, op_code];
		}
		
		return [parser, null];
	}
	
	
	
	/**
	 * Read call function
	 */
	pure list<ParserBay, BaseOpCode> readCallFunction(ParserBay parser)
	{
		BaseOpCode op_code = null;
		list res = parser.parser_base::readDynamic(parser); parser = res[0]; op_code = res[1];
		
		if (op_code instanceof OpCall or op_code instanceof OpPipe)
		{
			return [parser, op_code];
		}
		
		return [parser, null];
	}
	
	
	
	/**
	 * Read operator
	 */
	pure list<ParserBay, BaseOpCode> readOperator(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		
		parser <= skip_comments <= false;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		parser <= skip_comments <= true;
		
		if (token.content == "/")
		{
			return parser.parser_base::readComment(parser);
		}
		else if (token.content == "#switch" or token.content == "#ifcode")
		{
			return parser.parser_preprocessor::readPreprocessor(parser);
		}
		else if (token.content == "#ifdef")
		{
			return parser.parser_preprocessor::readPreprocessorIfDef
			(
				parser, OpPreprocessorIfDef::KIND_OPERATOR
			);
		}
		else if (token.content == "break")
		{
			return
			[
				look,
				new OpBreak
				{
					"caret_start": caret_start,
					"caret_end": look.caret,
				}
			];
		}
		else if (token.content == "continue")
		{
			return
			[
				look,
				new OpContinue
				{
					"caret_start": caret_start,
					"caret_end": look.caret,
				}
			];
		}
		else if (token.content == "delete")
		{
			return static::readDelete(parser);
		}
		else if (token.content == "return")
		{
			return static::readReturn(parser);
		}
		else if (token.content == "throw")
		{
			return static::readThrow(parser);
		}
		else if (token.content == "try")
		{
			return static::readTry(parser);
		}
		else if (token.content == "if")
		{
			return static::readIf(parser);
		}
		else if (token.content == "for")
		{
			return static::readFor(parser);
		}
		else if (token.content == "while")
		{
			return static::readWhile(parser);
		}
		else if (token.content == "safe")
		{
			return static::readSafe(parser);
		}
		
		BaseOpCode op_code = null;
		
		/* Read op inc */
		list res = static::readInc(parser); look = res[0]; op_code = res[1];
		if (op_code != null)
		{
			return res;
		}
		
		/* Read op call function */
		list res = static::readCallFunction(parser); look = res[0]; op_code = res[1];
		if (op_code != null)
		{
			return res;
		}
		
		ParserBay save_parser = parser;
		
		/* Try to read pipe */
		list res = parser.parser_base::readIdentifier(parser); parser = res[0]; op_code = res[1];
		Caret caret_start = op_code.caret_start;
		string var_name = op_code.value;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "|>")
		{
			return parser.parser_expression::ExpressionPipe(save_parser);
		}
		
		parser = save_parser;
		
		return static::readAssign(parser);
	}
	
	
	
	/**
	 * Read operators
	 */
	pure list<ParserBay, BaseOpCode> readOpItems(ParserBay parser, string end_tag = "}")
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		Vector<BaseOpCode> arr = new Vector();
		Caret caret_start = parser.caret;
		
		parser <= skip_comments <= false;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		parser <= skip_comments <= true;
		
		while (not token.eof and token.content != end_tag)
		{
			BaseOpCode parser_value = null;
			
			list res = static::readOperator(parser); parser = res[0]; parser_value = res[1];
			if (parser_value != null)
			{
				arr.pushValue(parser_value);
			}
			
			parser <= skip_comments <= false;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			parser <= skip_comments <= true;
			
			if (token.content == ";")
			{
				parser = look;
				parser <= skip_comments <= false;
				list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
				parser <= skip_comments <= true;
			}
		}
		
		op_code = new OpItems
		{
			"items": arr.toCollection(),
			"caret_start": caret_start,
			"caret_end": parser.caret,
		};
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read operators
	 */
	pure list<ParserBay, BaseOpCode> readOperators(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		
		/* Save vars */
		Dict<bool> save_vars = parser.vars;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		if (not parser.is_html)
		{
			if (token.content == "{")
			{
				list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
				list res = static::readOpItems(parser, "}"); parser = res[0]; op_code = res[1];
				list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
			}
			else
			{
				list res = static::readOperator(parser); parser = res[0]; op_code = res[1];
				list res = parser.parser_base::matchToken(parser, ";"); parser = res[0];
			}
		}
		else
		{
			if (token.content == "{")
			{
				list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
				list res = parser.parser_html::readHTML(parser); parser = res[0]; op_code = res[1];
				list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
			}
			else
			{
				list res = parser.parser_html::readHTML(parser); parser = res[0]; op_code = res[1];
			}
		}
		
		/* Restore vars */
		parser <= vars <= save_vars;
		
		return [parser, op_code];
	}
	
	
	
	/**
	 * Read flags
	 */
	pure list<ParserBay, OpFlags> readFlags(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		Map values = new Map();
		Collection<string> current_flags = OpFlags::getFlags();
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and current_flags.indexOf(token.content) >= 0)
		{
			string flag = token.content;
			values.setValue("p_"~flag, true);
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		}
		
		return 
		[
			parser,
			new OpFlags(values)
		];
	}
	
	
	
	/**
	 * Read function args
	 */
	pure list<ParserBay, Collection> readDeclareFunctionArgs
	(
		ParserBay parser, bool find_ident = true, bool flag_match = true
	)
	{
		list res = null
		ParserBay look = null;
		CoreToken token = null;
		Vector<BaseOpCode> items = new Vector();
		
		if (flag_match) { res = parser.parser_base::matchToken(parser, "("); parser = res[0]; }
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		while (not token.eof and token.content != ")")
		{
			BaseOpCode arg_value = null;
			BaseOpCode arg_pattern = null;
			BaseOpCode arg_expression = null;
			ParserBay arg_start = parser;
			
			/* Arg type */
			list res = parser.parser_base::readTypeIdentifier(parser, find_ident);
			parser = res[0]; arg_pattern = res[1];
			
			/* Arg name */
			list res = parser.parser_base::readIdentifier(parser);
			parser = res[0]; arg_value = res[1];
			string arg_name = arg_value.value;
			
			/* Arg expression */
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "=")
			{
				parser = look;
				Dict<bool> save_vars = parser.vars;
				parser <= vars <= new Dict<bool>();
				list res = parser.parser_expression::readExpression(parser);
				parser = res[0]; arg_expression = res[1];
				parser <= vars <= save_vars;
			}
			
			/* Register variable in parser */
			parser <= vars <= parser.vars.setIm(arg_name, true);
			
			items.pushValue
			(
				new OpDeclareFunctionArg
				{
					"pattern": arg_pattern,
					"name": arg_name,
					"expression": arg_expression,
					"caret_start": arg_pattern.caret_start,
					"caret_end": parser.caret,
				}
			);
			
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == ",")
			{
				parser = look;
				list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			}
		}
		
		if (flag_match) { res = parser.parser_base::matchToken(parser, ")"); parser = res[0]; }
		return [parser, items.toCollection()];
	}
	
	
	
	/**
	 * Read function variables
	 */
	pure list<ParserBay, Collection> readDeclareFunctionUse
	(
		ParserBay parser, Dict<bool> vars = null, bool find_ident = true
	)
	{
		ParserBay look = null;
		CoreToken token = null;
		Vector<BaseOpCode> items = new Vector();
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "use")
		{
			parser = look;
			list res = parser.parser_base::matchToken(parser, "("); parser = res[0];
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			while (not token.eof and token.content != ")")
			{
				BaseOpCode ident = null;
				list res = parser.parser_base::readIdentifier(parser); parser = res[0]; ident = res[1];
				string name = ident.value;
				
				if (vars != null and find_ident)
				{
					if (not vars.has(name))
					{
						throw new ParserError
						(
							"Unknown identifier '" ~ name ~ "'",
							ident.caret_start,
							parser.file_name
						);
					}
				}
				items.pushValue(name);
				
				list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
				if (token.content == ",")
				{
					parser = look;
					list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
				}
			}
			list res = parser.parser_base::matchToken(parser, ")"); parser = res[0];
		}
		
		return [parser, items.toCollection()];
	}
	
	
	
	/**
	 * Read function
	 */
	pure list<ParserBay, BaseOpCode> readDeclareFunction(ParserBay parser, string has_name = true)
	{
		ParserBay look = null;
		BaseOpCode parser_value = null;
		BaseOpCode op_code = null;
		CoreToken token = null;
		OpFlags flags = null
		
		/* Clear vars */
		bool save_is_html = parser.is_html;
		Dict<bool> save_vars = parser.vars;
		parser <= vars <= new Dict<bool>();
		parser <= is_html <= false;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "async")
		{
			parser = look;
			flags = new OpFlags
			{
				"p_async": true,
			};
		}
		
		list res = parser.parser_base::readTypeIdentifier(parser); parser = res[0]; parser_value = res[1];
		Caret caret_start = parser_value.caret_start;
		
		BaseOpCode result_type = parser_value;
		BaseOpCode expression = null;
		bool is_context = true;
		string name = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "@") { is_context = false; parser = look; }
		
		if (has_name)
		{
			list res = parser.parser_base::readIdentifier(parser); parser = res[0]; parser_value = res[1];
			string name = parser_value.value;
		}
		
		/* Read function arguments */
		Collection<OpDeclareFunctionArg> args = null;
		list res = static::readDeclareFunctionArgs(parser); parser = res[0]; args = res[1];
		
		/* Read function variables */
		Collection<OpDeclareFunctionArg> vars = null;
		list res = static::readDeclareFunctionUse(parser, save_vars); parser = res[0]; vars = res[1];
		
		/* Add variables */
		vars.each
		(
			void (string name) use (parser)
			{
				parser <= vars <= parser.vars.setIm(name, true);
			}
		);
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "=>")
		{
			list res = parser.parser_base::matchToken(parser, "=>"); parser = res[0];
			list res = parser.parser_expression::readExpression(parser);
			parser = res[0]; expression = res[1]; op_code = null;
		}
		else if (token.content == "{")
		{
			ParserBay save = parser;
			list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
			list res = static::readOperators(save); parser = res[0]; op_code = res[1];
		}
		else if (token.content == ";")
		{
			list res = parser.parser_base::matchToken(parser, ";"); parser = res[0];
			expression = null; op_code = null;
		}
		
		/* Restore vars */
		parser <= vars <= save_vars;
		parser <= is_html <= save_is_html;
		
		return 
		[
			parser,
			new OpDeclareFunction
			{
				"args": args,
				"vars": vars,
				"flags": flags,
				"name": name,
				"is_context": is_context,
				"result_type": result_type,
				"expression": expression,
				"items": op_code,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Returns true if next is function
	 */
	pure bool tryReadFunction(ParserBay parser, string has_name = true, OpFlags flags = null)
	{
		ParserBay look = null;
		BaseOpCode parser_value = null;
		BaseOpCode token = null;
		
		/* Clear vars */
		Dict<bool> save_vars = parser.vars;
		parser <= vars <= new Dict<bool>();
		parser <= find_ident <= false;
		
		bool res = false;
		try
		{
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "async") parser = look;
			
			list res = parser.parser_base::readTypeIdentifier(parser, false);
			parser = res[0]; parser_value = res[1];
			Caret caret_start = parser_value.caret_start;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "@") parser = look;
			if (has_name)
			{
				list res = parser.parser_base::readIdentifier(parser); parser = res[0];
			}
			list res = static::readDeclareFunctionArgs(parser, false); parser = res[0];
			list res = static::readDeclareFunctionUse(parser, null, false); parser = res[0];
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (
				flags != null and flags.p_declare or
				parser.current_class_abstract or
				parser.current_class_declare or
				parser.current_class_kind == "interface"
			)
			{
				if (token.content != ";")
				{
					throw new ParserExpected("Function", caret_start, parser.file_name);
				}
			}
			else if (token.content != "=>" and token.content != "{")
			{
				throw new ParserExpected("Function", caret_start, parser.file_name);
			}
			res = true;
		}
		catch (ParserExpected e)
		{
			res = false;
		}
		
		/* Restore vars */
		parser <= vars <= save_vars;
		parser <= find_ident <= true;
		
		return res;
	}
	
	
	
	/**
	 * Read annotation
	 */
	pure list<ParserBay, BaseOpCode> readAnnotation(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode name = null;
		BaseOpCode params = null;
		
		list res = parser.parser_base::matchToken(parser, "@"); parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		
		list res = parser.parser_base::readTypeIdentifier(parser); parser = res[0]; name = res[1];
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "{")
		{
			list res = parser.parser_base::readDict(parser); parser = res[0]; params = res[1];
		}
		
		return
		[
			parser,
			new OpAnnotation
			{
				"name": name,
				"params": params,
			}
		];
	}
	
}
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

namespace Bayrell.Lang.LangBay;

use Bayrell.Lang.Caret;
use Bayrell.Lang.CoreToken;
use Bayrell.Lang.LangBay.ParserBay;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpPreprocessorIfCode;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpPreprocessorSwitch;


static class ParserBayPreprocessor
{
	
	/**
	 * Read namespace
	 */
	pure list<ParserBay, BaseOpCode> readPreprocessor(ParserBay parser)
	{
		ParserBay start = parser;
		ParserBay look = null;
		CoreToken token = null;

		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "#switch")
		{
			return static::readPreprocessorSwitch(start);
		}
		
		if (token.content == "#ifcode")
		{
			return static::readPreprocessorIfCode(start);
		}
		
		return null;
	}
	
	
	
	/**
	 * Read preprocessor switch
	 */
	pure list<ParserBay, BaseOpCode> readPreprocessorSwitch(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		Vector<BaseOpCode> items = new Vector();
		
		/* Save vars */
		Dict<bool> save_vars = parser.vars;
		parser <= vars <= parser.vars.concat(
			{
				"ES6": true,
				"NODEJS": true,
				"JAVASCRIPT": true,
				"PHP": true,
				"PYTHON3": true,
			}
		);
		
		list res = parser.parser_base::matchToken(parser, "#switch"); parser = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		
		while (token.content == "#case")
		{
			parser = look;
			
			/* Skip ifcode */
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			if (token.content == "ifcode")
			{
				parser = look;
			}
			
			/* Read condition */
			BaseOpCode condition = null;
			parser <= find_ident <= false;
			list res = parser.parser_expression::readExpression(parser); parser = res[0]; condition = res[1];
			parser <= find_ident <= true;
			
			/* Read then */
			list res = parser.parser_base::matchToken(parser, "then"); parser = res[0]; token = res[1];
			
			/* Read content */
			string content = "";
			Caret caret_content = parser.caret;
			list res = parser.parser_base::readUntilStringArr(parser, ["#case", "#endswitch"], false);
			parser = res[0]; content = res[1];
			
			/* Look content */
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			
			OpPreprocessorIfCode ifcode = new OpPreprocessorIfCode
			{
				"condition": condition,
				"content": content,
				"caret_start": caret_content,
				"caret_end": parser.caret,
			};
			items.pushValue(ifcode);
		}
		
		/* Restore vars */
		parser <= vars <= save_vars;
		
		/* read endswitch */
		list res = parser.parser_base::matchToken(parser, "#endswitch"); parser = res[0];
		
		return 
		[
			parser,
			new OpPreprocessorSwitch
			{
				"items": items.toCollection(),
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read preprocessor ifcode
	 */
	pure list<ParserBay, BaseOpCode> readPreprocessorIfCode(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		Caret caret_start = parser.caret;
		list res = parser.parser_base::matchToken(parser, "#ifcode"); parser = res[0]; token = res[1];
		
		/* Read condition */
		BaseOpCode condition = null;
		parser <= find_ident <= false;
		list res = parser.parser_expression::readExpression(parser); parser = res[0]; condition = res[1];
		parser <= find_ident <= true;
		
		/* Read then */
		list res = parser.parser_base::matchToken(parser, "then"); parser = res[0]; token = res[1];
		
		/* Read content */
		string content = "";
		Caret caret_content = parser.caret;
		list res = parser.parser_base::readUntilStringArr(parser, ["#endif"], false);
		parser = res[0]; content = res[1];
		
		/* Match endif */
		list res = parser.parser_base::matchToken(parser, "#endif"); parser = res[0]; token = res[1];
		
		OpPreprocessorIfCode ifcode = new OpPreprocessorIfCode
		{
			"condition": condition,
			"content": content,
			"caret_start": caret_content,
			"caret_end": parser.caret,
		};
		
		return
		[
			parser,
			ifcode
		];
	}
	
	
	
	/**
	 * Read preprocessor ifdef
	 */
	pure list<ParserBay, BaseOpCode> readPreprocessorIfDef(ParserBay parser, string kind = "")
	{
		Collection<BaseOpCode> items = null;
		CoreToken token = null;
		
		Caret caret_start = parser.caret;
		list res = parser.parser_base::matchToken(parser, "#ifdef");
		parser = res[0]; token = res[1];
		
		/* Read condition */
		BaseOpCode condition = null;
		parser <= find_ident <= false;
		list res = parser.parser_expression::readExpression(parser);
		parser = res[0]; condition = res[1];
		parser <= find_ident <= true;
		
		/* Read then */
		list res = parser.parser_base::matchToken(parser, "then");
		parser = res[0]; token = res[1];
		
		if (kind == OpPreprocessorIfDef::KIND_PROGRAM)
		{
			list res = parser.parser_program::readProgram(parser, "#endif");
			parser = res[0]; items = res[1];
			
			list res = parser.parser_base::matchToken(parser, "#endif");
			parser = res[0];
		}
		else if (kind == OpPreprocessorIfDef::KIND_CLASS_BODY)
		{
			list res = parser.parser_program::readClassBody(parser, "#endif")
			parser = res[0]; items = res[1];
			
			list res = parser.parser_base::matchToken(parser, "#endif"); parser = res[0];
			list d = parser.parser_program::classBodyAnalyze(parser, items);
			items = d.item("functions");
		}
		else if (kind == OpPreprocessorIfDef::KIND_OPERATOR)
		{
			list res = parser.parser_operator::readOpItems(parser, "#endif");
			parser = res[0]; items = res[1];
			
			list res = parser.parser_base::matchToken(parser, "#endif");
			parser = res[0];
		}
		else if (kind == OpPreprocessorIfDef::KIND_EXPRESSION)
		{
			list res = parser.parser_expression::readExpression(parser);
			parser = res[0]; items = res[1];
			
			list res = parser.parser_base::matchToken(parser, "#endif");
			parser = res[0];
		}
		
		return
		[
			parser,
			new OpPreprocessorIfDef
			{
				"items": items,
				"condition": condition,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
}
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

namespace Bayrell.Lang.LangBay;

use Bayrell.Lang.Caret;
use Bayrell.Lang.CoreToken;
use Bayrell.Lang.Exceptions.ParserError;
use Bayrell.Lang.LangBay.ParserBay;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpAssignValue;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpDeclareClass;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpEntityName;
use Bayrell.Lang.OpCodes.OpFlags;
use Bayrell.Lang.OpCodes.OpItems;
use Bayrell.Lang.OpCodes.OpModule;
use Bayrell.Lang.OpCodes.OpNamespace;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;
use Bayrell.Lang.OpCodes.OpUse;


static class ParserBayProgram
{
	
	
	/**
	 * Read namespace
	 */
	pure ParserBay readNamespace(ParserBay parser)
	{
		CoreToken token = null;
		OpEntityName name = null;
		
		list res = parser.parser_base::matchToken(parser, "namespace");
		parser = res[0]; token = res[1];
		
		Caret caret_start = token.caret_start;
		
		list res = parser.parser_base::readEntityName(parser, false);
		parser = res[0]; name = res[1];
		
		string current_namespace_name = rs::join(".", name.names);
		
		OpNamespace current_namespace = new OpNamespace
		{
			"name": current_namespace_name,
			"caret_start": caret_start,
			"caret_end": parser.caret,
		};
		parser <= current_namespace <= current_namespace;
		parser <= current_namespace_name <= current_namespace_name;
		
		return [parser, current_namespace];
	}
	
	
	
	/**
	 * Read use
	 */
	pure ParserBay readUse(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		OpEntityName name = null;
		string alias = "";
		
		list res = parser.parser_base::matchToken(parser, "use");
		parser = res[0]; token = res[1];
		
		Caret caret_start = token.caret_start;
		
		list res = parser.parser_base::readEntityName(parser, false);
		parser = res[0]; name = res[1];
		
		list res = parser.parser_base::readToken(parser);
		look = res[0]; token = res[1];
		
		if (token.content == "as")
		{
			BaseOpCode parser_value = null;
			parser = look;
			list res = parser.parser_base::readIdentifier(parser);
			parser = res[0]; parser_value = res[1];
			alias = parser_value.value;
		}
		
		return 
		[
			parser, 
			new OpUse
			{
				"name": rs::join(".", name.names),
				"alias": alias,
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
	
	
	/**
	 * Read class body
	 */
	pure ParserBay readClassBody(ParserBay parser, string end_tag = "}")
	{
		BaseOpCode look = null;
		CoreToken token = null;
		Vector<BaseOpCode> items = new Vector();
		
		parser <= skip_comments <= false;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		parser <= skip_comments <= true;
		
		while (not token.eof and token.content != end_tag)
		{
			BaseOpCode item = null;
			
			if (token.content == "/")
			{
				list res = parser.parser_base::readComment(parser);
				parser = res[0]; item = res[1];
				if (item != null) items.pushValue(item);
			}
			else if (token.content == "@")
			{
				list res = parser.parser_operator::readAnnotation(parser);
				parser = res[0]; item = res[1];
				items.pushValue(item);
			}
			else if (token.content == "#switch" or token.content == "#ifcode")
			{
				list res = parser.parser_preprocessor::readPreprocessor(parser);
				parser = res[0]; item = res[1];
				if (item != null) items.pushValue(item);
			}
			else if (token.content == "#ifdef")
			{
				list res = parser.parser_preprocessor::readPreprocessorIfDef
				(
					parser, OpPreprocessorIfDef::KIND_CLASS_BODY
				);
				parser = res[0]; item = res[1];
				if (item != null) items.pushValue(item);
			}
			else if (token.content == "<")
			{
				break;
			}
			else
			{
				OpFlags flags = null;
				list res = parser.parser_operator::readFlags(parser);
				parser = res[0]; flags = res[1];
				
				if (parser.parser_operator::tryReadFunction(parser, true, flags))
				{
					list res = parser.parser_operator::readDeclareFunction(parser, true);
					parser = res[0]; item = res[1];
					if (item.expression != null)
					{
						list res = parser.parser_base::matchToken(parser, ";"); parser = res[0];
					}
				}
				else
				{
					list res = parser.parser_operator::readAssign(parser);
					parser = res[0]; item = res[1];
					list res = parser.parser_base::matchToken(parser, ";"); parser = res[0];
				}
				
				item <= flags <= flags;
				if (item != null)
				{
					items.pushValue(item);
				}
			}
			
			parser <= skip_comments <= false;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			parser <= skip_comments <= true;
		}
		
		return [parser, items.toCollection()];
	}
	
	
	
	/**
	 * Class body analyze
	 */
	pure Dict classBodyAnalyze(ParserBay parser, Collection<BaseOpCode> arr)
	{
		Map<bool> names = new Map();
		Vector<BaseOpCode> vars = new Vector();
		Vector<BaseOpCode> functions = new Vector();
		Vector<BaseOpCode> items = new Vector();
		Vector<BaseOpCode> annotations = new Vector(); 
		Vector<BaseOpCode> comments = new Vector(); 
		BaseOpCode fn_create = null;
		BaseOpCode fn_destroy = null;
		
		for (int i=0; i<arr.count(); i++)
		{
			BaseOpCode item = arr.item(i);
			if (item instanceof OpAnnotation)
			{
				annotations.pushValue(item);
			}
			else if (item instanceof OpComment)
			{
				comments.pushValue(item);
			}
			else if (item instanceof OpAssign)
			{
				for (int j=0; j<item.values.count(); j++)
				{
					OpAssignValue assign_value = item.values.item(j);
					string value_name = assign_value.var_name;
					if (names.has(value_name))
					{
						throw new ParserError
						(
							"Dublicate identifier " ~ value_name,
							assign_value.caret_start,
							parser.file_name
						);
					}
					names.setValue(value_name, true);
				}
				
				item = item.copy({
					"annotations": annotations.toCollection(),
					"comments": comments.toCollection(),
				});
				vars.pushValue(item);
				annotations.clear();
				comments.clear();
			}
			else if (item instanceof OpDeclareFunction)
			{
				item = item.copy({
					"annotations": annotations.toCollection(),
					"comments": comments.toCollection(),
				});
				
				if (names.has(item.name))
				{
					throw new ParserError
					(
						"Dublicate identifier " ~ item.name,
						item.caret_start,
						parser.file_name
					);
				}
				names.setValue(item.name, true);
				
				if (item.name == "constructor") fn_create = item;
				else if (item.name == "destructor") fn_destroy = item;
				else functions.pushValue(item);
				
				annotations.clear();
				comments.clear();
			}
			else if (item instanceof OpPreprocessorIfDef)
			{
				list d = static::classBodyAnalyze(parser, item.items);
				Collection<BaseOpCode> d_vars = d["vars"];
				d_vars = d_vars.map(
					BaseOpCode (BaseOpCode v) use (item)
					{
						v <= condition <= item.condition;
						return v;
					}
				);
				vars.appendVector(d_vars);
			}
			else
			{
				items.pushValue(item);
			}
		}
		
		items.appendVector(comments);
		return {
			"annotations": annotations.toCollection(),
			"comments": comments.toCollection(),
			"functions": functions.toCollection(),
			"items": items.toCollection(),
			"vars": vars.toCollection(),
			"fn_create": fn_create,
			"fn_destroy": fn_destroy,
		};
	}
	
	
	
	/**
	 * Read class
	 */
	pure ParserBay readClass(ParserBay parser)
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		Vector<OpTypeIdentifier> template = null;
		bool is_abstract = false;
		bool is_declare = false;
		bool is_static = false;
		bool is_struct = false;
		string class_kind = "";
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		if (token.content == "abstract")
		{
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			is_abstract = true;
		}
		if (token.content == "declare")
		{
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			is_declare = true;
		}
		if (token.content == "static")
		{
			parser = look;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			is_static = true;
		}
		if (token.content == "class")
		{
			list res = parser.parser_base::matchToken(parser, "class"); parser = res[0];
			class_kind = OpDeclareClass::KIND_CLASS;
		}
		else if (token.content == "struct")
		{
			list res = parser.parser_base::matchToken(parser, "struct"); parser = res[0];
			class_kind = OpDeclareClass::KIND_STRUCT;
		}
		else if (token.content == "interface")
		{
			list res = parser.parser_base::matchToken(parser, "interface"); parser = res[0];
			class_kind = OpDeclareClass::KIND_INTERFACE;
		}
		else
		{
			list res = parser.parser_base::matchToken(parser, "class");
		}
		
		list res = parser.parser_base::readIdentifier(parser); parser = res[0]; op_code = res[1];
		string class_name = op_code.value;
		
		/* Set class name */
		parser <= current_class_abstract <= is_abstract;
		parser <= current_class_declare <= is_declare;
		parser <= current_class_name <= class_name;
		parser <= current_class_kind <= class_kind;
		
		/* Register module in parser */
		parser <= uses <= parser.uses.setIm(
			class_name,
			parser.current_namespace_name ~ "." ~ class_name
		);
		Dict save_uses = parser.uses;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "<")
		{
			template = new Vector<OpTypeIdentifier>();
			list res = parser.parser_base::matchToken(parser, "<"); parser = res[0];
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			while (not token.eof and token.content != ">")
			{
				BaseOpCode parser_value = null;
				list res = parser.parser_base::readIdentifier(parser);
				parser = res[0]; parser_value = res[1];
				
				template.pushValue(parser_value);
				parser <= uses <= parser.uses.setIm(parser_value.value, parser_value.value);
				
				list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
				if (token.content != ">")
				{
					list res = parser.parser_base::matchToken(parser, ","); parser = res[0];
					list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
				}
			}
			list res = parser.parser_base::matchToken(parser, ">"); parser = res[0];
		}
		
		BaseOpCode class_extends = null;
		Vector<BaseOpCode> class_implements = null;
		
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		if (token.content == "extends")
		{
			list res = parser.parser_base::readTypeIdentifier(look);
			parser = res[0]; class_extends = res[1];
		}
		
		list res = parser.parser_base::readToken(parser);
		look = res[0]; token = res[1];
		if (token.content == "implements")
		{
			class_implements = new Vector<BaseOpCode>();
			
			list res = parser.parser_base::readTypeIdentifier(look);
			parser = res[0]; op_code = res[1];
			class_implements.pushValue(op_code);
			
			list res = parser.parser_base::readToken(parser);
			look = res[0]; token = res[1];
			while (not token.eof and token.content == ",")
			{
				parser = look;
				list res = parser.parser_base::readTypeIdentifier(look);
				parser = res[0]; op_code = res[1];
				class_implements.pushValue(op_code);
				
				list res = parser.parser_base::readToken(parser);
				look = res[0]; token = res[1];
			}
		}
		
		Collection<BaseOpCode> arr = null;
		list res = parser.parser_base::matchToken(parser, "{"); parser = res[0];
		list res = static::readClassBody(parser); parser = res[0]; arr = res[1];
		list d = static::classBodyAnalyze(parser, arr);
		list res = parser.parser_base::matchToken(parser, "}"); parser = res[0];
		BaseOpCode current_class = new OpDeclareClass
		{
			"kind": class_kind,
			"name": class_name,
			"is_abstract": is_abstract,
			"is_static": is_static,
			"is_declare": is_declare,
			"class_extends": class_extends,
			"class_implements": (class_implements != null) ? class_implements.toCollection() : null,
			"template": (template != null) ? template.toCollection() : null,
			"vars": d.item("vars"),
			"functions": d.item("functions"),
			"fn_create": d.item("fn_create"),
			"fn_destroy": d.item("fn_destroy"),
			"items": arr,
			"caret_start": caret_start,
			"caret_end": parser.caret,
		};
		
		/* Restore uses */
		parser <= uses <= save_uses;
		
		return
		[
			parser.copy({ "current_class": current_class }),
			current_class,
		];
	}
	
	
	
	/**
	 * Read program
	 */
	pure ParserBay readProgram(ParserBay parser, string end_tag = "")
	{
		ParserBay look = null;
		CoreToken token = null;
		BaseOpCode op_code = null;
		
		Vector<BaseOpCode> annotations = new Vector(); 
		Vector<BaseOpCode> comments = new Vector(); 
		Vector<BaseOpCode> items = new Vector();
		
		parser <= skip_comments <= false;
		list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
		Caret caret_start = token.caret_start;
		parser <= skip_comments <= true;
		
		if (token.eof)
		{
			return [parser, null];
		}
		
		if (token.content == "<")
		{
			return parser.parser_html::readUI(parser);
		}
		
		while (not token.eof and (end_tag == "" or (end_tag != "" and token.content == end_tag)))
		{
			if (token.content == "/")
			{
				list res = parser.parser_base::readComment(parser);
				parser = res[0]; op_code = res[1];
				if (op_code != null) comments.pushValue(op_code);
			}
			else if (token.content == "@")
			{
				list res = parser.parser_operator::readAnnotation(parser);
				parser = res[0]; op_code = res[1];
				annotations.pushValue(op_code);
			}
			else if (token.content == "#switch" or token.content == "#ifcode")
			{
				/* Append comments */
				items.appendVector(comments);
				comments.clear();
				
				list res = parser.parser_preprocessor::readPreprocessor(parser);
				parser = res[0]; op_code = res[1];
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
				
				list res = parser.parser_preprocessor::readPreprocessorIfDef
				(
					parser, OpPreprocessorIfDef::KIND_PROGRAM
				);
				parser = res[0]; op_code = res[1];
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
				
				list res = static::readNamespace(parser); parser = res[0]; op_code = res[1];
				items.pushValue(op_code);
				list res = parser.parser_base::matchToken(parser, ";"); parser = res[0];
			}
			else if (token.content == "use")
			{
				/* Append comments */
				items.appendVector(comments);
				comments.clear();
				
				list res = static::readUse(parser); parser = res[0]; op_code = res[1];
				string full_name = op_code.name;
				string short_name = "";
				if (op_code.alias == "") short_name = rs::explode(".", full_name).last();
				else short_name = op_code.alias;
				
				/* Register module in parser */
				parser <= uses <= parser.uses.setIm(short_name, full_name);
				items.pushValue(op_code);
				list res = parser.parser_base::matchToken(parser, ";"); parser = res[0];
			}
			else if 
			(
				token.content == "class" or token.content == "struct" or
				token.content == "static" or token.content == "declare" or
				token.content == "interface" or token.content == "abstract"
			)
			{
				BaseOpCode item = null;
				list res = static::readClass(parser); parser = res[0]; item = res[1];
				item = item.copy({
					"annotations": annotations.toCollection(),
					"comments": comments.toCollection(),
				});
				items.pushValue(item);
				annotations.clear();
				comments.clear();
			}
			else
			{
				break;
			}
			
			parser <= skip_comments <= false;
			list res = parser.parser_base::readToken(parser); look = res[0]; token = res[1];
			parser <= skip_comments <= true;
		}
		
		items.appendVector(comments);
		
		return
		[
			parser,
			new OpModule
			{
				"uses": parser.uses.toDict(),
				"items": items.toCollection(),
				"caret_start": caret_start,
				"caret_end": parser.caret,
			}
		];
	}
	
}
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

namespace Bayrell.Lang.LangES6;

use Runtime.BaseStruct;


struct AsyncAwait extends BaseStruct
{
	string start_pos = "";
	string end_pos = "";
}
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

namespace Bayrell.Lang.LangES6;

use Runtime.BaseStruct;
use Bayrell.Lang.CoreTranslator;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangES6.AsyncAwait;
use Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;
use Bayrell.Lang.LangES6.TranslatorES6Expression;
use Bayrell.Lang.LangES6.TranslatorES6Html;
use Bayrell.Lang.LangES6.TranslatorES6Operator;
use Bayrell.Lang.LangES6.TranslatorES6Program;
use Bayrell.Lang.OpCodes.BaseOpCode;


struct TranslatorES6 extends CoreTranslator
{
	/* Work */
	bool is_pipe = false;
	bool is_call = false;
	string pipe_var_name = "";
	string html_var_name = "";
	bool is_html = false;
	
	/* Translators */
	TranslatorES6AsyncAwait async_await = null;
	TranslatorES6Expression expression = null;
	TranslatorES6Html html = null;
	TranslatorES6Operator operator = null;
	TranslatorES6Program program = null;
	
	/* Flags */
	bool frontend = true;
	bool backend = false;
	bool use_module_name = false;
	bool use_strict = true;
	bool enable_async_await = true;
	bool emulate_async_await = false;
	bool enable_context = false;
	bool enable_check_types = false;
	bool enable_introspection = true;
	
	
	/**
	 * Returns true if emulate async await
	 */
	bool isEmulateAsyncAwait() => this.enable_async_await and this.emulate_async_await;
	
	
	
	/**
	 * Returns true if async await
	 */
	bool isAsyncAwait() => this.enable_async_await and not this.emulate_async_await;
	
	
	
	/**
	 * Reset translator
	 */
	pure TranslatorES6 reset(TranslatorES6 t) =>
		t.copy
		{
			"value": "",
			"current_namespace_name": "",
			"modules": new Dict<string>(),
			"async_await": new TranslatorES6AsyncAwait(),
			"expression": new TranslatorES6Expression(),
			"html": new TranslatorES6Html(),
			"operator": new TranslatorES6Operator(),
			"program": new TranslatorES6Program(),
			"save_vars": new Collection<string>(),
			"save_op_codes": new Collection<SaveOpCode>(),
			"save_op_code_inc": 0,
			"preprocessor_flags": 
			{
				"ES6": true,
				"JAVASCRIPT": true,
				"FRONTEND": t.frontend,
				"BACKEND": t.backend,
				"USE_MODULE_NAME": t.use_module_name,
				"USE_STRICT": t.use_strict,
				"ENABLE_ASYNC_AWAIT": t.enable_async_await,
				"EMULATE_ASYNC_AWAIT": t.emulate_async_await,
				"ENABLE_CONTEXT": t.enable_context,
				"ENABLE_CHECK_TYPES": t.enable_check_types,
			},
		}
	;
	
	
	
	/**
	 * Translate BaseOpCode
	 */
	pure list<TranslatorES6, string> translate(TranslatorES6 t, BaseOpCode op_code)
	{
		t = static::reset(t);
		return t.program::translateProgram(t, op_code);
	}
	
	
	
	/**
	 * Output save op code content
	 */
	pure string outputSaveOpCode(CoreTranslator t, int save_op_code_value = 0)
	{
		string content = "";
		for (int i=0; i<t.save_op_codes.count(); i++)
		{
			if (i < save_op_code_value) continue;
			SaveOpCode save = t.save_op_codes.item(i);
			
			string s = "";
			if (t.is_html)
			{
				s = (save.content == "") ? 
					t.s("let " ~ save.var_name ~ " = " ~ save.var_content ~ ";") :
					save.content
				;
			}
			else
			{
				s = (save.content == "") ? 
					t.s("var " ~ save.var_name ~ " = " ~ save.var_content ~ ";") :
					save.content
				;
			}
			
			content ~= s;
		}
		return content;
	}
	
}
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

namespace Bayrell.Lang.LangES6;

use Runtime.BaseStruct;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangES6.AsyncAwait;
use Bayrell.Lang.LangES6.TranslatorES6;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpAssignValue;
use Bayrell.Lang.OpCodes.OpBreak;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpContinue;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpFor;
use Bayrell.Lang.OpCodes.OpIf;
use Bayrell.Lang.OpCodes.OpIfElse;
use Bayrell.Lang.OpCodes.OpPipe;
use Bayrell.Lang.OpCodes.OpReturn;
use Bayrell.Lang.OpCodes.OpThrow;
use Bayrell.Lang.OpCodes.OpTryCatch;
use Bayrell.Lang.OpCodes.OpTryCatchItem;
use Bayrell.Lang.OpCodes.OpWhile;


struct TranslatorES6AsyncAwait extends BaseStruct
{
	/*Collection<AsyncAwait> async_stack = null;*/
	Collection<AsyncAwait> async_stack = new Collection<AsyncAwait>();
	Collection<int> pos = [0];
	string async_t = "__async_t";
	string async_var = "__async_var";
	
	
	
	/**
	 * Returns current pos
	 */
	pure string currentPos(TranslatorES6 t)
	{
		return t.expression::toString(rs::join(".", t.async_await.pos));
	}
	
	
	
	/**
	 * Returns current pos
	 */
	pure list<TranslatorES6, string> nextPos(TranslatorES6 t)
	{
		Collection<int> pos = t.async_await.pos;
		t <= async_await <= pos <= pos.setIm(pos.count() - 1, pos.last() + 1);
		string res = t.expression::toString(rs::join(".", t.async_await.pos));
		return [t, res];
	}
	
	
	
	/**
	 * Returns push pos
	 */
	pure list<TranslatorES6, string> pushPos(TranslatorES6 t)
	{
		Collection<int> pos = t.async_await.pos;
		t <= async_await <= pos <= pos.setIm(pos.count() - 1, pos.last() + 1).pushIm(0);
		string res = t.expression::toString(rs::join(".", t.async_await.pos));
		return [t, res];
	}
	
	
	
	/**
	 * Returns inc pos
	 */
	pure list<TranslatorES6, string> levelIncPos(TranslatorES6 t)
	{
		Collection<int> pos = t.async_await.pos;
		t <= async_await <= pos <= pos.setIm(pos.count() - 1, pos.last()).pushIm(0);
		string res = t.expression::toString(rs::join(".", t.async_await.pos));
		return [t, res];
	}
	
	
	
	/**
	 * Returns pop pos
	 */
	pure list<TranslatorES6, string> popPos(TranslatorES6 t)
	{
		Collection<int> pos = t.async_await.pos.removeLastIm();
		t <= async_await <= pos <= pos.setIm(pos.count() - 1, pos.last() + 1);
		string res = t.expression::toString(rs::join(".", t.async_await.pos));
		return [t, res];
	}
	
	
	
	/**
	 * OpCall
	 */
	pure list<TranslatorES6, string> OpCall(TranslatorES6 t, OpCall op_code, bool is_expression = true)
	{
		string s = "";
		bool flag = false;
		
		if (s == "")
		{
			list res = t.expression::Dynamic(t, op_code.obj); t = res[0]; s = res[1];
			if (s == "parent")
			{
				s = t.expression::useModuleName(t, t.current_class_extends_name);
				if (t.current_function.name != "constructor") 
				{
					if (t.current_function.isStatic()) s ~= "." ~ t.current_function.name;
					else s ~= ".prototype." ~ t.current_function.name;
				}
				s ~= ".call(this"; flag = true;
			}
			else s ~= "(";
		}
		
		string content = s;
		if (t.current_function.is_context and op_code.is_context)
		{
			content ~= "ctx";
			flag = true;
		}
		for (int i=0; i<op_code.args.count(); i++)
		{
			BaseOpCode item = op_code.args.item(i);
			list res = t.expression::Expression(t, item); t = res[0]; string s = res[1];
			content ~= (flag ? ", " : "") ~ s;
			flag = true;
		}
		content ~= ")";
		

		list res = t::incSaveOpCode(t); t = res[0]; string var_name = res[1];
		list res = static::nextPos(t); t = res[0]; string next_pos = res[1];
		string async_t = t.async_await.async_t;
		content = t.s
		(
			"return " ~ async_t ~
			".jump(ctx, " ~ next_pos ~ ")" ~
			".call(ctx, " ~ content ~ "," ~ t.expression::toString(var_name) ~ ");"
		);
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ next_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		list res = t::addSaveOpCode
		(
			t,
			{
				"op_code": op_code,
				"var_name": var_name,
				"content": content,
			}
		);
		t = res[0];
		
		if (is_expression) return [t, async_t ~ ".getVar(ctx, " ~ t.expression::toString(var_name) ~ ")"];
		return [t, ""];
	}
	
	
	
	/**
	 * OpPipe
	 */
	pure list<TranslatorES6, string> OpPipe(TranslatorES6 t, OpPipe op_code, bool is_expression = true)
	{
		string content = "";
		string var_name = "";
		bool flag = false;
		
		list res = t.expression::Expression(t, op_code.obj); t = res[0]; var_name = res[1];
		if (op_code.kind == OpPipe::KIND_METHOD)
		{
			content = var_name ~ ".constructor." ~ op_code.method_name.value;
		}
		else
		{
			list res = t.expression::OpTypeIdentifier(t, op_code.class_name); t = res[0];
			content = res[1] ~ "." ~ op_code.method_name.value;
		}
		
		bool flag = false;
		content ~= "(";
		if (t.current_function.is_context and op_code.is_context)
		{
			content ~= "ctx";
			flag = true;
		}
		content ~= (flag ? ", " : "") ~ var_name; flag = true;
		for (int i=0; i<op_code.args.count(); i++)
		{
			BaseOpCode item = op_code.args.item(i);
			list res = t.expression::Expression(t, item); t = res[0]; string s1 = res[1];
			content ~= (flag ? ", " : "") ~ s1;
			flag = true;
		}
		content ~= ")";
		
		list res = t::incSaveOpCode(t); t = res[0]; string var_name = res[1];
		list res = static::nextPos(t); t = res[0]; string next_pos = res[1];
		string async_t = t.async_await.async_t;
		content = t.s
		(
			"return " ~ async_t ~
			".jump(ctx, " ~ next_pos ~ ")" ~
			".call(ctx, " ~ content ~ "," ~ t.expression::toString(var_name) ~ ");"
		);
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ next_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		list res = t::addSaveOpCode
		(
			t,
			{
				"op_code": op_code,
				"var_name": var_name,
				"content": content,
			}
		);
		t = res[0];
		
		if (is_expression) return [t, async_t ~ ".getVar(ctx, " ~ t.expression::toString(var_name) ~ ")"];
		return [t, ""];
	}
	
	
	
	/**
	 * OpFor
	 */
	pure list<TranslatorES6, string> OpFor(TranslatorES6 t, OpFor op_code)
	{
		TranslatorES6 save_t = null;
		string async_t = t.async_await.async_t;
		string async_var = t.async_await.async_var;
		string content = "";
		
		list res = static::pushPos(t); t = res[0]; string start_pos = res[1];
		list res = static::popPos(t); save_t = res[0]; string end_pos = res[1];
		t <= async_await <= async_stack <= t.async_await.async_stack.pushIm
		(
			new AsyncAwait{ "start_pos": start_pos, "end_pos": end_pos }
		);
		
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ start_pos ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* Start Loop */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ start_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		/* Loop Assign */
		if (op_code.expr1 instanceof OpAssign)
		{
			list res = t::saveOpCodeCall(t, rtl::method(t.operator.getClassName(), "OpAssign"), [op_code.expr1]);
			t = res[0]; string save = res[1]; string value = res[2];
			if (save != "") content ~= save;
			content ~= value;
		}
		else
		{
			list res = t::saveOpCodeCall(t, rtl::method(t.expression.getClassName(), "Expression"), [op_code.expr1]);
			t = res[0]; string save = res[1]; string value = res[2];
			if (save != "") content ~= save;
			content ~= value;
		}
		
		/* Loop Expression */
		list res = static::nextPos(t); t = res[0]; string loop_expression = res[1];
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ loop_expression ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* Loop Expression */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ loop_expression ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		/* Call condition expression */
		list res = t::saveOpCodeCall(t, rtl::method(t.expression.getClassName(), "Expression"), [op_code.expr2]);
		t = res[0]; string save = res[1]; string value = res[2];
		if (save != "") content ~= save;
		
		/* Loop condition */
		content ~= t.s("var " ~ async_var ~ " = " ~ value ~ ";");
		list res = static::nextPos(t); t = res[0]; string start_loop = res[1];
		content ~= t.s("if (" ~ async_var ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ start_loop ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ end_pos ~ ");");		
		
		/* Start Loop */
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* Loop */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ start_loop ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		list res = t.expression::Expression(t, op_code.expr3); t = res[0]; content ~= t.s(res[1] ~ ";");
		list res = t.operator::Operators(t, op_code.value); t = res[0]; content ~= res[1];
		
		/* End Loop */
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ loop_expression ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* End Loop */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ end_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		t <= async_await <= async_stack <= t.async_await.async_stack.removeLastIm();
		t <= async_await <= pos <= save_t.async_await.pos;
		
		return [t, content];
	}
	
	
	
	/**
	 * OpIfBlock
	 */
	pure list<TranslatorES6, string> OpIfBlock
	(
		TranslatorES6 t, BaseOpCode condition, BaseOpCode op_code, string end_pos
	)
	{
		string content = "";
		string async_t = t.async_await.async_t;
		string async_var = t.async_await.async_var;
		
		/* Call condition expression */
		list res = t::saveOpCodeCall(t, rtl::method(t.expression.getClassName(), "Expression"), [condition]);
		t = res[0]; string save = res[1]; string value = res[2];
		if (save != "") content ~= save;
		
		list res = static::nextPos(t); t = res[0]; string start_if = res[1];
		list res = static::nextPos(t); t = res[0]; string next_if = res[1];
		
		/* If condition */
		content ~= t.s("var " ~ async_var ~ " = " ~ value ~ ";");
		content ~= t.s("if (" ~ async_var ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ start_if ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ next_if ~ ");");
		
		/* Start Loop */
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* If true */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ start_if ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		list res = t.operator::Operators(t, op_code); t = res[0]; content ~= res[1];
		
		/* End if */
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ end_pos ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* Next If */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ next_if ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		return [t, content];
	}
	
	
	
	/**
	 * OpIf
	 */
	pure list<TranslatorES6, string> OpIf(TranslatorES6 t, OpIf op_code)
	{
		TranslatorES6 save_t = null;
		string async_t = t.async_await.async_t;
		string async_var = t.async_await.async_var;
		string content = "";
		string if_true_pos = "", if_false_pos = "";
		
		list res = static::pushPos(t); t = res[0]; string start_pos = res[1];
		list res = static::popPos(t); save_t = res[0]; string end_pos = res[1];
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ start_pos ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* Start if */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ start_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		/* If true */
		list res = static::OpIfBlock(t, op_code.condition, op_code.if_true, end_pos);
		t = res[0]; content ~= res[1];
		
		/* If else */
		for (int i=0; i<op_code.if_else.count(); i++)
		{
			OpIfElse if_else = op_code.if_else.item(i);
			list res = static::OpIfBlock(t, if_else.condition, if_else.if_true, end_pos);
			t = res[0]; content ~= res[1];			
		}
		
		/* Else */
		if (op_code.if_false)
		{
			content ~= t.s("/* If false */");
			list res = t.operator::Operators(t, op_code.if_false); t = res[0]; content ~= res[1];
		}
		
		/* End if */
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ end_pos ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* End if */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ end_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		t <= async_await <= pos <= save_t.async_await.pos;
		
		return [t, content];
	}
	
	
	
	/**
	 * OpReturn
	 */
	pure list<TranslatorES6, string> OpReturn(TranslatorES6 t, OpReturn op_code)
	{
		string content = "";
		string s1 = "";
		if (op_code.expression)
		{
			list res = t.expression::Expression(t, op_code.expression); t = res[0]; s1 = res[1];
		}
		else
		{
			s1 = "null";
		}
		
		string async_t = t.async_await.async_t;
		content = t.s("return " ~ async_t ~ ".ret(ctx, " ~ s1 ~ ");");
		return [t, content];
	}
	
	
	
	/**
	 * OpTryCatch
	 */
	pure list<TranslatorES6, string> OpTryCatch(TranslatorES6 t, OpTryCatch op_code)
	{
		TranslatorES6 save_t = null;
		string content = "";
		string async_t = t.async_await.async_t;
		string async_var = t.async_await.async_var;
		
		list res = static::nextPos(t); t = res[0]; string start_pos = res[1];
		list res = static::nextPos(t); save_t = res[0]; string end_pos = res[1];
		t <= async_await <= async_stack <=
			t.async_await.async_stack.pushIm
			(
				new AsyncAwait{ "start_pos": start_pos, "end_pos": end_pos }
			)
		;
		
		/* Start Try Catch */
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ start_pos ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* Start Try */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ start_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		list res = static::levelIncPos(t); t = res[0]; string start_catch = res[1];
		content ~= t.s(async_t ~ " = " ~ async_t ~ ".catch_push(ctx, " ~ start_catch ~ ");");
		
		list res = t.operator::Operators(t, op_code.op_try); t = res[0]; content ~= res[1];
		
		/* Start Catch */
		content ~= t.s("return " ~ async_t ~ ".catch_pop(ctx).jump(ctx, " ~ end_pos ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* Start Catch */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ start_catch ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		content ~= t.s("var _ex = " ~ async_t ~ ".getErr(ctx);");
		
		for (int i=0; i<op_code.items.count(); i++)
		{
			string s = ""; string pattern = "";
			OpTryCatchItem item = op_code.items.item(i);
			list res = t.expression::OpTypeIdentifier(t, item.pattern); t = res[0]; pattern ~= res[1];
			
			if (pattern != "var") s = "if (_ex instanceof " ~ pattern ~ ")";
			else s = "if (true)";
			
			s ~= t.s("{");
			t = t.levelInc();
			
			s ~= (s != "") ? t.s("var " ~ item.name ~ " = _ex;") : "var " ~ item.name ~ " = _ex;";
			list res = t.operator::Operators(t, item.value); t = res[0]; s ~= res[1];
			
			t = t.levelDec();
			s ~= t.s("}");
			
			if (i != 0) s = "else " ~ s;
			content ~= t.s(s);
		}
		
		content ~= t.s("else");
		content ~= t.s("{");
		t = t.levelInc();
		content ~= t.s("throw _ex;");
		t = t.levelDec();
		content ~= t.s("}");
		
		/* End Try Catch */
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ end_pos ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* End Catch */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ end_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		
		t <= async_await <= async_stack <= t.async_await.async_stack.removeLastIm();
		t <= async_await <= pos <= save_t.async_await.pos;
		
		return [t, content];
	}
	
	
	
	/**
	 * OpWhile
	 */
	pure list<TranslatorES6, string> OpWhile(TranslatorES6 t, OpWhile op_code)
	{
		TranslatorES6 save_t = null;
		string async_t = t.async_await.async_t;
		string async_var = t.async_await.async_var;
		string content = "";
		
		list res = static::pushPos(t); t = res[0]; string start_pos = res[1];
		list res = static::popPos(t); save_t = res[0]; string end_pos = res[1];
		t <= async_await <= async_stack <=
			t.async_await.async_stack.pushIm
			(
				new AsyncAwait{ "start_pos": start_pos, "end_pos": end_pos }
			)
		;
		
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ start_pos ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* Start while */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ start_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		/* Call condition expression */
		list res = t::saveOpCodeCall(t, rtl::method(t.expression.getClassName(), "Expression"), [op_code.condition]);
		t = res[0]; string save = res[1]; string value = res[2];
		if (save != "") content ~= save;
		
		/* Loop condition */
		content ~= t.s("var " ~ async_var ~ " = " ~ value ~ ";");
		list res = static::nextPos(t); t = res[0]; string start_loop = res[1];
		content ~= t.s("if (" ~ async_var ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ start_loop ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ end_pos ~ ");");
		
		/* Start Loop */
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* Loop while */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ start_loop ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		list res = t.operator::Operators(t, op_code.value); t = res[0]; content ~= res[1];
		
		/* End Loop */
		content ~= t.s("return " ~ async_t ~ ".jump(ctx, " ~ start_pos ~ ");");
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("/* End while */");
		content ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ end_pos ~ ")");
		content ~= t.s("{");
		t = t.levelInc();
		
		t <= async_await <= async_stack <= t.async_await.async_stack.removeLastIm();
		t <= async_await <= pos <= save_t.async_await.pos;
		
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareFunction Body
	 */
	pure list<TranslatorES6, string> OpDeclareFunctionBody(TranslatorES6 t, OpDeclareFunction f)
	{
		TranslatorES6 save_t = t;
		
		/* Save op codes */
		Collection<string> save_vars = t.save_vars;
		Collection<SaveOpCode> save_op_codes = t.save_op_codes;
		int save_op_code_inc = t.save_op_code_inc;
		t = t::clearSaveOpCode(t);
		
		string async_t = t.async_await.async_t;
		t = t.levelInc();
		string s1 = t.s("return (" ~ async_t ~ ") =>");
		s1 ~= t.s("{");
		t = t.levelInc();
		s1 ~= t.s("if (" ~ async_t ~ ".pos(ctx) == " ~ static::currentPos(t) ~ ")");
		s1 ~= t.s("{");
		t = t.levelInc();
		
		if (f.items)
		{
			list res = t.operator::Operators(t, f.items); t = res[0];
			s1 ~= res[1];
		}
		else if (f.expression)
		{
			/* Save op codes */
			Collection<SaveOpCode> save_op_codes = t.save_op_codes;
			int save_op_code_inc = t.save_op_code_inc;
			
			list res = t.expression::Expression(t, f.expression); t = res[0];
			string expr = res[1];
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") s1 ~= save;
			
			/* Restore save op codes */
			t <= save_op_codes <= save_op_codes;
			t <= save_op_code_inc <= save_op_code_inc;
			
			s1 ~= t.s("return " ~ async_t ~ ".ret(ctx, " ~ expr ~ ");");
		}
		
		t = t.levelDec();
		s1 ~= t.s("}");
		s1 ~= t.s("return " ~ async_t ~ ".ret_void(ctx);");
		t = t.levelDec();
		s1 ~= t.s("};");
		t = t.levelDec();
		
		/* Content */
		string content = "";
		content = t.s("{");
		t = t.levelInc();
		if (t.save_vars.count() > 0)
		{
			content ~= t.s("var " ~ rs::join(",", t.save_vars) ~ ";");
		}
		content ~= s1;
		t = t.levelDec();
		content ~= t.s("}");
		
		/* Restore save op codes */
		t <= save_vars <= save_vars;
		t <= save_op_codes <= save_op_codes;
		t <= save_op_code_inc <= save_op_code_inc;
		
		return [save_t, content];		
	}
	
}
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

namespace Bayrell.Lang.LangES6;

use Runtime.BaseStruct;
use Runtime.re;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangES6.TranslatorES6;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAttr;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpClassOf;
use Bayrell.Lang.OpCodes.OpClassRef;
use Bayrell.Lang.OpCodes.OpCollection;
use Bayrell.Lang.OpCodes.OpCurry;
use Bayrell.Lang.OpCodes.OpCurryArg;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
use Bayrell.Lang.OpCodes.OpDict;
use Bayrell.Lang.OpCodes.OpDictPair;
use Bayrell.Lang.OpCodes.OpHtmlItems;
use Bayrell.Lang.OpCodes.OpHtmlTag;
use Bayrell.Lang.OpCodes.OpHtmlValue;
use Bayrell.Lang.OpCodes.OpIdentifier;
use Bayrell.Lang.OpCodes.OpInc;
use Bayrell.Lang.OpCodes.OpMath;
use Bayrell.Lang.OpCodes.OpMethod;
use Bayrell.Lang.OpCodes.OpNew;
use Bayrell.Lang.OpCodes.OpNumber;
use Bayrell.Lang.OpCodes.OpPipe;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpString;
use Bayrell.Lang.OpCodes.OpTernary;
use Bayrell.Lang.OpCodes.OpTypeConvert;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


struct TranslatorES6Expression extends BaseStruct
{
	
	/**
	 * Returns string
	 */
	pure string toString(string s)
	{
		s = re::replace('\\\\', '\\\\', s);
		s = re::replace('"', '\\\"', s);
		s = re::replace('\n', '\\n', s);
		s = re::replace('\r', '\\r', s);
		s = re::replace('\t', '\\t', s);
		return '"' ~ s ~ '"';
	}
	
	
	
	/**
	 * To pattern
	 */
	pure string toPattern(TranslatorES6 t, OpTypeIdentifier pattern)
	{
		Collection names = static::findModuleNames(t, pattern.entity_name.names);
		string e = rs::join(".", names);
		Collection a = (pattern.template != null) ? 
			pattern.template.map
			(
				string (OpTypeIdentifier pattern) use (t) => static::toPattern(t, pattern)
			) : null
		;
		string b = (a != null) ? ",\"t\":[" ~ rs::join(",",a) ~ "]" : "";
		return "{\"e\":" ~ static::toString(e) ~ b ~"}";
	}
	
	
	
	/**
	 * Returns string
	 */
	pure string rtlToStr(TranslatorES6 t, string s)
	{
		if (t.use_module_name)
		{
			return "use(\"Runtime.rtl\").toStr("~s~")";
		}
		string module_name = static::findModuleName(t, "rtl");
		return module_name ~ ".toStr("~s~")";
	}
	
	
	
	/**
	 * Find module name
	 */
	pure string findModuleName(TranslatorES6 t, string module_name)
	{
		if (module_name == "Collection") return "Runtime.Collection";
		else if (module_name == "Dict") return "Runtime.Dict";
		else if (module_name == "Map") return "Runtime.Map";
		else if (module_name == "Vector") return "Runtime.Vector";
		else if (module_name == "rs") return "Runtime.rs";
		else if (module_name == "rtl") return "Runtime.rtl";
		else if (module_name == "ArrayInterface") return "";
		else if (t.modules.has(module_name)) return t.modules.item(module_name);
		return module_name;
	}
	
	
	
	/**
	 * Returns module name
	 */
	pure list<TranslatorES6, Collection> findModuleNames(TranslatorES6 t, Collection<string> names)
	{
		if (names.count() > 0)
		{
			string module_name = names.first();
			module_name = static::findModuleName(t, module_name);
			if (module_name != "") names = names.setIm(0, module_name);
		}
		return names;
	}
	
	
	
	/**
	 * Use module name
	 */
	pure string useModuleName(TranslatorES6 t, string module_name)
	{
		module_name = static::findModuleName(t, module_name);
		if (t.use_module_name) return "use(" ~ static::toString(module_name) ~ ")";
		return module_name;
	}
	
	
	
	/**
	 * OpTypeIdentifier
	 */
	pure list<TranslatorES6, string> OpTypeIdentifier(TranslatorES6 t, OpTypeIdentifier op_code)
	{
		Collection<string> names = static::findModuleNames(t, op_code.entity_name.names);
		string s = rs::join(".", names);
		return [t, s];
	}
	
	
	
	/**
	 * OpIdentifier
	 */
	pure list<TranslatorES6, string> OpIdentifier(TranslatorES6 t, OpIdentifier op_code)
	{
		if (op_code.value == "@")
		{
			if (t.enable_context == false) return [t, static::useModuleName(t, "rtl") ~ ".getContext()"];
			else return [t, "ctx"];
		}
		if (op_code.value == "_")
		{
			if (t.enable_context == false) return [t, static::useModuleName(t, "rtl") ~ ".getContext().translate"];
			else return [t, "ctx.translate"];
		}
		if (op_code.value == "log") return [t, "console.log"];
		
		if (t.modules.has(op_code.value) or op_code.kind == OpIdentifier::KIND_SYS_TYPE)
		{
			string module_name = op_code.value;
			string new_module_name = static::useModuleName(t, module_name);
			return [t, new_module_name];
		}
		
		string content = op_code.value;
		return [t, content];
	}
	
	
	
	/**
	 * OpNumber
	 */
	pure list<TranslatorES6, string> OpNumber(TranslatorES6 t, OpNumber op_code)
	{
		string content = op_code.value;
		if (op_code.negative)
		{
			content = "-" ~ content;
			t <= opcode_level <= 15;
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpString
	 */
	pure list<TranslatorES6, string> OpString(TranslatorES6 t, OpString op_code)
	{
		return [t, static::toString(op_code.value)];
	}
	
	
	
	/**
	 * OpCollection
	 */
	pure list<TranslatorES6, string> OpCollection(TranslatorES6 t, OpCollection op_code)
	{
		string content = "";
		Collection<string> values = op_code.values.map
		(
			string (BaseOpCode op_code) use (t)
			{
				list res = static::Expression(t, op_code); t = res[0]; string s = res[1];
				return s;
			}
		);
		values = values.filter( bool (string s) => s != "" );
		string module_name = static::useModuleName(t, "Collection");
		content = module_name ~ ".from([" ~ rs::join(",", values) ~ "])";
		return [t, content];
	}
	
	
	
	/**
	 * OpDict
	 */
	pure list<TranslatorES6, string> OpDict(TranslatorES6 t, OpDict op_code)
	{
		string content = "";
		Collection<string> values = op_code.values.map
		(
			string (OpDictPair pair, string key) use (t)
			{
				if (pair.condition != null and t.preprocessor_flags[pair.condition.value] != true) return "";
				list res = static::Expression(t, pair.value); t = res[0]; string s = res[1];
				return static::toString(pair.key) ~ ":" ~ s;
			}
		);
		values = values.filter( bool (string s) => s != "" );
		string module_name = static::useModuleName(t, "Dict");
		content = module_name ~ ".from({" ~ rs::join(",", values) ~ "})";
		return [t, content];
	}
	
	
	
	/**
	 * Dynamic
	 */
	pure list<TranslatorES6, string> Dynamic(TranslatorES6 t, BaseOpCode op_code, bool is_call = false)
	{
		if (op_code instanceof OpIdentifier)
		{
			return static::OpIdentifier(t, op_code);
		}
		else if (op_code instanceof OpAttr)
		{
			Vector<BaseOpCode> attrs = new Vector();
			OpAttr op_code_item = op_code;
			BaseOpCode op_code_first = op_code;
			string first_item = "";
			string prev_kind = "";
			string s = "";
			bool first_item_complex = false;
			
			while (op_code_first instanceof OpAttr)
			{
				attrs.pushValue(op_code_first);
				op_code_item = op_code_first;
				op_code_first = op_code_first.obj;
			}
			
			attrs = attrs.reverseIm();
			
			if (op_code_first instanceof OpCall)
			{
				prev_kind = "var";
				list res = static::OpCall(t, op_code_first); t = res[0]; s = res[1];
				first_item_complex = true;
			}
			else if (op_code_first instanceof OpNew)
			{
				prev_kind = "var";
				list res = static::OpNew(t, op_code_first); t = res[0]; s = "(" ~ res[1] ~ ")";
				first_item_complex = true;
			}
			else if (op_code_first instanceof OpCollection)
			{
				prev_kind = "var";
				list res = static::OpCollection(t, op_code_first); t = res[0]; s = res[1];
				first_item_complex = true;
			}
			else if (op_code_first instanceof OpDict)
			{
				prev_kind = "var";
				list res = static::OpDict(t, op_code_first); t = res[0]; s = res[1];
				first_item_complex = true;
			}
			else if (op_code_first instanceof OpIdentifier)
			{
				if (op_code_first.kind == OpIdentifier::KIND_CLASSREF)
				{
					if (op_code_first.value == "static")
					{
						s = "this" ~ (not t.is_static_function ? ".constructor" : "");
						prev_kind = "static";
					}
					else if (op_code_first.value == "parent")
					{
						s = static::useModuleName(t, t.current_class_extends_name);
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
				else if (op_code_first.kind == OpIdentifier::KIND_PIPE)
				{
					prev_kind = "var";
					s = t.pipe_var_name ~ ".val";
				}
				else
				{
					list res = static::OpIdentifier(t, op_code_first); t = res[0]; s = res[1];
					prev_kind = "var";
					if (t.modules.has(op_code_first.value) or op_code_first.kind == OpIdentifier::KIND_SYS_TYPE)
					{
						prev_kind = "static";
					}
				}
			}
			
			first_item = s;
			if (first_item_complex and t.is_pipe)
			{
				list res = t::addSaveOpCode
				(
					t,
					{
						"var_content": first_item,
					}
				);
				t = res[0];
				first_item = res[1];
				s = first_item;
			}
			
			int attrs_sz = attrs.count();
			for (int i=0; i<attrs_sz; i++)
			{
				OpAttr attr = attrs.item(i);
				
				if (attr.kind == OpAttr::KIND_ATTR)
				{
					s ~= "." ~ attr.value.value;
					
					/* Pipe */
					if (t.is_pipe and not is_call)
					{
						if (i == attrs_sz - 1)
						{
							s ~= ".bind(" ~ first_item ~ ")";
						}
						else
						{
							first_item = s;
						}
					}
				}
				else if (attr.kind == OpAttr::KIND_STATIC)
				{
					if (prev_kind == "var")
					{
						s ~= ".constructor." ~ attr.value.value;
						first_item ~= ".constructor";
					}
					else if (prev_kind == "parent")
					{
						if (t.current_function.isStatic()) s ~= "." ~ attr.value.value ~ ".bind(this)";
						else s ~= ".prototype." ~ attr.value.value ~ ".bind(this)";
					}
					else s ~= "." ~ attr.value.value;
					
					/* Pipe */
					if (t.is_pipe and prev_kind != "parent" and not is_call)
					{
						if (i == attrs_sz - 1)
						{
							s ~= ".bind(" ~ first_item ~ ")";
						}
						else
						{
							first_item = s;
						}
					}
					prev_kind = "static";
				}
				else if (attr.kind == OpAttr::KIND_DYNAMIC)
				{
					list res = static::Expression(t, attr.value);
					t = res[0];
					/* s ~= "[" ~ res[1] ~ "]"; */
					s = "Runtime.rtl.get(ctx, " ~ s ~ ", " ~ res[1] ~ ")";
				}
				else if (attr.kind == OpAttr::KIND_DYNAMIC_ATTRS)
				{
					Vector<BaseOpCode> items = new Vector();
					if (attr.attrs != null)
					{
						for (int j=0; j<attr.attrs.count(); j++)
						{
							list res = static::Expression(t, attr.attrs[j]);
							t = res[0];
							items.pushValue(res[1]);
						}
					}
					s = "Runtime.rtl.attr(ctx, " ~ s ~ ", [" ~ rs::join(", ", items) ~ "])";
				}
			}
			
			return [t, s];
		}
		else if (op_code instanceof OpCurry)
		{
			list res = static::OpCurry(t, op_code); t = res[0]; string content = res[1];
			list res = t::addSaveOpCode
			(
				t,
				{
					"var_content": content,
				}
			);
			t = res[0];
			string var_name = res[1];
			return [t, var_name];
		}
		else if (op_code instanceof OpCall)
		{
			return static::OpCall(t, op_code);
		}
		return [t, ""];
	}
	
	
	
	/**
	 * OpInc
	 */
	pure list<TranslatorES6, string> OpInc(TranslatorES6 t, OpInc op_code)
	{
		string content = "";
		list res = static::Expression(t, op_code.value); t = res[0]; string s = res[1];
		
		if (op_code.kind == OpInc::KIND_PRE_INC) content = "++" ~ s;
		else if (op_code.kind == OpInc::KIND_PRE_DEC) content = "--" ~ s;
		else if (op_code.kind == OpInc::KIND_POST_INC) content = s ~ "++";
		else if (op_code.kind == OpInc::KIND_POST_DEC) content = s ~ "--";
		
		return [t, content];
	}
	
	
	
	/**
	 * OpMath
	 */
	pure list<TranslatorES6, string> OpMath(TranslatorES6 t, OpMath op_code)
	{
		list res = static::Expression(t, op_code.value1); t = res[0];
		int opcode_level1 = res[0].opcode_level;
		string s1 = res[1];
		
		string op = ""; string op_math = op_code.math;
		int opcode_level = 0;
		if (op_code.math == "!") { opcode_level = 16; op = "!"; }
		if (op_code.math == ">>") { opcode_level = 12; op = ">>"; }
		if (op_code.math == "<<") { opcode_level = 12; op = "<<"; }
		if (op_code.math == "&") { opcode_level = 9; op = "&"; }
		if (op_code.math == "xor") { opcode_level = 8; op = "^"; }
		if (op_code.math == "|") { opcode_level = 7; op = "|"; }
		if (op_code.math == "*") { opcode_level = 14; op = "*"; }
		if (op_code.math == "/") { opcode_level = 14; op = "/"; }
		if (op_code.math == "%") { opcode_level = 14; op = "%"; }
		if (op_code.math == "div") { opcode_level = 14; op = "div"; }
		if (op_code.math == "mod") { opcode_level = 14; op = "mod"; }
		if (op_code.math == "+") { opcode_level = 13; op = "+"; }
		if (op_code.math == "-") { opcode_level = 13; op = "-"; }
		if (op_code.math == "~") { opcode_level = 13; op = "+"; }
		if (op_code.math == "!") { opcode_level = 13; op = "!"; }
		if (op_code.math == "===") { opcode_level = 10; op = "==="; }
		if (op_code.math == "!==") { opcode_level = 10; op = "!=="; }
		if (op_code.math == "==") { opcode_level = 10; op = "=="; }
		if (op_code.math == "!=") { opcode_level = 10; op = "!="; }
		if (op_code.math == ">=") { opcode_level = 10; op = ">="; }
		if (op_code.math == "<=") { opcode_level = 10; op = "<="; }
		if (op_code.math == ">") { opcode_level = 10; op = ">"; }
		if (op_code.math == "<") { opcode_level = 10; op = "<"; }
		if (op_code.math == "is") { opcode_level = 10; op = "instanceof"; }
		if (op_code.math == "instanceof") { opcode_level = 10; op = "instanceof"; }
		if (op_code.math == "implements") { opcode_level = 10; op = "implements"; }
		if (op_code.math == "not") { opcode_level = 16; op = "!"; }
		if (op_code.math == "and") { opcode_level = 6; op = "&&"; }
		if (op_code.math == "&&") { opcode_level = 6; op = "&&"; }
		if (op_code.math == "or") { opcode_level = 5; op = "||"; }
		if (op_code.math == "||") { opcode_level = 5; op = "||"; }
		
		string content = "";
		if (op_code.math == "!" or op_code.math == "not")
		{
			content = op ~ t.o(s1, opcode_level1, opcode_level);
		}
		else
		{
			list res = static::Expression(t, op_code.value2); t = res[0];
			int opcode_level2 = res[0].opcode_level;
			string s2 = res[1];
			string op1 = t.o(s1, opcode_level1, opcode_level);
			string op2 = t.o(s2, opcode_level2, opcode_level);
			
			if (op_math == "~")
			{
				content = op1 ~ " " ~ op ~ " " ~ static::rtlToStr(t, op2);
			}
			else if (op_math == "implements")
			{
				string rtl_name = static::findModuleName(t, "rtl");
				content = rtl_name ~ ".is_implements(" ~ op1 ~ ", " ~ op2 ~ ")";
			}
			else
			{
				content = op1 ~ " " ~ op ~ " " ~ op2;
			}
		}
		
		t <= opcode_level <= opcode_level;
		return [t, content];
	}
	
	
	
	/**
	 * OpMethod
	 */
	pure list<TranslatorES6, string> OpMethod(TranslatorES6 t, OpMethod op_code)
	{
		string content = "";
		string val1 = "";
		string val2 = op_code.value2;
		string prev_kind = "";
		
		if (op_code.value1.kind == OpIdentifier::KIND_CLASSREF)
		{
			if (op_code.value1.value == "static")
			{
				val1 = "this" ~ (not t.is_static_function ? ".constructor" : "");
				prev_kind = "static";
			}
			else if (op_code.value1.value == "parent")
			{
				val1 = static::useModuleName(t, t.current_class_extends_name);
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
			list res = static::OpIdentifier(t, op_code.value1); t = res[0]; val1 = res[1];
			if (op_code.kind == OpMethod::KIND_STATIC)
			{
				val1 ~= ".constructor";
			}
		}
		
		content = val1 ~ "." ~ val2 ~ ".bind(" ~ val1 ~ ")";
		
		t <= opcode_level <= 0;
		return [t, content];
	}
	
	
	
	/**
	 * OpNew
	 */
	pure list<TranslatorES6, string> OpNew(TranslatorES6 t, OpInc op_code)
	{
		string content = "new ";
		list res = static::OpTypeIdentifier(t, op_code.value); t = res[0]; content ~= res[1];
		bool flag = false;
		
		content ~= "(";
		if (t.current_function == null or t.current_function.is_context)
		{
			content ~= "ctx";
			flag = true;
		}
		for (int i=0; i<op_code.args.count(); i++)
		{
			BaseOpCode item = op_code.args.item(i);
			list res = t.expression::Expression(t, item); t = res[0]; string s = res[1];
			content ~= (flag ? ", " : "") ~ s;
			flag = true;
		}
		content ~= ")";
		
		return [t, content];
	}
	
	
	
	/**
	 * OpCurry
	 */
	pure list<TranslatorES6, string> OpCurry(TranslatorES6 t, OpCurry op_code)
	{
		string content = "";
		string s = "";
		
		Collection<OpCurryArg> args = op_code.args
			.filter( bool (BaseOpCode arg) => arg instanceof OpCurryArg )
			.sortIm(
				int (OpCurryArg arg1, OpCurryArg arg2) =>
					(arg1.pos > arg2.pos) ? 1 : ( (arg1.pos < arg2.pos) ? -1 : 0 )
			)
		;
		
		int args_sz = args.count();
		for (int i=0; i<args_sz; i++)
		{
			OpCurryArg arg = args.item(i);
			if (args_sz - 1 == i)
			{
				content ~= "(ctx, __varg" ~ arg.pos ~ ") => ";
			}
			else
			{
				content ~= "(__ctx" ~ arg.pos ~ ", __varg" ~ arg.pos ~ ") => ";
			}
		}
		
		bool flag = false;
		list res = t.expression::Dynamic(t, op_code.obj, true); t = res[0]; content ~= res[1];
		if (s == "parent")
		{
			content = static::useModuleName(t, t.current_class_extends_name);
			if (t.current_function.name != "constructor")
			{
				if (t.current_function.isStatic()) content ~= "." ~ t.current_function.name;
				else content ~= ".prototype." ~ t.current_function.name;
			}
			content ~= ".call(this, ctx"; flag = true;
		}
		else { content ~= "(ctx"; flag = true; }
		
		for (int i=0; i<op_code.args.count(); i++)
		{
			s = "";
			BaseOpCode item = op_code.args.item(i);
			if (item instanceof OpCurryArg)
			{
				s ~= "__varg" ~ item.pos;
			}
			else
			{
				list res = static::Expression(t, item); t = res[0]; s = res[1];
			}
			content ~= (flag ? ", " : "") ~ s;
			flag = true;
		}
		content ~= ")";
		
		return [t, content];
	}
	
	
	
	/**
	 * OpCall
	 */
	pure list<TranslatorES6, string> OpCall(
		TranslatorES6 t, OpCall op_code
	)
	{
		string s = "";
		bool flag = false;
		list res = t.expression::Dynamic(t, op_code.obj, true); t = res[0]; s = res[1];
		if (s == "parent")
		{
			s = static::useModuleName(t, t.current_class_extends_name);
			if (t.current_function.name != "constructor") 
			{
				if (t.current_function.isStatic()) s ~= "." ~ t.current_function.name;
				else s ~= ".prototype." ~ t.current_function.name;
			}
			s ~= ".call(this"; flag = true;
		}
		else s ~= "(";
		
		string content = s;
		if (op_code.obj instanceof OpIdentifier and op_code.obj.value == "_")
		{
			content ~= (flag ? ", " : "") ~ "ctx";
			flag = true;
		}
		else if (t.current_function.is_context and op_code.is_context)
		{
			content ~= (flag ? ", " : "") ~ "ctx";
			flag = true;
		}
		
		if (op_code.is_html)
		{
			content ~= (flag ? ", " : "") ~
				"component, render_params, render_content";
			flag = true;
		}
		
		for (int i=0; i<op_code.args.count(); i++)
		{
			BaseOpCode item = op_code.args.item(i);
			list res = t.expression::Expression(t, item); t = res[0]; string s = res[1];
			content ~= (flag ? ", " : "") ~ s;
			flag = true;
		}
		content ~= ")";
		
		if (t.current_function.isFlag("async") and op_code.is_await and t.isAsyncAwait())
		{
			content = "await " ~ content;
		}
		
		return [t, content];
	}
	
	
	
	/**
	 * OpClassOf
	 */
	pure list<TranslatorES6, string> OpClassOf(TranslatorES6 t, OpClassOf op_code)
	{
		Collection<string> names = static::findModuleNames(t, op_code.entity_name.names);
		string s = rs::join(".", names);
		return [t, static::toString(s)];
	}
	
	
	
	/**
	 * OpTernary
	 */
	pure list<TranslatorES6, string> OpTernary(TranslatorES6 t, OpTernary op_code)
	{
		string content = "";
		
		t <= opcode_level <= 100;
		list res = t.expression::Expression(t, op_code.condition); t = res[0]; string condition = res[1];
		list res = t.expression::Expression(t, op_code.if_true); t = res[0]; string if_true = res[1];
		list res = t.expression::Expression(t, op_code.if_false); t = res[0]; string if_false = res[1];
		
		content ~= "(" ~ condition ~ ") ? (" ~ if_true ~ ") : (" ~ if_false ~ ")";
		t <= opcode_level <= 0;
		
		/* OpTernary */
		return [t, content];
	}
	
	
	
	/**
	 * OpPipe
	 */
	pure list<TranslatorES6, string> OpPipe(TranslatorES6 t, OpPipe op_code, bool is_expression = true)
	{
		string content = "";
		string var_name = "";
		string value = "";
		
		/* use Runtime.Monad */
		var monad_name = "Runtime.Monad";
		if (t.use_module_name)
		{
			list res = t::addSaveOpCode
			(
				t,
				{
					"var_content": static::useModuleName(t, "Runtime.Monad"),
				}
			);
			t = res[0];
			monad_name = res[1];
		}
		
		list res = t::incSaveOpCode(t);
		t = res[0]; var_name = res[1];
		t <= pipe_var_name <= var_name;
		
		Vector<OpPipe> items = new Vector();
		BaseOpCode op_code_item = op_code;
		while (op_code_item instanceof OpPipe)
		{
			items.pushValue(op_code_item);
			op_code_item = op_code_item.obj;
		}
		items = items.reverseIm();
		
		/* First item */
		list res = t.expression::Expression(t, op_code_item); t = res[0]; value = res[1];
		list res = t::addSaveOpCode
		(
			t,
			{
				"content": 
					t.s("var " ~ var_name ~ " = new " ~ monad_name~ "(ctx, " ~ value ~ ");")
				,
			}
		);
		t = res[0];
		
		/* Output items */
		for (int i=0; i<items.count(); i++)
		{
			string s1 = "";
			string s2 = "";
			OpPipe op_item = items.item(i);
			Vector<string> args = new Vector();
			
			if (op_item.kind == OpPipe::KIND_ATTR)
			{
				list res = static::Expression(t, op_item.value); t = res[0]; value = res[1];
				s1 = var_name ~ ".attr(ctx, " ~ value ~ ")";
			}
			else if (op_item.kind == OpPipe::KIND_METHOD)
			{
				list res = static::Dynamic(t, op_item.value); t = res[0]; value = res[1];
				s2 = "try{ ";
				s2 ~= var_name~"=("~var_name~".val!=null && "~var_name~".err==null) ? new "~monad_name~"(ctx, "~value~") : "~var_name~";";
				s2 ~= " } catch (err) { ";
				s2 ~= var_name~"=new "~monad_name~"(ctx, null, err);";
				s2 ~= " }";
			}
			else if (op_item.kind == OpPipe::KIND_CALL)
			{
				t <= is_pipe <= true;
				
				string args = "";
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
				list res = static::Dynamic(t, op_item.value); t = res[0]; value = res[1];
				
				if (not op_item.is_async or not t.enable_async_await)
				{
					if (op_item.is_monad)
					{
						s1 = var_name ~ ".monad(ctx, " ~ value ~ ")";
					}
					else
					{
						s1 = var_name ~ ".call(ctx, " ~ value ~ args ~ ")";
					}
				}
				else if (op_item.is_async and t.current_function.isFlag("async"))
				{
					if (t.isEmulateAsyncAwait())
					{
						if (op_item.is_monad)
						{
							s2 = var_name ~ ".monadAsync(ctx, " ~ value ~ ")";
						}
						else
						{
							s2 = var_name ~ ".callAsync(ctx, " ~ value ~ args ~ ")";
						}
					}
					else if (t.isAsyncAwait())
					{
						if (op_item.is_monad)
						{
							s1 = "await " ~ var_name ~ ".monadAsync(ctx, " ~ value ~ ")";
						}
						else
						{
							s1 = "await " ~ var_name ~ ".callAsync(ctx, " ~ value ~ args ~ ")";
						}
					}
				}
				
				t <= is_pipe <= false;
			}
			
			if (s1 != "")
			{
				list res = t::addSaveOpCode
				(
					t,
					{
						"content": 
							t.s(var_name ~ " = " ~ s1 ~ ";")
						,
					}
				);
				t = res[0];
			}
			
			if (s2 != "")
			{
				list res = t::addSaveOpCode
				(
					t,
					{
						"content": t.s(s2),
					}
				);
				t = res[0];
			}
			
			/*
			if (s2 != "")
			{
				list res = t.async_await::nextPos(t); t = res[0]; string next_pos = res[1];
				string async_t = t.async_await.async_t;
				string s3 = t.s
				(
					"return " ~ async_t ~
					".jump(ctx, " ~ next_pos ~ ")" ~
					".call(ctx, " ~ s2 ~ "," ~ t.expression::toString(var_name) ~ ");"
				);
				t = t.levelDec();
				s3 ~= t.s("}");
				s3 ~= t.s("else if (" ~ async_t ~ ".pos(ctx) == " ~ next_pos ~ ")");
				s3 ~= t.s("{");
				t = t.levelInc();
				s3 ~= t.s(
					"var " ~ var_name ~ " = " ~ async_t ~ 
					".getVar(ctx, " ~ t.expression::toString(var_name) ~ ");"
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
		
		return [t, var_name ~ ".value(ctx)"];
	}
	
	
	
	/**
	 * OpTypeConvert
	 */
	pure list<TranslatorES6, string> OpTypeConvert(TranslatorES6 t, OpTypeConvert op_code)
	{
		string content = "";
		list res = static::Expression(t, op_code.value); t = res[0]; string value = res[1];
		content = static::useModuleName(t, "rtl") ~ 
			".to(" ~ value ~ ", " ~ static::toPattern(t, op_code.pattern) ~ ")"
		;
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareFunction
	 */
	pure list<TranslatorES6, string> OpDeclareFunction(TranslatorES6 t, OpDeclareFunction op_code)
	{
		string content = "";
		string is_async = "";
		if (op_code.isFlag("async") and t.isAsyncAwait()) is_async = "async ";
		
		/* Set function name */
		OpDeclareFunction save_f = t.current_function;
		t <= current_function <= op_code;
		
		list res = t.operator::OpDeclareFunctionArgs(t, op_code); string args = res[1];
		content ~= is_async ~ "(" ~ args ~ ") => ";
		list res = t.operator::OpDeclareFunctionBody(t, op_code);
		content ~= res[1];
		
		/* Restore function */
		t <= current_function <= save_f;
		
		/* OpTernary */
		return [t, content];
	}
	
	
	
	/**
	 * Expression
	 */
	pure list<TranslatorES6, string> Expression(TranslatorES6 t, BaseOpCode op_code)
	{
		string content = "";
		bool save_is_pipe = t.is_pipe;
		t <= opcode_level <= 100;
		t <= is_pipe <= false;
		
		if (op_code instanceof OpIdentifier)
		{
			list res = static::OpIdentifier(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpTypeIdentifier)
		{
			list res = static::OpTypeIdentifier(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpNumber)
		{
			list res = static::OpNumber(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpString)
		{
			list res = static::OpString(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpCollection)
		{
			list res = static::OpCollection(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpDict)
		{
			list res = static::OpDict(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpInc)
		{
			t <= opcode_level <= 16;
			list res = static::OpInc(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpMath)
		{
			list res = static::OpMath(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpMethod)
		{
			list res = static::OpMethod(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpNew)
		{
			list res = static::OpNew(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpAttr)
		{
			list res = static::Dynamic(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpCall)
		{
			list res = static::OpCall(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpClassOf)
		{
			list res = static::OpClassOf(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpCurry)
		{
			list res = static::OpCurry(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpPipe)
		{
			list res = static::OpPipe(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpTernary)
		{
			list res = static::OpTernary(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpTypeConvert)
		{
			list res = static::OpTypeConvert(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpDeclareFunction)
		{
			list res = static::OpDeclareFunction(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpHtmlItems)
		{
			t <= is_html <= true;
			list res = t.html::OpHtmlItems(t, op_code); t = res[0]; content = res[1];
			t <= is_html <= false;
		}
		else if (op_code instanceof OpPreprocessorIfDef)
		{
			list res = t.operator::OpPreprocessorIfDef(t, op_code, OpPreprocessorIfDef::KIND_EXPRESSION);
			t = res[0]; content = res[1];
		}
		
		t <= is_pipe <= save_is_pipe;
		return [t, content];
	}
	
}
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

namespace Bayrell.Lang.LangES6;

use Runtime.lib;
use Runtime.re;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangBay.ParserBayHtml;
use Bayrell.Lang.LangES6.TranslatorES6;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpFor;
use Bayrell.Lang.OpCodes.OpHtmlAttribute;
use Bayrell.Lang.OpCodes.OpHtmlContent;
use Bayrell.Lang.OpCodes.OpHtmlItems;
use Bayrell.Lang.OpCodes.OpHtmlTag;
use Bayrell.Lang.OpCodes.OpHtmlValue;
use Bayrell.Lang.OpCodes.OpIf;
use Bayrell.Lang.OpCodes.OpString;
use Bayrell.Lang.OpCodes.OpWhile;


class TranslatorES6Html
{

	/**
	 * Is component
	 */
	pure bool isComponent(string tag_name)
	{
		if (tag_name == "") return false;
		string ch1 = rs::substr(tag_name, 0, 1);
		string ch2 = rs::strtoupper(ch1);
		return ch1 == "{" or ch1 == ch2;
	}
	
	
	
	/**
	 * Translator html value
	 */
	pure list<TranslatorES6, string> OpHtmlAttr(TranslatorES6 t, OpHtmlAttribute attr, int item_pos)
	{
		BaseOpCode op_code = attr.value;
		
		if (attr instanceof OpString)
		{
			return [t, t.expression::toString(op_code.value)];
		}
		if (op_code instanceof OpHtmlValue)
		{
			if (op_code.kind == OpHtmlValue::KIND_RAW)
			{
				list res = t.expression::Expression(t, op_code.value); t = res[0]; string value = res[1];
				return [t, value];
			}
			else if (op_code.kind == OpHtmlValue::KIND_JSON)
			{
				list res = t.expression::Expression(t, op_code.value); 
				t = res[0]; string value = res[1];
				value = "Runtime.rtl.json_encode(ctx, " ~ value ~ ")";
				return [t, value];
			}
		}
		
		list res = t.expression::Expression(t, op_code); t = res[0]; string value = res[1];
		value = t.o(value, res[0].opcode_level, 13);
		
		return [t, value];
	}
	
	
	
	/**
	 * Translator html template
	 */
	pure list<TranslatorES6, string> OpHtmlAttrs(
		TranslatorES6 t, Collection<OpHtmlAttribute> attrs, int item_pos
	)
	{
		Vector<string> attr_class = new Vector<string>();
		string attr_s = "null";
		string attr_key_value = "";
		string attr_elem_name = "";
		bool has_attr_key = false;
		
		Vector<string> res_attrs = new Vector();
		
		for (int attrs_i = 0; attrs_i<attrs.count(); attrs_i++)
		{
			OpHtmlAttribute attr = attrs[attrs_i];
		
			if (attr.is_spread) continue;
			
			list res = static::OpHtmlAttr(t, attr);
			t = res[0]; string attr_value = res[1];
			
			string attr_key = attr.key;
			string ch = rs::substr(attr_key, 0, 1);
			bool is_event = rs::substr(attr_key, 0, 7) == "@event:";
			bool is_signal = rs::substr(attr_key, 0, 8) == "@signal:";
			
			if (attr_key == "class")
			{
				attr_class.pushValue(attr_value);
				
				if (attr_elem_name == "" and attr.value instanceof OpString)
				{
					var arr = rs::split(" ", attr.value.value);
					attr_elem_name = t.expression::toString(arr[0]);
				}
				
				continue;
			}
			else if (attr_key == "@key")
			{
				list res = static::OpHtmlAttr(t, attr); t = res[0]; attr_value = res[1];
				attr_key_value = attr_value;
				
				continue;
			}
			else if (is_event or is_signal)
			{
				string event_name = "";
				
				if (is_event) event_name = rs::substr(attr_key, 7);
				else if (is_signal) event_name = rs::substr(attr_key, 8);
				
				event_name = t.expression::findModuleName(t, event_name);
				
				if (is_event) attr_key = "@event:" ~ event_name;
				else if (is_signal) attr_key = "@signal:" ~ event_name;
				
				if (attr.value instanceof OpString)
				{
					attr_value = "[component," ~ attr_value ~ "]";
				}
				else
				{
					attr_value = "[component,(msg)=>{" ~ attr_value ~ "}]";
				}
			}
			else if (attr_key == "@ref" or attr_key == "@bind" or attr_key == "@model" or
				attr_key == "@name" or attr_key == "@watch")
			{
				/*res_attrs.push
				(
					t.expression::toString("@model_path") ~
						": this._concat_attrs(ctx, params, \"@model_path\", " ~
						attr_value ~ ")"
				);*/
				attr_value = "[component," ~ attr_value ~ "]";
			}
			
			res_attrs.pushValue
			(
				t.expression::toString(attr_key) ~ ":" ~ attr_value,
			);
		}
			
		res_attrs = res_attrs.filter( bool (string s) => s != "" );
		if (attr_class.count() > 0)
		{
			attr_class.pushValue( "this.getCssHash(ctx)" );
			/*attr_class.push( t.expression::toString("h-" ~ ParserBayHtml::getCssHash(t.current_class_full_name)) );*/
			res_attrs.pushValue
			(
				"\"class\":" ~ "[" ~ rs::join(", ", attr_class) ~ "].join(\" \")"
			);
		}
		if (attr_key_value != "")
		{
			res_attrs.pushValue
			(
				"\"@key\":" ~ attr_key_value
			);
		}
		if (attr_elem_name != "")
		{
			res_attrs.pushValue
			(
				"\"@elem_name\":" ~ attr_elem_name
			);
		}
		if (res_attrs.count() > 0)
		{
			attr_s = "{" ~ rs::join(",", res_attrs) ~ "}";
		}
		else attr_s = "{}";
		
		/* Add spreads */
		for (int i=0; i<attrs.count(); i++)
		{
			OpHtmlAttribute attr = attrs[i];
			if (not attr.is_spread) continue;
			attr_s = "this._merge_attrs(ctx, "~attr_s~","~attr.value.value~")";
		}
		
		return [t, attr_s];
	}
	
	
	
	/**
	 * Returns class name
	 */
	pure string getOpHtmlAttrsClassName(Collection<OpHtmlAttribute> attrs)
	{
		Vector<string> class_names = new Vector();
		if (attrs != "")
		{
			for (int attrs_i=0; attrs_i<attrs.count(); attrs_i++)
			{
				OpHtmlAttribute attr = attrs[attrs_i];
				string attr_key = attr.key;
				if (attr_key == "class")
				{
					if (attr.value instanceof OpString)
					{
						class_names.pushValue(attr.value.value);
					}
				}
			}
		}
		return rs::join(" ", class_names);
	}
	
	
	
	/**
	 * Translator html template
	 */
	pure list<TranslatorES6, string> OpHtmlTag(
		TranslatorES6 t, OpHtmlTag op_code, int item_pos, string var_name)
	{
		string content = "";
		string content2 = "";
		string str_var_name = t.expression::toString(var_name);
		string new_var_name = "";
		list res = t::incSaveOpCode(t); t = res[0]; new_var_name = res[1];
		
		if (op_code instanceof OpHtmlContent)
		{
			string item_value = t.expression::toString(op_code.value);
			content ~= t.s("/* Text */");
			content ~= t.s("let " ~ new_var_name ~ " = " ~ var_name ~
				".e(ctx, \"t\", \"\", null, " ~ item_value ~ ");");
		}
		else if (op_code instanceof OpHtmlValue)
		{
			/* Save op codes */
			Collection<SaveOpCode> save_op_codes = t.save_op_codes;
			/*int save_op_code_inc = t.save_op_code_inc;*/

			list res = t.expression::Expression(t, op_code.value);
			t = res[0]; string item_value = res[1];

			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content ~= save;

			/* Restore op codes */
			t <= save_op_codes <= save_op_codes;
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			
			if (op_code.kind == OpHtmlValue::KIND_RAW)
			{
				content ~= t.s("/* Raw */");
				content ~= t.s("let " ~ new_var_name ~ " = " ~ var_name ~
					".e(ctx, \"r\", \"\", null, " ~ item_value ~ ");");
			}
			else if (op_code.kind == OpHtmlValue::KIND_HTML)
			{
				content ~= t.s("/* Html */");
				content ~= t.s("let " ~ new_var_name ~ " = " ~ var_name ~
					".e(ctx, \"h\", \"\", null, " ~ item_value ~ ");");
			}
			else if (op_code.kind == OpHtmlValue::KIND_JSON)
			{
				content ~= t.s("/* Text */");
				item_value = "Runtime.rtl.json_encode(ctx, " ~ item_value ~ ")";
				content ~= t.s("let " ~ new_var_name ~ " = " ~ var_name ~
					".e(ctx, \"t\", \"\", null, " ~ item_value ~ ");");
			}
		}
		else if (op_code instanceof OpHtmlTag)
		{
			bool has_childs = (op_code.items != null) and
				(op_code.items.items != null) and
				(op_code.items.items.count() > 0)
			;
			bool is_component = static::isComponent(op_code.tag_name);
			
			Collection<OpHtmlAttribute> op_code_attrs = op_code.attrs.filter(
				bool (OpHtmlAttribute attr) => attr.key != "@render"
			);
			
			list res = static::OpHtmlAttrs(t, op_code_attrs, item_pos);
			t = res[0]; string attrs = res[1];
			
			if (op_code.tag_name == "")
			{
				content ~= t.s("/* Items */");
				content ~= t.s("let " ~ new_var_name ~ " = " ~ var_name ~ ".e(ctx, \"empty\");");
			}
			else if (is_component)
			{
				string tag_name = "";
				if (op_code.op_code_name)
				{
					list res = t.expression::Expression(t, op_code.op_code_name);
					t = res[0]; tag_name = res[1];
				}
				else tag_name = t.expression::toString(
					t.expression::findModuleName(t, op_code.tag_name)
				);
				if (has_childs)
				{
					list res = static::OpHtmlItems(t, op_code.items);
					t = res[0]; string f = res[1];
					content ~= t.s("/* Component '" ~ op_code.tag_name ~ "' */");
					content ~= t.s("let " ~ new_var_name ~ " = " ~
						var_name ~ ".e(ctx, \"c\"," ~ tag_name ~ ", " ~
						attrs ~ ", " ~ f ~ ");");
					has_childs = false;
				}
				else
				{
					content ~= t.s("/* Component '" ~ op_code.tag_name ~ "' */");
					content ~= t.s("let " ~ new_var_name ~ " = " ~
						var_name ~ ".e(ctx, \"c\", " ~
						tag_name ~ ", " ~ attrs ~ ");");
				}
			}
			else
			{
				OpHtmlAttribute render_attr = op_code.attrs.findItem(
					bool (OpHtmlAttribute attr) => attr.key == "@render"
				);
				
				if (render_attr)
				{
					string render_attrs = "";
					if (render_attr and render_attr.value instanceof OpString)
					{
						string render_attr_value = render_attr.value.value;
						render_attr_value = t.expression::toString(render_attr_value);
						render_attrs = "{\"@ref\":[component," ~ render_attr_value ~ "]}";
					}
					
					OpHtmlTag new_op_code = op_code.copy({
						"attrs": op_code_attrs,
					});
					
					OpHtmlItems op_code_html_items = new OpHtmlItems{
						"items": [
							new_op_code
						],
					};
					
					list res = static::OpHtmlItems(t, op_code_html_items);
					t = res[0]; string f = res[1];
					
					content ~= t.s("/* Render function '" ~ op_code.tag_name ~ "' */");
					content ~= t.s("let " ~ new_var_name ~ " = " ~ var_name ~
						".e(ctx, \"f\", \"\", " ~ render_attrs ~ ", " ~ f ~ ");");
					list res = t::incSaveOpCode(t); t = res[0]; new_var_name = res[1];
					
					has_childs = false;
				}
				else
				{
					string tag_name = t.expression::toString(op_code.tag_name);
					string attr_class_name = static::getOpHtmlAttrsClassName(op_code_attrs);
					attr_class_name = rs::replace("\s", ".", attr_class_name);
					if (attr_class_name != "") attr_class_name = "." ~ attr_class_name;
					
					content ~= t.s("/* Element '" ~ op_code.tag_name ~ attr_class_name ~ "' */");
					if (op_code.tag_name == 'svg')
					{
						string svg_content = op_code["items", "items", 0, "value", "value"]
							|> default string ""
						;
						svg_content = t.expression::toString(svg_content);
						content ~= t.s("let " ~ new_var_name ~ " = " ~ var_name ~
							".e(ctx, \"e\", " ~ tag_name ~ ", " ~ attrs ~ ");");
						has_childs = false;
					}
					else
					{
						content ~= t.s("let " ~ new_var_name ~ " = " ~ var_name ~
							".e(ctx, \"e\", " ~ tag_name ~ ", " ~ attrs ~ ");");
					}
				}
			}
			
			if (has_childs)
			{
				content ~= t.s2("");
				list res = static::OpHtmlChilds(t, op_code.items, new_var_name);
				t = res[0]; content ~= res[1];
				content ~= t.s(new_var_name ~ ".p(ctx);");
			}
		}
		else
		{
			/* Save op codes */
			Collection<SaveOpCode> save_op_codes = t.save_op_codes;
			/*int save_op_code_inc = t.save_op_code_inc;*/
			
			string item_value = "";
			
			if (op_code instanceof OpCall)
			{
				list res = t.expression::OpCall(t, op_code);
				t = res[0]; item_value ~= res[1];
			}
			else
			{
				list res = t.expression::Expression(t, op_code);
				t = res[0]; item_value = res[1];
			}
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content ~= save;

			/* Restore op codes */
			t <= save_op_codes <= save_op_codes;
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			
			content ~= t.s("/* Text */");
			content ~= t.s("let " ~ new_var_name ~ " = " ~ var_name ~
				".e(ctx, \"t\", \"\", null, " ~ item_value ~ ");");
		}
		
		return [t, content];
	}
	
	
	
	/**
	 * Translator html items
	 */
	pure list<TranslatorES6, string> OpHtmlChilds
	(
		TranslatorES6 t, OpHtmlItems op_code, string control_name
	)
	{
		if (op_code == null or op_code.items.count() == 0)
		{
			return [t, ""];
		}
		
		string save_control_name = t.html_var_name;
		t <= html_var_name <= control_name;
		
		bool next_space = true;
		string content = "";
		for (int i=0; i<op_code.items.count(); i++)
		{
			OpHtmlTag item = op_code.items.item(i);
			
			/* Save op codes */
			Collection<SaveOpCode> save_op_codes = t.save_op_codes;
			/*int save_op_code_inc = t.save_op_code_inc;*/
			
			string op_content = "";
			if (i > 0 and next_space) content ~= t.s2("");
			if (not next_space) next_space = true;
			
			if (item instanceof OpAssign)
			{
				list res = t.operator::OpAssign(t, item);
				t = res[0]; op_content ~= res[1];
			}
			else if (item instanceof OpComment)
			{
				list res = t.operator::OpComment(t, item);
				t = res[0]; op_content ~= res[1];
				next_space = false;
			}
			else if (item instanceof OpFor)
			{
				list res = t.operator::OpFor(t, item);
				t = res[0]; op_content ~= res[1];
			}
			else if (item instanceof OpIf)
			{
				list res = t.operator::OpIf(t, item);
				t = res[0]; op_content ~= res[1];
			}
			else if (item instanceof OpWhile)
			{
				
				list res = t.operator::OpWhile(t, item);
				t = res[0]; op_content ~= res[1];
			}
			else
			{
				list res = static::OpHtmlTag(t, item, i, control_name);
				t = res[0]; op_content ~= res[1];
			}
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content ~= save;
			if (op_content != "") content ~= op_content;
			
			/* Restore save op codes */
			t <= save_op_codes <= save_op_codes;
			/*t <= save_op_code_inc <= save_op_code_inc;*/
		}
		
		/*
		if (control_name != "control" and patch_flag)
		{
			content ~= t.s("RenderDriver.p(" ~ control_name ~ ", " ~ control_name ~ "_childs);");
		}
		*/
		
		t <= html_var_name <= save_control_name;
		
		return [t, content];
	}
	
	
	
	/**
	 * Translator html items
	 */
	pure list<TranslatorES6, string> OpHtmlItems(TranslatorES6 t, OpHtmlItems op_code)
	{
		if (op_code == null or op_code.items.count() == 0)
		{
			return [t, ""];
		}
		
		/* Save op codes */
		TranslatorES6 save_t = t;
		Collection<SaveOpCode> save_op_codes = t.save_op_codes;
		/*int save_op_code_inc = t.save_op_code_inc;*/
		
		string content = "";
		content ~= "(ctx, __v) =>";
		content ~= t.s("{");
		t = t.levelInc();
		
		content ~= t.s("let layout = component.layout();");
		content ~= t.s("let model_path = component.model_path;");
		content ~= t.s("let model = component.model();");
		
		/* content ~= t.s("var __vnull = null;"); */
		/* content ~= t.s("var __c_childs = [];"); */
		content ~= t.s2("");
		
		list res = static::OpHtmlChilds(t, op_code, "__v");
		t = res[0]; content ~= res[1];
		/*content ~= t.s("RenderDriver.p(__c, __c_childs);");*/
		
		/* content ~= t.s2(""); */
		/* content ~= t.s("return __c_childs;"); */
		
		t = t.levelDec();
		content ~= t.s("}");
		
		/* Restore save op codes */
		t <= save_op_codes <= save_op_codes;
		/*t <= save_op_code_inc <= save_op_code_inc;*/
		
		return [t, content];
	}
	
	
	
	/**
	 * Translate html
	 */
	pure list<TranslatorES6, string> OpHtml(TranslatorES6 t, OpHtmlItems op_code)
	{
		string content = "";
		list res = static::OpHtmlItems(t, op_code); t = res[0]; content ~= res[1];
		return [t, content];
	}
}
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

namespace Bayrell.Lang.LangES6;

use Runtime.BaseStruct;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangES6.TranslatorES6;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpAssignStruct;
use Bayrell.Lang.OpCodes.OpAssignValue;
use Bayrell.Lang.OpCodes.OpAttr;
use Bayrell.Lang.OpCodes.OpBreak;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpContinue;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
use Bayrell.Lang.OpCodes.OpDelete;
use Bayrell.Lang.OpCodes.OpFor;
use Bayrell.Lang.OpCodes.OpHtmlItems;
use Bayrell.Lang.OpCodes.OpIf;
use Bayrell.Lang.OpCodes.OpIfElse;
use Bayrell.Lang.OpCodes.OpInc;
use Bayrell.Lang.OpCodes.OpItems;
use Bayrell.Lang.OpCodes.OpMath;
use Bayrell.Lang.OpCodes.OpPipe;
use Bayrell.Lang.OpCodes.OpPreprocessorIfCode;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpPreprocessorSwitch;
use Bayrell.Lang.OpCodes.OpReturn;
use Bayrell.Lang.OpCodes.OpSafe;
use Bayrell.Lang.OpCodes.OpThrow;
use Bayrell.Lang.OpCodes.OpTryCatch;
use Bayrell.Lang.OpCodes.OpTryCatchItem;
use Bayrell.Lang.OpCodes.OpWhile;


struct TranslatorES6Operator extends BaseStruct
{
	
	/**
	 * Returns true if op_code contains await
	 */
	pure memorize bool isAwait(BaseOpCode op_code)
	{
		if (op_code == null) return false;
		if (op_code instanceof OpAssign)
		{
			if (op_code.kind == OpAssign::KIND_ASSIGN or op_code.kind == OpAssign::KIND_DECLARE)
			{
				for (int i=0; i<op_code.values.count(); i++)
				{
					OpAssignValue item = op_code.values.item(i);
					bool flag = static::isAwait(item.expression);
					if (flag) return true;
				}
			}
			else if (op_code.kind == OpAssign::KIND_STRUCT)
			{
				bool flag = static::isAwait(op_code.expression);
				if (flag) return true;
			}
		}
		else if (op_code instanceof OpAssignStruct)
		{
			bool flag = static::isAwait(op_code.expression);
			if (flag) return true;
		}
		else if (op_code instanceof OpAttr)
		{
			BaseOpCode op_code_next = op_code;
			while (op_code_next instanceof OpAttr)
			{
				op_code_next = op_code_next.obj;
			}
			return static::isAwait(op_code_next);
		}
		else if (op_code instanceof OpCall)
		{
			return op_code.is_await;
		}
		else if (op_code instanceof OpPipe)
		{
			if (op_code.is_async) return true;
			return static::isAwait(op_code.value);
		}
		else if (op_code instanceof OpFor)
		{
			return static::isAwait(op_code.expr2) or static::isAwait(op_code.value);
		}
		else if (op_code instanceof OpIf)
		{
			bool flag = false;
			flag = static::isAwait(op_code.condition); if (flag) return true;
			flag = static::isAwait(op_code.if_true); if (flag) return true;
			flag = static::isAwait(op_code.if_false); if (flag) return true;
			for (int i=0; i<op_code.if_else.count(); i++)
			{
				OpIfElse if_else = op_code.if_else.item(i);
				flag = static::isAwait(if_else.condition); if (flag) return true;
				flag = static::isAwait(if_else.if_true); if (flag) return true;
			}
		}
		else if (op_code instanceof OpItems)
		{
			for (int i=0; i<op_code.items.count(); i++)
			{
				BaseOpCode item = op_code.items.item(i);
				bool flag = static::isAwait(item);
				if (flag) return true;
			}
		}
		else if (op_code instanceof OpMath)
		{
			if (op_code.math == "!" or op_code.math == "not")
			{
				return static::isAwait(op_code.value1);
			}
			else
			{
				return static::isAwait(op_code.value1) or static::isAwait(op_code.value2);
			}
		}
		else if (op_code instanceof OpReturn)
		{
			bool flag = static::isAwait(op_code.expression);
			if (flag) return true;
		}
		else if (op_code instanceof OpTryCatch)
		{
			return static::isAwait(op_code.op_try);
		}
		else if (op_code instanceof OpWhile)
		{
			return static::isAwait(op_code.condition) or static::isAwait(op_code.value);
		}
		return false;
	}
	
	
	
	/**
	 * OpAssign
	 */
	pure list<TranslatorES6, string> OpAssignStruct(TranslatorES6 t, OpAssignStruct op_code, int pos = 0)
	{
		string content = "";
		string var_name = op_code.var_name;
		list res = t.expression::Expression(t, op_code.expression); t = res[0]; string expr = res[1];
		
		Collection names = op_code.names.map
		(
			string (var item) use (t)
			{
				if (item instanceof BaseOpCode)
				{
					list res = t.expression::Expression(t, item); t = res[0];
					return res[1];
				}
				return t.expression::toString(item);
			}
		);
		
		content = "Runtime.rtl.setAttr(ctx, " ~ var_name ~ ", Runtime.Collection.from([" ~ rs::join(", ", names) ~ "]), " ~ expr ~ ")";
		return [t, content];
	}
	
	
	
	/**
	 * OpAssign
	 */
	pure list<TranslatorES6, string> OpAssign(TranslatorES6 t, OpAssign op_code, bool flag_indent = true)
	{
		string content = "";
		
		if (op_code.kind == OpAssign::KIND_ASSIGN or op_code.kind == OpAssign::KIND_DECLARE)
		{
			for (int i=0; i<op_code.values.count(); i++)
			{
				OpAssignValue item = op_code.values.item(i);
				
				string s = "";
				string item_expression = "";
				string op = item.op; if (op == "") op = "=";
				
				if (item.expression != null)
				{
					list res = t.expression::Expression(t, item.expression); t = res[0];
					if (op == "~=") item_expression = t.expression::rtlToStr(t, res[1]);
					else item_expression = res[1];
				}
				
				if (item.op_code instanceof OpAttr)
				{
					Vector<string> items = new Vector();
					Vector<string> items2 = new Vector();
					
					BaseOpCode op_code_next = item.op_code;
					while (op_code_next instanceof OpAttr)
					{
						items.pushValue(op_code_next);
						op_code_next = op_code_next.obj;
					}
					
					items = items.reverseIm();
					list res = t.expression::OpIdentifier(t, op_code_next);
					t = res[0]; string obj_s = res[1];
					
					for (int j=0; j<items.count(); j++)
					{
						OpAttr item_attr = items[j];
						
						if (item_attr.kind == OpAttr::KIND_ATTR)
						{
							obj_s ~= "." ~ item_attr.value.value;
							items2.pushValue( t.expression::toString(item_attr.value.value) );
						}
						else if (item_attr.kind == OpAttr::KIND_DYNAMIC)
						{
							list res = t.expression::Expression(t, item_attr.value); t = res[0];
							obj_s ~= "[" ~ res[1] ~ "]";
							items2.pushValue(res[1]);
						}
						else if (item_attr.kind == OpAttr::KIND_DYNAMIC_ATTRS)
						{
							if (item_attr.attrs != null)
							{
								for (int j=item_attr.attrs.count() - 1; j>=0; j--)
								{
									list res = t.expression::Expression(t, item_attr.attrs[j]); t = res[0];
									obj_s ~= "[" ~ res[1] ~ "]";
									items2.pushValue(res[1]);
								}
							}
						}
					}
					
					if (op == "~=" or op == "+=" or op == "-=")
					{
						
						string op2 = "+";
						if (op == "~=" or op == "+=") op2 = "+";
						else if (op == "-=") op2 = "-";
						
						item_expression =
							"Runtime.rtl.attr(ctx, " ~ obj_s ~ ", [" ~
							rs::join(", ", items2) ~ "]) " ~ op2 ~ " " ~
							item_expression
						;
					}
					
					s = obj_s ~ " = " ~ item_expression;
				}
				else
				{
					if (item.op_code != null and item.op_code.value == "@" and t.enable_context == false)
					{
						s = t.expression::useModuleName(t, "rtl") ~ ".setContext(" ~ item_expression ~ ")";
					}
					else
					{
						if (op_code.kind == OpAssign::KIND_DECLARE)
						{
							if (t.current_function.isFlag("async") and t.isEmulateAsyncAwait()) s = item.var_name;
							else if (t.is_html) s = "let " ~ item.var_name;
							else s = "var " ~ item.var_name;
						}
						else
						{
							list res = t.expression::OpIdentifier(t, item.op_code);
							t = res[0]; s = res[1];
						}
						
						if (item_expression != "")
						{
							if (op == "~=") s ~= " += " ~ item_expression;
							else s ~= " " ~ op ~ " " ~ item_expression;
						}
					}
				}
				
				if (t.current_function.isFlag("async") and t.isEmulateAsyncAwait())
				{
					if (item.expression == null) s = "";
					else if (op_code.kind == OpAssign::KIND_DECLARE) s = s ~ ";";
				}
				else
				{
					s = s ~ ";";
				}
				
				if (s != "")
				{
					content ~= flag_indent ? t.s(s) : s;
				}
				
				if (item.var_name != "" and t.save_vars.indexOf(item.var_name) == -1)
				{
					t <= save_vars <= t.save_vars.pushIm(item.var_name);
				}
			}
		}
		else if (op_code.kind == OpAssign::KIND_STRUCT)
		{
			string s = op_code.var_name ~ " = ";
			list res = static::OpAssignStruct(t, op_code, 0); t = res[0];
			content = t.s(s ~ res[1] ~ ";");
		}
		
		return [t, content];
	}
	
	
	
	/**
	 * OpDelete
	 */
	pure list<TranslatorES6, string> OpDelete(TranslatorES6 t, OpDelete op_code)
	{
		string content = "";
		return [t, content];
	}
	
	
	
	/**
	 * OpFor
	 */
	pure list<TranslatorES6, string> OpFor(TranslatorES6 t, OpFor op_code)
	{
		if (t.current_function.isFlag("async") and t.isEmulateAsyncAwait())
		{
			if (static::isAwait(op_code))
			{
				return t.async_await::OpFor(t, op_code);
			}
		}
		
		string content = "";
		string s1 = "";
		string s2 = "";
		string s3 = "";
		
		if (op_code.expr1 instanceof OpAssign)
		{
			list res = static::OpAssign(t, op_code.expr1, false);
			t = res[0]; s1 = res[1];
		}
		else
		{
			list res = t.expression::Expression(t, op_code.expr1); 
			t = res[0]; s1 = res[1];
		}
		
		list res = t.expression::Expression(t, op_code.expr2); t = res[0]; s2 = res[1];
		list res = t.expression::Expression(t, op_code.expr3); t = res[0]; s3 = res[1];
		
		content = t.s("for ("~s1~s2~";"~s3~")");
		content ~= t.s("{");
		t = t.levelInc();
		list res = static::Operators(t, op_code.value); t = res[0]; content ~= res[1];
		t = t.levelDec();
		content ~= t.s("}");
		
		return [t, content];
	}
	
	
	
	/**
	 * OpIf
	 */
	pure list<TranslatorES6, string> OpIf(TranslatorES6 t, OpIf op_code)
	{
		if (t.current_function.isFlag("async") and t.isEmulateAsyncAwait())
		{
			if (static::isAwait(op_code))
			{
				return t.async_await::OpIf(t, op_code);
			}
		}
		
		string content = "";
		list res = t.expression::Expression(t, op_code.condition);
		t = res[0]; string s1 = res[1];
		
		content = t.s("if ("~s1~")");
		content ~= t.s("{");
		t = t.levelInc();
		list res = static::Operators(t, op_code.if_true); t = res[0]; content ~= res[1];
		t = t.levelDec();
		content ~= t.s("}");
		
		for (int i=0; i<op_code.if_else.count(); i++)
		{
			OpIfElse if_else = op_code.if_else.item(i);
			list res = t.expression::Expression(t, if_else.condition); 
			t = res[0]; string s2 = res[1];
			content ~= t.s("else if ("~s2~")");
			content ~= t.s("{");
			t = t.levelInc();
			list res = static::Operators(t, if_else.if_true); t = res[0]; content ~= res[1];
			t = t.levelDec();
			content ~= t.s("}");
		}
		
		if (op_code.if_false != null)
		{
			content ~= t.s("else");
			content ~= t.s("{");
			t = t.levelInc();
			list res = static::Operators(t, op_code.if_false); 
			t = res[0]; content ~= res[1];
			t = t.levelDec();
			content ~= t.s("}");
		}
		
		return [t, content];
	}
	
	
	
	/**
	 * OpReturn
	 */
	pure list<TranslatorES6, string> OpReturn(TranslatorES6 t, OpReturn op_code)
	{
		if (t.current_function.isFlag("async") and t.isEmulateAsyncAwait())
		{
			return t.async_await::OpReturn(t, op_code);
		}
		
		string content = "";
		string s1 = "";
		if (op_code.expression)
		{
			list res = t.expression::Expression(t, op_code.expression); t = res[0]; s1 = res[1];
		}
		
		if (t.current_function.flags != null and t.current_function.flags.isFlag("memorize"))
		{
			string content = t.s("var __memorize_value = " ~ s1 ~ ";");
			content ~= t.s(t.expression::useModuleName(t, "Runtime.rtl") ~ "._memorizeSave(\"" ~ 
					t.current_class_full_name ~ "." ~ t.current_function.name ~
					"\", arguments, __memorize_value);");
			content ~= t.s("return __memorize_value;");
			return [t, content];
		}
		
		if (t.current_function.isFlag("async") and t.isAsyncAwait())
		{
			content ~= t.s("return Promise.resolve(" ~ s1 ~ ");");
		}
		else
		{
			content ~= t.s("return " ~ s1 ~ ";");
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpThrow
	 */
	pure list<TranslatorES6, string> OpThrow(TranslatorES6 t, OpThrow op_code)
	{
		list res = t.expression::Expression(t, op_code.expression); t = res[0];
		string content = t.s("throw " ~ res[1]);
		return [t, content];
	}
	
	
	
	/**
	 * OpTryCatch
	 */
	pure list<TranslatorES6, string> OpTryCatch(TranslatorES6 t, OpTryCatch op_code)
	{
		if (t.current_function.isFlag("async") and t.isEmulateAsyncAwait())
		{
			if (static::isAwait(op_code))
			{
				return t.async_await::OpTryCatch(t, op_code);
			}
		}
		
		string content = "";
		
		content ~= t.s("try");
		content ~= t.s("{");
		t = t.levelInc();
		list res = static::Operators(t, op_code.op_try); t = res[0]; content ~= res[1];
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("catch (_ex)");
		content ~= t.s("{");
		t = t.levelInc();
		
		for (int i=0; i<op_code.items.count(); i++)
		{
			string s = ""; string pattern = "";
			OpTryCatchItem item = op_code.items.item(i);
			list res = t.expression::OpTypeIdentifier(t, item.pattern); t = res[0]; pattern ~= res[1];
			
			if (pattern != "var") s = "if (_ex instanceof " ~ pattern ~ ")";
			else s = "if (true)";
			
			s ~= t.s("{");
			t = t.levelInc();
			
			s ~= (s != "") ? t.s("var " ~ item.name ~ " = _ex;") : "var " ~ item.name ~ " = _ex;";
			list res = t.operator::Operators(t, item.value); t = res[0]; s ~= t.s(res[1]);
			
			t = t.levelDec();
			s ~= t.s("}");
			
			if (i != 0) s = "else " ~ s;
			content ~= t.s(s);
		}
		
		content ~= t.s("else");
		content ~= t.s("{");
		t = t.levelInc();
		content ~= t.s("throw _ex;");
		t = t.levelDec();
		content ~= t.s("}");
		t = t.levelDec();
		content ~= t.s("}");
		
		return [t, content];
	}
	
	
	
	/**
	 * OpWhile
	 */
	pure list<TranslatorES6, string> OpWhile(TranslatorES6 t, OpWhile op_code)
	{
		if (t.current_function.isFlag("async") and t.isEmulateAsyncAwait())
		{
			if (static::isAwait(op_code))
			{
				return t.async_await::OpWhile(t, op_code);
			}
		}
		
		string content = "";
		list res = t.expression::Expression(t, op_code.condition); t = res[0]; string s1 = res[1];
		
		content ~= t.s("while ("~s1~")");
		content ~= t.s("{");
		t = t.levelInc();
		list res = static::Operators(t, op_code.value); t = res[0]; content ~= res[1];
		t = t.levelDec();
		content ~= t.s("}");
		
		return [t, content];
	}
	
	
	
	/**
	 * OpPreprocessorIfCode
	 */
	pure list<TranslatorES6, string> OpPreprocessorIfCode(TranslatorES6 t, OpPreprocessorIfCode op_code)
	{
		string content = "";
		if (t.preprocessor_flags[op_code.condition.value] == true)
		{
			content = rs::trim(op_code.content);
		}
		return [t, t.s(content)];
	}
	
	
	
	/**
	 * OpPreprocessorIfDef
	 */
	pure list<TranslatorES6, string> OpPreprocessorIfDef
	(
		TranslatorES6 t, OpPreprocessorIfDef op_code, string kind
	)
	{
		if (not t.preprocessor_flags[op_code.condition.value] == true) return [t, ""];
		
		if (kind == OpPreprocessorIfDef::KIND_OPERATOR)
		{
			return static::Operators(t, op_code.items);
		}
		else if (kind == OpPreprocessorIfDef::KIND_EXPRESSION)
		{
			return t.expression::Expression(t, op_code.items);
		}
		
		string content = "";
		for (int i=0; i<op_code.items.count(); i++)
		{
			BaseOpCode item = op_code.items.item(i);
			if (item instanceof OpComment)
			{
				list res = t.operator::OpComment(t, item);
				t = res[0]; content ~= res[1];
			}
			else if (item instanceof OpDeclareFunction)
			{
				list res = t.program::OpDeclareFunction(t, item);
				t = res[0]; content ~= res[1];
			}
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpComment
	 */
	pure list<TranslatorES6, string> OpComment(TranslatorES6 t, OpComment op_code)
	{
		string content = t.s("/*" ~ op_code.value ~ "*/");
		return [t, content];
	}
	
	
	
	/**
	 * OpComments
	 */
	pure list<TranslatorES6, string> OpComments(TranslatorES6 t, Collection<OpComment> comments)
	{
		string content = "";
		for (int i=0; i<comments.count(); i++)
		{
			list res = static::OpComment(t, comments.item(i));
			content ~= res[1];
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpComments
	 */
	pure list<TranslatorES6, string> AddComments
	(
		TranslatorES6 t, Collection<OpComment> comments, string content
	)
	{
		if (comments and comments.count() > 0)
		{
			list res = static::OpComments(t, comments);
			string s = res[1];
			if (s != "")
			{
				content = s ~ content;
			}
		}
		return [t, content];
	}
	
	
	
	/**
	 * Operator
	 */
	pure list<TranslatorES6, string> Operator(TranslatorES6 t, BaseOpCode op_code)
	{
		string content = "";
		
		/* Save op codes */
		Collection<SaveOpCode> save_op_codes = t.save_op_codes;
		int save_op_code_inc = t.save_op_code_inc;
		
		if (op_code instanceof OpAssign)
		{
			list res = static::OpAssign(t, op_code); t = res[0];
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content = save ~ content;
			content ~= res[1];
			
			t <= save_op_codes <= save_op_codes;
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			
			return [t, content];
		}
		else if (op_code instanceof OpAssignStruct)
		{
			list res = static::OpAssignStruct(t, op_code); t = res[0]; string s1 = res[1];
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content = save;
			content ~= t.s(op_code.var_name ~ " = " ~ s1 ~ ";");
			
			t <= save_op_codes <= save_op_codes;
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			
			return [t, content];
		}
		else if (op_code instanceof OpBreak)
		{
			content = t.s("break;");
		}
		else if (op_code instanceof OpCall)
		{
			list res = t.expression::OpCall(t, op_code); t = res[0];
			if (res[1] != "") content = t.s(res[1] ~ ";");
		}
		else if (op_code instanceof OpContinue)
		{
			content = t.s("continue;");
		}
		else if (op_code instanceof OpDelete)
		{
			list res = static::OpDelete(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpFor)
		{
			list res = static::OpFor(t, op_code); t = res[0]; content = res[1];
			t <= save_op_code_inc <= save_op_code_inc;
		}
		else if (op_code instanceof OpIf)
		{
			list res = static::OpIf(t, op_code); t = res[0]; content = res[1];
			t <= save_op_code_inc <= save_op_code_inc;
		}
		else if (op_code instanceof OpPipe)
		{
			list res = t.expression::OpPipe(t, op_code, false); t = res[0]; content = t.s(res[1] ~ ";");
		}
		else if (op_code instanceof OpReturn)
		{
			list res = static::OpReturn(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpThrow)
		{
			list res = static::OpThrow(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpTryCatch)
		{
			list res = static::OpTryCatch(t, op_code); t = res[0]; content = res[1];
			t <= save_op_code_inc <= save_op_code_inc;
		}
		else if (op_code instanceof OpWhile)
		{
			list res = static::OpWhile(t, op_code); t = res[0]; content = res[1];
			t <= save_op_code_inc <= save_op_code_inc;
		}
		else if (op_code instanceof OpInc)
		{
			list res = t.expression::OpInc(t, op_code); t = res[0]; content = t.s(res[1] ~ ";");
		}
		else if (op_code instanceof OpPreprocessorIfCode)
		{
			list res = static::OpPreprocessorIfCode(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpPreprocessorIfDef)
		{
			list res = static::OpPreprocessorIfDef(t, op_code, OpPreprocessorIfDef::KIND_OPERATOR);
			t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpPreprocessorSwitch)
		{
			for (int i=0; i<op_code.items.count(); i++)
			{
				list res = static::OpPreprocessorIfCode(t, op_code.items.item(i)); string s = res[1];
				if (s == "") continue;
				content ~= s;
			}
		}
		else if (op_code instanceof OpComment)
		{
			list res = static::OpComment(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpSafe)
		{
			list res = static::Operators(t, op_code.items); t = res[0]; content = res[1];
		}
		
		/* Output save op code */
		string save = t::outputSaveOpCode(t, save_op_codes.count());
		if (save != "") content = save ~ content;
		
		/* Restore save op codes */
		t <= save_op_codes <= save_op_codes;
		/*t <= save_op_code_inc <= save_op_code_inc;*/
		
		return [t, content];
	}
	
	
	
	/**
	 * Operators
	 */
	pure list<TranslatorES6, string> Operators(TranslatorES6 t, BaseOpCode op_code)
	{
		string content = "";
		
		if (op_code instanceof OpItems)
		{
			for (int i=0; i<op_code.items.count(); i++)
			{
				BaseOpCode item = op_code.items.item(i);
				list res = static::Operator(t, item); t = res[0];
				content ~= res[1];
			}
		}
		else if (op_code instanceof OpHtmlItems)
		{
			string save_html_var_name = t.html_var_name;
			bool save_is_html = t.is_html;
			
			/* Save op codes */
			/*
			Collection<SaveOpCode> save_op_codes = t.save_op_codes;
			int save_op_code_inc = t.save_op_code_inc;
			*/
			t <= is_html <= true;
			list res = t.html::OpHtmlChilds(t, op_code, save_html_var_name, false);
			t = res[0]; content = res[1];
			
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
			
			t <= is_html <= save_is_html;
		}
		else
		{
			list res = static::Operator(t, op_code); t = res[0];
			content ~= res[1];
		}
		
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareFunction Arguments
	 */
	pure list<TranslatorES6, string> OpDeclareFunctionArgs(TranslatorES6 t, OpDeclareFunction f)
	{
		string content = "";
		if (f.args != null)
		{
			bool flag = false;
			if (f.is_context) { content ~= "ctx"; flag = true; }
			if (f.is_html)
			{
				flag = true;
				content ~= (flag ? ", " : "") ~
					"component, render_params, render_content";
			}
			for (int i=0; i<f.args.count(i); i++)
			{
				OpDeclareFunctionArg arg = f.args.item(i);
				string name = arg.name;
				content ~= (flag ? ", " : "") ~ name;
				flag = true;
			}
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareFunction Body
	 */
	pure list<TranslatorES6, string> OpDeclareFunctionBody(TranslatorES6 t, OpDeclareFunction f)
	{
		TranslatorES6 save_t = t;
		t <= is_pipe <= false;
		t <= is_html <= false;
		
		if (f.isFlag("async") and t.isEmulateAsyncAwait())
		{
			return t.async_await::OpDeclareFunctionBody(t, f);
		}
		
		/* Save op codes */
		Collection<SaveOpCode> save_op_codes = t.save_op_codes;
		int save_op_code_inc = t.save_op_code_inc;
		
		string content = "";
		t = t.levelInc();
		
		if (f.args)
		{
			for (int i=0; i<f.args.count(); i++)
			{
				OpDeclareFunctionArg arg = f.args.item(i);
				if (arg.expression == null) continue;
				list res = t.expression::Expression(t, arg.expression); t = res[0]; string s = res[1];
				s = "if (" ~ arg.name ~ " == undefined) " ~ arg.name ~ " = " ~ s ~ ";";
				content ~= t.s(s);
			}
		}
		
		if (f.items)
		{
			list res = t.operator::Operators(t, f.items); t = res[0];
			content ~= res[1];
		}
		else if (f.expression)
		{
			list res = t.expression::Expression(t, f.expression); t = res[0];
			string expr = res[1];
			string s = "";
			if (f.flags != null and f.flags.isFlag("memorize"))
			{
				s = t.s("var __memorize_value = " ~ expr ~ ";");
				s ~= t.s(t.expression::useModuleName(t, "Runtime.rtl") ~ "._memorizeSave(\"" ~ 
						t.current_class_full_name ~ "." ~ f.name ~
						"\", arguments, __memorize_value);");
				s ~= t.s("return __memorize_value;");
			}
			else
			{
				s = t.s("return " ~ expr ~ ";");
			}
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content ~= save;
			content ~= s;
		}
		
		if (f.flags != null and f.flags.isFlag("memorize"))
		{
			string s = "";
			s ~= t.s("var __memorize_value = " ~ t.expression::useModuleName(t, "Runtime.rtl") ~
				"._memorizeValue(\"" ~
				t.current_class_full_name ~ "." ~ f.name ~
				"\", arguments);");
			s ~= t.s("if (__memorize_value != " ~ t.expression::useModuleName(t, "Runtime.rtl") ~
				"._memorize_not_found) return __memorize_value;");
			content = s ~ content;
		}
		t = t.levelDec();
		content = t.s("{") ~ content;
		content ~= t.s("}");
		
		/* Restore save op codes */
		t <= save_op_codes <= save_op_codes;
		t <= save_op_code_inc <= save_op_code_inc;
		
		return [save_t, content];		
	}
	
}
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

namespace Bayrell.Lang.LangES6;

use Runtime.BaseStruct;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.Exceptions.DeclaredClass;
use Bayrell.Lang.LangES6.TranslatorES6;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpAssignValue;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpDeclareClass;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
use Bayrell.Lang.OpCodes.OpEntityName;
use Bayrell.Lang.OpCodes.OpFlags;
use Bayrell.Lang.OpCodes.OpItems;
use Bayrell.Lang.OpCodes.OpNamespace;
use Bayrell.Lang.OpCodes.OpPreprocessorIfCode;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpPreprocessorSwitch;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;
use Bayrell.Lang.OpCodes.OpUse;


struct TranslatorES6Program extends BaseStruct
{
	
	/**
	 * To pattern
	 */
	pure string toPattern(TranslatorES6 t, OpTypeIdentifier pattern)
	{
		Collection names = t.expression::findModuleNames(t, pattern.entity_name.names);
		string e = rs::join(".", names);
		Collection a = (pattern.template != null) ? 
			pattern.template.map
			(
				string (OpTypeIdentifier pattern) use (t) => static::toPattern(t, pattern)
			) : null
		;
		string b = (a != null) ? ",\"t\":[" ~ rs::join(",",a) ~ "]" : "";
		return "{\"e\":" ~ t.expression::toString(e) ~ b ~"}";
	}
	
	
	
	/**
	 * OpNamespace
	 */
	pure list<TranslatorES6, string> OpNamespace(TranslatorES6 t, OpNamespace op_code)
	{
		string content = "";
		string name = "";
		string s = "";
		
		Collection<string> arr = rs::split("\\.", op_code.name);
		for (int i=0; i<arr.count(); i++)
		{
			name = name ~ ((i == 0) ? "" : ".") ~ arr.item(i);
			s = "if (typeof " ~ name ~ " == 'undefined') " ~ name ~ " = {};";
			content ~= t.s(s);
		}
		
		t <= current_namespace_name <= op_code.name;
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareFunction
	 */
	pure list<TranslatorES6, string> OpDeclareFunction(TranslatorES6 t, OpDeclareFunction op_code)
	{
		bool is_static_function = t.is_static_function;
		bool is_static = op_code.isStatic();
		string content = "";
		
		if (op_code.isFlag("declare")) return [t, ""];
		if (not is_static and is_static_function or is_static and not is_static_function)
			return [t, ""];
		
		/* Set current function */
		t <= current_function <= op_code;
		
		string is_async = "";
		if (op_code.isFlag("async") and t.isAsyncAwait()) is_async = "async ";
		
		string s = "";
		list res = t.operator::OpDeclareFunctionArgs(t, op_code); string args = res[1];
		s ~= op_code.name ~ ": " ~ is_async ~ "function(" ~ args ~ ")";
		list res = t.operator::OpDeclareFunctionBody(t, op_code); s ~= res[1];
		s ~= ",";
		
		/* Function comments */
		list res = t.operator::AddComments(t, op_code.comments, t.s(s)); content ~= res[1];
		
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareClass
	 */
	pure list<TranslatorES6, string> OpDeclareClassConstructor(TranslatorES6 t, OpDeclareClass op_code)
	{
		string open = "";
		string content = "";
		TranslatorES6 save_t = t;
		
		/* Set function name */
		t <= current_function <= op_code.fn_create;
		
		/* Clear save op codes */
		t = t::clearSaveOpCode(t);
		
		if (op_code.fn_create == null)
		{
			open ~= t.current_class_full_name ~ " = ";
			open ~= "function(ctx)";
			open = t.s(open) ~ t.s("{");
			t = t.levelInc();
			
			/* Call parent */
			if (t.current_class_extends_name != "")
			{
				content ~= t.s
				(
					t.expression::useModuleName(t, t.current_class_extends_name) ~
						".apply(this, arguments);"
				);
			}
		}
		else
		{
			open ~= t.current_class_full_name ~ " = function(";
			list res = t.operator::OpDeclareFunctionArgs(t, op_code.fn_create); 
			t = res[0];
			open ~= res[1];
			open ~= ")";
			open = t.s(open) ~ t.s("{");
			t = t.levelInc();
		}
		
		/* Function body */
		if (op_code.fn_create != null)
		{
			if (op_code.fn_create.args)
			{
				for (int i=0; i<op_code.fn_create.args.count(); i++)
				{
					OpDeclareFunctionArg arg = op_code.fn_create.args.item(i);
					if (arg.expression == null) continue;
					list res = t.expression::Expression(t, arg.expression); t = res[0]; string s = res[1];
					s = "if (" ~ arg.name ~ " == undefined) " ~ arg.name ~ " = " ~ s ~ ";";
					content ~= t.s(s);
				}
			}
			
			list res = t.operator::Operators
			(
				t, 
				op_code.fn_create.expression ? op_code.fn_create.expression : op_code.fn_create.items
			);
			t = res[0];
			content ~= res[1];
		}
		
		/* Constructor end */
		content = open ~ content;
		t = t.levelDec();
		content ~= t.s("};");
		
		return [save_t, content];
	}
	
	
	
	/**
	 * OpDeclareClassBodyItem
	 */
	pure list<TranslatorES6, string> OpDeclareClassBodyItem(TranslatorES6 t, BaseOpCode item)
	{
		string content = "";
		if (item instanceof OpPreprocessorIfDef)
		{
			list res = t.operator::OpPreprocessorIfDef(t, item, OpPreprocessorIfDef::KIND_CLASS_BODY);
			content ~= res[1];
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpFunctionAnnotations
	 */
	pure list<TranslatorES6, string> OpFunctionAnnotations(TranslatorES6 t, OpDeclareFunction f)
	{
		string content = "";
		if (f.flags.isFlag("declare")) return [t, content];
		if (not f.annotations) return [t, content];
		if (f.annotations.count() == 0) return [t, content];
		content ~= t.s("if (field_name == " ~ t.expression::toString(f.name) ~ ")");
		content ~= t.s("{");
		string s1 = "";
		t = t.levelInc();
		s1 ~= t.s("var Collection = " ~ t.expression::useModuleName(t, "Runtime.Collection") ~ ";");
		s1 ~= t.s("var Dict = " ~ t.expression::useModuleName(t, "Runtime.Dict") ~ ";");
		
		s1 ~= t.s("return Dict.from({");
		t = t.levelInc();
		
		if (f.flags.isFlag("async"))
		{
			s1 ~= t.s("\"async\": true,");
		}
		s1 ~= t.s("\"annotations\": Collection.from([");
		t = t.levelInc();
		
		for (int j=0; j<f.annotations.count(); j++)
		{
			OpAnnotation annotation = f.annotations.item(j);
			list res = t.expression::OpTypeIdentifier(t, annotation.name);
			t = res[0]; string name = res[1];
			list res = t.expression::OpDict(t, annotation.params, true);
			t = res[0]; string params = res[1];
			s1 ~= t.s("new " ~ name ~ "(ctx, " ~ params ~ "),");
		}
		
		t = t.levelDec();
		s1 ~= t.s("]),");
		t = t.levelDec();
		s1 ~= t.s("});");
		
		string save = t::outputSaveOpCode(t);
		if (save != "") content ~= t.s(save);
		content ~= s1;
		t = t.levelDec();
		content ~= t.s("}");
		
		return [t, content];
	}
	
	
	
	/**
	 * OpClassBodyItemMethodsList
	 */
	pure list<TranslatorES6, string> OpClassBodyItemMethodsList(TranslatorES6 t, BaseOpCode item)
	{
		string content = "";
		if (item instanceof OpPreprocessorIfDef)
		{
			if (t.preprocessor_flags[item.condition.value] == true)
			{
				for (int i=0; i<item.items.count(); i++)
				{
					BaseOpCode op_code = item.items.item(i);
					list res = static::OpClassBodyItemMethodsList(t, op_code);
					t = res[0]; content ~= res[1];
				}
			}
		}
		else if (item instanceof OpDeclareFunction)
		{
			if (
				not item.flags.isFlag("declare") and
				not item.flags.isFlag("protected") and
				not item.flags.isFlag("private")
			){
				content ~= t.s( t.expression::toString(item.name) ~ "," );
			}
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpClassBodyItemAnnotations
	 */
	pure list<TranslatorES6, string> OpClassBodyItemAnnotations(TranslatorES6 t, BaseOpCode item)
	{
		string content = "";
		if (item instanceof OpPreprocessorIfDef)
		{
			if (t.preprocessor_flags[item.condition.value] == true)
			{
				for (int i=0; i<item.items.count(); i++)
				{
					BaseOpCode op_code = item.items.item(i);
					list res = static::OpClassBodyItemAnnotations(t, op_code);
					t = res[0]; content ~= res[1];
				}
			}
		}
		else if (item instanceof OpDeclareFunction)
		{
			list res = static::OpFunctionAnnotations(t, item);
			t = res[0]; content ~= res[1];
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareClass
	 */
	pure list<TranslatorES6, string> OpDeclareClassBodyStatic(TranslatorES6 t, OpDeclareClass op_code)
	{
		string content = "";
		string class_kind = op_code.kind;
		string current_class_extends_name = t.expression::findModuleName(t, t.current_class_extends_name);
		
		Collection<SaveOpCode> save_op_codes = t.save_op_codes;
		int save_op_code_inc = t.save_op_code_inc;
		t = t::clearSaveOpCode(t);
		
		/* Returns parent class name */
		string parent_class_name = "";
		if (op_code.class_extends != null)
		{
			list res = t.expression::OpTypeIdentifier(t, op_code.class_extends);
			parent_class_name = res[1];
		}	
		
		if (current_class_extends_name != "")
		{
			content ~= t.s("Object.assign(" ~ t.current_class_full_name ~ ", " ~
				t.expression::useModuleName(t, current_class_extends_name) ~ ");");
		}
		content ~= t.s("Object.assign(" ~ t.current_class_full_name ~ ",");
		content ~= t.s("{");
		t = t.levelInc();
		
		
		/* Static variables */
		if (op_code.vars != null)
		{
			for (int i=0; i<op_code.vars.count(); i++)
			{
				OpAssign variable = op_code.vars.item(i);
				if (variable.kind != OpAssign::KIND_DECLARE) continue;
				if (variable.condition and
					t.preprocessor_flags[variable.condition.value] != true
				) continue;
				
				bool is_static = variable.flags.isFlag("static");
				if (not is_static) continue;
				for (int j=0; j<variable.values.count(); j++)
				{
					OpAssignValue value = variable.values.item(j);
					list res = t.expression::Expression(t, value.expression);
					string s = (value.expression != null) ? res[1] : "null";
					content ~= t.s(value.var_name ~ ": " ~ s ~ ",");
				}
			}
		}
		
		if (class_kind != OpDeclareClass::KIND_INTERFACE)
		{
			/* Static Functions */
			if (op_code.functions != null)
			{
				t <= is_static_function <= true;
				for (int i=0; i<op_code.functions.count(); i++)
				{
					OpDeclareFunction f = op_code.functions.item(i);
					if (f.flags.isFlag("declare")) continue;
					if (not f.isStatic()) continue;
					
					/* Set function name */
					t <= current_function <= f;
					
					string is_async = "";
					if (f.isFlag("async") and t.isAsyncAwait()) is_async = "async ";
					
					string s = "";
					list res = t.operator::OpDeclareFunctionArgs(t, f); string args = res[1];
					s ~= f.name ~ ": " ~ is_async ~ "function(" ~ args ~ ")";
					list res = t.operator::OpDeclareFunctionBody(t, f); s ~= res[1];
					s ~= ",";
					
					/* Function comments */
					list res = t.operator::AddComments(t, f.comments, t.s(s)); content ~= res[1];
				}
			}
			
			/* Items */
			if (op_code.items != null)
			{
				t <= is_static_function <= true;
				for (int i=0; i<op_code.items.count(); i++)
				{
					BaseOpCode item = op_code.items.item(i);
					list res = static::OpDeclareClassBodyItem(t, item); t = res[0]; content ~= res[1];
				}
			}
			
			content ~= t.s("/* ======================= Class Init Functions ======================= */");
			
			/* Get current namespace function */
			content ~= t.s("getNamespace: function()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return " ~ t.expression::toString(t.current_namespace_name) ~ ";");
			t = t.levelDec();
			content ~= t.s("},");
			
			
			/* Get current class name function */
			content ~= t.s("getClassName: function()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return " ~ t.expression::toString(t.current_class_full_name) ~ ";");
			t = t.levelDec();
			content ~= t.s("},");
			
			
			/* Get parent class name function */
			content ~= t.s("getParentClassName: function()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return " ~ t.expression::toString(current_class_extends_name) ~ ";");
			t = t.levelDec();
			content ~= t.s("},");
			
			
			/* Class info */
			content ~= t.s("getClassInfo: function(ctx)");
			content ~= t.s("{");
			t = t.levelInc();
			t = t::clearSaveOpCode(t);
			string s1 = "";
			s1 ~= t.s("var Collection = " ~ t.expression::useModuleName(t, "Runtime.Collection") ~ ";");
			s1 ~= t.s("var Dict = " ~ t.expression::useModuleName(t, "Runtime.Dict") ~ ";");
			
			s1 ~= t.s("return Dict.from({");
			t = t.levelInc();
			
			s1 ~= t.s("\"annotations\": Collection.from([");
			t = t.levelInc();
			
			for (int j=0; j<op_code.annotations.count(); j++)
			{
				OpAnnotation annotation = op_code.annotations.item(j);
				list res = t.expression::OpTypeIdentifier(t, annotation.name);
				t = res[0]; string name = res[1];
				if (annotation.params != null)
				{
					list res = t.expression::OpDict(t, annotation.params, true);
					t = res[0]; string params = res[1];
					s1 ~= t.s("new " ~ name ~ "(ctx, " ~ params ~ "),");
				}
				else
				{
					s1 ~= t.s("new " ~ name ~ "(ctx),");
				}
			}
			
			t = t.levelDec();
			s1 ~= t.s("]),");
			t = t.levelDec();
			s1 ~= t.s("});");
			
			string save = t::outputSaveOpCode(t);
			if (save != "") content ~= save;
			content ~= s1;
			t = t.levelDec();
			content ~= t.s("},");
			
			/* Get fields list of the function */
			t = t::clearSaveOpCode(t);
			content ~= t.s("getFieldsList: function(ctx)");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("var a = [];");
			if (op_code.vars != null)
			{
				Map<Vector> vars = new Map();
				
				for (int i=0; i<op_code.vars.count(); i++)
				{
					OpAssign variable = op_code.vars.item(i);
					
					bool is_const = variable.flags.isFlag("const");
					bool is_static = variable.flags.isFlag("static");
					bool is_protected = variable.flags.isFlag("protected");
					bool is_private = variable.flags.isFlag("private");
					bool is_serializable = variable.flags.isFlag("serializable");
					bool is_assignable = true;
					bool has_annotation = variable.annotations != null and
						variable.annotations.count() > 0;
					
					if (is_const or is_static) continue;
					if (is_protected or is_private) continue;
					if (variable.kind != OpAssign::KIND_DECLARE) continue;
					if (variable.condition and
						t.preprocessor_flags[variable.condition.value] != true
					) continue;
					
					for (int j=0; j<variable.values.count(); j++)
					{
						OpAssignValue value = variable.values.item(j);
						content ~= t.s("a.push(" ~ t.expression::toString(value.var_name) ~ ");");
					}
				}
			}
			
			content ~= t.s("return " ~
				t.expression::useModuleName(t, "Runtime.Collection") ~
				".from(a);"
			);
			t = t.levelDec();
			content ~= t.s("},");
			
			/* Get field info by name */
			content ~= t.s("getFieldInfoByName: function(ctx,field_name)");
			content ~= t.s("{");
			t = t.levelInc();
			if (op_code.vars != null)
			{
				content ~= t.s("var Collection = " ~
					t.expression::useModuleName(t, "Runtime.Collection") ~ ";");
				content ~= t.s("var Dict = " ~
					t.expression::useModuleName(t, "Runtime.Dict") ~ ";");
				
				for (int i=0; i<op_code.vars.count(); i++)
				{
					OpAssign variable = op_code.vars.item(i);
					
					if (variable.kind != OpAssign::KIND_DECLARE) continue;
					if (variable.condition and
						t.preprocessor_flags[variable.condition.value] != true
					) continue;
					
					bool is_const = variable.flags.isFlag("const");
					bool is_static = variable.flags.isFlag("static");
					bool is_protected = variable.flags.isFlag("protected");
					bool is_private = variable.flags.isFlag("private");
					
					if (is_const or is_static) continue;
					if (is_protected or is_private) continue;
					
					Collection<string> v = variable.values.map(
						string (OpAssignValue value) => value.var_name
					);
					v = v.map
					(
						string (string var_name) use (t) =>
							"field_name == " ~ t.expression::toString(var_name)
					);
					
					string var_type =
						rs::join(".", t.expression::findModuleNames(t, variable.pattern.entity_name.names))
					;
					Collection<string> var_sub_types = (variable.pattern.template != null) ?
						variable.pattern.template.map
						(
							string (OpTypeIdentifier op_code) use (t) =>
								rs::join(".", t.expression::findModuleNames(t, op_code.entity_name.names))
						)
						: []
					;
					var_sub_types = var_sub_types.map( t.expression::toString );
					
					t = t::clearSaveOpCode(t);
					string s1 = "";
					
					s1 ~= t.s("if (" ~ rs::join(" or ", v) ~ ") return Dict.from({");
					t = t.levelInc();
					
					s1 ~= t.s("\"t\": " ~ t.expression::toString(var_type) ~ ",");
					if (var_sub_types.count() > 0) s1 ~= t.s("\"s\": [" ~ rs::join(", ", var_sub_types) ~ "],");
					s1 ~= t.s("\"annotations\": Collection.from([");
					t = t.levelInc();
					
					for (int j=0; j<variable.annotations.count(); j++)
					{
						OpAnnotation annotation = variable.annotations.item(j);
						list res = t.expression::OpTypeIdentifier(t, annotation.name);
						t = res[0]; string name = res[1];
						list res = t.expression::OpDict(t, annotation.params, true);
						t = res[0]; string params = res[1];
						s1 ~= t.s("new " ~ name ~ "(ctx, " ~ params ~ "),");
					}
					
					t = t.levelDec();
					s1 ~= t.s("]),");
					t = t.levelDec();
					s1 ~= t.s("});");
					
					string save = t::outputSaveOpCode(t);
					if (save != "") content ~= save;
					content ~= s1;
				}
			}
			content ~= t.s("return null;");
			t = t.levelDec();
			content ~= t.s("},");
			
			/* Get methods list of the function */
			t = t::clearSaveOpCode(t);
			content ~= t.s("getMethodsList: function(ctx)");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("var a=[");
			t = t.levelInc();
			if (op_code.functions != null and false)
			{
				for (int i=0; i<op_code.functions.count(); i++)
				{
					OpDeclareFunction f = op_code.functions.item(i);
					if (f.flags.isFlag("declare")) continue;
					if (f.flags.isFlag("protected")) continue;
					if (f.flags.isFlag("private")) continue;
					if (f.annotations.count() == 0) continue;
					content ~= t.s( t.expression::toString(f.name) ~ "," );
				}
			}
			if (op_code.items != null)
			{
				for (int i=0; i<op_code.items.count(); i++)
				{
					BaseOpCode item = op_code.items.item(i);
					list res = static::OpClassBodyItemMethodsList(t, item);
					t = res[0]; content ~= res[1];
				}
			}
			t = t.levelDec();
			content ~= t.s("];");
			content ~= t.s("return " ~ t.expression::useModuleName(t, "Runtime.Collection") ~ ".from(a);");
			t = t.levelDec();
			content ~= t.s("},");
			
			/* Get method info by name */
			t = t::clearSaveOpCode(t);
			content ~= t.s("getMethodInfoByName: function(ctx,field_name)");
			content ~= t.s("{");
			t = t.levelInc();
			if (op_code.functions != null)
			{
				for (int i=0; i<op_code.functions.count(); i++)
				{
					OpDeclareFunction f = op_code.functions.item(i);
					list res = static::OpFunctionAnnotations(t, f);
					t = res[0]; content ~= res[1];
				}
			}
			if (op_code.items != null)
			{
				for (int i=0; i<op_code.items.count(); i++)
				{
					BaseOpCode item = op_code.items.item(i);
					list res = static::OpClassBodyItemAnnotations(t, item);
					t = res[0]; content ~= res[1];
				}
			}
			content ~= t.s("return null;");
			t = t.levelDec();
			content ~= t.s("},");
			
			/* Add implements */
			if (op_code.class_implements != null and op_code.class_implements.count() > 0)
			{
				content ~= t.s("__implements__:");
				content ~= t.s("[");
				t = t.levelInc();
				for (int i=0; i<op_code.class_implements.count(); i++)
				{
					OpTypeIdentifier item = op_code.class_implements.item(i);
					string module_name = item.entity_name.names.first();
					string s = t.expression::useModuleName(t, module_name);
					if (s == "") continue;
					content ~= t.s(s ~ ",");
				}
				t = t.levelDec();
				content ~= t.s("],");
			}
		}
		
		else
		{
			/* Get current namespace function */
			content ~= t.s("getNamespace: function()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return " ~ t.expression::toString(t.current_namespace_name) ~ ";");
			t = t.levelDec();
			content ~= t.s("},");
			
			/* Get current class name function */
			content ~= t.s("getClassName: function()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return " ~ t.expression::toString(t.current_class_full_name) ~ ";");
			t = t.levelDec();
			content ~= t.s("},");
		}
		
		t = t.levelDec();
		content ~= t.s("});");
		
		/* Restore save op codes */
		t <= save_op_codes <= save_op_codes;
		t <= save_op_code_inc <= save_op_code_inc;
		
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareClass
	 */
	pure list<TranslatorES6, string> OpDeclareClassBody(TranslatorES6 t, OpDeclareClass op_code)
	{
		string content = "";
		string class_kind = op_code.kind;
		content ~= t.s("Object.assign(" ~ t.current_class_full_name ~ ".prototype,"); content ~= t.s("{");
		t = t.levelInc();
		
		/* Functions */
		if (op_code.functions != null)
		{
			t <= is_static_function <= false;
			for (int i=0; i<op_code.functions.count(); i++)
			{
				OpDeclareFunction f = op_code.functions.item(i);
				if (f.flags.isFlag("declare")) continue;
				if (f.isStatic()) continue;
				
				/* Set function name */
				t <= current_function <= f;
				
				string is_async = "";
				if (f.isFlag("async") and t.isAsyncAwait()) is_async = "async ";
				
				string s = "";
				list res = t.operator::OpDeclareFunctionArgs(t, f); string args = res[1];
				s ~= f.name ~ ": " ~ is_async ~ "function(" ~ args ~ ")";
				list res = t.operator::OpDeclareFunctionBody(t, f); s ~= res[1];
				s ~= ",";
				
				/* Function comments */
				list res = t.operator::AddComments(t, f.comments, t.s(s)); content ~= res[1];
			}
		}
		
		/* Items */
		if (op_code.items != null)
		{
			t <= is_static_function <= false;
			for (int i=0; i<op_code.items.count(); i++)
			{
				BaseOpCode item = op_code.items.item(i);
				list res = static::OpDeclareClassBodyItem(t, item); t = res[0]; content ~= res[1];
			}
		}
		
		/* Init variables */
		if (class_kind != OpDeclareClass::KIND_INTERFACE and op_code.vars != null)
		{
			Collection<OpAssign> vars = op_code.vars.filter
			(
				bool (OpAssign variable) => not variable.flags.isFlag("static") 
			);
			
			if (t.current_class_full_name != "Runtime.BaseObject" and vars.count() > 0)
			{
				content ~= t.s("_init: function(ctx)");
				content ~= t.s("{");
				t = t.levelInc();
				
				/* Clear save op codes */
				Collection<SaveOpCode> save_op_codes = t.save_op_codes;
				int save_op_code_inc = t.save_op_code_inc;
				if (t.current_class_extends_name != "")
				{
					content ~= t.s
					(
						t.expression::useModuleName(t, t.current_class_extends_name) ~
							".prototype._init.call(this,ctx);"
					);
				}
				
				string s1 = "";
				for (int i=0; i<op_code.vars.count(); i++)
				{
					OpAssign variable = op_code.vars.item(i);
					bool is_static = variable.flags.isFlag("static");
					
					if (is_static) continue;
					if (variable.kind != OpAssign::KIND_DECLARE) continue;
					if (variable.condition and
						t.preprocessor_flags[variable.condition.value] != true
					) continue;
					
					string prefix = "";
					if (class_kind == OpDeclareClass::KIND_STRUCT)
					{
						/* prefix = "__"; */
						prefix = "";
					}
					else if (class_kind == OpDeclareClass::KIND_CLASS)
					{
						prefix = "";
					}
					
					for (int j=0; j<variable.values.count(); j++)
					{
						OpAssignValue value = variable.values.item(j);
						list res = t.expression::Expression(t, value.expression); t = res[0];
						string s = (value.expression != null) ? res[1] : "null";
						s1 ~= t.s("this." ~ prefix ~ value.var_name ~ " = " ~ s ~ ";");
					}
				}
				
				/* Output save op code */
				string save = t::outputSaveOpCode(t, save_op_codes.count());
				if (save != "") content ~= save;
				
				/* Restore save op codes */
				t <= save_op_codes <= save_op_codes;
				t <= save_op_code_inc <= save_op_code_inc;
				
				/* Add content */
				content ~= s1;
				
				t = t.levelDec();
				content ~= t.s("},");
			}
			
			/* Struct */
			if (class_kind == OpDeclareClass::KIND_STRUCT or t.enable_introspection)
			{
				bool is_struct = class_kind == OpDeclareClass::KIND_STRUCT;
				string var_prefix = "";
				
				if (not is_struct)
				{
					/* Assign Object */
					content ~= t.s("assignObject: function(ctx,o)");
					content ~= t.s("{");
					t = t.levelInc();
					content ~= t.s("if (o instanceof " ~
						t.expression::useModuleName(t, t.current_class_full_name) ~
					")");
					content ~= t.s("{");
					t = t.levelInc();
					for (int i=0; i<op_code.vars.count(); i++)
					{
						OpAssign variable = op_code.vars.item(i);
						if (variable.kind != OpAssign::KIND_DECLARE) continue;
						if (variable.condition and
							t.preprocessor_flags[variable.condition.value] != true
						) continue;
						
						bool is_const = variable.flags.isFlag("const");
						bool is_static = variable.flags.isFlag("static");
						bool is_protected = variable.flags.isFlag("protected");
						bool is_private = variable.flags.isFlag("private");
						
						if (is_const or is_static) continue;
						if (is_protected or is_private) continue;
						
						for (int j=0; j<variable.values.count(); j++)
						{
							OpAssignValue value = variable.values.item(j);
							content ~= t.s("this." ~ var_prefix ~ value.var_name ~
								" = o." ~ var_prefix ~ value.var_name ~ ";");
						}
					}
					t = t.levelDec();
					content ~= t.s("}");
					if (t.current_class_extends_name != "")
					{
						content ~= t.s
						(
							t.expression::useModuleName(t, t.current_class_extends_name) ~
								".prototype.assignObject.call(this,ctx,o);"
						);
					}
					t = t.levelDec();
					content ~= t.s("},");
					
					/* Assign Value */
					content ~= t.s("assignValue: function(ctx,k,v)");
					content ~= t.s("{");
					t = t.levelInc();
					bool flag = false;
					for (int i=0; i<op_code.vars.count(); i++)
					{
						OpAssign variable = op_code.vars.item(i);
						if (variable.kind != OpAssign::KIND_DECLARE) continue;
						if (variable.condition and
							t.preprocessor_flags[variable.condition.value] != true
						) continue;
						
						bool is_const = variable.flags.isFlag("const");
						bool is_static = variable.flags.isFlag("static");
						bool is_protected = variable.flags.isFlag("protected");
						bool is_private = variable.flags.isFlag("private");
						
						if (is_const or is_static) continue;
						if (is_protected or is_private) continue;
						
						for (int j=0; j<variable.values.count(); j++)
						{
							OpAssignValue value = variable.values.item(j);
							if (t.flag_struct_check_types)
							{
								content ~= t.s
								(
									(flag ? "else " : "") ~
									"if (k == " ~ t.expression::toString(value.var_name) ~
									")" ~ "this." ~ var_prefix ~ value.var_name ~
									" = Runtime.rtl.to(v, null, " ~ 
									static::toPattern(t, variable.pattern) ~ ");"
								);
							}
							else
							{
								content ~= t.s
								(
									(flag ? "else " : "") ~
									"if (k == " ~ t.expression::toString(value.var_name) ~
									")" ~ "this." ~ var_prefix ~ value.var_name ~ " = v;"
								);
							}
							flag = true;
						}
					}
					if (t.current_class_extends_name != "")
					{
						content ~= t.s(
							(flag ? "else " : "") ~ 
							t.expression::useModuleName(t, t.current_class_extends_name) ~
								".prototype.assignValue.call(this,ctx,k,v);"
						);
					}
					t = t.levelDec();
					content ~= t.s("},");
				}
				
				/* Take Value */
				content ~= t.s("takeValue: function(ctx,k,d)");
				content ~= t.s("{");
				t = t.levelInc();
				content ~= t.s("if (d == undefined) d = null;");
				bool flag = false;
				for (int i=0; i<op_code.vars.count(); i++)
				{
					OpAssign variable = op_code.vars.item(i);
					if (variable.kind != OpAssign::KIND_DECLARE) continue;
					if (variable.condition and
						t.preprocessor_flags[variable.condition.value] != true
					) continue;
					
					bool is_const = variable.flags.isFlag("const");
					bool is_static = variable.flags.isFlag("static");
					bool is_protected = variable.flags.isFlag("protected");
					bool is_private = variable.flags.isFlag("private");
					
					if (is_const or is_static) continue;
					if (is_protected or is_private) continue;
					
					for (int j=0; j<variable.values.count(); j++)
					{
						OpAssignValue value = variable.values.item(j);
						content ~= t.s
						(
							(flag ? "else " : "") ~
							"if (k == " ~ t.expression::toString(value.var_name) ~ ")return this." ~
								var_prefix ~ value.var_name ~ ";"
						);
						flag = true;
					}
				}
				if (t.current_class_extends_name != "")
				{
					content ~= t.s
					(
						"return " ~ t.expression::useModuleName(t, t.current_class_extends_name) ~
							".prototype.takeValue.call(this,ctx,k,d);"
					);
				}
				t = t.levelDec();
				content ~= t.s("},");
			}
			
		}
		
		t = t.levelDec();
		content ~= t.s("});");
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareClassFooter
	 */
	pure list<TranslatorES6, string> OpDeclareClassFooter(TranslatorES6 t, OpDeclareClass op_code)
	{
		string content = "";
		string rtl_module_name = t.expression::useModuleName(t, "Runtime.rtl");
		if (not t.use_module_name)
		{
			content ~= t.s(rtl_module_name ~ ".defClass(" ~ t.current_class_full_name ~ ");");
			content ~= t.s("window[\"" ~ t.current_class_full_name ~ "\"] = " ~ t.current_class_full_name ~ ";");
		}
		content ~= t.s("if (typeof module != \"undefined\" && typeof module.exports != \"undefined\") " ~
			"module.exports = " ~ t.current_class_full_name ~ ";");
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareClass
	 */
	pure list<TranslatorES6, string> OpDeclareClass(TranslatorES6 t, OpDeclareClass op_code)
	{
		if (op_code.is_abstract)
		{
			return [t, ""];
		}
		
		if (op_code.is_declare)
		{
			throw new DeclaredClass();
			return [t, ""];
		}
		
		string content = "";
		t <= current_class <= op_code;
		t <= current_class_name <= op_code.name;
		t <= current_class_full_name <= t.current_namespace_name ~ "." ~ t.current_class_name;
		
		if (op_code.class_extends != null)
		{
			string extends_name = rs::join(".", op_code.class_extends.entity_name.names);
			t <= current_class_extends_name <= extends_name;
		}
		else if (op_code.kind == OpDeclareClass::KIND_STRUCT)
		{
			t <= current_class_extends_name <= "Runtime.BaseStruct";
		}
		else if (op_code.kind == OpDeclareClass::KIND_STRUCT)
		{
			t <= current_class_extends_name <= "";
		}
		
		/* Constructor */
		list res = static::OpDeclareClassConstructor(t, op_code); content ~= res[1];
		
		/* Extends */
		if (op_code.class_extends != null)
		{
			content ~= t.s
			(
				t.current_class_full_name ~ ".prototype = Object.create(" ~
					t.expression::useModuleName(t, t.current_class_extends_name) ~ ".prototype);"
			);
			content ~= t.s
			(
				t.current_class_full_name ~ ".prototype.constructor = " ~ t.current_class_full_name ~ ";"
			);
		}
		
		/* Class body */
		list res = static::OpDeclareClassBody(t, op_code); content ~= res[1];
		
		/* Class static functions */
		list res = static::OpDeclareClassBodyStatic(t, op_code); content ~= res[1];
		
		/* Class comments */
		list res = t.operator::AddComments(t, op_code.comments, content); content = res[1];
		
		/* Class footer */
		list res = static::OpDeclareClassFooter(t, op_code); content ~= res[1];
		
		return [t, content];
	}
	
	
	
	/**
	 * Translate item
	 */
	pure list<TranslatorES6, string> translateItem(TranslatorES6 t, OpItems op_code)
	{
		if (op_code instanceof OpNamespace)
		{
			return static::OpNamespace(t, op_code);
		}
		else if (op_code instanceof OpDeclareClass)
		{
			return static::OpDeclareClass(t, op_code);
		}
		else if (op_code instanceof OpComment)
		{
			return t.operator::OpComment(t, op_code);
		}
		else if (op_code instanceof OpPreprocessorIfCode)
		{
			return t.operator::OpPreprocessorIfCode(t, op_code);
		}
		else if (op_code instanceof OpPreprocessorSwitch)
		{
			string content = "";
			for (int i=0; i<op_code.items.count(); i++)
			{
				list res = t.operator::OpPreprocessorIfCode(t, op_code.items.item(i)); string s = res[1];
				if (s == "") continue;
				content ~= s;
			}
			return [t, content];
		}
		
		return [t, ""];
	}
	
	
	
	/**
	 * Translate program
	 */
	pure list<TranslatorES6, string> translateProgramHeader(TranslatorES6 t, OpItems op_code)
	{
		string content = "";
		
		if (t.use_strict)
		{
			content = t.s("\"use strict;\"");
		}
		
		/* content ~= t.s("var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')"~
			" ? Runtime.rtl.find_class : null;"); */
		return [t, content];
	}
	
	
	
	/**
	 * Translate program
	 */
	pure list<TranslatorES6, string> translateProgram(TranslatorES6 t, OpItems op_code)
	{
		string content = "";
		
		if (op_code == null) return [t, content];
		if (op_code.uses != null)
		{
			t <= modules <= op_code.uses;
		}
		if (op_code.items != null)
		{
			list res = static::translateProgramHeader(t, op_code);
			content ~= res[1];
			for (int i=0; i<op_code.items.count(); i++)
			{
				BaseOpCode item = op_code.items.item(i);
				list res = static::translateItem(t, item); t = res[0]; string s = res[1];
				if (s == "") continue;
				content ~= s;
			}
		}
		
		content = rs::trim(content);
		
		/* Disable context */
		if (t.enable_context == false)
		{
			content = rs::replace("\\("~"ctx\\)", "()", content);
			content = rs::replace("\\("~"ctx, ", "(", content);
			content = rs::replace("\\("~"ctx,", "(", content);
			content = rs::replace(","~"ctx,", ",", content);
			content = rs::replace("this,"~"ctx", "this", content);
			content = rs::replace("this,"~" ctx", "this", content);
		}
		
		return [t, content];
	}
	
}
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

namespace Bayrell.Lang.LangPHP;

use Runtime.BaseStruct;
use Bayrell.Lang.CoreTranslator;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangPHP.TranslatorPHPExpression;
use Bayrell.Lang.LangPHP.TranslatorPHPHtml;
use Bayrell.Lang.LangPHP.TranslatorPHPOperator;
use Bayrell.Lang.LangPHP.TranslatorPHPProgram;
use Bayrell.Lang.OpCodes.BaseOpCode;


struct TranslatorPHP extends CoreTranslator
{
	/* Work */
	bool is_pipe = false;
	string pipe_var_name = "";
	string html_var_name = "";
	bool is_html = false;
	
	/* Translators */
	TranslatorPHPExpression expression = null;
	TranslatorPHPHtml html = null;
	TranslatorPHPOperator operator = null;
	TranslatorPHPProgram program = null;
	
	/* Flags */
	bool frontend = false;
	bool backend = true;
	bool enable_context = false;
	bool enable_check_types = false;
	bool enable_introspection = true;
	
	
	/**
	 * Reset translator
	 */
	pure TranslatorPHP reset(TranslatorPHP t) =>
		t.copy
		{
			"value": "",
			"current_namespace_name": "",
			"modules": new Dict<string>(),
			"expression": new TranslatorPHPExpression(),
			"html": new TranslatorPHPHtml(),
			"operator": new TranslatorPHPOperator(),
			"program": new TranslatorPHPProgram(),
			"save_vars": new Collection<string>(),
			"save_op_codes": new Collection<SaveOpCode>(),
			"save_op_code_inc": 0,
			"preprocessor_flags": 
			{
				"PHP": true,
				"FRONTEND": t.frontend,
				"BACKEND": t.backend,
				"ENABLE_CONTEXT": t.enable_context,
				"ENABLE_CHECK_TYPES": t.enable_check_types,
			},
		}
	;
	
	
	
	/**
	 * Translate BaseOpCode
	 */
	pure list<TranslatorPHP, string> translate(TranslatorPHP t, BaseOpCode op_code)
	{
		t = static::reset(t);
		return t.program::translateProgram(t, op_code);
	}
	
	
	
	/**
	 * Inc save op code
	 */
	pure CoreTranslator nextSaveOpCode(CoreTranslator t)
	{
		return "$__v" ~ t.save_op_code_inc;
	}
	
	
	
	/**
	 * Output save op code content
	 */
	pure string outputSaveOpCode(CoreTranslator t, int save_op_code_value = 0)
	{
		string content = "";
		for (int i=0; i<t.save_op_codes.count(); i++)
		{
			if (i < save_op_code_value) continue;
			SaveOpCode save = t.save_op_codes.item(i);
			string s = (save.content == "") ? 
				t.s(save.var_name ~ " = " ~ save.var_content ~ ";") :
				save.content
			;
			content ~= s;
		}
		return content;
	}
}
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

namespace Bayrell.Lang.LangPHP;

use Runtime.re;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangPHP.TranslatorPHP;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAttr;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpClassOf;
use Bayrell.Lang.OpCodes.OpCollection;
use Bayrell.Lang.OpCodes.OpCurry;
use Bayrell.Lang.OpCodes.OpCurryArg;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
use Bayrell.Lang.OpCodes.OpDict;
use Bayrell.Lang.OpCodes.OpDictPair;
use Bayrell.Lang.OpCodes.OpHtmlItems;
use Bayrell.Lang.OpCodes.OpHtmlTag;
use Bayrell.Lang.OpCodes.OpHtmlValue;
use Bayrell.Lang.OpCodes.OpIdentifier;
use Bayrell.Lang.OpCodes.OpInc;
use Bayrell.Lang.OpCodes.OpMath;
use Bayrell.Lang.OpCodes.OpMethod;
use Bayrell.Lang.OpCodes.OpNew;
use Bayrell.Lang.OpCodes.OpNumber;
use Bayrell.Lang.OpCodes.OpPipe;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpString;
use Bayrell.Lang.OpCodes.OpTernary;
use Bayrell.Lang.OpCodes.OpTypeConvert;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


static class TranslatorPHPExpression
{
	
	/**
	 * Returns string
	 */
	pure string toString(string s)
	{
		s = re::replace('\\\\', '\\\\', s);
		s = re::replace('"', '\\\"', s);
		s = re::replace('\n', '\\n', s);
		s = re::replace('\r', '\\r', s);
		s = re::replace('\t', '\\t', s);
		s = re::replace('\\$', '\\$', s);
		return '"' ~ s ~ '"';
	}
	
	
	
	/**
	 * To pattern
	 */
	pure string toPattern(TranslatorPHP t, OpTypeIdentifier pattern)
	{
		Collection names = static::findModuleNames(t, pattern.entity_name.names);
		string e = rs::join(".", names);
		Collection a = (pattern.template != null) ? 
			pattern.template.map
			(
				string (OpTypeIdentifier pattern) use (t) => static::toPattern(t, pattern)
			) : null
		;
		string b = (a != null) ? ",\"t\":[" ~ rs::join(",",a) ~ "]" : "";
		return "[\"e\"=>" ~ static::toString(e) ~ b ~"]";
	}
	
	
	
	/**
	 * Returns string
	 */
	pure string rtlToStr(TranslatorPHP t, string s)
	{
		string module_name = static::getModuleName(t, "rtl");
		return module_name ~ "::toStr("~s~")";
	}
	
	
	
	/**
	 * Find module name
	 */
	pure string findModuleName(TranslatorPHP t, string module_name)
	{
		if (module_name == "Collection") return "Runtime.Collection";
		else if (module_name == "Dict") return "Runtime.Dict";
		else if (module_name == "Map") return "Runtime.Map";
		else if (module_name == "Vector") return "Runtime.Vector";
		else if (module_name == "rs") return "Runtime.rs";
		else if (module_name == "rtl") return "Runtime.rtl";
		else if (module_name == "ArrayInterface") return "ArrayAccess";
		else if (t.modules.has(module_name)) return t.modules.item(module_name);
		return module_name;
	}
	
	
	
	/**
	 * Returns module name
	 */
	pure Collection findModuleNames(TranslatorPHP t, Collection<string> names)
	{
		if (names.count() > 0)
		{
			string module_name = names.first();
			module_name = static::findModuleName(t, module_name);
			if (module_name != "")
			{
				names = names.removeFirstIm().prependCollectionIm(rs::split("\\.", module_name));
			}
		}
		return names;
	}
	
	
	
	/**
	 * Return module name
	 */
	pure string getModuleName(TranslatorPHP t, string module_name)
	{
		module_name = static::findModuleName(t, module_name);
		module_name = rs::replace("\\.", "\\", module_name);
		return "\\" ~ module_name;
	}
	
	
	
	/**
	 * Return module name
	 */
	pure string getModuleNames(TranslatorPHP t, Collection<string> names)
	{
		return "\\" ~ rs::join("\\", static::findModuleNames(t, names));
	}
	
	
	
	/**
	 * OpTypeIdentifier
	 */
	pure list<TranslatorPHP, string> OpTypeIdentifier(TranslatorPHP t, OpTypeIdentifier op_code)
	{
		Collection<string> names = static::findModuleNames(t, op_code.entity_name.names);
		string s = "\\" ~ rs::join("\\", names);
		return [t, s];
	}
	
	
	
	/**
	 * OpIdentifier
	 */
	pure list<TranslatorPHP, string> OpIdentifier(TranslatorPHP t, OpIdentifier op_code)
	{
		if (op_code.value == "@")
		{
			if (t.enable_context == false) return [t, "\\Runtime\\rtl::getContext()"];
			else return [t, "$ctx"];
		}
		if (op_code.value == "_")
		{
			if (t.enable_context == false) return [t, "\\Runtime\\rtl::getContext()->translate"];
			else return [t, "$ctx->translate"];
		}
		
		if (op_code.value == "@") return [t, "$ctx"];
		if (op_code.value == "_") return [t, "$ctx->translate"];
		if (op_code.value == "log") return [t, "var_dump"];
		
		if (t.modules.has(op_code.value) or op_code.kind == OpIdentifier::KIND_SYS_TYPE)
		{
			string module_name = op_code.value;
			string new_module_name = static::getModuleName(t, module_name);
			return [t, new_module_name];
		}
		else if (op_code.kind == OpIdentifier::KIND_VARIABLE)
		{
			string content = op_code.value;
			return [t, "$" ~ content];
		}
		else if (op_code.kind == OpIdentifier::KIND_CLASSREF)
		{
			string content = op_code.value;
			if (content == "this") content = "$this";
			return [t, content];
		}
		
		string content = op_code.value;
		return [t, content];
	}
	
	
	
	/**
	 * OpNumber
	 */
	pure list<TranslatorPHP, string> OpNumber(TranslatorPHP t, OpNumber op_code)
	{
		string content = op_code.value;
		if (op_code.negative)
		{
			content = "-" ~ content;
			t <= opcode_level <= 15;
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpString
	 */
	pure list<TranslatorPHP, string> OpString(TranslatorPHP t, OpString op_code)
	{
		return [t, static::toString(op_code.value)];
	}
	
	
	
	/**
	 * OpCollection
	 */
	pure list<TranslatorPHP, string> OpCollection(TranslatorPHP t, OpCollection op_code)
	{
		string content = "";
		Collection<string> values = op_code.values.map
		(
			string (BaseOpCode op_code) use (t)
			{
				list res = static::Expression(t, op_code); t = res[0]; string s = res[1];
				return s;
			}
		);
		values = values.filter( bool (string s) => s != "" );
		string module_name = static::getModuleName(t, "Collection");
		content = module_name ~ "::from([" ~ rs::join(",", values) ~ "])";
		return [t, content];
	}
	
	
	
	/**
	 * OpDict
	 */
	pure list<TranslatorPHP, string> OpDict(TranslatorPHP t, OpDict op_code, bool flag_array = false)
	{
		string content = "";
		Collection<string> values = op_code.values.map
		(
			string (OpDictPair pair, string key) use (t)
			{
				if (pair.condition != null and t.preprocessor_flags[pair.condition.value] != true) return "";
				list res = static::Expression(t, pair.value); t = res[0]; string s = res[1];
				return static::toString(pair.key) ~ "=>" ~ s;
			}
		);
		values = values.filter( bool (string s) => s != "" );
		string module_name = static::getModuleName(t, "Dict");
		if (not flag_array)
		{
			content = module_name ~ "::from([" ~ rs::join(",", values) ~ "])";
		}
		else
		{
			content = "[" ~ rs::join(",", values) ~ "]";
		}
		return [t, content];
	}
	
	
	
	/**
	 * Dynamic
	 */
	pure list<TranslatorPHP, string> Dynamic(TranslatorPHP t, BaseOpCode op_code, BaseOpCode next_op_code = null)
	{
		if (op_code instanceof OpIdentifier)
		{
			return static::OpIdentifier(t, op_code);
		}
		else if (op_code instanceof OpAttr)
		{
			Vector<BaseOpCode> attrs = new Vector();
			OpAttr op_code_item = op_code;
			BaseOpCode op_code_next = op_code;
			string prev_kind = "";
			string s = "";
			bool first_item_complex = false;
			
			while (op_code_next instanceof OpAttr)
			{
				attrs.pushValue(op_code_next);
				op_code_item = op_code_next;
				op_code_next = op_code_next.obj;
			}
			
			attrs = attrs.reverseIm();
			
			if (op_code_next instanceof OpCall)
			{
				prev_kind = "var";
				list res = static::OpCall(t, op_code_next); t = res[0]; s = res[1];
				first_item_complex = true;
			}
			else if (op_code_next instanceof OpNew)
			{
				prev_kind = "var";
				list res = static::OpNew(t, op_code_next); t = res[0]; s = "(" ~ res[1] ~ ")";
				first_item_complex = true;
			}
			else if (op_code_next instanceof OpCollection)
			{
				prev_kind = "var";
				list res = static::OpCollection(t, op_code_next); t = res[0]; s = "(" ~ res[1] ~ ")";
				first_item_complex = true;
			}
			else if (op_code_next instanceof OpDict)
			{
				prev_kind = "var";
				list res = static::OpDict(t, op_code_next); t = res[0]; s = "(" ~ res[1] ~ ")";
				first_item_complex = true;
			}
			else if (op_code_next instanceof OpIdentifier)
			{
				if (op_code_next.kind == OpIdentifier::KIND_CLASSREF)
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
						s = static::getModuleName(t, t.current_class_full_name);
					}
					else if (op_code_next.value == "this")
					{
						prev_kind = "var";
						s = "$this";
					}
				}
				else if (op_code_next.kind == OpIdentifier::KIND_PIPE)
				{
					prev_kind = "var";
					list res = t::addSaveOpCode
					(
						t,
						{
							"var_content": t.pipe_var_name ~ "->val",
						}
					);
					t = res[0];
					s = res[1];
					prev_kind = "static";
				}
				else
				{
					list res = static::OpIdentifier(t, op_code_next); t = res[0]; s = res[1];
					prev_kind = "var";
					if (t.modules.has(op_code_next.value) or op_code_next.kind == OpIdentifier::KIND_SYS_TYPE)
					{
						prev_kind = "static";
					}
				}
			}
			
			if (first_item_complex and t.is_pipe)
			{
				list res = t::addSaveOpCode
				(
					t,
					{
						"var_content": s,
					}
				);
				t = res[0];
				s = res[1];
			}
			
			int attrs_sz = attrs.count();
			for (int i=0; i<attrs.count(); i++)
			{
				OpAttr attr = attrs.item(i);
				OpAttr next_attr = attrs.get(i + 1, null);
				
				if (attr.kind == OpAttr::KIND_ATTR)
				{
					/* Pipe */
					if (t.is_pipe and not (next_op_code instanceof OpCall))
					{
						if (i == attrs_sz - 1)
						{
							string val2 = static::toString(attr.value.value);
							s = "new \\Runtime\\Callback(" ~ s ~ ", " ~ val2 ~ ")";
						}
						else
						{
							s ~= "->" ~ attr.value.value;
						}
					}
					else
					{
						s ~= "->" ~ attr.value.value;
					}
				}
				else if (attr.kind == OpAttr::KIND_STATIC)
				{
					if (prev_kind == "static")
					{
						string attr_val = attr.value.value;
						if (i == attrs_sz - 1 and next_op_code instanceof OpCall)
						{
							s ~= "::" ~ attr_val;
						}
						else if (rs::strtoupper(attr_val) == attr_val)
						{
							s ~= "::" ~ attr_val;
						}
						else
						{
							string val1;
							if (s == "static") val1 = "static::class";
							/*else val1 = static::toString(s);*/
							else val1 = s ~ "::class";
							string val2 = static::toString(attr_val);
							s = "new \\Runtime\\Callback(" ~ val1 ~ ", " ~ val2 ~ ")";
						}
					}
					else
					{
						s = s ~ "::" ~ attr.value.value;
					}
					prev_kind = "static";
				}
				else if (attr.kind == OpAttr::KIND_DYNAMIC)
				{
					list res = static::Expression(t, attr.value);
					t = res[0]; /* s ~= "[" ~ res[1] ~ "]"; */
					s = "\\Runtime\\rtl::get($ctx, " ~ s ~ ", " ~ res[1] ~ ")";
				}
				else if (attr.kind == OpAttr::KIND_DYNAMIC_ATTRS)
				{
					Vector<string> items = new Vector();
					if (attr.attrs != null)
					{
						for (int j=0; j<attr.attrs.count(); j++)
						{
							list res = static::Expression(t, attr.attrs[j]); t = res[0];
							items.pushValue(res[1]);
						}
					}
					s = "\\Runtime\\rtl::attr($ctx, " ~ s ~ ", [" ~ rs::join(", ", items) ~ "])";
				}
			}
			
			return [t, s];
		}
		else if (op_code instanceof OpCurry)
		{
			list res = static::OpCurry(t, op_code); t = res[0]; string content = res[1];
			list res = t::addSaveOpCode
			(
				t,
				{
					"var_content": content,
				}
			);
			t = res[0];
			string var_name = res[1];
			return [t, var_name];
		}
		else if (op_code instanceof OpCall)
		{
			return static::OpCall(t, op_code);
		}
		return [t, ""];
	}
	
	
	
	/**
	 * OpInc
	 */
	pure list<TranslatorPHP, string> OpInc(TranslatorPHP t, OpInc op_code)
	{
		string content = "";
		list res = static::Expression(t, op_code.value); t = res[0]; string s = res[1];
		
		if (op_code.kind == OpInc::KIND_PRE_INC) content = "++$" ~ s;
		else if (op_code.kind == OpInc::KIND_PRE_DEC) content = "--$" ~ s;
		else if (op_code.kind == OpInc::KIND_POST_INC) content = "$" ~ s ~ "++";
		else if (op_code.kind == OpInc::KIND_POST_DEC) content = "$" ~ s ~ "--";
		
		return [t, content];
	}
	
	
	
	/**
	 * OpMath
	 */
	pure list<TranslatorPHP, string> OpMath(TranslatorPHP t, OpMath op_code)
	{
		list res = static::Expression(t, op_code.value1); t = res[0];
		int opcode_level1 = res[0].opcode_level;
		string s1 = res[1];
		
		string op = ""; string op_math = op_code.math;
		int opcode_level = 0;
		if (op_code.math == "!") { opcode_level = 16; op = "!"; }
		if (op_code.math == ">>") { opcode_level = 12; op = ">>"; }
		if (op_code.math == "<<") { opcode_level = 12; op = "<<"; }
		if (op_code.math == "&") { opcode_level = 9; op = "&"; }
		if (op_code.math == "xor") { opcode_level = 8; op = "^"; }
		if (op_code.math == "|") { opcode_level = 7; op = "|"; }
		if (op_code.math == "*") { opcode_level = 14; op = "*"; }
		if (op_code.math == "/") { opcode_level = 14; op = "/"; }
		if (op_code.math == "%") { opcode_level = 14; op = "%"; }
		if (op_code.math == "div") { opcode_level = 14; op = "div"; }
		if (op_code.math == "mod") { opcode_level = 14; op = "mod"; }
		if (op_code.math == "+") { opcode_level = 13; op = "+"; }
		if (op_code.math == "-") { opcode_level = 13; op = "-"; }
		if (op_code.math == "~") { opcode_level = 13; op = "+"; }
		if (op_code.math == "!") { opcode_level = 13; op = "!"; }
		if (op_code.math == "===") { opcode_level = 10; op = "==="; }
		if (op_code.math == "!==") { opcode_level = 10; op = "!=="; }
		if (op_code.math == "==") { opcode_level = 10; op = "=="; }
		if (op_code.math == "!=") { opcode_level = 10; op = "!="; }
		if (op_code.math == ">=") { opcode_level = 10; op = ">="; }
		if (op_code.math == "<=") { opcode_level = 10; op = "<="; }
		if (op_code.math == ">") { opcode_level = 10; op = ">"; }
		if (op_code.math == "<") { opcode_level = 10; op = "<"; }
		if (op_code.math == "is") { opcode_level = 10; op = "instanceof"; }
		if (op_code.math == "instanceof") { opcode_level = 10; op = "instanceof"; }
		if (op_code.math == "implements") { opcode_level = 10; op = "implements"; }
		if (op_code.math == "not") { opcode_level = 16; op = "!"; }
		if (op_code.math == "and") { opcode_level = 6; op = "&&"; }
		if (op_code.math == "&&") { opcode_level = 6; op = "&&"; }
		if (op_code.math == "or") { opcode_level = 5; op = "||"; }
		if (op_code.math == "||") { opcode_level = 5; op = "||"; }
		
		string content = "";
		if (op_code.math == "!" or op_code.math == "not")
		{
			content = op ~ t.o(s1, opcode_level1, opcode_level);
		}
		else
		{
			list res = static::Expression(t, op_code.value2); t = res[0];
			int opcode_level2 = res[0].opcode_level;
			string s2 = res[1];
			string op1 = t.o(s1, opcode_level1, opcode_level);
			string op2 = t.o(s2, opcode_level2, opcode_level);
			
			if (op_math == "~")
			{
				content = op1 ~ " . " ~ static::rtlToStr(t, op2);
			}
			else if (op_math == "implements")
			{
				content = op1 ~ " instanceof " ~ op2;
			}
			else
			{
				content = op1 ~ " " ~ op ~ " " ~ op2;
			}
		}
		
		t <= opcode_level <= opcode_level;
		return [t, content];
	}
	
	
	
	/**
	 * OpMethod
	 */
	pure list<TranslatorPHP, string> OpMethod(TranslatorPHP t, OpMethod op_code)
	{
		string content = "";
		list res = static::OpIdentifier(t, op_code.value1); t = res[0]; string val1 = res[1];
		string val2 = op_code.value2;
		
		if (op_code.kind == OpMethod::KIND_STATIC)
		{
			val1 = val1 ~ "->getClassName()";
		}
		else if (op_code.kind == OpMethod::KIND_CLASS)
		{
			val1 = val1 ~ "::class";
		}
		
		string content = "new \\Runtime\\Callback(" ~ val1 ~ ", " ~ static::toString(val2) ~ ")";
		t <= opcode_level <= 0;
		return [t, content];
	}
	
	
	
	/**
	 * OpNew
	 */
	pure list<TranslatorPHP, string> OpNew(TranslatorPHP t, OpInc op_code)
	{
		string content = "new ";
		list res = static::OpTypeIdentifier(t, op_code.value); t = res[0]; content ~= res[1];
		bool flag = false;
		
		content ~= "(";
		if (t.current_function == null or t.current_function.is_context)
		{
			content ~= "$ctx";
			flag = true;
		}
		for (int i=0; i<op_code.args.count(); i++)
		{
			BaseOpCode item = op_code.args.item(i);
			list res = t.expression::Expression(t, item); t = res[0]; string s = res[1];
			content ~= (flag ? ", " : "") ~ s;
			flag = true;
		}
		content ~= ")";
		
		return [t, content];
	}
	
	
	
	/**
	 * OpCurry
	 */
	pure list<TranslatorPHP, string> OpCurry(TranslatorPHP t, OpCurry op_code)
	{
		string content = "";
		string s = "";
		Vector<string> args_use = new Vector();
		
		Collection<OpCurryArg> args = op_code.args
			.filter( bool (BaseOpCode arg) => arg instanceof OpCurryArg )
			.sortIm(
				int (OpCurryArg arg1, OpCurryArg arg2) =>
					(arg1.pos > arg2.pos) ? 1 : ( (arg1.pos < arg2.pos) ? -1 : 0 )
			)
		;
		
		string use_obj_item = "";
		if (op_code.obj instanceof OpIdentifier)
		{
			if (op_code.obj.kind == OpIdentifier::KIND_VARIABLE)
			{
				use_obj_item = "$" ~ op_code.obj.value;
			}
		}
		
		int args_sz = op_code.args.count();
		for (int i=0; i<args_sz; i++)
		{
			OpCurryArg arg = op_code.args.item(i);
			if (arg instanceof OpCurryArg) continue;
			if (arg instanceof OpIdentifier)
			{
				args_use.pushValue("$" ~ arg.value);
			}
		}
		
		int args_sz = args.count();
		for (int i=0; i<args_sz; i++)
		{
			OpCurryArg arg = args.item(i);
			
			string s_use = "";
			Vector<string> arr_use = new Vector();
			arr_use.appendVector(args_use);
			for (int j=0; j<i; j++)
			{
				OpCurryArg arg_use = args.item(j);
				arr_use.pushValue("$__varg" ~ arg_use.pos);
			}
			if (use_obj_item != "")
			{
				arr_use.pushValue(use_obj_item);
			}
			if (arr_use.count() > 0)
			{
				s_use = " use (" ~ rs::join(", ", arr_use) ~ ")";
			}
			
			if (args_sz - 1 == i)
			{
				content ~= "function ($ctx, $__varg" ~ arg.pos ~ ")" ~ s_use ~ "{return ";
			}
			else
			{
				content ~= "function ($__ctx" ~ arg.pos ~ ", $__varg" ~ arg.pos ~ ")" ~ s_use ~ "{return ";
			}
		}
		
		bool flag = false;
		list res = static::Dynamic(t, op_code.obj, op_code); t = res[0]; s = res[1];
		if (s == "parent")
		{
			string f_name = t.current_function.name;
			if (f_name == "constructor") f_name = "__construct";
			s = "parent::" ~ f_name;
			content ~= s;
		}
		else content ~= "(" ~ s ~ ")";
		content ~= "($ctx"; flag = true;
		
		for (int i=0; i<op_code.args.count(); i++)
		{
			s = "";
			BaseOpCode item = op_code.args.item(i);
			if (item instanceof OpCurryArg)
			{
				s ~= "$__varg" ~ item.pos;
			}
			else
			{
				list res = static::Expression(t, item); t = res[0]; s = res[1];
			}
			content ~= (flag ? ", " : "") ~ s;
			flag = true;
		}
		content ~= ")";
		
		for (int i=0; i<args_sz; i++)
		{
			content ~= ";}";
		}
		
		return [t, content];
	}
	
	
	
	/**
	 * OpCall
	 */
	pure list<TranslatorPHP, string> OpCall(TranslatorPHP t, OpCall op_code)
	{
		string s = "";
		bool flag = false;
		
		list res = static::Dynamic(t, op_code.obj, op_code); t = res[0]; s = res[1];
		if (s == "parent")
		{
			string f_name = t.current_function.name;
			if (f_name == "constructor") f_name = "__construct";
			s = "parent::" ~ f_name ~ "(";
		}
		else s ~= "(";
		
		string content = s;
		if (op_code.obj instanceof OpIdentifier and op_code.obj.value == "_")
		{
			content ~= (flag ? ", " : "") ~ "$ctx";
			flag = true;
		}
		else if ((t.current_function == null or t.current_function.is_context) and op_code.is_context)
		{
			content ~= (flag ? ", " : "") ~ "$ctx";
			flag = true;
		}
		
		if (op_code.is_html)
		{
			content ~= (flag ? ", " : "") ~
				"$layout, $model_path, $render_params, $render_content";
			flag = true;
		}
		
		for (int i=0; i<op_code.args.count(); i++)
		{
			BaseOpCode item = op_code.args.item(i);
			list res = static::Expression(t, item); t = res[0]; string s = res[1];
			content ~= (flag ? ", " : "") ~ s;
			flag = true;
		}
		content ~= ")";
		
		return [t, content];
	}
	
	
	
	/**
	 * OpClassOf
	 */
	pure list<TranslatorPHP, string> OpClassOf(TranslatorPHP t, OpClassOf op_code)
	{
		Collection<string> names = static::findModuleNames(t, op_code.entity_name.names);
		string s = rs::join(".", names);
		return [t, static::toString(s)];
	}
	
	
	
	/**
	 * OpTernary
	 */
	pure list<TranslatorPHP, string> OpTernary(TranslatorPHP t, OpTernary op_code)
	{
		string content = "";
		
		t <= opcode_level <= 100;
		list res = static::Expression(t, op_code.condition); t = res[0]; string condition = res[1];
		list res = static::Expression(t, op_code.if_true); t = res[0]; string if_true = res[1];
		list res = static::Expression(t, op_code.if_false); t = res[0]; string if_false = res[1];
		
		content ~= "(" ~ condition ~ ") ? (" ~ if_true ~ ") : (" ~ if_false ~ ")";
		t <= opcode_level <= 0;
		
		/* OpTernary */
		return [t, content];
	}
	
	
	
	/**
	 * OpPipe
	 */
	pure list<TranslatorPHP, string> OpPipe(TranslatorPHP t, OpPipe op_code, bool is_expression = true)
	{
		string content = "";
		string var_name = "";
		string value = "";
		
		list res = t::incSaveOpCode(t);
		t = res[0]; var_name = res[1];
		t <= pipe_var_name <= var_name;
		
		Vector<OpPipe> items = new Vector();
		BaseOpCode op_code_item = op_code;
		while (op_code_item instanceof OpPipe)
		{
			items.pushValue(op_code_item);
			op_code_item = op_code_item.obj;
		}
		items = items.reverseIm();
		
		/* First item */
		list res = t.expression::Expression(t, op_code_item); t = res[0]; value = res[1];
		list res = t::addSaveOpCode
		(
			t,
			{
				"content": 
					t.s(var_name ~ " = new \\Runtime\\Monad($ctx, " ~ value ~ ");")
				,
			}
		);
		t = res[0];
		
		/* Output items */
		for (int i=0; i<items.count(); i++)
		{
			string s1 = "";
			string s2 = "";
			OpPipe op_item = items.item(i);
			
			if (op_item.kind == OpPipe::KIND_ATTR)
			{
				list res = static::Expression(t, op_item.value); t = res[0]; value = res[1];
				s1 = var_name ~ "->attr($ctx, " ~ value ~ ")";
			}
			else if (op_item.kind == OpPipe::KIND_METHOD)
			{
				list res = static::Dynamic(t, op_item.value); t = res[0]; value = res[1];
				s2 = "try{ ";
				s2 ~= var_name~"=("~var_name~"->val!=null && "~var_name~"->err==null) ? new \\Runtime\\Monad($ctx, "~value~") : "~var_name~";";
				s2 ~= " } catch (\\Exception $err) { ";
				s2 ~= var_name~"=new \\Runtime\\Monad($ctx, null, $err);";
				s2 ~= " }";
			}
			else if (op_item.kind == OpPipe::KIND_CALL)
			{
				t <= is_pipe <= true;
				
				string args = "";
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
				
				list res = static::Dynamic(t, op_item.value); t = res[0]; value = res[1];
				
				if (not op_item.is_async or not t.enable_async_await)
				{
					if (op_item.is_monad)
					{
						s1 = var_name ~ "->monad($ctx, " ~ value ~ ")";
					}
					else
					{
						s1 = var_name ~ "->call($ctx, " ~ value ~ args ~ ")";
					}
				}
				else if (op_item.is_async and t.current_function.isFlag("async"))
				{
					if (op_item.is_monad)
					{
						s1 = var_name ~ "->monadAsync($ctx, " ~ value ~ ")";
					}
					else
					{
						s1 = var_name ~ "->callAsync($ctx, " ~ value ~ args ~ ")";
					}
				}
				
				t <= is_pipe <= false;
			}
			
			if (s1 != "")
			{
				list res = t::addSaveOpCode
				(
					t,
					{
						"content": 
							t.s(var_name ~ " = " ~ s1 ~ ";")
						,
					}
				);
				t = res[0];
			}
			
			if (s2 != "")
			{
				list res = t::addSaveOpCode
				(
					t,
					{
						"content": t.s(s2),
					}
				);
				t = res[0];
			}
		}
		
		return [t, var_name ~ "->value($ctx)"];
	}
	
	
	
	/**
	 * OpTypeConvert
	 */
	pure list<TranslatorPHP, string> OpTypeConvert(TranslatorPHP t, OpTypeConvert op_code)
	{
		string content = "";
		list res = static::Expression(t, op_code.value); t = res[0]; string value = res[1];
		content = "\\Runtime\\rtl::to(" ~ value ~ ", " ~ static::toPattern(t, op_code.pattern) ~ ")";
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareFunction
	 */
	pure list<TranslatorPHP, string> OpDeclareFunction(TranslatorPHP t, OpDeclareFunction op_code)
	{
		string content = "";
		
		/* Set function name */
		OpDeclareFunction save_f = t.current_function;
		t <= current_function <= op_code;
		
		list res = t.operator::OpDeclareFunctionArgs(t, op_code); string args = res[1];
		content ~= "function (" ~ args ~ ")";
		if (op_code.vars != null and op_code.vars.count() > 0)
		{
			Collection<string> vars = op_code.vars.map( string (string s) => "&$" ~ s );
			content ~= " use (" ~ rs::join(",", vars) ~ ")";
		}
		list res = t.operator::OpDeclareFunctionBody(t, op_code);
		content ~= res[1];
		
		/* Restore function */
		t <= current_function <= save_f;
		
		/* OpTernary */
		return [t, content];
	}
	
	
	
	/**
	 * Expression
	 */
	pure list<TranslatorPHP, string> Expression(TranslatorPHP t, BaseOpCode op_code)
	{
		string content = "";
		bool save_is_pipe = t.is_pipe;
		t <= opcode_level <= 100;
		t <= is_pipe <= false;
		
		if (op_code instanceof OpIdentifier)
		{
			list res = static::OpIdentifier(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpTypeIdentifier)
		{
			list res = static::OpTypeIdentifier(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpNumber)
		{
			list res = static::OpNumber(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpString)
		{
			list res = static::OpString(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpCollection)
		{
			list res = static::OpCollection(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpDict)
		{
			list res = static::OpDict(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpInc)
		{
			t <= opcode_level <= 16;
			list res = static::OpInc(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpMath)
		{
			list res = static::OpMath(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpMethod)
		{
			list res = static::OpMethod(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpNew)
		{
			list res = static::OpNew(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpAttr)
		{
			list res = static::Dynamic(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpCall)
		{
			list res = static::OpCall(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpClassOf)
		{
			list res = static::OpClassOf(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpCurry)
		{
			list res = static::OpCurry(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpPipe)
		{
			return static::OpPipe(t, op_code);
		}
		else if (op_code instanceof OpTernary)
		{
			list res = static::OpTernary(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpTypeConvert)
		{
			list res = static::OpTypeConvert(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpDeclareFunction)
		{
			list res = static::OpDeclareFunction(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpHtmlItems)
		{
			t <= is_html <= true;
			list res = t.html::OpHtmlItems(t, op_code); t = res[0]; content = res[1];
			t <= is_html <= false;
		}
		else if (op_code instanceof OpPreprocessorIfDef)
		{
			list res = t.operator::OpPreprocessorIfDef(t, op_code, OpPreprocessorIfDef::KIND_EXPRESSION);
			t = res[0]; content = res[1];
		}
		
		t <= is_pipe <= save_is_pipe;
		return [t, content];
	}
	
}
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

namespace Bayrell.Lang.LangPHP;

use Runtime.lib;
use Runtime.re;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangBay.ParserBayHtml;
use Bayrell.Lang.LangPHP.TranslatorPHP;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpFor;
use Bayrell.Lang.OpCodes.OpHtmlAttribute;
use Bayrell.Lang.OpCodes.OpHtmlContent;
use Bayrell.Lang.OpCodes.OpHtmlItems;
use Bayrell.Lang.OpCodes.OpHtmlTag;
use Bayrell.Lang.OpCodes.OpHtmlValue;
use Bayrell.Lang.OpCodes.OpIf;
use Bayrell.Lang.OpCodes.OpString;
use Bayrell.Lang.OpCodes.OpWhile;


static class TranslatorPHPHtml
{
	
	/**
	 * Is component
	 */
	pure bool isComponent(string tag_name)
	{
		string ch1 = rs::substr(tag_name, 0, 1);
		string ch2 = rs::strtoupper(ch1);
		return tag_name != "" and (ch1 == "{" or ch1 == ch2);
	}
	
	
	
	/**
	 * Is single tag
	 */
	pure string isSingleTag(string tag_name)
	{
		Dict tokens = ["img", "meta", "input", "link", "br"];
		if (tokens.indexOf(tag_name) == -1) return false;
		return true;
	}
	
	
	
	/**
	 * Translator html component
	 */
	pure list<TranslatorPHP, string> OpHtmlComponent(TranslatorPHP t, OpHtmlTag op_code)
	{
		list res = t::incSaveOpCode(t); t = res[0]; string var_name = res[1];
		string content = "";
		string v_model = "null";
		string tag_name = op_code.tag_name;
		string module_name = "";
		
		if (op_code.op_code_name)
		{
			list res = t.expression::Expression(t, op_code.op_code_name);
			t = res[0]; module_name = res[1];
		}
		else
		{
			module_name = t.expression::toString(t.expression::findModuleName(t, op_code.tag_name));
		}
		
		content ~= t.s("/* Component '" ~ tag_name ~ "' */");
		content ~= t.s(var_name~"_params = [];");
		
		BaseOpCode attr_name = op_code.attrs.findItem( lib::equalAttr("key", "@name") );
		BaseOpCode attr_bind = op_code.attrs.findItem( lib::equalAttr("key", "@bind") );
		BaseOpCode attr_model = op_code.attrs.findItem( lib::equalAttr("key", "@model") );
		BaseOpCode attr_model_path = op_code.attrs.findItem( lib::equalAttr("key", "@model_path") );
		
		if (attr_name)
		{
			list res = t.expression::Expression(t, attr_name.value); t = res[0];
			v_model = "static::_concat_attrs($ctx, $model_path, " ~ res[1] ~ ")";
		}
		else if (attr_bind)
		{
			list res = t.expression::Expression(t, attr_bind.value); t = res[0];
			v_model = "static::_concat_attrs($ctx, $model_path, " ~ res[1] ~ ")";
		}
		else if (attr_model)
		{
			list res = t.expression::Expression(t, attr_model.value); t = res[0];
			v_model = "static::_concat_attrs($ctx, $model_path, " ~ res[1] ~ ")";
		}
		else if (attr_model_path)
		{
			list res = t.expression::Expression(t, attr_model_path.value); t = res[0];
			v_model = "static::_concat_attrs($ctx, [], " ~ res[1] ~ ")";
		}
		
		for (int i=0; i<op_code.attrs.count(); i++)
		{
			OpHtmlAttribute attr = op_code.attrs.item(i);
			
			if (attr.key == "@bind") continue;
			if (attr.key == "@name") continue;
			if (attr.key == "@model") continue;
			if (attr.key == "@model_path") continue;
			if (attr.key == "@ref") continue;
			
			if (attr.is_spread)
			{
				content ~= t.s("if($"~attr.value.value~"!=null)"~var_name~"_params = array_merge("~var_name~"_params,$"~attr.value.value~"->_map);");
			}
			else
			{
				list res = static::OpHtmlAttr(t, attr);
				t = res[0]; string attr_value = res[1];
				content ~= t.s(var_name~"_params[" ~ t.expression::toString(attr.key) ~ "] = " ~ attr_value ~ ";");
			}
		}
		
		content ~= t.s(var_name~"_content = [];");
		fn f = rtl::method(static::getClassName(), "OpHtmlItems");
		list res = t::saveOpCodeCall(t, f, [op_code.items, var_name~"_content"]); t = res[0];
		content ~= res[1];
		
		if (op_code.op_code_name)
		{
			content ~= t.s(var_name ~ "_name = \\Runtime\\rtl::find_class(" ~ module_name ~ ");");
			content ~= t.s(var_name ~ " = [" ~ var_name ~
				"_name::render($ctx, $layout," ~ v_model ~
				",\\Runtime\\Dict::from(" ~ var_name ~ "_params)," ~ var_name ~ "_content)];")
			;
		}
		else
		{
			content ~= t.s(var_name ~ "_name = \\Runtime\\rtl::find_class(" ~ module_name ~ ");");
			content ~= t.s(var_name ~ " = [" ~ var_name ~
				"_name::render($ctx, $layout," ~ v_model ~
				",\\Runtime\\Dict::from(" ~ var_name ~ "_params)," ~ var_name ~ "_content)];")
			;
		}
		
		list res = t::addSaveOpCode
		(
			t,
			{
				"op_code": op_code,
				"var_name": var_name,
				"content": content,
			}
		);
		t = res[0];
		return [t, var_name];
	}
	
	
	
	/**
	 * Translator html attr
	 */
	pure list<TranslatorPHP, string> OpHtmlAttr(TranslatorPHP t, OpHtmlAttribute attr)
	{
		if (attr.value instanceof OpString)
		{
			return [t, t.expression::toString(attr.value.value)];
		}
		if (attr.value instanceof OpHtmlValue)
		{
			if (attr.value.kind == OpHtmlValue::KIND_RAW)
			{
				list res = t.expression::Expression(t, attr.value.value); t = res[0]; 
				return [t, res[1]];
			}
			else if (attr.value.kind == OpHtmlValue::KIND_JSON)
			{
				list res = t.expression::Expression(t, attr.value.value); 
				t = res[0]; string value = res[1];
				value = "\\Runtime\\rtl::json_encode($ctx, " ~ value ~ ")";
				return [t, value];
			}
		}
		
		list res = t.expression::Expression(t, attr.value); t = res[0]; string value = res[1];
		value = t.o(value, res[0].opcode_level, 13);
		
		return [t, value];
	}
	
	
	
	/**
	 * Translator html template
	 */
	pure list<TranslatorPHP, string> OpHtmlAttrs(TranslatorPHP t, Collection<OpHtmlAttribute> attrs)
	{
		Vector<string> attr_class = new Vector<string>();
		string attr_s = "";
		string attr_key_value = "";
		bool has_attr_key = false;
		
		Collection<string> res_attrs = attrs.map
		(
			string (OpHtmlAttribute attr) use (t, attr_class, attr_key_value, has_attr_key)
			{
				if (attr.is_spread) return "";
				
				string attr_key = attr.key;
				string attr_value = "";
				
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
					t <= opcode_level <= 1000;
					list res = static::OpHtmlAttr(t, attr); t = res[0]; attr_value = res[1];
					attr_class.pushValue(attr_value);
					
					if (not has_attr_key and attr.value instanceof OpString)
					{
						var arr = rs::split(" ", attr.value.value);
						attr_key_value = t.expression::toString(arr[0]);
						has_attr_key = true;
					}
					
					return "";
				}
				else if (attr_key == "@key")
				{
					has_attr_key = true;
					list res = static::OpHtmlAttr(t, attr); t = res[0]; attr_value = res[1];
					attr_key_value = attr_value;
					return "";
				}
				
				if (attr_key == "@bind" or attr_key == "@name")
				{
					attr_key = "value";
					list res = t.expression::Expression(t, attr.value); t = res[0];
					attr_value = "\\Runtime\\rtl::attr($ctx, $model, " ~ res[1] ~ ", null)";
				}
				
				string ch = rs::substr(attr_key, 0, 1);
				if (ch == "@") return "";
				
				if (attr_value == "")
				{
					list res = static::OpHtmlAttr(t, attr);
					t = res[0]; attr_value = res[1];
				}
				
				return attr_key ~ "=\"'.static::_escape_attr($ctx, " ~ attr_value ~ ").'\"";
			}
		);
		res_attrs = res_attrs.filter( bool (string s) => s != "" );
		if (attr_class.count() > 0)
		{
			attr_class.pushValue( "static::getCssHash($ctx)" );
			/*attr_class.pushValue( t.expression::toString("h-" ~
				ParserBayHtml::getCssHash(t.current_class_full_name)) );*/
			res_attrs = res_attrs.pushIm
			(
				"class=" ~ "\"'." ~ rs::join(".\" \".", attr_class) ~ ".'\""
			);
		}
		if (res_attrs.count() > 0)
		{
			attr_s = " " ~ rs::join(" ", res_attrs);
		}
		
		/* Add spreads */
		for (int i=0; i<attrs.count(); i++)
		{
			OpHtmlAttribute attr = attrs[i];
			if (not attr.is_spread) continue;
			attr_s ~= " ' . static::_join_attrs($ctx, $" ~ attr.value.value ~ ") . '";
		}
		
		return [t, attr_s];
	}
	
	
	
	/**
	 * Translator html template
	 */
	pure list<TranslatorPHP, string> OpHtmlTag(TranslatorPHP t, OpHtmlTag op_code)
	{
		if (static::isComponent(op_code.tag_name))
		{
			return static::OpHtmlComponent(t, op_code);
		}
		
		/* Output attrs */
		list res = static::OpHtmlAttrs(t, op_code.attrs); t = res[0]; string attr_s = res[1];
		
		list res = t::incSaveOpCode(t); t = res[0]; string var_name = res[1];
		string content = "";
		if (op_code.tag_name != "") content ~= t.s("/* Element '" ~ op_code.tag_name ~ "' */");
		if (static::isSingleTag(op_code.tag_name))
		{
			content ~= t.s(var_name ~ " = ['<" ~ op_code.tag_name ~ attr_s ~ " />'];");
		}
		else
		{
			if (op_code.tag_name != "")
			{
				content ~= t.s(var_name ~ " = ['<" ~ op_code.tag_name ~ attr_s ~ ">'];");
			}
			else
			{
				content ~= t.s(var_name ~ " = [];");
			}
			bool flag_value = false;
			if (not flag_value)
			{
				fn f = rtl::method(static::getClassName(), "OpHtmlItems");
				list res = t::saveOpCodeCall(t, f, [op_code.items, var_name]); t = res[0];
				content ~= res[1];
			}
			if (op_code.tag_name != "")
				content ~= t.s("static::_p(" ~ var_name ~ ", '</" ~
					op_code.tag_name ~ ">');");
		}
		
		list res = t::addSaveOpCode
		(
			t,
			{
				"op_code": op_code,
				"var_name": var_name,
				"content": content,
			}
		);
		t = res[0];
		return [t, var_name];
	}
	
	
	
	/**
	 * Translator html items
	 */
	pure list<TranslatorPHP, string> OpHtmlItems(
		TranslatorPHP t, OpHtmlItems op_code, string var_name = ""
	)
	{
		if (op_code == null or op_code.items.count() == 0)
		{
			return [t, ""];
		}
		
		int items_count = op_code.items.count();
		string content = "";
		if (var_name == "")
		{
			list res = t::incSaveOpCode(t); t = res[0]; string var_name = res[1];
			content ~= t.s(var_name ~ " = [];");
		}
		
		string save_html_var_name = t.html_var_name;
		t <= html_var_name <= var_name;
		
		for (int i=0; i<op_code.items.count(); i++)
		{
			OpHtmlTag item = op_code.items.item(i);
			string item_value = "";
			string op_content = "";
			
			/* Save op codes */
			Collection<SaveOpCode> save_op_codes = t.save_op_codes;
			int save_op_code_inc = t.save_op_code_inc;
			
			if (item instanceof OpHtmlContent)
			{
				item_value = t.expression::toString(item.value);
			}
			else if (item instanceof OpHtmlTag)
			{
				list res = static::OpHtmlTag(t, item); t = res[0]; item_value = res[1];
			}
			else if (item instanceof OpHtmlValue)
			{
				if (item.kind == OpHtmlValue::KIND_RAW)
				{
					list res = t.expression::Expression(t, item.value); 
					t = res[0]; item_value = res[1];
				}
				else if (item.kind == OpHtmlValue::KIND_HTML)
				{
					list res = t.expression::Expression(t, item.value); 
					t = res[0]; item_value = res[1];
					item_value = "static::_to_html($ctx, " ~ item_value ~ ")";
				}
				else if (item.kind == OpHtmlValue::KIND_JSON)
				{
					list res = t.expression::Expression(t, item.value); 
					t = res[0]; item_value = res[1];
					item_value = "\\Runtime\\rtl::json_encode($ctx, " ~ item_value ~ ")";
				}
			}
			else if (item instanceof OpAssign)
			{
				list res = t.operator::OpAssign(t, item);
				t = res[0]; op_content ~= res[1];
			}
			else if (item instanceof OpComment)
			{
				list res = t.operator::OpComment(t, item);
				t = res[0]; op_content ~= res[1];
			}
			else if (item instanceof OpFor)
			{
				list res = t.operator::OpFor(t, item);
				t = res[0]; op_content ~= res[1];
			}
			else if (item instanceof OpIf)
			{
				list res = t.operator::OpIf(t, item);
				t = res[0]; op_content ~= res[1];
			}
			else if (item instanceof OpWhile)
			{
				list res = t.operator::OpWhile(t, item);
				t = res[0]; op_content ~= res[1];
			}
			else if (item instanceof OpCall)
			{
				list res = t.expression::OpCall(t, item); 
				t = res[0]; item_value = res[1];
				item_value = "static::_escape_html($ctx, " ~ item_value ~ ")";
			}
			else
			{
				list res = t.expression::Expression(t, item); 
				t = res[0]; item_value = res[1];
				item_value = "static::_escape_html($ctx, " ~ item_value ~ ")";
			}
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content ~= save;
			if (op_content != "") content ~= op_content;
			
			/* Restore save op codes */
			t <= save_op_codes <= save_op_codes;
			t <= save_op_code_inc <= save_op_code_inc;
			
			if (item_value != "") content ~= t.s("static::_p(" ~ var_name ~
				", " ~ item_value ~ ");");
		}
		
		t <= html_var_name <= save_html_var_name;
		
		list res = t::addSaveOpCode
		(
			t,
			{
				"op_code": op_code,
				"var_name": var_name,
				"content": content,
			}
		);
		t = res[0];
		return [t, "new \\Runtime\\RawString(" ~ var_name ~ ")"];
	}
	
}
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

namespace Bayrell.Lang.LangPHP;

use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangPHP.TranslatorPHP;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpAssignStruct;
use Bayrell.Lang.OpCodes.OpAssignValue;
use Bayrell.Lang.OpCodes.OpAttr;
use Bayrell.Lang.OpCodes.OpBreak;
use Bayrell.Lang.OpCodes.OpCall;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpContinue;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
use Bayrell.Lang.OpCodes.OpDelete;
use Bayrell.Lang.OpCodes.OpFor;
use Bayrell.Lang.OpCodes.OpHtmlItems;
use Bayrell.Lang.OpCodes.OpIdentifier;
use Bayrell.Lang.OpCodes.OpIf;
use Bayrell.Lang.OpCodes.OpIfElse;
use Bayrell.Lang.OpCodes.OpInc;
use Bayrell.Lang.OpCodes.OpItems;
use Bayrell.Lang.OpCodes.OpPipe;
use Bayrell.Lang.OpCodes.OpPreprocessorIfCode;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpPreprocessorSwitch;
use Bayrell.Lang.OpCodes.OpReturn;
use Bayrell.Lang.OpCodes.OpSafe;
use Bayrell.Lang.OpCodes.OpThrow;
use Bayrell.Lang.OpCodes.OpTryCatch;
use Bayrell.Lang.OpCodes.OpTryCatchItem;
use Bayrell.Lang.OpCodes.OpWhile;


static class TranslatorPHPOperator
{
	
	/**
	 * OpAssign
	 */
	pure list<TranslatorPHP, string> OpAssignStruct(TranslatorPHP t, OpAssign op_code, int pos = 0)
	{
		string content = "";
		string var_name = op_code.var_name;
		list res = t.expression::Expression(t, op_code.expression); t = res[0]; string expr = res[1];
		
		Collection names = op_code.names.map
		(
			string (var item) use (t)
			{
				if (item instanceof BaseOpCode)
				{
					list res = t.expression::Expression(t, item); t = res[0];
					return res[1];
				}
				return t.expression::toString(item);
			}
		);
		
		content = "\\Runtime\\rtl::setAttr($ctx, $" ~ var_name ~
			", [" ~ rs::join(", ", names) ~ "], " ~ expr ~ ")";
		return [t, content];
	}
	
	
	
	/**
	 * OpAssign
	 */
	pure list<TranslatorPHP, string> OpAssign(
		TranslatorPHP t, OpAssign op_code, bool flag_indent = true
	)
	{
		string content = "";
		
		if (op_code.kind == OpAssign::KIND_ASSIGN or op_code.kind == OpAssign::KIND_DECLARE)
		{
			for (int i=0; i<op_code.values.count(); i++)
			{
				OpAssignValue item = op_code.values.item(i);
				
				string index_s = "";
				string s = "";
				string op = item.op; if (op == "") op = "=";
				if (item.expression == null) continue;
				
				/* Expression */
				string item_expression = "";
				list res = t.expression::Expression(t, item.expression); t = res[0];
				if (op == "~=") item_expression = t.expression::rtlToStr(t, res[1]);
				else item_expression = res[1];
				
				if (item.op_code instanceof OpAttr)
				{
					Vector<string> items = new Vector();
					Vector<string> items2 = new Vector();
					
					BaseOpCode op_code_next = item.op_code;
					while (op_code_next instanceof OpAttr)
					{
						items.pushValue(op_code_next);
						op_code_next = op_code_next.obj;
					}
					
					items = items.reverseIm();
					list res = t.expression::OpIdentifier(t, op_code_next);
					t = res[0]; string obj_s = res[1];
					
					for (int j=0; j<items.count(); j++)
					{
						OpAttr item = items[j];
						
						if (item.kind == OpAttr::KIND_ATTR)
						{
							obj_s ~= "->" ~ item.value.value;
							items2.pushValue( t.expression::toString(item.value.value) );
						}
						else if (item.kind == OpAttr::KIND_DYNAMIC)
						{
							list res = t.expression::Expression(t, item.value); t = res[0];
							obj_s ~= "[" ~ res[1] ~ "]";
							items2.pushValue(res[1]);
						}
						else if (item.kind == OpAttr::KIND_DYNAMIC_ATTRS)
						{
							if (item.attrs != null)
							{
								for (int j=item.attrs.count() - 1; j>=0; j--)
								{
									list res = t.expression::Expression(t, item.attrs[j]);
									t = res[0]; obj_s ~= "[" ~ res[1] ~ "]";
									items2.pushValue(res[1]);
								}
							}
						}
					}
					
					if (op == "~=" or op == "+=" or op == "-=")
					{
						
						string op2 = "+";
						if (op == "~=" or op == "+=") op2 = "+";
						else if (op == "-=") op2 = "-";
						
						item_expression =
							"\\Runtime\\rtl\\attr($ctx, " ~ obj_s ~ ", [" ~
							rs::join(", ", items2) ~ "]) " ~ op2 ~ " " ~
							item_expression
						;
					}
					
					index_s = obj_s ~ " = " ~ item_expression ~ ";";
				}
				else
				{
					if (item.op_code != null and
						item.op_code.value == "@" and
						t.enable_context == false
					)
					{
						index_s = "\\Runtime\\rtl::setContext(" ~ item_expression ~ ");";
					}
					else
					{
						if (op_code.kind == OpAssign::KIND_DECLARE) s = "$" ~ item.var_name;
						else
						{
							list res = t.expression::OpIdentifier(t, item.op_code);
							t = res[0]; s = res[1];
						}
						if (item_expression != "")
						{
							if (op == "~=") s ~= " .= " ~ item_expression;
							else s ~= " " ~ op ~ " " ~ item_expression;
							index_s = s ~ ";";
						}
					}
				}
				
				if (item.var_name != "" and t.save_vars.indexOf(item.var_name) == -1)
				{
					t <= save_vars <= t.save_vars.pushIm(item.var_name);
				}
				
				if (index_s != "") content ~= flag_indent ? t.s(index_s) : index_s;
			}
		}
		else if (op_code.kind == OpAssign::KIND_STRUCT)
		{
			string s = "$" ~ op_code.var_name ~ " = ";
			list res = static::OpAssignStruct(t, op_code, 0); t = res[0];
			content = t.s(s ~ res[1] ~ ";");
		}
		
		return [t, content];
	}
	
	
	
	/**
	 * OpDelete
	 */
	pure list<TranslatorPHP, string> OpDelete(TranslatorPHP t, OpDelete op_code)
	{
		string content = "";
		return [t, content];
	}
	
	
	
	/**
	 * OpFor
	 */
	pure list<TranslatorPHP, string> OpFor(TranslatorPHP t, OpFor op_code)
	{
		string content = "";
		string s1 = "";
		string s2 = "";
		string s3 = "";
		
		if (op_code.expr1 instanceof OpAssign)
		{
			list res = static::OpAssign(t, op_code.expr1, false);
			t = res[0]; s1 = res[1];
		}
		else
		{
			list res = t.expression::Expression(t, op_code.expr1); 
			t = res[0]; s1 = res[1];
		}
		
		list res = t.expression::Expression(t, op_code.expr2); t = res[0]; s2 = res[1];
		list res = t.expression::Expression(t, op_code.expr3); t = res[0]; s3 = res[1];
		
		content = t.s("for ("~s1~s2~";"~s3~")");
		content ~= t.s("{");
		t = t.levelInc();
		list res = static::Operators(t, op_code.value); t = res[0]; content ~= res[1];
		t = t.levelDec();
		content ~= t.s("}");
		
		return [t, content];
	}
	
	
	
	/**
	 * OpIf
	 */
	pure list<TranslatorPHP, string> OpIf(TranslatorPHP t, OpIf op_code)
	{
		string content = "";
		list res = t.expression::Expression(t, op_code.condition);
		t = res[0]; string s1 = res[1];
		
		content = t.s("if ("~s1~")");
		content ~= t.s("{");
		t = t.levelInc();
		list res = static::Operators(t, op_code.if_true); t = res[0]; content ~= res[1];
		t = t.levelDec();
		content ~= t.s("}");
		
		for (int i=0; i<op_code.if_else.count(); i++)
		{
			OpIfElse if_else = op_code.if_else.item(i);
			list res = t.expression::Expression(t, if_else.condition); 
			t = res[0]; string s2 = res[1];
			content ~= t.s("else if ("~s2~")");
			content ~= t.s("{");
			t = t.levelInc();
			list res = static::Operators(t, if_else.if_true); t = res[0]; content ~= res[1];
			t = t.levelDec();
			content ~= t.s("}");
		}
		
		if (op_code.if_false != null)
		{
			content ~= t.s("else");
			content ~= t.s("{");
			t = t.levelInc();
			list res = static::Operators(t, op_code.if_false); 
			t = res[0]; content ~= res[1];
			t = t.levelDec();
			content ~= t.s("}");
		}
		
		return [t, content];
	}
	
	
	
	/**
	 * OpReturn
	 */
	pure list<TranslatorPHP, string> OpReturn(TranslatorPHP t, OpReturn op_code)
	{
		string content = "";
		string s1 = "";
		if (op_code.expression)
		{
			list res = t.expression::Expression(t, op_code.expression); t = res[0]; s1 = res[1];
		}
		
		if (t.current_function.flags != null and t.current_function.flags.isFlag("memorize"))
		{
			string content = t.s("$__memorize_value = " ~ s1 ~ ";");
			content ~= t.s(t.expression::getModuleName(t, "Runtime.rtl") ~ "::_memorizeSave(\"" ~ 
					t.current_class_full_name ~ "." ~ t.current_function.name ~
					"\", func_get_args(), $__memorize_value);");
			content ~= t.s("return $__memorize_value;");
			return [t, content];
		}
		
		content ~= t.s("return " ~ s1 ~ ";");
		return [t, content];
	}
	
	
	
	/**
	 * OpThrow
	 */
	pure list<TranslatorPHP, string> OpThrow(TranslatorPHP t, OpThrow op_code)
	{
		list res = t.expression::Expression(t, op_code.expression); t = res[0];
		string content = t.s("throw " ~ res[1] ~ ";");
		return [t, content];
	}
	
	
	
	/**
	 * OpTryCatch
	 */
	pure list<TranslatorPHP, string> OpTryCatch(TranslatorPHP t, OpTryCatch op_code)
	{
		string content = "";
		
		content ~= t.s("try");
		content ~= t.s("{");
		t = t.levelInc();
		list res = static::Operators(t, op_code.op_try); t = res[0]; content ~= t.s(res[1]);
		t = t.levelDec();
		content ~= t.s("}");
		content ~= t.s("catch (\\Exception $_ex)");
		content ~= t.s("{");
		t = t.levelInc();
		
		for (int i=0; i<op_code.items.count(); i++)
		{
			string s = ""; string pattern = "";
			OpTryCatchItem item = op_code.items.item(i);
			list res = t.expression::OpTypeIdentifier(t, item.pattern); t = res[0]; pattern ~= res[1];
			
			if (pattern != "\\var") s = "if ($_ex instanceof " ~ pattern ~ ")";
			else s = "if (true)";
			
			s ~= t.s("{");
			t = t.levelInc();
			
			s ~= (s != "") ? t.s("$" ~ item.name ~ " = $_ex;") : "$" ~ item.name ~ " = $_ex;";
			list res = static::Operators(t, item.value); t = res[0]; s ~= res[1];
			
			t = t.levelDec();
			s ~= t.s("}");
			
			if (i != 0) s = "else " ~ s;
			content ~= t.s(s);
		}
		
		content ~= t.s("else");
		content ~= t.s("{");
		t = t.levelInc();
		content ~= t.s("throw $_ex;");
		t = t.levelDec();
		content ~= t.s("}");
		t = t.levelDec();
		content ~= t.s("}");
		
		return [t, content];
	}
	
	
	
	/**
	 * OpWhile
	 */
	pure list<TranslatorPHP, string> OpWhile(TranslatorPHP t, OpWhile op_code)
	{
		string content = "";
		list res = t.expression::Expression(t, op_code.condition); t = res[0]; string s1 = res[1];
		
		content ~= t.s("while ("~s1~")");
		content ~= t.s("{");
		t = t.levelInc();
		list res = static::Operators(t, op_code.value); t = res[0]; content ~= res[1];
		t = t.levelDec();
		content ~= t.s("}");
		
		return [t, content];
	}
	
	
	
	/**
	 * OpPreprocessorIfCode
	 */
	pure list<TranslatorPHP, string> OpPreprocessorIfCode(TranslatorPHP t, OpPreprocessorIfCode op_code)
	{
		string content = "";
		if (t.preprocessor_flags[op_code.condition.value] == true)
		{
			content = rs::trim(op_code.content);
		}
		return [t, t.s(content)];
	}
	
	
	
	/**
	 * OpPreprocessorIfDef
	 */
	pure list<TranslatorPHP, string> OpPreprocessorIfDef
	(
		TranslatorPHP t, OpPreprocessorIfDef op_code, string kind
	)
	{
		if (not t.preprocessor_flags[op_code.condition.value] == true) return [t, ""];
		
		if (kind == OpPreprocessorIfDef::KIND_OPERATOR)
		{
			return static::Operators(t, op_code.items);
		}
		else if (kind == OpPreprocessorIfDef::KIND_EXPRESSION)
		{
			return t.expression::Expression(t, op_code.items);
		}
		
		string content = "";
		for (int i=0; i<op_code.items.count(); i++)
		{
			BaseOpCode item = op_code.items.item(i);
			if (item instanceof OpComment)
			{
				list res = t.operator::OpComment(t, item);
				t = res[0]; content ~= res[1];
			}
			else if (item instanceof OpDeclareFunction)
			{
				list res = t.program::OpDeclareFunction(t, item);
				t = res[0]; content ~= res[1];
			}
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpComment
	 */
	pure list<TranslatorPHP, string> OpComment(TranslatorPHP t, OpComment op_code)
	{
		string content = t.s("/*" ~ op_code.value ~ "*/");
		return [t, content];
	}
	
	
	
	/**
	 * OpComments
	 */
	pure list<TranslatorPHP, string> OpComments(TranslatorPHP t, Collection<OpComment> comments)
	{
		string content = "";
		for (int i=0; i<comments.count(); i++)
		{
			list res = static::OpComment(t, comments.item(i));
			content ~= res[1];
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpComments
	 */
	pure list<TranslatorPHP, string> AddComments
	(
		TranslatorPHP t, Collection<OpComment> comments, string content
	)
	{
		if (comments and comments.count() > 0)
		{
			list res = static::OpComments(t, comments);
			string s = res[1];
			if (s != "")
			{
				content = s ~ content;
			}
		}
		return [t, content];
	}
	
	
	
	/**
	 * Operator
	 */
	pure list<TranslatorPHP, string> Operator(TranslatorPHP t, BaseOpCode op_code)
	{
		string content = "";
		
		/* Save op codes */
		Collection<SaveOpCode> save_op_codes = t.save_op_codes;
		int save_op_code_inc = t.save_op_code_inc;
		
		if (op_code instanceof OpAssign)
		{
			list res = static::OpAssign(t, op_code); t = res[0]; string content = res[1];
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content = save ~ content;
			
			t <= save_op_codes <= save_op_codes;
			t <= save_op_code_inc <= save_op_code_inc;
			
			return [t, content];
		}
		else if (op_code instanceof OpAssignStruct)
		{
			list res = static::OpAssignStruct(t, op_code); t = res[0]; string s1 = res[1];
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content = save;
			content ~= t.s("$" ~ op_code.var_name ~ " = " ~ s1 ~ ";");
			
			t <= save_op_codes <= save_op_codes;
			t <= save_op_code_inc <= save_op_code_inc;
			
			return [t, content]
		}
		else if (op_code instanceof OpBreak)
		{
			content = t.s("break;");
		}
		else if (op_code instanceof OpCall)
		{
			list res = t.expression::OpCall(t, op_code); t = res[0]; content = t.s(res[1] ~ ";");
		}
		else if (op_code instanceof OpContinue)
		{
			content = t.s("continue;");
		}
		else if (op_code instanceof OpDelete)
		{
			list res = static::OpDelete(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpFor)
		{
			list res = static::OpFor(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpIf)
		{
			list res = static::OpIf(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpPipe)
		{
			list res = t.expression::OpPipe(t, op_code, false); t = res[0]; content = t.s(res[1] ~ ";");
		}
		else if (op_code instanceof OpReturn)
		{
			list res = static::OpReturn(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpThrow)
		{
			list res = static::OpThrow(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpTryCatch)
		{
			list res = static::OpTryCatch(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpWhile)
		{
			list res = static::OpWhile(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpInc)
		{
			list res = t.expression::OpInc(t, op_code); t = res[0]; content = t.s(res[1] ~ ";");
		}
		else if (op_code instanceof OpPreprocessorIfCode)
		{
			list res = static::OpPreprocessorIfCode(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpPreprocessorIfDef)
		{
			list res = static::OpPreprocessorIfDef(t, op_code, OpPreprocessorIfDef::KIND_OPERATOR);
			t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpPreprocessorSwitch)
		{
			for (int i=0; i<op_code.items.count(); i++)
			{
				list res = static::OpPreprocessorIfCode(t, op_code.items.item(i)); string s = res[1];
				if (s == "") continue;
				content ~= s;
			}
		}
		else if (op_code instanceof OpComment)
		{
			list res = static::OpComment(t, op_code); t = res[0]; content = res[1];
		}
		else if (op_code instanceof OpSafe)
		{
			list res = static::Operators(t, op_code.items); t = res[0]; content = res[1];
		}
		
		/* Output save op code */
		string save = t::outputSaveOpCode(t, save_op_codes.count());
		if (save != "") content = save ~ content;
		
		/* Restore save op codes */
		t <= save_op_codes <= save_op_codes;
		t <= save_op_code_inc <= save_op_code_inc;
		
		return [t, content];
	}
	
	
	
	/**
	 * Operators
	 */
	pure list<TranslatorPHP, string> Operators(TranslatorPHP t, BaseOpCode op_code)
	{
		string content = "";
		
		fn f1 = bool (BaseOpCode op_code) =>
			op_code instanceof OpBreak or
			op_code instanceof OpCall or
			op_code instanceof OpContinue or
			op_code instanceof OpReturn or
			op_code instanceof OpThrow
		;
		
		if (op_code instanceof OpItems)
		{
			for (int i=0; i<op_code.items.count(); i++)
			{
				BaseOpCode item = op_code.items.item(i);
				list res = static::Operator(t, item); t = res[0];
				content ~= res[1];
			}
		}
		else if (op_code instanceof OpHtmlItems)
		{
			string save_html_var_name = t.html_var_name;
			bool save_is_html = t.is_html;
			
			/* Save op codes */
			Collection<SaveOpCode> save_op_codes = t.save_op_codes;
			int save_op_code_inc = t.save_op_code_inc;
			
			t <= is_html <= true;
			list res = t.html::OpHtmlItems(t, op_code);
			t = res[0];
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t, save_op_codes.count());
			if (save != "") content = save;
			
			/* Output content */
			if (res[1] != "")
			{
				content ~= t.s("static::_p(" ~ save_html_var_name ~ ", " ~ res[1] ~ ");");
			}
			
			t <= save_op_codes <= save_op_codes;
			t <= save_op_code_inc <= save_op_code_inc;
			t <= is_html <= save_is_html;
		}
		else
		{
			list res = static::Operator(t, op_code); t = res[0];
			content ~= res[1];
		}
		
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareFunction Arguments
	 */
	pure list<TranslatorPHP, string> OpDeclareFunctionArgs(TranslatorPHP t, OpDeclareFunction f)
	{
		string content = "";
		if (f.args != null)
		{
			bool flag = false;
			if (f.is_context) { content ~= "$ctx"; flag = true; }
			if (f.is_html)
			{
				flag = true;
				content ~= (flag ? ", " : "") ~
					"$layout, $model_path, $render_params, $render_content";
			}
			for (int i=0; i<f.args.count(i); i++)
			{
				OpDeclareFunctionArg arg = f.args.item(i);
				string name = arg.name;
				string expr = "";
				if (arg.expression != null)
				{
					list res = t.expression::Expression(t, arg.expression); t = res[0]; expr = res[1];
				}
				content ~= (flag ? ", " : "") ~ "$" ~ name ~ ((expr != "") ? "=" ~ expr : "");
				flag = true;
			}
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareFunction Body
	 */
	pure list<TranslatorPHP, string> OpDeclareFunctionBody(TranslatorPHP t, OpDeclareFunction f)
	{
		TranslatorPHP save_t = t;
		t <= is_pipe <= false;
		t <= is_html <= false;
		
		string content = "";
		t = t.levelInc();
		
		if (f.is_html)
		{
			content ~= t.s("$model = \\Runtime\\rtl::attr($layout, $model_path);");
		}
		
		if (f.items)
		{
			list res = t.operator::Operators(t, f.items); t = res[0];
			content ~= res[1];
		}
		else if (f.expression)
		{
			/* Clear save op codes */
			t = t::clearSaveOpCode(t);
		
			list res = t.expression::Expression(t, f.expression); t = res[0];
			string expr = res[1];
			string s = "";
			if (f.flags != null and f.flags.isFlag("memorize"))
			{
				s = "$__memorize_value = " ~ expr ~ ";";
				s ~= t.s(t.expression::getModuleName(t, "Runtime.rtl") ~ "::_memorizeSave(\"" ~ 
						t.current_class_full_name ~ "." ~ f.name ~
						"\", func_get_args(), $__memorize_value);");
				s ~= t.s("return $__memorize_value;");
			}
			else
			{
				s = t.s("return " ~ expr ~ ";");
			}
			
			/* Output save op code */
			string save = t::outputSaveOpCode(t);
			if (save != "") content ~= save;
			content ~= s;
		}
		
		if (f.flags != null and f.flags.isFlag("memorize"))
		{
			string s = "";
			s ~= t.s("$__memorize_value = " ~ t.expression::getModuleName(t, "Runtime.rtl") ~
				"::_memorizeValue(\"" ~
				t.current_class_full_name ~ "." ~ f.name ~
				"\", func_get_args());");
			s ~= t.s("if ($__memorize_value != " ~ t.expression::getModuleName(t, "Runtime.rtl") ~
				"::$_memorize_not_found) return $__memorize_value;");
			content = s ~ content;
		}
		t = t.levelDec();
		content = t.s("{") ~ content;
		content ~= t.s("}");
		
		return [save_t, content];		
	}
	
}
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

namespace Bayrell.Lang.LangPHP;

use Runtime.BaseStruct;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.Exceptions.DeclaredClass;
use Bayrell.Lang.LangPHP.TranslatorPHP;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpAssignValue;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpDeclareClass;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpFlags;
use Bayrell.Lang.OpCodes.OpItems;
use Bayrell.Lang.OpCodes.OpNamespace;
use Bayrell.Lang.OpCodes.OpPreprocessorIfCode;
use Bayrell.Lang.OpCodes.OpPreprocessorIfDef;
use Bayrell.Lang.OpCodes.OpPreprocessorSwitch;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;
use Bayrell.Lang.OpCodes.OpUse;


static class TranslatorPHPProgram
{
	
	
	/**
	 * OpNamespace
	 */
	pure list<TranslatorPHP, string> OpNamespace(TranslatorPHP t, OpNamespace op_code)
	{
		Collection<string> arr = rs::split("\\.", op_code.name);
		t <= current_namespace_name <= op_code.name;
		return [t, t.s("namespace " ~ rs::join("\\", arr) ~ ";")];
	}
	
	
	
	/**
	 * OpDeclareFunction
	 */
	pure list<TranslatorPHP, string> OpDeclareFunction(TranslatorPHP t, OpDeclareFunction op_code)
	{
		if (op_code.isFlag("declare")) return [t, ""];
		
		string content = "";
		
		/* Set current function */
		t <= current_function <= op_code;
		
		string s1 = "", s2 = "";
		if (op_code.isStatic())
		{
			s1 ~= "static ";
			t <= is_static_function <= true;
		}
		else
		{
			t <= is_static_function <= false;
		}
		list res = t.operator::OpDeclareFunctionArgs(t, op_code); string args = res[1];
		s1 ~= "function " ~ op_code.name ~ "(" ~ args ~ ")";
		if (t.current_class.kind != OpDeclareClass::KIND_INTERFACE)
		{
			list res = t.operator::OpDeclareFunctionBody(t, op_code); s2 ~= res[1];
		}
		else s2 ~= ";";
		
		s1 = t.s(s1);
		
		/* Function comments */
		list res = t.operator::AddComments(t, op_code.comments, s1 ~ s2); content ~= res[1];
		return [t, content];
	}
	
	
	
	/**
	 * OpFunctionAnnotations
	 */
	pure list<TranslatorPHP, string> OpFunctionAnnotations(TranslatorPHP t, OpDeclareFunction f)
	{
		string content = "";
		if (f.flags.isFlag("declare")) return [t, content];
		if (not f.annotations) return [t, content];
		if (f.annotations.count() == 0) return [t, content];
		content ~= t.s("if ($field_name == " ~ t.expression::toString(f.name) ~ ")");
		t = t.levelInc();
		
		content ~= t.s("return \\Runtime\\Dict::from([");
		t = t.levelInc();
		
		if (f.flags.isFlag("async"))
		{
			content ~= t.s("\"async\"=>true,");
		}
		content ~= t.s("\"annotations\"=>\\Runtime\\Collection::from([");
		t = t.levelInc();
		
		for (int j=0; j<f.annotations.count(); j++)
		{
			OpAnnotation annotation = f.annotations.item(j);
			list res = t.expression::OpTypeIdentifier(t, annotation.name);
			t = res[0]; string name = res[1];
			list res = t.expression::OpDict(t, annotation.params, true);
			t = res[0]; string params = res[1];
			content ~= t.s("new " ~ name ~ "($ctx, " ~ params ~ "),");
		}
		
		t = t.levelDec();
		content ~= t.s("]),");
		t = t.levelDec();
		content ~= t.s("]);");
		
		t = t.levelDec();
		return [t, content];
	}
	
	
	
	/**
	 * OpClassBodyItemMethodsList
	 */
	pure list<TranslatorPHP, string> OpClassBodyItemMethodsList(TranslatorPHP t, BaseOpCode item)
	{
		string content = "";
		if (item instanceof OpPreprocessorIfDef)
		{
			if (t.preprocessor_flags[item.condition.value] == true)
			{
				for (int i=0; i<item.items.count(); i++)
				{
					BaseOpCode op_code = item.items.item(i);
					list res = static::OpClassBodyItemMethodsList(t, op_code);
					t = res[0]; content ~= res[1];
				}
			}
		}
		else if (item instanceof OpDeclareFunction)
		{
			if (
				not item.flags.isFlag("declare") and
				not item.flags.isFlag("protected") and
				not item.flags.isFlag("private")
			){
				content ~= t.s( t.expression::toString(item.name) ~ "," );
			}
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpClassBodyItemAnnotations
	 */
	pure list<TranslatorPHP, string> OpClassBodyItemAnnotations(TranslatorPHP t, BaseOpCode item)
	{
		string content = "";
		if (item instanceof OpPreprocessorIfDef)
		{
			if (t.preprocessor_flags[item.condition.value] == true)
			{
				for (int i=0; i<item.items.count(); i++)
				{
					BaseOpCode op_code = item.items.item(i);
					list res = static::OpClassBodyItemAnnotations(t, op_code);
					t = res[0]; content ~= res[1];
				}
			}
		}
		else if (item instanceof OpDeclareFunction)
		{
			list res = static::OpFunctionAnnotations(t, item);
			t = res[0]; content ~= res[1];
		}
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareClass
	 */
	pure list<TranslatorPHP, string> OpDeclareClassConstructor(TranslatorPHP t, OpDeclareClass op_code)
	{
		if (op_code.fn_create == null) return [t, ""];
		
		string open = "";
		string content = "";
		TranslatorPHP save_t = t;
		
		/* Set function name */
		t <= current_function <= op_code.fn_create;
		
		/* Clear save op codes */
		t = t::clearSaveOpCode(t);
		
		open ~= t.s("function __construct(");
		list res = t.operator::OpDeclareFunctionArgs(t, op_code.fn_create); 
		t = res[0];
		open ~= res[1];
		open ~= ")";
		open ~= t.s("{");
		t = t.levelInc();
		
		/* Function body */
		list res = t.operator::Operators
		(
			t, 
			op_code.fn_create.expression ? op_code.fn_create.expression : op_code.fn_create.items
		);
		t = res[0];
		content ~= res[1];
		
		/* Constructor end */
		string save = t::outputSaveOpCode(t);
		if (save != "") content = open ~ t.s(save ~ content);
		else content = open ~ content;
		t = t.levelDec();
		content ~= t.s("}");
		
		return [save_t, content];
	}
	
	
	
	/**
	 * OpDeclareClass
	 */
	pure list<TranslatorPHP, string> OpDeclareClassBody(TranslatorPHP t, OpDeclareClass op_code)
	{
		string content = "";
		string class_kind = op_code.kind;
		
		Collection<SaveOpCode> save_op_codes = t.save_op_codes;
		int save_op_code_inc = t.save_op_code_inc;
		t = t::clearSaveOpCode(t);
		
		content ~= t.s("{");
		t = t.levelInc();
		
		/* Static variables */
		if (class_kind != OpDeclareClass::KIND_INTERFACE and op_code.vars != null)
		{
			for (int i=0; i<op_code.vars.count(); i++)
			{
				OpAssign variable = op_code.vars.item(i);
				if (variable.kind != OpAssign::KIND_DECLARE) continue;
				if (variable.condition and
					t.preprocessor_flags[variable.condition.value] != true
				) continue;
				
				bool is_static = variable.flags.isFlag("static");
				bool is_const = variable.flags.isFlag("const");
				for (int j=0; j<variable.values.count(); j++)
				{
					OpAssignValue value = variable.values.item(j);
					list res = t.expression::Expression(t, value.expression);
					string s = (value.expression != null) ? res[1] : "null";
					
					if (is_static and is_const)
					{
						content ~= t.s("const " ~ value.var_name ~ "=" ~ s ~ ";");
					}
					else if (is_static)
					{
						content ~= t.s("static $" ~ value.var_name ~ "=" ~ s ~ ";");
					}
					else if (class_kind == OpDeclareClass::KIND_STRUCT)
					{
						content ~= t.s("public $__" ~ value.var_name ~ ";");
					}
					else
					{
						content ~= t.s("public $" ~ value.var_name ~ ";");
					}
					
				}
			}
		}
		
		/* Constructor */
		if (class_kind != OpDeclareClass::KIND_INTERFACE)
		{
			list res = static::OpDeclareClassConstructor(t, op_code);
			content ~= res[1];
		}
		
		/* Functions */
		if (op_code.functions != null)
		{
			for (int i=0; i<op_code.functions.count(); i++)
			{
				OpDeclareFunction f = op_code.functions.item(i);
				list res = static::OpDeclareFunction(t, f); t = res[0]; content ~= res[1];
			}
		}
		
		/* Class items */
		for (int i=0; i<op_code.items.count(); i++)
		{
			BaseOpCode item = op_code.items.item(i);
			if (item instanceof OpPreprocessorIfCode)
			{
				list res = t.operator::OpPreprocessorIfCode(t, item);
				content ~= res[1];
			}
			else if (item instanceof OpPreprocessorIfDef)
			{
				list res = t.operator::OpPreprocessorIfDef(t, item, OpPreprocessorIfDef::KIND_CLASS_BODY);
				content ~= res[1];
			}
			else if (item instanceof OpPreprocessorSwitch)
			{
				for (int j=0; j<item.items.count(); j++)
				{
					list res = t.operator::OpPreprocessorIfCode(t, item.items.item(j)); string s = res[1];
					if (s == "") continue;
					content ~= res[1];
				}
			}
		}
		
		if (class_kind != OpDeclareClass::KIND_INTERFACE)
		{
			content ~= t.s("/* ======================= Class Init Functions ======================= */");
		}
		
		/* Init variables */
		if (class_kind != OpDeclareClass::KIND_INTERFACE and op_code.vars != null)
		{
			Collection<OpAssign> vars = op_code.vars.filter
			(
				bool (OpAssign variable) => not variable.flags.isFlag("static") 
			);
			
			if (t.current_class_full_name != "Runtime.BaseObject" and vars.count() > 0)
			{
				content ~= t.s("function _init($ctx)");
				content ~= t.s("{");
				t = t.levelInc();
				if (t.current_class_extends_name != "")
				{
					content ~= t.s("parent::_init($ctx);");
				}
				
				for (int i=0; i<op_code.vars.count(); i++)
				{
					OpAssign variable = op_code.vars.item(i);
					bool is_static = variable.flags.isFlag("static");
					
					if (is_static) continue;
					if (variable.kind != OpAssign::KIND_DECLARE) continue;
					if (variable.condition and
						t.preprocessor_flags[variable.condition.value] != true
					) continue;
					
					string prefix = "";
					if (class_kind == OpDeclareClass::KIND_STRUCT)
					{
						prefix = "__";
					}
					else if (class_kind == OpDeclareClass::KIND_CLASS)
					{
						prefix = "";
					}
					
					for (int j=0; j<variable.values.count(); j++)
					{
						OpAssignValue value = variable.values.item(j);
						list res = t.expression::Expression(t, value.expression);
						string s = (value.expression != null) ? res[1] : "null";
						content ~= t.s("$this->" ~ prefix ~ value.var_name ~ " = " ~ s ~ ";");
					}
				}
				
				t = t.levelDec();
				content ~= t.s("}");
			}
			
			/* Struct */
			if (class_kind == OpDeclareClass::KIND_STRUCT or t.enable_introspection)
			{
				bool is_struct = class_kind == OpDeclareClass::KIND_STRUCT;
				string var_prefix = is_struct ? "__" : "";
				
				if (not is_struct)
				{
					/* Assign Object */
					content ~= t.s("function assignObject($ctx,$o)");
					content ~= t.s("{");
					t = t.levelInc();
					content ~= t.s("if ($o instanceof \\" ~
						rs::replace("\\.", "\\", t.current_class_full_name) ~
					")");
					content ~= t.s("{");
					t = t.levelInc();
					for (int i=0; i<op_code.vars.count(); i++)
					{
						OpAssign variable = op_code.vars.item(i);
						if (variable.kind != OpAssign::KIND_DECLARE) continue;
						if (variable.condition and
							t.preprocessor_flags[variable.condition.value] != true
						) continue;
						
						bool is_const = variable.flags.isFlag("const");
						bool is_static = variable.flags.isFlag("static");
						bool is_protected = variable.flags.isFlag("protected");
						bool is_private = variable.flags.isFlag("private");
						
						if (is_const or is_static) continue;
						if (is_protected or is_private) continue;
						
						for (int j=0; j<variable.values.count(); j++)
						{
							OpAssignValue value = variable.values.item(j);
							content ~= t.s("$this->" ~ var_prefix ~ value.var_name ~
								" = $o->" ~ var_prefix ~ value.var_name ~ ";");
						}
					}
					t = t.levelDec();
					content ~= t.s("}");
					if (t.current_class.extend_name)
					{
						content ~= t.s("parent::assignObject($ctx,$o);");
					}
					t = t.levelDec();
					content ~= t.s("}");
					
					/* Assign Value */
					content ~= t.s("function assignValue($ctx,$k,$v)");
					content ~= t.s("{");
					t = t.levelInc();
					bool flag = false;
					for (int i=0; i<op_code.vars.count(); i++)
					{
						OpAssign variable = op_code.vars.item(i);
						if (variable.kind != OpAssign::KIND_DECLARE) continue;
						if (variable.condition and
							t.preprocessor_flags[variable.condition.value] != true
						) continue;
						
						bool is_const = variable.flags.isFlag("const");
						bool is_static = variable.flags.isFlag("static");
						bool is_protected = variable.flags.isFlag("protected");
						bool is_private = variable.flags.isFlag("private");
						
						if (is_const or is_static) continue;
						if (is_protected or is_private) continue;
						
						for (int j=0; j<variable.values.count(); j++)
						{
							OpAssignValue value = variable.values.item(j);
							if (t.flag_struct_check_types)
							{
								content ~= t.s
								(
									(flag ? "else " : "") ~
									"if ($k == " ~ t.expression::toString(value.var_name) ~ ")" ~
										"$this->" ~ var_prefix ~ value.var_name ~
										" = Runtime.rtl.to($v, null, " ~ 
										static::toPattern(t, variable.pattern) ~ ");"
								);
							}
							else
							{
								content ~= t.s
								(
									(flag ? "else " : "") ~
									"if ($k == " ~ t.expression::toString(value.var_name) ~ ")" ~
									"$this->" ~ var_prefix ~ value.var_name ~ " = $v;"
								);
							}
							flag = true;
						}
					}
					if (t.current_class.extend_name)
					{
						content ~= t.s( (flag ? "else " : "") ~ "parent::assignValue($ctx,$k,$v);");
					}
					t = t.levelDec();
					content ~= t.s("}");
				}
				
				/* Take Value */
				content ~= t.s("function takeValue($ctx,$k,$d=null)");
				content ~= t.s("{");
				t = t.levelInc();
				bool flag = false;
				for (int i=0; i<op_code.vars.count(); i++)
				{
					OpAssign variable = op_code.vars.item(i);
					if (variable.kind != OpAssign::KIND_DECLARE) continue;
					if (variable.condition and
						t.preprocessor_flags[variable.condition.value] != true
					) continue;
					
					bool is_const = variable.flags.isFlag("const");
					bool is_static = variable.flags.isFlag("static");
					bool is_protected = variable.flags.isFlag("protected");
					bool is_private = variable.flags.isFlag("private");
					
					if (is_const or is_static) continue;
					if (is_protected or is_private) continue;
					
					for (int j=0; j<variable.values.count(); j++)
					{
						OpAssignValue value = variable.values.item(j);
						content ~= t.s
						(
							(flag ? "else " : "") ~
							"if ($k == " ~ t.expression::toString(value.var_name) ~
								")return $this->" ~ var_prefix ~ value.var_name ~ ";"
						);
						flag = true;
					}
				}
				if (t.current_class.extend_name)
				{
					content ~= t.s("return parent::takeValue($ctx,$k,$d);");
				}
				t = t.levelDec();
				content ~= t.s("}");
			}
		}
		
		if (class_kind != OpDeclareClass::KIND_INTERFACE)
		{
			/* Get current namespace function */
			content ~= t.s("static function getNamespace()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return " ~ t.expression::toString(t.current_namespace_name) ~ ";");
			t = t.levelDec();
			content ~= t.s("}");
			
			
			/* Get current class name function */
			content ~= t.s("static function getClassName()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return " ~ t.expression::toString(t.current_class_full_name) ~ ";");
			t = t.levelDec();
			content ~= t.s("}");
			
			
			/* Get parent class name function */
			content ~= t.s("static function getParentClassName()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return " ~ t.expression::toString(
				t.expression::findModuleName(t, t.current_class_extends_name)
			) ~ ";");
			t = t.levelDec();
			content ~= t.s("}");
			
			/* Class info */
			content ~= t.s("static function getClassInfo($ctx)");
			content ~= t.s("{");
			t = t.levelInc();
			t = t::clearSaveOpCode(t);
			
			content ~= t.s("return \\Runtime\\Dict::from([");
			t = t.levelInc();
			
			content ~= t.s("\"annotations\"=>\\Runtime\\Collection::from([");
			t = t.levelInc();
			
			for (int j=0; j<op_code.annotations.count(); j++)
			{
				OpAnnotation annotation = op_code.annotations.item(j);
				list res = t.expression::OpTypeIdentifier(t, annotation.name);
				t = res[0]; string name = res[1];
				if (annotation.params != null)
				{
					list res = t.expression::OpDict(t, annotation.params, true);
					t = res[0]; string params = res[1];
					content ~= t.s("new " ~ name ~ "($ctx, " ~ params ~ "),");
				}
				else
				{
					content ~= t.s("new " ~ name ~ "($ctx),");
				}
			}
			
			t = t.levelDec();
			content ~= t.s("]),");
			t = t.levelDec();
			content ~= t.s("]);");
			
			t = t.levelDec();
			content ~= t.s("}");
			
			/* Get fields list of the function */
			content ~= t.s("static function getFieldsList($ctx)");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("$a = [];");
			if (op_code.vars != null)
			{
				Map<Vector> vars = new Map();
				
				for (int i=0; i<op_code.vars.count(); i++)
				{
					OpAssign variable = op_code.vars.item(i);
					
					bool is_const = variable.flags.isFlag("const");
					bool is_static = variable.flags.isFlag("static");
					bool is_protected = variable.flags.isFlag("protected");
					bool is_private = variable.flags.isFlag("private");
					bool has_annotation = variable.annotations != null and
						variable.annotations.count() > 0;
					
					if (is_const or is_static) continue;
					if (is_protected or is_private) continue;
					if (variable.kind != OpAssign::KIND_DECLARE) continue;
					if (variable.condition and
						t.preprocessor_flags[variable.condition.value] != true
					) continue;
					
					for (int j=0; j<variable.values.count(); j++)
					{
						OpAssignValue value = variable.values.item(j);
						content ~= t.s("$a[]=" ~ t.expression::toString(value.var_name) ~ ";");
					}
				}
			}
			
			content ~= t.s("return " ~
				t.expression::getModuleName(t, "Runtime.Collection") ~ "::from($a);");
			t = t.levelDec();
			content ~= t.s("}");
			
			/* Get field info by name */
			content ~= t.s("static function getFieldInfoByName($ctx,$field_name)");
			content ~= t.s("{");
			t = t.levelInc();
			
			if (op_code.vars != null)
			{
				for (int i=0; i<op_code.vars.count(); i++)
				{
					OpAssign variable = op_code.vars.item(i);
					
					if (variable.kind != OpAssign::KIND_DECLARE) continue;
					if (variable.condition and
						t.preprocessor_flags[variable.condition.value] != true
					) continue;
					
					bool is_const = variable.flags.isFlag("const");
					bool is_static = variable.flags.isFlag("static");
					bool is_protected = variable.flags.isFlag("protected");
					bool is_private = variable.flags.isFlag("private");
					
					if (is_const or is_static) continue;
					if (is_protected or is_private) continue;
					
					Collection<string> v = variable.values.map(
						string (OpAssignValue value) => value.var_name
					);
					v = v.map
					(
						string (string var_name) use (t) =>
							"$field_name == " ~ t.expression::toString(var_name)
					);
					
					string var_type =
						rs::join(".", t.expression::findModuleNames(t, variable.pattern.entity_name.names))
					;
					Collection<string> var_sub_types = (variable.pattern.template != null) ?
						variable.pattern.template.map
						(
							string (OpTypeIdentifier op_code) use (t) =>
								rs::join(".", t.expression::findModuleNames(t, op_code.entity_name.names))
						)
						: []
					;
					var_sub_types = var_sub_types.map( t.expression::toString );
					
					t = t::clearSaveOpCode(t);
					
					content ~= t.s("if (" ~ rs::join(" or ", v) ~ ") "~
						"return \\Runtime\\Dict::from([");
					t = t.levelInc();
					
					content ~= t.s("\"t\"=>" ~ t.expression::toString(var_type) ~ ",");
					if (var_sub_types.count() > 0) content ~= t.s("\"s\"=> [" ~ rs::join(", ", var_sub_types) ~ "],");
					content ~= t.s("\"annotations\"=>\\Runtime\\Collection::from([");
					t = t.levelInc();
					
					for (int j=0; j<variable.annotations.count(); j++)
					{
						OpAnnotation annotation = variable.annotations.item(j);
						list res = t.expression::OpTypeIdentifier(t, annotation.name);
						t = res[0]; string name = res[1];
						list res = t.expression::OpDict(t, annotation.params, true);
						t = res[0]; string params = res[1];
						content ~= t.s("new " ~ name ~ "($ctx, " ~ params ~ "),");
					}
					
					t = t.levelDec();
					content ~= t.s("]),");
					t = t.levelDec();
					content ~= t.s("]);");
				}
			}
			
			content ~= t.s("return null;");
			t = t.levelDec();
			content ~= t.s("}");
			
			/* Get methods list of the function */
			content ~= t.s("static function getMethodsList($ctx)");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("$a=[");
			t = t.levelInc();
			if (op_code.functions != null and false)
			{
				for (int i=0; i<op_code.functions.count(); i++)
				{
					OpDeclareFunction f = op_code.functions.item(i);
					if (f.flags.isFlag("declare")) continue;
					if (f.flags.isFlag("protected")) continue;
					if (f.flags.isFlag("private")) continue;
					if (f.annotations.count() == 0) continue;
					content ~= t.s( t.expression::toString(f.name) ~ "," );
				}
			}
			if (op_code.items != null)
			{
				for (int i=0; i<op_code.items.count(); i++)
				{
					BaseOpCode item = op_code.items.item(i);
					list res = static::OpClassBodyItemMethodsList(t, item);
					t = res[0]; content ~= res[1];
				}
			}
			t = t.levelDec();
			content ~= t.s("];");
			content ~= t.s("return " ~
				t.expression::getModuleName(t, "Runtime.Collection") ~
				"::from($a);"
			);
			t = t.levelDec();
			content ~= t.s("}");
			
			/* Get method info by name */
			content ~= t.s("static function getMethodInfoByName($ctx,$field_name)");
			content ~= t.s("{");
			t = t.levelInc();
			if (op_code.functions != null)
			{
				for (int i=0; i<op_code.functions.count(); i++)
				{
					OpDeclareFunction f = op_code.functions.item(i);
					list res = static::OpFunctionAnnotations(t, f);
					t = res[0]; content ~= res[1];
				}
			}
			if (op_code.items != null)
			{
				for (int i=0; i<op_code.items.count(); i++)
				{
					BaseOpCode item = op_code.items.item(i);
					list res = static::OpClassBodyItemAnnotations(t, item);
					t = res[0]; content ~= res[1];
				}
			}
			content ~= t.s("return null;");
			t = t.levelDec();
			content ~= t.s("}");
		}
		
		
		t = t.levelDec();
		content ~= t.s("}");
		
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareClassFooter
	 */
	pure list<TranslatorPHP, string> OpDeclareClassFooter(TranslatorPHP t, OpDeclareClass op_code)
	{
		string content = "";
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareClass
	 */
	pure list<TranslatorPHP, string> OpDeclareClass(TranslatorPHP t, OpDeclareClass op_code)
	{
		if (op_code.is_abstract)
		{
			return [t, ""];
		}
		
		if (op_code.is_declare)
		{
			throw new DeclaredClass();
			return [t, ""];
		}
		
		string content = "";
		t <= current_class <= op_code;
		t <= current_class_name <= op_code.name;
		t <= current_class_full_name <= t.current_namespace_name ~ "." ~ t.current_class_name;
		
		if (op_code.class_extends != null)
		{
			string extends_name = rs::join(".", op_code.class_extends.entity_name.names);
			t <= current_class_extends_name <= extends_name;
		}
		else if (op_code.kind == OpDeclareClass::KIND_STRUCT)
		{
			t <= current_class_extends_name <= "Runtime.BaseStruct";
		}
		else if (op_code.kind == OpDeclareClass::KIND_STRUCT)
		{
			t <= current_class_extends_name <= "";
		}
		
		if (op_code.kind != OpDeclareClass::KIND_INTERFACE)
		{
			if (op_code.class_extends != null)
			{
				content = "class " ~ t.current_class_name ~
					" extends " ~ t.expression::getModuleName(t, t.current_class_extends_name)
				;
			}
			else
			{
				content = "class " ~ t.current_class_name;
			}
		}
		else
		{
			content = "interface " ~ t.current_class_name;
		}
		
		/* Add implements */
		if (op_code.class_implements != null and op_code.class_implements.count() > 0)
		{
			Collection arr = op_code.class_implements.map
			(
				string (OpTypeIdentifier item) use (t) =>
					t.expression::getModuleNames(t, item.entity_name.names)
			);
			string s1 = rs::join(", ", arr);
			content ~= " implements " ~ s1;
		}
		
		/* Class body */
		list res = static::OpDeclareClassBody(t, op_code); content ~= res[1];
		
		/* Class comments */
		list res = t.operator::AddComments(t, op_code.comments, content); content = res[1];
		
		/* Class footer */
		list res = static::OpDeclareClassFooter(t, op_code); content ~= res[1];
		
		return [t, t.s(content)];
	}
	
	
	
	/**
	 * Translate item
	 */
	pure list<TranslatorPHP, string> translateItem(TranslatorPHP t, OpItems op_code)
	{
		if (op_code instanceof OpNamespace)
		{
			return static::OpNamespace(t, op_code);
		}
		else if (op_code instanceof OpDeclareClass)
		{
			return static::OpDeclareClass(t, op_code);
		}
		else if (op_code instanceof OpComment)
		{
			return t.operator::OpComment(t, op_code);
		}
		else if (op_code instanceof OpPreprocessorIfCode)
		{
			return t.operator::OpPreprocessorIfCode(t, op_code);
		}
		else if (op_code instanceof OpPreprocessorSwitch)
		{
			string content = "";
			for (int i=0; i<op_code.items.count(); i++)
			{
				list res = t.operator::OpPreprocessorIfCode(t, op_code.items.item(i)); string s = res[1];
				if (s == "") continue;
				content ~= s;
			}
			return [t, content];
		}
		
		return [t, ""];
	}
	
	
	
	/**
	 * Translate program
	 */
	pure list<TranslatorPHP, string> translateProgramHeader(TranslatorPHP t, OpItems op_code)
	{
		string content = "<?php";
		return [t, content];
	}
	
	
	
	/**
	 * Translate program
	 */
	pure list<TranslatorPHP, string> translateProgram(TranslatorPHP t, OpItems op_code)
	{
		string content = "";
		
		if (op_code == null) return [t, content];
		if (op_code.uses != null)
		{
			t <= modules <= op_code.uses;
		}
		if (op_code.items != null)
		{
			list res = static::translateProgramHeader(t, op_code);
			content ~= res[1];
			for (int i=0; i<op_code.items.count(); i++)
			{
				BaseOpCode item = op_code.items.item(i);
				list res = static::translateItem(t, item); t = res[0]; string s = res[1];
				if (s == "") continue;
				content ~= s;
			}
		}
		
		content = rs::trim(content);
		
		/* Disable context */
		if (t.enable_context == false)
		{
			content = rs::replace("\\(\\$ctx\\)", "()", content);
			content = rs::replace("\\(\\$ctx, ", "(", content);
			content = rs::replace("\\(\\$ctx,", "(", content);
			content = rs::replace("\\,\\$ctx,", ",", content);
		}
		
		return [t, content];
	}
	
}
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
 
namespace Bayrell.Lang.OpCodes;

use Runtime.BaseObject;
use Runtime.BaseStruct;
use Runtime.Interfaces.SerializeInterface;
use Bayrell.Lang.Caret;


struct BaseOpCode extends BaseStruct
{
	static const string op = "";
	Caret caret_start = null;
	Caret caret_end = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpDict;


struct OpAnnotation extends BaseOpCode
{
	string op = "op_annotation";
	BaseOpCode name = null;
	OpDict params = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpAssignValue;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpFlags;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


struct OpAssign extends BaseOpCode
{
	static const string KIND_ASSIGN = "assign";
	static const string KIND_DECLARE = "declare";
	static const string KIND_STRUCT = "struct";
	
	string kind = "";
	string var_name = "";
	OpFlags flags = null;
	OpTypeIdentifier pattern = null;
	Collection<OpAnnotation> annotations = null;
	Collection<OpComment> comments = null;
	Collection<OpAssignValue> values = null;
	Collection<string> names = null;
	BaseOpCode expression = null;
	BaseOpCode condition = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpAssignValue;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpFlags;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


struct OpAssignStruct extends BaseOpCode
{
	string var_name = "";
	Collection<OpAnnotation> annotations = null;
	Collection<OpComment> comments = null;
	Collection<var> names = null;
	BaseOpCode expression = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpEntityName;
use Bayrell.Lang.OpCodes.OpFlags;


struct OpAssignValue extends BaseOpCode
{
	string op = "";
	string var_name = "";
	BaseOpCode op_code = null;
	BaseOpCode expression = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpAttr extends BaseOpCode
{
	static const string KIND_ATTR = "attr";
	static const string KIND_STATIC = "static";
	static const string KIND_DYNAMIC = "dynamic";
	static const string KIND_DYNAMIC_ATTRS = "dynamic_attrs";
	
	string op = "op_attr";
	string kind = "";
	BaseOpCode obj = null;
	BaseOpCode value = null;
	Collection<BaseOpCode> attrs = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpBreak extends BaseOpCode
{
	string op = "op_break";
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpCall extends BaseOpCode
{	
	string op = "op_call";
	BaseOpCode obj = null;
	Collection<BaseOpCode> args = null;
	bool is_await = false;
	bool is_context = true;
	bool is_html = false;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpEntityName;


struct OpClassOf extends BaseOpCode
{
	string op = "op_classof";
	OpEntityName entity_name = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpClassRef extends BaseOpCode
{
	string op = "op_classref";
	BaseOpCode value = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpCollection extends BaseOpCode
{
	string op = "op_collection";
	Collection<BaseOpCode> values = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpComment extends BaseOpCode
{
	string op = "op_comment";
	string value = "";
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpContinue extends BaseOpCode
{
	string op = "op_continue";
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpCurry extends BaseOpCode
{	
	string op = "op_curry";
	BaseOpCode obj = null;
	Collection<BaseOpCode> args = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpCurryArg extends BaseOpCode
{
	string op = "op_curry";
	int pos = 0;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpAssign;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpDeclareFunction;
use Bayrell.Lang.OpCodes.OpFlags;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


struct OpDeclareClass extends BaseOpCode
{
	static const string KIND_CLASS = "class";
	static const string KIND_STRUCT = "struct";
	static const string KIND_INTERFACE = "interface";
	
	string op = "op_class";
	string kind = "";
	string name = "";
	string extend_name = "";
	Collection<OpAnnotation> annotations = null;
	Collection<OpComment> comments = null;
	Collection<OpTypeIdentifier> template = null;
	OpFlags flags = null;
	OpDeclareFunction fn_create = null;
	OpDeclareFunction fn_destroy = null;
	OpTypeIdentifier class_extends = null;
	Collection<OpTypeIdentifier> class_implements = null;
	Collection<OpAssign> vars = null;
	Collection<OpDeclareFunction> functions = null;
	Collection<BaseOpCode> items = null;
	bool is_abstract = false;
	bool is_static = false;
	bool is_declare = false;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpAnnotation;
use Bayrell.Lang.OpCodes.OpComment;
use Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
use Bayrell.Lang.OpCodes.OpFlags;


struct OpDeclareFunction extends BaseOpCode
{
	string op = "op_function";
	string name = "";
	Collection<OpAnnotation> annotations = null;
	Collection<OpComment> comments = null;
	Collection<OpDeclareFunctionArg> args = null;
	Collection<string> vars = null;
	BaseOpCode result_type = null;
	BaseOpCode expression = null;
	BaseOpCode items = null;
	OpFlags flags = null;
	bool is_context = true;
	bool is_html = false;
	bool is_html_default_args = false;
	
	
	
	/**
	 * Returns true if static function
	 */
	bool isStatic() =>
		this.flags != null and
		(
			this.flags.isFlag("static") or
			this.flags.isFlag("lambda") or
			this.flags.isFlag("pure")
		)
	;
	
	
	
	/**
	 * Returns true if is flag
	 */
	bool isFlag(string flag_name) =>
		this.flags != null and this.flags.isFlag(flag_name)
	;
	
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpDeclareFunctionArg extends BaseOpCode
{
	string op = "op_function_arg";
	BaseOpCode pattern = null;
	string name = "";
	BaseOpCode expression = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpDelete extends BaseOpCode
{
	string op = "op_delete";
	BaseOpCode op_code = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpDict extends BaseOpCode
{
	string op = "op_dict";
	Dict<BaseOpCode> values = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Runtime.BaseStruct;
use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpDictPair extends BaseStruct
{
	string key = "";
	BaseOpCode value = null;
	BaseOpCode condition = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpEntityName extends BaseOpCode
{
	string op = "op_entity_name";
	Collection<string> names = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Runtime.BaseStruct;


struct OpFlags extends BaseStruct
{
	public bool p_async = false;
	public bool p_export = false;
	public bool p_static = false;
	public bool p_const = false;
	public bool p_public = false;
	public bool p_private = false;
	public bool p_protected = false;
	public bool p_declare = false;
	public bool p_serializable = false;
	public bool p_cloneable = false;
	public bool p_assignable = false;
	public bool p_memorize = false;
	public bool p_lambda = false;
	public bool p_pure = false;
	
	
	/**
	 * Read is Flag
	 */
	public bool isFlag(string name)
	{
		if (not OpFlags::hasFlag(name))	return false;
		return this.takeValue("p_"~name);
	}
	
	
	
	/**
	 * Get flags
	 */
	pure Collection<string> getFlags()
	{
		return 
		[
			"async",
			"export",
			"static",
			"const",
			"public",
			"private",
			"declare",
			"protected",
			"serializable",
			"cloneable",
			"assignable",
			"memorize",
			/*"lambda",*/
			"pure",
		];
	}
	
	
	
	/**
	 * Get flags
	 */
	pure bool hasFlag(string flag_name)
	{
		if (
			flag_name == "async" or
			flag_name == "export" or
			flag_name == "static" or
			flag_name == "const" or
			flag_name == "public" or
			flag_name == "private" or
			flag_name == "declare" or
			flag_name == "protected" or
			flag_name == "serializable" or
			flag_name == "cloneable" or
			flag_name == "assignable" or
			flag_name == "memorize" or
			flag_name == "lambda" or
			flag_name == "pure"
		){
			return true;
		}
		return false;
	}
}
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

namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpFor extends BaseOpCode
{	
	string op = "op_for";
	BaseOpCode expr1 = null;
	BaseOpCode expr2 = null;
	BaseOpCode expr3 = null;
	BaseOpCode value = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpHtmlAttribute extends BaseOpCode
{
	string op = "op_html_attr";
	string key = "";
	BaseOpCode value = "";
	bool is_spread = false;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpHtmlContent extends BaseOpCode
{
	string op = "op_html_content";
	string value = "";
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpHtmlTag;


struct OpHtmlItems extends BaseOpCode
{
	string op = "op_html";
	Collection<BaseOpCode> items = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpHtmlAttribute;
use Bayrell.Lang.OpCodes.OpHtmlItems;


struct OpHtmlTag extends BaseOpCode
{
	string op = "op_html_tag";
	string tag_name = "";
	BaseOpCode op_code_name = null;
	Collection<OpHtmlAttribute> attrs = null;
	Collection<primitive> spreads = null;
	OpHtmlItems items = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpHtmlAttribute;


struct OpHtmlValue extends BaseOpCode
{
	static const string KIND_RAW = "raw";
	static const string KIND_JSON = "json";
	static const string KIND_HTML = "html";
	
	string op = "op_html_value";
	string kind = "";
	BaseOpCode value = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpIdentifier extends BaseOpCode
{
	static const string KIND_PIPE = "pipe";
	static const string KIND_VARIABLE = "var";
	static const string KIND_SYS_TYPE = "sys";
	static const string KIND_SYS_FUNCTION = "sys_fn";
	static const string KIND_FUNCTION = "fn";
	static const string KIND_CONTEXT = "ctx";
	static const string KIND_CONSTANT = "const";
	static const string KIND_CLASS = "class";
	static const string KIND_CLASSREF = "classref";
	
	string op = "op_identifier";
	string value = "";
	string kind = "";
}
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

namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpIfElse;


struct OpIf extends BaseOpCode
{
	string op = "op_if";
	BaseOpCode condition = null;
	BaseOpCode if_true = null;
	BaseOpCode if_false = null;
	Collection<OpIfElse> if_else = null;
}
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

namespace Bayrell.Lang.OpCodes;

use Runtime.BaseStruct;
use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpIfElse extends BaseStruct
{
	BaseOpCode condition = null;
	BaseOpCode if_true = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpInc extends BaseOpCode
{
	static const string KIND_PRE_INC = "pre_inc";
	static const string KIND_PRE_DEC = "pre_dec";
	static const string KIND_POST_INC = "post_inc";
	static const string KIND_POST_DEC = "post_dec";
	string op = "op_inc";
	string kind = "";
	BaseOpCode value = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpItems extends BaseOpCode
{
	string op = "op_items";
	Collection<BaseOpCode> items = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpMath extends BaseOpCode
{
	string op = "op_math";
	BaseOpCode value1 = null;
	BaseOpCode value2 = null;	
	string math = "";
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpMethod extends BaseOpCode
{
	static const string KIND_ATTR = "attr";
	static const string KIND_STATIC = "static";
	static const string KIND_CLASS = "class";
	
	string op = "op_method";
	BaseOpCode value1 = null;
	string value2 = null;
	string kind = "";
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpModule extends BaseOpCode
{
	Dict<string> uses = null;
	Collection<BaseOpCode> items = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpNamespace extends BaseOpCode
{
	string op = "op_namespace";
	string name = "";
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


struct OpNew extends BaseOpCode
{
	string op = "op_new";
	Collection<BaseOpCode> args = null;
	OpTypeIdentifier value = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpNumber extends BaseOpCode
{
	string op = "op_number";
	int value = 0;
	bool negative = false;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpPipe extends BaseOpCode
{
	static const string KIND_ATTR = "attr";
	static const string KIND_CALL = "call";
	static const string KIND_METHOD = "method";
	
	string op = "op_pipe";
	string kind = "";
	BaseOpCode obj = null;
	BaseOpCode value = null;
	bool is_async = false;
	bool is_monad = false;
}
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

namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpPreprocessorIfCode extends BaseOpCode
{
	string op = "op_preprocessor_ifcode";
	BaseOpCode condition = null;
	string content = null;
}
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

namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpPreprocessorIfDef extends BaseOpCode
{
	static const string KIND_PROGRAM = "program";
	static const string KIND_CLASS_BODY = "class_body";
	static const string KIND_OPERATOR = "operator";
	static const string KIND_EXPRESSION = "expression";
	
	string op = "op_preprocessor_ifdef";
	BaseOpCode condition = null;
	Collection<BaseOpCode> items = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpPreprocessorIfCode;


struct OpPreprocessorSwitch extends BaseOpCode
{
	string op = "op_preprocessor_switch";
	Collection<OpPreprocessorIfCode> items = null;	
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpReturn extends BaseOpCode
{
	string op = "op_return";
	BaseOpCode expression = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpSafe extends BaseOpCode
{
	string op = "op_safe";
	BaseOpCode obj = null;
	BaseOpCode items = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpString extends BaseOpCode
{
	string op = "op_string";
	string value = "";
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpTernary extends BaseOpCode
{
	string op = "op_ternary";
	BaseOpCode condition = null;
	BaseOpCode if_true = null;
	BaseOpCode if_false = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpThrow extends BaseOpCode
{
	string op = "op_throw";
	BaseOpCode expression = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpTryCatchItem;


struct OpTryCatch extends BaseOpCode
{
	string op = "op_try_catch";
	BaseOpCode op_try = null;
	Collection<OpTryCatchItem> items = null;	
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


struct OpTryCatchItem extends BaseOpCode
{
	string op = "op_try_catch_item";
	string name = "";
	OpTypeIdentifier pattern = null;
	BaseOpCode value = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


struct OpTypeConvert extends BaseOpCode
{
	string op = "op_type_convert";
	OpTypeIdentifier pattern = null;
	BaseOpCode value = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpEntityName;


struct OpTypeIdentifier extends BaseOpCode
{
	string op = "op_type_identifier";
	OpEntityName entity_name = null;
	Collection<OpTypeIdentifier> template = null;
}
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
 
namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpUse extends BaseOpCode
{
	string op = "op_use";
	string alias = "";
	string name = "";
}
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

namespace Bayrell.Lang.OpCodes;

use Bayrell.Lang.OpCodes.BaseOpCode;


struct OpWhile extends BaseOpCode
{	
	public string op = "op_while";	
	BaseOpCode condition = null;
	BaseOpCode value = null;
}
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

namespace Bayrell.Lang.LangNode;

use Runtime.BaseStruct;
use Bayrell.Lang.CoreTranslator;
use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangES6.TranslatorES6;
use Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;
use Bayrell.Lang.LangES6.TranslatorES6Expression;
use Bayrell.Lang.LangES6.TranslatorES6Html;
use Bayrell.Lang.LangES6.TranslatorES6Operator;
use Bayrell.Lang.LangES6.TranslatorES6Program;
use Bayrell.Lang.LangNode.TranslatorNodeExpression;
use Bayrell.Lang.LangNode.TranslatorNodeProgram;
use Bayrell.Lang.OpCodes.BaseOpCode;


struct TranslatorNode extends TranslatorES6
{
	
	/* Translators */
	TranslatorES6AsyncAwait async_await = null;
	TranslatorES6Expression expression = null;
	TranslatorES6Html html = null;
	TranslatorES6Operator operator = null;
	TranslatorES6Program program = null;
	
	/* Flags */
	bool use_module_name = true;
	bool enable_async_await = true;
	bool emulate_async_await = false;
	bool enable_introspection = false;
	bool enable_context = true;
	
	
	/**
	 * Reset translator
	 */
	pure TranslatorES6 reset(TranslatorES6 t)
	{
		t = parent::reset(t);
		t <= expression <= new TranslatorNodeExpression();
		t <= program <= new TranslatorNodeProgram();
		t <= preprocessor_flags <= t.preprocessor_flags.copy({
			"BACKEND": true,
			"NODEJS": true,
			"ES6": false,
		});
		return t;
	}
	
	
	
	/**
	 * Translate BaseOpCode
	 */
	pure list<TranslatorES6, string> translate(TranslatorES6 t, BaseOpCode op_code)
	{
		t = static::reset(t);
		return t.program::translateProgram(t, op_code);
	}
	
}
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

namespace Bayrell.Lang.LangNode;

use Bayrell.Lang.SaveOpCode;
use Bayrell.Lang.LangES6.TranslatorES6;
use Bayrell.Lang.LangES6.TranslatorES6Expression;
use Bayrell.Lang.LangES6.TranslatorES6Operator;
use Bayrell.Lang.LangES6.TranslatorES6Program;
use Bayrell.Lang.OpCodes.BaseOpCode;
use Bayrell.Lang.OpCodes.OpCollection;
use Bayrell.Lang.OpCodes.OpDict;
use Bayrell.Lang.OpCodes.OpDictPair;
use Bayrell.Lang.OpCodes.OpIdentifier;
use Bayrell.Lang.OpCodes.OpTypeIdentifier;


static class TranslatorNodeExpression extends TranslatorES6Expression
{
	
	
	/**
	 * OpIdentifier
	 */
	pure list<TranslatorES6, string> OpIdentifier(TranslatorES6 t, OpIdentifier op_code)
	{
		if (op_code.value == "@") return [t, "ctx"];
		if (op_code.value == "_") return [t, "ctx.constructor.translate"];
		if (op_code.value == "log") return [t, "console.log"];
		
		if (t.modules.has(op_code.value) or op_code.kind == OpIdentifier::KIND_SYS_TYPE)
		{
			string module_name = op_code.value;
			string new_module_name = static::findModuleName(t, module_name);
			if (module_name != new_module_name)
			{
				list res = t::addSaveOpCode
				(
					t,
					{
						"op_code": op_code,
						"var_content": static::useModuleName(t, module_name),
					}
				);
				t = res[0];
				string var_name = res[1];
				return [t, var_name];
			}
		}
		
		return [t, op_code.value];
	}
	
	
	
	/**
	 * OpTypeIdentifier
	 */
	pure list<TranslatorES6, string> OpTypeIdentifier(TranslatorES6 t, OpTypeIdentifier op_code)
	{
		string var_name = "";
		
		if (op_code.entity_name.names.count() > 0)
		{
			string module_name = op_code.entity_name.names.first();
			string new_module_name = static::findModuleName(t, module_name);
			if (module_name != new_module_name)
			{
				list res = t::addSaveOpCode
				(
					t,
					{
						"var_content": static::useModuleName(t, module_name),
					}
				);
				t = res[0];
				var_name = res[1];
			}
		}
		
		if (var_name == "")
		{
			var_name = rs::join(".", op_code.entity_name.names);
		}
		
		return [t, var_name];
	}
	
	
}
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

namespace Bayrell.Lang.LangNode;

use Bayrell.Lang.LangES6.TranslatorES6;
use Bayrell.Lang.LangES6.TranslatorES6Expression;
use Bayrell.Lang.LangES6.TranslatorES6Operator;
use Bayrell.Lang.LangES6.TranslatorES6Program;
use Bayrell.Lang.OpCodes.OpDeclareClass;
use Bayrell.Lang.OpCodes.OpItems;
use Bayrell.Lang.OpCodes.OpNamespace;


static class TranslatorNodeProgram extends TranslatorES6Program
{
	
	
	/**
	 * Translate program
	 */
	pure list<TranslatorES6, string> translateProgramHeader(TranslatorES6 t, OpItems op_code)
	{
		string content = "\"use strict;\"";
		content ~= t.s("var use = require('bay-lang').use;");
		return [t, content];
	}
	
	
	
	/**
	 * OpDeclareClassFooter
	 */
	pure list<TranslatorES6, string> OpDeclareClassFooter(TranslatorES6 t, OpDeclareClass op_code)
	{
		string content = "";
		string name = "";
		
		content ~= "use.add("~t.current_class_full_name~");";
		
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
		
		content ~= t.s("module.exports = " ~ t.current_class_full_name ~ ";");
		
		return [t, content];
	}
	
	
	
}
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

namespace Bayrell.Lang;


static class ModuleDescription
{

	
	/**
	 * Returns module name
	 * @return string
	 */
	pure string getModuleName() => "Bayrell.Lang";
	
	
	
	/**
	 * Returns module name
	 * @return string
	 */
	pure string getModuleVersion() => "0.11.6";
	
	
	
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	pure Map<string> requiredModules() =>
	{
		'Runtime': '>=0.11 <1.0',
	};
	
	
	
	/**
	 * Returns enities
	 */
	pure Collection<Dict> entities() => null;
	
}

