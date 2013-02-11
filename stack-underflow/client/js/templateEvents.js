Template.container.events({
  'click a.internal' : function(e) {
    e.preventDefault();
  }
});

Template.header.events({
  'click #logout' : function() {
    Meteor.logout();
  }
});

Template.sidebar.events({
  'click a.username' : function() {
    Session.set('profileClicked', this._id)
  },
  'click a.user_question' : function () {
    History.pushState({state:this.subject}, this.subject, this.subject)
  }
});

Template.question.events({
  'click input.metoo' : function () {
    Questions.update({_id: this._id}, {$inc: {metoos: 1}});
  },
  'click input.reply' : function () {
    var postID = this._id;
    Session.set('replyto', postID);
  },
  'click a' : function() {
    // TODO: implement History on 'Home' button as well
    History.pushState({state:this.subject}, this.subject, this.subject)
  }
});

Template.new_question.events({
  'click input.btn' : function() {
    var questionSubject = document.getElementById("new_question_subject").value;
    var questionBody = document.getElementById("new_question_body").value;
    var author = Meteor.user().username;
    var createdat = moment(new Date()).format('LLL');
    Questions.insert({subject: questionSubject, author:author, body:questionBody, metoos: 0, createdat: createdat})
  }
});

Template.new_reply.events({
  'click input.btn': function() {
    var replyBody = document.getElementById("new_reply_body").value;
    var replyTime = moment(new Date()).format('LLL');
    var author = Meteor.user().username;
    Questions.update({_id:this._id}, {$push: {replies: {replyBody:replyBody, author:author, replyTime:replyTime}}});
  }
});
