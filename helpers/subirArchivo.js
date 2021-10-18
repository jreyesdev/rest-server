const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

const UPLOADS_PATH = path.join(__dirname,'../uploads')

const validarArchivo = (req, res, next) => {
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    !req.files.archivo
  ) {
    return res.status(400).json({ msg: "No files were uploaded." })
  }
  next()
}

const subirArchivo = async (file, extensiones, dir = "") => {
  return new Promise((res, rej) => {
    const { archivo } = file,
      dirFile = path.join(UPLOADS_PATH, dir),
      nombreArr = archivo.name.split("."),
      ext = nombreArr[nombreArr.length - 1]

    // Valida extensión
    if (!extensiones.includes(ext)) {
      return rej({
        msg: `La extensión ${ext} no es permitida. Las extensiones válidas son: ${extensiones.join(", ")}`,
      })
    }

    // Si no existe carpeta UPLOADS la crea
    if (!fs.existsSync(UPLOADS_PATH)) {
      fs.mkdirSync(UPLOADS_PATH)
    }
    // Si no existe carpeta UPLOADS/DIR la crea
    if (dir !== '' && !fs.existsSync(dirFile)) {
      fs.mkdirSync(dirFile)
    }

    const fileName = uuidv4() + "." + ext,
      uploadPath = path.join(dirFile, fileName)

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return rej({ msg: "Error al mover archivo" })
      }
      res(fileName)
    })
  })
}

const deleteFile = async(file) => {
  const pathFile = path.join(UPLOADS_PATH,file)
  if(fs.existsSync(pathFile)) await fs.unlinkSync(pathFile)
}

const allowedCollec = async(col='') => {
  const collects = ['users','products']
  if(!collects.includes(col)){
    throw new Error(`Coleccion ${col} no permitida. Las permitidas son: ${collects.join(', ')}`)
  }
}

module.exports = {
  allowedCollec,
  deleteFile,
  subirArchivo,
  validarArchivo
}
