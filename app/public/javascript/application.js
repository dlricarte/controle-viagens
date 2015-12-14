$('.date-picker').datetimepicker({
    format: 'DD/MM/YYYY',
    locale: moment.locale('pt-br')
});

$('a[disabled]').on('click', function (e) {
    e.preventDefault();
});