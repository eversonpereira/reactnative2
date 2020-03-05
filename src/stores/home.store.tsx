import { action, observable } from 'mobx';

export default class HomeStore {

  @observable etanol = '';
  @observable gasolina = '';
  @observable resultado = '';

  
  @action calculate = () => {
    const { etanol, gasolina } = this;
    var regex = new RegExp('^[0-9]{1,10}[\,\.][0-9]{2}$');
    if (regex.test(etanol) && regex.test(gasolina)) {
      var etanolnum = parseFloat(etanol.replace(',', '.'));
      var gasolinanum = parseFloat(gasolina.replace(',', '.'));;
      if (!isNaN(Number(etanolnum)) && !isNaN(Number(gasolinanum))) {
        const value = Number(etanolnum) / Number(gasolinanum);
        console.log (value);
        if (value > 0.70) {
          var diferenca = Number(etanolnum) - ( Number(gasolinanum) * 0.70 );
          var economia = '';
          if ( +diferenca < 0.01 ) {
            var economia = 'menos de um centavo';
          } else {
            economia = diferenca.toFixed(2);
          }
          this.resultado = 'Vale a pena gasolina, uma economia de ' + economia + ' por litro';
        } else if (value < 0.70) {
          var diferenca = ( Number(gasolinanum) * 0.70 ) - Number(etanolnum);
          var economia = '';
          if ( +diferenca < 0.01 ) {
            var economia = 'menos de um centavo';
          } else {
            economia = diferenca.toFixed(2);
          }
          this.resultado = 'Vale a pena etanol, uma economia de ' + economia + ' por litro';
        } else {
          this.resultado = 'São equivalentes';
        }
      } else {
        this.resultado = 'O valor do etanol e da gasolina devem ser numericos com duas casas decimais';
      }
    } else {
      this.resultado = 'O valor do etanol e da gasolina devem ser numericos com duas casas decimais';
    }
  }

  @action handleForm = (input) => {
    const key = Object.keys(input)[0];
    const value = input[key];
    this[key] = value;
  }

}
const homeStore = new HomeStore();

export { homeStore };
