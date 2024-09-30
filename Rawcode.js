(async function(Scratch) {
    const variables = {};
    const menus = {};
	var data = {}

    if (!Scratch.extensions.unsandboxed) {
        alert("The Javascript extension needs to be un-sandboxed")
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
                "name": "Javascript",
                "color1": "#008000",
                "tbShow": true,
                "blocks":[
				{
					opcode: "r_eval",
					blockType: Scratch.BlockType.REPORTER,
					isEdgeActivated: true,
					text: "eval [code]",
					arguments: {
					"code":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "1 + 1",
					},
					},
				},
				{
					opcode: "b_eval",
					blockType: Scratch.BlockType.BOOLEAN,
					isEdgeActivated: true,
					text: "eval [code]",
					arguments: {
					"code":
					{
						type: Scratch.ArgumentType.STRING,
						defaultValue: "true",
					},
					},
				},
			],
                "menus":{

				},
            }
        }
		r_eval(args)
		{
            try
            {
                return eval(args["code"]);
            }
            catch
            {
                return " ";
            }
        }
		b_eval(args)
		{
            try
            {
                return eval(args["code"]);
            }
            catch(err)
            {
                return err;
            }
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);