import User from '../models/User';

const data = {
  status: true,
  message: 'Requisição realizada com sucesso.',
};

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });

      data.data = users;

      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, { attributes: ['id', 'nome', 'email'] });

      data.data = user;

      return res.json(data);
    } catch (error) {
      data.status = false;
      data.message = 'Erro ao realizar requisição.';

      return res.json(error);
    }
  }

  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      data.data = { id, nome, email };
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(((err) => err.message))
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado']
        });
      }
      const updateUser = await user.update(req.body);

      const { id, nome, email } = updateUser;
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
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado']
        });
      }
      await user.destroy();

      data.data = 'Usuário deletado com sucesso';

      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(((err) => err.message))
      });
    }
  }
}

export default new UserController();
