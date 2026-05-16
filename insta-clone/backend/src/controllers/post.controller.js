

async function createPostController(req,res){
    console.log(req.body,"\n",req.file.buffer)
}

module.exports = {createPostController}