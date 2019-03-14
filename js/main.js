$(document).ready(function(){
    //API
    var _url = "http://my-json-server.typicode.com/dimput/latihan-pwa-public/mahasiswa";

    //var _url = "http://localhost:8787/json.php";
    //Store Data

    // menampung data yang didapat dari API
    var result = '';

    // menampung gender sbg option
    var gender_opt = '';

    // menampung semua gender dari API
    var gender = [];

    // $.get(_url,function (data) {
    function renderPage(data) {
        $.each(data, function (key, items) {
            // untuk menampung gender sementara pd loop
            _gend = items.gender;

            // untuk memasukkan data ke result dari API
            result += 
                '<div class="col-3 card">' +
                    '<p><b>' + items.name + '</b></p>' +
                    '<p>' + _gend + '</p>' +
                '</div>';

            // jika gender tidak ada didalam array gender,
            // maka masukkan gender opt
            if ($.inArray(_gend, gender) === -1) {
                // data gender di push untuk
                // pengecekan itrasi berikutnya
                gender.push(_gend);
                // set gender_opt dgn <option>
                gender_opt += '<option value="' + _gend +
                    '">' + _gend + '</option>'
            }
        });

        // menggunakan selector ID mhs-list,
        // kemudian replace html di dalam komponen yang
        // ada di id mhs-list menjadi result
        $('#mhs-list').html(result);

        // menggunakan selector ID gender-select,
        // kemudian replace html di dalam komponen yang
        // ada di id gender-select menjadi gender_opt
        $('#gender-select').html('<option value="semua">semua</option>' + gender_opt);
        // });
    }

    var networkDataReceive = false;
    /* cek di Cache, apakah sudah ada belum, ngambil data dari service online */
    var networkUpdate = fetch(_url).then(function (response) {
        return response.json();
    }).then(function (data) {
        networkDataReceive = true;
        renderPage(data)
    });
    
    /*fetch data dari cache*/
    caches.match(_url).then(function (response) {
        if (!response) throw Error("no data on cache");
        return response.json();
    }).then(function (data) {
        if (!networkDataReceive){
            renderPage(data);
            console.log('render data from cache');
        }
    }).catch(function () {
        return networkUpdate;
    })


    // filter untuk option gender
    $('#gender-select').on('change', function () {
        updateList($(this).val());
    });

    function updateList(opt) {
        var _url2 = _url;

        if (opt !== 'semua'){
            _url2 = _url + '?gender='+opt;
        }
        // menampung data yang didapat dari API
        var result = '';

        $.get(_url2,function (data) {
            $.each(data, function (key, items) {
                // untuk menampung gender sementara pd loop
                _gend = items.gender;

                // untuk memasukkan data ke result dari API
                result += 
                        '<div class="col-3 card">' +
                            '<p><b>' + items.name + '</b></p>' +
                            '<p>' + _gend + '</p>' +
                        '</div>';
            });

            // update list
            $('#mhs-list').html(result);
        });
    }
});

//Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }