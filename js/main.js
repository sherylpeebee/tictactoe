var ref = new Firebase('https://tic-tac-toe-trey.firebaseio.com/');

$(document).ready(init);

function init(){
  $('#login').on('click', loginClicked);
}

function loginClicked(){
  ref.authWithOAuthPopup("twitter", authHandler);
}

function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}

var isNewUser = true;


ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into Firebase so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData)
    });
  }
  console.log("authed", authData);
  if (authData) {
    $("#login").hide();
    ref.once("value", function() {
      $("#btn-container").append("Welcome " + getName(authData) + "!" );
    });
  }
});

// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}
