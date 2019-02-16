const mongo   = require('mongodb').MongoClient;
const client  = require('socket.io').listen(4000).sockets;


mongo.connect('mongodb://127.0.0.1/pesanan', function(err, db){
    if(err){
        throw err
    }
    console.log('MongoDb connected');


    client.on('connection', function(socket) {
        let x = 0;
        console.log('user user is connect', x++);

       

        let pesanan = db.collection('daftarpesanan');


        pesanan.find().toArray(function(err, res) {
            if(err) {
                throw err;
            }

            socket.emit('outputpesanan', res);

        });


        socket.on('tambahpesanan', function(data) {
            let namapesanan  = data.namapesanan;
            let jumlah       = data.jumlah;
            let alamat       = data.alamat;

            pesanan.insert({
                namapesanan: namapesanan,
                jumlah: jumlah,
                alamat: alamat
            }, function() {
                client.emit('outputpesanan', [data])
              
            });
        });

        socket.on('removepesanan', function(data){
            let id = data.id;
            

        });

    });

    


});
