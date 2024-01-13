import multer from 'multer';
import multerConfig from '../config/multer';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

const data = {
  status: true,
  message: 'Requisição realizada com sucesso.',
};

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        data.status = false;
        data.message = 'Erro ao realizar requisição.';
        data.errors = [error.code];
        return res.status(400).json(
          data
        );
      }
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        const foto = await Foto.create({
          nome_original: originalname,
          nome_arquivo: filename,
          aluno_id
        });
        data.data = req.file;
        return res.json(
          foto
        );
      } catch (e) {
        data.status = false;
        data.message = 'Erro ao realizar requisição.';
        data.errors = ['Aluno não existe'];

        return res.status(400).json(data);
      }
    });
  }
}

export default new FotoController();
