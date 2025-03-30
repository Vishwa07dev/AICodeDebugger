const express = require('express');
const bodyParser = require('body-parser');
const openAIApi = require('openai');


const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));


const openai = new openAIApi({
    apiKey : "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"
})

/**
 * Create the API endpoint for code debugging
 */
app.post("/debug", async (req, res)=>{
    const { code, language} = req.body;

    //Make a call to openAI to debug the code
    try{
        const response = await openai.chat.completions.create({
            model : 'gpt-4',
            messages : [
                {
                    role : 'system',
                    content : `you are a code debugging assistant specializing in ${language}.`
                },
                {
                    role : 'user',
                    content : `Plese debug the following ${language} code:\n\n${code} `
                }
            ]

        });
        const result = response.choices[0].message.content;
        res.json({result});
    }catch( err){
        console.error(err);
        res.statusCode(500).json({
            error : "Something went wrong"
        })
    }
})


app.listen(8000, ()=>console.log("server started on port 8000"))