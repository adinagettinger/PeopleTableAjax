$(() => {

    const refreshTable = () => {
        $.post('/Home/GetAllPeople', function (people) {
            $(".table tr:gt(0)").remove();
            
            people.forEach(person => {
                $("#table-body").append(`                
                    <tr><td>${person.firstName}</td>
                    <td>${person.lastName}</td>
                    <td>${person.age}</td>
                    <td><button  id="delete-button" data-id="${person.id}"class="btn btn-danger delete" style="margin-left:10px">delete</button>
                    <button  id="edit-button" data-id="${person.id}"class="btn btn-info edit" style="margin-left:10px">edit</button></td></tr>}`);
            });

        });
    };

    $("#add-button").on('click', function () {
       if (!($("#firstName-input").val() === null && $("#lastName-input").val() === null && $("#age-input").val() === null))  {

            const person = {
                firstName: $("#firstName-input").val(),
                lastName : $("#lastName-input").val(),
                age : $("#age-input").val()

           };
           
           $.post('/Home/AddPerson', person, function () {

               refreshTable();

           });
           $("#firstName-input").val("");
           $("#lastName-input").val("");
           $("#age-input").val("");
        };
        
    });

    $(".table").on('click', '.delete', function () {
        const id = $(this).data('id');
        $.post('/home/DeletePerson', { id }, function () {
            refreshTable();
        });
    });

    $(".table").on('click', '.edit', function () {

        const id = $(this).data('id');
        $.post('/home/GetPerson', { id }, function (person) {
            $("#first-name").val(person.firstName);
            $("#last-name").val(person.lastName);
            $("#age").val(person.age)      
            $("#edit-modal").show();
            $("#update-button").attr("data-id", id);
        });
       
        
    });
    
    $(".dismiss").on('click', function () {
            $("#edit-modal").hide();
    });

    $("#update-button").on('click', function () {
    const idTwo = $("#update-button").attr("data-id");
    const person = {
        firstName: $("#first-name").val(),
        lastName: $("#last-name").val(),
        age: $("#age").val(),
        id: idTwo
    };
    $.post('/home/EditPerson', person, function () {
        refreshTable();
        $("#edit-modal").hide();

    });
        });

   

});