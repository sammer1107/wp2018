$(document).ready(function(){
  // list students
  $("#list_btn").click(function(event){
    event.preventDefault();
    $.ajax({
      method: "get",
      url: "/list_student",
      success: function(data){
        console.log(data);
        $("#list_student").html(data);
      }
    });
  });

  // search students
  $("#search_btn").click(function(event){
    event.preventDefault();
    $.ajax({
      method: "get",
      url: "/search",
      data: {"search_id": $("input[name='search_id']").val()},
      success: function(data){
        console.log(data);
        $("#search_result").html(data);
      }
    })
  });

  // add student
  $("#add_btn").click(function(event){
    event.preventDefault();
    // console.log($("input[name='new_id']").val())
    $.ajax({
      method: "post",
      url: "/add",
      data: {
        "new_id": $("input[name='new_id']").val(),
        "new_name": $("input[name='new_name']").val()
      }
    });
  });

  // delete student
  $("#delete_btn").click(function(event){
    event.preventDefault();
    $.post("/delete", {"del_id": $("input[name='del_id']").val() });
  });
});
