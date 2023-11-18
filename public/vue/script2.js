let Runtime = {};
Runtime.rtl = {};
Runtime.rtl._classes = {};

let use = function(class_name)
{
	if (class_name instanceof Function)
		return class_name;
	
	if (window[class_name] != undefined)
		return window[class_name];
		
	return Runtime.rtl._classes[class_name];
};

let defClass = function(obj)
{
	let class_name = obj.getClassName();
	Runtime.rtl._classes[class_name] = obj;
};

/**
 * Create layout
 */
let createLayout = function(layout)
{
    return {
        install: () => {
            app.config.globalProperties.$layout = Vue.reactive(layout);
        },
    };
};


let App = {};
App.Component = {};


/* Main page model */
App.Component.MainPageModel = function ()
{
	this.message = "Hello Vue!";
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
defClass(App.Component.MainPageModel);


/* Base Component */
App.Component.BaseComponent = {
	props: [
		"model_path"
	],
	methods: {
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
defClass(App.Component.BaseComponent);


/* Main page component */
App.Component.MainPage = function (props, context)
{
    //this.render_params = props;
    //this.render_context = context;
    return context.render();
};
Object.assign(App.Component.MainPage,
{
    /*extends: App.Component.BaseComponent,*/
    
	getClassName: function()
	{
		return "App.Component.MainPage";
	},
});
App.Component.MainPage.prototype = {
    
    render: function (props, context)
	{
		return Vue.h("div", "Test");
	},
    
    model: function()
	{
		return this.$layout.model(this.model_path);
	},
};
defClass(App.Component.MainPage);