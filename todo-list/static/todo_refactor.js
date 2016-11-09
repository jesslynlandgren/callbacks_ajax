$(document).ready(function() {
    // Get the current list
    startingList();

    // Add a task
    $('#form').submit(function(event){
        event.preventDefault();
        var taskparam = $(this).serialize();
        // Add task to database and return json
        $.post('/add_task', taskparam, function addTask(task){
            // Append new task to list and render
            appendTask(task);
            // Clear new task input field
            $('#new-task').val('');
        });

    });


    $('#task-list').on('click', '.remove', function(){
        taskparam = { id: $(this).closest('li').attr('id')
        };
        taskElem = $(this).closest('li');
        $.post('/remove_task', taskparam, function removeTask(task){
            taskElem.remove();
        });
    });

    $('#task-list').on('click', '.check', function(){
        taskElem = $(this).siblings('span');
        taskparam = { id: $(this).closest('li').attr('id'),
                    done: !(taskElem.hasClass('done'))
                    };
        $.post('/mark_task', taskparam, function markTask(task){
            taskElem.toggleClass('done');
        });
    });

    $('#remove-completed').click(function(){
        $.post('/remove_complete');
        $('#task-list').empty();
        startingList();
    });

    // Constants for list icons
    var remove = '<i class="fa fa-times remove" aria-hidden="true"></i>';
    var check = '<i class="fa fa-check check" aria-hidden="true"></i>';
    var edit = '<i class="fa fa-pencil-square-o edit" aria-hidden="true"></i>';
    var space = ' ';

    // Get and render current todo list on intial page load
    function startingList(){
        $.get('/tasks', function getTasks(tasks){
            tasks.forEach(function(task){
                var done;
                if (task.done === true) {done = 'done';} else {done = '';}
                var item = '<span class=".todo-item ' + done + '">' + task.description + '</span>';
                $('#task-list').append('<li id="' + task.id + '">' + remove + space + check + space + item + '</li>');
            });
        });
    }

    function appendTask(task){
        var item = '<span class=".todo-item">' + task.description + '</span>';
        $('#task-list').append('<li id="' + task.id + '">' + remove + space + check + space + item + '</li>');
    }

});
