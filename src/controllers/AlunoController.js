import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

const data = {
  status: true,
  message: 'Requisição realizada com sucesso.',
};

class AlunoController {
  async index(req, res) {
    try {
      const aluno = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['nome_original', 'nome_arquivo', 'url']
        }

      });

      data.data = aluno;

      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID']
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['nome_original', 'nome_arquivo', 'url']
        }

      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado']
        });
      }

      data.data = aluno;

      return res.json(data);
    } catch (e) {
      if (e.errors) {
        return res.status(400).json({
          errors: e.errors.map(((err) => err.message))
        });
      }

      return res.status(400).json(e);
    }
  }

  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      const { id, nome, email } = novoAluno;
      data.data = { id, nome, email };
      return res.json(data);
    } catch (e) {
      if (e.errors) {
        return res.status(400).json({
          errors: e.errors.map(((err) => err.message))
        });
      }
      return res.status(400).json(e);
    }
  }

  async update(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado']
        });
      }
      const updateAluno = await aluno.update(req.body);

      const { id, nome, email } = updateAluno;
      data.data = { id, nome, email };

      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(((err) => err.message))
      });
    }
  }

  async delete(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.body.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Usuário não encontrado']
        });
      }
      await aluno.destroy();

      data.data = 'Usuário deletado com sucesso';

      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(((err) => err.message))
      });
    }
  }
}

export default new AlunoController();
