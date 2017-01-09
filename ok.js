var events = [];
$(function() {
    var cal = $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyC69hMyKuhWOLAt7INHeYX_Gg6rVkrcaPs',
        eventSources: [
            {
                url: '/okdb/ok.json',
                color: 'red',
                textColor: 'white'
            },
            {
                googleCalendarId: 'ivo83ivnomdepun4uet57pr4i4@group.calendar.google.com',
                color: 'black',
                textColor: 'white',
                className: 'google'
            }
        ],
        defaultDate: '2017-04-19',
        defaultView: 'agendaWeek',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        slotDuration: '01:00:00',
        firstDay: 1,
        //contentHeight: 'auto',
        height: 'auto',
        slotLabelFormat: 'H:mm',
        dayNamesShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
        week: "d. [MMMM'ta' (YYYY)]{' &ndash; 'd. MMMM'ta' YYYY}",
        timeFormat: 'H:mm',
        columnFormat: {   
            month: 'dddd',
            week: 'ddd D.M.',
            day: 'dddd D.M.YYYY'
        },
        monthNames: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
        monthNamesShort: ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'],
        dayNames: ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'],
        editable: true,
        selectable: true,
        selectHelper: true,
        unselectAuto: false,
        select: function (start, end, jsEvent, view) {
            $('#lisaa')[0].reset();
            $('#ohjelmakartta [name=start]').val(moment(start).format('YYYY-MM-DD HH:mm'));
            $('#ohjelmakartta [name=end]').val(moment(end).format('YYYY-MM-DD HH:mm'));
            $('#ohjelmakartta [name=title]').focus();
        },
        eventClick: function (event, jsEvent, view) {
            if(event.url !== undefined) return;
            for(var i in event) {
                $('#ohjelmakartta [name='+i+']').val(event[i]);
            }
            $('#ohjelmakartta [name=start]').val(moment(event.start).format('YYYY-MM-DD HH:mm'));
            $('#ohjelmakartta [name=end]').val(moment(event.end).format('YYYY-MM-DD HH:mm'));
        },
        eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
            for(var i in event) {
                $('#ohjelmakartta [name='+i+']').val(event[i]);
            }
            $('#ohjelmakartta [name=start]').val(moment(event.start).format('YYYY-MM-DD HH:mm'));
            $('#ohjelmakartta [name=end]').val(moment(event.end).format('YYYY-MM-DD HH:mm'));
            event.color = '#3a87ad';
            $('#calendar').fullCalendar('updateEvent', event);
            //$('#lisaa').submit();
        },
        eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
            for(var i in event) {
                $('#ohjelmakartta [name='+i+']').val(event[i]);
            }
            $('#ohjelmakartta [name=start]').val(moment(event.start).format('YYYY-MM-DD HH:mm'));
            $('#ohjelmakartta [name=end]').val(moment(event.end).format('YYYY-MM-DD HH:mm'));
            event.color = '#3a87ad';
            $('#calendar').fullCalendar('updateEvent', event);
            //$('#lisaa').submit();
        },
        loading: function (isLoading, view) {
            if(isLoading) return;
            events = $('#calendar').fullCalendar('clientEvents');
            events.sort(function(a,b) {
                if (a.start < b.start) return -1;
                if (a.start > b.start) return 1;
                return 0;
            });
            $('#lista tbody').html('');
            $('datalist').html('');
            for(var i in events) {
                if(!events.hasOwnProperty(i)) continue;
                if(events[i].url !== undefined) continue;
                $('#lista tbody').append('<tr><td>'+moment(events[i].start).format('YYYY-MM-DD HH:mm')+'</td><td>'+moment(events[i].end).format('YYYY-MM-DD HH:mm')+'</td><td><a href="#" class="event" data-id="'+events[i].id+'">'+events[i].title+'</a></td><td>'+events[i].host+'</td><td>'+events[i].prod+'</td><td>'+events[i].desc.length+' <a href="#" class="delete" data-id="'+events[i].id+'">roskiin</a></td></tr>');
                var list = ['title', 'host', 'prod'];
                for(var j in list) {
                    var html = '<option value="'+events[i][list[j]]+'">';
                    if($('datalist#'+list[j]+' option[value="'+events[i][list[j]]+'"]').length == 0) {
                        $('datalist#'+list[j]).append(html);
                    }
                }
            }
        }
    });
    $('#kloonaa').click(function(e) {
        $('#ohjelmakartta [name=id]').val('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }));
        $('#lisaa').submit();        
    });
    $('#lisaa').submit(function(e) {
        e.preventDefault();
        if($('#ohjelmakartta [name=id]').val() == '') {
            $('#ohjelmakartta [name=id]').val('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            }));
        }
        var parseStart = moment($('#ohjelmakartta [name=start]').val(), 'YYYY-MM-DD HH:mm', true);
        var parseEnd = moment($('#ohjelmakartta [name=end]').val(), 'YYYY-MM-DD HH:mm', true);
        var fail = false;
        if(!parseStart.isValid()) {
            $('#ohjelmakartta [name=start]').addClass('fail');
            fail = true;
        }
        if(!parseEnd.isValid()) {
            $('#ohjelmakartta [name=end]').addClass('fail');
            fail = true;
        }
        if(fail) return false;
        $('#ohjelmakartta [name=start]').val(parseStart.format('YYYY-MM-DD HH:mm'));
        $('#ohjelmakartta [name=end]').val(parseEnd.format('YYYY-MM-DD HH:mm'));
        $.post('/okdb/ok.php', $('#lisaa').serialize(), function(data) {
            $('#calendar').fullCalendar('unselect');
            $('#calendar').fullCalendar('refetchEvents');
        });
        $('#lisaa')[0].reset();
        $('#ohjelmakartta input').removeClass('fail');
        return false;
    });
    $('#lista').on('click', '.event', function(e) {
        e.preventDefault();
        for(var j in events) {
            if(events[j].id == $(this).data('id')) {
              var event = events[j];
              for(var i in event) {
                  $('#ohjelmakartta [name='+i+']').val(event[i]);
              }                                                                                        
              $('#ohjelmakartta [name=start]').val(moment(event.start).format('YYYY-MM-DD HH:mm'));
              $('#ohjelmakartta [name=end]').val(moment(event.end).format('YYYY-MM-DD HH:mm'));
              $('#ohjelmakartta [name=title]').focus();       
            }
        }
    });
    $('#lista').on('click', '.delete', function(e) {
        e.preventDefault();
        $.post('/okdb/ok.php', { delete: $(this).data('id') }, function(data) {
            $('#calendar').fullCalendar('refetchEvents');
        });
    });
});
