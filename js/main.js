$(document).ready(function(){
    //API
    var _url = "http://my-json-server.typicode.com/dimput/latihan-pwa-public/mahasiswa";

    //var _url = "http://localhost:8787/json.php";
    //Store Data
    var result = '';

    //Store Gender for Option
    var gender_opt = '';
    gender_opt += '<option value="Semua">Semua</option>';

    //Store All gener from API
    var gender = [];

    $.get (_url,function(data){
        $.each(data,function(key,items){
            //Store Gender
            _gend = items.gender;
            result +=   '<div class="col-3 card">' +
                            '<p><b>' + items.name + '</b></p>' +
                            '<p>' + _gend + '</p>' +
                        '</div>';
            if ($.inArray(_gend, gender) === -1){
                //if gender not Found
                //then input gender opt
                gender.push(_gend);
                gender_opt += '<option value="' + _gend + '">' + _gend +'</option>';
            }
        });

    // use Selector by Id mhs-list
    // Replace inner HTML
    $('#mhs-list').html(result);

    /**
     * 
     */
    $('#gender-select').html(gender_opt);
    
    $('#gender-select').on('change',function(){
        updateData($(this).val());
    })

    });


});

function updateData(_gend){
    newResult = ''

    var _newUrl = "http://my-json-server.typicode.com/dimput/latihan-pwa-public/mahasiswa";

    if(_gend!='Semua'){
        _newUrl = _newUrl + "?gender=" + _gend;
    }
    console.log(_newUrl);
    $.get (_newUrl,function(data){
        $.each(data,function(key,items){
            //Store Gender
            _gend = items.gender;
            newResult +=   '<div class="col-3 card">' +
                            '<p><b>' + items.name + '</b></p>' +
                            '<p>' + _gend + '</p>' +
                        '</div>';
        });

    // use Selector by Id mhs-list
    // Replace inner HTML
    $('#mhs-list').html(newResult);
    })
}



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