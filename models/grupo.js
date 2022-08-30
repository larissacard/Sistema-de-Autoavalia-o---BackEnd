const cliente = require("../infra/connection");

module.exports = class Grupo {
    constructor(id, nome, status) {
        this.id = id;
        this.nome = nome;
        this.status = status;
    }

    static getAll(){
        return cliente.query(`SELECT * FROM grupo`)
    }

    static getOne(id){
        return cliente.query(`SELECT * FROM grupo WHERE id = $1`, [id])
    }

    static getPessoas(id){
        return cliente
                    .query(`SELECT * FROM usuario AS us
                            INNER JOIN grupo_usuario AS gu ON gu.fk_usuario = us.id
                            INNER JOIN grupo AS gr ON gr.id = gu.fk_grupo
                            WHERE gr.id = $1`, [id])
    }

    static postGrupo(grupo){
        return cliente.query(`INSERT INTO grupo (nome, status) values ($1, $2)`, [grupo.nome, grupo.status])
    }

    static putGrupo(grupo, id) {
        return cliente.query(`UPDATE grupo  (nome, status, id) values ($1, $2, $3)`, [grupo.nome, grupo.status, id], )
    }
}

