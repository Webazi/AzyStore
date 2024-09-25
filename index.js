const express = require('express')
const qr = require("qrcode")
const app = express()
const path = require('path');
const cookieSession = require('cookie-session')
const BodyParser = require("body-parser")
const { error } = require('console');
const port = 2500
const mysql = require('mysql');
const { stat } = require('fs');
const { type } = require('express/lib/response');
app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(BodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password_baru",
  database: "uc"
})
app.use(cookieSession({
  name: 'session',
  keys: ['your-secret-key'],   // Ganti dengan kunci rahasia yang aman
  maxAge: 24 * 60 * 60 * 1000  // Durasi maksimal cookie (24 jam dalam milidetik)
}));
function authMiddleware(req, res, next) {
  if (req.session && req.session.username) {
    next(); // Sesi valid, lanjut ke rute berikutnya
  } else {
    res.redirect("/login"); // Tidak ada sesi, blokir akses
  }
}
db.connect()

db.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  else {
    console.log("DB aman sejah tere masbro")
  }
})


app.use(express.static('public'));
app.use(BodyParser.json())
app.set("view engine", "ejs")
app.set("views", "views")


app.get('/', (req, res) => {
  const sql = `SELECT * FROM mahasiswa ORDER BY id DESC LIMIT 1;`
  db.query(sql, (err, fields) => {
    // response(200,fields,"ini get data",res)
    const users = JSON.parse(JSON.stringify(fields))
    res.render("index", { users: users })
  })
})


app.get('/beli', (req, res) => {
  const sql = `SELECT * FROM mahasiswa ORDER BY id DESC LIMIT 1;`
  db.query(sql, (err, result) => {
    const users = result[0];

    res.render("beli", { users })
  })
})

app.post('/dalamproses', (req, res) => {
  const transactionData = {
    transaction_id: req.body.transaction_id,
    name: req.body.asek,
    growid: req.body.growid,
    world: req.body.World,
    product: req.body.product,
    quantity: req.body.quantity,
    payment: req.body.payment,
    status: 'pending', // contoh status default
    totals: req.body.total,
    bayar: 'belum di bayar'
  };

  // Query untuk menyimpan data ke dalam tabel transaksi
  const sql = 'INSERT INTO transaksi (id, nama, jumlah, status, tanggal, metode, id_trans, growID, world, lockk,total, bayar) VALUES (NULL, ?, ?, ?, current_timestamp(), ?, ?, ?, ?, ?, ?, ?)';

  // Menjalankan query
  db.query(sql, [
    transactionData.name,
    transactionData.quantity,
    transactionData.status,
    transactionData.payment,
    transactionData.transaction_id,
    transactionData.growid,
    transactionData.world,
    transactionData.product,
    transactionData.totals,
    transactionData.bayar

  ], (err, result) => {
    if (err) {
      console.error('Gagal menyimpan data:', err);

      return;
    }
    else {
      const id = transactionData.transaction_id

      console.log('Data Transaksi Disimpan:', result);
      console.log(transactionData.quantity)
      res.redirect(`/invoice?id=${encodeURIComponent(id)}`)
    }
  });
})
app.get('/invoice', (req, res) => {
  const id = req.query.id;
  const sql = 'SELECT * FROM transaksi WHERE id_trans LIKE ?';
  let data =  `https://876jxcb3-2300.asse.devtunnels.ms/bayarr?id=${encodeURIComponent(id)}`
  
  qr.toString(data,{type:"svg"}, function(err,data){
  if(err) return console.log(error)
    
  
 

  db.query(sql, [`%${id}%`], (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);

    } else {
      const users = JSON.parse(JSON.stringify(result));
      res.render('invoice', { users, data });
    } })
  });
});

app.get('/bayar', authMiddleware, (req, res) => {
  const user  = req.session.username
  const sql = 'SELECT * FROM rek WHERE na LIKE ?'
  db.query(sql,[user],(err,result)=>{
    const users = JSON.parse(JSON.stringify(result));
    
    res.render('bayar',{users:users});
  })
});

app.get('/bayarr', authMiddleware, (req, res) => {
  const parameter = req.query.id;
  const nama = req.session.username
  console.log('Parameter:', parameter); // Log the parameter

  const query1 = 'SELECT r.*, t.* FROM transaksi t, rek r WHERE t.id_trans LIKE ? AND r.na LIKE ?;';

  console.log('Combined Query:', query1); // Log the combined query

  db.query(query1, [`%${parameter}%`, nama], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);

    } else {
      console.log('Query Result:', result); // Log the query result
      const users = JSON.parse(JSON.stringify(result));
      res.render('bayarr', { users });
    }
  });
});




// app.post('/bayarkan', (req, res) => {
//   const status = 'udah di bayar';
//   const id = req.body.id;
//   const sql = 'UPDATE transaksi SET bayar = ? WHERE transaksi.id_trans = ?;';

//   db.query(sql, [status, id], (err, result) => {
//     if (err) {
//       console.error('Error updating data:', err);
//       res.status(500).send('Error updating data');
//     } else {

//       res.send("berhasil di bayar")
//     }
//   });
// });


app.get('/cari', (req,res)=>{
  const id = req.body.caris
  
  res.render("search")

})
app.post('/cari', (req,res)=>{
  const kek = req.body.caris
  const sql = 'SELECT * FROM transaksi WHERE id_trans LIKE ?'
  db.query(sql,[kek],(err,result)=>{
    res.redirect(`/invoice?id=${encodeURIComponent(kek)}`)
   
  })
  
})


app.post('/bayarkan', authMiddleware, async (req, res) => {
  const id = req.body.id;
  const totalss = req.body.namw
  const status = 'udah di bayar'
  const nama = req.body.nam
  console.log(totalss)
  console.log(nama)

  // Mulai transaksi
  await db.beginTransaction();

  try {
    // Update table 1
    const query1 = 'UPDATE transaksi SET bayar = ? WHERE id_trans = ?';
    await db.query(query1, [status, id]);

    // Update table 2
    const query2 = 'UPDATE rek SET saldo = ? WHERE na = ?';
    await db.query(query2, [totalss, nama]);

    // Commit the transaction
    await db.commit();
    res.status(200).send(`Pembayarab berhasil sisa saldo anda ${totalss}` );
  } catch (error) {
    // Rollback the transaction in case of an error
    await db.rollback();
    res.status(500).send('Error updating tables');
    console.log(error)
  }
});


app.post('/totals', authMiddleware, (req, res) => {
  const id = req.body.id
  res.redirect(`/bayarr?id=${encodeURIComponent(id)}`);
})

app.get('/login', (req, res) => {
  res.render('login')
})
app.post('/login',  (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  const query = 'SELECT * FROM rek WHERE na = ? AND pwd = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length > 0) {
      req.session.username = username;
      res.redirect("/bayar")
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
})

app.get('/logout', (req, res) => {
  req.session = null; // Hapus sesi
  res.redirect('/login');
});

app.get('/jual', (req, res) => {
  const sql = `SELECT * FROM mahasiswa ORDER BY id DESC LIMIT 1;`
  db.query(sql, (err, result) => {
    const users = result[0];

    res.render("jual", { users })
  })
  
});



// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).render("error");
});
app.use((req, res, next) => {
  res.status(500).render("error");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});