const express = require('express');
const app = express();
const cloudinary = require('./utils/cloudinary')
const port = 3001
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ limit: '50mb',extended: true }));

app.get('/api/images', async (req,res) => {

const {resources} = await cloudinary.search.expression(
    'folder:dev_setups').sort_by('public_id','desc')
    .max_results(30)
    .execute();
    const publicIds = resources.map(file => file.public_id)
    res.send(publicIds);
})


app.post('/api/upload', async (req,res) => {

    try {
const fileStr = req.body.data;
const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'dev_setups'
});
console.log(uploadedResponse);
res.json({msg: "YAYAYA"});

    } catch (error) {
        console.error(error);
        res.status(500).json({err: 'something went wrong'})
    }
}
)
app.listen(3001, () => {
console.log(`listening on port ${port}`)

})