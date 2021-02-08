console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('DOM ready');

  $(document).on('click', '#addJokeButton', addJoke);
  getAllJokes();
}

function addJoke() {
  console.log('inside addJoke() ');
  const whose = $('#whoseJokeIn').val();
  const question = $('#questionIn').val();
  const punchline = $('#punchlineIn').val();

  console.log(whose, question, punchline);

  /*
  FORMAT: 
  {
    whoseJoke: 'Scott',
    jokeQuestion: 'I went to the zoo the other day, it had one dog...',
    punchLine: 'It was a shih tzu.',
  }
  */
  const jokeData = {
    whoseJoke: whose,
    jokeQuestion: question,
    punchLine: punchline,
  };

  // PUSHING DATA TO POST
  $.ajax({
    url: '/addjoke',
    method: 'POST', // POST METHOD
    data: {
      joke_to_add: jokeData,
    },
  })
    .then(function (response) {
      console.log('A POST response ocurred: ', response);
    })
    .catch(function (error) {
      console.log('An error ocurred: ', error);
    });

  // POST METHOD GOES HERE
  getAllJokes();
}

function getAllJokes() {
  console.log('inside getAllJokes() ');

  // GET METHOD GOES HERE
  $.ajax({
    url: '/getalljokes',
    method: 'GET', // GET METHOD
  })
    .then(function (response) {
      console.log('A GET response ocurred: ', response);
      renderToDom(response);
    })
    .catch(function (error) {
      console.log('An error ocurred: ', error);
    });
}

function renderToDom(jokesList) {
  console.log('inside renderToDom() ');
  for (const joke of jokesList) {
    $('#outputDiv').append(
      `<li>${joke.whoseJoke} - ${joke.jokeQuestion} ${joke.punchLine}</li>`
    );
  }
}
