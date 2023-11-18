/**
 * Create layout
 */
let createLayout = function(layout)
{
    return {
        install: () => {
            app.config.globalProperties.$layout = layout;
        },
    };
};

let makeFlatAddItem = function(res, value)
{
	if (value instanceof Array)
	{
		for (let i=0; i<value.length; i++)
		{
			makeFlatAddItem(res, value[i]);
		}
	}
	else
	{
		res.push(value);
	}
};

let makeFlat = function(arr)
{
	let res = [];
	makeFlatAddItem(res, arr);
	return res;
};


let App = {};
App.Component = {};


/* Layout model */
App.Component.Layout = function ()
{
	this.widgets = {};
	this.widgets["App.Component.MainPageModel"] = new App.Component.MainPageModel();
	this.widget_name = "App.Component.MainPage";
	this.widget_model_name = "App.Component.MainPageModel";
};
Object.assign(App.Component.Layout,
{
	getClassName: function()
	{
		return "App.Component.Layout";
	},
});
App.Component.Layout.prototype = {
	
	/**
	 * Returns page model
	 */
	model: function(model_path)
	{
		let obj = this;
		for (let i=0; i<model_path.length; i++)
		{
			let name = model_path[i];
			obj = obj[name];
		}
		return obj;
	},
	
	
	/**
	 * Returns page model
	 */
	getPageModel: function()
	{
		return this.widgets[this.widget_model_name];
	},
};
Runtime.rtl.defClass(App.Component.Layout);


/* Main page model */
App.Component.MainPageModel = function ()
{
	this.message = "Hello Vue!";
	this.items = new Runtime.Vector(
		"item1",
		"item2",
		"item3",
		"item4",
	);
};
Object.assign(App.Component.MainPageModel,
{
	getClassName: function()
	{
		return "App.Component.MainPageModel";
	},
});
App.Component.MainPageModel.prototype = {
	
	/**
	 * Add char to message
	 */
	add: function (char)
	{
		this.message += char;
	},
	
};
Runtime.rtl.defClass(App.Component.MainPageModel);


/* Base Component */
App.Component.BaseComponent = {
	name: 'App.Component.BaseComponent',
	props: [
		"model_path"
	],
	render: function ()
	{
		return this.render();
	},
	methods: {
		render: function ()
		{
			return "";
		},
		model: function()
		{
			return this.$layout.model(this.model_path);
		},
	},
	getClassName: function()
	{
		return "App.Component.BaseComponent";
	},
};
Runtime.rtl.defClass(App.Component.BaseComponent);


/* Main page Component */
App.Component.LayoutWidget = {
	
	name: 'App.Component.LayoutWidget',
	extends: App.Component.BaseComponent,
	
	methods: {
		render: function ()
		{
			let page_component = use(this.$layout.widget_name);
			return Vue.h(
				"div",
				{
					"class": "main_layout",
					"style": {
						"padding": "20px",
					},
				},
				Vue.h(page_component, {
					"model_path": ["widgets", this.$layout.widget_model_name]
				}),
			);
		}
	},
	
	getClassName: function()
	{
		return "App.Component.LayoutWidget";
	},
	
};
Runtime.rtl.defClass(App.Component.LayoutWidget);


/* Main page Component */
App.Component.MainPage = {
	
	name: 'App.Component.MainPage',
	extends: App.Component.BaseComponent,
	
	data: function () {
		return {
		}
	},
	
	methods: {
		
		render: function ()
		{
			return Vue.h(
				"div",
				{
					"class": "main_page",
					"style": {
						"text-align": "center",
					},
				},
				makeFlat([
					this.renderRawText(),
					Vue.h("br"),
					this.renderMessage(),
					this.renderItems(),
					Vue.h("br"),
					this.renderButton(),
					this.renderFooter(),
				])
			);
		},
		
		renderRawText: function()
		{
			return Vue.h("text", {"innerHTML": "<span>Test</span>"});
		},
		
		renderMessage: function()
		{
			return Vue.h("div", this.model().message);
		},
		
		renderItems: function()
		{
			let content = [];
			
			let items = this.model().items;
			for (let i=0; i<items.length; i++)
			{
				content.push( Vue.h("div", {"class": "item"}, items[i]) );
			}
			
			return Vue.h("div", {"class": "items"}, content);
		},
		
		renderButton: function()
		{
			let Button = App.Component.Button;
			return Vue.h(
				Button,
				{
					"onClick": this.onButtonClick,
				},
				() => ["Click me"]
			);
		},
		
		renderFooter: function()
		{
			return Vue.h(
				App.Component.FooterWidget,
				{
					"model_path": this.model_path,
					"footer_message": "footer message",
				}
			);
		},
		
		onButtonClick: function ()
		{
			let model = this.model();
			model.add("!");
		},
	},
	
	getClassName: function()
	{
		return "App.Component.MainPage";
	},
	
};
Runtime.rtl.defClass(App.Component.MainPage);


/* Footer Component */
App.Component.FooterWidget = {
	
	name: 'App.Component.FooterWidget',
	extends: App.Component.BaseComponent,
	
	props: {
		"footer_message": {
			default: "test",
		},
	},
	
	data: function () {
		return {
		}
	},
	
	methods: {
		render: function()
		{
			return Vue.h(
				"div",
				{
					"class": "footer",
					"style": "padding-top: 10px",
				},
				[
					this.footer_message + " '" + this.$options.getClassName() + "'",
				]
			);
		},
	},
	
	getClassName: function()
	{
		return "App.Component.FooterWidget";
	},
	
}
Runtime.rtl.defClass(App.Component.FooterWidget);


/* Main page Component */
App.Component.MainPage2 = {
	
	name: 'App.Component.MainPage2',
	extends: App.Component.MainPage,
	functional: true,
	
	methods: {
		renderMessage: function()
		{
			return [
				Vue.h("div", "This is SPARTA !!!"),
				Vue.h("div", this.model().message),
			];
		},
	},
	
	getClassName: function()
	{
		return "App.Component.MainPage2";
	},
};
Runtime.rtl.defClass(App.Component.MainPage2);


/* Button Component */
App.Component.Button = {
	
	name: 'App.Component.Button',
	extends: App.Component.BaseComponent,
	
	render: function ()
	{
		return this.render();
	},
	
	data: function () {
		return {
		}
	},
	
	methods: {
		render: function ()
		{
			return Vue.h(
				"button",
				{
					"ref": "button",
					"class": "button",
					"onClick": this.onClick,
				},
				this.$slots.default()
			)
		},
		onClick: function ()
		{
			console.log("click");
		},
	},
	
	getClassName: function()
	{
		return "App.Component.Button";
	},
	
}
Runtime.rtl.defClass(App.Component.Button);
