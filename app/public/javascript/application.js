$('.date-picker').datetimepicker({
    format: 'DD/MM/YYYY'
});

$('a[disabled]').on('click', function (e) {
    e.preventDefault();
});