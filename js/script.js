// alert('Ciao');


$(document).ready(function() {

  var year = 2018;
  var mese = 0;
  var dayObject = moment(
  {
    year : year,
    // day : i+1,
    month : mese
  }
  )

  printMonth(dayObject);
  giorniFestivi(dayObject);

  });


// Funzioni
  function giorniFestivi(holidays) {
    $.ajax(
       {
         'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
         'method' : 'GET',
         'data' : {
           year : holidays.year(),
           month : holidays.month()
         },
         'success': function(data, stato) {
           // console.log(data);
            var data = data.response ;
            if (data.length >= 1) {
              for (var i = 0; i < data.length; i++) {
                 var thisHoliday = data[i];
                 var items = $('.month-day[data-extended-date="' + thisHoliday.date + '"]' );
                 items.addClass('holiday');
                 items.text(items.text() + ' - ' +  thisHoliday.name);
              }
            }

         },
         'error' : function(request, state, errors) {
           alert('Errore' + errors);
         }
       }
     );

   }
   function printMonth(month) {
     $('.days-list').html('');
     // var thisMonth = moment('2018-01-01');
     $('.month-name').text(month.format('MMMM YYYY'));
     $('.month-name').attr('data-this-month', month.format('YYYY-MM'));
     var daysInMonth = month.daysInMonth();

     for (var i = 1; i <= daysInMonth; i++) {
       var source = $("#entry-template").html();
       var template = Handlebars.compile(source);
       var context = {
         day : i ,
         month : month.format('MMMM'),
         // giorno : month.format('DD MMMM'),
         'extended-date' : month.format('YYYY-MM') + '-' + addZero(i)
       };
       var html = template(context);
       $('.days-list').append(html);

   }
   function addZero(num) {
     if (num < 10) {
       return '0' + num;
     }
     return num
   }
   // quando clicchiamo su next
   $('#next').click(function () {
     //dobbiamo andare avanti di un mese e chiamare la funzione che genera i giorni e poi  le festivita
     var currentMonth = $('.month-name').attr('data-this-month');
     var date = moment(currentMonth).add(1, 'months');
     console.log(date);
     printMonth(date);
     giorniFestivi(date);
   });
   $('#prev').click(function () {
     //dobbiamo andare indietro di un mese e chiamare la funzione che genera i giorni e poi  le festivita
     var currentMonth = $('.month-name').attr('data-this-month');
     var date = moment(currentMonth).subtract(1, 'months');
     console.log(date);
     printMonth(date);
     giorniFestivi(date);
   });
};
