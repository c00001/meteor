Template.content_pane.logged_in = function () {
  return Meteor.userId();
};

Template.sidebar.users_list = function () {
  return Meteor.users.find({}, {$sort: {username: 1}});
};

Template.user_profile.profileClicked = function () {
  return (Session.get('profileClicked') === this._id);
}

Template.user_profile.user_questions = function () {
  return Questions.find({author: this.username});
};

Template.questions_list.questions = function() {
  return Questions.find({}, {sort: {subject: 1}})
};

Template.questions_list.clickedReply = function() {
  return (Session.get('replyto') === this._id);
};

Template.question.replies = function() {
  return Questions.find({_id:this._id});
};

Template.question.clickedSubject = function() {
  return (Session.get('historystate')===this.subject);
};
