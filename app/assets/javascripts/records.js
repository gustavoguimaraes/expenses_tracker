var Records = React.createClass({
  getInitialState: function() {
    return {
      records: this.props.data
    };
  },
  getDefaultProps: function() {
    return {
      records: []
    };
  },
  addRecord: function(record) {
    var records;
    records = React.addons.update(this.state.records, {
      $push: [record]
    });
    return this.setState({
      records: records
    });
  },
  credits: function() {
    var credits;
    credits = this.state.records.filter(function(val) {
      return val.amount >= 0;
    });
    return credits.reduce((function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }), 0);
  },
  debits: function() {
    var debits;
    debits = this.state.records.filter(function(val) {
      return val.amount < 0;
    });
    return debits.reduce((function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }), 0);
  },
  balance: function() {
    return this.debits() + this.credits();
  },
  deleteRecord: function(record){
    var index, records;
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1]]
      });
    return this.replaceState({
      records: records
    });
  },
  updateRecord: function(record, data) {
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records,{
      $splice: [[index, 1, data]]
    });
    return this.replaceState({
      records: records
    });
  },
  render: function() {
    var record;
    return React.DOM.div({
      className: 'records'
    }, React.DOM.h2({
      className: 'title'
    }, 'Expenses Tracker'),
     React.DOM.div({
      className: 'row'
    },
     React.createElement(AmountBox, {
       type: 'success',
       amount: this.credits(),
       text: 'Credit'}),
     React.createElement(AmountBox, {
       type: 'danger',
       amount: this.debits(),
       text: 'Debit'}),
     React.createElement(AmountBox, {
       type: 'info',
       amount: this.balance(),
       text: 'Balance'})),
     React.createElement(RecordForm, {
      handleNewRecord: this.addRecord
    }), React.DOM.hr(null), React.DOM.table({
      className: 'table table-bordered'
    }, React.DOM.thead(null, React.DOM.tr(null,
        React.DOM.th(null, 'Date'),
        React.DOM.th(null, 'Title'),
        React.DOM.th(null, 'Amount'),
        React.DOM.th(null, 'Actions'))),
         React.DOM.tbody(null, (function() {
          var i, len, ref, results;
          ref = this.state.records;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            record = ref[i];
            results.push(React.createElement(Record, {
              key: record.id,
              record: record,
              handleDeleteRecord: this.deleteRecord,
              handleEditRecord: this.updateRecord
            }));
          }
      return results;
    }).call(this))));
  }
});
