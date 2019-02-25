$(document).ready(function(){
    //API
    var _url = "http://my-json-server.typicode.com/dimput/latihan-pwa-public/mahasiswa";

    //Store Data
    var result = '';

    //Store Gender for Option
    var gender_opt = '';

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
    });
});