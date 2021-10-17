const { subirArchivo } = require("../helpers/subirArchivo");

class UploadController {
  async cargarArchivo(req, res) {
    if (
      !req.files ||
      Object.keys(req.files).length === 0 ||
      !req.files.archivo
    ) {
      return res.status(400).json({ msg: "No files were uploaded." })
    }
    try{
        const extPermitidas = ["png", "jpg", "jpeg", "gif"]
        const fileName = await subirArchivo(req.files,extPermitidas)
        res.json({
            msg: 'File upload successfully',
            fileName
        })    
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
  }

  async putImg(req, res){}
}

module.exports = new UploadController()
