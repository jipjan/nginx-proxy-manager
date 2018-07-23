'use strict';

const Mn         = require('backbone.marionette');
const template   = require('./delete.ejs');
const Controller = require('../controller');
const Api        = require('../api');
const App        = require('../main');

require('jquery-serializejson');

module.exports = Mn.View.extend({
    template:  template,
    className: 'modal-dialog',

    ui: {
        form:    'form',
        buttons: '.modal-footer button',
        cancel:  'button.cancel',
        save:    'button.save'
    },

    events: {

        'click @ui.save': function (e) {
            e.preventDefault();

            Api.Users.delete(this.model.get('id'))
                .then(() => {
                    Controller.showUsers();
                    App.UI.closeModal();
                })
                .catch(err => {
                    alert(err.message);
                    this.ui.buttons.prop('disabled', false).removeClass('btn-disabled');
                });
        }
    }
});