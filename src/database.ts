const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});
const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM datacity ORDER BY id ASC', (error:any, results:any) => {
      if (error) {
        reject(error)
      }
       resolve(results.rows);
    })
  }) 
}
const createMerchant = (body:any) => {
  return new Promise(function(resolve, reject) {
    const { name, email,password } = body
    pool.query('INSERT INTO merchants (name, email,password) VALUES ($1, $2 ,$3) RETURNING *', [name, email,password], (error:any, results:any) => {
      if (error) {
        reject(error)
      }
      if (results.rowCount === 1) {
        resolve(true)
        // Do something with the inserted row data
      } else {
        resolve('something wrong happened');
      }
    })
  })
}
const deleteMerchant = (body:any) => {
  const {email,password} =body
  return new Promise(function(resolve, reject) {
    pool.query('select name FROM merchants WHERE email= $1 and password= $2', [email,password], (error:any, results:any) => {
      if (error) {
        reject(error);
      }
      if (results.rowCount === 0) {
        // No matching record found
        resolve("Invalid email or password.");
      } else {
        resolve(true);
      }
    });
  })
}
const editMerchant = (body:any) => {
  const {email,nPassword,password}=body
  return new Promise(function(resolve, reject) {
    pool.query('Update merchants set password= $1 where password=$2 and email=$3', [nPassword,password,email], (error:any, results:any) => {
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
  getMerchants,
  createMerchant,
  deleteMerchant,
  editMerchant
}