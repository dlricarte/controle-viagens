$('.date-picker').datetimepicker({
    format: 'DD/MM/YYYY',
    locale: moment.locale('pt-br')
});

$('.currency').maskMoney({
    prefix: 'R$ ',
    allowZero: true
}).maskMoney('mask');

$('a[disabled]').on('click', function (e) {
    e.preventDefault();
});