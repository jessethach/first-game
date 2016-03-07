module.exports = function(app) {
  require('./controllers/game_controller')(app);
  require('./controllers/modal_controller')(app);
  require('./directives/temp_modal_display')(app);
};
