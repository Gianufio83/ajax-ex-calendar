// alert('Ciao');


$(document).ready(function() {

 // var mese = moment([2020, 0, 1]).subtract(24, 'months');
 // console.log(mese);
 // var data = mese.format('YYYY MM DD') ;
 // console.log(data);
 // var monthsDays = mese.date();
 // console.log(monthsDays);
 $.ajax(
    {
      'url' : 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0.',
      'method' : 'GET',
      'data' : {
        year : 2018,
        month : 0
      },
      'success': function(data, stato) {
        // console.log(data);
        giorniFestivi(data.response);

      },
      'error' : function(request, state, errors) {
        alert('Errore' + errors);
      }
    }
  );

  function giorniFestivi(day) {
    for (var i = 0; i < day.length; i++) {
       var feste = day[i];
       var source = $("#entry-template").html();
       var template = Handlebars.compile(source);
       var html = template(feste);
       $('.months-container').append(html);
     }
   }


});
