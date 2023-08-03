const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});
const getusers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM datacity ORDER BY id ASC', (error:any, results:any) => {
      if (error) {
        reject(error)
      }
       resolve(results.rows);
    })
  }) 
}
const createuser = (body:any) => {
  const {name,email,password } = body
  return new Promise(function(resolve, reject) {
    pool.query('INSERT INTO users (name, email,password) VALUES ($1, $2 ,$3) RETURNING *', [name, email,password], (error:any, results:any) => {
      if (error) {
        reject(error)
      }
        resolve(true)
    })
  })
}
const deleteuser = (body:any) => {
  const {email,password} =body
  return new Promise(function(resolve, reject) {
    pool.query('select name FROM users WHERE email= $1 and password= $2', [email,password], (error:any, results:any) => {
      if (error) {
        reject(error);
      }
      if (results.rowCount === 0) {
        resolve("Invalid email or password.");
      } else {
        resolve(true);
      }
    });
  })
}
const edituser = (body:any) => {
  const {email,nPassword,password}=body
  return new Promise(function(resolve, reject) {
    pool.query('Update users set password= $1 where password=$2 and email=$3', [nPassword,password,email], (error:any, results:any) => {
      if (error) {
        reject(error);
      }
      if (results.rowCount === 0) {
        resolve(`Idk ${body.nPassword}`);
      } else {
        resolve(true);
      }
    });
  })
}
module.exports = {
  getusers,
  createuser,
  deleteuser,
  edituser
}