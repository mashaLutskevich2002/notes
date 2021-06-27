const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");
const $remove = $(".item-remove");
const $item = $(".item");
const $search = $("#search")


const initialTodos = [
  {
    text: "Buy milk",
    done: false
  },
  {
    text: "Play with dog",
    done: true
  }
];


$($add).click(addTodo);


$list.on('click', '.item-remove', function () {
  console.log($(this).parent());
  $(this).parent().remove()
});

$list.on('click', '.item-text', function () {
  $(this).css("font", "italic 100% serif")
  $(this).css("text-decoration", "line-through");
});


$(document).ready(function(){
  $($search).keyup(function(){
    search_table($(this).val())
  })
})

$(document).ready(() => displayTodos());


function addTodo(event) {
  event.preventDefault();

  const inputText = $($input).val();

  if (inputText.length >= 1 && inputText !== ' ') {
    $list.append(`<li class='item'>
          <span class='item-text'>${inputText}</span>
          <button class='item-remove'>Remove</button>
          </li>`);

    addTodoToList({ text: inputText, done: false })

  } else (
    alert('You haven`t entered anything')
  )

}


function search_table(value) {
  const $items = $(".item");

  $($items).each(function () {
    let found = false;

    const todoText = $(this)[0].innerText;
    console.log($(this)[0].innerText )

    if (todoText.toLowerCase().includes(value.toLowerCase())) {
      found = true;
    }

    if (found) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}


function displayTodos() {
  const todos = getTodos();

  for (let todo of todos) {
    $list.append(`<li class='item'>
     <span class='item-text'>${todo.text}</span>
      <button class='item-remove'>Remove</button>
      </li>`);
  }

}


function getTodos() {
  if (localStorage.getItem('list') === null) {
    const todos = initialTodos;
    localStorage.setItem('list', JSON.stringify(todos));
    return todos;
  }
  else {
    return JSON.parse(localStorage.getItem('list'));
  }

}


function addTodoToList(todo) {
  const todos = getTodos();
  todos.push(todo);
  localStorage.setItem('list', JSON.stringify(todos));
}




