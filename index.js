const express = require('express')
const app = express()
app.listen(process.env.PORT || 3000)


const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()



async function runCompletion (query,key) {
    const configuration = new Configuration({
        apiKey:key,
      });
      const openai = new OpenAIApi(configuration);
    
return await openai.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  
}

app.all('/', async(req, res) => {
try{
const query=req.query.ques;
const key=req.query.key;
const resp=  await runCompletion(query,key);
const resp_=resp.data.choices[0].text;
res.send(resp_);
    }
    catch(e){
        res.json({"result":e.message})
    }
}) 