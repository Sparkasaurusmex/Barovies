Hooks.on('renderTidy5eSheet', (sheet, html) => {
  html.find('.denomination.pp').remove();
  html.find('[name="data.currency.pp"]').remove();
  html.find('.denomination.ep').text('Barovies');
  // etc.
});

Hooks.once('ready', () => {
  CONFIG.Actor.sheetClasses.character['dnd5e.ActorSheet5eCharacter'].cls.prototype._onConvertCurrency = _onMyConvertCurrency;
});

  function _onMyConvertCurrency(event) {
    event.preventDefault();
    const curr = duplicate(this.actor.data.data.currency);
    console.log(curr);
    const convert = {
      ep: {into: "gp", each: 2}
    };
    for ( let [c, t] of Object.entries(convert) ) {
      let change = Math.floor(curr[c] / t.each);
      curr[c] -= (change * t.each);
      curr[t.into] += change;
    }
    return this.actor.update({"data.currency": curr});
 };
