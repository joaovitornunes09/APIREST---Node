import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/app';

export default class Foto extends Model {
  static init(sequelize) {
    super.init({
      nome_original: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio.'
          }
        }
      },
      nome_arquivo: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio.'
          }
        }
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('nome_arquivo')}`;
        }
      }
    }, {
      sequelize,
      tableName: 'fotos_alunos'
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}
