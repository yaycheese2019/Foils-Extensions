(async function(Scratch) {
    const variables = {};
    const menus = {};
	var data = {}

    if (!Scratch.extensions.unsandboxed) {
        alert("The JSON extension needs to be un-sandboxed")
        return
    }
	
	/*
		Extension by Foil
		Can add 30,000 items to an array at instant speeds
		Code was created from scratch and not modified from any other extensions but is also inspired by skyhigh
	*/
	
    class Extension {
        getInfo()
		{
            return {
                "id": "extensionID",
                "name": "JSON Data",
                "color1": "#3271D0",
                "tbShow": true,
                "blocks":[
				{
					blockType: Scratch.BlockType.LABEL,
					text: "General",
				},
				{
					opcode: "json_newobj",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "create new [type] named [name]",
					arguments: {
					"type":
					{
						type: Scratch.ArgumentType.MENU,
						menu: 'json_type',
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					opcode: "json_objcopy",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "copy data from [n1] to [n2]",
					arguments: {
					"n1":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					"n2":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myOtherObj",
					},
					},
				},
				{
					opcode: "json_objset",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "set [nm] to json [str]",
					arguments: {
					"nm":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					"str":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "{\"key\": \"value\"}",
					},
					},
				},
				{
					opcode: "json_objstr",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "get [nm] as a string",
					arguments: {
					"nm":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					opcode: "json_delobj",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "delete [name]",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					opcode: "json_delall",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "delete all objects",
				},
				{
					opcode: "json_hasobj",
					blockType: Scratch.BlockType.BOOLEAN,
					isEdgeActivated: true,
					text: "does [name] exist?",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: "Json",
				},
				{
					opcode: "json_set",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "set [k] in [name] to [v]",
					arguments: {
					"k":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "key",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					"v":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "value",
					},
					},
				},
				{
					opcode: "json_change",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "change [k] in [name] by [v]",
					arguments: {
					"k":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "key",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					"v":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "value",
					},
					},
				},
				{
					opcode: "json_del",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "delete [k] in [name]",
					arguments: {
					"k":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "key",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					opcode: "json_get",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "value of [k] in [name]",
					arguments: {
					"k":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "key",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					opcode: "json_getbool",
					blockType: Scratch.BlockType.BOOLEAN,
					isEdgeActivated: true,
					text: "value of [k] in [name] as boolean",
					arguments: {
					"k":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "key",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					opcode: "json_length",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "length of [name]",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					opcode: "json_keys",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "all keys of [name]",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					opcode: "json_values",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "all values of [name]",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: "Json Paths",
				},
				{
					opcode: "json_setpath",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "set path [path] of [name] to [v]",
					arguments: {
					"path":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "first/second",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					"v":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "value",
					},
					},
				},
				{
					opcode: "json_setpathjson",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "set path [path] of [name] to json [v]",
					arguments: {
					"path":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "first/second",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					"v":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "{\"key\": \"value\"}",
					},
					},
				},
				{
					opcode: "json_getpath",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "get path [path] of [name]",
					arguments: {
					"path":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "first/second",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					opcode: "json_getpathjson",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "get path [path] of [name] as string",
					arguments: {
					"path":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "first/second",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myObj",
					},
					},
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: "Array",
				},
				{
					opcode: "arr_push",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "add [v] to array [name]",
					arguments: {
					"v":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "value",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					},
				},
				{
					opcode: "arr_pop",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "remove last item of array [name]",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					},
				},
				{
					opcode: "arr_sort",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "sort array [name] by [order]",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					"order":
					{
						type: Scratch.ArgumentType.STRING,
						menu: "sortOrder",
					},
					},
				},
				{
					opcode: "arr_reverse",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "reverse array [name]",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					},
				},
				{
					opcode: "arr_concat",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "concat array [n2] onto [n1]",
					arguments: {
					"n1":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					"n2":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myOtherArray",
					},
					},
				},
				{
					opcode: "arr_length",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "length of array [name]",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					},
				},
				{
					opcode: "arr_get",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "item [v] of array [name]",
					arguments: {
					"v":
					{
						type: Scratch.ArgumentType.NUMBER,
						defaultValue: 0,
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					},
				},
				{
					opcode: "arr_join",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "join array [name] by delimiter [sep]",
					arguments: {
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					"sep":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: ",",
					},
					},
				},
				{
					opcode: "arr_itemOf",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "item # of [v] in array [name]",
					arguments: {
					"v":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "value",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					},
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: "List",
				},
				{
					opcode: "arr_getlist",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "set array [name] to list [list]",
					arguments: {
					"list":
					{
						type: Scratch.ArgumentType.STRING,
						menu: "get_list",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					},
				},
				{
					opcode: "arr_setlist",
					blockType: Scratch.BlockType.COMMAND,
					isEdgeActivated: true,
					text: "set list [list] to array [name]",
					arguments: {
					"list":
					{
						type: Scratch.ArgumentType.STRING,
						menu: "get_list",
					},
					"name":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "myArray",
					},
					},
				},
			],
                "menus":{
					"json_type":{
						acceptReporters: true,
						items: ["Object", "Array"]
					},
					"get_list":{
						acceptReporters: true,
						items: "get_lists"
					},
					"sortOrder":{
						acceptReporters: true,
						items: ["ascending", "descending"]
					},
				},
            }
        }
		get_lists(args)
		{
		  const globalLists = Object.values(vm.runtime.getTargetForStage().variables).filter((x) => x.type == "list");
		  const localLists = Object.values(vm.editingTarget.variables).filter((x) => x.type == "list");
		  const uniqueLists = [...new Set([...globalLists, ...localLists])];
		  if (uniqueLists.length === 0) {
			return [
			  {
				text: "empty",
				value: "empty",
			  },
			];
		  }
		  return uniqueLists.map((i) => ({
			text: i.name,
			value: i.id,
		  }));
		}
		lookupList(list, util) {
		  const byId = util.target.lookupVariableById(list);
		  if (byId && byId.type === "list") {
			return byId;
		  }
		  const byName = util.target.lookupVariableByNameAndType(list, "list");
		  if (byName) {
			return byName;
		  }
		  return null;
		}
		json_newobj(args)
		{
			let nm = args["name"];
			if(args["type"] == "Object")
			{
				data[nm] = {};
			}
			else
			{
				data[nm] = [];
			}
		}
		json_objcopy(args)
		{
			let nm1 = args["n1"];
			let nm2 = args["n2"];
			data[nm2] = data[nm1]
		}
		json_objset(args)
		{
			let nm = args["nm"];
			let st = args["str"];
			data[nm] = JSON.parse(st)
		}
		json_objstr(args)
		{
			let nm = args["nm"];
			return JSON.stringify(data[nm]);
		}
		json_delobj(args)
		{
			let nm = args["name"];
			delete data[nm];
		}
		json_delall(args)
		{
			data = {}
		}
		json_hasobj(args)
		{
			let nm = args["name"];
			return data.hasOwnProperty(nm);
		}
		json_set(args)
		{
			let nm = args["name"];
			let k = args["k"];
			let v = args["v"];
			data[nm][k] = v;
		}
		json_change(args)
		{
			let nm = args["name"];
			let k = args["k"];
			let v = args["v"];
			data[nm][k] += v;
		}
		json_get(args)
		{
			let nm = args["name"];
			let k = args["k"];
			return data[nm][k];
		}
		json_getbool(args)
		{
			let nm = args["name"];
			let k = args["k"];
			return Scratch.Cast.toBoolean(data[nm][k]);
		}
		json_del(args)
		{
			let nm = args["name"];
			let k = args["k"];
			delete data[nm][k];
		}
		json_length(args)
		{
			let nm = args["name"];
			return Object.keys(data[nm]).length;
		}
		json_keys(args)
		{
			let nm = args["name"];
			return Object.keys(data[nm]);
		}
		json_values(args)
		{
			let nm = args["name"];
			return Object.values(data[nm]);
		}
		json_setpath(args)
		{
			let nm = args["name"];
			let path = args["path"].split("/");
			let c = "data[nm]";
			for(var i = 0;i < path.length;i++)
			{
				c += ("[" + "\"" + path[i] + "\"" + "]");
			}
			c += " = " + args["v"];
			eval(c);
		}
		json_setpathjson(args)
		{
			let nm = args["name"];
			let path = args["path"].split("/");
			let c = "data[nm]";
			let v = JSON.parse(args["v"]);
			for(var i = 0;i < path.length;i++)
			{
				c += ("[" + "\"" + path[i] + "\"" + "]");
			}
			c += " = v"
			eval(c);
		}
		json_getpath(args)
		{
			let nm = args["name"];
			let path = args["path"].split("/");
			let c = "data[nm]";
			for(var i = 0;i < path.length;i++)
			{
				c += ("[" + "\"" + path[i] + "\"" + "]");
			}
			return eval(c);
		}
		json_getpathjson(args)
		{
			let nm = args["name"];
			let path = args["path"].split("/");
			let c = "data[nm]";
			for(var i = 0;i < path.length;i++)
			{
				c += ("[" + "\"" + path[i] + "\"" + "]");
			}
			return JSON.stringify(eval(c));
		}
		arr_length(args)
		{
			let nm = args["name"];
			return data[nm].length;
		}
		arr_push(args)
		{
			let nm = args["name"];
			let v = args["v"];
			data[nm].push(v);
		}
		arr_pop(args)
		{
			let nm = args["name"];
			data[nm].pop();
		}
		arr_del(args)
		{
			//let nm = args["name"];
			//let v = args["v"];
			//data[nm].splice(v-1,v);
		}
		arr_itemOf(args)
		{
			let nm = args["name"];
			let v = args["v"];
			return data[nm].indexOf(v);
		}
		arr_sort(args)
		{
			let nm = args["name"];
			data[nm].sort(Scratch.Cast.compare);
			if(args["order"] == "descending")
			{
				data[nm].reverse()
			}
		}
		arr_reverse(args)
		{
			let nm = args["name"];
			data[nm].reverse()
		}
		arr_concat(args)
		{
			let a1 = args["n1"];
			let a2 = args["n2"];
			data[a1] = (data[a1].concat(data[a2]));
		}
		arr_join(args)
		{
			let nm = args["name"];
			let seperator = args["sep"];
			return data[nm].join(seperator);
		}
		arr_get(args)
		{
			let nm = args["name"];
			let val = args["v"];
			return data[nm][val]
		}
		arr_getlist(args, util)
		{
			let nm = args["name"];
			let list = this.lookupList(args["list"], util);
			if(Array.isArray(data[nm]))
			{
				data[nm] = list.value;
			}
		}
		arr_setlist(args, util)
		{
			let nm = args["name"];
			let list = this.lookupList(args["list"], util);
			if(Array.isArray(data[nm]))
			{
				list.value = data[nm];
			}
		}
    }

    Scratch.extensions.register(new Extension());
})(Scratch);