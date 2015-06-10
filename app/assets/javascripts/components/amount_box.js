var AmountBox = React.createClass({
  render: function(){
    return React.DOM.div({
      className: 'col-md-4'
    }, React.DOM.div({
      className: 'panel panel-' + this.props.type
    }, React.DOM.div({
      className: 'panel-heading'
    }, this.props.text), React.DOM.div({
      className: 'panel-body'
    }, amountFormat(this.props.amount))));
  }
});
