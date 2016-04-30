var dispatcher = require('./dispatcher');

module.exports = {
  updateVote:function(id, choice) {
    dispatcher.dispatch({
      choice:choice,
      id:id,
      type:'choice:updateVote'
    });
  }
};
