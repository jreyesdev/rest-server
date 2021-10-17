const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

const subirArchivo = async (file, extensiones, dir = "") => {
  return new Promise((res, rej) => {
    const { archivo } = file,
      dirUpload = path.join(__dirname, "../uploads"),
      dirFile = path.join(dirUpload, dir),
      nombreArr = archivo.name.split("."),
      ext = nombreArr[nombreArr.length - 1]

    // Valida extensión
    if (!extensiones.includes(ext)) {
      return rej({
        msg: `La extensión ${ext} no es permitida. Las extensiones válidas son: ${extensiones.join(", ")}`,
      })
    }

    // Si no existe carpeta UPLOADS la crea
    if (!fs.existsSync(dirUpload)) {
      fs.mkdirSync(dirUpload)
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

module.exports = {
  subirArchivo,
}
