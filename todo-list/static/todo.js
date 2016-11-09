$(document).ready(function () {

    updateList();
    $('#form').submit(function(event){
        event.preventDefault();
        var taskparam = $(this).serialize();
        $.post('/add_task', taskparam, function addTask(){
        });
        updateList();
        clearInput();
    });

    $('#task-list').on('click', '.check', function(){
        var currentID = $(this).closest('li').attr('id');
        var done = $(this).closest('li').hasClass('done');
        $.get('/tasks', function getTasks(tasks){
            tasks.forEach(function(task){
                if (task.id.toString() === currentID) {
                    if (done){
                        taskparam = { id: currentID,
                                    done: false
                                    };
                        $.post('/mark_task', taskparam);
                        updateList();
                    } else {
                        taskparam = { id: currentID,
                                    done: true
                                    };
                        $.post('/mark_task', taskparam);
                        updateList();
                    }
                }
            });
        });
    });

    $('#remove-completed').on('click', function(){
        console.log("remove completed");
        $.post('/remove_complete');
        updateList();
    });

});

// var remove = '<i class="fa fa-times delete" aria-hidden="true"></i>';
var check = '<i class="fa fa-check check" aria-hidden="true"></i>';
// var edit = '<i class="fa fa-pencil-square-o edit" aria-hidden="true"></i>';
var space = ' ';

function updateList(){
    $.get('/tasks', function getTasks(tasks){
        $('#task-list').text('');
        tasks.forEach(function(task){
            var item = '<span class=".todo-item">' + task.description + '</span>';
            var done;
            if (task.done === true) {
                done = 'done';
            } else {
                done = '';
            }
            $('#task-list').append('<li id="' + task.id + '" class="' + done + '">' + check + space + item + '</li>');
        });
    });
}


function clearInput(){
    $('#new-task').text('');
}
